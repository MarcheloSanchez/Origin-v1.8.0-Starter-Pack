<%*
const d = moment(tp.file.title, "YYYY-MM", true);
const ds = d.isValid() ? d : moment();
const monthStr     = ds.format("YYYY-MM");
const prevMonthStr = ds.clone().subtract(1, 'month').format("YYYY-MM");
const nextMonthStr = ds.clone().add(1, 'month').format("YYYY-MM");
const yearStr      = ds.format("YYYY");
const monthYear    = ds.format("MMMM YYYY");
const todayStr     = moment().format("YYYY-MM-DD");
-%>
---
title: "<% monthStr %>"
type: monthly
tags:
  - 📅monthly
created: "<% todayStr %>"
modified: "<% todayStr %>"
---

⬆️:: [[05-Calendar]]
[[05-Calendar/Monthly/<% prevMonthStr %>|⏪ Previous month]] · [[05-Calendar/Yearly/<% yearStr %>|📅 This year]] · [[05-Calendar/Monthly/<% nextMonthStr %>|Next month ⏩]]

# <% monthYear %>

## 🎯 Monthly Goals
*3-5 key outcomes planned*
- [ ]
- [ ]
- [ ]

## 🚀 Project Overview
*Project status and decisions*

```dataview
TABLE
status,
completion_percentage + "%" as "Progress",
priority as "Priority"
FROM "03-Efforts"
WHERE contains(string(created), "<% monthStr %>") OR contains(string(modified), "<% monthStr %>")
SORT priority DESC, completion_percentage DESC
```

## 🏠 Area Health Check
*Monthly overview of all life domains*

```dataview
TABLE
priority as "Priority",
last_review as "Last Review",
review_frequency as "Frequency"
FROM "02-Dots/200-Areas"
WHERE type = "area"
SORT priority DESC
```


### Notes from Area Review
*Findings from monthly area review*

## 📊 Monthly Metrics
**Completed projects**:
**New knowledge captured**:
**Areas advanced**:
**Overall energy**: ⭐⭐⭐⭐⭐

## 🎉 Wins and Achievements
*What went exceptionally well*

## 🔧 Identified Improvements
*What to adjust or change*

## ⚡ Next Month Setup
*Preparation for the upcoming month*
- [ ] Review areas needing attention
- [ ] Plan new projects or adjust existing ones
- [ ] Update priorities based on this month

---
*<% monthYear %> | Status: 🔄active | Next review: <% nextMonthStr %>*
