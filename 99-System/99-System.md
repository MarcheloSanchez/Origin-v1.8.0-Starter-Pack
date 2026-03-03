---
up: "[[🏡Home]]"
in:
  - "[[Views]]"
title: PKM Metadata Standards
type: moc
fileClass: moc
tags:
  - ⚙️system
  - 🗺️MOC
  - 📋documentation
status: 🔄active
created: 2025-09-30
modified: 2025-09-30
related:
  - "[[🏛️My PKM Governance]]"
  - "[[🔁My PKM Workflows]]"
  - "[[+About Templatesℹ️]]"
---

⬆️:: [[🏡Home]]

>The **Systems** folder is a place for technical notes, code snippets, automation scripts, and integration documentation. It might include configuration files, documentation for your productivity setups, or instructions for how different tools in your “second brain” connect (for example, how you integrate Obsidian with other apps, or scripts that periodically backup or format notes). By isolating these in a Systems folder, you acknowledge they support your knowledge system but are not themselves part of your knowledge content.

# ⚙️ 99 System — Overview
## 🧩 Templates & Templater
[[+About Templatesℹ️]] | [[Templates]]
- Auto‑fill YAML, context tagging, maturity rules
## 📊 Dashboards & Queries
- Global dashboards note
- [[🔍My PKM Queries]] - [[👁️Dashboard]] - [[🧹Cleaning Lady]] - [[🌱Incubator]] - [[➕Add]] - [[Relate]] - [[Communicate]]
## 🧰 Scripts & Automations
- QuickAdd capture flows
- MetaEdit bulk updates
- Schema - [[🔢My PKM Metadata#📊 Universal Metadata Schema|Metadata Schema]]
- Hotkeys & zkratky — [[MOC Hotkeys]], [[Visual hotkeys]]
## 🧼 Maintenance
- [[CHANGELOG]] • [[BACKLOG]]
- Plugin list sync & updates
- Standardy & konvence — [[Naming convention Handbook]], [[Icon Package]]

#🌱develop  - Maintenance scripts - name for the note? 

# Missing Metadata Query 
> LIMITED TO 10
```dataview
TABLE WITHOUT ID file.name as "Note", 
!status as "❌ Missing status", 
!type as "❌ Missing type", 
!tags as "❌ Missing tags"
FROM ""
WHERE !status OR !type OR !tags
SORT file.name ASC
LIMIT 10
```


### **Orphan Notes Query:**

```dataview-working
LIST  
FROM ""  
WHERE length(file.inlinks) = 0 AND length(file.outlinks) = 0  
AND !contains(file.path, "Templates")  AND !contains(file.folder, "99-System") AND !contains(file.folder, "06-Archive")
SORT file.name
LIMIT 10
```

#🧹tidy - Update so the Bases does the same. Efficiency garanted
![[_System_data.base]]


*Poslední aktualizace: `= date(now)`*
