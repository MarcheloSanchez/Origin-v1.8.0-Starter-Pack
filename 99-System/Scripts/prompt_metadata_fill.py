"""
Prompt Metadata Fill Script
After consolidation, fills safe default metadata on all prompt notes.

Phase 1 (automated): type, fileClass, tags, status, prompt_status, created, modified,
                      version, owner. Strips copilot-command-* keys.
Phase 2 (Claude-assisted): prompt_category, prompt_type, intent, difficulty, audience, summary
                           — outputs suggestions for user confirmation.

Usage:
    python prompt_metadata_fill.py              # dry-run
    python prompt_metadata_fill.py --execute    # apply safe defaults
    python prompt_metadata_fill.py --suggest    # generate AI-ready suggestion batches
"""

import re
import sys
from pathlib import Path
from datetime import date

# --- Config ---
VAULT = Path(
    r"C:\Users\MarcelMachanec\Documents\_Foundation for ORIGIN"
    r"\Origin_DEV_STARTER_PACK\Origin-v1.9.1-Starter-Pack"
)

# Scan these folders for keeper prompts
SCAN_DIRS = [
    VAULT / "07-Prompts" / "Active",
    VAULT / "07-Prompts" / "Drafts",
    VAULT / "07-Prompts" / "Prompts_org",
]

TODAY = date.today().isoformat()

COPILOT_KEYS = [
    "copilot-command-context-menu-enabled",
    "copilot-command-slash-enabled",
    "copilot-command-context-menu-order",
    "copilot-command-model-key",
    "copilot-command-last-used",
]

# Safe defaults to set/ensure
SAFE_DEFAULTS = {
    "type": "prompt",
    "fileClass": "prompt",
    "owner": "MM",
    "version": "1.0.0",
    "source": "personal",
}

REQUIRED_TAG = "\U0001F916AI/prompt"


def parse_frontmatter_lines(text: str) -> tuple[list[str], str]:
    """Return frontmatter as lines and body as string."""
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            return parts[1].strip().split("\n"), parts[2]
    return [], text


def get_fm_value(lines: list[str], key: str) -> str | None:
    """Get a simple scalar value from frontmatter lines."""
    for line in lines:
        if line.startswith(f"{key}:"):
            val = line[len(key) + 1:].strip().strip('"').strip("'")
            return val if val else None
    return None


def set_fm_value(lines: list[str], key: str, value: str) -> list[str]:
    """Set or add a frontmatter key-value pair."""
    found = False
    result = []
    for line in lines:
        if line.startswith(f"{key}:"):
            result.append(f'{key}: "{value}"' if " " in value or any(
                c in value for c in "[]{},:!@#$%^&*()"
            ) else f"{key}: {value}")
            found = True
        else:
            result.append(line)
    if not found:
        result.append(f'{key}: "{value}"' if " " in value else f"{key}: {value}")
    return result


def has_tag(lines: list[str], tag: str) -> bool:
    """Check if a tag exists in the frontmatter."""
    in_tags = False
    for line in lines:
        if line.startswith("tags:"):
            # Inline array format
            if "[" in line:
                return tag in line
            in_tags = True
            continue
        if in_tags:
            if line.startswith("  - ") or line.startswith("  -"):
                if tag in line:
                    return True
            else:
                in_tags = False
    return False


def ensure_tag(lines: list[str], tag: str) -> list[str]:
    """Ensure a tag exists in the tags array."""
    if has_tag(lines, tag):
        return lines

    result = []
    found_tags = False
    for i, line in enumerate(lines):
        result.append(line)
        if line.startswith("tags:"):
            found_tags = True
            # Inline array format
            if "[]" in line:
                result[-1] = "tags:"
                result.append(f'  - "{tag}"')
            elif "[" in line:
                # Convert inline to multi-line and add tag
                existing = re.findall(r'"([^"]+)"', line)
                result[-1] = "tags:"
                for t in existing:
                    result.append(f'  - "{t}"')
                result.append(f'  - "{tag}"')
            else:
                # Multi-line, tag will be added after existing entries
                pass
        elif found_tags and not line.startswith("  - "):
            # End of tags section, insert before this line
            result.insert(-1, f'  - "{tag}"')
            found_tags = False

    if not any(line.startswith("tags:") for line in lines):
        result.append("tags:")
        result.append(f'  - "{tag}"')

    return result


def strip_copilot_keys(lines: list[str]) -> list[str]:
    """Remove copilot-command-* lines."""
    return [l for l in lines if not any(l.strip().startswith(k) for k in COPILOT_KEYS)]


def process_file(filepath: Path, dry_run: bool) -> list[str]:
    """Process a single file, applying safe defaults. Returns list of changes made."""
    text = filepath.read_text(encoding="utf-8", errors="replace")
    fm_lines, body = parse_frontmatter_lines(text)

    if not fm_lines:
        return [f"  SKIP (no frontmatter): {filepath.name}"]

    changes = []
    original_lines = fm_lines.copy()

    # Strip copilot keys
    new_lines = strip_copilot_keys(fm_lines)
    removed = len(fm_lines) - len(new_lines)
    if removed:
        changes.append(f"  Strip {removed} copilot-command-* keys")
        fm_lines = new_lines

    # Set safe defaults
    for key, default in SAFE_DEFAULTS.items():
        current = get_fm_value(fm_lines, key)
        if not current or (key == "fileClass" and current == "Prompt"):
            fm_lines = set_fm_value(fm_lines, key, default)
            if current != default:
                changes.append(f"  Set {key}: {default}")

    # Ensure tag
    if not has_tag(fm_lines, REQUIRED_TAG):
        fm_lines = ensure_tag(fm_lines, REQUIRED_TAG)
        changes.append(f"  Add tag: {REQUIRED_TAG}")

    # Set prompt_status if missing
    if not get_fm_value(fm_lines, "prompt_status"):
        fm_lines = set_fm_value(fm_lines, "prompt_status", "draft")
        changes.append("  Set prompt_status: draft")

    # Set status if missing
    if not get_fm_value(fm_lines, "status"):
        fm_lines = set_fm_value(fm_lines, "status", "\U0001F4E5inbox")
        changes.append("  Set status: \U0001F4E5inbox")

    # Update modified date
    current_modified = get_fm_value(fm_lines, "modified")
    if current_modified != TODAY:
        fm_lines = set_fm_value(fm_lines, "modified", TODAY)
        changes.append(f"  Update modified: {TODAY}")

    # Ensure created date
    if not get_fm_value(fm_lines, "created"):
        fm_lines = set_fm_value(fm_lines, "created", TODAY)
        changes.append(f"  Set created: {TODAY}")

    if changes and not dry_run:
        new_text = "---\n" + "\n".join(fm_lines) + "\n---" + body
        filepath.write_text(new_text, encoding="utf-8")

    return changes


def generate_suggestion_batches(batch_size: int = 20):
    """Generate batches of prompts that need Claude-assisted metadata."""
    all_prompts = []
    for scan_dir in SCAN_DIRS:
        if not scan_dir.exists():
            continue
        for f in sorted(scan_dir.rglob("*.md")):
            text = f.read_text(encoding="utf-8", errors="replace")
            fm_lines, body = parse_frontmatter_lines(text)
            if not fm_lines:
                continue

            # Check which fields are missing
            missing = []
            for field in ["prompt_category", "prompt_type", "intent",
                          "difficulty", "audience", "summary"]:
                if not get_fm_value(fm_lines, field):
                    missing.append(field)

            if missing:
                all_prompts.append({
                    "path": str(f.relative_to(VAULT)),
                    "filename": f.name,
                    "missing": missing,
                    "preview": body[:300].replace("\n", " ").strip(),
                })

    # Output batches
    output_dir = VAULT / "07-Prompts" / "01-Docs"
    batch_num = 1
    for i in range(0, len(all_prompts), batch_size):
        batch = all_prompts[i:i + batch_size]
        lines = [
            f"# Metadata Suggestion Batch {batch_num}",
            "",
            f"Total prompts in this batch: {len(batch)}",
            "",
            "For each prompt below, suggest values for the missing fields.",
            "Available prompt_category values:",
            "- \U0001F4E5 Inbox / Unfiltered",
            "- \U0001F9E0 Mastery Prompts",
            "- \U0001F5E3 Voice & Roleplay",
            "- \U0001F4DA Learning & Teaching",
            "- \U0001F4A1 Personal Growth",
            "- \U0001F4BC Career Building",
            "- \U0001F4CA Strategy & Planning",
            "- \U0001F4E3 Content & Marketing",
            "- \U0001F9FE Comprehension & Summarization",
            "- \U0001F9EA QA / Testing Prompts",
            "- \U0001F5A8 3D Printing Prompts",
            "- \u270D\uFE0F Copywriting",
            "- \U0001F4C8 Business / Product Dev",
            "",
            "---",
            "",
        ]

        for j, prompt in enumerate(batch, 1):
            lines.extend([
                f"## {j}. `{prompt['filename']}`",
                f"**Path**: `{prompt['path']}`",
                f"**Missing**: {', '.join(prompt['missing'])}",
                f"**Preview**: {prompt['preview'][:200]}...",
                "",
                "**Suggestions**:",
                "",
            ])
            for field in prompt["missing"]:
                lines.append(f"- {field}: ")
            lines.extend(["", "---", ""])

        output_file = output_dir / f"_metadata-batch-{batch_num}.md"
        output_file.write_text("\n".join(lines), encoding="utf-8")
        print(f"  Batch {batch_num}: {len(batch)} prompts -> {output_file.name}")
        batch_num += 1

    print(f"\nTotal: {len(all_prompts)} prompts need metadata in {batch_num - 1} batches")


def main():
    dry_run = "--execute" not in sys.argv
    suggest_mode = "--suggest" in sys.argv

    if suggest_mode:
        print("=== Generating metadata suggestion batches ===\n")
        generate_suggestion_batches()
        return

    if dry_run:
        print("=== DRY RUN MODE (use --execute to apply) ===\n")
    else:
        print("=== EXECUTING METADATA FILL ===\n")

    total_files = 0
    total_changes = 0
    files_changed = 0

    for scan_dir in SCAN_DIRS:
        if not scan_dir.exists():
            print(f"  SKIP (not found): {scan_dir}")
            continue

        print(f"Scanning: {scan_dir.relative_to(VAULT)}/")
        for filepath in sorted(scan_dir.rglob("*.md")):
            total_files += 1
            changes = process_file(filepath, dry_run)
            if changes:
                files_changed += 1
                total_changes += len(changes)
                prefix = "[DRY] " if dry_run else ""
                print(f"  {prefix}{filepath.name}:")
                for c in changes:
                    print(f"    {c}")

    print(f"\n=== Summary ===")
    print(f"  Files scanned: {total_files}")
    print(f"  Files to update: {files_changed}")
    print(f"  Total changes: {total_changes}")

    if dry_run:
        print("\nNo changes made. Run with --execute to apply.")


if __name__ == "__main__":
    main()
