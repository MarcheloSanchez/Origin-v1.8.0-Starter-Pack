---
up: "[[🏡Home]]"
in:
  - "[[Views]]"
created: 2025-10-13
related:
cssclasses:
  - wide-page
obsidianUIMode: preview
---
⬆️:: [[🏡Home]]

[[+About Calendarℹ️]]
```button
name New Daily (Today)
type command
action Periodic Notes: Open daily note
```
## Templates
[[Template Daily]]
hmm? [[Week Review v2]]
[[Template Weekly]]
[[Template Monthly]]
[[Template Yearly]]

# Features
Denní poznámky — „05 Calendar/Daily“ + tlačítka/šablony (link)
Týdenní review — checklists + panely dokončeného / stagnujícího
Měsíční přehledy — archiv, refaktoring struktury, zálohy
Produktivita & metriky — [[Performance Metrics]] (tag coverage, capture rate)
Plánované rituály — odkazy na „Review scripts/templaty“ v [[System & Automation]]
Highlight stream — výběr „highlight::“ z deníků (Dataview panel)

## Rollup last 14 days of Highlight
```dataview
TABLE WITHOUT ID file.link AS "Day", highlight AS "Highlights"
FROM "05-Calendar/Daily"
WHERE date(file.name) >= date(today) - dur(14 days)
SORT file.name DESC
```

![[_Calendar_Data.base]]