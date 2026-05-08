---
name: origin-vault
description: Use this skill when working inside the Origin Obsidian vault. Origin is a structured GTD-inspired PKM system with locked enums, a 9-folder hierarchy, fileClass conventions, an ordered YAML schema enforced by yaml_orchestrator.js, and Czech/English bilingual content. Triggers on paths like +Inbox, 02-Dots, 03-Efforts, 04-Sources, 05-Calendar, 99-System; YAML frontmatter containing emoji status/maturity values; or when the user mentions Origin, Dots, Efforts, MOCs, CIS, or fileClass. Read this before any vault operation — generic Obsidian conventions will produce output that breaks Origin's automation.
---

# Origin Vault Skill

You are operating inside the Origin Obsidian vault. Read this entire file before performing any action on vault files. Generic Obsidian conventions are not sufficient — Origin has locked enums, an enforced YAML order, and a tiered access model the user has built deliberately.

## Architecture: 9-Folder Structure

| Folder | Purpose | Type expected |
|--------|---------|---------------|
| `+Inbox` | Capture zone — ALL new content enters here | mixed |
| `00-Meta` | System docs, governance, dashboards | source/atomic |
| `01-MOCs` | Maps of Content (navigation hubs) | moc |
| `02-Dots` | Atomic knowledge | atomic, person, place, tool |
| `03-Efforts` | Projects | effort |
| `04-Sources` | External references | source, meeting |
| `05-Calendar` | Daily/Weekly/Monthly/Quarterly notes | (calendar templates) |
| `06-Archive` | Completed/inactive | archive |
| `07-Prompts` | AI prompt library | prompt |
| `99-System` | Templates, scripts, CIS — DO NOT MODIFY | infrastructure |

### `02-Dots` substructure
- `100-Atomics/` → ideas, concepts, frameworks, principles, patterns, mental-models
- `200-Areas/` → life domains (career, health, finance, etc.)
- `300-People/` → contacts (`type: person`)
- `400-Places/` → locations (`type: place`)
- `500-Tools/` → software/equipment (`type: tool`)
- `X/` → unclassified holding (avoid leaving things here)

### `03-Efforts` substructure
- `Ongoing/` → active projects
- `Simmering/` → paused/future
- `On/` → near completion

## LOCKED Enums — never invent new values

### `type`
`atomic | effort | source | moc | meeting | person | place | tool | prompt | archive`

### `status`
`📥inbox | 🔄active | ⏳waiting | ✅completed | 📦archived`

### `maturity` (atomics only)
`🌱seed | 🌿seedling | 🪴sapling | 🌲evergreen | 🍎fruit`

If you encounter a value outside these enums, flag it as a violation in your output. Do not "fix" it by guessing — the user's CIS files in `99-System/CIS/` are the source of truth and you are not permitted to modify them.

## YAML Frontmatter

### Universal fields (every note)
```yaml
title: 
type: 
status: 
created: YYYY-MM-DD
modified: YYYY-MM-DD
tags: 
related: 
  - "[[]]"
fileClass: 
```

### Field order (enforced by yaml_orchestrator.js)

When writing or editing YAML, follow this canonical order:

1. **Navigation**: `up`, `in`
2. **Identity**: `title`, `aliases`, `type`, `fileClass`, `cssclass`, `tags`
3. **State**: `status`, `maturity`, `priority`, `processing_priority`, `completeness`, `coverage_areas`, `action_required`
4. **Time**: `created`, `modified`, `start`, `due`, `deadline`, `end`, `last_review`, `review_frequency`, `estimated_effort`
5. **Actions/Progress**: `completion_percentage`, `next_actions`, `capture_method`, `linked_notes_count`
6. **Knowledge/Quality**: `confidence_level`, `evidence_quality`, `read_status`, `rating_type`
7. **Source**: `source_author`, `source_date`, `source_type`
8. **Context**: `participants`, `location`, `meeting_type`, `action_items`
9. **Specialized**: `audience`, `difficulty`, `prompt_category`, `prompt_type`
10. **Relations**: `related`, `see_also`, `related_concepts`, `related_ideas`
11. **People**: `role`, `org`, `company`, `email`, `phone`, `website`, `twitter`, `github`, `linkedin`

If you are unsure about ordering, defer to `99-System/Scripts/yaml_orchestrator.js` and recommend the user run it in `reorder` mode rather than reordering by hand.

### Maturity → exit criteria

| Stage | Icon | Criteria | Exit Condition |
|-------|------|----------|----------------|
| Seed | 🌱 | Raw capture | Basic metadata + moved from Inbox |
| Seedling | 🌿 | Some development | 2+ links, structured content |
| Sapling | 🪴 | Well-connected | 5+ links, 2+ backlinks |
| Evergreen | 🌲 | Stable, mature | 10+ links, referenced in MOC |
| Fruit | 🍎 | Publishable | Adapted for external audience |

When suggesting maturity upgrades, verify the criteria are actually met (count links/backlinks). Don't propose upgrades on vibes.

## Boundaries

### 🔴 LOCKED — never modify

- `99-System/CIS/*` (controlled vocabularies)
- `.obsidian/*` (plugin configs, hotkeys, core settings)
- `99-System/Config/*` (system configuration)
- Top-level folder structure (`+Inbox`, `00-Meta` … `06-Archive`, `07-Prompts`, `99-System`)
- Folder numbering scheme (`00-06`, `99` prefixes)
- Status emoji set, maturity emoji set, type enum

If a request requires touching any of these, **propose the change for the user to make**. Do not execute.

### 🟠 PROTECTED — only on explicit request

- `99-System/Scripts/*` — `yaml_orchestrator.js`, `archive_note.js`, `smart-classifier.js`, `auto-metadata.js`, `quick-process-atomic.js`, `batch-process-inbox.js`
- `Templates/*`
- `My PKM *.md` files (content edits OK; structural changes need explicit approval)
- `00-Meta/*` dashboards (query updates OK on request; layout changes need approval)

For any of these: propose changes with clear before/after, ask before applying, and offer rollback instructions.

### 🟡 GUIDED — confirm approach first

- New MOCs in `01-MOCs`
- New Efforts in `03-Efforts`
- Bulk operations affecting >5 files
- Tag refactoring
- Maturity upgrades
- Moving notes between folders

Briefly state the approach, get a yes, then execute.

### 🟢 OPEN — proceed

- Creating notes in `+Inbox`, `02-Dots`, `03-Efforts`, `04-Sources`, `05-Calendar`, `06-Archive`
- Adding wikilinks
- Filling YAML metadata for new notes
- Running queries or generating reports
- Suggesting links, classifications, or improvements

## Existing Automation — augment, don't duplicate

The user has already built:

- **`yaml_orchestrator.js`** — modes: `reorder`, `normalize`, `lint`. Handles YAML key ordering, value validation against CIS, required-field insertion. Run via Templater user-script.
- **`archive_note.js`** — archival via `Ctrl+Alt+A`
- **`smart-classifier.js`** — Ollama-based AI classification (returns type/status/tags/priority/energy/maturity/confidence)
- **`auto-metadata.js`** — auto-fill metadata
- **`quick-process-atomic.js`** — one-click atomic processing with maturity calculation
- **`batch-process-inbox.js`** — bulk Inbox processing (90% time reduction reported)

Before proposing new automation, check whether the gap is actually a gap. The new layer (Claude Code commands) handles **synthesis and reflection** — what existing scripts don't do. It complements the classification/metadata layer; it does not replace it.

## Conventions

### Filename patterns
- Atomics: `💡 [Title]` or `🌱 [Title]` for early-stage
- Sources: `📚 Source - [Author] - [Title]`
- Efforts: `🚀 [Project Name]`
- People: `👤 [Name]`
- Tools: `🔧 [Tool Name]`
- MOCs: `🗺️ [Topic] MOC`
- Filenames must be under 60 characters
- No special path characters (mobile compatibility)

### Dates
- ISO `YYYY-MM-DD`, always
- No locale-dependent formats

### Wayfinder navigation
Many notes start with a callout like:
```
> [!orbit] Wayfinder | [[🗺️My PKM MOC]] | [[🏛️My PKM Governance]] | ...
```
Preserve these when editing. They are deliberate navigation infrastructure.

### Wikilinks
- Aim for 3+ meaningful links per note
- Bidirectional matters — important connections work both ways
- Verify a link target exists before suggesting it (don't invent)

### Language
Origin is **bilingual**. Czech is the user's native language; English is used for technical terms and structure. Mixed-language content within a single note is normal and intended.

- **Do not auto-translate** Czech to English or vice versa
- **Match the user's voice** in the section you're editing
- If a daily note is mostly Czech, write your synthesis in Czech (or matching mixed style)
- Flag content that appears machine-translated rather than written by the user

## Operating Principles

1. **Audit before building.** Search existing notes/scripts/My PKM docs before proposing new ones. The user has explicitly told you generic conventions will not fit Origin.
2. **Complete content over templates.** When asked to produce a deliverable, produce the deliverable, not a placeholder structure.
3. **Drafts to react to, not outputs to accept.** AI synthesis is a starting point for the user's reaction. Never substitute for their thinking.
4. **Respect locked structure.** If a request would touch `99-System` or CIS, propose changes for the user to make rather than executing.
5. **Bilingual care.** Preserve language as written. Do not auto-translate. Flag machine-translated-looking sections.
6. **No filler.** If a section has nothing real to say, say "(none)" or "(žádné)" instead of padding.
7. **Honest synthesis.** If a day was unproductive, say so. Echoing mood without truth is worthless.

## Reference Documents (in vault)

For deeper context, read these directly when relevant:

- `Origin_Claude_Briefing.md` — full system context (this skill summarizes it)
- `Origin_Claude_Boundaries.md` — full boundary framework
- `Origin_v2.0_Clarifications.md` — known issues backlog
- `🏛️My PKM Governance.md` — official rules
- `🔁My PKM Workflows.md` — daily/weekly/monthly/quarterly review structures
- `🔢My PKM Metadata.md` — full YAML schema details
- `Guide — YAML Orchestrator.md` — orchestrator usage and modes
- `🗃️My PKM Glossary.md` — Czech/English term definitions

When in doubt, read the source. This skill is a summary; the linked docs are authoritative.
