---
title: "Archived_CHANGELOG"
Last-Updated: 2025-07-09
Version: 1.2.2
Last Backup: 2025-07-09
template-status: origin
modified: 2026-03-03
---
⬆️:: [[🏡Home]] - [[🙃 Sidebar]]
[[README]] - [[💾Backlog]] - [[RELEASE NOTES]] - [[CHANGELOG]]


# Release v1.6.0.
---
# 13/10/25
- Added [[status-progression.js]] & [[maturity-progression.js]] and their Templater and QuickAdd does not work ... #🧹tidy 
---
# 12/10/25
- Added  markdown files for knowledge, media, guides, meetings, 
- Added [[🧹Cleaning Lady]], [[🌱Incubator]]
- Updated [[TODO]]
---
# 11/10/25
- Updated CSS. Most of them deleted. Ended with Kanban Custom. 
- Customized view. Decided on Minimal when the heading can be colored. 
- Applied somehow that Files, Bookmarks, Search are stacked
---
# 09/10/25
- Created Full-Template for each type if Templater does not work this will work always as template
- Renamed templates like: 
	- `Atomic-20.Create.empty` → **`A-New.auto`**
	- `Atomic-30.Create.auto` → **`A-New.auto`** (same)
	- `Atomic-00.Meta.yaml` → **`A-Meta.yaml`**
	- `Atomic-40.AddMeta` → **`A-Add.meta`**
	- `Atomic-50.AddChapters` → **`A-Body.chap`**
	- `Atomic-90.ResetBody` → **`A-Reset.reset`**
	- `Atomic-91.ResetMeta` → **`A-Meta.yaml`** 
- In the fast-process I added types like System or Dashboard. Added to log to think about how to deal with this.
- Optimized YAML to fit the scripts and there are functional these: Read more in [[Guide — YAML Orchestrator]] 
	- reorder
	- lint
	- normalize
- Normalize using Atomic template. Dots terminology need to be focused only as folder. Dots is a kind of category like a bucket full of different type of shit. #🧹tidy  
- Updated [[MOC Hotkeys]]
- Added hotkey` ALT+T` for Quick Tag
- Added split right as hotkey `CTRL+SHIFT+ALT+➝`
- Added split down as hotkey `CTRL+SHIFT+ALT+↓` 
- **Added toogle right sidebar as hotkey CTRL+ALT+SHIFT+L**
- **Added toogle left sidebar as hotkey CTRL+ALT+SHIFT+P
- Learned about hotkey for adding property as `CTRL+; `
- Added [[Obsidian Hotkeys - Compact Cheatsheet]]
- Updated [[ℹ️My PKM Naming Convention]] and all [My PKM] wayfinder and metadata
- Deleted [[🛠️My PKM Maintenance]] - valuable info transfered into [[99-System]]
- Archived but for future queries will be neede [[archived_pkm_queries]]
- Updated [[📁My PKM Folders]] list with this final 
---
# 02/10/25
- Updated [[👁️Dashboard]] - also for future search for queries[[archived_Dashboard]]
- Updated [[Performance Metrics]]
- Added [[Universal Kanban Settings]]
- Added [[practical-examples]] but dont know where and how to use 
---
# 01/10/25
- Updated Archived folders for better searchability. Stays grey in search but at the bottom. Applied to [99-System] + [Templates]
- Changed [[Maturity Evolve]] attributes:  Inspired from [[🙂Icon Reference & Color System]] 
	- `📤seed` → `🌱seed`
	- `🌱seedling`  → `🌿seedling` 
- Added for future visual testing on mobile [[Custom Callout System]] needs to be finished template vault first.
- Replaced [[Icon Package]] with → [[🙂Icon Reference & Color System]]
- Updated [[CIS_TYPE]] with defined in [[🔢My PKM Metadata]]
---
# 30/09/25
- Updated all abouts to visually appealing style with help from perplexity - Claude. 
- Finished [[07-Prompts]]
- Altered the Templates with better organization. 
- Updated [[Maturity Evolve]]
- Updated [[Guide — YAML Orchestrator#ai tested 🧹tidy]]
- Added [[Template Tools New]]
- Added [[Prompt Taxonomy]] into nav 
- Updated [[🔁My PKM Workflows]]
- Updated [[🔢My PKM Metadata]]
- Updated [[🏷️My PKM Tags]]
- Updated - tasks note - HERE [[✅My PKM Tasks]]
	- next please: Create  a complete, visual, and immediately actionable PKM queries note
	- Create  a complete, visual, and immediately actionable PKM glossary note
	- Create  a complete, visual, and immediately actionable PKM abbreviations note
- Actual tasks [[Playground - bases view query TODO]]
- Added [[Idea-New-Auto]] and [[Idea-New]]
---
# 29/09/25
- Added [[Guide — YAML Orchestrator]] and also tested each script. Test OK. 
- Added yaml_meta_config.json
- Updated Calendar templates and all about it. Also added Quarterly template.
- Updated [[👁️Dashboard]]
---
# 28/09/25
- Updated metadata and templates by confirmed status across types. 
- Delete metadata atttribute capture_method -  Pointless for now
---
# 27/09/25
- Updated [[📁My PKM Folders]]
- Deleted [Schema Of Metadata] - duplicate with PKM metadata note 
- Deleted [SSOT Guardrails] - I like more [[🛠️My PKM Maintenance]]

---
# 26/09/25
- Updated [[🏡Home]]
- Updated [[🏛️My PKM Governance]]
- Added [[MOC - Playbooks]]
- Added [[My PKM Standards – YAML & Naming]]
- Updated overall PKM notes
- Added [[+Aboutℹ️]] for every section. 
---
# 25/09/25
- Added [[MOC - Prompts]], [[Playbook - Prompt]], [[Prompt Taxonomy]]
- Replace [Templates] with [[+About Templatesℹ️]]
- Updated [[Hotkeys Quick Reference#NEW]]
- Added / need update [[My PKM Governance]]
---
# 23/09/25
- Added [[👁️Dashboard]]
- Added [[Home - inspirace]]
- Adde [[MOC - Automation Command Center]]
- Deleted a lot of notes that where just documents from AI 
- Moved some guide into Guide folder
- Updated [[Hotkeys Quick Reference#NEW]]
- Need update [[🛠️My PKM Maintenance]] / [[SSOT Guardrails]]
---

# 21/09/25
- Verča&Robert first talk about Obsidian / note-taking 
- Create simplified version - [1.5.0 - TEST]
	- [ ] Combination of this folder structure + bonuses from AI note taking 
	- [ ] without gibberish from here like List of topics or wondering what notes to take 
	- [ ] Structure -> Folder notes(dataview dashboard) -> +About (link to folder note + template + purpose + flow of folder) -> database (watch of statuses/ modified etc.)
	- [ ] create home open at start - to view recently modified + under will be links to MOCs and stuff + tagged favorites
	- [ ] update new Home + Start here
	- [ ] Explanation in Czech

Add for Effort: ?

# 1) Schéma pro projekty (Efforts) — navrhni a zaveď

## YAML (doporučené klíče)

```
title: "<název projektu>"
type: effort
status: idea | planned | active | in_progress | blocked | on_hold | done | archived
priority: P1 | P2 | P3     # P1 = nejdůležitější
owner: "Marcel"            # volitelné (zatím nepoužiješ ve filtrech)
created: 2025-09-23
updated: 2025-09-23
review: 2025-10-07         # volitelné – umožní plánované revize v dashboardu
```

## Krátké definice stavů
- **idea** – jen nápad, bez závazku.
- **planned** – rozhodnuto začít (základní obsah + cíl).
- **active** – rozběhnuto, má první akce / výstupy.
- **in_progress** – aktivně se na tom pracuje (týdenní pohyb).
- **blocked** – čeká na externí podmínku; uveď příčinu v těle.
- **on_hold** – vědomě pozastaveno (neblokované).
- **done** – splněno (krátké _lessons learned_).
- **archived** – uzavřeno, uchováno pro reference.
    

> Tuhle sekci dej i do [[🔁My PKM Workflows]] a do [[PKM Naming Convention]] (část „status & priority governance“).
# Release v1.5.0
---
**Template-status possibles:** 
Origin -The chosen one. Only One.
Origin-Test - Testing vault 
Origin-Data - For now Data migration targeted on some vault. Example Origin-Data-Ideaversee

---
# 23/08/25
- Reviewed templates and updated commands
- Inbox template - not needed. For the case is fit Atomic. 
- Commander/QuickAdd prepared for Add
	- Templates and Meta are also prepared 
	- Created #❔question for [[Templates]]
	- [[Atomic Filled Out]]

- Release in preparations to 1.5.0
---
# 20/08/25
- Added [[_Templates_Data.base]], [[_Dots_Data.base]], [[_Inbox_Data.base]], [[_Sources_Data.base]], [[_Calendar_Data.base]], [[_Effortless_Data.base]] 
- Deleted [[🙃 Sidebar]] - because [[🏡Home]] is the most linked and carries all the features needed and was in Sidebar.
- Moved Templates/ Templater 
	- Planned reconfigure templates 
---
# 16/08/25
- Added [[templater_user_guide_technical_document]], [[git_user_guide_technical_document]], [[Overview of Metadata - be aware query]]
- Tried to update quieries in [[🙃 Sidebar]]
- [[⚡ Automation Menu]] - works 
- Added [[CIS_MOOD]], [[CIS_WEATHER]]
- Added [[Choosing system]]
- Added [[Cleanup Checklist]]
---
# 14/08/25
- Added [[Vault Home Dashboard]] thinking about it. Because [[🏡Home]] OR [[🙃 Sidebar]] isnt enough , hehe.
- Added important query need to find place [[My PKM Metadata#Missing Metadata Query]]
- Added subfolder to Calendar - [Reviews]
- Updated [[home-note]]
---
# 13/08/25
- Added [[🏡House Tour]]
- Peer review by Zůza. Maximum focus attention madness for sure. 
	- Came out note of the templates work 
	- Templater smashed multiple scripts 
		- [x] Fixed them
- Created structure for future templates, [Add, Capture, Meta]
---
# 11/08/25
- Added PKM overview 
- Added Prompt structure [[Prompt_Type]], [[Prompt Attribute Glossary]], [copilot-custom-prompts], ... 
- Added [Copilot]
	- Not working because of verification needed with face ID 
- Rollback on Tags to without status in TAG. Thats for YAML. And
- Updated FileProperty [Hidden] and in new panel next to [Changelog]
- Added [[Obsidian Technical Document]] - combine with showcase

---
# 08/08/25
- Updated tags like -#status/✅completed or -#effort/🔥on 
- Finished review for [Calendar] notes. 
- Prepare for update. Make release and then rename folder + queries. 
- Make DUMP from GPT folder and organize to prepare another release. 
- Released [v1.4.0]
- Updated folders [00-Folder] namespace. Also updated queries.

---
# 06/08/25
- Added plugin [Tasks]
- Added [[TODO]] note for overview of all tasks
- Added [[Typography]] for showcase used CSS
- ATTENTION! - [Lazy plugin loader] is setting up plugins. When u manully disable. It can by settting enable them. 
	- Also [Calendar] plugin může blbnout se šablonami při používání [periodic Notes] ...
- Updated [[My PKM Metadata#05-Calendar Metadata]] because was empty. 
- Cleaned up templates for daily journal.
- Updated [[Templater, Week Review]]
---
# 04/08/25
- Updated queries in [[home-note]]
- Added [[FLOW_CREATION_TEMPLATE]] 
- Updated [[Nick Milo's Custom Callouts]] with task callouts 
- Added as beta FILE for [[home-note-cs-meh-inspiration]] - Try fillout with queries and try to finish the HOME NOTE...
	- [[🙃 Sidebar]] is the most advanced but needs  
- Not sure about [[My PKM Tasks]] - Cleared some but most of is and question to figure out 
- Rename folder - [Templater] to [TemplateR-Auto] AND [Templates] to [TemplateS-Manual] - Test out in diff vault
---
# 28/07/25
- Added [Metadata menu]
- Created FileClasses to keep metadata contained
- Added [CIS] files
- Added [Prompt] class with some [CIS] 
---
# 23/07/25
- Added plugin [Advanced URI] (for future automations)
- Added core plugin [Format convertor] to obsidian format. Not idea what. Possible delete #❔question 
- Added [Lazy plugin] 
- Disabled core plugins like [Workspaces, ]

---
# 17/07/25
- Reviewed templates 
- Updated some metadata files
- Organized documentation files 
- Deleted Tags complete guide to be only visible PKM Tags
- Created script for creating versions for installed plugins. Choose from CSV or txt file output. 
	- ATTENTION: Not visible - [python] in Script folder
- Created [[99-System]]
	- Based on this updated queries in Folder notes that shows overview of notes in folder by modified date
- Added in inbox Used templates - These are Concrete examples for each type attribute 
---
# 12/07/25
- Added Kanban System [[Kanban Handbook]], [[pkm-kanban-templates]], [[Template, Research Card Kanban]], [[Template, Content Card Kanban]], [[Template, Learning Card Kanban]]
- Added handbooks [[Templater Handbook 2025]], [[Obsidian Troubleshooting Handbook]], [[Debug Guide]]
- Added [[NOT TESTED - Batch-Tag-Updater]]
- Added [[Guidelines]]
---
# Release v1.2.2
---
# 11/07/25
- Added [[+About]] thats containing query for every note starting with "+About..."
- Added [[Git Handbook]]
- Added plugins to try in [[💾Backlog]]
- Added folder for Logs in Calendar
- [[Guidelines]]??? 

---
# 09/07/25
- Refinement
- Git Backup 
- Release test workflow -> v1.2.2
---
# 30/06/25
- Added [[💾Backlog]]
- RELEASE DATE missed
- Updated templater scripts 
- Auto note Mover now has Efforts for individual tags as #🔥on etc.
- Cleared out tags 
- Replaced hotkey for quick tag for - CTRL+ALT+T
- Added AKA pushed further Dots [[Ideas]], [[Concepts]] 


---
# 25/06/25
-  Upgraded [[Template, Properties, Effort (Kit)]] to -> [[Templa]]
- Think about renaming folder to: 
	- 00Inbox
	- 00-Inbox 
- Removed [[README]]v2
- Added metadata into [[CHANGELOG]]
- Added [[WEEKLY REVIEW]]
- Added [[Templater, Weekly Maintenance script]], [[Archive, TemplateR, Daily note script]], [[Templater, Archive script]]
- Added [[QuickAdd Handbook]]
- Updated [[🙃 Sidebar]]
- Added [[GIT wf]]
- Added [[origin-vault-procesy]]
- Added [[Origin MAINFRAME]]
- Added [[implementation-checklist]]
- Added into scripts [weekly-git-backup.sh]
- Added [[Origin Releases Workflow Guide]]

---
# 17/06/25
- released version 1.1 -> 1.2.1
- [[Feedback from BETA versions]]

---
# 16/06/25
- released version 1.0 ->1.1
- Here is versions: 
	- Added [[vault-metadata]]
	- list of plugins version in a note 
- Write here Feedback from usage 
- Backed up on GIT

---
# 12/06/25
- Added [[idea -InsertTimestamp - InsertDateTag - ConvertText]]
- Added [[TemplateIndex]]
- Added [[My PKM Tasks]]
- Added some Scripts for future like [[CMD]], [[JS]], [[AHK]]
- Structure Templater
	- Keep Separated Templates and Templater
---
# 11/06/25
- Added [[Dataview Query Handbook]]
- Added [[Evergreen notes]]
- Added [[BOAT notes]]
	- Maybe combine with [[Dataview Practicesheet]] and [[Dataview syntax]]
	- Handbook seems more practical. But also would like to create alias for syntax 
- Created [[README]]
---
# 10/06/25 - TODO
- Added [[▶️ START HERE]] quick start guide. Need some #🌱develop  stuff done later with Git and Troubleshooting links 
- Journal proklikat zda funguje 
- Automated script for tagging based on context 
- Automated script for moving notes based on tag (Better then auto note mover, since is only script?)

---
# 08/06/25
- Updated [[Hotkeys & Automation]]
	- Daily, Weekly, Monthly
	- Total hotkeys
	- Templater works 
	- Quick Add command center availaible (not yet functional)
- Added [[Hotkeys Quick Reference]] - For obsidian, later for Windows, Powertoys, Fastkeys
- Added [[Visual hotkeys]] - Multiple ways how to showcase hotkeys. Later on use for cheatsheet. After finalised hotkeys.
- Added [[Icon pack]] 
- Structured templates into folders. 
- Created templates like [[SIMPLE Inbox Capture]], [[📦Templater, Archive note]], [[Template, Home Navigation]], [[Templater, Quick Tagging in place]]
- Velký posun 
	- [[My PKM Tags]] - Projít s [[TAGS COMPLETE GUIDE#🚫 Cleaned Up (odstranění duplikátů)]] , jelikož to dává smysl. Ale je potřeba to zkontrolovat ať je to všude a sepsat ty pravidla. 
	- [[My PKM Metadata]] - Rozepsané pro jednotlivé poznámky. Je potřeba unifikovat. Projít se zdravým rozumem. Vytvořit templates. Queries. 
	- Je potřeba zkouknout všude, zda nedělá problém syntax. Psalo mi to **"05-Archiv**e". Tedy chyba s pomlčkou a Špatné očíslování. 


---
# 06/06/25
- Installed Copilot to help me out 
- Added [[🙃 Sidebar]], and Dataview of Captured notes from past week and Performance example output 
- Added [[Performance Metrics]]
- Added [[Library]], [[Maps]], [[➕Add]], [[Language MOC]], [[Relate]], [[Thinking Map]], [[Communicate]]
- Added [[Debug Guide]]
- Added some templates for dashboard. That need more assistance later. 
- Added [[My PKM MOC]]
- Added [[Vyhledávání plugin porovnání]]
---
# 05/06/25
- Sidebar ADDED to [[🏡Home]]
	- Chybí tam ccsclass = sidepbard 
- Added folders to Templates 
- Added basic YAML templater 
- Added some Documentations 
- Tags made better, also added suggestions 
- Added [[Hotkeys & Automation]] evolve further
- Updated visualisation of used plugins 
- Added [[Řešení bilingualního vaultu (EN + CZ)]]
---
# 04/06/25
- Version 1.1 saved
- AI brainstorm about Meta Vault 
- Restructure
- Updated Queries cannot see them self's
- Added [[My PKM Metadata]]
- Added [[My PKM Queries]]
- Added [[My PKM Folders]]
- Added [[My PKM Tags]] 
- Added [[My PKM Workflows - Global Guidelines]]
- Added [[README]]
---
# 30/05/25
- Version 1.0 started
- Added [[CHANGELOG]] 
- Added [[🏡Home]] 
---
# 01/01/25
- Added template
---