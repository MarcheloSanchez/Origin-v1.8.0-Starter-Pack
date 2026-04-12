---
title: 🧪 Life HQ — Experimental
type: 🏡Home
status: 🔄active
tags:
  - ⚙️system
  - 📊dashboard
created: 2026-04-12
modified: 2026-04-12
obsidianUIMode: preview
cssclasses:
  - wide-page
---

> [!orbit]- Quick Navigation
> **Hub:** [[🏡Home|🏡 Home]] • [[🧭 Review HQ|🧭 Review]] • [[+Inbox|📥 Inbox]] • [[TODO|✅ TODO]]
> **Drill-downs:** [[👁️Dashboard|📊 Dashboard]] • [[🎮Gamification Dashboard|🎮 Game]] • [[📈Performance Metrics|📈 Metrics]] • [[🔍My PKM Queries|🔍 Queries]]
> **Automation:** [[⚡ Automation Menu|⚡ Menu]] • `Ctrl+P` → Quick Process • 🤖 Smart Classify

# 🏡 Life HQ

> `$= "📅 " + moment().format("dddd D. MMMM YYYY")` · [Dnes →](obsidian://advanced-uri?commandid=periodic-notes%3Aopen-daily-note) · [Week →](obsidian://advanced-uri?commandid=periodic-notes%3Aopen-weekly-note) `$= "(" + moment().format("gggg-[W]ww") + ")"`

---

> [!Multi-column]
>
> > [!calendar]- 📅 Today
> > **[Open Daily Note →](obsidian://advanced-uri?commandid=periodic-notes%3Aopen-daily-note)**
> >
> > ```tasks
> > not done
> > due today
> > short mode
> > ```
>
> > [!award]- 🎯 Focus · `$= dv.pages('"03-Efforts/On"').length` on · `$= dv.pages('"03-Efforts/Ongoing"').length` ongoing
> >
> > ```dataview
> > TABLE WITHOUT ID file.link AS "", rank AS "↑"
> > FROM "03-Efforts/On"
> > SORT rank DESC
> > LIMIT 4
> > ```
>
> > [!hint]- ⚡ Quick Actions
> > [[⚡ Automation Menu#Action MENU#Capture|→ Open Automation Menu]]
> >
> > | | Shortcut |
> > |---|---|
> > | 📥 Capture | `Ctrl+N` |
> > | 📝 Daily | `Ctrl+Shift+D` |
> > | 🚀 Project | `Ctrl+P` |
> > | 💡 Atomic | `Ctrl+A` |
> > | 📚 Source | `Ctrl+S` |

---

> [!Training]- 🚀 Career & Productivity · `$= dv.pages('"03-Efforts/On"').length` on · `$= dv.pages('"03-Efforts/Ongoing"').length` ongoing · `$= dv.pages('"03-Efforts/On"').where(p => p.due && dv.date(p.due) < dv.date("today")).length` overdue · `$= dv.pages('"05-Calendar/Sessions"').where(p => p.file.mtime >= dv.date("today") - dv.duration("7 days")).length` sessions/wk
>
> ```dataview
> TABLE WITHOUT ID file.link AS "Effort", completion_percentage + "%" AS "Done", due AS "Due", next_actions AS "Next"
> FROM "03-Efforts/On"
> SORT completion_percentage ASC
> ```
>
> **All efforts →** ![[03-Efforts/_Efforts_Data.base]]
>
> **Sessions →** ![[05-Calendar/Sessions/_Sessions_Data.base]]

> [!attention]- 💪 Health · `$= dv.pages('"05-Calendar/Daily"').where(p => p.file.mtime >= dv.date("today") - dv.duration("7 days") && p.energy).length` energy logs/wk · `$= dv.pages('"05-Calendar/Daily"').where(p => p.file.mtime >= dv.date("today") - dv.duration("7 days") && p.mood).length` mood logs/wk
>
> ```dataview
> TABLE WITHOUT ID file.link AS "Day", energy AS "⚡ Energy", mood AS "😐 Mood", highlight AS "★ Highlight"
> FROM "05-Calendar/Daily"
> WHERE date >= date(today) - dur(7 days)
> SORT file.name DESC
> LIMIT 7
> ```
>
> **Links:** [[Health MOC]] · [[Habits Map]]

> [!Map]- 📚 Learning · `$= dv.pages('"04-Sources"').where(p => p.status === "reading").length` reading · `$= dv.pages('"04-Sources"').where(p => p.status === "queue").length` queued · `$= dv.pages('"02-Dots"').where(p => p.maturity === "🌱seedling").length` seedlings
>
> ![[04-Sources/_Sources_Data.base]]
>
> **Recent ideas →** ![[02-Dots/100-Atomics/Ideas/_Ideas_Data.base]]

> [!COMPASS]- 👤 Personal · `$= dv.pages('"02-Dots/300-People"').length` people · `$= dv.pages('"02-Dots/200-Areas"').length` areas · `$= dv.pages('"03-Efforts"').where(p => p.tags && p.tags.includes("personal")).length` goals
>
> ![[02-Dots/300-People/_People_Data.base]]
>
> **Areas →** ![[02-Dots/200-Areas/_Areas_Data.base]]
>
> **Links:** [[Life Map]] · [[Finance MOC]] · [[People Map]]

> [!Blocks]- 🛠️ Tools & System · `$= dv.pages('"+Inbox"').length` inbox · `$= dv.pages().where(p => p.file.mtime >= dv.date("today")).length` modified today · `$= dv.pages('"02-Dots"').where(p => p.maturity === "🌱seedling").length` seedlings
>
> | Metric | |
> |---|---|
> | 📥 Inbox | `$= dv.pages('"+Inbox"').length` |
> | 📝 Modified today | `$= dv.pages().where(p => p.file.mtime >= dv.date("today")).length` |
> | 🌱 Seedlings | `$= dv.pages('"02-Dots"').where(p => p.maturity === "🌱seedling").length` |
> | 📚 Total notes | `$= dv.pages().length` |
> | 🗂️ Sources | `$= dv.pages('"04-Sources"').length` |
>
> **Tools →** ![[02-Dots/500-Tools/_Tools_Data.base]]
>
> **Drill-downs:** [[🧭 Review HQ|🧭 Review HQ]] · [[📈Performance Metrics|📈 Metrics]] · [[🎮Gamification Dashboard|🎮 Game]] · [[🔍My PKM Queries|🔍 Queries]]

---

*[[🧭 Review HQ|🧭 Full Review]] · [[+Inbox|📥 Inbox]] · [[01-MOCs/01-MOCs|🗺️ MOCs]] · [[06-Archive|📦 Archive]]*
