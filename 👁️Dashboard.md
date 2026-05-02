---
title: 📊 Dashboard
type: dashboard
status: 🔄active
tags:
  - 📊dashboard
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
> [[🏡Home|🏡 Home]] • [[👁️Dashboard|📊 Dashboard]] • [[TODO|✅ TODO]] • [[🎮Gamification Dashboard|🎮 Game]] • [[📈Performance Metrics Dashboard|📈 Metrics]]
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

*Your personal knowledge management command center*
## 🎯 Quick Actions

| Action                | Shortcut       | Template                                 |
| --------------------- | -------------- | ---------------------------------------- |
| 📥 **Quick Capture**  | `Ctrl+N`       | [[Quick Capture - Inbox]]                |
| 📝 **Daily Note**     | `Ctrl+SHIFT+D` | [[Template Daily\|New Daily]]            |
| 🚀 **New Project**    | `Ctrl+P`       | [[Templates/Static/effort\|New Project]] |
| 📚 **Process Source** | `Ctrl+S`       | [[Templates/Static/source\|New Source]]  |
| 💡 **Create Atomic**  | `Ctrl+A`       | [[Templates/Static/atomic\|New Atomic]]  |

---

## 📊 System Health at a Glance
```dataviewjs
/**
 * QUERY: System Health Quick Overview (Cache-Optimized)
 * PURPOSE: Display key metrics at a glance for daily check-in
 * DEPENDS ON: 99-System/_Metrics Cache (primary), live queries (fallback)
 * UPDATED: 2026-02-07
 */
try {
  const cache = dv.page("99-System/_Metrics Cache");
  const today = dv.date('today');

  let inboxCount, activeEfforts, atomicNotes, sourcesThisWeek;

  if (cache?.cache_date) {
    // Use cached values
    inboxCount = cache.inbox_count ?? 0;
    activeEfforts = cache.effort_count ?? 0;
    atomicNotes = cache.atomic_count ?? 0;
    sourcesThisWeek = cache.growth_weekly ?? 0;
  } else {
    // Live fallback
    inboxCount = dv.pages('"+Inbox"')?.length ?? 0;
    activeEfforts = dv.pages('"03-Efforts"').where(p => p.status === "🔄active").length ?? 0;
    atomicNotes = dv.pages('"02-Knowledge/Atomics"')?.length ?? 0;
    sourcesThisWeek = dv.pages('"04-Sources"').where(p => p.file.ctime >= today.minus({days: 7})).length ?? 0;
  }

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
} catch (e) {
  dv.paragraph(`⚠️ Error loading health overview: ${e.message}`);
}
```
```dataviewjs
/**
 * QUERY: System Health Score (Cache-Optimized)
 * PURPOSE: Calculate overall vault health with weighted scoring (0-100)
 * DEPENDS ON: 99-System/_Metrics Cache (primary), live queries (fallback)
 * SCORING: inbox(25) + projects(25) + stale(25) + orphans(25) = 100
 * UPDATED: 2026-02-07
 */
try {
  const cache = dv.page("99-System/_Metrics Cache");
  let metrics;

  if (cache?.cache_date) {
    metrics = {
      inbox: cache.inbox_count ?? 0,
      activeProjects: cache.effort_count ?? 0,
      staleProjects: 0, // not cached yet — future enhancement
      orphanNotes: cache.orphan_notes ?? 0,
      totalNotes: cache.total_notes ?? 0
    };
  } else {
    const today = dv.date('today');
    const pages = dv.pages().where(p => !p.file.path.includes("99-System"));
    metrics = {
      inbox: dv.pages('"+Inbox"')?.length ?? 0,
      activeProjects: dv.pages('"03-Efforts"').where(p => p.status === "🔄active").length ?? 0,
      staleProjects: dv.pages('"03-Efforts"').where(p => {
        if (p.status !== "🔄active") return false;
        const daysDiff = today.diff(p.file.mtime, 'days');
        return daysDiff && daysDiff.days > 14;
      }).length ?? 0,
      orphanNotes: pages.where(p =>
        (!p.related || p.related.length === 0) &&
        (!p.file.inlinks || p.file.inlinks.length === 0)
      ).length ?? 0,
      totalNotes: pages?.length ?? 0
    };
  }

  const healthScore = (
    (metrics.inbox <= 20 ? 25 : metrics.inbox <= 40 ? 15 : 5) +
    (metrics.activeProjects >= 1 && metrics.activeProjects <= 7 ? 25 : 15) +
    (metrics.staleProjects === 0 ? 25 : metrics.staleProjects <= 2 ? 20 : 10) +
    (metrics.totalNotes > 0 && metrics.orphanNotes <= metrics.totalNotes * 0.2 ? 25 : 15)
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
| 🏝️ Orphan Notes | ${metrics.orphanNotes} | ${metrics.totalNotes > 0 && metrics.orphanNotes <= metrics.totalNotes * 0.2 ? '✅' : '⚠️'} | <20% |
| 📄 Total Notes | ${metrics.totalNotes} | 📊 | Growth |
`);
} catch (e) {
  dv.paragraph(`⚠️ Error calculating health score: ${e.message}`);
}
```

## 🔝 One-glance (Top panel)

> Rychlý přehled stavu + skoky do sekcí

```dataviewjs
/**
 * QUERY: One-Glance Status Panel
 * PURPOSE: Quick overview of tasks, projects, inbox for daily review
 * DEPENDS ON: tasks (due dates), 03-Efforts (status), +Inbox, 05-Calendar/Daily
 * UPDATED: 2026-02-05
 */
try {
  const today = dv.date('today');
  const pages = dv.pages();

  // Tasks with null-safe date handling
  const allTasks = pages.file.tasks?.array() ?? [];
  const overdue = allTasks.filter(t => {
    if (t.completed || !t.due) return false;
    const dueDate = dv.date(t.due);
    return dueDate && dueDate < today;
  }).length;
  const dueToday = allTasks.filter(t => {
    if (t.completed || !t.due) return false;
    const dueDate = dv.date(t.due);
    return dueDate && dueDate.toISODate() === today.toISODate();
  }).length;

  const activeEfforts = dv.pages('"03-Efforts"')
    .where(p => p.status === "🔄active" || p.status === "⏳waiting")
    .length ?? 0;

  // Inbox count
  const inboxCount = dv.pages('"+Inbox"')?.length ?? 0;

  // Weekly highlights
  const weekStart = today.startOf('week');
  const weeklyHighlights = dv.pages('"05-Calendar/Daily"')
    .where(p => p.file.day && p.file.day >= weekStart && p.highlight)
    .length ?? 0;

  dv.table(
    ["📌 Overdue", "📅 Due dnes", "🧭 Aktivní projekty", "📥 Inbox", "✨ Highlights (týden)"],
    [[overdue, dueToday, activeEfforts, inboxCount, weeklyHighlights]]
  );
} catch (e) {
  dv.paragraph(`⚠️ Error loading status panel: ${e.message}`);
}
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
WHERE status = "🔄active"
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
FROM "02-Knowledge/Atomics"
WHERE status = "🔄active"
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
WHERE status = "🔄active"
SORT created DESC
LIMIT 5
```

*[[04-Sources|View All Sources]] | [[99-System/Templates/Source-Template|Add New Source]]*

---

## 📈 Weekly Progress

```dataviewjs
/**
 * QUERY: Weekly Progress Stats (Cache-Optimized)
 * PURPOSE: Track capture vs processing velocity for the current week
 * DEPENDS ON: 99-System/_Metrics Cache (primary), live queries (fallback)
 * UPDATED: 2026-02-07
 */
try {
  const cache = dv.page("99-System/_Metrics Cache");
  let weeklyCaptures, weeklyProcessed, processingRate;

  if (cache?.cache_date) {
    weeklyCaptures = cache.processing_created ?? 0;
    weeklyProcessed = cache.processing_processed ?? 0;
    processingRate = cache.processing_rate ?? 0;
  } else {
    const today = dv.date('today');
    const weekStart = today.minus({days: today.weekday});
    weeklyCaptures = dv.pages('"+Inbox"').where(p => p.file.ctime >= weekStart).length ?? 0;
    weeklyProcessed = dv.pages().where(p => p.status === "🔄active" && p.file.mtime >= weekStart && !p.file.path.includes("+Inbox")).length ?? 0;
    processingRate = weeklyCaptures > 0 ? Math.round((weeklyProcessed / weeklyCaptures) * 100) : 0;
  }

  dv.paragraph(`
### This Week's Activity
- 📥 **Captured**: ${weeklyCaptures} items
- 🔄 **Processed**: ${weeklyProcessed} items
- 📊 **Processing Rate**: ${processingRate}%
- 🎯 **Processing Health**: ${processingRate >= 80 ? '🟢 Excellent' : processingRate >= 60 ? '🟡 Good' : '🔴 Needs Work'}
`);
} catch (e) {
  dv.paragraph(`⚠️ Error loading weekly progress: ${e.message}`);
}
```

---

## 🔗 Knowledge Graph Insights

```dataviewjs
/**
 * QUERY: Knowledge Graph Connection Analysis (Cache-Optimized)
 * PURPOSE: Measure how well-connected notes are
 * DEPENDS ON: 99-System/_Metrics Cache (primary), live queries (fallback)
 * UPDATED: 2026-02-07
 */
try {
  const cache = dv.page("99-System/_Metrics Cache");
  let totalPages, pagesWithLinks, connectionDensity;

  if (cache?.cache_date) {
    totalPages = cache.total_notes ?? 0;
    pagesWithLinks = cache.connected_notes ?? 0;
    connectionDensity = cache.connection_density ?? 0;
  } else {
    const pages = dv.pages().where(p => !p.file.path.includes("99-System"));
    totalPages = pages?.length ?? 0;
    pagesWithLinks = pages.where(p => p.related && p.related.length > 0).length ?? 0;
    connectionDensity = totalPages > 0 ? Math.round((pagesWithLinks / totalPages) * 100) : 0;
  }

  dv.paragraph(`
### Connection Health
- 📄 **Total Notes**: ${totalPages}
- 🔗 **Connected Notes**: ${pagesWithLinks}
- 📊 **Connection Density**: ${connectionDensity}%
- 🎯 **Connection Health**: ${connectionDensity >= 70 ? '🟢 Well Connected' : connectionDensity >= 40 ? '🟡 Moderate' : '🔴 Isolated'}
`);
} catch (e) {
  dv.paragraph(`⚠️ Error analyzing connections: ${e.message}`);
}
```

---

## 🗺️ Knowledge Navigation

### 🎯 By Area #🌱develop - Experience will show whats important

| Area                     | Latest Update                  | Notes Count                                                                |
| ------------------------ | ------------------------------ | -------------------------------------------------------------------------- |
| 📊 **Work**              | [[Work]]     | `= length(filter(this.file.inlinks, (l) => contains(l.path, "Work")))`     |
| 💪 **Health**            | [[Health]]   | `= length(filter(this.file.inlinks, (l) => contains(l.path, "Health")))`   |
| 📚 **Learning**          | [[Learning]] | `= length(filter(this.file.inlinks, (l) => contains(l.path, "Learning")))` |
| 👨‍👩‍👧‍👦 **Personal** | [[Personal]] | `= length(filter(this.file.inlinks, (l) => contains(l.path, "Personal")))` |

### 🗺️ Maps of Content
```dataview
LIST
FROM "01-MOCs"
WHERE status = "🔄active"
SORT file.mtime DESC
LIMIT 8
```

![[_MOCs_Data.base]]

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
/**
 * QUERY: Note Creation Metrics (Cache-Optimized)
 * PURPOSE: Track weekly and monthly note creation volume
 * DEPENDS ON: 99-System/_Metrics Cache (primary), file.ctime (fallback)
 * UPDATED: 2026-02-07
 */
try {
  const cache = dv.page("99-System/_Metrics Cache");
  let weekCount, monthCount;

  if (cache?.cache_date) {
    weekCount = cache.growth_weekly ?? 0;
    monthCount = cache.growth_monthly ?? 0;
  } else {
    const today = dv.date('today');
    weekCount = dv.pages().where(p => p.file.ctime >= today.minus({days: 7})).length ?? 0;
    monthCount = dv.pages().where(p => p.file.ctime >= today.minus({days: 30})).length ?? 0;
  }

  dv.paragraph(`Nové poznámky tento týden: **${weekCount}**`);
  dv.paragraph(`Nové poznámky tento měsíc: **${monthCount}**`);
} catch (e) {
  dv.paragraph(`⚠️ Error loading metrics: ${e.message}`);
}
```

---

*Last updated: `= this.file.mtime`*
*System health check: `= choice(this.inbox-count <= 20, "🟢 Healthy", "⚠️ Needs attention")`*
