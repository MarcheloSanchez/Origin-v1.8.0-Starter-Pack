---
up: "[[00-Meta]]"
title: "Vault Report 2026-03-13"
type: system
status: ✅completed
created: 2026-03-13
modified: 2026-03-13
tags: [⚙️system, 📊metrics, 📋documentation]
---

# 📊 Vault Report — 2026-03-13

> Snapshot of vault health, content distribution, system status, and activity trends as of 2026-03-13.

---

## 🗂️ Content Distribution

| Folder | Files | Role |
|--------|------:|------|
| `+Inbox` | 8 | Capture queue |
| `00-Meta` | 83 | System docs, guides, gamification |
| `01-MOCs` | 20 | Navigation hubs |
| `02-Dots` | 46 | Atomic knowledge |
| `03-Efforts` | 14 | Active/ongoing/simmering projects |
| `04-Sources` | 28 | External references |
| `05-Calendar` | 18 | Periodic notes |
| `06-Archive` | 59 | Completed/inactive |
| `99-System` | 166 | Scripts, config, CIS enums |
| `Templates` | 158 | 3-tier template system |
| **Total** | **600** | Vault files (excl. `.obsidian`, `.git`) |

> **Note:** `_Metrics Cache.md` reports **1,322 total notes** (includes notes counted within sub-notes, prompts, and system files not tracked by folder count above).

---

## 📈 Metrics Snapshot

*Source: `00-Meta/_Metrics Cache.md` — last updated 2026-02-14*

### Core Counts

| Metric | Value |
|--------|------:|
| Total notes | 1,322 |
| Atomic notes | 22 |
| Effort notes | 13 |
| Source notes | 25 |
| MOC notes | 17 |
| Daily notes | 17 |
| Archived notes | 58 |
| Inbox items | 7 |

### Prompt Library

| Metric | Value |
|--------|------:|
| Total prompts | 385 |
| Active prompts | 0 |
| Draft prompts | 383 |

> ⚠️ No prompts currently marked `active`. Recent work (2026-03-13) focused on prompt library deduplication — activation pass pending.

### Processing Health

| Metric | Value |
|--------|------:|
| Notes created | 972 |
| Notes processed | 975 |
| Processing rate | **100%** ✅ |
| Inbox backlog | 7 |

---

## 🔗 Connection Health

| Metric | Value |
|--------|------:|
| Total connections | 280 |
| Connected notes | 99 |
| Orphan notes | 1,223 |
| Connection density | 7% |
| Avg connections/note | 0.2 |

**Top hub notes:**

| Note | Connections |
|------|------------:|
| 🗺️My PKM MOC | 9 |
| +About Sourcesℹ️ | 8 |
| 🏠 Home Maintenance System | 8 |
| MOC - Visual Identity | 7 |
| Performance Metrics | 7 |
| Prompt Meta-Skills Playbook | 6 |

> ⚠️ **Connection density at 7%** — the majority of notes (1,223) are orphans. This is the most significant structural gap in the vault. Linking sprints or MOC expansion would have high leverage here.

---

## 🎮 Gamification

| Metric | Value |
|--------|------:|
| Total XP | 760 |
| Current level | 7 |
| Next level at | 800 XP |
| Progress to next | 60% |

---

## 📅 Growth Trends

| Metric | Value |
|--------|------:|
| Weekly growth | 972 notes |
| Monthly growth | 1,164 notes |
| Growth rate | 637 |
| Avg notes/day | 38.8 |

---

## 🚀 Active Projects

**`03-Efforts/On/` (active now):**

| Note | Status |
|------|--------|
| Tutorial - Effort - Master Origin Vault | 🔄 active |

**`+Inbox/` (pending processing):**

| File | Notes |
|------|-------|
| Claude Skills for PKM.md | Capture — unprocessed |
| TODOfrom Import Json.md | Import artifact — review needed |
| Template Audit Report.md | System audit — actionable |
| Tutorial - Raw Capture (Coffee Chat).md | Raw capture |
| Tutorial - Raw Capture (Mycelium).md | Raw capture |
| Vault Consistency - Decisions Needed.md | Decisions backlog |
| _Inbox_Data.base | Bases config |

---

## 🛠️ System Infrastructure

### Scripts (`99-System/Scripts/`)

35 JavaScript files — core automation layer:

| Category | Scripts |
|----------|---------|
| Template engine | `Templater_script.js` |
| YAML tooling | `yaml_orchestrator.js`, `yaml_validator.js` |
| Classification | `smart-classifier.js`, `auto-metadata.js` |
| Processing | `batch-process-inbox.js`, `quick-process-atomic.js`, `quick-process-effort.js`, `quick-process-source.js`, `process-note-safe.js` |
| Maturity | `maturity-promoter.js`, `maturity-evolve.js` |
| Metrics | `metrics-core.js`, `update-metrics-cache.js` |
| Reporting | `generate-weekly-report.js` |
| Archival | `archive_note.js`, `archive-old-dailies.js` |
| Workflow UI | `status-picker.js`, `status-progression.js` |

### Templates (`Templates/`)

158 files across 15 categories — 3-tier modular system:

- **Meta** (YAML frontmatter) — `Templates/Meta/`
- **Body** (content structure) — `Templates/Body/`
- **Create** (composition entry points) — `Templates/Create/`
- **Static** (standalone fallbacks) — `Templates/Static/`
- **Calendar** — `Templates/Calendar/`
- **Core snippets** — `Templates/Core/`

Supported full types: `atomic`, `effort`, `source`, `moc`, `meeting`, `prompt`, `person`, `place`, `tool`, `area`

### CIS Enums

30+ canonical value files in `99-System/CIS/` — single source of truth for all YAML field values.

---

## 📆 Recent Git Activity

```
a576a05  feat: add prompt library dedup & consolidation scripts
342564d  vault: pre-prompt-consolidation backup
b4b3e8b  chore: remove redundant MOC - All Prompts
7b8e8a5  vault: bulk consistency fixes — links, MOC, frontmatter
8c32ae6  vault: pre-consistency-fix backup
1493a5c  vault: backup 2026-03-03 — base views standardization & upgrade
144fe2f  docs: update CHANGELOG — distribution, config mgmt, QuickAdd finals
1157328  Update manual 2802
fbee9bc  feat: add .gitignore, plugin manifest, build script
e74cfed  fix: use correct Dataview syntax for energy tag filtering
```

**Current branch focus:** Prompt library consolidation and deduplication.

---

## 🩺 Health Summary

| Dimension | Score | Signal |
|-----------|-------|--------|
| Inbox health | ✅ | 7 items — low backlog |
| Processing rate | ✅ 100% | All captured notes processed |
| Projects health | 🔴 | Only 1 active effort |
| Connection health | 🔴 | 7% density — high orphan rate |
| Prompt library | 🟡 | 385 prompts, 0 active — activation needed |
| Gamification | 🟡 | Level 7, 60% to Level 8 |
| Overall health | 🟢 80/100 | System stable |

---

## 🎯 Recommended Next Actions

1. **Activate prompts** — Run post-consolidation activation pass on the prompt library. Mark winners from `draft` → `active`.
2. **Reduce orphan notes** — Connection density at 7% is the largest structural gap. Consider a linking sprint or MOC expansion targeting `02-Dots/100-Atomics`.
3. **Process inbox** — 6 actionable inbox files, especially `Vault Consistency - Decisions Needed.md` and `Template Audit Report.md`.
4. **Refresh metrics cache** — Cache is ~27 days stale (last updated 2026-02-14). Run "Update Metrics Cache" via QuickAdd.
5. **Open new efforts** — Only 1 active project. Review `Simmering/` for candidates to promote to `On/`.

---

*Generated by Claude Code · Origin PKM v2.0 · 2026-03-13*
