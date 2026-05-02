"""
Prompt Consolidation Script
Reads the reviewed _dedup-report.md table and executes merge/archive/upgrade actions.

Usage:
    python prompt_consolidate.py              # dry-run (default)
    python prompt_consolidate.py --execute    # actually move/modify files
"""

import re
import sys
import shutil
from pathlib import Path
from datetime import date
from collections import defaultdict

# --- Config ---
VAULT = Path(
    r"C:\Users\MarcelMachanec\Documents\_Foundation for ORIGIN"
    r"\Origin_DEV_STARTER_PACK\Origin-v1.9.1-Starter-Pack"
)

REPORT = VAULT / "99-System" / "Prompts" / "01-Docs" / "_dedup-report.md"
ARCHIVE_DIR = VAULT / "99-System" / "Prompts" / "Archive"
DRAFTS_DIR = VAULT / "99-System" / "Prompts" / "Inbox"
ACTIVE_DIR = VAULT / "99-System" / "Prompts" / "Workbench"

FOLDERS = {
    "A": VAULT / "99-System" / "copilot-custom-prompts",
    "B": VAULT / "99-System" / "Prompts" / "Reference",
    "C": VAULT / "99-System" / "Prompts" / "Workbench",
    "COPILOT": VAULT / "99-System" / "copilot-custom-prompts",
}

TODAY = date.today().isoformat()

# Copilot-specific frontmatter keys to strip from migrated notes
COPILOT_KEYS = [
    "copilot-command-context-menu-enabled",
    "copilot-command-slash-enabled",
    "copilot-command-context-menu-order",
    "copilot-command-model-key",
    "copilot-command-last-used",
]


def parse_frontmatter_raw(text: str) -> tuple[str, str]:
    """Return raw frontmatter string and body string."""
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            return parts[1].strip(), parts[2].strip()
    return "", text.strip()


def parse_frontmatter(text: str) -> tuple[dict, str]:
    """Extract frontmatter as dict and body."""
    fm_raw, body = parse_frontmatter_raw(text)
    fm = {}
    for line in fm_raw.split("\n"):
        if ":" in line and not line.startswith("  "):
            key, _, val = line.partition(":")
            fm[key.strip()] = val.strip().strip('"').strip("'")
    return fm, body


def normalize_title(filename: str) -> str:
    """Strip emoji, prefixes, suffixes to get a clean title for the new filename."""
    name = Path(filename).stem
    # Remove PP/PPS prefix
    name = re.sub(r"^(PPS?\s*-?\s*|PP\s*-?\s*)", "", name, flags=re.IGNORECASE)
    # Remove emoji
    name = re.sub(
        r"[\U0001F300-\U0001F9FF\u2600-\u27BF\u2700-\u27BF"
        r"\U0001FA00-\U0001FA6F\U0001FA70-\U0001FAFF"
        r"\u200d\ufe0f\u20e3\u2934\u2935\u2B05-\u2B07"
        r"\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299"
        r"\U0001F004\U0001F0CF\U0001F170-\U0001F171"
        r"\U0001F17E-\U0001F17F\U0001F18E\U0001F191-\U0001F19A"
        r"]+",
        " ",
        name,
    )
    # Remove "- Detail" / "Detail 1" suffix
    name = re.sub(r"\s*-?\s*Detail\s*\d*\s*$", "", name, flags=re.IGNORECASE)
    # Remove leading numbers and numbering like "01 -", "pp01"
    name = re.sub(r"^(pp)?\d+\s*[-.]?\s*", "", name, flags=re.IGNORECASE)
    # Clean up
    name = re.sub(r"[-_]+", " ", name)
    name = re.sub(r"\s+", " ", name).strip()
    # Title case
    name = name.title()
    return name


def make_slug(title: str) -> str:
    """Generate an ID slug from a title."""
    slug = title.lower()
    slug = re.sub(r"[^a-z0-9\s-]", "", slug)
    slug = re.sub(r"\s+", "-", slug.strip())
    return slug


def clean_filename(title: str) -> str:
    """Create a clean filename from a normalized title."""
    # Remove characters invalid in filenames
    clean = re.sub(r'[<>:"/\\|?*]', "", title)
    clean = re.sub(r"\s+", " ", clean).strip()
    return f"Prompt - {clean}.md"


def strip_copilot_keys(fm_text: str) -> str:
    """Remove copilot-command-* lines from raw frontmatter."""
    lines = fm_text.split("\n")
    filtered = [
        l for l in lines if not any(l.strip().startswith(k) for k in COPILOT_KEYS)
    ]
    return "\n".join(filtered)


def build_template_v2(title: str, body: str, source_fm: dict) -> str:
    """Wrap content in Template v2 structure with full frontmatter."""
    slug = make_slug(title)

    # Preserve useful metadata from source
    prompt_category = source_fm.get("prompt_category", "")
    difficulty = source_fm.get("difficulty", "")
    prompt_type = source_fm.get("prompt_type", "")
    audience = source_fm.get("audience", "")
    language = source_fm.get("language", "")
    source = source_fm.get("source", "personal")
    created = source_fm.get("created", TODAY)

    fm = f"""---
in:
  - "[[99-System/Prompts]]"
title: "{title}"
type: prompt
fileClass: prompt
tags:
  - "\U0001f916AI/prompt"
status: "\U0001f4e5inbox"
created: "{created}"
modified: "{TODAY}"
audience: {f'"{audience}"' if audience else "[]"}
difficulty: {difficulty if difficulty else ""}
prompt_category: {f'"{prompt_category}"' if prompt_category else ""}
prompt_type: {prompt_type if prompt_type else ""}
prompt_status: draft
related:
role: []
format:
id: "{slug}"
intent:
language: {language if language else ""}
length:
owner: MM
prompt_subcategory: []
source: "{source}"
summary:
tone:
tools: []
version: 1.0.0
---"""

    # Build body — if source already has template sections, keep them;
    # otherwise wrap in template structure
    if "## " in body and ("Instructions" in body or "Description" in body):
        # Already has some structure — just clean it up
        content = body
    else:
        # Raw prompt text — wrap it
        content = f"""
## \U0001f4a1Prompt {title}

{body}

## \U0001f4ddDescription

## \U0001f4cbInstructions
```ENG
{body}
```

## Example Usage

## \U0001f4ddChangelog
- **1.0.0 ({TODAY})** — Migrated from prompt library consolidation.
"""

    return fm + "\n" + content


def find_file_in_vault(filename: str, format_key: str) -> Path | None:
    """Find a file by name in the appropriate format folder."""
    folder = FOLDERS.get(format_key)
    if not folder:
        return None
    for f in folder.rglob("*.md"):
        if f.name == filename:
            return f
    return None


def parse_report_table(report_text: str) -> list[dict]:
    """Parse the dedup report table into structured entries."""
    entries = []
    in_table = False

    for line in report_text.split("\n"):
        if line.startswith("| Group |"):
            in_table = True
            continue
        if line.startswith("|---"):
            continue
        if not line.startswith("|") or not in_table:
            continue

        cells = [c.strip() for c in line.split("|")[1:-1]]
        if len(cells) < 7:
            continue

        group_id = cells[0].strip()
        format_a = cells[1].strip()
        format_b = cells[2].strip()
        format_c = cells[3].strip()
        copilot = cells[4].strip()
        action = cells[5].strip().strip("*")
        notes = cells[6].strip()

        def extract_filenames(cell):
            """Extract filenames from a cell like `file.md` (stub) [123c]"""
            if cell == "\u2014" or not cell:
                return []
            return re.findall(r"`([^`]+\.md)`", cell)

        entries.append(
            {
                "group": group_id,
                "a_files": extract_filenames(format_a),
                "b_files": extract_filenames(format_b),
                "c_files": extract_filenames(format_c),
                "copilot_files": extract_filenames(copilot),
                "action": action,
                "notes": notes,
            }
        )

    return entries


def execute_archive(filepath: Path, dry_run: bool) -> str:
    """Move a file to Archive."""
    dest = ARCHIVE_DIR / filepath.name
    # Handle name collision
    if dest.exists():
        stem = dest.stem
        suffix = dest.suffix
        i = 1
        while dest.exists():
            dest = ARCHIVE_DIR / f"{stem} ({i}){suffix}"
            i += 1

    if dry_run:
        return f"  [DRY] Archive: {filepath.name} -> Archive/"
    else:
        ARCHIVE_DIR.mkdir(parents=True, exist_ok=True)
        shutil.move(str(filepath), str(dest))
        return f"  Archived: {filepath.name}"


def execute_keep_b(entry: dict, dry_run: bool) -> list[str]:
    """KEEP_B: Clean B filename, archive A/C copies."""
    actions = []

    # Clean B filename
    for b_name in entry["b_files"]:
        b_path = find_file_in_vault(b_name, "B")
        if not b_path:
            actions.append(f"  WARNING: B file not found: {b_name}")
            continue

        clean_title = normalize_title(b_name)
        new_name = clean_filename(clean_title)

        if b_path.name != new_name:
            new_path = b_path.parent / new_name
            if new_path.exists():
                actions.append(f"  SKIP rename (exists): {b_name} -> {new_name}")
            elif dry_run:
                actions.append(f"  [DRY] Rename: {b_name} -> {new_name}")
            else:
                # Update title in frontmatter
                text = b_path.read_text(encoding="utf-8", errors="replace")
                fm_raw, body = parse_frontmatter_raw(text)
                fm_raw = strip_copilot_keys(fm_raw)
                # Update title
                fm_raw = re.sub(
                    r"^title:.*$",
                    f'title: "{clean_title}"',
                    fm_raw,
                    flags=re.MULTILINE,
                )
                # Update modified date
                fm_raw = re.sub(
                    r"^modified:.*$",
                    f'modified: "{TODAY}"',
                    fm_raw,
                    flags=re.MULTILINE,
                )
                # Ensure id field
                slug = make_slug(clean_title)
                if re.search(r"^id:\s*$", fm_raw, re.MULTILINE):
                    fm_raw = re.sub(
                        r"^id:\s*$", f'id: "{slug}"', fm_raw, flags=re.MULTILINE
                    )
                elif "id:" not in fm_raw:
                    fm_raw += f'\nid: "{slug}"'

                b_path.write_text(f"---\n{fm_raw}\n---\n{body}", encoding="utf-8")
                shutil.move(str(b_path), str(new_path))
                actions.append(f"  Renamed: {b_name} -> {new_name}")

    # Archive A copies
    for a_name in entry["a_files"]:
        a_path = find_file_in_vault(a_name, "A")
        if a_path:
            actions.append(execute_archive(a_path, dry_run))

    # Archive C copies
    for c_name in entry["c_files"]:
        c_path = find_file_in_vault(c_name, "C")
        if c_path:
            actions.append(execute_archive(c_path, dry_run))

    return actions


def execute_merge_a_to_b(entry: dict, dry_run: bool) -> list[str]:
    """MERGE_A_TO_B: Merge A content into B template, archive A."""
    actions = []

    # Find the A file with most content
    best_a = None
    best_a_len = 0
    for a_name in entry["a_files"]:
        a_path = find_file_in_vault(a_name, "A")
        if a_path:
            text = a_path.read_text(encoding="utf-8", errors="replace")
            _, body = parse_frontmatter(text)
            if len(body) > best_a_len:
                best_a = a_path
                best_a_len = len(body)

    if not best_a:
        actions.append("  WARNING: No A file found for merge")
        return actions

    a_text = best_a.read_text(encoding="utf-8", errors="replace")
    _, a_body = parse_frontmatter(a_text)

    for b_name in entry["b_files"]:
        b_path = find_file_in_vault(b_name, "B")
        if not b_path:
            continue

        b_text = b_path.read_text(encoding="utf-8", errors="replace")
        b_fm_raw, b_body = parse_frontmatter_raw(b_text)

        # Inject A's body into B's Instructions ENG block
        if "```ENG" in b_body:
            b_body = re.sub(
                r"```ENG\s*\n(.*?)```",
                f"```ENG\n{a_body}\n```",
                b_body,
                flags=re.DOTALL,
            )
        else:
            b_body += f"\n\n## \U0001f4cbInstructions\n```ENG\n{a_body}\n```\n"

        # Clean frontmatter
        b_fm_raw = strip_copilot_keys(b_fm_raw)
        clean_title = normalize_title(b_name)
        b_fm_raw = re.sub(
            r"^title:.*$",
            f'title: "{clean_title}"',
            b_fm_raw,
            flags=re.MULTILINE,
        )
        b_fm_raw = re.sub(
            r"^modified:.*$",
            f'modified: "{TODAY}"',
            b_fm_raw,
            flags=re.MULTILINE,
        )

        new_name = clean_filename(clean_title)

        if dry_run:
            actions.append(f"  [DRY] Merge A->B: {best_a.name} into {b_name}")
            actions.append(f"  [DRY] Rename: {b_name} -> {new_name}")
        else:
            b_path.write_text(f"---\n{b_fm_raw}\n---\n{b_body}", encoding="utf-8")
            if b_path.name != new_name:
                new_path = b_path.parent / new_name
                if not new_path.exists():
                    shutil.move(str(b_path), str(new_path))
            actions.append(f"  Merged: {best_a.name} into {b_name} -> {new_name}")

    # Archive all A files
    for a_name in entry["a_files"]:
        a_path = find_file_in_vault(a_name, "A")
        if a_path:
            actions.append(execute_archive(a_path, dry_run))

    return actions


def execute_upgrade(entry: dict, format_key: str, dry_run: bool) -> list[str]:
    """UPGRADE_A or UPGRADE_C: Convert to Template v2 and move to Drafts."""
    actions = []
    files = entry["a_files"] if format_key == "A" else entry["c_files"]

    for fname in files:
        filepath = find_file_in_vault(fname, format_key)
        if not filepath:
            actions.append(f"  WARNING: File not found: {fname}")
            continue

        text = filepath.read_text(encoding="utf-8", errors="replace")
        fm, body = parse_frontmatter(text)
        clean_title = normalize_title(fname)
        new_content = build_template_v2(clean_title, body, fm)
        new_name = clean_filename(clean_title)
        dest = DRAFTS_DIR / new_name

        if dest.exists():
            actions.append(f"  SKIP upgrade (exists): {new_name}")
            continue

        if dry_run:
            actions.append(
                f"  [DRY] Upgrade {format_key}: {fname} -> Drafts/{new_name}"
            )
        else:
            DRAFTS_DIR.mkdir(parents=True, exist_ok=True)
            dest.write_text(new_content, encoding="utf-8")
            # Archive original
            actions.append(execute_archive(filepath, dry_run=False))
            actions.append(f"  Upgraded: {fname} -> Drafts/{new_name}")

    return actions


def main():
    dry_run = "--execute" not in sys.argv
    if dry_run:
        print("=== DRY RUN MODE (use --execute to apply changes) ===\n")
    else:
        print("=== EXECUTING CHANGES ===\n")

    if not REPORT.exists():
        print(f"ERROR: Report not found at {REPORT}")
        sys.exit(1)

    report_text = REPORT.read_text(encoding="utf-8", errors="replace")
    entries = parse_report_table(report_text)
    print(f"Parsed {len(entries)} groups from report\n")

    # Ensure archive dir exists
    ARCHIVE_DIR.mkdir(parents=True, exist_ok=True)

    stats = defaultdict(int)
    all_actions = []

    for entry in entries:
        action = entry["action"]
        stats[action] += 1
        group_actions = [f"Group {entry['group']}: {action}"]

        if action == "KEEP_B":
            group_actions.extend(execute_keep_b(entry, dry_run))
        elif action == "MERGE_A_TO_B":
            group_actions.extend(execute_merge_a_to_b(entry, dry_run))
        elif action == "UPGRADE_A":
            group_actions.extend(execute_upgrade(entry, "A", dry_run))
        elif action == "UPGRADE_C":
            group_actions.extend(execute_upgrade(entry, "C", dry_run))
        elif action == "ARCHIVE":
            # Archive all non-COPILOT files
            for a_name in entry["a_files"]:
                a_path = find_file_in_vault(a_name, "A")
                if a_path:
                    group_actions.append(execute_archive(a_path, dry_run))
            for b_name in entry["b_files"]:
                b_path = find_file_in_vault(b_name, "B")
                if b_path:
                    group_actions.append(execute_archive(b_path, dry_run))
            for c_name in entry["c_files"]:
                c_path = find_file_in_vault(c_name, "C")
                if c_path:
                    group_actions.append(execute_archive(c_path, dry_run))
        elif action == "SKIP":
            group_actions.append("  Skipped (production copilot)")

        if len(group_actions) > 1:
            all_actions.extend(group_actions)
            all_actions.append("")

    # Print actions
    for line in all_actions:
        print(line)

    print("\n=== Summary ===")
    for action, count in sorted(stats.items()):
        print(f"  {action}: {count}")

    if dry_run:
        print("\nNo changes made. Run with --execute to apply.")


if __name__ == "__main__":
    main()
