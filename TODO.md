---
title: ✅ Task Hub
type: dashboard
status: 🔄active
tags:
  - 📊dashboard
  - 🏠system
  - 📋review
  - ✅tasks
  - 🎯gtd
created: 2025-09-29
modified: 2026-02-24
related:
  - "[[🏡Home]]"
  - "[[🔁My PKM Workflows]]"
  - "[[✅My PKM Tasks]]"
  - "[[🔍My PKM Queries]]"
cssclasses:
  - wide-page
---
⬆️:: [[✅My PKM Tasks]]

> Your single task action hub — what to do, when, and by context.

---

## 🔥 Focus Now

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

## ⏳ Inbox — New Today

```tasks
not done
path does not include "Master TODO"
created today
```

---

## 🗂️ All Tasks by File

```dataview
TASK
FROM ""
GROUP BY file.link
LIMIT 5
```

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

## 🏁 Done This Week

```tasks
done
done on week this week
```
