#status/📦archived 
---
# Co se zvládlo z minulého týdnu?
---
Jakým výzvám jsem čelil a jak jsem je překonal?

Co jsem se tento týden naučil?

**Jak jsem zvládl/a mé různé role a jak se cítím ohledně mého přístupu a chování v každé z nich?** (partner, syn, tiskař, tester, kamarád, ...)

# Co je v plánu na tento týden?
---
Jak se mohu zlepšit pro příští týden?

## Práce
- 

## Osobní život
- 

# Tracker
---

## Osobní přehled
---

```dataview  
TABLE WITHOUT ID  
	file.link as "Den",   
	mood AS "🌞",
	choice(sleep > 7, "🟩", "🟥") AS "💤", 
	choice(journal, "🟩", "🟥") AS "📓",
	choice(meditation, "🟩", "🟥") AS "🧘" 
FROM "Calendar/Notes/Daily"
where week = "Invalid date"
SORT file.day ASC  
```
## Přehled návyků 
---
```dataview  
TABLE WITHOUT ID  
	file.link as "Den",   
	choice(flextraining, "🟩", "🟥") AS "🤸",
	choice(gaming < 4, "🟩", "🟥") AS "🎮", 
	choice(commskills, "🟩", "🟥") AS "🔊",
	workout AS "💪", 
	printed AS "🖨️",
	choice(AI, "🟩", "🟥") AS "🤖" 
FROM "Calendar/Notes/Daily"
where week = "Invalid date"
SORT file.day ASC  
```
## Domácnost
---
```dataview  
TABLE WITHOUT ID  
	file.link as "Den",   
	choice(watering, "🟩", "🟥") AS "🌻",
	choice(photopurge, "🟩", "🟥") AS "🛑📷",
	choice(povlečení, "🟩", "🟥") AS "🛏️",
	choice(vytírání, "🟩", "🟥") AS "🧹💦",
	choice(vysávání, "🟩", "🟥") AS "🧹🌫️",
	choice(prach, "🟩", "🟥") AS "🌫️",
	choice(pračka, "🟩", "🟥") AS "🫧",
	choice(nádobí, "🟩", "🟥") AS "🍽️",	
	choice(okna, "🟩", "🟥") AS "🪟",
	choice(odpadky, "🟩", "🟥") AS "🚮",
	choice(ručníky, "🟩", "🟥") AS "💦"
FROM "Calendar/Notes/Daily"
where week = "Invalid date"
SORT file.day ASC  
```



