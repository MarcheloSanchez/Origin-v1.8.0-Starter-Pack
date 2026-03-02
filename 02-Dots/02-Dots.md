---
up: "[[🏡Home]]"
in: "[[Views]]"
title: 02-Dots
type: moc
fileClass: moc
tags:
  - 🗺️MOC
status: 🔄active
processing_priority: normal
completeness: comprehensive
coverage_areas:
created: 2025-09-10
modified: 2025-09-10
last_review: 2025-09-10
review_frequency: weekly
estimated_effort:
capture_method: manual
related:
cssclasses:
  - wide-page
obsidianUIMode: preview
---

⬆️:: [[🏡Home]]

[[+ About Dotsℹ️]]
```button
name New Atomic
type command
action QuickAdd: Atomic 
```
# 💡 02 Dots — Overview
- [[100-Atomics]]
	- [[Concepts]]
```button
name New Concept
type command
action QuickAdd: Atomic
```
- [[Ideas]]
```button
name New Idea
type command
action QuickAdd: New Quick Idea
```
- [[Quotes]]
- [[Statements]]
- [[Things]]
- [[200-Areas]]
```button
name New Area
type command
action QuickAdd: Area
```
- [[210-Health]]
- [[220-Finance]]
- [[230-Career]]
- [[240-Relationships]]
- [[250-Personal]]
- [[300-People]]
```button
name New Person
type command
action QuickAdd: Person
```
- [[400-Places]]
```button
name New Place
type command
action QuickAdd: Place
```
- [[500-Tools]]
```button
name New Tool
type command
action QuickAdd: Tool
```
- [[X]]

![[_Dots_Data.base]]

## 🆕 Recent Dots (30 days)
```dataview
TABLE created, maturity
FROM "02-Dots"
WHERE created >= date(today) - dur(30 days)
SORT created DESC
```

## 🌱 Maturity distribution
```dataview
TABLE maturity, length(rows) AS count
FROM "02-Dots"
WHERE type = "atomic"
GROUP BY maturity
SORT count DESC
```
## 🔗 Dots needing links (manual)
> Open random Dots and add 1–2 connections.

---
# Features
Témata & domény — tematické indexy (např. Communication, Body Language)
**Stupeň zralosti (maturity)** — sekce: 📤 seed → 🍓 fruit (Dataview výběry)
Související projekty — „Použito v“ → odkazy na [[03-Efforts]]
Zdrojová stopa — „Podpořeno z“ → odkazy na [[04-Sources]]
Kurátorské listy — „Best of“/„Evergreen“ kolekce
Poznámky k práci s pojmy — odkaz na standardy metadat/taxonomií [[🔢My PKM Metadata]]