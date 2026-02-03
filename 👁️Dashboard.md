---
title: 📊 Dashboard
type: moc
status: 🔄active
tags:
  - 📊dashboard
  - 🗺️MOC
  - 📋review
  - ⚙️system
created: 2025-09-29
modified: 2025-09-29
related:
  - "[[🏡Home]]"
  - "[[🔁My PKM Workflows]]"
  - "[[✅My PKM Tasks]]"
  - "[[🔍My PKM Queries]]"
obsidianUIMode: preview
cssclasses:
  - wide-page
---
> [!orbit]- Quick Navigation
> **Core Dashboards:**
> [[🏡Home|🏡 Home]] • [[👁️Dashboard|📊 Dashboard]] • [[🎯GTD Command Center|🎯 GTD]] • [[🎮Gamification Dashboard|🎮 Game]] • [[📈Performance Metrics Dashboard|📈 Metrics]]
>
> **Quick Actions:**
> [[+Inbox|📥 Inbox]] • [[🗺️My PKM MOC|🗺️ PKM]] • [[TODO|✅ TODO]] • [[05-Calendar|📅 Calendar]] • [[📍Note Classification Guide|📍 Guide]]
>
> **Automation:** `Ctrl+P` → ⚡Quick Process (Atomic/Source/Effort) • 🤖Smart Classify • 📦Batch Process
>
> **Specialized:** [[MOC - Automation Command Center|⚡ Automation]] • [[Obsidian Plugins & Features|🛠️ Plugins]] • [[Prompt Dashboard|🤖 Prompts]]

# 📆Agenda
> [!Multi-column] 
> 
> > [!award]+ ##  `$= '[['+moment().format("YYYY-MM-DD")+'|Dnes]]'`  
> 
> > [!attention]+ ##  `$= '[['+moment().format("gggg-[W]ww")+'|Týden]]'`  
> 
> > [!calendar]+ ##  `$= '[['+moment().format("YYYY-MM")+'|Měsíc]]'`

# 🏠 PKM Home Dashboard

*Your personal knowledge management command center

## 🎯 Quick Actions

| Action                | Shortcut         | Template                         |
| --------------------- | ---------------- | -------------------------------- |
| 📥 **Quick Capture**  | `Ctrl+N` #🧹tidy | [[Quick Capture - Inbox]]        |
| 📝 **Daily Note**     | `Ctrl+SHIFT+D`   | [[Template Daily\|New Daily]]    |
| 🚀 **New Project**    | `Ctrl+P`         | [[E-Full-Template\|New Project]] |
| 📚 **Process Source** | `Ctrl+S`         | [[S-Full-Template\|New Source]]  |
| 💡 **Create Atomic**  | `Ctrl+A`         | [[A-Full-Template\|New Atomic]]  |

---

## 📊 System Health at a Glance
```dataviewjs
// System Health Indicators
const pages = dv.pages();
const today = dv.date('today');

// Calculate key metrics
const inboxCount = dv.pages('"+Inbox"').length;
const activeEfforts = dv.pages('"03-Efforts"').where(p => p.status === "active").length;
const atomicNotes = dv.pages('"02-Dots/100-Atomics"').length;
const sourcesThisWeek = dv.pages('"04-Sources"').where(p => 
  p.file.ctime >= today.minus({days: 7})
).length;

// Health status
const healthStatus = inboxCount <= 20 ? "🟢 Healthy" : 
                    inboxCount <= 40 ? "🟡 Needs Attention" : 
                    "🔴 Critical";

dv.paragraph(`
### Current Status: ${healthStatus}

| Metric | Count | Status |
|--------|-------|--------|
| 📥 **Inbox Items** | ${inboxCount} | ${inboxCount <= 20 ? '✅' : inboxCount <= 40 ? '⚠️' : '🚨'} |
| 🚀 **Active Projects** | ${activeEfforts} | ${activeEfforts > 0 ? '✅' : '⚠️'} |
| 💡 **Atomic Notes** | ${atomicNotes} | ${atomicNotes >= 10 ? '✅' : '⚠️'} |
| 📚 **Sources This Week** | ${sourcesThisWeek} | ${sourcesThisWeek >= 1 ? '✅' : '⚠️'} |
`);
```
```dataviewjs
// Automated system health indicators
const today = dv.date('today');
const pages = dv.pages().where(p => !p.file.path.includes("99-System"));

// Core metrics
const metrics = {
  inbox: dv.pages('"+Inbox"').length,
  activeProjects: dv.pages('"03-Efforts"').where(p => p.status === "active").length,
  staleProjects: dv.pages('"03-Efforts"').where(p => 
    p.status === "active" && 
    today.diff(p.file.mtime, 'days') > 14
  ).length,
  orphanNotes: pages.where(p => 
    (!p.related || p.related.length === 0) && 
    (!p.file.inlinks || p.file.inlinks.length === 0)
  ).length,
  totalNotes: pages.length
};

// Health scoring
const healthScore = (
  (metrics.inbox <= 20 ? 25 : metrics.inbox <= 40 ? 15 : 5) +
  (metrics.activeProjects >= 1 && metrics.activeProjects <= 7 ? 25 : 15) +
  (metrics.staleProjects === 0 ? 25 : metrics.staleProjects <= 2 ? 20 : 10) +
  (metrics.orphanNotes <= metrics.totalNotes * 0.2 ? 25 : 15)
);

const healthGrade = healthScore >= 80 ? "🟢 Excellent" : 
                   healthScore >= 60 ? "🟡 Good" : "🔴 Needs Attention";

dv.paragraph(`
**📊 System Health Score: ${healthScore}/100 - ${healthGrade}**

| Metric | Current | Status | Target |
|--------|---------|--------|---------|
| 📥 Inbox Items | ${metrics.inbox} | ${metrics.inbox <= 20 ? '✅' : '⚠️'} | ≤20 |
| 🚀 Active Projects | ${metrics.activeProjects} | ${metrics.activeProjects >= 1 && metrics.activeProjects <= 7 ? '✅' : '⚠️'} | 1-7 |
| ⏰ Stale Projects | ${metrics.staleProjects} | ${metrics.staleProjects === 0 ? '✅' : '⚠️'} | 0 |
| 🏝️ Orphan Notes | ${metrics.orphanNotes} | ${metrics.orphanNotes <= metrics.totalNotes * 0.2 ? '✅' : '⚠️'} | <20% |
| 📄 Total Notes | ${metrics.totalNotes} | 📊 | Growth |
`);
```

## 🔝 One-glance (Top panel)

> Rychlý přehled stavu + skoky do sekcí

```dataviewjs
const today = dv.date('today');
const pages = dv.pages();

// Tasks (DataviewJS čte úkoly z md: - [ ] ... s daty)
const allTasks = pages.file.tasks.array();
const overdue = allTasks.filter(t => !t.completed && t.due && dv.date(t.due) < today).length;
const dueToday = allTasks.filter(t => !t.completed && t.due && dv.date(t.due).toISODate() === today.toISODate()).length;

// Efforts (active window)
const activeEfforts = dv.pages('"03-Efforts"')
  .where(p => ['active','in_progress','blocked','on_hold'].includes((p.status||'').toLowerCase()))
  .length;

// Inbox count
const inboxCount = dv.pages('"+Inbox"').length;

// Weekly highlights (denní poznámky s `highlight::`)
const weekStart = today.startOf('week');
const weeklyHighlights = dv.pages('"05-Calendar/Daily"')
  .where(p => p.file.day && p.file.day >= weekStart && p.highlight)
  .length;

dv.table(
  ["📌 Overdue", "📅 Due dnes", "🧭 Aktivní projekty", "📥 Inbox", "✨ Highlights (týden)"],
  [[overdue, dueToday, activeEfforts, inboxCount, weeklyHighlights]]
);
```

## 🎯 Today's Focus

```dataview
TABLE WITHOUT ID
  choice(completed, "✅", "⭐") + " " + text as "Priority",
  effort as "Project"
FROM "05-Calendar/Daily/"
WHERE file.name = this.file.name
FLATTEN tasks
WHERE !completed
LIMIT 3
```

## 🚀 Active Projects

```dataview
TABLE WITHOUT ID
  "🚀 " + title as "Project",
  choice(completion, completion + "%", "0%") as "Progress",
  choice(due, "📅 " + due, "No deadline") as "Due",
  choice(next-action, "▶️ " + next-action, "❓ Needs planning") as "Next Action"
FROM "03-Efforts"
WHERE status = "🔁active"
SORT completion DESC
LIMIT 5
```

*[[03-Efforts|View All Projects]] | [[99-System/Templates/Project-Note|Create New Project]]*

---

## 💡 Recent Insights

```dataview
TABLE WITHOUT ID
  "💡 " + title as "Insight",
  maturity as "Stage",
  created as "Captured"
FROM "02-Dots/100-Atomics"
WHERE status = "🔁active"
SORT created DESC
LIMIT 5
```

*[[100-Atomics|View All Atomics]] | [[99-System/Templates/Atomic-Note|Create New Atomic]]*

---

## 📚 Recent Sources

```dataview
TABLE WITHOUT ID
  "📚 " + title as "Source",
  author as "Author",
  choice(rating, rating + "⭐", "Not rated") as "Rating",
  created as "Added"
FROM "04-Sources"
WHERE status = "active"
SORT created DESC
LIMIT 5
```

*[[04-Sources|View All Sources]] | [[99-System/Templates/Source-Template|Add New Source]]*

---

## 📈 Weekly Progress

```dataviewjs
// Weekly capture and processing stats
const today = dv.date('today');
const weekStart = today.minus({days: today.weekday});

const weeklyCaptures = dv.pages('"+Inbox"').where(p => 
  p.file.ctime >= weekStart
).length;

const weeklyProcessed = dv.pages().where(p => 
  p.status === "active" && p.file.mtime >= weekStart && !p.file.path.includes("+Inbox")
).length;

const processingRate = weeklyCaptures > 0 ? Math.round((weeklyProcessed / weeklyCaptures) * 100) : 0;

dv.paragraph(`
### This Week's Activity
- 📥 **Captured**: ${weeklyCaptures} items
- 🔄 **Processed**: ${weeklyProcessed} items  
- 📊 **Processing Rate**: ${processingRate}%
- 🎯 **Processing Health**: ${processingRate >= 80 ? '🟢 Excellent' : processingRate >= 60 ? '🟡 Good' : '🔴 Needs Work'}
`);
```

---

## 🔗 Knowledge Graph Insights

```dataviewjs
// Connection analysis
const pages = dv.pages().where(p => !p.file.path.includes("99-System"));
const totalPages = pages.length;
const pagesWithLinks = pages.where(p => (p.related && p.related.length > 0)).length;
const connectionDensity = totalPages > 0 ? Math.round((pagesWithLinks / totalPages) * 100) : 0;

dv.paragraph(`
### Connection Health
- 📄 **Total Notes**: ${totalPages}
- 🔗 **Connected Notes**: ${pagesWithLinks}
- 📊 **Connection Density**: ${connectionDensity}%
- 🎯 **Connection Health**: ${connectionDensity >= 70 ? '🟢 Well Connected' : connectionDensity >= 40 ? '🟡 Moderate' : '🔴 Isolated'}
`);
```

---

## 🗺️ Knowledge Navigation

### 🎯 By Area #🌱develop - Experience will show whats important

| Area                     | Latest Update                  | Notes Count                                                                |
| ------------------------ | ------------------------------ | -------------------------------------------------------------------------- |
| 📊 **Work**              | [[02-Dots/200-Areas/Work]]     | `= length(filter(this.file.inlinks, (l) => contains(l.path, "Work")))`     |
| 💪 **Health**            | [[02-Dots/200-Areas/Health]]   | `= length(filter(this.file.inlinks, (l) => contains(l.path, "Health")))`   |
| 📚 **Learning**          | [[02-Dots/200-Areas/Learning]] | `= length(filter(this.file.inlinks, (l) => contains(l.path, "Learning")))` |
| 👨‍👩‍👧‍👦 **Personal** | [[02-Dots/200-Areas/Personal]] | `= length(filter(this.file.inlinks, (l) => contains(l.path, "Personal")))` |

### 🗺️ Maps of Content
```dataview
LIST
FROM "01-MOCs"
WHERE status = "🔁active"
SORT file.mtime DESC
LIMIT 8
```

---

## 🛠️ System Maintenance

### 🔄 Review Schedule
- [ ] **Daily**: Process 5-10 inbox items *(10 min)*
- [ ] **Weekly**: Full system review *(30 min)* - Next: `= date(today) + dur(7 days)`
- [ ] **Monthly**: Archive & optimization *(60 min)* - Next: `= date(today) + dur(1 month)`

### ⚡ Quick Maintenance
ADD Butto deck most used
[[Guide — YAML Orchestrator#YAML Orchestrator — Button Deck 🧹tidy]]


## 📈 Metriky

**Nové poznámky — týden & měsíc**
```dataviewjs
const today = dv.date('today');
const weekAgo = today.minus({days: 7});
const monthAgo = today.minus({days: 30});
const week = dv.pages().where(p => p.file.ctime >= weekAgo);
const month = dv.pages().where(p => p.file.ctime >= monthAgo);
dv.paragraph(`Nové poznámky tento týden: **${week.length}**`);
dv.paragraph(`Nové poznámky tento měsíc: **${month.length}**`);
```

---

*Last updated: `= this.file.mtime`*
*System health check: `= choice(this.inbox-count <= 20, "🟢 Healthy", "⚠️ Needs attention")`*

