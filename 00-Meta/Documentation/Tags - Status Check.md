---
up: "[[🏷️My PKM Tags]]"
in:
  - "[[Views]]"
title: 🏷️Tags - Status Check
type: system
tags:
  - 📶performance
  - 📊dashboard
created: 2026-03-02
modified: 2026-03-02
related:
  - "[[Performance Metrics]]"
cssclasses:
  - wide-page
obsidianUIMode: preview
---

⬆️:: [[🏷️My PKM Tags]]

## 💡 **How to Read Health Indicators**

|Icon|Meaning|Recommended Action|
|---|---|---|
|🔴 **Low (Underused)**|Tag appears in <3 notes|Consider merging or deleting|
|🟡 **Moderate**|Tag used 3–10 times|Monitor; standard frequency|
|🟢 **Healthy**|Tag used in >10 notes|Stable, widely adopted|
|⚫ **Unknown**|Not yet tracked|Add to next audit|

```dataviewjs
const allTags = dv.pages().flatMap(p => p.file.tags);
const tagUsage = {};
allTags.forEach(t => tagUsage[t] = (tagUsage[t] || 0) + 1);
const total = Object.values(tagUsage).reduce((a,b)=>a+b,0);
const unique = Object.keys(tagUsage).length;
const low = Object.values(tagUsage).filter(v => v < 3).length;
const moderate = Object.values(tagUsage).filter(v => v >=3 && v <=10).length;
const healthy = Object.values(tagUsage).filter(v => v >10).length;
dv.paragraph(`🏷️ **Total Tags Used:** ${total}`);
dv.paragraph(`🔁 **Unique Tags:** ${unique}`);
dv.paragraph(`🔴 **Low:** ${low} | 🟡 **Moderate:** ${moderate} | 🟢 **Healthy:** ${healthy}`);
dv.paragraph(`📊 **Average Tags per Note:** ${(total / dv.pages().length).toFixed(2)}`);
```

---

## 🏷️ Tag Usage Overview

```dataview
TABLE WITHOUT ID
tag as "🏷️ Tag",
length(rows) as "Usage Count",
join(rows.file.link, ", ") as "Files Using It"
FROM ""
FLATTEN file.tags as tag
WHERE !contains(tag, "system")
GROUP BY tag
SORT length(rows) DESC
LIMIT 30
```

---

## ⚠️ Orphan Tags (< 3 uses)

```dataview
TABLE WITHOUT ID
tag as "Tag",
length(rows) as "Usage Count"
FROM ""
FLATTEN file.tags as tag
GROUP BY tag
WHERE length(rows) < 3
SORT length(rows) ASC
LIMIT 20
```

---

## 🗒️ Over-Tagged Notes (> 10 tagů)

```dataview
TABLE WITHOUT ID
file.link as "Note",
length(file.tags) as "Count"
FROM ""
WHERE length(file.tags) > 10
SORT length(file.tags) DESC
LIMIT 15
```

