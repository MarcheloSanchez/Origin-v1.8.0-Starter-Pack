# Memory

## Me
Marchelo (@marcel.9991@seznam.cz), building Origin PKM vault as a **template for v2.0 migration**. Focus: optimizing workflows, documenting them clearly, and preparing for multi-vault deployments with different logic/functions.

## Current Projects
| Project | Goal | Status |
|---------|------|--------|
| **Origin v2.0** | Upgrade vault; document workflows; prep for multi-vault migrations; keep core adaptable | ✅ Complete — All 4 priorities implemented (2026-02-07) |
| **Calendar Review Hub** | Aggregate daily notes → weekly reports → monthly reviews → yearly reflections | Planning — Step-by-step docs needed |
| **Bases Daily View** | Add Bases view showing notes created today across vault | Planning — Mini task |

## Key Concepts
| Term | Meaning |
|------|---------|
| **Origin** | Obsidian PKM vault (v1.9.1 → v2.0); PARA-inspired 8-layer architecture; Czech language vault w/ English terms |
| **PARA** | Project, Area, Resource, Archive — foundational organization system |
| **Templater** | Core Obsidian plugin; JavaScript automation for note creation, metadata, workflows |
| **Dataview** | Query plugin; pulls data across vault (daily→weekly→monthly aggregation) |
| **FileClass** | Obsidian Bases database schema (atomic, effort, source, moc, meeting, prompt, etc.) |
| **CIS** | Custom Information System; 30+ enum definition files (CIS_STATUS.md, CIS_MATURITY.md) |
| **Metadata** | YAML frontmatter; enforced field order via yaml-meta-config.json |
| **v2.0 adaptability** | Core system should work for different vault scenarios (work-only, personal, mixed) without major refactoring |

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

## Key Scripts
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

## Quick Commands

### Common Operations
```bash
# Open vault in Obsidian
# Use Obsidian app -> Open folder as vault
# Location: C:\Users\MarcelMachanec\Documents\_Foundation for ORIGIN\Origin_DEV_STARTER_PACK\Origin-v1.9.1-Starter-Pack

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

### Script Execution
**All scripts run within Obsidian via Templater or QuickAdd:**

**Important conventions**:
- Use `due` (not `deadline`) — YAML Orchestrator auto-renames `deadline` → `due`
- Always use emoji-prefixed status values (e.g., `🔄active` not bare `active`)
- Maturity canonical values: `📤seed`, `🌱seedling`, `🪴sapling`, `🌲evergreen`, `🍓fruit`
- Notes missing required fields get auto-tagged `#🧹tidy` by YAML Orchestrator

### CIS (Custom Information System) — `99-System/CIS/`
30+ enum definition files named `CIS_{FIELD_NAME}.md` (e.g., `CIS_STATUS.md`, `CIS_MATURITY.md`). These feed Obsidian Bases field validation and UI dropdowns.

### Daily Workflow Commands
```markdown
1. Process Inbox (10 min)
   - Open +Inbox folder
   - For each note: Apply GTD decision tree (see 🔁My PKM Workflows.md)
   - Move to appropriate folder (02-Dots, 03-Efforts, 04-Sources, etc.)
   - Add metadata using templates

2. Update Daily Note
   - Periodic Notes plugin auto-creates at 6 AM
   - Or: Command palette → "Periodic Notes: Open Daily Note"

3. Check Dashboard
   - Open 👁️Dashboard.md for vault health metrics
   - Open 🎯GTD Command Center.md for tasks
```

### Validation & Maintenance
```markdown
# Check for YAML issues
- Run yaml_validator.js on notes with #🧹tidy tag
- Review validation errors in console

# Update metrics (refresh dashboard data)
- QuickAdd: "Update Metrics Cache"
- Check 00-Meta/_Metrics Cache.md for timestamp

# Archive completed items
- Set status: 📦archived
- Add archived_date: YYYY-MM-DD
- Move to 06-Archive/Completed or 06-Archive/Inactive
```

## Preferences
- Python coder (not a beginner) — ask clarifying questions before deep answers
- Learn via analogies when picking up new concepts
- Document everything; workflows should be replicable for future vault migrations
- Step-by-step guides for complex processes (Review Hub, Bases views)
- Czech vault, but work in English with Claude

- **Templates**: `{type}-meta.yaml.md`, `{type}-body.md`, `new-{type}.md`, `new-{type}-auto.md`, `Query - {Topic}.md`
- **Scripts**: descriptive kebab-case (`smart-classifier.js`, `yaml-orchestrator.js`)
- **CIS enums**: `CIS_{FIELD_NAME}.md` (SCREAMING_SNAKE_CASE)
- **YAML keys**: snake_case (`processing_priority`, `completion_percentage`)
- **Tags**: emoji + category (`💡atomic`, 🚀project`, `📚source`, `📥inbox`)
- **About files**: `+About {Section}ℹ️.md` pattern for folder documentation

### ⚠️ Critical Issues to Avoid

1. **Templater `combine()` Function**
   - ✅ **CORRECT**: `tR += await tp.user.combine(...)`
   - ❌ **WRONG**: `await tp.file.writeActive(tp.user.combine(...))`
   - **Why**: `combine()` returns content via `tR +=`. Direct `writeActive()` causes race conditions with Templater's own write operation
   - **Note**: Reset functions (`reset_*`) correctly use `writeActive()`

2. **Status Values - Canonical Forms**
   - ✅ **CORRECT**: `status: 🔄active`, `status: 📥inbox`, `status: ✅completed`
   - ❌ **WRONG**: `status: active`, `status: inbox` (missing emoji)
   - **Fixed by**: `yaml_orchestrator.js` with statusMap normalization
   - **All canonical values**: `📥inbox`, `🔄active`, `⏳waiting`, `✅completed`, `📦archived`, `❌cancel`, `⚠️blocked`

3. **Maturity Values - Common Mistake**
   - ✅ **CORRECT**: `maturity: 📤seed`
   - ❌ **WRONG**: `maturity: 🌱seed` (widespread in older files)
   - **All canonical values**: `📤seed`, `🌱seedling`, `🪴sapling`, `🌲evergreen`, `🍓fruit`

4. **Field Naming Conventions**
   - ✅ **CORRECT**: `due: YYYY-MM-DD`, `related: [[Note]]`
   - ❌ **WRONG**: `deadline: YYYY-MM-DD`, `relatedNotes: [[Note]]`
   - **Why**: Standardized across all templates and queries

5. **Cache Pattern (Performance)**
   - **How it works**: `00-Meta/_Metrics Cache.md` uses Dataview inline fields (`field:: value`)
   - **Dashboard usage**: `dv.page("00-Meta/_Metrics Cache").field_name` with live fallback
   - **Update**: Via QuickAdd macro "Update Metrics Cache"
   - **Why**: Reduces query load on dashboards; cached metrics refresh every 5 minutes or on-demand

6. **Two-Tier Type System**
   - **Full types (10)**: atomic, effort, source, moc, meeting, prompt, person, place, tool, area
     - These have: FileClass definitions + full templates + metadata schemas
     - **Prompt sub-tiers**: Full prompt (complete template with inputs/outputs/changelog) vs Quick prompt (minimal YAML + single instruction block)
   - **Lightweight types (11)**: system, dashboard, about, guide, tutorial, daily, weekly, monthly, quarterly, yearly, challenge
     - These have: CIS_TYPE + Templater_script only, NO FileClass/templates
   - **Why**: Reduces template bloat while maintaining type consistency

7. **`prompt_status` vs `status` Fields**
   - `status` = vault-wide lifecycle (`📥inbox`, `🔄active`, `📦archived`, etc.) — used for filtering/queries
   - `prompt_status` = prompt-specific lifecycle (`draft`, `active`, `winner`, `archived`) — tracks prompt maturity
   - Both fields coexist; `status` governs vault visibility, `prompt_status` governs prompt quality stage

8. **Windows File Path Issues**
   - **Issue**: Glob tool may miss vault files on Windows due to path handling
   - **Workaround**: Use `ls` via Bash as fallback for file discovery
   - **Example**: `ls 99-System/Scripts/*.js` instead of Glob pattern

9. **Review HQ Live Data Requirements**
   - **Issue**: Some queries need live data even with cache (overdue tasks, waiting items)
   - **Why**: These change throughout the day and can't be cached effectively
   - **Solution**: Review HQ uses mix of cached metrics + live queries for dynamic data

### 💡 Best Practices

- Always read files before editing (Edit tool requires prior Read)
- Use `replace_all: true` when updating config values that appear multiple times
- Run YAML orchestrator with backup before bulk updates
- Check metrics cache timestamp before trusting dashboard data
- Process inbox daily to keep under 20 items
- Use canonical emoji-prefixed status/maturity values in all new notes

## Common Workflows

### Inbox Processing (Daily, 10 min)
```markdown
1. Open +Inbox folder
2. For each note, ask GTD questions:
   - What is it? → Clarify
   - Actionable? → 03-Efforts or schedule task
   - Reference? → 04-Sources or 02-Dots/People/Places
   - Knowledge? → 02-Dots/Atomics
   - <2 minutes? → Do now
   - Still relevant? → If no, delete

3. Move note to target folder
4. Apply appropriate template metadata
5. Add 2-3 relevant links
6. Update related MOCs if needed
```

### Creating New Notes
```markdown
# Use templates based on note type:

Atomic/Concept → Templates/Core/atomic.md
Project → Templates/Core/effort.md
Source → Templates/Core/source.md
Person → Templates/Core/person.md
Meeting → Templates/Calendar/meeting.md
Daily Note → Periodic Notes plugin (auto-created)

# Quick capture to Inbox:
- Use QuickAdd macro: "Quick Capture - Inbox"
- Or: Templater hotkey for quick capture template
```

### Weekly Review (30 min)
```markdown
1. Generate weekly report
   - QuickAdd: "Generate Weekly Report"
   - Opens in 05-Calendar/Weekly/

2. Review active efforts
   - Open 🎯GTD Command Center.md
   - Update completion percentages
   - Set next_actions for each project
   - Archive completed items (status: 📦archived)

3. Process development tags
   - Find: #🧹tidy → Clean up metadata
   - Find: #❔question → Research or delete
   - Find: #🌱develop → Expand content

4. Run maintenance
   - Update metrics cache (QuickAdd macro)
   - Run YAML orchestrator on +Inbox
   - Check dashboard health scores
```

### Metrics Cache Update
```markdown
# When to update:
- Before checking Dashboard (if cache >5 min old)
- After bulk operations (archive, status changes)
- Before generating reports

# How to update:
1. QuickAdd: "Update Metrics Cache"
2. Check 00-Meta/_Metrics Cache.md for new timestamp
3. Verify metrics look correct (inbox_count, active_projects, etc.)

# What gets cached:
- inbox_count, active_projects, stale_projects, orphan_notes
- health_score, xp_total, level, streak_days
- notes_this_week, tasks_completed_week
```

### YAML Normalization
```markdown
# Run before major vault work:
1. Backup vault (just in case)
2. Templater: "Open Insert Template Modal"
3. Select: yaml_orchestrator
4. Review normalization changes
5. Check _backups/normalize-snapshots/ for automatic backup

# What it fixes:
- Status values → Canonical emoji-prefixed form
- Field order → Standardized per yaml-meta-config.json
- Missing required fields → Adds with defaults
- Validation → Step 5b runs yaml_validator.js
```

## Troubleshooting (Quick Reference)

### Common Fixes
- **Dataview undefined error**: Use optional chaining `p?.status === "🔄active"` and `?? 0` fallback
- **Dataview no results**: Check folder path has quotes (`"03-Efforts"`), verify canonical status values
- **Templater returns undefined**: Ensure function has `return` statement
- **combine() content disappears**: Use `tR += await tp.user.combine(...)` NOT `writeActive()`
- **Module not found**: Check `99-System/Scripts/` path, restart Obsidian after adding scripts
- **YAML invalid status**: Run YAML orchestrator to normalize
- **YAML field order wrong**: Run YAML orchestrator — reorders per `99-System/Config/yaml-meta-config.json`
- **Stale dashboard data**: Check cache timestamp in `00-Meta/_Metrics Cache.md`, run "Update Metrics Cache"
- **QuickAdd macro not found**: Restart Obsidian to refresh command palette
- **Broken wiki-link**: Check spelling/caps, don't include `.md` extension
- **Glob misses files (Windows)**: Use `ls` via Bash as fallback

### Emergency Recovery
1. Backup vault folder, disable all community plugins, re-enable one by one
2. YAML restore: check `_backups/normalize-snapshots/`
3. Obsidian won't open: rename `.obsidian` → `.obsidian_backup`, reopen, restore settings

## Performance (Quick Reference)

### Query Optimization
- Always use `LIMIT` clauses on large queries
- Combine `.where()` conditions into single pass (use `&&` not chained `.where()`)
- Use folder-specific queries: `dv.pages('"03-Efforts"')` not `dv.pages().where(p => p.type === "effort")`
- Use cache: `dv.page("00-Meta/_Metrics Cache").field` with live fallback
- Exclude system folders: filter out `99-System`, `Templates`, `_backups`

### Essential Plugins
Templater, Dataview, QuickAdd, Periodic Notes — keep enabled. Disable Smart Connections/Graph Analysis if slow.

### Monthly Maintenance
- Clear Dataview cache (Settings → Dataview → Refresh Index)
- Archive completed items, run YAML orchestrator, update plugins
- Check `.obsidian` folder size (<50MB healthy)

## Quick Lookup
→ Full glossary, people, projects: `memory/glossary.md`
→ Vault docs: `CLAUDE.md` in `/99-System/` (system architecture guide)
→ Workflows: `00-Meta/Documentation/PKM/🔁My PKM Workflows.md` (complete workflow guide)

