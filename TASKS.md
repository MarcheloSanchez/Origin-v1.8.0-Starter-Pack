# Tasks

## Active

- [ ] Verify v2.0 plugin configs (Fix 1) end-to-end in Obsidian — QuickAdd, Templater, Linter, Auto-mover
- [ ] Identify exact file delta DEV→MAIN (plugin configs, scripts, templates only)
- [ ] Execute file-by-file promotion to MAIN, commit-by-commit, preserving MAIN history
- [ ] Untrack gitignored 02-Knowledge/ files still showing as modified: `git rm --cached` on each
- [ ] Move `docs/2026-05-03-template-audit.md` → `99-System/Documentation/` (per CLAUDE.md output rules)


## Someday

- [ ] Performance audit (vault size, metrics calculation speed)
- [ ] Accessibility review of templates
- [ ] Czech localization review (if expanding to more vault users)
- [ ] Migration playbook for v2.0 (full end-to-end guide)

## Done

### Origin v2.0 - Phase 1: Workflows & Documentation ✅
- `99-System/Documentation/PKM/🔁My PKM Workflows.md` — all workflows documented
- `99-System/Documentation/PKM/📦Template System Guide.md` — 3-tier architecture, note type creation
- `99-System/Documentation/PKM/🔧Scripts Reference.md` — script ecosystem docs
- `99-System/Documentation/PKM/🚀Vault Migration Guide.md` — migration patterns and checklist

### Calendar Review Hub - Phase 1 ✅
- Full cascade: Daily → Weekly → Monthly → Quarterly → Yearly
- `05-Calendar/📅 Calendar Review Hub.md` — hub with QuickAdd buttons, Dataview status tracker, data flow diagram
- `99-System/Documentation/PKM/📅 Calendar Review Hub Guide.md` — step-by-step guide
- All 4 aggregation scripts in `99-System/Scripts/` (weekly, monthly, quarterly, yearly)

### Bases Daily View ✅
- `99-System/Daily-View.base` — notes created today + modified today
- `99-System/Active-Types-base.base` — browse all note types
- `99-System/Vault-Dash-Missing.base` — gap scanner
- `99-System/_System_data.base` — missing metadata checker
