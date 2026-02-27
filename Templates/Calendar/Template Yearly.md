<%*
const d = moment(tp.file.title, "YYYY", true);
const ds = d.isValid() ? d : moment();
const yearStr     = ds.format("YYYY");
const prevYearStr = ds.clone().subtract(1, 'year').format("YYYY");
const nextYearStr = ds.clone().add(1, 'year').format("YYYY");
const todayStr    = moment().format("YYYY-MM-DD");
-%>
---
title: "<% yearStr %>"
type: yearly
tags:
  - 📅yearly
created: "<% todayStr %>"
modified: "<% todayStr %>"
---

⬆️:: [[05-Calendar]]
[[05-Calendar/Yearly/<% prevYearStr %>|⏪ <% prevYearStr %>]] · [[05-Calendar/Yearly/<% nextYearStr %>|<% nextYearStr %> ⏩]]

# Rok <% yearStr %>

## 🎯 Roční vize
*Hlavní téma a směr pro tento rok*

## 📊 Ročního přehled oblastí
*Kompletní hodnocení všech životních domén*

```dataview
TABLE
priority as "Priorita",
maturity as "Zralost",
review_frequency as "Frekvence"
FROM "02-Dots/200-Areas"
WHERE type = "area"
SORT priority DESC
```


## 🏆 Hlavní úspěchy roku
*Největší vítězství a milníky*

## 📚 Naučené lekce
*Klíčové poznatky a růst*

## 🔮 Plány pro příští rok
*Směr a priority pro <% nextYearStr %>*

---
*Rok <% yearStr %> | Celkové hodnocení: ⭐⭐⭐⭐⭐*
