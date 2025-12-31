---
Version: 1.6.0
Last Backup: 2025-10-14
template-status: origin
---
⬆️:: [[🏡Home]] 
[[TODO]] - [[💾Backlog KANBAN]] - [[📝Release Notes]]
---
*Poslední aktualizace: `= date(now)`*
---
> Zde psát modifikace a úpravy ve vaultu.

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
- Changed [[Maturity Evolve]] attributes:  Inspired from [[🙂My PKM Icon Reference]] 
	- `📤seed` → `🌱seed`
	- `🌱seedling`  → `🌿seedling` 
- Added for future visual testing on mobile [[Custom Callout System]] needs to be finished template vault first.
- Replaced [[Icon Package]] with → [[🙂My PKM Icon Reference]]
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