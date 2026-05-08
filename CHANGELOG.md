---
title: CHANGELOG
Version: 2.0.0
Last Backup: 2026-05-03
template-status: origin_dev
modified: 2026-05-06
---
⬆️:: [[🏡Home]]
[[TODO]] - [[BACKLOG]] - [[RELEASE NOTES]]
---
*Last updated: `= date(now)`*
---

> [!info] How to use this Changelog
> - **Order**: oldest entries at top, newest at bottom — write in linear chronological order, never prepend
> - **New entry structure**:
>   ```
>   # DD/MM/YY
>   ## Short topic title
>   ### Sub-section (optional)
>   - [[Note or file]]: one-line description of what changed and why
>   ```
> - **One section per date** — if you revisit the same date, append under the existing `#` header
> - **Links**: use `[[wikilinks]]` to reference modified notes so backlinks are created
> - **What belongs here**: vault structure changes, script updates, template changes, migrations, schema decisions
> - **What does NOT belong here**: daily captures, fleeting thoughts, tasks — those go in daily notes or TODO

# 06/05/26
## v2.0 Post-Migration Smoke Test Fixes (plan: okay-you-can-do-witty-bunny)

### Script: smart-classifier.js
- Fixed stale prompt folder path: `99-System/copilot-custom-prompts` → `99-System/Prompts/Inbox` in both `folderMap` occurrences (Issue 3)

### Scripts: quick-process-atomic / effort / source
- Added `buildChangedSummary(original, updated)` helper to all three scripts — compares before/after frontmatter and shows a secondary Notice listing which fields were added (`+`) or changed (`~`) (Issue 4)

### Script: batch-process-inbox.js
- Added per-note audit trail: `results.notes[]` array collects `{name, type, confidence, folder, status}` for every processed note including errors (Issue 5)
- Added `writeReportFile(results)` function — writes `99-System/Documentation/batch-report-YYYY-MM-DD.md` with a Markdown table after each batch run (Issue 5)
- Propagated `confidence` from `analyzeContent` through `classifyNote` → `processInboxNote` → results (Issue 5)

### CHANGELOG (this file)
- Added `> [!info] How to use this Changelog` callout block with authoring rules: oldest-at-top order, entry structure, wikilink requirement, what belongs vs doesn't (Issue 6)

### Script: maturity-evolve.js
- Diagnosed as correct — no changes needed (Issue 7)

### Documentation: Linter Setup
- Created `99-System/Documentation/Obsidian/Linter Setup.md` documenting all 4 enabled Obsidian Linter rules (`add-blank-line-after-yaml`, `format-tags-in-yaml`, `insert-yaml-attributes`, `yaml-timestamp`), when-to-run table, and interaction map vs YAML Orchestrator (Issue 8B)
- Added research task to `TASKS.md`: orchestrator lint mode vs Linter plugin overlap analysis (Issue 8A)

### Vault Structure: Knowledge Hub Renames
- Renamed `02-Knowledge/People/300-People.md` → `People.md` (Issue 10)
- Renamed `02-Knowledge/Places/400-Places.md` → `Places.md` (Issue 10)
- Renamed `02-Knowledge/Tools/500-Tools.md` → `Tools.md` (Issue 10)

### QuickAdd: data.json
- Moved `Quick Idea` and `Quick Inbox` to top of `MENU:⚡Create New Note` choices (previously nested inside `MENU: 🌱Basic`) (Issue 9)
- Renamed `MENU: 🤖Auto - input based` → `MENU: 🤖Auto (Templater dialog)` (Issue 9)

---

# 06/05/26 (continued)

## Scripts: smart-classifier.js + batch-process-inbox.js — Deleted

### Rationale
Both scripts became architecturally redundant once the Templater + Auto Note Mover workflow was established: new notes created via typed templates (`new-atomic.md`, `new-effort.md`, etc.) already carry the correct `type:` field, and Auto Note Mover routes them automatically. Manual content classification and bulk inbox routing added complexity with no remaining use case.

### Deleted
- `99-System/Scripts/smart-classifier.js` — content heuristic classifier (English-only; 200+ lines)
- `99-System/Scripts/batch-process-inbox.js` — bulk inbox processor (391 lines; depended on smart-classifier)

### Updated
- `99-System/Scripts/process-note-safe.js` — removed Step 1 (Classify), renumbered to 2-step macro: Autofill Metadata → Normalize YAML
- `.obsidian/plugins/quickadd/data.json` — removed `🤖Smart Classify Note` and `📦Batch Process Inbox` QuickAdd macro entries
- `CLAUDE.md` — removed both script rows from table, updated note 9, updated naming conventions example
- `99-System/Documentation/Obsidian/QuickAdd Template Coverage.md` — removed both entries
- `99-System/Documentation/PKM/QuickAdd Audit Results.md` — removed both from script tree
- `99-System/Documentation/PKM/🔁My PKM Workflows.md` — removed references, updated script count 22 → 20
- `99-System/Documentation/PKM/🔧Scripts Reference.md` — removed full sections for both scripts, removed table rows
- `99-System/Documentation/PKM/🚀Vault Migration Guide.md` — replaced test checklist item
- `99-System/Documentation/📍Note Classification Guide.md` — updated automation scripts footer
- `99-System/Documentation/🪪 Vault Identity.md` — removed rows, updated count 36 → 34

---

# 09/05/26

## ME.md: Review and consolidation

### Refactor
- [[ME]]: consolidated 803 lines → ~480 (15 sections from 20). Merged §1 North Star + §2 Summary Statement; merged §5 Core Principles + §12 Decision Rules; merged §7 Vault Defaults + §13 Behavior Rules. Cut §18 Nick Milo Influence and §19 Tolkien Clause. Trimmed §16 Practical Examples to a single pair. Removed duplicate `## 🔗 Related` block at the bottom (Core Navigation at top retained with descriptions).

### Fixes
- [[ME]]: fixed broken single-line code blocks in §8 audit structure and §14 AI workflow templates (rendered as one long string in Obsidian).
- [[ME]]: corrected `❌cancelled` → `❌cancel` to match canonical CIS_STATUS.
- [[ME]]: filled empty `created`/`modified` YAML dates.
- [[ME]]: removed `archive` from note types list (not in canonical type system); added missing `tutorial` and `challenge`.

## Plan: Jarvis Vault AI System (next-session)

### Planning artifact
- Created plan at `~/.claude/plans/yes-zazzy-cocoa.md` for unified AI infrastructure layer covering rework backlog + Jarvis-style capture flow.
- Captured project goal at `~/.claude/projects/…Origin-v2-0-migration/memory/goal_jarvis_vault_ai.md` for cross-session continuity.
- Identified prerequisite: existing `.claude/skills/SKILL.md` (`origin-vault`) is stale — references v1.x folder names (`02-Dots`, `00-Meta`, `07-Prompts`), wrong status (`❌cancelled`), wrong maturity icons (`🌱seed`/`🍎fruit`), and deleted scripts. Phase 0 must refresh skill before any new layer.
- Architecture chosen (Approach C from brainstorming): thin Origin-native commands and agents on top of the refreshed `origin-vault` skill, reusing the skills layer as reusable Obsidian knowledge.
