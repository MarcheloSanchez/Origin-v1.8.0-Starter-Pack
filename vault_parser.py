#!/usr/bin/env python3
"""
vault_parser.py — Obsidian vault parser for Life Dashboard (Arduino + SSD1306 OLED).

Extracts three data types and writes dashboard_data.json:
  1. quests   — top 3 active Efforts, sorted by priority then due date
  2. streak   — consecutive days with a daily note (today or yesterday as anchor)
  3. xp.today — XP earned today from completed Daily Quest checkboxes

Usage:
    python vault_parser.py --vault /path/to/vault
    python vault_parser.py --vault /path/to/vault --dry-run
    python vault_parser.py --vault /path/to/vault --output /tmp/dashboard_data.json

Dependencies:
    pip install python-frontmatter
    (uses only stdlib otherwise)
"""

import argparse
import json
import re
import sys
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Optional

try:
    import frontmatter
except ImportError:
    print(
        "Error: python-frontmatter not installed.\n"
        "Run: pip install python-frontmatter",
        file=sys.stderr,
    )
    sys.exit(1)


# ---------------------------------------------------------------------------
# Mapping configuration — edit these to change extraction behaviour
# ---------------------------------------------------------------------------

# Folder paths relative to vault root
EFFORTS_DIR = "03-Efforts"
DAILY_DIR = "05-Calendar/Daily"

# Priority sort order: lower number = shown first in quests list
# Add or reorder values here if you use different priority names
PRIORITY_ORDER = {"high": 0, "medium": 1, "low": 2}

# Status string that marks an effort as active
# (must match the emoji-prefixed canonical value in your vault)
ACTIVE_STATUS = "🔄active"

# Only YYYY-MM-DD.md files count as daily notes (ignores Tutorial- etc.)
DAILY_FILENAME_RE = re.compile(r"^\d{4}-\d{2}-\d{2}\.md$")

# Matches a completed quest checkbox with an XP annotation, e.g.:
#   - [x] Process inbox to zero (+25 XP)
# Group 1 captures the XP amount.
QUEST_CHECKED_RE = re.compile(r"^-\s+\[x\]\s+.+?\(\+(\d+)\s+XP\)", re.IGNORECASE)

# Matches the manual XP override line, e.g.:
#   XP Earned Today: 35 / ______
# Group 1 captures the number before the slash.
XP_OVERRIDE_RE = re.compile(r"XP Earned Today:\s*(\d+)", re.IGNORECASE)


# ---------------------------------------------------------------------------
# Quest extraction — reads 03-Efforts/ recursively
# ---------------------------------------------------------------------------

def _coerce_date_str(value) -> Optional[str]:
    """Convert a YAML date (date object, datetime, or string) to ISO string."""
    if value is None:
        return None
    if isinstance(value, (date, datetime)):
        return value.isoformat()[:10]  # keep only YYYY-MM-DD
    return str(value).strip() or None


def _coerce_int(value, default: int = 0) -> int:
    """Safely cast frontmatter values that might be int, float, or string."""
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def load_effort(path: Path) -> Optional[dict]:
    """
    Parse one effort note and return a quest dict if it is active, else None.

    Returned dict keys:
      title       — note title (falls back to filename stem)
      priority    — "high" | "medium" | "low" | raw value from YAML
      due         — ISO date string or null
      pct         — completion_percentage as integer (0-100)
      next_action — next_actions field as string, or null if empty
    """
    try:
        post = frontmatter.load(str(path))
    except Exception:
        return None

    fm = post.metadata

    # Filter: only active efforts
    status = str(fm.get("status", "")).strip()
    if status != ACTIVE_STATUS:
        return None

    title = str(fm.get("title", "")).strip() or path.stem
    priority = str(fm.get("priority", "low")).strip().lower()
    due = _coerce_date_str(fm.get("due"))
    pct = _coerce_int(fm.get("completion_percentage"), default=0)

    # next_actions can be a string or a list; normalise to single string
    raw_next = fm.get("next_actions")
    if isinstance(raw_next, list):
        next_action = "; ".join(str(x).strip() for x in raw_next if x) or None
    elif raw_next:
        next_action = str(raw_next).strip() or None
    else:
        next_action = None

    return {
        "title": title,
        "priority": priority,
        "due": due,
        "pct": pct,
        "next_action": next_action,
    }


def get_top_quests(vault: Path, n: int = 3) -> list:
    """
    Return the top N active efforts sorted by:
      1. Priority rank (high → medium → low → unknown)
      2. Due date ascending (no due date sorts last)

    Scans 03-Efforts/ recursively to catch On/, Ongoing/, Simmering/ subfolders.
    """
    efforts_dir = vault / EFFORTS_DIR
    if not efforts_dir.exists():
        return []

    efforts = []
    for md_file in efforts_dir.rglob("*.md"):
        # Skip section index files (e.g. 03-Efforts.md itself)
        if md_file.stem == efforts_dir.name:
            continue
        effort = load_effort(md_file)
        if effort:
            efforts.append(effort)

    def sort_key(e: dict):
        priority_rank = PRIORITY_ORDER.get(e["priority"], 99)
        # None due → sort after all explicit dates
        due_str = e["due"] or "9999-12-31"
        return (priority_rank, due_str)

    efforts.sort(key=sort_key)
    return efforts[:n]


# ---------------------------------------------------------------------------
# Streak calculation — counts consecutive daily notes backwards from today
# ---------------------------------------------------------------------------

def get_daily_note_dates(vault: Path) -> set:
    """
    Return the set of date objects that have a matching YYYY-MM-DD.md daily note.
    Non-date filenames (e.g. Tutorial - Daily - 2026-01-27.md) are ignored.
    """
    daily_dir = vault / DAILY_DIR
    if not daily_dir.exists():
        return set()

    dates = set()
    for f in daily_dir.iterdir():
        if f.is_file() and DAILY_FILENAME_RE.match(f.name):
            try:
                dates.add(date.fromisoformat(f.stem))
            except ValueError:
                pass  # malformed filename, skip
    return dates


def calculate_streak(vault: Path) -> int:
    """
    Count consecutive days that have a daily note, walking backwards from an anchor.

    Anchor logic (per user spec):
      - If today's note exists  → anchor = today
      - If today's note missing → anchor = yesterday
        (so the streak doesn't break just because you haven't created today's note yet)
      - If neither exists       → streak = 0
    """
    existing = get_daily_note_dates(vault)
    today = date.today()

    anchor = today if today in existing else today - timedelta(days=1)
    if anchor not in existing:
        return 0

    streak = 0
    current = anchor
    while current in existing:
        streak += 1
        current -= timedelta(days=1)

    return streak


# ---------------------------------------------------------------------------
# Today's XP — parses the Daily Quest section of today's note
# ---------------------------------------------------------------------------

def get_todays_xp(vault: Path) -> int:
    """
    Parse today's daily note and return XP earned today.

    Two extraction modes (in priority order):

    1. Manual override — if the line "XP Earned Today: N / ____" has N > 0,
       that number is returned as-is (you filled it in manually, trust it).

    2. Checkbox sum — sum the (+N XP) annotations on all checked lines:
         - [x] Process inbox to zero (+25 XP)  → contributes 25

    Returns 0 if today's note doesn't exist or no XP is found.
    """
    today_str = date.today().isoformat()
    note_path = vault / DAILY_DIR / f"{today_str}.md"

    if not note_path.exists():
        return 0

    text = note_path.read_text(encoding="utf-8")

    # Mode 1: manual override wins if the value is non-zero
    for match in XP_OVERRIDE_RE.finditer(text):
        manual_xp = int(match.group(1))
        if manual_xp > 0:
            return manual_xp

    # Mode 2: sum XP from all checked quest checkboxes
    total_xp = 0
    for line in text.splitlines():
        m = QUEST_CHECKED_RE.match(line.strip())
        if m:
            total_xp += int(m.group(1))

    return total_xp


# ---------------------------------------------------------------------------
# Main builder
# ---------------------------------------------------------------------------

def build_dashboard(vault: Path) -> dict:
    """Assemble the full dashboard payload."""
    return {
        # ISO timestamp so the Arduino / host can show data freshness
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        # Up to 3 active efforts, highest priority first
        "quests": get_top_quests(vault),
        # Consecutive daily-note days (today or yesterday as anchor)
        "streak": {"days": calculate_streak(vault)},
        # XP earned today from Daily Quest checkboxes
        "xp": {"today": get_todays_xp(vault)},
    }


# ---------------------------------------------------------------------------
# CLI entry point
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description=(
            "Parse an Obsidian vault and output dashboard_data.json "
            "for the Life Dashboard Arduino widget."
        )
    )
    parser.add_argument(
        "--vault",
        required=True,
        metavar="PATH",
        help="Absolute or relative path to the Obsidian vault root.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print JSON to stdout (pretty-printed) without writing a file.",
    )
    parser.add_argument(
        "--output",
        default="dashboard_data.json",
        metavar="FILE",
        help="Output file path (default: dashboard_data.json).",
    )
    args = parser.parse_args()

    vault = Path(args.vault).expanduser().resolve()
    if not vault.is_dir():
        print(
            f"Error: vault path does not exist or is not a directory:\n  {vault}",
            file=sys.stderr,
        )
        sys.exit(1)

    data = build_dashboard(vault)

    if args.dry_run:
        # Pretty-print for human inspection
        print(json.dumps(data, indent=2, ensure_ascii=False))
    else:
        out_path = Path(args.output)
        # Write minified JSON — smaller payload over USB serial
        out_path.write_text(
            json.dumps(data, ensure_ascii=False, separators=(",", ":")),
            encoding="utf-8",
        )
        print(f"dashboard_data.json written to {out_path.resolve()}")


if __name__ == "__main__":
    main()
