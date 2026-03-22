---
title: "CHANGELOG"
Version: 1.9.1
Last Backup: 2026-03-02
template-status: origin_dev
modified: 2026-03-03
---
⬆️:: [[🏡Home]]
[[TODO]] - [[BACKLOG]] - [[RELEASE NOTES]]
---
*Last updated: `= date(now)`*
---
> Vault modifications and changes log.
---
# 22/03/26
## CSS Snippets — Bases & Properties

- Added `bases-cards-grid.css` — grid layout for Bases card properties (label:value side-by-side)
- Added `tag-pills.css` — tags render as rounded accent-colored pill badges (inline, properties, source mode)
- Added `properties-compact.css` — properties panel shrunk to 10-11px font, zero row padding, Minimal theme `!important` overrides

---
# 17/03/26
## Vault Identity & Template Audit

### Vault Identity Document
- Created `00-Meta/Documentation/PKM/🪪 Vault Identity.md`
- Defines Origin's purpose, philosophy, and boundaries vs other vaults (Muza, Ideaversee, Work)
- Cross-vault contrast table comparing 10 dimensions across all 4 vaults
- Origin-specific rules summary with links to detailed docs (no duplication)
- Automation inventory: 21 QuickAdd commands, 10 standalone macros, 4 captures, 36 scripts
- Vault direction section with open design questions

### Template Audit
- Created `00-Meta/Documentation/PKM/Template Audit Results.md`
- Scanned 159 templates — 0 critical issues found
- 3 missing frontmatter fields: `prompt-meta` (fileClass, in), `place-meta` (status), `tool-meta` (status)
- 12 QuickAdd entries with `(copy)` naming debt
- Typo found: `People - Proffesional` in QuickAdd config
- Documented naming inconsistencies across legacy templates (4 separator styles)
- Actionable checklist: quick fixes, medium effort, design decisions

---
# 06/03/26
## v2.0 Readiness — Metadata & Template Infrastructure

### QuickAdd Config Fix
- Fixed 21 dead template paths in `quickadd/data.json` — all pointed to removed `Templates/New-Notes/` structure
- Remapped to current `Templates/Create/` and `Templates/Quick *.md` paths

### Per-Type Metadata Validation (Queries 31–35)
- Added 5 type-specific validation queries to `My PKM Queries.md`:
  - Q31: Effort gaps (missing priority)
  - Q32: Atomic gaps (missing tags/status)
  - Q33: Source gaps (missing source_type/read_status)
  - Q34: Meeting gaps (missing meeting_type/participants)
  - Q35: Person gaps (missing relationship)
- Added combined per-type validation view to Review HQ (Data Integrity section)

### Folder-Template Mappings
- Added 6 new Templater folder-template mappings:
  - `02-Dots/200-Areas` → area-auto
  - `02-Dots/300-People` → person-auto
  - `02-Dots/400-Places` → place-auto
  - `02-Dots/500-Tools` → tool-auto
  - `04-Sources/440-Meetings` → meeting-auto
  - `05-Calendar/Quarterly` → quarterly template
- Ctrl+N in any content folder now auto-applies correct template (15 total mappings)

### auto-metadata.js Improvements
- Added type detection for Areas, People, Places, Tools, Meetings, Weekly/Monthly/Quarterly/Yearly
- Fixed parent link suggestions for all new folder mappings
- Expanded status default coverage to all content types

---
# 02/03/26
## TODO.md Dashboard
- Added `⏰ Scheduled Today` section (Tasks plugin query, between Due Today and Due This Week)
- Fixed `Done This Week` query syntax (`done on week this week` → `done this week`)
- Collapsed 6 context sections into 2× multi-column callout rows (3+3, collapsed by default)
- Renamed "All Tasks by File" → "Active Efforts — Tasks by File", narrowed to `03-Efforts`, limit 20

## Tags - Status Check
- Added Tag Usage Overview query (top 30 tags by usage)
- Added Orphan Tags query (< 3 uses)
- Added Over-Tagged Notes query (> 10 tags)

## PKM Tags Cleanup
- Removed duplicate scratch queries from top of `🏷️My PKM Tags.md`
- Replaced with callout link pointing to `Tags - Status Check`

---
# 28/02/26
## Czech → English Cleanup (Automation Layer)
- Cleaned `quickadd/data.json` — 4 inline scripts: Status Progression NEXT/PREV, Maturity selector, Quick Tag comments and UI strings translated to English
- Cleaned `smart-classifier.js` — removed all Czech keywords from typeKeywords, tagKeywords, filename hints, structural scoring (bilingual classification kept in batch-process-inbox.js, quick-process-atomic.js, quick-process-source.js for Czech note support)
- Rewrote `Templates/Calendar/Template Monthly.md` — all section headers, Dataview column names, labels → English
- Rewrote `Templates/Calendar/Template Quarterly.md` — OKRs, area overview, metrics → English
- Rewrote `Templates/Calendar/Template Weekly.md` — goals, area table, reflection prompts → English
- Rewrote `Templates/Calendar/Template Yearly.md` — vision, achievements, lessons → English
- Cleaned `Templates/Scripts/Templater, Generate weekly ECHO.md` — output strings → English
- Cleaned `Templates/Scripts/Templater, Quick Tagging in place.md` — comments → English
- Rewrote `Templates/Scripts/Week Review v2.md` — section headers, daily note extraction labels, reflection prompts → English
- Cleaned `Templates/Tests/Learn Fast with Short Text.md` — all sections → English
- Cleaned `Templates/Tests/WTF Weekly dashboar templater.md` — output strings → English
- Cleaned `Templates/_Examples/Prompt Filled Out.md` — removed redundant CZ translation block
- Renamed `Templater, YAML aktualizace modifikace.md` → `Templater, YAML Update Modification.md`

## Distribution & Config Management
- Added `.gitignore` — ignore plugin code (`main.js`, `styles.css`), workspace state, `.base` files, backup artifacts, Claude temp files
- Untracked 62 plugin code files from git (-162K lines) — only configs (`data.json`) and version metadata (`manifest.json`) stay versioned
- Added `99-System/Config/plugin-manifest.json` — pinned versions for 32 plugins across 3 tiers (core/recommended/optional)
- Added `99-System/Scripts/build-starter-pack.sh` — export clean starter pack from personal vault (strips personal content, keeps tutorials/templates/scripts/CIS)
## QuickAdd Optimization (final deliverables)
- Added `99-System/Scripts/process-note-safe.js` — combo macro: Classify + Autofill Metadata + Normalize YAML in sequence
- Added "Process Note (Safe)" as first entry in 🧩 Process QuickAdd menu
- Added `00-Meta/Documentation/Quick Reference Card.md` — beginner reference: 4 header buttons, 3 ribbon buttons, 7 hotkeys, full menu structure, workflow guide

---
# 25/02/26
- Added CSS snippet `uc-production.css` — UC theme: teal accent, deep slate, PROD badge
- Added CSS snippet `uc-dev.css` — UC theme: amber accent, warm charcoal, DEV badge + monospace nav
- Added CSS snippet `uc-work.css` — UC theme: steel blue accent, cool ink, WORK badge
- Added CSS snippet `uc-experimental.css` — UC theme: hot pink accent, deep violet, EXP badge + gradient H1
- Added CSS snippet `sidebar-icons-only.css` — fixes Minimal theme vertical sidebar tabs → horizontal icons
- Updated CSS snippet `headers-custom.css` — warm gradient headings (H1→H6), bold (peach), italic (lavender)
- Updated `CLAUDE.md` — restructured, trimmed 360→170 lines, fixed broken code fences

# 23/02/26
- Added [[base]]
- Added [[📊 Bases Formulas Reference]]
- Added [[🏡Home]]
- Modified [[📍Note Classification Guide]]
- Modified [[⚡Workflow Quick Reference]]
- Modified [[VAULT-REPORT]]
- Modified [[08-Connections-Revealed]]
- Modified [[07-Day-Seven]]
- Modified [[06-Day-Six]]
- Modified [[05-Day-Five]]
- Modified [[04-Day-Four]]
- Modified [[03-Day-Three]]
- Modified [[02-Day-Two]]
- Modified [[🗺️ROADMAP - Origin v2.0 Lifetime Vault]]
- Modified [[🏷️My PKM Tags]]
- Modified [[🔍My PKM Queries]]
- Added [[QuickAdd Audit Results]]
- Modified [[PKM Graph Overview]]
- Added [[Implementation Plan - Vault Optimization]]
- Modified [[Performance Metrics]]
- Modified [[Guide — YAML Orchestrator]]
- Modified [[Custom Callout System]]
- Modified [[TASKS]]
- Modified [[glossary]]
- Added [[CLAUDE]]
- Added [[CHANGELOG]]
- Modified [[Tutorial - Weekly - 2026-W05]]
- Added [[2026-02-23]]
- Modified [[Tutorial - Daily - 2026-01-27]]
- Added [[2026-02-18]]
- Modified [[+Inbox]]
- Modified [[Tutorial - Source - Thinking in Systems]]
- Modified [[Surfacing - Signal Design]]
- Modified [[Surfacing - Connection Ritual]]
- Modified [[Tutorial - MOC - Growth Patterns]]
- Added [[MOC - Bases]]
- Modified [[Claude Skills for PKM]]
- Modified [[Tutorial - Raw Capture (Mycelium)]]
- Modified [[Tutorial - Raw Capture (Coffee Chat)]]
- Modified [[Automations via fastkey]]
- Modified [[+ About Inbox ℹ️]]
- Added [[_Daily_Data.base]] — `Quarter` formula; renamed `Notes Captured` → `Links Made`; added `highlight` column to Daily Log view; added `Highlights Stream` and `High Energy Days` views
- Modified [[generate-weekly-report.js]] — added daily notes data block (highlights, energy/mood distribution); 3 new metric rows in Key Metrics table; new `## 📔 Daily Highlights` section
- Modified [[Template Daily.md]] — added `date:`, `energy:`, `mood:`, `highlight:` frontmatter; converted `{{date:...}}` → Templater syntax (`tp.file.title`-derived); folder-prefixed nav links; removed inline fields and star-rating section
- Modified [[Template Weekly.md]] — converted to Templater syntax; `startOf('isoWeek')` day derivation; folder-prefixed nav and day links
- Modified [[Template Monthly.md]] — converted to Templater syntax; folder-prefixed nav links; static dataview month filter
- Modified [[Template Yearly.md]] — converted to Templater syntax; folder-prefixed nav links
- Modified [[📊 Bases Formulas Reference]] — renamed `Notes Captured` section; added `Quarter` formula docs; added `Highlights Stream` and `High Energy Days` to Views Quick Reference
- Modified `templater-obsidian/data.json` — registered folder templates for `05-Calendar/Daily`, `Weekly`, `Monthly`, `Yearly` (enables click-to-create with correct template)
---
# 18/02/26
- Added [[Daily-View]] — new `.base` file with Created Today + Modified Today tabs (vault-wide)
- Fixed [[Active-Types-base]] — removed phantom `Insights` view (type not in vault schema); added Meetings, People, Places, Tools, Areas views
- Fixed [[Vault-Dash-Missing]] — repaired broken MOCs filter (was double-negated `not:`); removed invalid `file.backlinks` / `file.links` fields; removed Insights view
- Fixed [[_System_data]] — `modified` → `file.mtime` in properties; `not x` → `!x` in view filters; unquoted `order` field
- Added [[MOC - Bases]] — MOC linking all base files with live index query and filter syntax reference table
- Added `Templates/Static/base.md` — scaffold template for new base files with all common filter patterns
---
# 15/02/26
- Added [[quick-prompt]]
- Added [[Query - Newsletter Queue]]
- Added [[new-tool]]
- Added [[new-tool-auto]]
- Added [[new-source]]
- Added [[new-source-auto]]
- Added [[new-quick-prompt]]
- Added [[new-prompt]]
- Added [[new-prompt-auto]]
- Added [[new-place]]
- Added [[new-place-auto]]
- Added [[new-person]]
- Added [[new-person-auto]]
- Added [[new-moc]]
- Added [[new-moc-auto]]
- Added [[new-meeting]]
- Added [[new-meeting-auto]]
- Added [[new-effort-auto]]
- Added [[new-effort]]
- Added [[new-atomic]]
- Added [[new-atomic-auto]]
- Added [[new-area]]
- Added [[new-area-auto]]
- Modified [[area-body]]
- Added [[👁️Dashboard]]
- Added [[🎯GTD Command Center]]
- Modified [[_Metrics Cache]]
- Added [[🚀Vault Migration Guide]]
- Added [[🔧Scripts Reference]]
- Added [[🔢My PKM Metadata]]
- Added [[🔁My PKM Workflows]]
- Added [[📦Template System Guide]]
- Added `CIS_TYPE.md`
- Added `CIS_PROMPT_STATUS.md`
- Modified `CIS_MATURITY.md`
- Added `CIS_INTENT.md`
- Added [[⚡ Automation Menu]]
- Added [[07-Prompts__Prompts_org__Templater prompts__PP🔥🧾 TEMPLATE_Comprehension_and_Summarization - Detail 1.20260214-005715]]
- Added prompts and updated its metadata to fit Origin vault.
- ...and 920 more notes
---
# 10/02/26
- Added [[Query - Newsletter Queue]]
- Added [[new-effort-auto]]
- Added [[new-atomic]]
- Added [[new-atomic-auto]]
- Added [[👁️Dashboard]]
- Added [[🎯GTD Command Center]]
- Added `CIS_TYPE.md`
- Added [[TODO]]
- Added [[CLAUDE]]
- Added [[CHANGELOG]]
- Added [[2026-02-10]]
- Added [[Research - Improving Note Surfacing]]
- Added [[⚡ Automation Menu]]
- Added [[🏠 Living Areas Tasks]]
- Added [[🏠 Kitchen Tasks]]
- Added [[🏠 Entry & Laundry Tasks]]
- Added [[🏠 Bedroom Tasks]]
- Added [[🏠 Bathroom Tasks]]
- Added [[MOC - Automation Command Center]]
- Added [[Automations via fastkey]]
---
# 10/02/26
- **Two-tier type system**: 10 full types + 11 lightweight types registered in `CIS_TYPE.md` + `Templater_script.js`
- Retyped notes: 3 dashboards, 1 system, 5 efforts (from task-category), 1 source (from research)
- Fixed 5 broken buttons in `02-Dots.md` (Person, Place, Tool, Concept, Idea)
- Added `Person` QuickAdd Template choice for `02-Dots/300-People`
- Added `🏡 Open Home` macro + hotkey `Ctrl+Shift+H`
- Added `Ctrl+Shift+G` (global graph) and `Ctrl+Shift+X` (extract selection) hotkeys
- Fixed tag formatting in `+Inbox/Automations via fastkey.md`
- Added newsletter workflow: `newsletter: true` frontmatter flag + `generate-newsletter.js` script
- Added `update-changelog.js` for one-click changelog drafting from vault changes
- Added `Query - Newsletter Queue.md` template for Dataview queue view
- Registered QuickAdd macros: 📰 Generate Newsletter, 📋 Update Changelog
- Added newsletter + changelog buttons to [[⚡ Automation Menu]]
- Updated `yaml-meta-config.json`: added `newsletter` to field order
# 21/02/26
- **Documentation Update — Reflecting Vault Optimization v2.0 changes**
- Updated [[🔢My PKM Metadata]] — fixed maturity emojis (`🌱seed` → `📤seed`, `🌿seedling` → `🌱seedling`), expanded status enum (+`⏸️paused`, `❌cancelled`, `⚠️blocked`), added validation & automation tools section (yaml_validator, maturity-promoter, metrics-core, query templates)
- Updated [[🙂Icon Reference & Color System]] — corrected maturity icons to canonical values, rewrote status indicators to match CIS_STATUS (8 values)
- Updated [[ℹ️My PKM Naming Convention]] — added query template naming pattern, documented full template folder structure (Queries, Calendar, Kanban, _Examples)
- Updated [[CLAUDE.md]] — added new scripts (maturity-evolve, generate-weekly-report, metrics-core enhancements), template subfolders, `deadline` → `due` convention, canonical maturity values
---
# 07/02/26
- **Vault Optimization v2.0 — Priority 1: Foundation Fixes**
- Standardized `deadline` → `due` across 6 notes, 3 queries, 2 config/doc files
- Normalized status values: 16 notes fixed (`active` → `🔄active`), removed OR fallbacks from 10+ queries
- Added try-catch error handling to all DataviewJS blocks (Dashboard 6, GTD 2, Review HQ 4, Gamification 9)
- Added query purpose documentation to all DataviewJS blocks
- Updated `yaml-meta-config.json`: removed `deadline` from field order and dateKeys
- Updated `Query - Active Projects.md` template: removed transition compatibility notes
- **Vault Optimization v2.0 — Priority 2: Query Optimization**
- Extended `metrics-core.js` with gamification functions (maturity counts, XP/level calc, daily streak)
- Rewrote `_Metrics Cache.md` to use Dataview inline fields (queryable via `dv.page()`)
- Updated `update-metrics-cache.js` to output inline field format instead of embedded JSON
- Created `Query - Weekly Stats.md` template (6th query template in library)
- Fixed maturity values in `Query - Maturity Distribution.md` (`🌱seed` → `📤seed`, `🌿seedling` → `🌱seedling`)
- Fixed `isActive` fallback patterns in `Query - Health Status.md`
- Fixed `status = "waiting"` OR fallback in Review HQ Waiting query
- Fixed maturity values in Review HQ config notes section
- Refactored 4 dashboards to use metrics cache with live fallback:
  - Dashboard: 6 DataviewJS blocks optimized
  - GTD Command Center: 2 DataviewJS blocks optimized
  - Review HQ: 1 DataviewJS block optimized (inbox/efforts from cache)
  - Gamification Dashboard: 4 DataviewJS blocks optimized (XP, achievements, progress, maturity)
- **Vault Optimization v2.0 — Priority 3: Automation Enhancement**
- Fixed maturity-promoter.js STAGES: `🌱seed` → `📤seed`, `🌿seedling` → `🌱seedling`
- Fixed yaml_validator.js atomic schema maturity values to canonical CIS values
- Added validation step 5b to yaml_orchestrator.js: tags notes with `#🧹tidy` when required fields missing
- Fixed Review HQ maturity promotion widget and "Notes Worth Promoting" query maturity values
- Enhanced Review HQ stale content tip callout with specific action suggestions
- Verified tag health monitoring and stale content alerts already integrated in Review HQ
- **Vault Optimization v2.0 — Priority 4: Advanced Features**
- Fixed Vault Analytics: maturity values (`🌱seed` → `📤seed`), removed status OR fallback patterns, added cache-first optimization to Vault Overview
- Added 🔗 Connection Suggestions section to Review HQ: "Recently Well-Connected" + "Least Connected Active Notes" widgets with Smart Connections integration
- Created `generate-weekly-report.js`: automated weekly report generator (QuickAdd script) outputting to `05-Calendar/Weekly/`
- Updated WIP Limits table in Review HQ with Connection Suggestions limits
- **🎉 Vault Optimization v2.0 — ALL 4 PRIORITIES COMPLETE**
---
# 03/02/26
- Added [[Prompt Meta-Skills Playbook]]
---
# 31/01/26
- Updated changelog with recent changes
- Added [[VAULT_REPORT-31-01-2026]] - comprehensive vault documentation
- Converted all 6 meta-skills to standard prompt template format
- Updated [[RELEASE NOTES]] with v1.7.0 and v1.8.0 documentation

---
# 24/01/26
- Upgraded Claude skills to Level 3 with advanced prompt engineering
- Added 17 Copilot custom prompts with structured output formats
- Implemented progressive disclosure patterns in AI prompts

---
# 23/01/26
- Added Claude AI skills for PKM workflows
- New prompts: Assess note maturity, Build mental model, Challenge this idea, Explain concept, Extract tasks, Find connections, Format as atomic, Synthesize knowledge

---
# 21/01/26
- **Major template refactoring complete**
- Removed legacy `Type/` folders (Option B cleanup)
- Added static fallback templates (no Templater required) in `Templates/Static/`
- New modular template architecture with separate Meta, Body, and Create templates

---
# 20/01/26
- Implemented Phase 1-2: Modular template architecture
- Phase 3-4: Updated QuickAdd macros to use new templates
- Phase 5-6: Validation and cleanup of deprecated templates
- Added comprehensive PKM template refactoring plan

---
# 19/01/26
- Fixed plugin settings - Auto-note Mover. "#" was missing in tags


---
# 16/01/26
- Added  [[🏠 Home Maintenance System]] 
	- Each room is in [[400-Places]]
	- Not happy with the amount of tags here.
- Added files from AI updated Origin_Starter PACK, like - [[🧭 Review HQ|Review Hub]], [[🎮Gamification Dashboard]], [[🎮Gamification Quick Reference]], [[🎮My PKM Gamification]], [[GTD Contexts Guide]], [[📍Note Classification Guide]] 
- [[MOC - Life Dashboard]] ... hmm maybe I will transfer from Main the MOCs later on
- Changed names to capitals for [[CHANGELOG]], [[RELEASE NOTES]], [[BACKLOG]]
# new-old

---
# 11/11/26
- Added/Fixed/Changed