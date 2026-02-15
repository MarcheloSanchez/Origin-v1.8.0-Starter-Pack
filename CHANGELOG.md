---
Version: 1.8.0
Last Backup: 2026-01-31
template-status: origin_production
---
⬆️:: [[🏡Home]]
[[TODO]] - [[BACKLOG]] - [[RELEASE NOTES]]
---
*Poslední aktualizace: `= date(now)`*
---
> Zde psát modifikace a úpravy ve vaultu.
---
# 10/02/26
- Added [[Query - Newsletter Queue]]
- Added [[new-effort-auto]]
- Added [[new-atomic]]
- Added [[new-atomic-auto]]
- Added [[👁️Dashboard]]
- Added [[🎯GTD Command Center]]
- Added `CIS_TYPE.md`
- Added [[TODO]]
- Added [[CLAUDE]]
- Added [[CHANGELOG]]
- Added [[2026-02-10]]
- Added [[Research - Improving Note Surfacing]]
- Added [[⚡ Automation Menu]]
- Added [[🏠 Living Areas Tasks]]
- Added [[🏠 Kitchen Tasks]]
- Added [[🏠 Entry & Laundry Tasks]]
- Added [[🏠 Bedroom Tasks]]
- Added [[🏠 Bathroom Tasks]]
- Added [[MOC - Automation Command Center]]
- Added [[Automations via fastkey]]
---
# 10/02/26
- **Two-tier type system**: 10 full types + 11 lightweight types registered in `CIS_TYPE.md` + `Templater_script.js`
- Retyped notes: 3 dashboards, 1 system, 5 efforts (from task-category), 1 source (from research)
- Fixed 5 broken buttons in `02-Dots.md` (Person, Place, Tool, Concept, Idea)
- Added `Person` QuickAdd Template choice for `02-Dots/300-People`
- Added `🏡 Open Home` macro + hotkey `Ctrl+Shift+H`
- Added `Ctrl+Shift+G` (global graph) and `Ctrl+Shift+X` (extract selection) hotkeys
- Fixed tag formatting in `+Inbox/Automations via fastkey.md`
- Added newsletter workflow: `newsletter: true` frontmatter flag + `generate-newsletter.js` script
- Added `update-changelog.js` for one-click changelog drafting from vault changes
- Added `Query - Newsletter Queue.md` template for Dataview queue view
- Registered QuickAdd macros: 📰 Generate Newsletter, 📋 Update Changelog
- Added newsletter + changelog buttons to [[⚡ Automation Menu]]
- Updated `yaml-meta-config.json`: added `newsletter` to field order
---
# 07/02/26
- **Vault Optimization v2.0 — Priority 1: Foundation Fixes**
- Standardized `deadline` → `due` across 6 notes, 3 queries, 2 config/doc files
- Normalized status values: 16 notes fixed (`active` → `🔄active`), removed OR fallbacks from 10+ queries
- Added try-catch error handling to all DataviewJS blocks (Dashboard 6, GTD 2, Review HQ 4, Gamification 9)
- Added query purpose documentation to all DataviewJS blocks
- Updated `yaml-meta-config.json`: removed `deadline` from field order and dateKeys
- Updated `Query - Active Projects.md` template: removed transition compatibility notes
- **Vault Optimization v2.0 — Priority 2: Query Optimization**
- Extended `metrics-core.js` with gamification functions (maturity counts, XP/level calc, daily streak)
- Rewrote `_Metrics Cache.md` to use Dataview inline fields (queryable via `dv.page()`)
- Updated `update-metrics-cache.js` to output inline field format instead of embedded JSON
- Created `Query - Weekly Stats.md` template (6th query template in library)
- Fixed maturity values in `Query - Maturity Distribution.md` (`🌱seed` → `📤seed`, `🌿seedling` → `🌱seedling`)
- Fixed `isActive` fallback patterns in `Query - Health Status.md`
- Fixed `status = "waiting"` OR fallback in Review HQ Waiting query
- Fixed maturity values in Review HQ config notes section
- Refactored 4 dashboards to use metrics cache with live fallback:
  - Dashboard: 6 DataviewJS blocks optimized
  - GTD Command Center: 2 DataviewJS blocks optimized
  - Review HQ: 1 DataviewJS block optimized (inbox/efforts from cache)
  - Gamification Dashboard: 4 DataviewJS blocks optimized (XP, achievements, progress, maturity)
- **Vault Optimization v2.0 — Priority 3: Automation Enhancement**
- Fixed maturity-promoter.js STAGES: `🌱seed` → `📤seed`, `🌿seedling` → `🌱seedling`
- Fixed yaml_validator.js atomic schema maturity values to canonical CIS values
- Added validation step 5b to yaml_orchestrator.js: tags notes with `#🧹tidy` when required fields missing
- Fixed Review HQ maturity promotion widget and "Notes Worth Promoting" query maturity values
- Enhanced Review HQ stale content tip callout with specific action suggestions
- Verified tag health monitoring and stale content alerts already integrated in Review HQ
- **Vault Optimization v2.0 — Priority 4: Advanced Features**
- Fixed Vault Analytics: maturity values (`🌱seed` → `📤seed`), removed status OR fallback patterns, added cache-first optimization to Vault Overview
- Added 🔗 Connection Suggestions section to Review HQ: "Recently Well-Connected" + "Least Connected Active Notes" widgets with Smart Connections integration
- Created `generate-weekly-report.js`: automated weekly report generator (QuickAdd script) outputting to `05-Calendar/Weekly/`
- Updated WIP Limits table in Review HQ with Connection Suggestions limits
- **🎉 Vault Optimization v2.0 — ALL 4 PRIORITIES COMPLETE**
---
# 03/02/26
- Added [[Prompt Meta-Skills Playbook]]
---
# 31/01/26
- Updated changelog with recent changes
- Added [[VAULT_REPORT]] - comprehensive vault documentation
- Converted all 6 meta-skills to standard prompt template format
- Updated [[RELEASE NOTES]] with v1.7.0 and v1.8.0 documentation

---
# 24/01/26
- Upgraded Claude skills to Level 3 with advanced prompt engineering
- Added 17 Copilot custom prompts with structured output formats
- Implemented progressive disclosure patterns in AI prompts

---
# 23/01/26
- Added Claude AI skills for PKM workflows
- New prompts: Assess note maturity, Build mental model, Challenge this idea, Explain concept, Extract tasks, Find connections, Format as atomic, Synthesize knowledge

---
# 21/01/26
- **Major template refactoring complete**
- Removed legacy `Type/` folders (Option B cleanup)
- Added static fallback templates (no Templater required) in `Templates/Static/`
- New modular template architecture with separate Meta, Body, and Create templates

---
# 20/01/26
- Implemented Phase 1-2: Modular template architecture
- Phase 3-4: Updated QuickAdd macros to use new templates
- Phase 5-6: Validation and cleanup of deprecated templates
- Added comprehensive PKM template refactoring plan

---
# 19/01/26
- Fixed plugin settings - Auto-note Mover. "#" was missing in tags


---
# 16/01/26
- Added  [[🏠 Home Maintenance System]] 
	- Each room is in [[400-Places]]
	- Not happy with the amount of tags here.
- Added files from AI updated Origin_Starter PACK, like - [[🧭 Review HQ|Review Hub]], [[🎮Gamification Dashboard]], [[🎮Gamification Quick Reference]], [[🎮My PKM Gamification]], [[GTD Contexts Guide]], [[📍Note Classification Guide]] 
- [[MOC - Life Dashboard]] ... hmm maybe I will transfer from Main the MOCs later on
- Changed names to capitals for [[CHANGELOG]], [[RELEASE NOTES]], [[BACKLOG]]

# LAST RELEASE
---
# 04/11/25
- Added tags #🪵log, #📋about
- Tady přidávám co změním. Držím to vždy krátce informativně. 
# new-old

---
# 11/11/26
- Added/Fixed/Changed