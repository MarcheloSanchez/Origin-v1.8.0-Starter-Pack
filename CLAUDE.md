# Origin PKM Vault

Obsidian PKM vault (v1.9.1 → v2.0). PARA-inspired 8-layer architecture. Czech content, English with Claude.

## Current Projects
| Project | Status |
|---------|--------|
| **Origin v2.0** | ✅ Complete (2026-02-07) |
| **Calendar Review Hub** | ✅ Complete — guide at `00-Meta/Documentation/PKM/📅 Calendar Review Hub Guide.md` |
| **Bases Daily View** | Planning |

## File Output Rules

When Claude Code creates files during a session, place them here — never in `+Inbox`:

| Output type | Target folder |
|-------------|---------------|
| Audit reports, orphan lists, tag audits | `00-Meta/` |
| Architecture plans, design docs | `docs/plans/` |
| Sprint plans, implementation plans | `docs/plans/` |
| Windows/system design docs | `docs/plans/` |
| Scripts, utilities | `99-System/Scripts/` or `claude-scripts/` |

`+Inbox` is for human-captured ideas only. Session artifacts go elsewhere.

## Vault Architecture

**8-layer folder structure** — Capture → Process → Organize → Connect → Review → Archive

| Folder | Role |
|--------|------|
| `+Inbox` | Quick capture entry point |
| `00-Meta` | System docs, checklists, guides, gamification |
| `01-MOCs` | Maps of Content — navigation hubs |
| `02-Knowledge` | Atomic knowledge (Ideas, Concepts, Statements, Things, People, Places) |
| `03-Efforts` | Projects: `Active/`, `Paused/`, `Waiting/` |
| `04-Sources` | External refs: Knowledge, Media, Guides, Meetings |
| `05-Calendar` | Periodic notes: Daily, Weekly, Monthly, Quarterly, Yearly |
| `06-Archive` | Completed/inactive content |
| `99-System` | Infrastructure: Scripts, Config, CIS enums, FileClasses, AI prompts |
| `Templates` | 150+ templates across 15 categories |

Root dashboards: `🏡Home.md`, `👁️Dashboard.md`, `TODO.md`, `🧭 Review HQ.md`

## Template System (3-Tier Modular)

Templates use separation of concerns — Meta (YAML) + Body (content) composed at creation:

- **Meta**: `Templates/Meta/{type}-meta.yaml.md` — YAML frontmatter
- **Body**: `Templates/Body/{type}-body.md` — content structure
- **Create**: `Templates/Create/new-{type}.md` (empty), `new-{type}-auto.md` (auto-active)
- **Static**: `Templates/Static/{type}.md` — standalone fallbacks
- **Core snippets**: `Templates/Core/_nav-breadcrumb.md`, `_nav-wayfinder.md`, `_section-related.md`
- **Queries**: `Templates/Queries/Query - {Topic}.md`
- **Calendar**: `Templates/Calendar/Template {Period}.md`

**Supported types**: atomic, effort, source, moc, meeting, area, person, place, tool, prompt
**Exemplars**: `Templates/_Examples/{Type} Filled Out.md` — Title-case type, space before "Filled". All 10 full types have exemplars as of 2026-04-30.

Engine: `99-System/Scripts/Templater_script.js` — provides `inject_meta_if_missing()`, `add_chapters()`, `combine()`, `reset_body()`, `reset_meta()`, `reset_all()`

## Key Scripts (`99-System/Scripts/`)

| Script | Purpose |
|--------|---------|
| `Templater_script.js` | Core template composition engine |
| `yaml_orchestrator.js` | YAML reorder/normalize/lint (config: `99-System/Config/yaml-meta-config.json`) |
| `yaml_validator.js` | YAML field type & required field validation |
| `smart-classifier.js` | Note type/folder/tag suggestion from content |
| `auto-metadata.js` | Automatic frontmatter population |
| `batch-process-inbox.js` | Bulk inbox processing |
| `quick-process-atomic.js` | Atomic note quick processing |
| `quick-process-effort.js` | Effort quick processing |
| `quick-process-source.js` | Source quick processing |
| `maturity-promoter.js` | Maturity promotion suggestions |
| `maturity-evolve.js` | QuickAdd picker for maturity changes |
| `metrics-core.js` | Vault health metrics, gamification XP/levels |
| `update-metrics-cache.js` | Metrics caching (inline fields for `dv.page()`) |
| `generate-weekly-report.js` | Automated weekly report generator |
| `archive_note.js` / `archive-old-dailies.js` | Archival automation |
| `status-picker.js` / `status-progression.js` | Status workflow UI & automation |
| `process-note-safe.js` | Combo macro: Classify + Autofill Metadata + Normalize YAML |

## Maintenance Scripts (`claude-scripts/`)

Run from repo root via Git Bash:

| Script | Usage | Purpose |
|--------|-------|---------|
| `vault-morning.sh` | `bash claude-scripts/vault-morning.sh [--dry-run]` | Daily: inbox triage + metrics cache refresh |
| `vault-desloppify.sh` | `bash claude-scripts/vault-desloppify.sh [--dry-run\|--last-commit]` | Post-edit: YAML cleanup (maturity, status, deadline→due) |

Always ends with manual `git diff` + commit prompt — never auto-commits.

## YAML Frontmatter Schema

```yaml
up: "[[Parent]]"           # Breadcrumb navigation
title: "Note Title"
type: atomic | effort | source | moc | meeting | area | person | place | tool | prompt
status: 📥inbox | 🔄active | ⏳waiting | ✅completed | 📦archived | ⏸️paused | ❌cancelled | ⚠️blocked
maturity: 📤seed | 🌱seedling | 🪴sapling | 🌲evergreen | 🍓fruit
priority: high | medium | low
tags: []                   # Emoji-prefixed: 💡atomic, 🚀project, 📚source
created: YYYY-MM-DD
modified: YYYY-MM-DD
related: []
```

Scripts run within Obsidian via Templater or QuickAdd. CIS enums: `99-System/CIS/CIS_{FIELD_NAME}.md` (30+ files).

## QuickAdd Integration

- Scripts run as QuickAdd UserScripts: `module.exports = async (args) => { const { app, Notice } = window; ... }`
- QuickAdd input prompt: `app.plugins.plugins.quickadd.api.inputPrompt(title, description, defaultValue)`
- Macros registered in `.obsidian/plugins/quickadd/data.json` — must add entries there for buttons to work
- **Registration pattern for UserScripts**: wrap in a `Macro` choice (`"type": "Macro"`) with a `commands[]` array containing `{"type": "UserScript", "path": "..."}` — raw UserScript entries inside Multi `choices[]` do NOT work
- **Trailing spaces in data.json names**: QuickAdd entry names sometimes have trailing spaces — always `.strip()` both sides when looking up by name in Python scripts
- **Bulk edits to data.json**: use `python - << 'PYEOF'` inline script; backup first with `shutil.copy`; validate after with `json.load()`
- Button plugin syntax: `type command` + `action QuickAdd: MenuName: ChoiceName`

## Two-Tier Type System

- **Full types (10)**: atomic, effort, source, moc, meeting, prompt, person, place, tool, area — have FileClass + full templates + metadata schemas
  - Prompt sub-tiers: Full prompt (complete template) vs Quick prompt (minimal YAML + single instruction)
- **Lightweight types (11)**: system, dashboard, about, guide, tutorial, daily, weekly, monthly, quarterly, yearly, challenge — CIS_TYPE + Templater_script only, NO FileClass/templates

## ⚠️ Critical Issues to Avoid

1. **`combine()` function**: Use `tR += await tp.user.combine(...)` — NOT `writeActive()` (causes race conditions). Reset functions (`reset_*`) correctly use `writeActive()`.

2. **Status values**: Always emoji-prefixed (`🔄active`, not bare `active`). Canonical: `📥inbox`, `🔄active`, `⏳waiting`, `✅completed`, `📦archived`, `❌cancel`, `⚠️blocked`

3. **Maturity values**: `📤seed` (not `🌱seed`). Canonical: `📤seed`, `🌱seedling`, `🪴sapling`, `🌲evergreen`, `🍓fruit`

4. **Field naming**: `due` (not `deadline`), `related` (not `relatedNotes`). YAML Orchestrator auto-renames.

5. **Cache pattern**: `00-Meta/_Metrics Cache.md` uses inline fields (`field:: value`). Dashboard reads via `dv.page("99-System/_Metrics Cache").field_name` with live fallback. Update via QuickAdd "Update Metrics Cache".

6. **`prompt_status` vs `status`**: `status` = vault lifecycle (filtering/queries), `prompt_status` = prompt quality stage (`draft`, `active`, `winner`, `archived`). Both coexist.

7. **Windows paths**: Glob tool may miss files — use `ls` via Bash as fallback.

8. **Review HQ**: Uses mix of cached metrics + live queries for dynamic data (overdue tasks, waiting items can't be cached).

9. **Bilingual classifiers**: `batch-process-inbox.js`, `quick-process-atomic.js`, `quick-process-source.js` intentionally contain Czech keywords for classifying Czech-written notes — do NOT remove. `smart-classifier.js` is English-only.

10. **Tags consolidated (2026-03-31)**: Vault tags unified to emoji-first canonical forms. See `00-Meta/Documentation/PKM/🏷️Tag Consolidation Log.md` for full changelog. Key renames: `🎯project` → `🚀effort`, `💡idea` → `💡atomic`, `quick` → `🧹tidy`. Old "Tags Showcase" section replaced with link to consolidation log.

## Naming Conventions

- **Templates**: `{type}-meta.yaml.md`, `{type}-body.md`, `new-{type}.md`, `new-{type}-auto.md`
- **Scripts**: kebab-case (`smart-classifier.js`, `yaml-orchestrator.js`)
- **CIS enums**: `CIS_{FIELD_NAME}.md` (SCREAMING_SNAKE_CASE)
- **YAML keys**: snake_case (`processing_priority`, `completion_percentage`)
- **Tags**: emoji + category (`💡atomic`, `🚀project`, `📚source`, `📥inbox`)
- **About files**: `+About {Section}ℹ️.md`

## Troubleshooting

- **Dataview undefined**: Use `p?.status === "🔄active"` and `?? 0` fallback
- **Dataview no results**: Check folder path quotes (`"03-Efforts"`), verify canonical status
- **Templater undefined**: Ensure function has `return`
- **combine() disappears**: Use `tR +=` NOT `writeActive()`
- **Module not found**: Check `99-System/Scripts/` path, restart Obsidian
- **Stale dashboard**: Check cache timestamp in `00-Meta/_Metrics Cache.md`, run "Update Metrics Cache"
- **QuickAdd macro missing**: Restart Obsidian
- **Broken wiki-link**: Check spelling/caps, don't include `.md` extension
- **Glob misses files**: Use `ls` via Bash on Windows

## Query Optimization

- Use `LIMIT` on large queries
- Combine `.where()` with `&&` (not chained)
- Folder-specific: `dv.pages('"03-Efforts"')` not `dv.pages().where(...)`
- Use cache: `dv.page("99-System/_Metrics Cache").field` with live fallback
- Exclude: `99-System`, `Templates`, `_backups`

## Git Workflow

- **Branch**: `main` + feature branches (`claude/*` for Claude Code sessions)
- **Commits**: Conventional style — `fix:`, `feat:`, `refactor:`, `chore:`, `docs:`
- **No force-push to main**

## Quick Lookup

- System architecture: `99-System/` docs
- Workflows: `00-Meta/Documentation/PKM/🔁My PKM Workflows.md`
- Tag system: `00-Meta/Documentation/PKM/🏷️My PKM Tags.md`
- Tag health monitoring: `00-Meta/Documentation/Tags - Status Check.md`

## Wiki Knowledge Base (claude-obsidian)

Path: `C:/Users/MarcelMachanec/Documents/Karpathy/claude-obsidian`

When you need context not already in this vault (external concepts, research, ingested sources):
1. Read `wiki/hot.md` first — recent context cache from last session
2. If not enough, read `wiki/index.md` — master catalog of all wiki pages
3. If you need domain details, read the relevant sub-index under `wiki/concepts/` or `wiki/entities/`
4. Only then drill into specific wiki pages

Do NOT read the wiki for Origin vault structure questions, PARA organization, or Dataview queries — use Origin's own docs for those.
