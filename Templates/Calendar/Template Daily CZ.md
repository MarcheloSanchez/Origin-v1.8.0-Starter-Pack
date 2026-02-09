---
title: "{{date:YYYY-MM-DD}}"
type: daily
tags:
  - 📅daily
created: "{{date:YYYY-MM-DD}}"
modified: "{{date:YYYY-MM-DD}}"
energy:
mood:
sleep:
---

⬆️:: [[05-Calendar]] | [[🎯GTD Command Center]]
[[{{date-1d:YYYY-MM-DD}}|⏪ Včera]] · [[{{date:gggg-[W]ww}}|📅 Tento týden]] · [[{{date+1d:YYYY-MM-DD}}|Zítra ⏩]]

# {{date:dddd, D. MMMM YYYY}}

## 🌅 Morning Check-in
energy:: ⚡/🔋/🪫
mood:: 😊/😐/😔
sleep:: h

---

## 🎯 Today's Focus (MIT - Most Important Tasks)

> *Pokud dnes udělám JEN tyto 3 věci, bude to úspěšný den:*

- [ ] 🔴 **#1:**
- [ ] 🟡 **#2:**
- [ ] 🟢 **#3:**

---

## 📋 Next Actions for Today

### ⚠️ Overdue & Due Today
```tasks
not done
(due before {{date:YYYY-MM-DD}}) OR (due on {{date:YYYY-MM-DD}})
sort by priority
```

### 💻 @computer
- [ ]

### 📱 @phone
- [ ]

### 👤 @people
- [ ]

---

## 📥 Inbox / Quick Capture
*Nápady, úkoly, myšlenky během dne → zpracuj večer*

-

---

## 🚀 Active Projects Check-in

```dataview
TABLE WITHOUT ID
  file.link as "Projekt",
  next_actions as "Next Action",
  due as "Due"
FROM "03-Efforts"
WHERE status = "🔄active"
LIMIT 5
```

---

## 🤝 Meetings & Calls

| Čas | S kým | Téma | Action Items |
|-----|-------|------|--------------|
|     |       |      |              |

---

## 📝 Notes & Log

### Poznámky


### Vyřešené problémy


### Naučené


---

## 🌆 Evening Review (5 min)

### ✅ Done Today
- [ ]
- [ ]
- [ ]

### 🎯 Wins
> Co se povedlo?

highlight::

### 🚧 Blockers
> Co mi bránilo?


### ⏳ Waiting For
> Na co čekám?


---

## 💭 Reflection

### 🌞 Gratitude (3 věci)
gratitude::
1.
2.
3.

### 💡 Idea of the Day


### 🔗 Connections Made
*Propojení mezi myšlenkami, lidmi, koncepty*


---

## ⚡ Tomorrow Setup

### 🎯 Top 3 for Tomorrow
- [ ]
- [ ]
- [ ]

### 📅 Scheduled
- [ ]

---

## 📊 Day Score

| Metrika | Skóre |
|---------|-------|
| Produktivita | /10 |
| Energie | /10 |
| Focus | /10 |
| Mood | /10 |

---
*Last update: {{time:HH:mm}}* | [[{{date+1d:YYYY-MM-DD}}|Zítra →]]
