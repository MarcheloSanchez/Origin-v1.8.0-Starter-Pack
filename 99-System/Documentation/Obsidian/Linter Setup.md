---
up: "[[99-System]]"
title: "Linter Setup"
type: guide
status: 🔄active
maturity: 🌲evergreen
created: 2026-05-06
modified: 2026-05-06
---

⬆️:: [[99-System]]

# Linter Setup

Documents which Obsidian Linter rules are enabled, why, and how they interact with the YAML Orchestrator.

---

## Enabled Rules

### `add-blank-line-after-yaml`
Ensures there is exactly one blank line between the closing `---` of the frontmatter and the first body line. Prevents Obsidian rendering glitches where body content runs into the property block.

### `format-tags-in-yaml`
Normalizes tag format inside YAML — removes `#` prefixes if someone types `#💡atomic` instead of `💡atomic`, ensures tags are valid YAML strings.

### `insert-yaml-attributes`
Inserts any **missing** YAML fields when you run Linter manually (not on save). Template used:

```yaml
aliases:
tags:
up:
in:
title:
type:
fileClass:
cssclass:
status:
maturity:
priority:
created:
modified:
```

**What it does NOT cover:** `related:`, `due:`, `next_action:`, `prompt_status:`, `completion_percentage:` — these must be added manually or via the template system.

**Behavior:** Only inserts fields that are absent — does not overwrite existing values. Safe to run on notes that already have partial frontmatter.

### `yaml-timestamp`
Auto-updates the `modified:` field on every save. Format: `YYYY-MM-DD`.

- `date-modified`: ✅ enabled — updates on every save
- `date-created`: ❌ disabled — `created:` is set once at note creation and never touched by Linter
- Source of truth for `modified`: frontmatter (not file system mtime)

---

## When to Run

| Trigger | Rules that fire |
|---------|----------------|
| On save (automatic) | `yaml-timestamp`, `add-blank-line-after-yaml`, `format-tags-in-yaml` |
| Manual command ("Lint the current file") | All enabled rules including `insert-yaml-attributes` |
| Manual command ("Lint all files in vault") | All enabled rules on every file |

Run "Lint the current file" when creating a note from scratch or importing a note that has incomplete frontmatter.

---

## Interaction with YAML Orchestrator

The YAML Orchestrator (`yaml_orchestrator.js`) has three modes: `reorder`, `normalize`, and `lint`.

| Concern | Linter plugin | YAML Orchestrator |
|---------|--------------|-------------------|
| Add blank line after YAML | ✅ on save | ✗ |
| Format tags | ✅ on save | ✗ |
| Insert missing fields | ✅ manual run | ✗ |
| Update `modified:` | ✅ on save | ✗ |
| Reorder fields to canonical order | ✗ | ✅ `reorder` mode |
| Normalize values (status emoji, maturity, field renames) | ✗ | ✅ `normalize` mode |
| Batch lint across folder | ✗ (current file only) | ✅ `lint` mode |
| Per-field validation (enum check) | ✗ | ✅ `lint` mode |

**No conflicts:** Linter runs on save and handles formatting; Orchestrator runs on demand and handles semantic normalization. They do not touch the same fields in ways that conflict.

> **Open question (see TASKS.md):** Whether the Orchestrator's `lint` mode should be kept, removed, or simplified given that the Linter plugin handles formatting. Needs a comparison pass before deciding.

---

## Disabled Rules (notable)

- `yaml-key-sort` — disabled; field order is managed by YAML Orchestrator `reorder` mode instead
- `yaml-title` — disabled; `title:` is set by templates, not derived from filename
- `format-yaml-array` — disabled; array style (single-line vs multi-line) not enforced globally
