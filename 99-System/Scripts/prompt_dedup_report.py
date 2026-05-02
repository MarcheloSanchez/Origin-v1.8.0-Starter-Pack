"""
Prompt Dedup Report Generator
Scans all prompt folders, normalizes titles, matches duplicates via fuzzy matching,
and outputs a Markdown report for user review.
"""

import re
from pathlib import Path
from collections import defaultdict

from thefuzz import fuzz

# --- Config ---
VAULT = Path(
    r"C:\Users\MarcelMachanec\Documents\_Foundation for ORIGIN"
    r"\Origin_DEV_STARTER_PACK\Origin-v1.9.1-Starter-Pack"
)

FOLDERS = {
    "A": VAULT / "99-System" / "copilot-custom-prompts",
    "B": VAULT / "99-System" / "Prompts" / "Reference",
    "C": VAULT / "99-System" / "Prompts" / "Workbench",
    "COPILOT": VAULT / "99-System" / "copilot-custom-prompts",
}

OUTPUT = VAULT / "99-System" / "Prompts" / "01-Docs" / "_dedup-report.md"
FUZZY_THRESHOLD = 80


def parse_frontmatter(text: str) -> tuple[dict, str]:
    """Extract YAML frontmatter and body from markdown text."""
    fm = {}
    body = text
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            for line in parts[1].strip().split("\n"):
                if ":" in line:
                    key, _, val = line.partition(":")
                    fm[key.strip()] = val.strip().strip('"').strip("'")
            body = parts[2].strip()
    return fm, body


def normalize_title(filename: str) -> str:
    """Strip emoji, prefixes, suffixes, extensions to get a clean comparable title."""
    name = Path(filename).stem

    # Remove common prefixes
    name = re.sub(r"^(PPS?\s*-?\s*|PP\s*-?\s*)", "", name, flags=re.IGNORECASE)
    # Remove emoji (unicode emoji ranges)
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
    # Remove "- Detail" / "Detail" / "- DETAIL" / "Detail 1" suffix
    name = re.sub(r"\s*-?\s*Detail\s*\d*\s*$", "", name, flags=re.IGNORECASE)
    # Remove leading numbers and numbering like "01 -", "pp01"
    name = re.sub(r"^(pp)?\d+\s*[-.]?\s*", "", name, flags=re.IGNORECASE)
    # Clean up whitespace and dashes
    name = re.sub(r"[-_]+", " ", name)
    name = re.sub(r"\s+", " ", name).strip()
    return name


def body_length(body: str) -> int:
    """Length of body excluding whitespace-only content."""
    stripped = body.strip()
    # Check if it's just template placeholders
    if re.match(r"^(\s*##\s+.*\n?)*$", stripped):
        return 0
    return len(stripped)


def is_stub(body: str) -> bool:
    """Check if body is essentially empty (template with no real content)."""
    stripped = body.strip()
    if not stripped:
        return True
    # Remove section headers
    cleaned = re.sub(r"#+\s+.*", "", stripped)
    # Remove fenced code blocks (empty or with just language tag)
    cleaned = re.sub(r"```\w*\s*```", "", cleaned)
    # Remove wikilinks placeholders
    cleaned = re.sub(r"\[\[.*?\]\]", "", cleaned)
    # Remove markdown links
    cleaned = re.sub(r"\[.*?\]", "", cleaned)
    # Remove common template boilerplate phrases
    cleaned = re.sub(r"See also:\s*\.{0,3}", "", cleaned)
    cleaned = re.sub(r"\(Optional\).*", "", cleaned)
    cleaned = re.sub(r"Add a section for.*", "", cleaned)
    # Remove standalone punctuation, stars, colons
    cleaned = re.sub(r"[*:_\-|>]+", " ", cleaned)
    cleaned = cleaned.strip()
    return len(cleaned) < 30


def scan_folder(folder: Path, format_key: str) -> list[dict]:
    """Scan a folder and extract metadata from all .md files."""
    results = []
    if not folder.exists():
        print(f"WARNING: {folder} does not exist")
        return results
    for f in sorted(folder.rglob("*.md")):
        text = f.read_text(encoding="utf-8", errors="replace")
        fm, body = parse_frontmatter(text)
        norm = normalize_title(f.name)
        results.append(
            {
                "path": str(f.relative_to(VAULT)),
                "filename": f.name,
                "title_normalized": norm,
                "title_lower": norm.lower(),
                "format": format_key,
                "fm": fm,
                "body_length": body_length(body),
                "is_stub": is_stub(body),
                "preview": body[:200].replace("\n", " ").strip(),
                "body": body,
            }
        )
    return results


def find_match_groups(all_notes: list[dict]) -> list[dict]:
    """Group notes by fuzzy title matching."""
    matched = set()
    groups = []

    # Sort by title for deterministic grouping
    notes = sorted(all_notes, key=lambda n: n["title_lower"])

    for i, note_a in enumerate(notes):
        if i in matched:
            continue
        group = [note_a]
        matched.add(i)
        for j, note_b in enumerate(notes):
            if j in matched:
                continue
            ratio = fuzz.ratio(note_a["title_lower"], note_b["title_lower"])
            token_ratio = fuzz.token_sort_ratio(
                note_a["title_lower"], note_b["title_lower"]
            )
            if max(ratio, token_ratio) >= FUZZY_THRESHOLD:
                group.append(note_b)
                matched.add(j)
        groups.append(group)

    return groups


def recommend_action(group: list[dict]) -> tuple[str, str]:
    """Determine recommended action for a match group."""
    formats_present = {n["format"] for n in group}
    by_format = defaultdict(list)
    for n in group:
        by_format[n["format"]].append(n)

    has_b = "B" in formats_present
    has_a = "A" in formats_present
    has_c = "C" in formats_present
    has_copilot = "COPILOT" in formats_present

    # Single note, no matches
    if len(group) == 1:
        note = group[0]
        if note["is_stub"]:
            return "ARCHIVE", "Empty stub, no content"
        if note["format"] == "B":
            return "KEEP_B", "Organized version, no duplicates"
        if note["format"] == "A":
            if has_copilot:
                return "ARCHIVE", "Duplicate of Copilot real"
            return "UPGRADE_A", "No organized equivalent — convert to Template v2"
        if note["format"] == "C":
            return "UPGRADE_C", "No organized equivalent — convert to Template v2"
        if note["format"] == "COPILOT":
            return "SKIP", "Production copilot prompt — do not touch"
        return "MANUAL", "Unknown format"

    # Multi-note group
    b_notes = by_format.get("B", [])
    a_notes = by_format.get("A", [])
    c_notes = by_format.get("C", [])

    # A + COPILOT only (no B, no C) — A is a draft copy of production copilot
    if has_a and has_copilot and not has_b and not has_c:
        return "ARCHIVE", "Draft copy of production Copilot prompt — archive A"

    # Check if all non-COPILOT are stubs
    non_copilot = [n for n in group if n["format"] != "COPILOT"]
    if non_copilot and all(n["is_stub"] for n in non_copilot):
        return "ARCHIVE", "All non-copilot copies are stubs"

    if has_b:
        b_has_content = any(not n["is_stub"] for n in b_notes)
        a_has_content = any(not n["is_stub"] for n in a_notes)

        if b_has_content:
            return "KEEP_B", "Organized version has content — archive A/C copies"
        elif a_has_content:
            return "MERGE_A_TO_B", "B is stub, A has content — merge A into B template"
        else:
            return "ARCHIVE", "All versions are stubs"
    elif has_a and has_c:
        a_has_content = any(not n["is_stub"] for n in a_notes)
        if a_has_content:
            return "UPGRADE_A", "A has content, no B — convert to Template v2"
        return "UPGRADE_C", "C has content, no B — convert to Template v2"
    elif has_c and not has_a and not has_b:
        # Multiple C notes grouped together
        has_content = any(not n["is_stub"] for n in c_notes)
        if has_content:
            return "UPGRADE_C", "Keyword prompts, no B — convert best to Template v2"
        return "ARCHIVE", "All keyword stubs"

    return "MANUAL", "Complex match — needs user review"


def format_group_row(group_id: int, group: list[dict], action: str, notes: str) -> str:
    """Format a group as markdown table rows."""
    by_format = defaultdict(list)
    for n in group:
        by_format[n["format"]].append(n)

    def cell(fmt):
        items = by_format.get(fmt, [])
        if not items:
            return "—"
        parts = []
        for n in items:
            stub = " (stub)" if n["is_stub"] else ""
            size = f" [{n['body_length']}c]"
            parts.append(f"`{n['filename']}`{stub}{size}")
        return "<br>".join(parts)

    return (
        f"| {group_id} | {cell('A')} | {cell('B')} | {cell('C')} "
        f"| {cell('COPILOT')} | **{action}** | {notes} |"
    )


def generate_report(groups: list[tuple[list[dict], str, str]]) -> str:
    """Generate the full markdown report."""
    lines = [
        "---",
        "title: Prompt Dedup Report",
        "type: reference",
        "created: 2026-03-04",
        "---",
        "",
        "# Prompt Dedup Report",
        "",
        "## Summary",
        "",
    ]

    # Count actions
    action_counts = defaultdict(int)
    for _, action, _ in groups:
        action_counts[action] += 1

    total_notes = sum(len(g) for g, _, _ in groups)
    lines.append(f"- **Total notes scanned**: {total_notes}")
    lines.append(f"- **Match groups**: {len(groups)}")
    for action, count in sorted(action_counts.items()):
        lines.append(f"- **{action}**: {count}")
    lines.append("")

    # Unique Drafts/copilot that have NO match in 99-System/
    lines.append("## Copilot Drafts Without Real Equivalent")
    lines.append("")
    unique_drafts = []
    for group, action, _ in groups:
        formats = {n["format"] for n in group}
        if "A" in formats and "COPILOT" not in formats:
            for n in group:
                if n["format"] == "A":
                    unique_drafts.append(n)
    if unique_drafts:
        lines.append(
            f"Found **{len(unique_drafts)}** Draft Copilot prompts "
            "with no match in `99-System/copilot-custom-prompts/`:"
        )
        lines.append("")
        for n in unique_drafts[:50]:
            lines.append(f"- `{n['filename']}` [{n['body_length']}c]")
        if len(unique_drafts) > 50:
            lines.append(f"- ... and {len(unique_drafts) - 50} more")
    else:
        lines.append("All Draft Copilot prompts have matches in 99-System/.")
    lines.append("")

    # Action legend
    lines.append("## Action Legend")
    lines.append("")
    lines.append("| Action | Meaning |")
    lines.append("|--------|---------|")
    lines.append("| **KEEP_B** | Organized version is best — archive A/C copies |")
    lines.append(
        "| **MERGE_A_TO_B** | B is stub, A has content — "
        "merge A's text into B's template |"
    )
    lines.append("| **UPGRADE_A** | No B equivalent — convert A to Template v2 |")
    lines.append("| **UPGRADE_C** | No B equivalent — convert C to Template v2 |")
    lines.append("| **ARCHIVE** | Empty stub or superseded — move to Archive |")
    lines.append("| **SKIP** | Production copilot prompt — do not touch |")
    lines.append("| **MANUAL** | Unclear — needs user review |")
    lines.append("")

    # Main table
    lines.append("## Dedup Table")
    lines.append("")
    lines.append(
        "| Group | Format A (Copilot Draft) | Format B (Prompts_org) "
        "| Format C (Keyword) | Copilot Real | Action | Notes |"
    )
    lines.append(
        "|-------|-------------------------|------------------------"
        "|--------------------|--------------|--------|-------|"
    )

    for i, (group, action, notes) in enumerate(groups, 1):
        lines.append(format_group_row(i, group, action, notes))

    lines.append("")
    lines.append("---")
    lines.append(
        "*Generated by `prompt_dedup_report.py` — review and override "
        "recommendations before running consolidation.*"
    )
    return "\n".join(lines)


def main():
    print("Scanning prompt folders...")
    all_notes = []
    for fmt, folder in FOLDERS.items():
        notes = scan_folder(folder, fmt)
        print(f"  {fmt}: {len(notes)} files in {folder.name}/")
        all_notes.append((fmt, notes))

    flat = []
    for _, notes in all_notes:
        flat.extend(notes)

    print(f"\nTotal notes: {len(flat)}")
    print("Finding duplicates via fuzzy title matching...")

    groups = find_match_groups(flat)
    print(f"Match groups: {len(groups)}")

    # Classify each group
    classified = []
    for group in groups:
        action, notes = recommend_action(group)
        classified.append((group, action, notes))

    # Sort: MANUAL first, then by action name
    priority = {
        "MANUAL": 0,
        "MERGE_A_TO_B": 1,
        "KEEP_B": 2,
        "UPGRADE_A": 3,
        "UPGRADE_C": 4,
        "ARCHIVE": 5,
        "SKIP": 6,
    }
    classified.sort(key=lambda x: (priority.get(x[1], 99), x[2]))

    report = generate_report(classified)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(report, encoding="utf-8")
    print(f"\nReport written to: {OUTPUT}")

    # Print summary
    action_counts = defaultdict(int)
    for _, action, _ in classified:
        action_counts[action] += 1
    print("\nAction summary:")
    for action, count in sorted(action_counts.items()):
        print(f"  {action}: {count}")


if __name__ == "__main__":
    main()
