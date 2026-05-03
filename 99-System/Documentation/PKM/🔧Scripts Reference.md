---
title: "Scripts Reference"
type: system
tags:
  - ⚙️system
  - 📋documentation
  - 🔧scripts
status: 🔄active
created: 2026-02-15
modified: 2026-02-17
related:
  - "[[🔁My PKM Workflows]]"
  - "[[📦Template System Guide]]"
  - "[[🚀Vault Migration Guide]]"
  - "[[📊 Bases Formulas Reference]]"
---
> [!orbit] Wayfinder | [[🗺️My PKM MOC]] | [[🔁My PKM Workflows]] | [[📦Template System Guide]] | 🔧Scripts Reference | [[🚀Vault Migration Guide]] | [[📊 Bases Formulas Reference]]

⬆️:: [[🏡Home]]

> [!info]+ **⚡ Script Ecosystem**
> **Location**: `99-System/Scripts/`
> **Count**: 25 JavaScript scripts
> **Triggers**: Templater user scripts, QuickAdd macros, or manual invocation
> **Philosophy**: Automate repetitive vault operations while keeping the user in control

---

## 📊 Script Categories at a Glance

| Category | Scripts | Purpose |
|----------|---------|---------|
| **Core Template & Metadata** | 3 | Template composition, YAML normalization, schema validation |
| **Metrics & Reporting** | 7 | Vault health metrics, weekly/monthly/quarterly/yearly reports, maturity suggestions |
| **Inbox Processing** | 5 | Batch triage, smart classification, type-specific quick processing |
| **Status & Maturity** | 3 | Status progression, visual picker, maturity evolution |
| **Archive & Maintenance** | 2 | Single-note archival, bulk daily note archival |
| **Publishing & Navigation** | 4 | Newsletter generation, changelog, home navigation, prompt normalization |
| **Auto-Metadata** | 1 | Intelligent default metadata population |

---

## 1. Core Template & Metadata

### `Templater_script.js`

> Template composition engine — the backbone of note creation.

| Detail | Value |
|--------|-------|
| **Trigger** | Templater user script (`tp.user.Templater_script`) |
| **Inputs** | `tp` (Templater instance), `type` (note type string), `mode` ("empty" or "auto") |
| **Outputs** | Returns composed template content via `tR +=` or writes directly to active file |
| **Dependencies** | Templater plugin, template files in `Templates/Meta/` and `Templates/Body/` |

**Exported Functions** (6):

| Function | Purpose |
|----------|---------|
| `combine(tp, type, mode)` | Chains Meta + Body templates, returns content for `tR +=`. In "auto" mode, sets status to `🔄active` instead of `📥inbox` |
| `inject_meta_if_missing(tp, type)` | Adds YAML frontmatter to an existing note only if none exists |
| `add_chapters(tp, type)` | Replaces body content while preserving existing YAML frontmatter |
| `reset_body(tp, type)` | Resets body to template default, keeps YAML |
| `reset_meta(tp, type)` | Resets YAML to template default, keeps body |
| `reset_all(tp, type, mode)` | Replaces both YAML and body from templates |

**Template Resolution**: Searches multiple paths in priority order — new modular paths (`Templates/Meta/`, `Templates/Body/`) first, then legacy paths (`Templates/New-Notes/Type/`, `Templates/Type/`, `Templates/`) for backward compatibility.

> [!warning] **Gotcha**: `combine()` returns content via `tR +=`, NOT `writeActive()`. Templates must use `tR += await tp.user.Templater_script.combine(...)`. Direct `writeActive()` races with Templater's own write.

See [[📦Template System Guide]] for full architecture details.

---

### `yaml_orchestrator.js`

> YAML normalize, lint, and reorder engine for vault-wide metadata hygiene.

| Detail | Value |
|--------|-------|
| **Trigger** | Templater user script or QuickAdd macro |
| **Inputs** | JSON args: `{ mode, path?, folder?, dryRun?, backup?, configPath? }` |
| **Outputs** | Modifies YAML frontmatter in-place; generates lint reports |
| **Dependencies** | Config file at `99-System/Config/yaml-meta-config.json` |

**Modes**:

| Mode | Description | Safe? |
|------|-------------|-------|
| `reorder` | Reorders YAML keys to match canonical order; preserves formatting and comments | Yes — no data change |
| `normalize` | Fixes values (arrays, dates, enums), applies rename rules, rewrites YAML | Backup recommended |
| `lint` | Report-only; writes a Markdown report listing issues | Yes — read-only |

**Usage**:
```
<%* await tp.user.yaml_orchestrator({ mode: "reorder" }) %>
<%* await tp.user.yaml_orchestrator({ mode: "normalize", backup: true }) %>
<%* await tp.user.yaml_orchestrator({ mode: "lint", folder: "03-Efforts" }) %>
```

**Features**: Status value normalization (maps bare text to emoji equivalents), field renaming (e.g., `deadline` → `due`), date format correction, array normalization, validation step 5b for schema compliance.

---

### `yaml_validator.js`

> Schema validation engine for note frontmatter.

| Detail | Value |
|--------|-------|
| **Trigger** | Templater user script (`tp.user.yaml_validator()`) or QuickAdd |
| **Inputs** | YAML object and type string; or `{ mode: "lint", folder: "path" }` for batch |
| **Outputs** | Returns validation results: missing required fields, invalid enums, format issues |
| **Dependencies** | None (self-contained schema definitions) |

**Built-in Schemas**: `base`, `atomic`, `effort`, `source`, `moc`, `meeting`, `prompt` — each extends `base` with type-specific required fields and enum values.

**Validates**:
- Required fields present (e.g., atomic notes need `title`, `type`, `status`, `created`, `tags`)
- Enum values correct (e.g., `status` must be one of `📥inbox`, `🔄active`, `⏳waiting`, `✅completed`, `📦archived`, `⏸️paused`, `❌cancelled`)
- Date field formats (`YYYY-MM-DD`)
- Array field types (tags, related, aliases)

---

## 2. Metrics & Reporting

### `metrics-core.js`

> Single source of truth for vault metric calculations.

| Detail | Value |
|--------|-------|
| **Trigger** | Templater user script (`await tp.user.metrics_core()`) — imported by other scripts |
| **Inputs** | Dataview API object (`dv`) passed to individual metric functions |
| **Outputs** | Returns object with metric calculation functions |
| **Dependencies** | Dataview plugin |

**Available Metrics**:
- `getInboxCount()` — notes in `+Inbox` folder
- `getActiveProjectsCount()` — efforts with status `🔄active`
- `getStaleProjectsCount()` — active efforts not modified in 14+ days
- `getOrphanCount()` — notes with zero inbound/outbound links
- `getHealthScore()` — weighted composite (inbox 25%, projects 25%, stale 25%, orphans 25%)

**Used By**: `update-metrics-cache.js`, dashboard templates, weekly report generation.

---

### `update-metrics-cache.js`

> Calculates expensive metrics once and writes results to `_Metrics Cache.md` for fast dashboard rendering.

| Detail | Value |
|--------|-------|
| **Trigger** | QuickAdd macro; recommended daily at 6am or before dashboard review |
| **Inputs** | None (reads vault state directly) |
| **Outputs** | Writes Dataview inline fields (`field:: value`) to `99-System/_Metrics Cache.md` |
| **Dependencies** | Dataview API, `moment.js` |

**Cached Metrics**: Note counts by type, XP/gamification stats, connection density, orphan detection, hub pages, weekly/monthly growth trends.

**Performance Impact**: 60-80% dashboard load improvement — dashboards read `dv.page("99-System/_Metrics Cache").field_name` with live Dataview fallback if cache is stale.

**Usage**:
```
QuickAdd > Macros > 📊 Update Metrics Cache
```

---

### `generate-weekly-report.js`

> Creates a structured weekly report note with metrics, highlights, and completed work.

| Detail | Value |
|--------|-------|
| **Trigger** | QuickAdd macro; recommended Sunday evening |
| **Inputs** | None (calculates ISO week number from current date) |
| **Outputs** | Creates `05-Calendar/Weekly/Weekly Report YYYY-WNN.md` |
| **Dependencies** | Obsidian Vault API, MetadataCache |

**Report Sections**: Week summary, metrics snapshot, completed tasks, inbox throughput, connection growth, maturity promotions, notes created/modified during the week.

**Date Handling**: Sets week boundaries Monday 00:00 to Sunday 23:59, extracts ISO week number.

---

### `generate-monthly-report.js`

> Creates a structured monthly report by aggregating weekly reports and vault data.

| Detail | Value |
|--------|-------|
| **Trigger** | QuickAdd macro (🧹 Maintain > 📊 Generate Monthly Report) |
| **Inputs** | Prompts for `YYYY-MM` period; blank defaults to current month |
| **Outputs** | Creates `05-Calendar/Monthly/Monthly Report YYYY-MM.md` |
| **Dependencies** | Obsidian Vault API, MetadataCache, QuickAdd API |

**Report Sections**: Key Metrics, Weekly Summaries (links to weekly reports), Area Health Check (5 life areas via backlinks), Effort Portfolio (grouped by status), Maturity Pipeline, Monthly Highlights, Month Summary, Next Month Focus, 4-Week Trend (DataviewJS).

**Data Flow**: Finds weekly reports in `05-Calendar/Weekly/` whose ISO weeks overlap the target month. Parses metrics tables via regex. **Fallback**: If <2 weekly reports found, queries vault directly using `file.stat.ctime/mtime` date filtering.

**Past-Period Support**: On launch, prompts for `YYYY-MM` (e.g. `2025-06`). Leave blank or accept the default to generate for the current month. Allows generating retroactive reports for any past month.

---

### `generate-quarterly-report.js`

> Creates a structured quarterly report by aggregating monthly reports and vault data.

| Detail | Value |
|--------|-------|
| **Trigger** | QuickAdd macro (🧹 Maintain > 📊 Generate Quarterly Report) |
| **Inputs** | Prompts for `YYYY-Q#` period; blank defaults to current quarter |
| **Outputs** | Creates `05-Calendar/Quarterly/Quarterly Report YYYY-Q#.md` |
| **Dependencies** | Obsidian Vault API, MetadataCache, QuickAdd API |

**Report Sections**: Key Metrics, Monthly Summaries (links to monthly reports), Area Health Trends (month-over-month comparison), Major Initiatives (high-priority active efforts), Maturity Pipeline, Quarter Summary, Strategic Insights, Next Quarter Focus, 12-Week Trend (DataviewJS).

**Data Flow**: Finds monthly reports in `05-Calendar/Monthly/` for the quarter's 3 months. Parses metrics tables and area health tables via regex for trend tracking. **Fallback**: If <2 monthly reports found, queries vault directly.

**Past-Period Support**: On launch, prompts for `YYYY-Q#` (e.g. `2025-Q3`). Leave blank or accept the default to generate for the current quarter.

---

### `generate-yearly-report.js`

> Creates a structured yearly report by aggregating quarterly reports and vault data.

| Detail | Value |
|--------|-------|
| **Trigger** | QuickAdd macro (🧹 Maintain > 📊 Generate Yearly Report) |
| **Inputs** | Prompts for `YYYY` period; blank defaults to current year |
| **Outputs** | Creates `05-Calendar/Yearly/Yearly Report YYYY.md` |
| **Dependencies** | Obsidian Vault API, MetadataCache, QuickAdd API |

**Report Sections**: Key Metrics, Quarterly Summaries (links to quarterly reports), Annual Area Overview (backlinks + yearly activity), Knowledge Growth (atomics/sources/MOCs created), Maturity Pipeline, System Maturity (connection density, orphans, review consistency), Year Summary, Annual Reflections, Next Year Vision, 12-Month Trend (DataviewJS).

**Data Flow**: Finds quarterly reports in `05-Calendar/Quarterly/` for the target year. Parses metrics tables via regex. Always queries: knowledge growth counts, connection density, review consistency. **Fallback**: If <2 quarterly reports found, queries vault directly.

**Past-Period Support**: On launch, prompts for `YYYY` (e.g. `2025`). Leave blank or accept the default to generate for the current year.

---

### `maturity-promoter.js`

> Analyzes atomic notes and suggests maturity stage promotions based on quantitative criteria.

| Detail | Value |
|--------|-------|
| **Trigger** | Templater user script (`await tp.user.maturity_promoter()`) |
| **Inputs** | Dataview API object (`dv`) |
| **Outputs** | Returns `getSuggestions(dv)` function producing promotion recommendations |
| **Dependencies** | Dataview plugin |

**Promotion Criteria**:

| Transition | Outbound Links | Backlinks | Stability (days) |
|-----------|---------------|-----------|-------------------|
| 📤seed → 🌱seedling | 2+ | 1+ | — |
| 🌱seedling → 🪴sapling | 5+ | 2+ | — |
| 🪴sapling → 🌲evergreen | 10+ | 5+ | 30+ |
| 🌲evergreen → 🍓fruit | 15+ | 10+ | 60+ |

---

## 3. Inbox Processing

### `batch-process-inbox.js`

> Processes multiple inbox notes at once — runs classification, auto-metadata, folder move, and status update.

| Detail | Value |
|--------|-------|
| **Trigger** | QuickAdd macro; recommended weekly during GTD review or when inbox > 10 items |
| **Inputs** | Optional `args`: `{ autoClassify, autoMove, requireConfirmation }` (all default `true`) |
| **Outputs** | Processes notes, generates processing report |
| **Dependencies** | QuickAdd API, `smart-classifier.js`, `auto-metadata.js` |

**Workflow**: Filters notes from `+Inbox/` → sorts newest first → prompts for batch confirmation → runs classification → applies metadata → moves to target folders.

---

### `smart-classifier.js`

> Analyzes note content to suggest type, target folder, tags, related notes, and maturity level.

| Detail | Value |
|--------|-------|
| **Trigger** | QuickAdd macro or Templater (`await tp.user.smart_classifier()`) |
| **Inputs** | Optional `{ force: true }` to reclassify already-classified notes |
| **Outputs** | Updates frontmatter with classification results |
| **Dependencies** | QuickAdd API, MetadataCache |

**Analysis**: Content heuristics determine note type (effort, atomic, source, etc.), suggest appropriate folder (`02-Knowledge/Atomics/`, `03-Efforts/`, etc.), recommend tags based on content keywords, and identify related existing notes.

---

### `quick-process-atomic.js`

> Instantly processes an inbox note as an atomic knowledge note.

| Detail | Value |
|--------|-------|
| **Trigger** | QuickAdd macro |
| **Inputs** | None (operates on active file) |
| **Outputs** | Updates metadata, moves to `02-Knowledge/Atomics/[subfolder]` |
| **Dependencies** | QuickAdd API, MetadataCache |

**Processing Time**: ~10-15 seconds vs 2-3 minutes manual processing. Offers optional title refinement, auto-populates `type: atomic`, calculates maturity from content analysis, suggests subfolder based on keywords.

---

### `quick-process-effort.js`

> Instantly processes an inbox note as an effort/project.

| Detail | Value |
|--------|-------|
| **Trigger** | QuickAdd macro |
| **Inputs** | None (operates on active file) |
| **Outputs** | Updates metadata, moves to `03-Efforts/[Active|Paused|Waiting]` |
| **Dependencies** | QuickAdd API, MetadataCache |

**Processing Time**: ~15-20 seconds. Prompts for deadline and priority, determines folder (Active/Paused/Waiting) based on deadline proximity, sets status based on urgency.

---

### `quick-process-source.js`

> Instantly processes an inbox note as a source (book, article, video).

| Detail | Value |
|--------|-------|
| **Trigger** | QuickAdd macro |
| **Inputs** | None (operates on active file) |
| **Outputs** | Updates metadata, moves to `04-Sources/[subfolder]` |
| **Dependencies** | QuickAdd API, MetadataCache |

**Processing Time**: ~15-20 seconds. Prompts for URL, author, and source type, suggests subfolder based on detected source type, applies structured template for key insights.

---

## 4. Status & Maturity

### `status-progression.js`

> Advances note status one step through the defined workflow.

| Detail | Value |
|--------|-------|
| **Trigger** | Templater user script, typically bound to hotkey or Commander button |
| **Inputs** | `tp` (Templater instance) |
| **Outputs** | Updates status field in frontmatter; displays notification |
| **Dependencies** | Obsidian Vault API, MetadataCache |

**Status Flow**: `📥inbox` → `🔄active` → `⏳waiting` → `✅completed` → `📦archived`

Performs in-place regex replacement of the status YAML line. Exits early if no next status exists for the current value.

---

### `status-picker.js`

> Visual status selection picker — bypasses linear progression when needed.

| Detail | Value |
|--------|-------|
| **Trigger** | QuickAdd macro, typically from Commander page header button |
| **Inputs** | None (operates on active file) |
| **Outputs** | Updates status field in frontmatter |
| **Dependencies** | QuickAdd API (with `window.prompt` fallback) |

Presents all status options with descriptions via QuickAdd suggester. Skips update if selected status matches current value.

---

### `maturity-evolve.js`

> Manual maturity stage picker for the current note.

| Detail | Value |
|--------|-------|
| **Trigger** | QuickAdd macro (Process > Set Maturity) |
| **Inputs** | None (operates on active file) |
| **Outputs** | Updates maturity field in frontmatter |
| **Dependencies** | QuickAdd API, MetadataCache |

Displays current maturity in suggester context. Creates frontmatter section if missing, inserts maturity field if absent, uses regex replacement for existing field.

---

## 5. Archive & Maintenance

### `archive_note.js`

> Archives the current note — updates YAML and moves to Archive folder.

| Detail | Value |
|--------|-------|
| **Trigger** | Templater user script, typically bound to hotkey |
| **Inputs** | `tp` (Templater instance) |
| **Outputs** | Sets `status: 📦archived`, adds `archived_date`, adds `#📦archived` tag, moves to `06-Archive/Completed` |
| **Dependencies** | Obsidian Vault API |

Uses custom `splitFM()` frontmatter parser. Smart tag insertion supporting both YAML array and block list tag formats. Upserts status and archived date before moving the file.

---

### `archive-old-dailies.js`

> Archives daily notes older than a configurable threshold to improve vault performance.

| Detail | Value |
|--------|-------|
| **Trigger** | QuickAdd macro; recommended quarterly or when performance degrades |
| **Inputs** | Optional `{ ageThresholdMonths: 12, dryRun: false }` |
| **Outputs** | Moves old dailies to `06-Archive/Daily-Notes-Archive/YYYY/`, creates archive index, generates report |
| **Dependencies** | QuickAdd API, `moment.js` |

Extracts date from daily note filenames, preserves metadata for streak calculation. Supports dry-run preview mode.

---

## 6. Publishing & Navigation

### `generate-newsletter.js`

> Gathers notes flagged `newsletter: true` and assembles a draft newsletter.

| Detail | Value |
|--------|-------|
| **Trigger** | QuickAdd macro ("📰 Generate Newsletter") |
| **Inputs** | None (reads `newsletter: true` from frontmatter) |
| **Outputs** | Creates `05-Calendar/Newsletter/Newsletter YYYY-MM-DD.md`; clears `newsletter: true` flag from included notes |
| **Dependencies** | Obsidian Vault API, MetadataCache |

**Newsletter Sections** (grouped by maturity):
- **Highlights**: evergreen/fruit notes
- **New Ideas**: seed/seedling notes
- **Deep Dives**: sapling notes
- **Sources**: source-type notes

After successful draft creation, the `newsletter: true` flag is cleared from all included notes to prevent duplication.

---

### `update-changelog.js`

> Drafts a CHANGELOG entry from recent vault changes.

| Detail | Value |
|--------|-------|
| **Trigger** | QuickAdd macro ("📋 Update Changelog") |
| **Inputs** | None (parses last entry date from existing CHANGELOG) |
| **Outputs** | Prepends dated section to `CHANGELOG.md` at vault root |
| **Dependencies** | Obsidian Vault API |

**Change Categories**: Scripts, Templates, Dashboards, Notes, Config — determined by folder structure. Parses last changelog date via regex; falls back to 7-day window if no date found.

---

### `open-home.js`

> Navigation helper to quickly open `🏡Home.md`.

| Detail | Value |
|--------|-------|
| **Trigger** | QuickAdd macro, typically bound to hotkey or launcher command |
| **Inputs** | `params` object with `app` reference |
| **Outputs** | Opens `🏡Home.md` in current leaf |
| **Dependencies** | Obsidian Workspace API |

Simplest script in the vault (~10 lines). Uses `app.vault.getAbstractFileByPath()` to locate the home note.

---

### `normalize_prompts.js`

> Batch normalizes YAML frontmatter for legacy and copilot prompts.

| Detail | Value |
|--------|-------|
| **Trigger** | QuickAdd macro or Templater (`await tp.user.normalize_prompts({ mode: "legacy" })`) |
| **Inputs** | `{ mode: "legacy"|"copilot", dryRun?: true }` |
| **Outputs** | Updates frontmatter in-place; returns count of changed files |
| **Dependencies** | Obsidian Vault API, MetadataCache |

**Modes**:
- `legacy` — Normalizes prompts in `Prompts_org/`: renames fields (`Category` → `prompt_category`, `Type` → `prompt_type`), adds missing required fields, ensures `🤖prompt` tag
- `copilot` — Normalizes copilot prompts in `copilot-custom-prompts/`: preserves `copilot-command-*` fields alongside standard YAML

Supports dry-run mode for preview without writes.

---

## 7. Auto-Metadata

### `auto-metadata.js`

> Automatically populates missing frontmatter fields with intelligent defaults.

| Detail | Value |
|--------|-------|
| **Trigger** | QuickAdd macro or Templater (`await tp.user.auto_metadata()`) |
| **Inputs** | Optional `{ files: [TFile, ...] }` for batch processing (defaults to active file) |
| **Outputs** | Updates frontmatter with populated fields; returns processed/updated counts |
| **Dependencies** | Obsidian Vault API, MetadataCache |

**Auto-populated Fields**:
- `created` / `modified` — from file stats if missing
- `up` — parent note based on folder structure
- `related` — suggested from content similarity
- `tags` — type-appropriate defaults
- `status` — defaults to `📥inbox` if missing
- `maturity` — calculated for atomic notes based on content analysis

---

## 📋 Quick Lookup Table

| Script | Category | Trigger | Primary Action |
|--------|----------|---------|----------------|
| `Templater_script.js` | Core | Templater | Template composition |
| `yaml_orchestrator.js` | Core | Templater/QuickAdd | YAML normalize/lint/reorder |
| `yaml_validator.js` | Core | Templater/QuickAdd | Schema validation |
| `metrics-core.js` | Metrics | Templater (library) | Metric calculations |
| `update-metrics-cache.js` | Metrics | QuickAdd | Cache refresh |
| `generate-weekly-report.js` | Metrics | QuickAdd | Weekly report creation |
| `generate-monthly-report.js` | Metrics | QuickAdd | Monthly report creation |
| `generate-quarterly-report.js` | Metrics | QuickAdd | Quarterly report creation |
| `generate-yearly-report.js` | Metrics | QuickAdd | Yearly report creation |
| `maturity-promoter.js` | Metrics | Templater | Promotion suggestions |
| `batch-process-inbox.js` | Inbox | QuickAdd | Batch inbox triage |
| `smart-classifier.js` | Inbox | QuickAdd/Templater | Content classification |
| `quick-process-atomic.js` | Inbox | QuickAdd | Quick atomic processing |
| `quick-process-effort.js` | Inbox | QuickAdd | Quick effort processing |
| `quick-process-source.js` | Inbox | QuickAdd | Quick source processing |
| `status-progression.js` | Status | Templater | Linear status advance |
| `status-picker.js` | Status | QuickAdd | Visual status picker |
| `maturity-evolve.js` | Maturity | QuickAdd | Manual maturity picker |
| `archive_note.js` | Archive | Templater | Single-note archival |
| `archive-old-dailies.js` | Archive | QuickAdd | Bulk daily archival |
| `generate-newsletter.js` | Publishing | QuickAdd | Newsletter draft |
| `update-changelog.js` | Publishing | QuickAdd | Changelog entry |
| `open-home.js` | Navigation | QuickAdd | Open home note |
| `normalize_prompts.js` | Publishing | QuickAdd/Templater | Prompt YAML normalization |
| `auto-metadata.js` | Auto-Metadata | QuickAdd/Templater | Metadata enrichment |

---

## 🔧 How to Extend

### Adding a New Script

1. Create `.js` file in `99-System/Scripts/`
2. Export a function: `module.exports = async (args) => { ... }` for QuickAdd, or `module.exports = function() { ... }` for Templater user scripts
3. For **QuickAdd**: Register as User Script macro in QuickAdd settings
4. For **Templater**: Ensure `99-System/Scripts/` is set as Templater user script folder; access via `tp.user.scriptName()`
5. Use `new Notice("message")` for user feedback
6. Access vault via `app.vault`, metadata via `app.metadataCache`, workspace via `app.workspace`

### Script Conventions

- **Naming**: `kebab-case.js` for all scripts except `Templater_script.js` (legacy)
- **Error handling**: Display `Notice` on failure; never throw uncaught exceptions
- **Backup**: Scripts that modify YAML should support `backup: true` option
- **Dry-run**: Batch-processing scripts should support `dryRun: true` for preview
- **Dependencies**: Minimize cross-script dependencies; prefer self-contained logic

---

## 🔗 Related

- [[📦Template System Guide]] — How templates use `Templater_script.js`
- [[🔁My PKM Workflows]] — Where scripts fit in daily/weekly/monthly workflows
- [[🚀Vault Migration Guide]] — Configuring scripts after forking
- [[📅 Calendar Review Hub]] — Action center for all report generation scripts

---

*Last Updated: 2026-02-17 | Status: 🔄active*
