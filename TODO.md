---
title: ✅ List of tasks
type: moc
status: 🔄active
tags:
  - 📊dashboard
  - 🏠system
  - 📋review
  - ✅tasks
created: 2025-09-29
modified: 2025-09-29
related:
  - "[[🏡Home]]"
  - "[[🔁My PKM Workflows]]"
  - "[[✅My PKM Tasks]]"
  - "[[🔍My PKM Queries]]"
---
⬆️:: [[✅My PKM Tasks]]

> This is a place to view every ch[[]]eckbox in vault 
> This is a place to enter new tasks that comes up
# 🧐Focus⚡


### Group tasks by file

```dataview
TASK
FROM ""
GROUP BY file.link
LIMIT 5
```

## ⏳ Inbox — new today
(tasks not done path includes "Master TODO" false)
```tasks
not done
path does not include "Master TODO"
created today
```
## 🗓️ Scheduled / Waiting
(tasks not done due date)
```tasks
not done
has due date
```
## 🏁 Done this week
(tasks done on week this week)

```tasks
done
done on week this week
```