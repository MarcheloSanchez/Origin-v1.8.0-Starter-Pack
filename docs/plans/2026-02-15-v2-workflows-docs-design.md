# Design: Origin v2.0 — Workflows & Documentation

**Date**: 2026-02-15
**Status**: Approved
**Audience**: Self + future vault users (fork-and-adapt model)

---

## Problem

Origin v1.9.1 has extensive but scattered documentation. Key gaps:
- No standalone scripts reference (info spread across CLAUDE.md and individual files)
- No migration guide for forking and adapting the vault
- No template system documentation (how to create new note types end-to-end)
- Master workflows doc (`🔁My PKM Workflows.md`) is outdated — predates v1.9.1 prompt system, newsletter, changelog, and cache pattern

## Approach

**Four standalone docs** — update 1 existing + create 3 new. All in `00-Meta/Documentation/PKM/`. No restructuring of existing doc folders. No changes to scripts, templates, or CLAUDE.md.

---

## Deliverables

### 1. Update: `🔁My PKM Workflows.md` (~1200 lines)

**Location**: `00-Meta/Documentation/PKM/🔁My PKM Workflows.md` (existing, 916 lines)

**Add:**
- Prompt system workflow (create -> classify -> promote: draft -> active -> winner -> archived)
- Newsletter generation workflow (mark `newsletter: true` -> run macro -> draft generated)
- Changelog update workflow (run macro -> auto-generated from vault changes)
- Metrics cache update workflow (run macro -> cache refreshed -> dashboards read cache)
- Maturity progression workflow with concrete promotion criteria
- Status progression workflow with decision tree

**Update:**
- `deadline` -> `due` references
- Old status values (`active` -> `🔄active`)
- `🌱seed` -> `📤seed` maturity corrections
- Template references to reflect modular architecture

**Keep as-is:**
- Knowledge lifecycle diagram
- Core stages (Capture, Process, Organize, Connect, Review, Archive)
- GTD decision trees
- Folder routing logic

---

### 2. New: `📦Template System Guide.md` (~400 lines)

**Location**: `00-Meta/Documentation/PKM/📦Template System Guide.md`

**Structure:**
1. **Architecture Overview** — 4 template tiers (Meta, Body, Static, Create) and what each does
2. **Template Composition Flow** — how `combine()` chains Meta + Body, when Static vs Create is used
3. **How to Create a New Note Type** — end-to-end walkthrough: CIS file -> FileClass -> 4 templates -> QuickAdd registration
4. **Templater_script.js Reference** — every exported function with signature, purpose, usage example
5. **Two-Tier Type System** — full types (10) vs lightweight types (11), when to use which
6. **Gotchas** — `combine()` returns via `tR +=`, `writeActive()` race condition, etc.

---

### 3. New: `🔧Scripts Reference.md` (~500 lines)

**Location**: `00-Meta/Documentation/PKM/🔧Scripts Reference.md`

**Structure by category:**

#### Template Scripts (Templater user scripts)
- `Templater_script.js` — core template functions
- `maturity-promoter.js` — promotion suggestions
- `yaml_validator.js` — schema validation

#### Automation Scripts (QuickAdd macros)
- `update-metrics-cache.js` — cache refresh
- `generate-weekly-report.js` — weekly reports
- `generate-newsletter.js` — newsletter drafts
- `update-changelog.js` — changelog entries
- `open-home.js` — navigation

#### Maintenance Scripts (Templater/manual)
- `yaml_orchestrator.js` — YAML normalize/lint/reorder
- `normalize_prompts.js` — prompt frontmatter normalization
- `metrics-core.js` — centralized metric functions

**Each entry documents:** Purpose, trigger mechanism, input/output, dependencies, how to extend.

---

### 4. New: `🚀Vault Migration Guide.md` (~600 lines)

**Location**: `00-Meta/Documentation/PKM/🚀Vault Migration Guide.md`

**Structure:**
1. **Prerequisites** — Obsidian version, required plugins, community plugins list
2. **Architecture Overview** — 8-layer PARA structure, what each folder does
3. **Fork & Setup** — clone repo, open as vault, install plugins
4. **Configuration Checklist** (ordered by priority):
   - Personal info (home note, about sections)
   - Tag schema (add/remove domain-specific tags)
   - CIS values (adapt status/maturity if needed)
   - FileClass customization (add/remove note types)
   - Template adaptation (modify Meta/Body for domain)
   - QuickAdd macros (register new automations)
5. **Domain Adaptation Examples** — personal PKM, work/team, research, content creation
6. **Verification Checklist** — confirm everything works after customization

---

## Out of Scope

- No changes to CLAUDE.md, Quick Reference, or tutorials
- No restructuring of existing doc folders
- No changes to scripts or templates themselves
- No new MOCs or dashboard modifications

## Dependencies

- Read access to all scripts in `99-System/Scripts/`
- Read access to all templates in `Templates/`
- Read access to existing `🔁My PKM Workflows.md`
- Understanding of current CIS files and FileClass definitions

## Success Criteria

- All 4 docs are accurate against current vault state (v1.9.1 post-prompt-system)
- A new user can fork the repo and follow the migration guide to a working vault
- Template guide enables creating a new note type without reading source code
- Scripts reference is complete — every `.js` file in `99-System/Scripts/` is documented
