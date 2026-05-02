---
title: 🏡Home
type: 🏡Home
status: 🔄active
tags:
  - ⚙️system
created: 2025-09-29
modified: 2026-04-16
obsidianUIMode: preview
cssclasses:
  - wide-page
---
> [!orbit]- Quick Navigation
> **Core Dashboards:**
> [[🏡Home|🏡 Home]] • [[👁️Dashboard|📊 Dashboard]] • [[TODO|✅ TODO]] • [[🎮Gamification Dashboard|🎮 Game]] • [[Performance Metrics|📈Performance]]
>
> **Quick Actions:**
> [[+Inbox|📥 Inbox]] • [[🗺️My PKM MOC|🗺️ PKM]] • [[🎯GTD Weekly Review - Template|📅 Review]] • [[TODO|✅ TODO]] • [[📍Note Classification Guide|📍 Guide]]
>
> **Automation:** `Ctrl+P` → ⚡Quick Process (Atomic/Source/Effort) • 🤖Smart Classify • 📦Batch Process • 📝Auto-Fill Metadata
>
> **Specialized:** [[MOC - Automation Command Center|⚡ Automation]] • [[Obsidian Plugins & Features|🛠️ Plugins]] • [[MOC - Prompts|🤖 Prompts]]

The place where you always come back, that's **home**. 🦔🍎

> [!Map]- > # Atlas
> > *Where would you like to go?*
> 
> > [!orbit] Atlas Wayfinder |  [[➕Add]] | [[Relate]] | [[Communicate publicly]] | [[Library]] | [[People Map]] |  [[Sources Map]] | [[Thinking Map]] | [[Concepts Map]] |  [[Life Map]] |  [[🗺️My PKM MOC]]  | [[Learn MOC]] | [[IT MOC]] | [[Finance MOC]] | [[Games MOC]] | [[Habits Map]] 
>
> ![[IMG_Atlas.png]]

> [!Calendar]- > # Calendar
> > *What's on your mind?* 
> 
> 
> > [!hint] >  To journal, focus your day, or to capture a spark,  
> >  **Daily**  CTRL+D | **Weekly**  CTRL+SHIFT+D | **Monthly**  CTRL+SHIFT+M
> >  To capture specific type of things, go to [[_Logs|Logs]].
> >  Shortcut for [[TODO]] - ADD Shorcut for insert Daily  - Add to XP log, 
> 
> 
> > [!COMPASS] > To broadly reflect
> >   
> > - Go to [[Plán a revize |Plan and Review]].
> > - To learn more about time travel, go to [[05-Calendar]].
> > ![[TheRing.jpg]]

> [!Training]- > # Efforts
> > *What can you work on?* 
> 
> For a concentrated view, go to [[03-Efforts]].
>
> Use this to keep priorities in order and the quickly adjust your bandwidth as needed. 
> 
> > [!Multi-column] 
> > 
> > > [!Milestone]+ ## 🔥On
> > > The heat is `ON`🟥 and going. link to definiton of done - [[GtD - Getting Things Done|GTD]].
> > > 
> > > ``` dataview
> > >TABLE WITHOUT ID
> > >file.link as "",
> > > rank as "Rank"
> > > FROM "03-Efforts/Active"
> > >SORT rank desc
> > >LIMIT 5
> > >```
> > 
> > > [!Recycle]+ ## ♻️ Ongoing
> > > Efforts that are just there doing its stuff  `Develop`, `Maintain`,  `Reflect`, 
> > > [[GtD - Getting Things Done|GTD]] LINK to notes principles and processes. 👉 [[🗺️My PKM MOC]]
> > >``` dataview
> > >TABLE WITHOUT ID
> > >file.link as "",
> > >rank as "Rank"
> > >FROM "03-Efforts/Active"
> > >SORT rank desc
> > >LIMIT 5
> > >```
> > 
> > > [!Blocks]+ ### 〰️ Simmering
> > >Efforts can easily move from `on` to `simmering` in the background.
> > >
> > >``` dataview
> > >TABLE WITHOUT ID
> > >file.link as "",
> > >rank as "Rank"
> > >FROM "03-Efforts/Paused"
> > >SORT rank desc
> > >LIMIT 5
> > >```
> 
> ![[POKEMON 1.jpg]]

![[pale-blue-dot-banner.jpg]]

---
## Rychlý přístup

## 📊 Quick Access Dashboards
- [[🧭 Review HQ|👁️ Review & Process Notes]]
- [[TODO|✅ Workflow & Tasks]]
- [[🎮Gamification Dashboard|🎮 Progress Tracking]]
- [[📈Vault Analytics|📈 Metrics & Insights]]

## Recent AI Sessions
![[_Sessions_Data.base]]

> [!MAP]- 🧭 Quick Access
> #🧹tidy maybe outdated. Needs manual rewrite. Below Favorites seems better decision
> - [[📈Performance Metrics]]
> - [[Views]]
> - [[🌱Incubator]]
> - [[🧹Cleaning Lady]]
> - [[Visual hotkeys]]
> - [[Icon Package]]
> - 🚀[[Google search CHEATSHEET]]
> - 📊[[📈Performance Metrics]]
> - 📖[[List of Custom Callouts]]
> - 📖[[Debug Guide]]
> - [[Guide — YAML Orchestrator]]
## Favorites ( ❤️ or ⭐)
```dataview
LIST
FROM #⭐ or  #❤️
SORT file.mtime DESC
```
## Recents

### Last Opened
```dataviewjs
dv.list(app.workspace.recentFileTracker.lastOpenFiles.map(x=>dv.fileLink(x)).slice(0, 10))
```
---
### Last Modified
```dataview
LIST
FROM ""
SORT file.mtime DESC
LIMIT 7
```
> [!MAP]- MOCs
> - [[+Inbox]] - Incoming notes
> - [[99-System]] - Meta files about vault 
> - [[01-MOCs]] - Maps of Contents 
> - [[02-Knowledge]] - Categorized notes
> - [[03-Efforts]] - Overview of projects
> - [[04-Sources]] - Overview of sources
> - [[05-Calendar]] - Overview of daily notes and other journalling 
> - [[06-Archive]] - Overview of archived notes
> - [[99-System]]
> - [[99-System/Prompts]]
> - [[Templates]]
Více zde: [[+Aboutℹ️]]

![[pale-blue-dot-banner.jpg]]
