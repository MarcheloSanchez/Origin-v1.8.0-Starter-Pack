---
title: "Calendar Period Architecture Setup"
type: guide
tags:
  - 📅calendar
  - 🛠️setup
  - 📋automation
status: 🔄active
created: 2026-01-14
modified: 2026-03-03
---

⬆️:: [[05-Calendar]]

# 📅 Calendar Period Architecture Setup Guide

This guide helps you set up the complete Calendar Period Architecture—the connective tissue that makes all of Origin's systems work together.

> [!warning]+ **What This Solves**
> The calendar architecture transforms Origin from "collection of templates" into a "living operational system" by:
> - Creating a rhythm (daily → weekly → monthly → quarterly → yearly)
> - Automating review triggers
> - Connecting all systems together
> - Enabling data cascade from experience → patterns → strategy

---

## 🎯 The Problem This Solves

Currently:
- ❌ Daily notes exist but don't flow anywhere
- ❌ Weekly reviews happen sometimes, not systematically
- ❌ Monthly/quarterly/yearly folders are missing
- ❌ No automated triggers for reviews
- ❌ Systems are isolated (efforts, areas, people) instead of connected

After this setup:
- ✅ Daily notes automatically link to weekly review
- ✅ Weekly reviews summarized in monthly area review
- ✅ Monthly reviews inform quarterly strategy
- ✅ Quarterly reviews feed into yearly planning
- ✅ System data cascades naturally through time horizons

---

## 📁 Folder Structure

The calendar architecture requires these folders. Check that they exist:

```
05-Calendar/
├── Daily/          ✅ Already exists
│   └── YYYY-MM-DD.md (e.g., 2026-01-14.md)
├── Weekly/         ✅ Already exists
│   └── YYYY-[W]ww.md (e.g., 2026-W02.md)
├── Monthly/        🆕 Create this
│   └── YYYY-MM.md (e.g., 2026-01.md)
├── Quarterly/      🆕 Create this
│   └── YYYY-[Q]Q.md (e.g., 2026-Q1.md)
├── Yearly/         🆕 Create this
│   └── YYYY.md (e.g., 2026.md)
├── _Logs/          ✅ Already exists
└── 05-Calendar.md  ✅ Hub
```

### Creating New Folders

**If using Obsidian**:
1. Right-click in File Explorer on `05-Calendar`
2. Select "New Folder"
3. Name: `Monthly`
4. Repeat for `Quarterly` and `Yearly`

**Via terminal**:
```bash
mkdir 05-Calendar/Monthly
mkdir 05-Calendar/Quarterly
mkdir 05-Calendar/Yearly
```

---

## ⚙️ Periodic Notes Plugin Setup

The **Periodic Notes** plugin automates recurring note creation. Set it up as follows:

### Installation
1. Open Obsidian Settings
2. Go to **Community Plugins**
3. Search for "Periodic Notes"
4. Click **Install** (by liamcain)
5. Click **Enable**

### Configuration (This is Critical!)

#### Daily Notes
- **Enabled**: ✅ Yes
- **Folder**: `05-Calendar/Daily`
- **Format**: `YYYY-MM-DD` (e.g., `2026-01-14`)
- **Template**: (Leave empty or point to template if you have one)

#### Weekly Notes
- **Enabled**: ✅ Yes
- **Folder**: `05-Calendar/Weekly`
- **Format**: `gggg-[W]ww` (e.g., `2026-W02`)
- **Template**: (Leave empty or point to template)

#### Monthly Notes 🆕
- **Enabled**: ✅ Yes
- **Folder**: `05-Calendar/Monthly`
- **Format**: `YYYY-MM` (e.g., `2026-01`)
- **Template**: `Template Monthly Review` (optional—can create simple template)

#### Quarterly Notes 🆕
- **Enabled**: ✅ Yes
- **Folder**: `05-Calendar/Quarterly`
- **Format**: `YYYY-[Q]Q` (e.g., `2026-Q1`)
- **Template**: `Template Quarterly Review` (optional)

#### Yearly Notes 🆕
- **Enabled**: ✅ Yes
- **Folder**: `05-Calendar/Yearly`
- **Format**: `YYYY` (e.g., `2026`)
- **Template**: `Template Yearly Review` (optional)

---

## 📋 Using Periodic Notes

Once configured, you can create period notes using:

### Command Palette Method
1. Open Command Palette: `Ctrl+P` (or `Cmd+P`)
2. Type "Periodic Notes: Open Today"
3. Or "Periodic Notes: Open This Month"
4. Or "Periodic Notes: Open This Quarter"
5. Or "Periodic Notes: Open This Year"

### Hotkey Method (Recommended)
Set up hotkeys in Settings → Hotkeys:
- **Ctrl+Shift+T**: Open Today's note (Daily)
- **Ctrl+Shift+W**: Open This Week's note (Weekly)
- **Ctrl+Shift+M**: Open This Month's note (Monthly)
- **Ctrl+Shift+Q**: Open This Quarter's note (Quarterly)
- **Ctrl+Shift+Y**: Open This Year's note (Yearly)

---

## 🔗 Navigation Links (Add These)

Edit `05-Calendar.md` to include quick navigation to all periods:

```markdown
## 📅 Quick Access

### Current Periods
- [[2026-01-14|Today]] (Daily)
- [[2026-W02|This Week]] (Weekly)
- [[2026-01|This Month]] (Monthly)
- [[2026-Q1|This Quarter]] (Quarterly)
- [[2026|This Year]] (Yearly)

### Period Archives
- [[Daily Notes]] (All daily notes)
- [[Weekly Notes]] (All weekly notes)
- [**Monthly Notes**](05-Calendar/Monthly) (Start of month)
- [**Quarterly Notes**](05-Calendar/Quarterly) (Start of quarter)
- [**Yearly Notes**](05-Calendar/Yearly) (Start of year)
```

---

## 📊 Dashboard Queries

Add these queries to your dashboard or a "Calendar Dashboard" page to see all your period reviews at once:

### Monthly Reviews This Year
```dataview
LIST file.link
FROM "05-Calendar/Monthly"
WHERE year(file.ctime) = 2026
SORT file.ctime DESC
```

### Quarterly Reviews This Year
```dataview
LIST file.link
FROM "05-Calendar/Quarterly"
WHERE year(file.ctime) = 2026
SORT file.ctime DESC
```

### Recent Reviews (All Types)
```dataview
TABLE
  type as "Period",
  file.ctime as "Created"
FROM "05-Calendar"
WHERE type = "daily" OR type = "weekly" OR type = "monthly" OR type = "quarterly" OR type = "yearly"
SORT file.ctime DESC
LIMIT 10
```

---

## 🔄 The Workflow - How It All Connects

### Daily → Weekly Flow

**Daily Work (5-10 minutes)**:
1. Create/update today's daily note
2. Log experiences, energy, focus
3. At day end: Evening reflection

**Weekly Work (30 minutes, Friday afternoons)**:
1. Open this week's weekly note
2. Review daily notes from the week (query pulls them in)
3. Answer: What patterns did I see?
4. Plan: What should next week focus on?
5. Update: Active efforts progress

### Weekly → Monthly Flow

**Monthly Work (45 minutes, 1st of month)**:
1. Open this month's monthly note
2. Review all 4 weekly notes from the month (links)
3. Answer: What themes emerged?
4. **AREA REVIEW**: Check each life area
   - [[210-Health]] - Progress this month?
   - [[220-Finance]] - Any changes?
   - [[230-Career]] - What advanced?
   - [[240-Relationships]] - How's the network?
   - [[250-Personal]] - Personal wins?
5. Plan: What should next month focus on?

### Monthly → Quarterly Flow

**Quarterly Work (90 minutes, 1st of quarter)**:
1. Open this quarter's quarterly note
2. Review all 3 monthly notes (links)
3. Answer: How did this quarter evolve me?
4. **STRATEGIC ASSESSMENT**: Each life area
   - Progress toward annual goals?
   - Major wins and learnings?
   - What needs more attention?
5. Plan: What should next quarter focus on?

### Quarterly → Yearly Flow

**Yearly Work (2 hours, December 31 or January 1)**:
1. Open this year's yearly note
2. Review all 4 quarterly notes (links)
3. Answer: Did I accomplish my big bets?
4. **ANNUAL REFLECTION**: All life areas
   - What story did the year tell?
   - Major transformations?
   - Relationships evolved?
   - Learning outcomes?
5. Plan: What does next year mean?

---

## 📅 Calendar Events to Schedule

Make these review rituals automatic by adding them to your calendar:

### Weekly Review Ritual
- **When**: Every Friday, 4:00 PM - 4:30 PM
- **Duration**: 30 minutes
- **What**: Open `[[YYYY-W##]]` and complete weekly review
- **Action**: Link to this week's weekly note
- **Recurring**: Every Friday

### Monthly Area Review Ritual
- **When**: 1st of month, 3:00 PM - 3:45 PM
- **Duration**: 45 minutes
- **What**: Open `[[YYYY-MM]]` and complete monthly area review
- **Action**: Check all 5 life areas
- **Recurring**: Monthly (1st)

### Quarterly Strategic Review
- **When**: 1st day of quarter (Jan 1, Apr 1, Jul 1, Oct 1), 2:00 PM - 3:30 PM
- **Duration**: 90 minutes
- **What**: Open `[[YYYY-Q#]]` and complete strategic review
- **Action**: Plan next quarter's initiatives
- **Recurring**: Quarterly

### Yearly Reflection & Planning
- **When**: December 31, 10:00 AM - 12:00 PM (or January 1)
- **Duration**: 2 hours
- **What**: Open `[[YYYY]]` and complete yearly review
- **Action**: Plan next year's vision and goals
- **Recurring**: Yearly

---

## 🎯 Implementation Timeline

### Week 1: Setup
- [ ] Create Monthly/Quarterly/Yearly folders
- [ ] Configure Periodic Notes plugin
- [ ] Copy example notes (already created)
- [ ] Setup calendar events

### Week 2-3: First Trial
- [ ] Complete your first weekly review
- [ ] At end of month: Complete first monthly review
- [ ] Adjust templates based on what worked/didn't

### Week 4+: Optimization
- [ ] Weekly reviews become automatic
- [ ] Monthly reviews show patterns
- [ ] Quarterly reviews reveal strategy
- [ ] System becomes background habit

---

## 🔧 Troubleshooting

### Periodic Notes Not Creating Notes

**Problem**: Clicking "Open This Month" doesn't create a note

**Solutions**:
1. Verify plugin is installed and enabled
2. Check folder exists: `05-Calendar/Monthly` should exist
3. Verify format: `YYYY-MM` (not `YYYY_MM` or other variations)
4. Restart Obsidian
5. Check for permission issues on the folder

### Navigation Links Not Working

**Problem**: `[[2026-01]]` links show red (unlinked)

**Solutions**:
1. Manually create the first note in each folder
2. Once created, links will work
3. Use Periodic Notes to auto-create them

### Calendar Events Not Showing

**Problem**: Added events but don't see them

**Solutions**:
1. Check calendar app is synced
2. Verify event date and time
3. Some calendar apps need 5-10 min to sync

---

## ✨ Pro Tips

### Tip 1: Use Hotkeys
Set up Command Palette hotkeys—makes periodic notes instant to access.

### Tip 2: Add Context to Templates
Include brief prompts in each period template so you know what to fill in.

### Tip 3: Link as You Go
While in monthly review, immediately link next month's note: `[[2026-02]]`

### Tip 4: Archive Old Period Notes
After 1 year, move past year's period notes to Archive to reduce clutter.

### Tip 5: Create Quick-Access Dashboard
Link current period notes prominently on your home dashboard.

---

## 📊 Example: Linking Architecture

Here's how your period notes should link to each other:

```
2026 (Yearly)
├── Links to → 2026-Q1 (Quarterly)
│   ├── Links to → 2026-01 (Monthly)
│   │   ├── Links to → 2026-W01 (Weekly)
│   │   │   ├── Links to → 2026-01-01 (Daily)
│   │   │   ├── Links to → 2026-01-02 (Daily)
│   │   │   └── ...
│   │   ├── Links to → 2026-W02 (Weekly)
│   │   └── ...
│   └── ...
└── ...
```

This hierarchical linking means you can:
- Start at Daily note and navigate up to Year
- Start at Year and navigate down to specific Day
- Move laterally (previous/next month, quarter, year)

---

## 🚀 Getting Started Immediately

1. **Today**: Create folders (5 min)
2. **Today**: Configure Periodic Notes plugin (10 min)
3. **Friday**: Do your first weekly review (30 min)
4. **February 1**: Do your first monthly review (45 min)
5. **April 1**: Do your first quarterly review (90 min)

That's it. The system starts working.

---

## 📞 Not Working?

**If you get stuck**, refer to:
- **Periodic Notes docs**: https://github.com/liamcain/obsidian-periodic-notes
- **About Calendar**: [[+About Calendarℹ️]]
- **Obsidian Help**: community.obsidian.md

---

## 🎉 What This Enables

Once complete, you'll have:
- ✅ Automated daily note creation
- ✅ Weekly review triggered by calendar
- ✅ Monthly area health dashboards
- ✅ Quarterly strategic planning
- ✅ Yearly vision setting
- ✅ Complete data cascade from experience → learning → strategy

**This is what transforms Origin from "nice system" to "actually works for your life."**

---

⬆️:: [[05-Calendar]]

*Last Updated: 2026-01-14 | Status: 🟢 Complete | Next: Implement Period Architecture*
