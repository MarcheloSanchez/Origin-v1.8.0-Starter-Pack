# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Origin is an **Obsidian PKM (Personal Knowledge Management) vault** (v1.9.1) — not a traditional software project. It's a structured "second brain" system built on Obsidian with extensive Templater/Dataview automation, JavaScript scripts, and AI prompt integrations. The vault language is primarily **Czech** with English technical terms.

## Vault Architecture

**8-layer PARA-inspired folder structure** with information flow: Capture → Process → Organize → Connect → Review → Archive

| Folder | Role |
|--------|------|
| `+Inbox` | Quick capture entry point |
| `00-Meta` | System documentation, checklists, guides, gamification |
| `01-MOCs` | Maps of Content — navigation hubs |
| `02-Dots` | Atomic knowledge (Ideas, Concepts, Statements, Things, People, Places) |
| `03-Efforts` | Projects: `On/` (active), `Ongoing/`, `Simmering/` (background) |
| `04-Sources` | External references: Knowledge, Media, Guides, Meetings |
| `05-Calendar` | Periodic notes: Daily, Weekly, Monthly, Quarterly, Yearly |
| `06-Archive` | Completed/inactive content |
| `99-System` | Infrastructure: Scripts, Config, CIS enums, FileClasses, AI prompts, images |
| `Templates` | 150+ templates across 15 categories |

Root dashboards: `🏡Home.md` (main entry), `👁️Dashboard.md` (metrics), `🎯GTD Command Center.md`, `🧭 Review HQ.md`

## Template System (Modular 3-Tier Architecture)

Templates use **separation of concerns** — Meta (YAML) + Body (content) composed at creation time:

- **Meta templates**: `Templates/Meta/{type}-meta.yaml.md` — YAML frontmatter blocks
- **Body templates**: `Templates/Body/{type}-body.md` — content structure
- **Static fallbacks**: `Templates/Static/{type}.md` — standalone, no Templater required
- **Create templates**: `Templates/Create/new-{type}.md` (empty/inbox mode), `new-{type}-auto.md` (auto-active mode)
- **Core snippets**: `Templates/Core/_nav-breadcrumb.md`, `_nav-wayfinder.md`, `_section-related.md`
- **Query templates**: `Templates/Queries/Query - {Topic}.md` — Reusable Dataview/DataviewJS query blocks
- **Calendar templates**: `Templates/Calendar/Template {Period}.md` — Daily, Weekly, Monthly, Quarterly, Yearly
- **Kanban templates**: `Templates/Kanban/Template_Kanban*.md` — Board layouts
- **Examples**: `Templates/_Examples/{Type} Filled Out.md` — Reference filled-out notes

**Supported types**: atomic, effort, source, moc, meeting, area, person, place, tool, prompt

The main template engine is `99-System/Scripts/Templater_script.js` which provides `inject_meta_if_missing()`, `add_chapters()`, `combine()`, `reset_body()`, `reset_meta()`, `reset_all()`. It resolves both modular and legacy paths with BOM/whitespace tolerance.

## Automation Scripts (`99-System/Scripts/`)

| Script | Purpose |
|--------|---------|
| `Templater_script.js` | Core template inclusion & composition engine |
| `yaml_orchestrator.js` | YAML metadata reorder/normalize/lint (config: `99-System/Config/yaml-meta-config.json`) |
| `yaml_validator.js` | YAML field type & required field validation |
| `smart-classifier.js` | Intelligent note type/folder/tag suggestion from content |
| `auto-metadata.js` | Automatic frontmatter population |
| `batch-process-inbox.js` | Bulk inbox processing |
| `quick-process-atomic.js` | Atomic note quick processing |
| `quick-process-effort.js` | Effort quick processing |
| `quick-process-source.js` | Source quick processing |
| `maturity-promoter.js` | Note maturity promotion suggestions (link metrics & stability) |
| `maturity-evolve.js` | QuickAdd picker for maturity stage changes |
| `metrics-core.js` | Vault health metrics, gamification XP/levels, weekly stats |
| `update-metrics-cache.js` | Metrics caching (inline field format for `dv.page()`) |
| `generate-weekly-report.js` | Automated weekly report generator (QuickAdd macro) |
| `archive_note.js` / `archive-old-dailies.js` | Archival automation |
| `status-picker.js` / `status-progression.js` | Status workflow UI & automation |

Scripts run inside Obsidian via **Templater** user scripts. They are NOT Node.js — they execute in Obsidian's Electron context with access to `app`, `tp` (Templater), and the Obsidian API.

## Metadata Conventions

### YAML Frontmatter Schema
```yaml
up: "[[Parent]]"           # Breadcrumb navigation
title: "Note Title"
type: atomic | effort | source | moc | meeting | area | person | place | tool | prompt
status: 📥inbox | 🔄active | ⏳waiting | ✅completed | 📦archived | ⏸️paused | ❌cancelled | ⚠️blocked
maturity: 📤seed | 🌱seedling | 🪴sapling | 🌲evergreen | 🍓fruit
priority: high | medium | low
tags: []                   # Emoji-prefixed, e.g. 💡atomic, 🚀project, 📚source
created: YYYY-MM-DD
modified: YYYY-MM-DD
related: []
```

Field ordering is enforced by `yaml-meta-config.json`. Keys use **snake_case**. Status/maturity values use emoji prefixes.

**Important conventions**:
- Use `due` (not `deadline`) — YAML Orchestrator auto-renames `deadline` → `due`
- Always use emoji-prefixed status values (e.g., `🔄active` not bare `active`)
- Maturity canonical values: `📤seed`, `🌱seedling`, `🪴sapling`, `🌲evergreen`, `🍓fruit`
- Notes missing required fields get auto-tagged `#🧹tidy` by YAML Orchestrator

### CIS (Custom Information System) — `99-System/CIS/`
30+ enum definition files named `CIS_{FIELD_NAME}.md` (e.g., `CIS_STATUS.md`, `CIS_MATURITY.md`). These feed Obsidian Bases field validation and UI dropdowns.

### FileClass Definitions — `99-System/FileClass/`
Database schemas for Obsidian Bases: `atomic.md`, `effort.md`, `source.md`, `moc.md`, `meeting.md`, `prompt.md`, `archive.md`, `base.md`.

## AI Integration (`99-System/copilot-custom-prompts/`)

45+ Obsidian Copilot custom prompts organized as:
- **6 Meta-Skills** (agents): Critic, Editor, Researcher, Synthesizer, Task Decomposer, Multi-Agent Orchestrator
- **Specialized skills**: Assess note maturity, Build mental model, Find connections, Extract tasks, Synthesize knowledge, Decision analysis, etc.

Each prompt file has `fileClass: Prompt` frontmatter with `prompt_category`, `prompt_type`, `model_defaults` fields.

## Key Plugins

**Essential**: Templater, Dataview, Tasks, QuickAdd, Periodic Notes
**Organization**: Auto Note Mover (tag-based routing), Folder Notes, Kanban, Metadata Menu
**Enhancement**: Smart Connections (AI search), Lazy Plugins (performance), Homepage, Style Settings

## Naming Conventions

- **Templates**: `{type}-meta.yaml.md`, `{type}-body.md`, `new-{type}.md`, `new-{type}-auto.md`, `Query - {Topic}.md`
- **Scripts**: descriptive kebab-case (`smart-classifier.js`, `yaml-orchestrator.js`)
- **CIS enums**: `CIS_{FIELD_NAME}.md` (SCREAMING_SNAKE_CASE)
- **YAML keys**: snake_case (`processing_priority`, `completion_percentage`)
- **Tags**: emoji + category (`💡atomic`, 🚀project`, `📚source`, `📥inbox`)
- **About files**: `+About {Section}ℹ️.md` pattern for folder documentation

## When Editing This Vault

- Preserve existing YAML frontmatter field order (defined in `yaml-meta-config.json`)
- Use the established emoji conventions for status/maturity/tag values
- Templates go in appropriate subfolder under `Templates/` following the 3-tier pattern
- New scripts belong in `99-System/Scripts/` and must work in Obsidian's Templater context (no Node.js APIs)
- CIS enum changes require updating corresponding `99-System/CIS/CIS_*.md` files
- New note types need: meta template, body template, static fallback, create template, and FileClass definition
- Track changes in `CHANGELOG.md` (date format: DD/MM/YY, most recent first)
- Custom callouts used: `orbit`, `map`, `calendar`, `compass`, `training`, `milestone`, `recycle`, `blocks`, `multi-column`, `hint`
