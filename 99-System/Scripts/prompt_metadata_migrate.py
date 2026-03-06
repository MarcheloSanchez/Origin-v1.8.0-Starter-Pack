"""
Prompt Metadata Migration Script
Strips killed fields and ensures Tier 1 fields on all surviving prompts.

Usage:
    python prompt_metadata_migrate.py              # dry-run
    python prompt_metadata_migrate.py --execute    # apply changes
"""

import re
import sys
from pathlib import Path
from datetime import date

VAULT = Path(
    r"C:\Users\MarcelMachanec\Documents\_Foundation for ORIGIN"
    r"\Origin_DEV_STARTER_PACK\Origin-v1.9.1-Starter-Pack"
)

SCAN_DIRS = [
    VAULT / "07-Prompts" / "Reference",
    VAULT / "07-Prompts" / "Inbox",
    VAULT / "07-Prompts" / "Workbench",
    VAULT / "07-Prompts" / "Fun",
]

TODAY = date.today().isoformat()

# Fields to remove
KILLED_FIELDS = {
    "intent", "audience", "role", "format", "format_pref", "tone",
    "guardrails", "eval_score", "last_run", "context_packs",
    "model_defaults", "id", "prompt_subcategory", "pattern",
    "source", "length", "inputs_schema", "deliverable_schema",
    "license", "tools", "prompt_status", "fileClass", "in",
    "copilot-command-context-menu-enabled",
    "copilot-command-slash-enabled",
    "copilot-command-context-menu-order",
    "copilot-command-model-key",
    "copilot-command-last-used",
}

# Tier 1 defaults (only added if missing)
TIER1_DEFAULTS = {
    "type": "prompt",
    "status": "draft",
    "tags": "\n  - 🤖AI/prompt",
    "owner": "MM",
}


def split_frontmatter(text: str) -> tuple[str | None, str]:
    """Split file into frontmatter string and body. Returns (None, text) if no frontmatter."""
    if not text.startswith("---"):
        return None, text
    parts = text.split("---", 2)
    if len(parts) < 3:
        return None, text
    return parts[1], parts[2]


def strip_killed_fields(fm_text: str) -> str:
    """Remove killed fields from frontmatter, handling multi-line values."""
    lines = fm_text.split("\n")
    result = []
    skipping = False

    for line in lines:
        # Check if this is a top-level key line (not indented)
        key_match = re.match(r"^([a-zA-Z_][a-zA-Z0-9_-]*)\s*:", line)
        if key_match:
            key = key_match.group(1)
            if key in KILLED_FIELDS:
                skipping = True
                continue
            else:
                skipping = False
        elif skipping:
            # Continuation line (indented) of a killed field
            if line.startswith("  ") or line.startswith("\t") or line.strip() == "":
                continue
            else:
                skipping = False

        result.append(line)

    return "\n".join(result)


def get_existing_keys(fm_text: str) -> set[str]:
    """Extract top-level keys from frontmatter."""
    keys = set()
    for line in fm_text.split("\n"):
        m = re.match(r"^([a-zA-Z_][a-zA-Z0-9_-]*)\s*:", line)
        if m:
            keys.add(m.group(1))
    return keys


def ensure_tier1(fm_text: str) -> str:
    """Add missing Tier 1 fields with defaults."""
    existing = get_existing_keys(fm_text)
    additions = []

    for key, default in TIER1_DEFAULTS.items():
        if key not in existing:
            if key == "tags":
                additions.append(f"tags:{default}")
            else:
                additions.append(f'{key}: "{default}"')

    if "created" not in existing:
        additions.append(f'created: "{TODAY}"')
    if "modified" not in existing:
        additions.append(f'modified: "{TODAY}"')

    if additions:
        fm_text = fm_text.rstrip() + "\n" + "\n".join(additions)

    return fm_text


def process_file(filepath: Path, dry_run: bool) -> dict:
    """Process a single file. Returns stats dict."""
    text = filepath.read_text(encoding="utf-8", errors="replace")
    fm_text, body = split_frontmatter(text)

    if fm_text is None:
        return {"skipped": 1, "no_frontmatter": True}

    original_fm = fm_text

    # Strip killed fields
    fm_text = strip_killed_fields(fm_text)

    # Ensure Tier 1
    fm_text = ensure_tier1(fm_text)

    # Clean up multiple blank lines in frontmatter
    fm_text = re.sub(r"\n{3,}", "\n\n", fm_text)

    if fm_text == original_fm:
        return {"unchanged": 1}

    # Count what changed
    original_keys = get_existing_keys(original_fm)
    new_keys = get_existing_keys(fm_text)
    removed = original_keys - new_keys - {""}
    killed_removed = removed & KILLED_FIELDS
    added = new_keys - original_keys - {""}

    if not dry_run:
        new_text = f"---{fm_text}---{body}"
        filepath.write_text(new_text, encoding="utf-8")

    return {
        "modified": 1,
        "fields_removed": killed_removed,
        "fields_added": added,
    }


def main():
    dry_run = "--execute" not in sys.argv
    mode = "DRY RUN" if dry_run else "EXECUTING"
    print(f"=== {mode} ===\n")

    total = {"files": 0, "modified": 0, "unchanged": 0, "skipped": 0}
    all_removed = set()
    all_added = set()

    for scan_dir in SCAN_DIRS:
        if not scan_dir.exists():
            continue

        files = sorted(scan_dir.glob("*.md"))
        if not files:
            continue

        print(f"--- {scan_dir.name}/ ({len(files)} files) ---")

        for f in files:
            total["files"] += 1
            result = process_file(f, dry_run)

            if result.get("skipped"):
                total["skipped"] += 1
                print(f"  SKIP (no frontmatter): {f.name}")
            elif result.get("unchanged"):
                total["unchanged"] += 1
            elif result.get("modified"):
                total["modified"] += 1
                removed = result.get("fields_removed", set())
                added = result.get("fields_added", set())
                all_removed |= removed
                all_added |= added
                detail = []
                if removed:
                    detail.append(f"-{','.join(sorted(removed))}")
                if added:
                    detail.append(f"+{','.join(sorted(added))}")
                print(f"  {'[DRY] ' if dry_run else ''}Modified: {f.name} ({'; '.join(detail)})")

        print()

    print("=== Summary ===")
    print(f"  Files scanned: {total['files']}")
    print(f"  Modified: {total['modified']}")
    print(f"  Unchanged: {total['unchanged']}")
    print(f"  Skipped: {total['skipped']}")
    if all_removed:
        print(f"  Unique fields removed: {', '.join(sorted(all_removed))}")
    if all_added:
        print(f"  Unique fields added: {', '.join(sorted(all_added))}")

    if dry_run:
        print("\nNo changes made. Run with --execute to apply.")


if __name__ == "__main__":
    main()
