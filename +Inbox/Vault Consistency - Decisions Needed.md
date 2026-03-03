---
title: Vault Consistency - Decisions Needed
type: inbox
status: 📥inbox
created: 2026-03-03
tags:
  - 📊metadata
  - 🔧maintenance
processing_priority: high
---

# Vault Consistency — Decisions Needed

> Generated 2026-03-03 by vault-consistency-checker.
> Items 1-5 from the report are handled as bulk actions. Below are items that need individual decisions.

---

## 6. PARA Misplacements (9 notes in wrong folders)

### Move to 04-Sources/?
These are typed `source` but live in `00-Meta/`:

- [ ] `00-Meta/Documentation/Kanban/PKM KANBAN Board Templates.md` — keep in Meta (it's system docs) or move?
- [ ] `00-Meta/Documentation/PKM/Implementation Plan - Vault Optimization.md` — keep in Meta or move?
- [ ] `00-Meta/Documentation/PKM/QuickAdd Audit Results.md` — keep in Meta or move?
- [ ] `00-Meta/Documentation/PKM/🔢My PKM Metadata.md` — keep in Meta or move?
- [ ] `00-Meta/Documentation/PKM/🔧PKM Template Refactoring Plan.md` — keep in Meta or move?

> **Alternative**: Retype these as `documentation` or `system` instead of `source` — they feel more like internal docs than external sources.

### Move to 05-Calendar/?
These are typed `meeting` but live in `04-Sources/`:

- [ ] `04-Sources/440-Meetings/meeting.md` — FileClass definition? If so, move to `99-System/FileClass/`
- [ ] `04-Sources/440-Meetings/Tutorial - Meeting - Coffee with Maya.md` — tutorial note, move to Calendar or keep as example?
- [ ] `04-Sources/Meetings/Meeting - .md` — empty name, likely a stub → delete?

### Move to 04-Sources/?
- [ ] `07-Prompts/01-Docs/Prompt Guide.md` — typed `source`, move to Sources or retype as `documentation`?

---

## 7. Empty/Stub Notes Needing Decisions (21 notes)

### 00-Meta Documentation stubs (13)
These have frontmatter but zero body content. Fill or delete?

- [ ] `00-Meta/Checklists/Cleanup Checklist.md` — fill with actual checklist or delete?
- [ ] `00-Meta/Documentation/abbreviations.md` — fill with abbreviation reference or delete?
- [ ] `00-Meta/Documentation/backup-recovery.md` — fill with backup guide or delete?
- [ ] `00-Meta/Documentation/Custom Callout System.md` — fill or merge with `List of Custom Callouts`?
- [ ] `00-Meta/Documentation/GIT wf.md` — fill with git workflow or delete (duplicate of `GIT wf` elsewhere)?
- [ ] `00-Meta/Documentation/Kanban/Universal Kanban Settings.md` — has frontmatter only, fill or delete?
- [ ] `00-Meta/Documentation/Obsidian/Debug Guide.md` — fill or delete?
- [ ] `00-Meta/Documentation/Obsidian/List of Custom Callouts.md` — fill or merge with Custom Callout System?
- [ ] `00-Meta/Documentation/Obsidian/Obsidian Plugins & Features.md` — fill or delete?
- [ ] `00-Meta/Documentation/Obsidian/Obsidian Troubleshooting Handbook.md` — fill or delete?
- [ ] `00-Meta/Documentation/Obsidian/👤 Templater Guide.md` — fill or delete (Templater Handbook 2025 exists)?
- [ ] `00-Meta/Documentation/PKM/PKM Graph Overview.md` — fill or delete?
- [ ] `00-Meta/Documentation/Search/Řešení bilingualního vaultu (EN + CZ).md` — fill or delete?

### Other empty stubs (8)
- [ ] `02-Dots/400-Places/Places & Travel.md` — no frontmatter, no content. Index note? Fill or delete?
- [ ] `02-Dots/X/+About Xℹ️.md` — about page for mysterious "X" folder. What is X? Fill or delete folder?
- [ ] `04-Sources/410-Knowledge/Books/Books.md` — no frontmatter. Index for books? Add base view or delete?
- [ ] `04-Sources/430-Guides/Choosing system.md` — no frontmatter, no content. Fill or delete?
- [ ] `04-Sources/430-Guides/Git Guide.md` — no frontmatter, no content. Duplicate of Meta git docs?
- [ ] `04-Sources/430-Guides/Google search CHEATSHEET.md` — no frontmatter, no content. Fill or delete?
- [ ] `04-Sources/430-Guides/Learn Symbols & Abbreviations.md` — no frontmatter, no content. Fill or delete?
- [ ] `05-Calendar/_Logs/_Logs.md` — no frontmatter. Logs index? Fill with base view or delete?
