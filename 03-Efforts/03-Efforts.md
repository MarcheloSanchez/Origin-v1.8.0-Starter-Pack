---
up: "[[🏡Home]]"
in:
  - "[[Views]]"
title: 03-Efforts
type: moc
fileClass: moc
tags:
  - 🗺️MOC
status: 🔄active
created: 2025-10-12
modified: 2025-10-12
cssclasses:
  - wide-page
obsidianUIMode: preview
---
⬆️:: [[🏡Home]]

[[+About Effortsℹ️]]
[[E-Full-Template|Click here for template]]
```button
name New Effort 
type command
action QuickAdd: Effort 
```
# Features
Statusy a fáze — On / Ongoing / Simmering / Sleeping (sekce s query)
Kanban & řízení práce — odkazy na boardy + [[✅My PKM Tasks]] přehledy
Next Actions & Priority — rychlé seznamy akcí (Tasks queries)

---

# Query 

```base
filters:
  and:
    - type == "effort"
    - status != "📦archived"
properties:
  title:
    displayName: Title
  status:
    displayName: Status
  priority:
    displayName: Priority
  due:
    displayName: Due
  estimated_effort:
    displayName: Est Effort
views:
  - type: cards
    name: 📥 Inbox
    filters:
      and:
        - status == "📥inbox"
    titleProperty: title
    captionProperties:
      - priority
      - due
      - estimated_effort
  - type: cards
    name: 🔄 Active
    filters:
      and:
        - status == "🔄active"
    titleProperty: title
    captionProperties:
      - priority
      - due
      - estimated_effort
  - type: cards
    name: ⏳ Waiting
    filters:
      and:
        - status == "⏳waiting"
    titleProperty: title
    captionProperties:
      - priority
      - due
      - estimated_effort
  - type: cards
    name: ✅ Completed
    filters:
      and:
        - status == "✅completed"
    titleProperty: title
    captionProperties:
      - priority
      - due
      - estimated_effort

```

## Effort Query 


![[_Efforts_Data.base#All Efforts]]

```dataview
TABLE WITHOUT ID
"🚀 " + title as "Project",
priority, due, next_action
FROM "03-Efforts"
WHERE type="effort" AND status = "🔄active"
SORT priority desc, due asc
```

