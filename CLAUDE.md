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

## Architecture (Origin)
- **+Inbox:** Capture entry
- **00-Meta:** System docs, checklists, guides, gamification
- **01-MOCs:** Maps of Content (navigation hubs)
- **02-Dots:** Atomic knowledge (Ideas, Concepts, Statements, Things, People, Places)
- **03-Efforts:** Projects (On/, Ongoing/, Simmering/)
- **04-Sources:** External references (Knowledge, Media, Guides, Meetings)
- **05-Calendar:** Daily, Weekly, Monthly, Quarterly, Yearly notes
- **06-Archive:** Completed/inactive
- **07-Prompts:** Prompt Library (Active/, Drafts/, Archive/, 01-Docs/)
- **99-System:** Scripts, Config, CIS enums, FileClass, AI prompts
- **Templates:** 155 templates across 16 categories

## Key Scripts
| Script | Purpose |
|--------|---------|
| Templater_script.js | Core template engine; inject_meta_if_missing(), combine(), reset_* functions |
| yaml_orchestrator.js | YAML normalization/linting |
| smart-classifier.js | Auto-suggest note type/folder/tag |
| metrics-core.js | Vault health (inbox, stale notes, orphans) |
| generate-weekly-report.js | Weekly aggregation |
| maturity-promoter.js | Advance note maturity level |

## Quick Commands

### Common Operations
```bash
# Open vault in Obsidian
# Use Obsidian app -> Open folder as vault
# Location: C:\Users\MarcelMachanec\Documents\_Foundation for ORIGIN\Origin_DEV_STARTER_PACK\Origin-v1.9.1-Starter-Pack

# Find and list all scripts
ls 99-System/Scripts/*.js

# Check vault structure
ls -d */ | head -15
```

### Script Execution
**All scripts run within Obsidian via Templater or QuickAdd:**

| Operation | How to Execute | Notes |
|-----------|----------------|-------|
| **YAML normalization** | Templater command palette: "Templater: Open Insert Template Modal" → Select yaml_orchestrator | Creates backup in `_backups/normalize-snapshots/` |
| **Update metrics cache** | QuickAdd macro: "Update Metrics Cache" | Writes to `00-Meta/_Metrics Cache.md` |
| **Generate weekly report** | QuickAdd macro: "Generate Weekly Report" | Creates report in `05-Calendar/Weekly/` |
| **Validate YAML** | Templater user script: `yaml_validator.js` | Run via template or command palette |
| **Maturity promotion** | Templater user script: `maturity-promoter.js` | Suggests promotions in Review HQ |
| **Navigate to Home** | QuickAdd macro: "Open Home" | Opens `🏡Home.md` |
| **New full prompt** | Templates/Create/new-prompt.md via Templater | Full prompt with inputs/outputs/changelog |
| **New quick prompt** | Templates/Create/new-quick-prompt.md via Templater | Minimal prompt with single instruction block |
| **Browse prompts** | Open `07-Prompts/01-Docs/Prompt Dashboard NEW.md` | Overview of all prompts by status/category |

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

## Gotchas & Critical Patterns

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

