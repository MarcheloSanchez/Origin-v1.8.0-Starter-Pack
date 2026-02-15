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

9. **`prompt_status` vs `status` Fields**
   - `status` = vault-wide lifecycle (`📥inbox`, `🔄active`, `📦archived`, etc.) — used for filtering/queries
   - `prompt_status` = prompt-specific lifecycle (`draft`, `active`, `winner`, `archived`) — tracks prompt maturity
   - Both fields coexist; `status` governs vault visibility, `prompt_status` governs prompt quality stage

7. **Windows File Path Issues**
   - **Issue**: Glob tool may miss vault files on Windows due to path handling
   - **Workaround**: Use `ls` via Bash as fallback for file discovery
   - **Example**: `ls 99-System/Scripts/*.js` instead of Glob pattern

8. **Review HQ Live Data Requirements**
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

## Troubleshooting

### Common Errors & Solutions

#### 1. Dataview Query Errors

**Error**: `Evaluation Error: TypeError: Cannot read properties of undefined`

**Causes & Solutions**:
```javascript
// ❌ PROBLEM: Field doesn't exist on all pages
const count = dv.pages('"03-Efforts"').where(p => p.status === "active").length;

// ✅ SOLUTION: Add null checks
const count = dv.pages('"03-Efforts"')
  .where(p => p.status && p.status === "🔄active")
  .length ?? 0;

// ✅ BETTER: Use optional chaining
const count = dv.pages('"03-Efforts"')
  .where(p => p?.status === "🔄active")
  .length ?? 0;
```

**Error**: `Dataview: Query returned no results`

**Solutions**:
- Check folder path uses quotes: `"03-Efforts"` not `03-Efforts`
- Verify status values match canonical forms: `🔄active` not `active`
- Check file actually has frontmatter YAML
- Try: `dv.pages().where(p => p.file.path.includes("03-Efforts"))`

---

#### 2. Templater Script Failures

**Error**: `Templater Error: user script returned undefined`

**Common Causes**:
```javascript
// ❌ PROBLEM: Function doesn't return anything
function myFunction(tp) {
  const result = "some value";
  // Missing return statement!
}

// ✅ SOLUTION: Always return a value
function myFunction(tp) {
  const result = "some value";
  return result;
}
```

**Error**: `combine() not working / content disappears`

**Solution**: See Gotchas section - use `tR += await tp.user.combine(...)` NOT `writeActive()`

**Error**: `Cannot find module 'metrics-core.js'`

**Solutions**:
- Check file exists: `ls 99-System/Scripts/metrics-core.js`
- Verify Templater user scripts folder setting points to `99-System/Scripts/`
- Restart Obsidian after adding new user scripts
- Check script has `module.exports = {...}` at the end

---

#### 3. YAML Validation Errors

**Error**: `Invalid status value: active`

**Solution**: Run YAML orchestrator to normalize to `🔄active`

**Error**: `Missing required field: title`

**Solutions**:
```yaml
# ❌ PROBLEM: No title field
---
type: atomic
status: 🔄active
---

# ✅ SOLUTION: Add title field (use H1 or explicit field)
---
title: "Note Title"
type: atomic
status: 🔄active
---
```

**Error**: `Field order incorrect`

**Solution**:
- Run YAML orchestrator - it reorders fields per `99-System/Config/yaml-meta-config.json`
- Automatic backup created in `_backups/normalize-snapshots/`

---

#### 4. Metrics Cache Issues

**Problem**: Dashboard shows old/stale data

**Solutions**:
1. Check cache timestamp: Open `00-Meta/_Metrics Cache.md` - look for `updated` field
2. Manually update: QuickAdd macro "Update Metrics Cache"
3. If cache seems stuck: Delete `_Metrics Cache.md` and regenerate
4. Check for DataviewJS errors in console (Ctrl+Shift+I)

**Problem**: Cache update fails silently

**Debug Steps**:
```markdown
1. Open Developer Console (Ctrl+Shift+I)
2. Run QuickAdd macro "Update Metrics Cache"
3. Check console for errors
4. Common issues:
   - Dataview plugin not enabled
   - update-metrics-cache.js has syntax error
   - File permissions issue (rare on Windows)
```

---

#### 5. Performance Problems

**Symptom**: Obsidian slow to open/sluggish

**Quick Fixes**:
- Disable unused plugins (Settings → Community Plugins)
- Clear Dataview cache: Settings → Dataview → "Refresh Index"
- Reduce auto-refresh frequency on dashboards
- Close unnecessary panes/tabs

**Symptom**: Specific dashboard loads slowly

**Solutions**:
- Check for queries without LIMIT clauses: Add `LIMIT 50` to large queries
- Use cached metrics instead of live queries where possible
- Avoid nested WHERE clauses - combine conditions with AND
- Profile query: Add `console.time("query-name")` before query, `console.timeEnd("query-name")` after

---

#### 6. QuickAdd Macro Errors

**Error**: `Macro not found` or `Command not available`

**Solutions**:
- Verify QuickAdd plugin is enabled
- Check Settings → QuickAdd → Manage Macros - verify macro exists
- Restart Obsidian to refresh command palette
- Re-add macro if missing (import from backup or recreate)

**Error**: Script runs but produces no output

**Debug**:
```javascript
// Add console logging to QuickAdd scripts
console.log("Starting macro...");
console.log("Variable value:", someVariable);
// Check console (Ctrl+Shift+I) for output
```

---

#### 7. Link/File Issues

**Problem**: `[[Note Name]]` shows as broken link but file exists

**Solutions**:
- Check exact spelling and capitalization
- Verify file extension not included: `[[Note]]` not `[[Note.md]]`
- Check for special characters in filename
- Try relative path: `[[02-Dots/Note]]`
- Rebuild index: Settings → Files & Links → "Reindex vault"

**Problem**: Cannot find file with Glob tool (Windows)

**Workaround**: Use Bash instead:
```bash
# Instead of Glob pattern
find . -name "filename.md"

# Or use ls with wildcards
ls 02-Dots/**/*.md
```

---

#### 8. Template Issues

**Problem**: Template inserts blank content

**Causes**:
- Templater plugin not enabled
- Template contains syntax error
- User script referenced in template has error

**Debug Steps**:
1. Open template file directly
2. Look for `<% %>` or `<%* %>` syntax errors
3. Check console for JavaScript errors
4. Test template on new blank note

**Problem**: Metadata not injecting correctly

**Check**:
```javascript
// Verify function exists and returns value
module.exports = {
  inject_meta_if_missing: function(tp, type, ...args) {
    console.log("Injecting meta for type:", type);
    // ... rest of function
    return result; // Make sure this returns something!
  }
}
```

---

### Emergency Recovery

**If vault becomes corrupted or unstable:**

```markdown
1. Backup entire vault folder (copy to safe location)
2. Check .obsidian folder integrity
3. Disable all community plugins
4. Re-enable plugins one by one to find culprit
5. Check recent changes in Git (if using version control)
6. Restore from YAML orchestrator snapshot if needed:
   - Location: _backups/normalize-snapshots/
   - Contains pre-normalization YAML frontmatter
```

**If Obsidian won't open:**

```markdown
1. Navigate to vault folder in file explorer
2. Rename .obsidian folder to .obsidian_backup
3. Open vault in Obsidian (creates fresh .obsidian)
4. Restore settings from .obsidian_backup as needed
```

## Performance Optimization

### Query Optimization Strategies

#### 1. Use LIMIT Clauses
```dataview
# ❌ SLOW: Returns all notes, then processes
TABLE status, due
FROM "03-Efforts"
WHERE status = "🔄active"
SORT due ASC

# ✅ FAST: Limits results early
TABLE status, due
FROM "03-Efforts"
WHERE status = "🔄active"
SORT due ASC
LIMIT 20
```

#### 2. Optimize WHERE Clauses
```javascript
// ❌ SLOW: Multiple passes through data
const results = dv.pages('"03-Efforts"')
  .where(p => p.status === "🔄active")
  .where(p => p.priority === "high")
  .where(p => p.due);

// ✅ FAST: Single pass with combined conditions
const results = dv.pages('"03-Efforts"')
  .where(p =>
    p.status === "🔄active" &&
    p.priority === "high" &&
    p.due
  );
```

#### 3. Use Cache for Heavy Calculations
```javascript
// ❌ SLOW: Calculate on every dashboard load
const healthScore = calculateComplexHealthScore(dv.pages());

// ✅ FAST: Read from cache, fallback to live
const cache = dv.page("00-Meta/_Metrics Cache");
const healthScore = cache?.health_score ?? calculateComplexHealthScore(dv.pages());
```

#### 4. Avoid Nested Queries
```javascript
// ❌ SLOW: Query for each project
for (let project of dv.pages('"03-Efforts"')) {
  const relatedNotes = dv.pages().where(p =>
    p.file.outlinks.includes(project.file.link)
  );
}

// ✅ FAST: Single query with groupBy
const allPages = dv.pages();
const grouped = allPages.groupBy(p => /* grouping logic */);
```

---

### Large Vault Optimization

#### Current Vault Size: ~405 notes
**These tips become critical at 1000+ notes:**

#### 1. Folder-Specific Queries
```javascript
// ❌ SLOW: Scans entire vault
const efforts = dv.pages().where(p => p.type === "effort");

// ✅ FAST: Scans only specific folder
const efforts = dv.pages('"03-Efforts"');
```

#### 2. Exclude System Folders
```javascript
// ✅ GOOD: Exclude Templates and System from queries
const content = dv.pages()
  .where(p =>
    !p.file.path.includes("99-System") &&
    !p.file.path.includes("Templates") &&
    !p.file.path.includes("_backups")
  );
```

#### 3. Use Dataview Indexes Efficiently
```markdown
Settings → Dataview → Performance Settings:
- ✅ Enable JavaScript Queries (needed for DataviewJS)
- ✅ Enable Inline Queries
- ⚠️ Refresh Interval: 2500ms (default) or higher for large vaults
- ✅ Render Null As: "-" (cleaner display)
```

---

### Plugin Management

#### Essential Plugins (Keep Enabled)
- Templater - Core automation
- Dataview - Query engine
- QuickAdd - Quick capture
- Periodic Notes - Calendar system

#### Optional (Disable if not using)
- Kanban - Only if using kanban boards
- Advanced URI - Only if using external automation
- Plugin Update Tracker - Enable weekly, disable after checking

#### Performance Impact by Plugin
```markdown
High Impact (disable if slow):
- Smart Connections (if enabled)
- Graph Analysis
- Advanced Slides

Medium Impact:
- Dataview (but required)
- Templater (but required)

Low Impact:
- QuickAdd
- Periodic Notes
- Style Settings
```

---

### File Organization Best Practices

#### 1. Keep Attachments Organized
```markdown
Recommended structure:
99-System/Attachments/
├── Images/
├── PDFs/
├── Videos/
└── Other/

Settings → Files & Links:
- Default location: "In subfolder under current folder"
- Subfolder name: "_attachments"
```

#### 2. Archive Aggressively
```markdown
Move to 06-Archive if:
- Status: 📦archived AND no edits in 90+ days
- No incoming links AND created >6 months ago
- Temporary/experimental notes that failed

Benefits:
- Faster queries (exclude 06-Archive)
- Cleaner graph view
- Better search relevance
```

#### 3. Use Daily Note Compression
```markdown
Instead of keeping all daily notes:
- Keep last 30 days in 05-Calendar/Daily/
- Compress monthly to weekly summaries
- Archive yearly summaries only
- Delete routine/trivial dailies after compression

Reduces note count from ~365/year to ~52/year
```

---

### Dataview Cache Management

#### Understanding the Cache
```markdown
Location: .obsidian/plugins/dataview/

What it stores:
- Indexed metadata from all notes
- Link relationships
- Task locations
- File modification times

When to clear:
- After bulk YAML changes
- If queries return stale data
- After major file reorganization
- If Dataview errors persist

How to clear:
Settings → Dataview → Clear Cache & Refresh Index
```

---

### Monitoring Performance

#### Key Metrics to Watch
```markdown
1. Vault Size
   - Total notes: <1000 = great, 1000-5000 = good, >5000 = optimize
   - Attachments: <500MB = great, 500MB-2GB = good, >2GB = archive old files

2. Query Performance
   - Dashboard load: <2 seconds = great, 2-5s = acceptable, >5s = optimize
   - Graph view: <3 seconds = great, >10s = reduce connections

3. Startup Time
   - <5 seconds = great
   - 5-15 seconds = acceptable
   - >15 seconds = disable plugins or reduce plugin count

4. Memory Usage
   - Task Manager → Obsidian process
   - <500MB = great, 500MB-1GB = acceptable, >1GB = investigate
```

#### Performance Dashboard Query
```dataviewjs
const totalNotes = dv.pages().length;
const totalAttachments = dv.pages().where(p =>
  p.file.path.includes("Attachments") ||
  p.file.ext !== "md"
).length;
const avgLinksPerNote = dv.pages()
  .map(p => p.file.outlinks.length)
  .reduce((sum, val) => sum + val, 0) / totalNotes;

dv.header(3, "📊 Vault Performance Metrics");
dv.table(
  ["Metric", "Value", "Status"],
  [
    ["Total Notes", totalNotes, totalNotes < 1000 ? "🟢" : "🟡"],
    ["Avg Links/Note", avgLinksPerNote.toFixed(1), avgLinksPerNote > 3 ? "🟢" : "🟡"],
    ["Total Attachments", totalAttachments, totalAttachments < 200 ? "🟢" : "🟡"]
  ]
);
```

---

### Performance Checklist

**Run this monthly for optimal performance:**

- [ ] Clear Dataview cache and refresh index
- [ ] Archive completed items from last quarter
- [ ] Review and disable unused plugins
- [ ] Check for orphaned attachments (`![[image.png]]` with no matches)
- [ ] Run YAML orchestrator to normalize metadata
- [ ] Backup vault to external location
- [ ] Update plugins (check for performance improvements)
- [ ] Review slow dashboards (add LIMIT clauses if needed)
- [ ] Check .obsidian folder size (<50MB is healthy)
- [ ] Clear browser cache in Obsidian (Ctrl+Shift+R on dashboard pages)

## Quick Lookup
→ Full glossary, people, projects: `memory/glossary.md`
→ Vault docs: `CLAUDE.md` in `/99-System/` (system architecture guide)
→ Workflows: `00-Meta/Documentation/PKM/🔁My PKM Workflows.md` (complete workflow guide)

