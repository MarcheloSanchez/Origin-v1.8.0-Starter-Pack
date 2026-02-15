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

### Calendar Review Hub - Phase 1: Architecture & Step-by-Step Docs

**Goal:** Build Review Hub that aggregates daily notes → weekly reports → monthly reviews → yearly reflections with clear step-by-step guides.

- [ ] **Audit current Review Hub/Report generation setup**
  - [ ] Review existing `generate-weekly-report.js` logic
  - [ ] Check if Review Hub note exists in `05-Calendar/` (or `01-MOCs/`)
  - [ ] Identify what's already aggregating (daily → weekly) vs. what's missing (weekly → monthly, etc.)

- [ ] **Design Review Hub workflow** (step-by-step)
  - [ ] Daily review entry point → where does it live?
  - [ ] Weekly report generation trigger → manual or automatic?
  - [ ] Monthly review aggregation → pulls from weekly reports
  - [ ] Yearly reflection aggregation → pulls from monthly reviews
  - [ ] Create visual flowchart of the cascade

- [ ] **Create step-by-step guide** in `00-Meta/Review Hub Workflow.md`
  - [ ] How to capture daily notes (what goes in Daily/ each day)
  - [ ] How to trigger weekly report generation (QuickAdd macro button?)
  - [ ] How to write/aggregate weekly report (what structure, Dataview query?)
  - [ ] How to write/aggregate monthly review (what structure, Dataview query?)
  - [ ] How to write/aggregate yearly reflection (what structure, Dataview query?)
  - [ ] Pitfalls & gotchas (what breaks the cascade)

- [ ] **Implement missing aggregation pieces** (if needed)
  - [ ] Monthly aggregation query (weekly → monthly)
  - [ ] Yearly aggregation query (monthly → yearly or direct from weeklies?)
  - [ ] Review Hub dashboard that shows all 4 levels

- [ ] **Create Review Hub note** (`05-Calendar/Review Hub.md` or `01-MOCs/Review Hub.md`)
  - [ ] Entry point for the review system
  - [ ] Links to latest daily/weekly/monthly/yearly
  - [ ] Dataview queries showing recent entries at each level

### Bases Daily View - Mini Task

**Goal:** Add Bases view showing notes created today.

- [ ] **Audit current Bases setup**
  - [ ] What Bases exist? (FileClass: atomic, effort, source, moc, etc.)
  - [ ] Where are Bases views currently configured? (in .obsidian/plugins/obsidian-databases/)

- [ ] **Design "Created Today" view**
  - [ ] Query: `created: YYYY-MM-DD` (today) across all FileClasses
  - [ ] Display columns: title, type, created, status, maturity
  - [ ] Sorting: by creation time (newest first)

- [ ] **Add to appropriate Bases view**
  - [ ] Main dashboard (👁️Dashboard.md)?
  - [ ] New dedicated "Daily Captures" view?
  - [ ] Existing Bases database query?

- [ ] **Test and verify** the query works across vault

## Waiting On

- [ ] Clarification on Review Hub template structure (what should each level look like?)
- [ ] Confirm if Bases Daily View should be main dashboard or separate view

## Someday

- [ ] Performance audit (vault size, metrics calculation speed)
- [ ] Accessibility review of templates
- [ ] Czech localization review (if expanding to more vault users)
- [ ] Migration playbook for v2.0 (full end-to-end guide)

## Done
