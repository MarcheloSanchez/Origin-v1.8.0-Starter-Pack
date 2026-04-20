---
title: Weekly Report - Week 16, 2026
type: moc
status: 🔄active
created: 2026-04-16
week_number: 16
year: 2026
tags:
  - 📊report
  - 📅weekly
  - 📋review
period_start: 2026-04-09
period_end: 2026-04-16
---

⬆️:: [[05-Calendar]]

# Weekly Report - Week 16, 2026

> **Period**: 2026-04-09 → 2026-04-16
> **Generated**: 2026-04-16 22:38

---

## 📊 Week Overview

### Key Metrics

```dataview
TABLE
  length(rows) as "Count"
FROM ""
WHERE created >= date(2026-04-09)
  AND created <= date(2026-04-16)
GROUP BY type
SORT length(rows) DESC
```

**Summary:**
- **Total Notes Created**: `= length(list(filter(file.lists.outlinks, (x) => date(x.created) >= date(2026-04-09))))`
- **Tasks Completed**: `= length(list(filter(file.tasks, (t) => t.completed AND date(t.completion) >= date(2026-04-09))))`
- **Active Projects**: `= length(list(filter(file.lists, (p) => p.status = "🔄active" AND p.type = "project")))`

---

## 📝 Notes Created This Week

```dataview
TABLE
  type as "Type",
  status as "Status",
  created as "Created"
FROM ""
WHERE created >= date(2026-04-09)
  AND created <= date(2026-04-16)
SORT created DESC
LIMIT 50
```

---

## ✅ Tasks Completed This Week

```dataview
TASK
FROM ""
WHERE completed
  AND completion >= date(2026-04-09)
  AND completion <= date(2026-04-16)
GROUP BY file.link
SORT completion DESC
```

---

## 🚀 Active Projects Status

```dataview
TABLE
  status as "Status",
  priority as "Priority",
  file.mtime as "Last Modified"
FROM "03-Efforts"
WHERE status = "🔄active" OR status = "🔥on"
SORT priority DESC, file.mtime DESC
```

---

## 💡 New Ideas This Week

```dataview
LIST
FROM "02-Dots"
WHERE created >= date(2026-04-09)
  AND (contains(tags, "#💡atomic") OR type = "atomic")
SORT created DESC
LIMIT 20
```

---

## 📚 Sources Added This Week

```dataview
TABLE
  source_url as "URL",
  created as "Added"
FROM "04-Sources"
WHERE created >= date(2026-04-09)
SORT created DESC
LIMIT 10
```

---

## 📈 Progress Tracking

### Projects by Status

```dataview
TABLE
  length(rows) as "Count",
  round((length(rows) / length(list(filter(file.lists, (p) => p.type = "project")))) * 100, 1) + "%" as "% of Total"
FROM "03-Efforts"
WHERE type = "project"
GROUP BY status
SORT length(rows) DESC
```

### Notes by Maturity

```dataview
TABLE
  length(rows) as "Count"
FROM ""
WHERE maturity != null
GROUP BY maturity
SORT maturity ASC
```

---

## 🎯 Focus Areas This Week

### Most Active Tags

```dataview
TABLE
  length(rows) as "Usage Count"
FROM ""
WHERE created >= date(2026-04-09)
FLATTEN file.tags as tag
GROUP BY tag
SORT length(rows) DESC
LIMIT 10
```

### Most Modified Notes

```dataview
TABLE
  file.mtime as "Last Modified",
  type as "Type"
FROM ""
WHERE file.mtime >= date(2026-04-09)
SORT file.mtime DESC
LIMIT 15
```

---

## 🧹 Maintenance Items

### Notes Missing Metadata

```dataview
TABLE
  created as "Created"
FROM ""
WHERE !type OR !status OR !created
SORT created DESC
LIMIT 10
```

### Stale Active Items (>30 days no update)

```dataview
TABLE
  file.mtime as "Last Modified",
  round((date(now) - file.mtime).days, 0) + " days ago" as "Stale For"
FROM ""
WHERE status = "🔄active"
  AND file.mtime < date(now) - dur(30 days)
SORT file.mtime ASC
LIMIT 10
```

---

## 📝 Weekly Notes

<!-- Add manual observations here -->

### Highlights
-

### Challenges
-

### Learnings
-

### Next Week Focus
-

---

## 🔗 Related

- [[Weekly Report - Week 16, 2026|Previous Week]]
- [[Monthly Report - 2026-04|This Month]]
- [[05-Calendar]]

---

*Report generated using Dataview queries. Data accurate as of 2026-04-16 22:38.*

#📊report #📅weekly #📋review
