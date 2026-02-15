---
title: GTD Command Center
type: dashboard
status: 🔄active
tags:
  - 📊dashboard
  - 🏠system
  - 🎯gtd
  - ⚡productivity
created: 2026-01-01
modified: 2026-01-01
cssclasses:
  - wide-page
related:
  - "[[🏡Home]]"
  - "[[TODO]]"
  - "[[03-Efforts]]"
  - "[[+Inbox]]"
---
> [!orbit]- Quick Navigation
> **Core Dashboards:**
> [[🏡Home|🏡 Home]] • [[👁️Dashboard|📊 Dashboard]] • [[🎯GTD Command Center|🎯 GTD]] • [[🎮Gamification Dashboard|🎮 Game]] • [[📈Performance Metrics Dashboard|📈 Metrics]]
>
> **GTD Focus:**
> [[+Inbox|📥 Inbox]] • [[TODO|✅ TODO]] • [[03-Efforts|🚀 Efforts]] • [[🧠GTD Weekly Review|📅 Review]] • [[📍Note Classification Guide|📍 Guide]]
>
> **Quick Processing:** `Ctrl+P` → ⚡Quick Process - Effort • 🤖Smart Classify • 📦Batch Process Inbox

# 🎯 GTD Command Center

> *"Your mind is for having ideas, not holding them."* — David Allen

---

## 📊 System Status

```dataviewjs
/**
 * QUERY: GTD System Status Overview (Cache-Optimized)
 * PURPOSE: Quick GTD health check - inbox, projects, waiting, overdue
 * DEPENDS ON: 00-Meta/_Metrics Cache (primary), live queries (fallback)
 * UPDATED: 2026-02-07
 */
try {
  const cache = dv.page("00-Meta/_Metrics Cache");
  let inbox, activeProjects, waitingFor, overdue;

  if (cache?.cache_date) {
    inbox = cache.inbox_count ?? 0;
    activeProjects = cache.effort_count ?? 0;
    // Waiting and overdue still need live queries (not cached yet)
    waitingFor = dv.pages().file.tasks.where(t => !t.completed && t.text.includes("@waiting")).length ?? 0;
    const today = dv.date('today');
    overdue = dv.pages().file.tasks.where(t => {
      if (t.completed || !t.due) return false;
      const dueDate = dv.date(t.due);
      return dueDate && dueDate < today;
    }).length ?? 0;
  } else {
    inbox = dv.pages('"+Inbox"')?.length ?? 0;
    activeProjects = dv.pages('"03-Efforts"').where(p => p.status === "🔄active").length ?? 0;
    waitingFor = dv.pages().file.tasks.where(t => !t.completed && t.text.includes("@waiting")).length ?? 0;
    const today = dv.date('today');
    overdue = dv.pages().file.tasks.where(t => {
      if (t.completed || !t.due) return false;
      const dueDate = dv.date(t.due);
      return dueDate && dueDate < today;
    }).length ?? 0;
  }

  const inboxStatus = inbox <= 10 ? "🟢" : inbox <= 25 ? "🟡" : "🔴";
  const projectStatus = activeProjects <= 7 ? "🟢" : activeProjects <= 12 ? "🟡" : "🔴";

  dv.paragraph(`
| Metrika | Počet | Status | Cíl |
|---------|-------|--------|-----|
| 📥 **Inbox** | ${inbox} | ${inboxStatus} | ≤10 |
| 🚀 **Aktivní projekty** | ${activeProjects} | ${projectStatus} | ≤7 |
| ⏳ **Waiting For** | ${waitingFor} | ${waitingFor <= 5 ? "🟢" : "🟡"} | track |
| ⚠️ **Overdue** | ${overdue} | ${overdue === 0 ? "🟢" : "🔴"} | 0 |
`);
} catch (e) {
  dv.paragraph(`⚠️ Error loading GTD status: ${e.message}`);
}
```

---

## 🔥 Focus Now

> Vyber podle aktuální energie a kontextu

> [!multi-column]
>
> > [!tip]+ ⚡ High Energy Tasks
> > ```dataview
> > TASK
> > FROM "03-Efforts" OR "+Inbox"
> > WHERE !completed AND meta(energy) = "high"
> > LIMIT 5
> > ```
>
> > [!note]+ 🔋 Medium Energy Tasks
> > ```dataview
> > TASK
> > FROM "03-Efforts" OR "+Inbox"
> > WHERE !completed AND meta(energy) = "medium"
> > LIMIT 5
> > ```
>
> > [!abstract]+ 🪫 Low Energy Tasks
> > ```dataview
> > TASK
> > FROM "03-Efforts" OR "+Inbox"
> > WHERE !completed AND meta(energy) = "low"
> > LIMIT 5
> > ```

---

## 📋 Next Actions by Context

### 💻 @computer
```tasks
not done
description includes @computer
sort by priority
limit 10
```

### 🏠 @home
```tasks
not done
description includes @home
sort by priority
limit 10
```

### 💼 @work
```tasks
not done
description includes @work
sort by priority
limit 10
```

### 📱 @phone
```tasks
not done
description includes @phone
sort by priority
limit 10
```

### 🚗 @errands
```tasks
not done
description includes @errands
sort by priority
limit 10
```

### 👤 @people
```tasks
not done
description includes @people
sort by priority
limit 10
```

---

## ⏳ Waiting For

> Věci, které čekají na někoho jiného

```tasks
not done
description includes @waiting
sort by created
```

```dataview
TABLE WITHOUT ID
  file.link as "Projekt",
  waiting_for as "Čekám na",
  waiting_since as "Od"
FROM "03-Efforts"
WHERE waiting_for != null
SORT waiting_since ASC
```

---

## 📅 Calendar View

### ⚠️ Overdue
```tasks
not done
due before today
sort by due
```

### 📌 Due Today
```tasks
not done
due today
sort by priority
```

### 📆 Due This Week
```tasks
not done
due after today
due before in 7 days
sort by due
```

### 🗓️ Upcoming (Next 30 days)
```tasks
not done
due after in 7 days
due before in 30 days
sort by due
limit 15
```

---

## 🚀 Active Projects

```dataview
TABLE WITHOUT ID
  "🚀 " + file.link as "Projekt",
  status as "Status",
  priority as "Priorita",
  choice(completion_percentage, completion_percentage + "%", "0%") as "Progress",
  choice(due, "📅 " + due, "—") as "Due",
  next_actions as "Next Action"
FROM "03-Efforts"
WHERE status = "🔄active"
SORT priority DESC, due ASC
```

### 🔥 On (Hot Projects)
```dataview
LIST
FROM "03-Efforts/On"
WHERE status = "🔄active"
SORT file.mtime DESC
```

### ♻️ Ongoing (Maintenance)
```dataview
LIST
FROM "03-Efforts/Ongoing"
SORT file.mtime DESC
LIMIT 5
```

### 〰️ Simmering (Backburner)
```dataview
LIST
FROM "03-Efforts/Simmering"
SORT file.mtime DESC
LIMIT 5
```

---

## 📥 Inbox Processing

> **Pravidlo:** Každá položka musí být zpracována do 48h

```dataview
TABLE WITHOUT ID
  file.link as "Item",
  file.ctime as "Přidáno",
  dateformat(date(now) - file.ctime, "d") + " dní" as "Stáří"
FROM "+Inbox"
SORT file.ctime ASC
LIMIT 20
```

### ⚡ Quick Process Actions
- **2 min rule:** Pokud to zabere < 2 min, udělej hned
- **Delegate:** Přidej @waiting a komu
- **Defer:** Přidej do projektu nebo Someday/Maybe
- **Delete:** Smaž pokud není relevantní

---

## 🗓️ Someday / Maybe

```dataview
LIST
FROM "03-Efforts/Simmering" OR "+Inbox"
WHERE contains(tags, "someday") OR contains(tags, "maybe")
SORT file.mtime DESC
LIMIT 10
```

---

## 📊 Weekly Stats

```dataviewjs
/**
 * QUERY: Weekly Task & Note Statistics (Cache-Optimized)
 * PURPOSE: Track task completion rate and note creation velocity
 * DEPENDS ON: 00-Meta/_Metrics Cache (primary), live queries (fallback)
 * UPDATED: 2026-02-07
 */
try {
  const cache = dv.page("00-Meta/_Metrics Cache");
  let tasksCompleted, tasksCreated, notesCreated;

  if (cache?.cache_date) {
    notesCreated = cache.growth_weekly ?? 0;
    tasksCompleted = cache.processing_processed ?? 0;
    tasksCreated = cache.processing_created ?? 0;
  } else {
    const today = dv.date('today');
    const weekAgo = today.minus({days: 7});
    tasksCompleted = dv.pages().file.tasks.where(t => {
      if (!t.completed || !t.completion) return false;
      const completionDate = dv.date(t.completion);
      return completionDate && completionDate >= weekAgo;
    }).length ?? 0;
    tasksCreated = dv.pages().file.tasks.where(t => {
      if (!t.created) return false;
      const createdDate = dv.date(t.created);
      return createdDate && createdDate >= weekAgo;
    }).length ?? 0;
    notesCreated = dv.pages().where(p => p.file.ctime >= weekAgo).length ?? 0;
  }

  dv.paragraph(`
### Tento týden
- ✅ **Dokončeno úkolů:** ${tasksCompleted}
- ➕ **Vytvořeno úkolů:** ${tasksCreated}
- 📝 **Nových poznámek:** ${notesCreated}
- 📈 **Completion rate:** ${tasksCreated > 0 ? Math.round(tasksCompleted/tasksCreated*100) : 0}%
`);
} catch (e) {
  dv.paragraph(`⚠️ Error loading weekly stats: ${e.message}`);
}
```

---

## 🔗 Quick Links

| Akce             | Odkaz                                                 |
| ---------------- | ----------------------------------------------------- |
| ➕ Nový projekt   | [[Effort/E-Full-Template]]                            |
| 📥 Quick Capture | [[Quick Capture - Inbox]]                             |
| 📅 Dnešní den    | `= "[[" + dateformat(date(now), "yyyy-MM-dd") + "]]"` |
| 🔄 Weekly Review | [[🎯GTD Weekly Review]]                               |
| 📊 Dashboard     | [[👁️Dashboard]]                                      |

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Akce |
|----------|------|
| `Ctrl+Shift+I` | Quick Capture do Inbox |
| `Ctrl+Shift+T` | Nový task |
| `Ctrl+Shift+P` | Nový projekt |
| `Ctrl+Shift+D` | Daily note |
| `Ctrl+G` | Otevřít GTD Command Center |

---

*Last updated: `= this.file.mtime`*
