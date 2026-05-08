# Template Audit — Origin v2.0-migration
**Date:** 2026-05-03
**Status:** ⚠️ 3 critical issues to fix before launch

---

## Summary
133 templates scanned · 10 issues found
- Templater: ✅ configured
- QuickAdd: ❌ data.json missing

---

## 🔴 CRITICAL — fix before launch

### 1. Templater folder paths use old 02-Dots/* structure
File: `.obsidian/plugins/templater-obsidian/data.json`

| Configured (broken) | Actual folder |
|---|---|
| `02-Dots/100-Atomics` | `02-Knowledge/Atomics` |
| `02-Dots/200-Areas` | `02-Knowledge/Areas` |
| `02-Dots/300-People` | `02-Knowledge/People` |
| `02-Dots/400-Places` | `02-Knowledge/Places` |
| `02-Dots/500-Tools` | `02-Knowledge/Tools` |

**Effect:** Auto-template insertion won't fire for atomic/area/person/place/tool notes.

### 2. Meeting folder path wrong
Configured: `04-Sources/440-Meetings`
Actual: `04-Sources/Meetings`
**Effect:** Meeting notes won't auto-apply `new-meeting-auto.md`.

### 3. QuickAdd data.json missing
No QuickAdd config exists yet. All macros/commands unconfigured.
May be intentional if QuickAdd setup hasn't started.

---

## 🟡 WARNING — meta schema gaps

### 4. prompt-meta.yaml.md — missing `fileClass`
All other types have it. Bases/Metadata Menu won't classify prompts correctly.

### 5. subscription-meta.yaml.md — missing `fileClass` + `in`
Has `up` but not `in`. Breaks the standard in-link pattern used across all types.

### 6. tool-meta.yaml.md — has `tool_status` but NOT `status`
Global Dataview queries filtering on `status` will silently miss all tool notes.

---

## 🔵 INFO — cleanup opportunities

### 7. Subscription has no Templater folder mapping
`new-subscription-auto.md` exists but no folder is mapped. Decide where subscription notes live.

### 8. Naming inconsistencies in legacy template folders
Kanban/, Scripts/, Add-Sections/ mix dashes/commas/underscores.
`Create/`, `Meta/` are consistent ✅.

### 9. Legacy template pools not referenced by any plugin
- `Templates/Tests/` — 5 files
- `Templates/_Drafts/` — 3 files
- `Templates/Add-Sections/` — 9 files
Candidates for archival.

### 10. Templates/Static/ mirrors Create/ (parallel maintenance risk)
12 non-Templater static copies. Useful for starter pack, but divergence risk if templates evolve.

---

## Recommended fix order
1. Fix 6 broken Templater folder paths in `data.json`
2. Add missing `fileClass`/`status`/`in` to prompt, subscription, tool meta templates
3. Set up QuickAdd (or confirm not started yet)
4. Items 7–10 after launch
