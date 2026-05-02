---
title: "📘 Setup Guide: Automated Reports & Export System"
type: guide
status: 🔄active
created: 2025-12-31
tags:
  - 📊report
  - 🔧setup
  - 📤export
  - 🎯practical
priority: high
modified: 2026-03-03
---

⬆️:: [[README]]

> **Purpose**: Set up automated weekly/monthly reports with one-click PDF/Markdown export. No AI, no complexity—just data collection and export.

---

# 🎯 What This System Does

## Weekly Reports (Every Sunday)
- ✅ All notes created this week
- ✅ Tasks completed
- ✅ Project status
- ✅ Focus areas (tags, themes)
- ✅ Maintenance items (missing metadata, stale projects)
- ✅ **Export to PDF in 1 click**

## Monthly Reports (End of Month)
- ✅ Executive summary (metrics, trends)
- ✅ Content creation breakdown
- ✅ Task/project completion
- ✅ Knowledge development (ideas → evergreen)
- ✅ Tag analytics
- ✅ Vault health check
- ✅ **Export to PDF in 1 click**

---

# 🛠️ Setup (30 Minutes)

## Prerequisites

**Required Plugins:**
- ✅ **Dataview** (for queries)
- ✅ **Templater** (for automation)
- ✅ **Periodic Notes** (for scheduling)

**Optional (for export):**
- ✅ **Obsidian Pandoc Plugin** (best for PDF export)
- OR **Better Export PDF** (simpler, no dependencies)
- OR **Webpage HTML Export** (for HTML export)

---

## Step 1: Install Required Plugins

### 1.1 Dataview
```
Settings → Community Plugins → Browse → Search "Dataview"
Install → Enable
Settings → Dataview → Enable JavaScript Queries: ON
```

### 1.2 Templater
```
Settings → Community Plugins → Browse → Search "Templater"
Install → Enable
Settings → Templater → Template folder location: "Templates"
Settings → Templater → Trigger on new file creation: ON
```

### 1.3 Periodic Notes
```
Settings → Community Plugins → Browse → Search "Periodic Notes"
Install → Enable
Settings → Periodic Notes → Enable Weekly Notes: ON
Settings → Periodic Notes → Enable Monthly Notes: ON
```

---

## Step 2: Configure Templates

### 2.1 Set Weekly Report Template

```
Settings → Periodic Notes → Weekly Notes
Format: YYYY-[W]ww
Template: Templates/Template - Weekly Report.md
Folder: 05-Calendar/Reviews/Weekly
```

**Test it:**
- Press `Ctrl+P` → "Periodic Notes: Open Weekly Note"
- Should create report for current week

### 2.2 Set Monthly Report Template

```
Settings → Periodic Notes → Monthly Notes
Format: YYYY-MM
Template: Templates/Template - Monthly Report.md
Folder: 05-Calendar/Reviews/Monthly
```

**Test it:**
- Press `Ctrl+P` → "Periodic Notes: Open Monthly Note"
- Should create report for current month

---

## Step 3: Create Folder Structure

```
05-Calendar/
├── Reviews/
│   ├── Weekly/
│   │   ├── 2025-W01.md
│   │   ├── 2025-W02.md
│   │   └── ...
│   ├── Monthly/
│   │   ├── 2025-01.md
│   │   ├── 2025-02.md
│   │   └── ...
│   └── Yearly/
│       └── 2025.md
```

**Create folders:**
```bash
# Via File Explorer or Terminal
mkdir -p "05-Calendar/Reviews/Weekly"
mkdir -p "05-Calendar/Reviews/Monthly"
mkdir -p "05-Calendar/Reviews/Yearly"
```

---

## Step 4: Set Up Hotkeys (Optional)

```
Settings → Hotkeys → Search for:
- "Periodic Notes: Open Weekly Note" → Ctrl+Shift+W
- "Periodic Notes: Open Monthly Note" → Ctrl+Shift+M
- "Export to PDF" (if using Pandoc) → Ctrl+Shift+E
```

---

# 📤 Export Setup

## Option A: Pandoc Plugin (Best Quality, Requires Setup)

### Install Pandoc (One-Time)

**Windows:**
```powershell
# Via Chocolatey
choco install pandoc

# Or download installer
# https://pandoc.org/installing.html
```

**Mac:**
```bash
brew install pandoc
brew install basictex  # For LaTeX PDF support
```

**Linux:**
```bash
sudo apt install pandoc texlive
```

### Install Obsidian Plugin

```
Settings → Community Plugins → Browse → "Pandoc Plugin"
Install → Enable
Settings → Pandoc Plugin → Pandoc path: (auto-detected)
```

### Export Settings

```
Settings → Pandoc Plugin → Export Settings
Output format: PDF
Template: Default
Standalone: ON
Include metadata: ON
```

### Usage

```
1. Open Weekly/Monthly Report
2. Ctrl+P → "Pandoc Plugin: Export as PDF"
3. Choose save location
4. PDF generated in 5-10 seconds
```

---

## Option B: Better Export PDF (Simpler, No Dependencies)

### Install Plugin

```
Settings → Community Plugins → Browse → "Better Export PDF"
Install → Enable
```

### Configure

```
Settings → Better Export PDF
Page size: A4
Orientation: Portrait
Include metadata: ON
Add header/footer: Optional
CSS: Default
```

### Usage

```
1. Open Weekly/Monthly Report
2. Ctrl+P → "Better Export PDF"
3. PDF generated instantly (uses browser print engine)
```

**Pros**: Zero dependencies, fast
**Cons**: Dataview queries might not render (shows query code instead)

---

## Option C: HTML Export (Most Compatible)

### Install Plugin

```
Settings → Community Plugins → Browse → "Webpage HTML Export"
Install → Enable
```

### Usage

```
1. Open Weekly/Monthly Report
2. Ctrl+P → "Export to HTML"
3. Open HTML in browser
4. Print to PDF (Ctrl+P → Save as PDF)
```

**Pros**: Dataview renders perfectly, can edit HTML before PDF
**Cons**: Two-step process (HTML → PDF)

---

# 🤖 Automation Options

## Option 1: Manual Trigger (Recommended for You)

**Every Sunday evening:**
1. `Ctrl+Shift+W` → Generate weekly report
2. Review report (5 min)
3. Add manual notes (achievements, challenges)
4. `Ctrl+Shift+E` → Export to PDF
5. Save to archive folder (e.g., `_Exports/2025/`)

**End of month:**
1. `Ctrl+Shift+M` → Generate monthly report
2. Review all weekly reports
3. Add monthly reflection
4. Export to PDF
5. Archive

**Total time**: 10 min/week, 30 min/month

---

## Option 2: Scheduled Automation (Advanced)

### Windows Task Scheduler

**Create task to auto-generate reports:**

```powershell
# Script: generate_weekly_report.ps1

$vaultPath = "C:\Users\YourName\Documents\ObsidianVault"
$templatePath = "$vaultPath\Templates\Template - Weekly Report.md"
$outputPath = "$vaultPath\05-Calendar\Reviews\Weekly"

# Get current week number
$weekNum = (Get-Date).ToString("yyyy-'W'ww")
$fileName = "$weekNum.md"

# Copy template to output (Templater will process on open)
Copy-Item $templatePath "$outputPath\$fileName"

Write-Host "Weekly report created: $fileName"
```

**Schedule:**
```
Task Scheduler → Create Basic Task
Name: "Obsidian Weekly Report"
Trigger: Weekly, Sunday, 8:00 PM
Action: Start PowerShell script (generate_weekly_report.ps1)
```

**Note**: This just creates the file. You still need to open it in Obsidian for Templater to process.

---

## Option 3: Obsidian URI Automation (Cross-Platform)

### Install Advanced URI Plugin

```
Settings → Community Plugins → Browse → "Advanced URI"
Install → Enable
```

### Create Desktop Shortcut

**Windows:**
```
Create shortcut with target:
obsidian://advanced-uri?vault=YourVaultName&commandid=periodic-notes%3Aopen-weekly-note
```

**Mac:**
```
Create Automator app:
- New Document → Application
- Add "Run Shell Script"
- Paste: open "obsidian://advanced-uri?vault=YourVaultName&commandid=periodic-notes%3Aopen-weekly-note"
- Save as "Generate Weekly Report.app"
```

**Double-click icon** → Weekly report opens automatically.

---

# 📊 Customizing Reports

## Adding Custom Queries

### Example: Top 10 Most Modified Notes

Add to template:
```markdown
### Most Modified Notes This Week

\```dataview
TABLE
  file.mtime as "Last Modified",
  type as "Type",
  status as "Status"
FROM ""
WHERE file.mtime >= date(<% tp.date.now("YYYY-MM-DD", -7) %>)
SORT file.mtime DESC
LIMIT 10
\```
```

### Example: Health Metrics (if tracking)

```markdown
### Health Tracking

\```dataview
TABLE
  steps as "Steps",
  sleep_hours as "Sleep",
  mood as "Mood"
FROM "02-Dots/Health"
WHERE created >= date(<% tp.date.now("YYYY-MM-DD", -7) %>)
SORT created DESC
\```
```

### Example: Reading Progress

```markdown
### Books Read This Month

\```dataview
TABLE
  author as "Author",
  status as "Status",
  rating as "Rating"
FROM "04-Sources/Books"
WHERE status = "✅completed"
  AND file.mtime >= date(<% tp.date.now("YYYY-MM-01") %>)
SORT file.mtime DESC
\```
```

---

## Removing Sections You Don't Need

**Don't use Sources?** Delete this section:
```markdown
## 📚 Sources Added This Week
...
```

**Don't track maturity?** Remove:
```markdown
### Notes by Maturity
...
```

**Keep it minimal**: Only include what you actually review.

---

# 🎨 Styling for Export

## Option 1: Custom CSS Snippet

Create: `.obsidian/snippets/report-export.css`

```css
/* Report Export Styling */

/* Hide Dataview query code when exporting */
.block-language-dataview {
  display: none !important;
}

/* Show only rendered Dataview results */
.dataview.table-view-table {
  display: table !important;
}

/* Better table styling */
table {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
}

th {
  background-color: #f0f0f0;
  font-weight: bold;
  padding: 8px;
  border: 1px solid #ddd;
}

td {
  padding: 6px;
  border: 1px solid #ddd;
}

/* Header styling */
h1 {
  color: #2c3e50;
  border-bottom: 3px solid #3498db;
  padding-bottom: 0.3em;
}

h2 {
  color: #34495e;
  border-bottom: 2px solid #95a5a6;
  padding-bottom: 0.2em;
  margin-top: 1.5em;
}

/* Emoji alignment */
h1::before, h2::before {
  margin-right: 0.3em;
}

/* Page breaks for PDF */
@media print {
  h1 {
    page-break-before: always;
  }
  h1:first-of-type {
    page-break-before: avoid;
  }
}
```

**Enable:**
```
Settings → Appearance → CSS Snippets → Enable "report-export"
```

---

## Option 2: Pandoc Template (Advanced)

Create custom LaTeX template for professional PDFs.

**Location**: `.pandoc/templates/report-template.latex`

*(Full template code available in Pandoc documentation)*

---

# 📁 Export Organization

## Recommended Structure

```
_Exports/
├── Weekly/
│   ├── 2025/
│   │   ├── 2025-W01 Report.pdf
│   │   ├── 2025-W02 Report.pdf
│   │   └── ...
│   └── 2024/
├── Monthly/
│   ├── 2025/
│   │   ├── 2025-01 Report.pdf
│   │   ├── 2025-02 Report.pdf
│   │   └── ...
│   └── 2024/
└── Yearly/
    ├── 2025 Report.pdf
    └── 2024 Report.pdf
```

**Keep outside vault** (don't clutter Obsidian with PDFs):
```
C:\Users\YourName\Documents\Obsidian Reports\
```

---

# 🔧 Troubleshooting

## Issue: Dataview Queries Don't Render

**Cause**: Dataview plugin disabled or queries have syntax errors

**Fix:**
```
1. Settings → Dataview → Enable JavaScript Queries: ON
2. Check query syntax (missing quotes, wrong field names)
3. Reload Obsidian (Ctrl+R)
```

---

## Issue: Templater Variables Show Raw Code

**Cause**: Templater didn't process the template

**Fix:**
```
1. Settings → Templater → Trigger on new file creation: ON
2. Manually trigger: Ctrl+P → "Templater: Replace templates in active file"
```

---

## Issue: PDF Export Shows Query Code, Not Results

**Cause**: Dataview renders dynamically (not in static export)

**Fix (Option A - Better Export PDF):**
```
1. Wait for all Dataview queries to load
2. Then export to PDF (it captures rendered state)
```

**Fix (Option B - Pandoc):**
```
1. Use "Webpage HTML Export" first
2. Open HTML (Dataview renders in browser)
3. Print to PDF from browser
```

---

## Issue: Dates Are Wrong in Report

**Cause**: Templater date offset calculation

**Fix:**
```markdown
<!-- For "last 7 days", use: -->
<% tp.date.now("YYYY-MM-DD", -7) %>

<!-- For "start of this month", use: -->
<% tp.date.now("YYYY-MM-01") %>

<!-- For "today", use: -->
<% tp.date.now("YYYY-MM-DD") %>
```

---

## Issue: Too Much Data (Report is 50+ Pages)

**Cause**: Vault has thousands of notes

**Fix:**
```markdown
<!-- Add LIMIT to queries -->

\```dataview
...
LIMIT 20  <!-- Only show top 20 -->
\```

<!-- Or filter by folder -->

FROM "02-Dots" OR "03-Efforts"
WHERE ...
```

---

# 📋 Weekly Workflow (5-Minute Routine)

## Every Sunday, 8:00 PM

**Step 1: Generate Report (30 seconds)**
```
Ctrl+Shift+W (or click Periodic Notes icon)
```

**Step 2: Wait for Queries to Load (30 seconds)**
```
Dataview will populate all tables (you'll see loading → data)
```

**Step 3: Review & Annotate (3 minutes)**
```
Read through:
- Notes created (anything surprising?)
- Tasks completed (proud of progress?)
- Stale projects (need attention?)

Add manual notes:
### Highlights
- Shipped feature X
- Had breakthrough on Y idea

### Challenges
- Struggled with Z
```

**Step 4: Export (1 minute)**
```
Ctrl+Shift+E → Export to PDF
Save to: C:\Users\YourName\Documents\Obsidian Reports\Weekly\2025\
```

**Total time**: 5 minutes. Done.

---

# 📋 Monthly Workflow (20-Minute Routine)

## Last Day of Month

**Step 1: Generate Monthly Report (1 minute)**
```
Ctrl+Shift+M
Wait for all Dataview queries to load
```

**Step 2: Review Weekly Reports (10 minutes)**
```
Open all weekly reports from this month:
- [[Weekly Report - Week 01]]
- [[Weekly Report - Week 02]]
- etc.

Extract patterns:
- What themes recurred?
- What projects progressed?
- What's been neglected?
```

**Step 3: Add Monthly Reflection (5 minutes)**
```
### Achievements This Month
- [3-5 bullet points]

### Challenges Faced
- [2-3 bullet points]

### Key Learnings
- [2-3 bullet points]

### Next Month Goals
- [ ] Goal 1
- [ ] Goal 2
- [ ] Goal 3
```

**Step 4: Export & Archive (4 minutes)**
```
Export to PDF
Save to: _Exports/Monthly/2025/
Backup to cloud (Google Drive, Dropbox, etc.)
```

**Total time**: 20 minutes/month. Worth it.

---

# 🎯 What This Gives You

## Concrete Benefits

✅ **Accountability**: See exactly what you accomplished each week/month
✅ **Pattern Recognition**: Notice recurring themes, stale projects, focus shifts
✅ **Archive**: PDF exports = permanent record (even if vault corrupts)
✅ **Clarity**: Data-driven reflection (not just "I feel like I worked hard")
✅ **Maintenance**: Automated health checks (missing metadata, orphan notes, etc.)

## What You DON'T Need

❌ AI auto-tagging (manual tagging works fine with 3,000 notes)
❌ Voice capture (you already capture notes effectively)
❌ Semantic search (Obsidian search + Dataview is enough)
❌ Local LLM (ChatGPT API for occasional summaries = $5/month)
❌ Complex automation (weekly habit > perfect system)

---

# 🚀 Next Steps

## Week 1: Setup
- [ ] Install required plugins (Dataview, Templater, Periodic Notes)
- [ ] Configure templates (Weekly, Monthly)
- [ ] Create folder structure
- [ ] Generate first weekly report manually
- [ ] Test PDF export

## Week 2-4: Refinement
- [ ] Use system for 3 weeks
- [ ] Identify which sections you actually read
- [ ] Remove sections you skip
- [ ] Add custom queries for your specific tracking needs
- [ ] Optimize for 5-minute weekly, 20-minute monthly routine

## Month 2+: Production Mode
- [ ] System runs on autopilot
- [ ] Weekly reports = 5 min habit
- [ ] Monthly reports = 20 min reflection
- [ ] Quarterly: Review trends across months
- [ ] Yearly: Synthesize entire year (create Yearly Report template)

---

# 📊 Success Metrics

## After 1 Month
- ✅ 4 weekly reports generated
- ✅ 1 monthly report generated
- ✅ All reports exported to PDF
- ✅ Weekly routine takes < 10 minutes
- ✅ You actually review the reports (not just generate them)

## After 3 Months
- ✅ 12 weekly reports
- ✅ 3 monthly reports
- ✅ Identified 2-3 recurring patterns (e.g., "I always neglect health tracking")
- ✅ Made 1+ system improvement based on data (e.g., archived 10 stale projects)
- ✅ Feels effortless (habit, not chore)

## After 1 Year
- ✅ 52 weekly reports
- ✅ 12 monthly reports
- ✅ 1 yearly report (synthesizes entire year)
- ✅ PDF archive of entire year's work
- ✅ **Clear evidence of your knowledge journey** (not just a feeling)

---

# 🔗 Resources

**Dataview Documentation:**
https://blacksmithgu.github.io/obsidian-dataview/

**Templater Documentation:**
https://silentvoid13.github.io/Templater/

**Pandoc User Guide:**
https://pandoc.org/MANUAL.html

**Periodic Notes Plugin:**
https://github.com/liamcain/obsidian-periodic-notes

---

**Questions? Stuck?**
- Check [[README#Troubleshooting]]
- Obsidian Discord: #dataview or #templater channels
- Reddit: r/ObsidianMD

---

⬇️:: [[README]] | [[🗺️ROADMAP - Origin v2.0 Lifetime Vault]]

*Last updated: 2025-12-31*
*Status: ✅ Production-ready*
*Estimated setup time: 30 minutes, then 5 min/week maintenance*
