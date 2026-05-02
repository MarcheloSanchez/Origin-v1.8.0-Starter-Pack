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
modified: 2026-03-22
last_review: 2025-09-10
review_frequency: weekly
estimated_effort:
capture_method: manual
related:
cssclasses:
  - wide-page
obsidianUIMode: preview
---
#🎯priority-high 
⬆️:: [[🏡Home]]

[[+ About Dotsℹ️]]

## Button Menu
```button
name New Area
type command
action QuickAdd: Area
```
```button
name New Idea
type command
action QuickAdd: New Quick Idea
```
```button
name New Atomic
type command
action QuickAdd: Atomic 
```
```button
name New Person
type command
action QuickAdd: Person
```
```button
name New Place
type command
action QuickAdd: Place
```
```button
name New Tool
type command
action QuickAdd: Tool
```
# 💡 02 Dots — Overview
- "[[Atomics]]"
	- [[Concepts]]
- [[Ideas]]
- [[Quotes]]
- [[Statements]]
- [[Things]]
- "[[Areas]]"
- [[210-Health]]
- [[220-Finance]]
- [[230-Career]]
- [[240-Relationships]]
- [[250-Personal]]
- "[[People]]"
- "[[Places]]"
- "[[Tools]]"
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
TABLE length(rows) AS count
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