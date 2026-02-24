# Tasks

## Active

### Origin v2.0 - Phase 1: Workflows & Documentation

**Goal:** Document all workflows in `00-Meta/PKM Workflows.md` so they're replicable for future vault migrations.

- [ ] **Create PKM Workflows master doc** (`00-Meta/PKM Workflows.md`)
  - [ ] Inbox → Processing workflow (step-by-step)
  - [ ] Note creation workflow (when to use which template type)
  - [ ] Metadata & YAML frontmatter workflow
  - [ ] Maturity progression workflow (seed → seedling → sapling → evergreen → fruit)
  - [ ] Archive workflow (when to archive, how to move notes)
  - [ ] Status progression workflow (inbox → active → waiting → completed → archived)
  - [ ] Review aggregation workflow (daily → weekly → monthly → yearly)

- [ ] **Document template system** in PKM Workflows
  - [ ] 3-Tier template architecture explanation (Meta/Body/Static/Create)
  - [ ] How to create a new note type (FileClass + CIS + 4 templates)
  - [ ] Template composition flow (when templates inject vs. when they don't)
  - [ ] Templater_script.js functions reference (inject_meta_if_missing, combine, etc.)

- [ ] **Document script ecosystem** in PKM Workflows or new `00-Meta/Scripts Reference.md`
  - [ ] When/how each major script runs (Templater user scripts vs. QuickAdd macros vs. template-triggered)
  - [ ] How to extend or modify scripts
  - [ ] Testing/debugging scripts (limitations: Obsidian runtime only)

- [ ] **Create v2.0 migration guide** (`00-Meta/Vault Migration.md`)
  - [ ] Vault adaptation patterns (personal vs. work vs. mixed)
  - [ ] Configuration checklist (what to customize per deployment)
  - [ ] Tag schema setup for new vault
  - [ ] FileClass customization for new domain
  - [ ] Quick-start checklist for deploying Origin to new vault



## Someday

- [ ] Performance audit (vault size, metrics calculation speed)
- [ ] Accessibility review of templates
- [ ] Czech localization review (if expanding to more vault users)
- [ ] Migration playbook for v2.0 (full end-to-end guide)

## Done

### Calendar Review Hub - Phase 1 ✅
- Full cascade: Daily → Weekly → Monthly → Quarterly → Yearly
- `05-Calendar/📅 Calendar Review Hub.md` — hub with QuickAdd buttons, Dataview status tracker, data flow diagram
- `00-Meta/Documentation/PKM/📅 Calendar Review Hub Guide.md` — step-by-step guide
- All 4 aggregation scripts in `99-System/Scripts/` (weekly, monthly, quarterly, yearly)

### Bases Daily View ✅
- `99-System/Daily-View.base` — notes created today + modified today
- `99-System/Active-Types-base.base` — browse all note types
- `99-System/Vault-Dash-Missing.base` — gap scanner
- `99-System/_System_data.base` — missing metadata checker
