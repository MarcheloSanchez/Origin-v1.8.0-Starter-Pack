---
title: 📊 Dashboard
type: dashboard
status: 📦archived
tags:
  - 📊dashboard
  - 🏠system
  - 📋review
created: 2025-09-29
modified: 2025-09-29
related:
  - "[[🏡Home]]"
  - "[[🔁My PKM Workflows]]"
  - "[[✅My PKM Tasks]]"
  - "[[🔍My PKM Queries]]"
---

> [!orbit] **🧭 Command Center**
> [[🏡 Home]] · [[🔁My PKM Workflows|🔁 Workflows]] · [[✅My PKM Tasks|✅ Tasks]] · [[🔍My PKM Queries|🔍 Queries]] · [[05-Calendar|📅 Calendar]] · #🧹tidy [[+About Areasℹ️|🏠 Areas]] · [[+ About MOCs ℹ️|🗺️ MOCs]] · [[📊 Performance]]

# 🏠 PKM Home Dashboard

*Your personal knowledge management command center*

---

## 🎯 Quick Actions

| Action | Shortcut | Template |
|--------|----------|----------|
| 📥 **Quick Capture** | `Ctrl+N` | [[99-System/Templates/Quick-Capture]] |
| 📝 **Daily Note** | `Ctrl+D` | [[99-System/Templates/Daily-Note]] |
| 🚀 **New Project** | `Ctrl+P` | [[99-System/Templates/Project-Note]] |
| 📚 **Process Source** | `Ctrl+S` | [[99-System/Templates/Source-Template]] |
| 💡 **Create Atomic** | `Ctrl+A` | [[99-System/Templates/Atomic-Note]] |

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

#🧹tidy 
[[+Inbox]] · [[00 Inbox]] · [[Obsidian Hotkeys]]

---

# 📆Agenda
> [!Multi-column] 
> 
> > [!award]+ ##  `$= '[['+moment().format("YYYY-MM-DD")+'|Dnes]]'`  
> 
> > [!attention]+ ##  `$= '[['+moment().format("gggg-[W]ww")+'|Týden]]'`  
> 
> > [!calendar]+ ##  `$= '[['+moment().format("YYYY-MM")+'|Měsíc]]'`





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
const activeEfforts = dv.pages('"Efforts"')
  .where(p => ['active','in_progress','blocked','on_hold'].includes((p.status||'').toLowerCase()))
  .length;

// Inbox count
const inboxCount = dv.pages('"00 Inbox"').length;

// Weekly highlights (denní poznámky s `highlight::`)
const weekStart = today.startOf('week');
const weeklyHighlights = dv.pages('"05 Calendar/Daily"')
  .where(p => p.file.day && p.file.day >= weekStart && p.highlight)
  .length;

dv.table(
  ["📌 Overdue", "📅 Due dnes", "🧭 Aktivní projekty", "📥 Inbox", "✨ Highlights (týden)"],
  [[overdue, dueToday, activeEfforts, inboxCount, weeklyHighlights]]
);
```

**Rychlé akce:**  
- Otevřít dnešní den: [[<% tp.date.now("YYYY-MM-DD") %>]]  
- Zpracovat Inbox → [[Processing Inbox Playbook]]  
- Týdenní review → [[Weekly Review Playbook]]

---
### Last Opened
```dataviewjs
dv.list(app.workspace.recentFileTracker.lastOpenFiles.map(x=>dv.fileLink(x)).slice(0, 10))
```
## ☀️ Dnes & nejbližší

**Due/Overdue (Tasks)**
```tasks
not done
due before today
sort by due ascending
```

```tasks
not done
due today
sort by due ascending
```

**Dnešní highlights (Daily)**
```dataview-snippet
TABLE highlight AS "Highlight"
FROM "05-Calendar/Daily"
WHERE file.day = date(today) AND highlight
SORT file.name ASC
```

**Nedávno upravené (24 h)**
```dataview-snippet
TABLE file.link AS "Soubor", file.mtime AS "Upraveno"
FROM ""
WHERE file.mtime >= (date(now) - dur(1 day))
AND !contains(file.path, ".obsidian")
AND !startsWith(file.path, "Attachments")
SORT file.mtime DESC
```
---

## 📆 Tento týden

**Aktivní projekty (Efforts)**
```dataview-snippet
TABLE file.link AS "Projekt", status, priority, updated
FROM "Efforts"
WHERE contains(["active","in_progress","blocked","on_hold"], status)
SORT updated DESC
```

**Splněné úkoly (Tasks)**
```tasks
done this week
sort by done descending
```

**Týdenní highlights (Daily)**
```dataview-snippet
TABLE file.day AS "Den", highlight
FROM "05-Calendar/Daily"
WHERE file.day >= date(today).week AND highlight
SORT file.day ASC
```

---

## 📥 Inbox (zpracování)

```dataview-snippet
TABLE file.link AS "Položka", file.mtime AS "Naposledy"
FROM "+"
SORT file.mtime DESC
LIMIT 10
```

> Zpracováno = **přesun** do cílové složky (bez extra značky).

---

## 🎯 Kontextové panely (podle tagů)

**Testing**
```dataview-snippet
TABLE file.link AS "Testing", file.mtime AS "Upraveno"
FROM ""
WHERE contains(file.tags, "#testing")
SORT file.mtime DESC
LIMIT 20
```

**3D Print**
```dataview-snippet
TABLE file.link AS "3D Print", type, status, file.mtime AS "Upraveno"
FROM ""
WHERE contains(file.tags, "#3dprint")
SORT file.mtime DESC
LIMIT 20
```

> Vstupní rozcestníky: [[Testing MOC]] · [[3D Print MOC]] · [[Self-Development MOC]]

---
## 🛠️ Zdraví vaultu

**Sirotci (bez in/out links)**
```dataview-snippet
LIST  
FROM ""  
WHERE length(file.inlinks) = 0 AND length(file.outlinks) = 0  
AND !contains(file.path, "Templates")  AND !contains(file.folder, "99-System") AND !contains(file.folder, "06-Archive")
SORT file.name
LIMIT 10
```

**Stárnoucí projekty (14+ dní bez změny)**
```dataview
TABLE file.link AS "Projekt", status, file.mtime AS "Naposledy"
FROM "Efforts"
WHERE contains(["active","in_progress"], status)
AND file.mtime <= (date(today) - dur(14 days))
SORT file.mtime ASC
```

**Velké soubory — orientačně podle přípon**
```dataview
TABLE file.extension AS "Přípona", length(rows) AS "Počet"
FROM ""
WHERE contains(["png","jpg","jpeg","pdf","stl"], file.extension)
GROUP BY file.extension
SORT Počet DESC
```

**Duplicitní názvy**
```dataview
TABLE file.name AS "Název", rows.file.link AS "Soubory"
FROM ""
GROUP BY file.name
WHERE length(rows) > 1
SORT length(rows) DESC, file.name ASC
```

---

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

**Splněné úkoly — tento týden (Tasks)**
```tasks
done this week
short mode
```

---

## ⚡ Quick actions
- New Atomic → [[Templates Index]]  
- New Effort (project) → šablona `effort`  
- New MOC → šablona rozcestníku  
- QuickAdd → [[QuickAdd Macros]] · Templater → [[Templater Scripts]]

---

### Poznámky k implementaci
- **Efforts lifecycle**: `idea → planned → active → in_progress → (blocked/on_hold) → done → archived`  
- **Priority**: `P1 | P2 | P3` (volitelně přidej `SORT priority ASC` v tabulkách projektů).  
- **Review**: podporován `status: review` **i** `review: YYYY-MM-DD` (ponech dle potřeby).  
- **Kontext**: panely běží přes **tagy** (např. `#testing`, `#3dprint`); orientace přes MOC odkazy.  
- **Inbox**: označení „zpracováno“ řeší samotný **přesun** (bez metadat).
