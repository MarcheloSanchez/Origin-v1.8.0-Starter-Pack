---
up: "[[99-System]]"
in:
  - "[[QuickAdd Handbook]]"
title: QuickAdd Template Coverage
type: guide
tags:
  - "⚙️system"
  - "📖guide"
status: 🔄active
created: 2026-02-08
modified: 2026-02-08
related:
  - "[[QuickAdd Handbook]]"
  - "[[Templates]]"
---

# QuickAdd Template Coverage

> [!info] Purpose
> This document maps every template in `Templates/` to its QuickAdd status:
> **exposed** (available via QuickAdd menu), **indirect** (used internally by the template system), or **not applicable** (with explanation why).
>
> Last audit: 2026-02-08 | Templates total: ~119 | QuickAdd entries: 19

---

## QuickAdd Menu Structure (Current)

```
📝 Capture
├── New Inbox Note              → Templates/Quick Capture - Inbox.md
├── New Quick Idea              → Templates/Quick Idea Capture.md
├── MENU: New Note...
│   ├── Atomic                  → Templates/Create/new-atomic-auto.md      → 02-Dots/100-Atomics
│   ├── Effort                  → Templates/Create/new-effort-auto.md      → 03-Efforts
│   ├── Source                  → Templates/Create/new-source-auto.md      → 04-Sources
│   ├── Meeting                 → Templates/Create/new-meeting-auto.md     → 04-Sources/440-Meetings
│   ├── MOC                     → Templates/Create/new-moc-auto.md         → 01-MOCs
│   ├── Area                    → Templates/Create/new-area-auto.md        → 02-Dots/200-Areas
│   ├── Prompt                  → Templates/Create/new-prompt-auto.md      → 07-Prompts/Drafts
│   ├── People - Professional   → Templates/Create/new-person-auto.md      → 02-Dots/300-People/320-PROFESSIONAL
│   ├── People - Personal       → Templates/Create/new-person-auto.md      → 02-Dots/300-People/310-PERSONAL
│   ├── Place                   → Templates/Create/new-place-auto.md       → 02-Dots/400-Places
│   └── Tool                    → Templates/Create/new-tool-auto.md        → 02-Dots/500-Tools
├── MENU: Reports & Challenges
│   ├── 7-Day Activity Report   → Templates/Template - Last 7 Days Activity Report.md → 05-Calendar/_Logs
│   ├── Monthly Report          → Templates/Template - Monthly Report.md               → 05-Calendar/_Logs
│   ├── Weekly Challenge        → Templates/Gamification/Challenge-Weekly.md           → 05-Calendar/Weekly
│   └── Monthly Challenge       → Templates/Gamification/Challenge-Monthly.md          → 05-Calendar/Monthly
├── GTD Quick Task              → Templates/Quick-Inserts/GTD Quick Task.md (capture to active file)
├── Extract Selection to Note   → (macro using Quick Capture - Inbox.md)
└── Add Task to Daily           → (macro, no template file)

🧩 Process
├── Process Note (Safe)         → 99-System/Scripts/process-note-safe.js
├── Classify Note               → 99-System/Scripts/smart-classifier.js
├── Autofill Metadata           → 99-System/Scripts/auto-metadata.js
├── Normalize YAML              → yaml_orchestrator (inline)
├── Lint YAML                   → yaml_orchestrator (inline)
├── Set Status                  → 99-System/Scripts/status-picker.js
└── Set Maturity                → 99-System/Scripts/maturity-evolve.js

🧹 Maintain
├── Normalize YAML (Pick Folders) → yaml_orchestrator (inline)
├── Batch Process Inbox         → 99-System/Scripts/batch-process-inbox.js
├── Archive Note                → 99-System/Scripts/archive_note.js
└── Rebuild Metrics Cache       → 99-System/Scripts/update-metrics-cache.js

⚙️ System
├── Toggle Focus Mode           → (Obsidian commands)
└── MENU: Backroom (Experimental)
    ├── Insert Callout          → (inline Templater)
    ├── Insert Table of Contents→ (inline Templater)
    ├── Add to Changelog        → CHANGELOG.md
    ├── Quick Process - Atomic  → 99-System/Scripts/quick-process-atomic.js
    ├── Quick Process - Source   → 99-System/Scripts/quick-process-source.js
    ├── Quick Process - Effort  → 99-System/Scripts/quick-process-effort.js
    └── Archive Old Dailies     → 99-System/Scripts/archive-old-dailies.js

🏷️ Quick Tag                   → (inline Templater)
```

---

## Templates NOT in QuickAdd — Rationale by Category

### 1. Calendar Templates (4 files) — Handled by Periodic Notes

| Template | Periodic Notes Config |
|----------|-----------------------|
| `Templates/Calendar/Template Daily.md` | `daily.template` → `05-Calendar/Daily` |
| `Templates/Calendar/Template Weekly.md` | `weekly.template` → `05-Calendar/Weekly` |
| `Templates/Calendar/Template Monthly.md` | `monthly.template` → `05-Calendar/Monthly` |
| `Templates/Calendar/Template Quarterly.md` | `quarterly.template` → `05-Calendar/Quarterly` |
| `Templates/Calendar/Template Yearly.md` | `yearly.template` → `05-Calendar/Yearly` |

**Why not QuickAdd**: The Periodic Notes plugin handles creation of these notes automatically when navigating to a date/week/month. Adding them to QuickAdd would create duplicate entry points and potential naming conflicts.

> [!note] `Template Daily CZ.md` also exists as a Czech-language variant but is not currently referenced by Periodic Notes.

---

### 2. Modular Composition Templates (~30 files) — Internal System

These templates are building blocks used by `Templater_script.combine()` in the modular template system. They are never invoked directly by users.

#### Meta Templates (10 files) — `Templates/Meta/*.yaml.md`
YAML frontmatter blocks injected into notes during creation.
`atomic-meta.yaml.md`, `area-meta.yaml.md`, `effort-meta.yaml.md`, `meeting-meta.yaml.md`, `moc-meta.yaml.md`, `person-meta.yaml.md`, `place-meta.yaml.md`, `prompt-meta.yaml.md`, `source-meta.yaml.md`, `tool-meta.yaml.md`

#### Body Templates (10 files) — `Templates/Body/*.md`
Content section blocks injected below frontmatter during creation.
`atomic-body.md`, `area-body.md`, `effort-body.md`, `meeting-body.md`, `moc-body.md`, `person-body.md`, `place-body.md`, `prompt-body.md`, `source-body.md`, `tool-body.md`

#### Actions Templates (5 files) — `Templates/Actions/*.md`
Template repair/reset operations invoked via Templater commands (not note creation).
`add-body.md`, `add-meta.md`, `reset-all.md`, `reset-body.md`, `reset-meta.md`

**Why not QuickAdd**: These are internal composition primitives. The `-auto` Create templates already call them via `Templater_script.combine()`. Exposing them directly would bypass the modular assembly pipeline and produce incomplete notes.

---

### 3. Static Templates (9 files) — Manual Templater Variants

`Templates/Static/`: `atomic.md`, `area.md`, `effort.md`, `moc.md`, `person.md`, `place.md`, `prompt.md`, `tool.md`, `+About Static Templatesℹ️.md`

**Why not QuickAdd**: These are simplified, non-automated versions of the Create templates. Designed for manual insertion via Templater's "Insert Template" command palette action. They serve as fallback when the automated system has issues. The `-auto` versions in QuickAdd are the primary workflow.

---

### 4. Create Non-Auto Templates (10 files) — Fallback Variants

`Templates/Create/new-*.md` (without `-auto` suffix): `new-atomic.md`, `new-area.md`, `new-effort.md`, `new-meeting.md`, `new-moc.md`, `new-person.md`, `new-place.md`, `new-prompt.md`, `new-source.md`, `new-tool.md`

**Why not QuickAdd**: The `-auto` versions are already exposed via QuickAdd. These non-auto variants exist as manual fallbacks accessible via Templater command palette. Having both in QuickAdd would confuse users with duplicate entries.

---

### 5. Add-Sections / Snippet Templates (11 files) — Templater Insert

These are content snippets inserted into existing notes, not for note creation.

#### Navigation (4 files) — `Templates/Add-Sections/Navigation/`
`Template, Home Navigation.md`, `Template, MOC Navigation.md`, `Template, Wayfinder.md`, `Unified-Nav.md`

#### Headers (2 files) — `Templates/Add-Sections/Headers/`
`Base - Block.md`, `Dataview - Block.md`

#### Blocks (5 files) — `Templates/Add-Sections/Blocks/`
`Template - Dataview List Query Attributes.md`, `Template, Queries LYT Vision.md`, `Templater - TIMER, count of days until event.md`, `Templater, Insert Callout V2.md`, `Templater, Table of content v2.md`

**Why not QuickAdd**: These are "insert at cursor" snippets for augmenting existing notes. Best accessed via Templater's "Insert Template" command. The Callout and Table of Contents functionality is already available as inline Capture choices in QuickAdd's Backroom menu.

---

### 6. Quick-Inserts / Bases Snippets (6 files) — Specialized Low-Frequency

`Templates/Quick-Inserts/`: `Quick Insert, Bases.md`, `Quick Insert, Bases All Folders.md`, `Quick Insert, Bases Cards.md`, `Quick Insert, Bases Folder.md`, `Quick Insert, Bases status update.md`, `Gamification Quick Insert.md`

**Why not QuickAdd**: The Bases snippets are Obsidian Bases plugin code blocks (`\`\`\`base`) used infrequently when setting up new database views. The Gamification Quick Insert is a static stats block. All are better accessed via Templater insert when needed rather than cluttering the QuickAdd menu.

> [!tip] `GTD Quick Task.md` from this folder IS now exposed via QuickAdd as a Capture choice because it's a high-frequency interactive action.

---

### 7. Kanban Templates (6 files) — Kanban Plugin Handles These

`Templates/Kanban/`: `Template_Kanban.md`, `Template_Kanban V2.md`, `Template_Eisenhower_Matrix_.md`, `Template, Content Card Kanban.md`, `Template, Learning Card Kanban.md`, `Template - Research Card - Kanban.md`

**Why not QuickAdd**: Kanban boards are created and managed by the Obsidian Kanban plugin. The templates define board layouts with `kanban-plugin: board` frontmatter and specific column structures. Creating them via QuickAdd would bypass the Kanban plugin's initialization and could result in boards that don't render properly.

---

### 8. Script Templates (26+ files) — YAML Orchestrator Wrappers

`Templates/Scripts/`: Various Templater script wrappers for YAML operations (lint, normalize, reorder) and utility scripts.

`Templates/Scripts/YAML/`: `yml-lint.md`, `yml-normalize.md`, `yml-reorder.md`, and their multi-folder/single-folder/dry-run/backup variants.

`Templates/Scripts/YAML/setup/`: Pre-configured folder combinations for common operations.

**Why not QuickAdd**: These are Templater script wrappers that call `yaml_orchestrator()` with specific parameters. The key operations (Normalize YAML, Lint YAML, Normalize YAML Pick Folders) are already exposed as QuickAdd Capture choices with inline Templater calls. The script templates are legacy entry points kept for backward compatibility.

Other scripts (`Templater, Quick Tagging in place.md`, `Templater, update Modified.md`, etc.) are utility Templater scripts accessed via command palette.

---

### 9. Draft Templates (3 files) — Incomplete / Experimental

`Templates/_Drafts/`: `New Guide Auto.md`, `Template Course.md`, `Template WordDictionary.md`

**Why not QuickAdd**: These templates are in draft state:
- **New Guide Auto.md** — Has placeholder content (`[Guide Name]`, hardcoded date `2025-09-30`). Needs finalization before production use.
- **Template Course.md** — Minimal structure with empty fields, no Templater automation. Needs the modular treatment (meta + body) before integration.
- **Template WordDictionary.md** — Simple word definition template. Niche use case, not part of the core PARA workflow.

> [!warning] If any of these are promoted to production, they should get the full `-auto` treatment (Meta + Body + Create auto template) and then be added to QuickAdd's New Note... menu.

---

### 10. Example Templates (6 files) — Reference Only

`Templates/_Examples/`: `Area Filled Out.md`, `Atomic Filled Out.md`, `Meeting Filled Out.md`, `MOC Filled Out.md`, `Prompt Filled Out.md`, `Source Filled Out.md`

**Why not QuickAdd**: These are documentation files showing what a properly filled-out note looks like for each type. They serve as reference for users learning the system. Not for creating new notes.

---

### 11. Test Templates (5 files) — Experimental / Learning

`Templates/Tests/`: `Learn Fast.md`, `Learn Fast with Short Text.md`, `Overview of Metadata - be aware query.md`, `Simple Startup Template.md`, `WTF Weekly dashboar templater.md`

**Why not QuickAdd**: Experimental templates used for testing and learning. Not part of the production workflow.

---

## Summary

| Status | Count | Description |
|--------|-------|-------------|
| **In QuickAdd** | 19 | Directly accessible via QuickAdd menus |
| **Periodic Notes** | 5 | Handled by Periodic Notes plugin |
| **Internal/Modular** | 35 | Meta, Body, Actions, Static, non-auto Create |
| **Snippet/Insert** | 17 | Add-Sections, Quick-Inserts (via Templater) |
| **Plugin-specific** | 6 | Kanban templates |
| **Script wrappers** | 26+ | YAML orchestrator (already in QuickAdd as inline) |
| **Draft/Test/Example** | 14 | Not production-ready |
| **Total** | ~119 | Full template inventory |
