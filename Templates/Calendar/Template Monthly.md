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
[[05-Calendar/Monthly/<% prevMonthStr %>|⏪ Minulý měsíc]] · [[05-Calendar/Yearly/<% yearStr %>|📅 Tento rok]] · [[05-Calendar/Monthly/<% nextMonthStr %>|Příští měsíc ⏩]]

# <% monthYear %>

## 🎯 Měsíční cíle
*3-5 hlavních výsledků plánovaných*
- [ ]
- [ ]
- [ ]

## 🚀 Přehled projektů
*Status projektů a rozhodnutí*

```dataview
TABLE
status,
completion_percentage + "%" as "Pokrok",
priority as "Priorita"
FROM "03-Efforts"
WHERE contains(string(created), "<% monthStr %>") OR contains(string(modified), "<% monthStr %>")
SORT priority DESC, completion_percentage DESC
```

## 🏠 Health Check oblastí
*Měsíční přehled všech životních domén*

```dataview
TABLE
priority as "Priorita",
last_review as "Poslední přehled",
review_frequency as "Frekvence"
FROM "02-Dots/200-Areas"
WHERE type = "area"
SORT priority DESC
```


### Poznámky z přehledu oblastí
*Zjištění z měsíčního přehledu oblastí*

## 📊 Měsíční metriky
**Dokončené projekty**:
**Nové znalosti zachycené**:
**Pokročilé oblasti**:
**Celková energie**: ⭐⭐⭐⭐⭐

## 🎉 Vítězství a úspěchy
*Co šlo výjimečně dobře*

## 🔧 Identifikovaná vylepšení
*Co upravit nebo změnit*

## ⚡ Nastavení příštího měsíce
*Příprava na nadcházející měsíc*
- [ ] Zkontrolovat oblasti potřebující pozornost
- [ ] Naplánovat nové projekty nebo upravit stávající
- [ ] Aktualizovat priority na základě tohoto měsíce

---
*<% monthYear %> | Status: 🔄active | Příští přehled: <% nextMonthStr %>*
