## YAML Orchestrator Guide

## Overview

YAML Orchestrator is a Templater user-script that batch-processes front-matter in Markdown notes across the vault.  
It supports three modes—reorder, normalize and lint—to keep metadata consistent with your PKM governance.

## Core Arguments
| Arg            | Type                                 | Default                                  | What it does                                                      |
| -------------- | ------------------------------------ | ---------------------------------------- | ----------------------------------------------------------------- |
| `mode`         | `"reorder" \| "normalize" \| "lint"` | `"reorder"`                              | Chooses action: move keys, fix values or only report .            |
| `path`         | string (file)                        | active file                              | Run on one specific note .                                        |
| `folder`       | string or string[]                   | —                                        | Process every `.md` in one or many folders .                      |
| `askFolder`    | boolean                              | —                                        | Pop-up single-folder picker .                                     |
| `askFolders`   | boolean                              | —                                        | Pop-up multi-select folder picker with “last used” memory .       |
| `dryRun`       | true \| false                        | `false`                                  | Preview changes; write a side-by-side Markdown diff .             |
| `backup`       | true \| false                        | `true` (normalize)                       | Save original YAML snapshots to `_backups/normalize-snapshots/` . |
| `configPath`   | string                               | `99-System/Config/yaml-meta-config.json` | Custom order, enums and rules JSON .                              |
| `forceNew`     | boolean                              | `false`                                  | Forces folder picker even when a “last used” list exists .        |
| `rememberLast` | boolean                              | `true`                                   | Store / reuse last folder selection .                             |
|                |                                      |                                          |                                                                   |

## What Each Mode Does
1. **reorder** – moves full key blocks to the order defined in `order.default`; formatting and comments stay intact.
2. **normalize** – rewrites YAML: arrays, dates, enum validation, renames, required-field insertion and empty-field cleanup (comments lost).
3. **lint** – scans for problems and writes a Markdown report in `99-System/Reports/`

## Controlled Vocabulary
### MODE (exact tokens)
- `REORDER` → safe key order only
- `LINT` → report only
- `NORMALIZE` → full rewrite
### SCOPE
- `File` → current file
- Folder names in TitleCase without spaces where possible (or your exact folder):  
    `Inbox`, `02-Dots`, `03-Efforts`, `07-Sources`, `05-Calendar-Daily`
- Multi-folder shortcuts (optional):  
    `Dots+Efforts`, `Review-Targets`
### FLAGS (only when used)
- `DRY` (dryRun)
- `BKP` (backup snapshots)
- `SINGLE-ASKF` (askFolder: single picker)
- `MULTI-ASKF` (askFolders: multi picker)
- `FORCE` (forceNew)
- `CFG` (non-default config)


## Updated Metadata Order

Current list of metadata in `yaml_meta_config.json`
```
[
  "up","in",
  "title","aliases","type","fileClass","cssclass","tags",
  "status","maturity","priority","processing_priority","completeness",
  "coverage_areas","action_required",
  "created","modified","start","due","deadline","end",
  "last_review","review_frequency","estimated_effort",
  "completion_percentage","next_actions","capture_method","linked_notes_count",
  "confidence_level","evidence_quality","read_status","rating_type",
  "source_author","source_date","source_type",
  "participants","location","meeting_type","action_items",
  "audience","difficulty","prompt_category","prompt_type",
  "related","see_also","related_concepts","related_ideas",
  "role","org","company","email","phone","website","twitter","github","linkedin"
]
```

## Running via Templater

## Single file (safe reorder)
> Runs on the open note and rearranges keys without altering values.
```
<%* await tp.user.yaml_orchestrator({ mode: "reorder" }) %>
```

## Normalize entire folder (with backup)
> Cleans every file in _03 Efforts_ and saves snapshots.
```
<%* await tp.user.yaml_orchestrator({
  mode: "normalize",
  folder: "03-Efforts",
  backup: true
}) %>
```
## Interactive multi-folder lint
> Prompts for folders, scans, then opens a report note.
```
<%* await tp.user.yaml_orchestrator({
  mode: "lint",
  askFolders: true
}) %>
```

## Safe Workflow
1. **Lint** targeted folders → fix red flags first.
2. **Reorder** (safe) → ensures visual consistency.
3. **Normalize (dryRun:true)** → inspect previews in `99-System/Reports/`.
4. **Normalize** with backups → commit clean metadata.
### **Daily Workflow Examples**
```
**Morning cleanup** (safe):
<%* await tp.user.yaml_orchestrator({ mode: "reorder", folder: "+Inbox" }) %>

**Weekly maintenance**:
<%* await tp.user.yaml_orchestrator({ mode: "lint", askFolders: true }) %>

**Monthly deep clean**:
<%* await tp.user.yaml_orchestrator({ mode: "normalize", folder: ["02-Dots", "03-Efforts"], dryRun: true }) %>

```
## **Troubleshooting Tips**
- “Cancelled” notice appears if folder picker is closed—run again.
- Missing required fields are inserted blank during normalize—fill them manually.
- Use `dryRun:true` to preview before destructive changes.
This guide equips you to run YAML Orchestrator confidently and keep vault metadata aligned with your governance order.

## **Backup & Recovery**
> How the backup system works and how to restore:

**Auto-backups**: Normalize mode saves snapshots to `_backups/normalize-snapshots/`
**Manual restore**: Copy original YAML from snapshot back to target file
**Retention**: Snapshots include source path and timestamp for easy identification

---
# YAML Orchestrator — Button Deck #🧹tidy TODO
### Current file
```button
name Reorder YAML (safe)
type command
action QuickAdd: Reorder YAML (safe)
```

```button
name Normalize (dry-run)
type command
action QuickAdd: Normalize YAML (dry-run)
```

```button
name Normalize (apply, snapshot)
type command
action QuickAdd: Normalize YAML (apply)
```
Batch — folder: **03 Efforts**
```button
name Lint – 03-Efforts
type command
action QuickAdd: Lint – 03-Efforts
```

```button
name Reorder – 03 Efforts
type command
action QuickAdd: Reorder – 03 Efforts
```

```button
name Normalize (dry) – 03 Efforts
type command
action QuickAdd: Normalize (dry) – 03 Efforts
```

```button
name Normalize (apply) – 03 Efforts
type command
action QuickAdd: Normalize (apply) – 03 Efforts
```

---

## ai tested #🧹tidy 

# --- Pro Pack — Pickers & Power Flows ---

```button
name YML • REORDER • Picker • ASK1
type command
action QuickAdd: yml-reorder-picker-ask1
tooltip Reorder YAML in a single chosen folder (askFolder)
```

```button
name YML • LINT • Picker • ASKM • FORCE
type command
action QuickAdd: yml-lint-picker-askm-force
tooltip Fresh multi-picker (ignore last used, force new)
```

```button
name YML • LINT • +Inbox+02-Dots+03-Efforts
type command
action QuickAdd: yml-lint-+inbox+dots+efforts
tooltip Quick scan of high-churn folders
```

```button
name YML • NORMALIZE • Templates • DRY
type command
action QuickAdd: yml-normalize-templates-dry
tooltip Dry-run normalize on Templates (Blocks/Partials/Wizards/Tests)
```

```button
name YML • LINT • Picker • CFG
type command
action QuickAdd: yml-lint-picker-cfg-staging
tooltip Lint using staging configPath to validate rules
```

```button
name YML • NORMALIZE • Picker • BKP
type command
action QuickAdd: yml-normalize-picker-bkp
tooltip Interactive normalize with snapshots (backup)
```

# --- Routines & Focused Passes ---

```button
name YML • NORMALIZE • Dots+Efforts • DRY
type command
action QuickAdd: yml-normalize-dots+efforts-dry
tooltip Monthly preview (non-destructive)
```

```button
name YML • NORMALIZE • 05-Calendar/Daily • DRY
type command
action QuickAdd: yml-normalize-05-calendar-daily-dry
tooltip Keep daily notes tidy without rewriting comments
```

```button
name YML • NORMALIZE • 07-Sources • DRY
type command
action QuickAdd: yml-normalize-07-sources-dry
tooltip Prep pass—validate enums/dates before apply
```

```button
name YML • NORMALIZE • 07-Sources • BKP
type command
action QuickAdd: yml-normalize-07-sources-bkp
tooltip Apply with snapshots for safe rollback
```

# --- Current File Helpers ---

```button
name YML • REORDER • File
type command
action QuickAdd: yml-reorder-file
tooltip Safe key order on the active note
```

```button
name YML • NORMALIZE • File • DRY
type command
action QuickAdd: yml-normalize-file-dry
tooltip Cautious normalize preview on the active note
```

# --- Review Hubs ---

```button
name Reports — Open
type command
action QuickAdd: open-reports-hub
tooltip Jump to 99-System/Reports/
```

```button
name Snapshots — Open
type command
action QuickAdd: open-normalize-snapshots
tooltip Open _backups/normalize-snapshots/
```
