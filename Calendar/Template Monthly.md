---
title: "{{date:YYYY-MM}}"
type: monthly
tags:
  - 📅monthly
created: "{{date:YYYY-MM-DD}}"
modified: "{{date:YYYY-MM-DD}}"
---

⬆️:: [[05-Calendar]]
[[{{date-1M:YYYY-MM}}|⏪ Minulý měsíc]] · [[{{date:YYYY}}|📅 Tento rok]] · [[{{date+1M:YYYY-MM}}|Příští měsíc ⏩]]

# {{date:MMMM YYYY}}

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
WHERE contains(string(created), "{{date:YYYY-MM}}") OR contains(string(modified), "{{date:YYYY-MM}}")  
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
*{{date:MMMM YYYY}} | Status: 🔄active | Příští přehled: {{date+1M:YYYY-MM}}*

