---
title: "Template Audit Results"
type: guide
status: 🔄active
created: 2026-03-17
modified: 2026-03-17
tags: [audit, templates, maintenance, automation]
up: "[[📦Template System Guide]]"
---

# Template Audit Results

> [!abstract] Scope
> Read-only audit of all Origin vault templates and plugin configs. Checks broken paths, missing frontmatter fields, duplicates, unused templates, and naming inconsistencies.
>
> **Date**: 2026-03-17
> **Templates scanned**: 159
> **Issues found**: 22

---

## CRITICAL (breaks functionality)

**None found.**

- All 31 QuickAdd template path references resolve correctly
- All 15 Templater folder-template bindings point to valid files

---

## WARNING (potential problems)

### Missing Frontmatter Fields

| Template | Missing | Note |
|----------|---------|------|
| `place-meta.yaml.md` | `status` | Uses `place_status` instead |
| `prompt-meta.yaml.md` | `fileClass`, `in` | Also has hardcoded `owner: MM` and literal dates instead of Templater directives |
| `tool-meta.yaml.md` | `status` | Uses `tool_status` instead |

> [!warning] Impact
> Place and tool notes use domain-specific status fields (`place_status`, `tool_status`) rather than the universal `status`. Dataview queries filtering on `status` won't find these notes. This may be intentional (separate lifecycle from workflow status) — verify before changing.

### QuickAdd (copy) Naming Debt

| Entry | Location |
|-------|----------|
| `Quick Inbox (copy) (copy)` | `🤖Auto - input based` menu |
| `Quick Idea (copy) (copy)` | `🤖Auto - input based` menu |
| `normalize - Setup - Dots&Efforts - w backup (copy) (copy) (copy)` | YAML Setup |
| 9 entries with `(copy)` suffix | `🔗Link 2 Curr Line` submenu |

These are functional but make QuickAdd config harder to maintain. Rename to descriptive names.

### Typo

- QuickAdd entry `People - Proffesional` — double "f", should be `Professional`

---

## INFO (cleanup opportunities)

### Unused Templates (not referenced by any plugin)

| Template | Notes |
|----------|-------|
| `Templates/Create/new-place.md` | Only `new-place-auto.md` used via Templater |
| `Templates/Create/new-tool.md` | Only `new-tool-auto.md` used via Templater |
| `Templates/Create/new-quick-prompt.md` | Not referenced anywhere |
| `Templates/Tests/` (5 files) | Test/experimental files |
| `Templates/_Drafts/` (3 files) | Draft templates never wired up |
| `Templates/Kanban/` (6 files) | Not in QuickAdd — may be used manually |
| Root report templates (3 files) | `Template - Last 7 Days Activity Report.md`, Monthly, Weekly — likely called by scripts |

### Duplicate About Files

- `+About Templatesℹ️.md` (22K chars) — comprehensive guide
- `+Aboutℹ️.md` (487 chars) — short stub

Different content but confusing to have both at root level.

### Naming Inconsistencies

| Pattern | Count | Examples |
|---------|-------|---------|
| Spaces only | 46 | `Quick Capture - Inbox.md` |
| Dashes only | 78 | `new-atomic.md` |
| Mixed space+dash | 21 | `Template - Research Card - Kanban.md` |
| Underscores | 6 | `Template_Kanban.md` |

**Separator styles across legacy templates:**
- `Template - X` (dash)
- `Template, X` (comma)
- `Template_X` (underscore)
- `Templater, X` (comma, different prefix)

Modern templates (`Create/`, `Meta/`, `Body/`) use consistent `kebab-case`. Legacy templates in `Add-Sections/`, `Kanban/`, `Scripts/` use mixed styles.

### Auto/Manual Pairs

All 10 types have `new-X.md` + `new-X-auto.md` with ~67% content overlap. The auto variant adds AI prompt input. This is by design, not a bug.

---

## Stats

| Metric | Count |
|--------|-------|
| Total templates | 159 |
| Referenced by QuickAdd | 17 unique paths (31 total refs) |
| Referenced by Templater | 15 folder bindings |
| Combined unique referenced | ~25 |
| Not directly referenced | ~134 |
| (copy) entries in QuickAdd | 12 |

> [!info] Why 134 unreferenced?
> Most are `Body/`, `Meta/`, `Scripts/`, `Static/` templates — used indirectly via `tp.file.include()` and the `combine()` function in `Templater_script.js`. They are not orphaned.

---

## Recommended Actions

### Quick Fixes (5 min)

- [ ] Fix typo: `People - Proffesional` → `People - Professional` in QuickAdd settings
- [ ] Add `fileClass` to `prompt-meta.yaml.md`
- [ ] Add `in` field to `prompt-meta.yaml.md`

### Medium Effort (30 min)

- [ ] Rename `(copy)` QuickAdd entries to descriptive names
- [ ] Decide: keep or remove `new-place.md` and `new-tool.md` (non-auto variants)
- [ ] Delete or archive `Templates/Tests/` experimental files
- [ ] Consolidate or remove duplicate `+Aboutℹ️.md` stub

### Design Decisions (discuss first)

- [ ] Should `place_status` / `tool_status` be renamed to `status` for Dataview consistency?
- [ ] Standardize legacy template naming to kebab-case? (affects `Add-Sections/`, `Kanban/`, `Scripts/`)
- [ ] Wire `new-quick-prompt.md` to QuickAdd or delete it?

---

## Related

- [[📦Template System Guide]] — template architecture docs
- [[QuickAdd Audit Results]] — previous QuickAdd-specific audit
- [[🔧Scripts Reference]] — script inventory
- [[🪪 Vault Identity]] — vault automation inventory

---

*Audit performed by Claude Code — 2026-03-17*
