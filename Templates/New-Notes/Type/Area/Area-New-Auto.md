<%*
const areaName = await tp.system.prompt('Area name (e.g., Health, Finance, Career)');
const priority = await tp.system.suggester(['high','medium','low'], ['high','medium','low']);
const review_frequency = await tp.system.suggester(['monthly','quarterly','as-needed'], ['monthly','quarterly','as-needed']);
%>
---
up: "[[MOC - Areas]]"
in: "[[200-Areas]]"
title: Area – <% areaName %>
aliases: []
type: area
fileClass: Area
tags:
  - 🏠area
status: 🔄active
maturity: 🌿sapling
priority: <% priority %>
processing_priority: normal
action_required: false
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
last_review: <% tp.date.now("YYYY-MM-DD") %>
review_frequency: <% review_frequency %>
related:
  - "[[MOC - Areas]]"
---

# 🏠 Area – <% areaName %>

## 🎯 Purpose & Vision
*Why this area matters and what "thriving" looks like here*

## 📊 Current Metrics
| Metric | Current | Target | Trend |
|--------|---------|--------|-------|
| | | | |
| | | | |

## 🚀 Active Efforts
*Current projects advancing this area:*
- [[]] - 
- [[]] - 

## 🔗 Key Knowledge
*Important dots and insights:*
- [[]] - 
- [[]] - 

## ✅ Next Focus Areas
*Top 2-3 priorities for next review period:*
1. 
2. 
3. 

## 📝 Quick Notes
*Ongoing thoughts, ideas, wins, concerns*

## 🔄 Review Notes
*Last review findings and decisions*

---
*Area health: 🔄active | Priority: <% priority %> | Next review: <% review_frequency %>*
