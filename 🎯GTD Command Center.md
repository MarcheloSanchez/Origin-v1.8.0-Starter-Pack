---
title: GTD Command Center
type: moc
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
> [!orbit] GTD Navigation | [[🏡Home]] | [[TODO]] | [[03-Efforts]] | [[+Inbox]] | [[🎯GTD Weekly Review]]

# 🎯 GTD Command Center

> *"Your mind is for having ideas, not holding them."* — David Allen

---

## 📊 System Status

```dataviewjs
const inbox = dv.pages('"+Inbox"').length;
const activeProjects = dv.pages('"03-Efforts"').where(p =>
  p.status === "🔄active" || p.status === "active"
).length;
const waitingFor = dv.pages().file.tasks.where(t =>
  !t.completed && t.text.includes("@waiting")
).length;
const today = dv.date('today');
const overdue = dv.pages().file.tasks.where(t =>
  !t.completed && t.due && dv.date(t.due) < today
).length;

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
  choice(deadline, "📅 " + deadline, "—") as "Deadline",
  next_actions as "Next Action"
FROM "03-Efforts"
WHERE status = "🔄active" OR status = "active"
SORT priority DESC, deadline ASC
```

### 🔥 On (Hot Projects)
```dataview
LIST
FROM "03-Efforts/On"
WHERE status = "🔄active" OR status = "active"
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
const today = dv.date('today');
const weekAgo = today.minus({days: 7});

const tasksCompleted = dv.pages().file.tasks
  .where(t => t.completed && t.completion && dv.date(t.completion) >= weekAgo)
  .length;

const tasksCreated = dv.pages().file.tasks
  .where(t => t.created && dv.date(t.created) >= weekAgo)
  .length;

const notesCreated = dv.pages()
  .where(p => p.file.ctime >= weekAgo)
  .length;

dv.paragraph(`
### Tento týden
- ✅ **Dokončeno úkolů:** ${tasksCompleted}
- ➕ **Vytvořeno úkolů:** ${tasksCreated}
- 📝 **Nových poznámek:** ${notesCreated}
- 📈 **Completion rate:** ${tasksCreated > 0 ? Math.round(tasksCompleted/tasksCreated*100) : 0}%
`);
```

---

## 🔗 Quick Links

| Akce | Odkaz |
|------|-------|
| ➕ Nový projekt | [[Effort/E-Full-Template]] |
| 📥 Quick Capture | [[Quick Capture - Inbox]] |
| 📅 Dnešní den | `= "[[" + dateformat(date(now), "yyyy-MM-dd") + "]]"` |
| 🔄 Weekly Review | [[🎯GTD Weekly Review]] |
| 📊 Dashboard | [[👁️Dashboard]] |

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
