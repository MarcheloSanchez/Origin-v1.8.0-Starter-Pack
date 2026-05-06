---
up: "[[+Inbox]]"
title: "Vault Orphans — Origin DEV 2026-04-06"
type: inbox
created: 2026-04-06
modified: 2026-04-06
tags:
  - 📥inbox
  - 🧹tidy
---

# 🔗 Vault Orphans — Origin DEV

**Total raw orphans: ~760 | After excluding system folders: ~490**
**Generated: 2026-04-06**

---

## 📁 07-Prompts/ (~424 files) — Expected

The entire prompt library is essentially unlinked. This is by design — Reference, Inbox, Archive all appear orphaned:
- `07-Prompts/Reference/` — ~200 prompts
- `07-Prompts/Inbox/` — ~60 prompts awaiting processing
- `07-Prompts/Archive/` — ~160 archived prompts

→ **Expected.** Prompt library works as a standalone collection. If you want discoverability, a MOC linking to key prompts would fix this. Not urgent.

---

## 📁 04-Sources/ — 3 real orphans

These should ideally be linked from an Area or Effort:

- `04-Sources/Content - Surfacing into Action.md` → unconnected source
- `04-Sources/430-Guides/Learn Symbols & Abbreviations.md` → guide with no owner
- `04-Sources/430-Guides/Git Guide.md` → guide with no owner

---

## 📁 02-Dots/ — 1 real orphan + 7 .bak files

- `02-Dots/400-Places/Places & Travel.md` → area-level note with no backlinks
- `.bak` tutorial stubs (safe to delete): `Tool - Excalidraw`, `Place - Kew Gardens`, `Person - Dr. Maya Chen`, `Ideas/Mycelium Networks`, `Ideas/Network Effects`, `Ideas/Compound Growth`, `Concepts/Growth Patterns`

---

## 📁 01-MOCs/ — 3 .bak files + 1 temp file

- `MOC - Visual Identity.md.bak` → .bak artifact
- `MOC - Automation Command Center.md.bak` → .bak artifact
- `Tutorial - MOC - Growth Patterns.md.bak` → .bak artifact
- `tmpclaude-c687-cwd` → temp file from Claude session, delete

---

## 📁 03-Efforts/ — 1 .bak file

- `03-Efforts/On/Tutorial - Effort - Master Origin Vault.md.bak` → .bak artifact

---

## 📁 05-Calendar/ (~17 files) — Expected

Daily notes, weekly reports, session logs — orphaned by design. Ignore.

---

## 📁 06-Archive/ (~30 files) — Expected

Archived content, completed templates, old changelogs — orphaned by design. Ignore.

---

## 📁 Temp files in 99-System/Scripts/

- `99-System/Scripts/tmpclaude-c0fb-cwd` → temp file, delete
- `99-System/Scripts/tmpclaude-3a4e-cwd` → temp file, delete

---

## Summary

| Priority | Action | Files |
|----------|--------|-------|
| High | Flag + link | `04-Sources/Content - Surfacing into Action.md`, `Git Guide.md`, `Learn Symbols & Abbreviations.md`, `02-Dots/400-Places/Places & Travel.md` |
| Medium | Delete .bak files | ~12 `.bak` tutorial stubs across 02-Dots, 01-MOCs, 03-Efforts, 04-Sources, 05-Calendar |
| Low | Delete temp files | `01-MOCs/tmpclaude-c687-cwd`, `99-System/Scripts/tmpclaude-*` |
| Ignore | Expected orphans | 07-Prompts (424), 05-Calendar (17), 06-Archive (30) |
