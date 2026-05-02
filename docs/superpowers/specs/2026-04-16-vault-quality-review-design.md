# Vault Quality Review System — Design Spec

**Date:** 2026-04-16  
**Status:** Approved  
**Scope:** Origin v1.9.1 vault (~1028 notes)

---

## Problem

The vault accumulates structural inconsistency over time:
- Two competing navigation callout patterns exist (`[!orbit]` vs `[!abstract]`)
- `up:` parent link exists in YAML but not visually surfaced in the note body
- YAML automation (lint/reorder/normalize) exists but no body structure enforcement
- No standard for what "good" looks like per note type

---

## Goal

Define and enforce a uniform quality standard across all note types, prioritised by frequency of use. Extend existing QuickAdd automation with one new script for orbit callout generation.

---

## Quality Standard

### Universal Dimensions (all note types)

| Dimension | Pass Condition |
|---|---|
| **Orbit callout** | `[!orbit]` present as first content line after frontmatter |
| **YAML completeness** | `type`, `status`, `maturity`, `tags`, `up`, `created` filled with canonical values |
| **Body** | At least one heading + substantive content (not stub or empty) |
| **Connections** | At least one `related` link OR backlink from a MOC/effort |
| **Maturity honesty** | Not stuck at `📤seed` if note has real content |

### Canonical YAML Values (reminder)

- **Status:** `📥inbox` `🔄active` `⏳waiting` `✅completed` `📦archived` `❌cancel` `⚠️blocked`
- **Maturity:** `📤seed` `🌱seedling` `🪴sapling` `🌲evergreen` `🍓fruit`
- **Priority:** `high` `medium` `low`
- **Field names:** `due` (not `deadline`), `related` (not `relatedNotes`), `up` (breadcrumb parent)

---

## Navigation Callout Standard

### Chosen pattern: `[!orbit]`

The `[!orbit]` callout is the single navigation standard. All other patterns (`[!abstract]`, `⬆️::` inline field) are to be replaced during the review pass.

### Content by Type (context-dependent)

| Type | Orbit contains |
|---|---|
| `atomic` | Parent MOC + 2-3 closely related atomics |
| `source` | Parent MOC + effort it feeds (if any) |
| `effort` | Parent MOC + related efforts |
| `moc` | Sibling MOCs + key children |
| `system` | Sibling system docs in same folder (00-Meta) |

### Format

```markdown
> [!orbit] Wayfinder | [[Parent MOC]] | [[Sibling or Related 1]] | [[Sibling or Related 2]]
```

Callout must be the **first line of content** after the YAML frontmatter block. No blank line between `---` and the callout.

---

## New Automation: `generate-orbit.js`

A new QuickAdd UserScript that generates/updates the `[!orbit]` callout for the active note.

### Behaviour

1. Read `up:` from frontmatter → identify parent note
2. Open parent note → extract outgoing wiki-links (siblings/children)
3. Read active note's own outgoing links
4. Determine note type → apply context-dependent orbit content rules
5. Build `[!orbit]` callout string
6. **Replace** existing `[!orbit]` callout if present, OR insert after closing `---` of frontmatter
7. Show Obsidian `Notice` confirming what was inserted

### Idempotent

Safe to re-run on any note. Always overwrites existing callout with freshly computed version.

### Location

`99-System/Scripts/generate-orbit.js`

### QuickAdd Registration

Add to existing YAML Automation menu (`🔢YAML - Automation ⚡`) as:
`🧭 Generate Orbit Callout`

---

## Per-Note Workflow (Extended)

```
Open note
  → QuickAdd: YAML lint / reorder / normalize   (existing)
  → QuickAdd: Generate Orbit Callout             (new)
  → Manual: review body structure                (human judgment)
  → Manual: adjust maturity if needed            (human judgment)
```

---

## Execution Order

Type by type, most-used first:

1. `atomic` — largest volume, highest daily use
2. `source` — reference notes, frequently consulted
3. `effort` — active projects
4. `moc` — navigation hubs
5. `system` — 00-Meta governance docs (separate pass, find + resolve callout inconsistencies)

---

## Out of Scope

- Automated body structure enforcement (manual review only)
- Bulk fix scripts (Approach A) — deferred
- COOK vault or other vaults
- Notes in `06-Archive/` — lower priority

---

## Examples — What a Quality Note Looks Like

### Atomic note

```markdown
---
title: "Confirmation Bias"
type: atomic
status: 🌱seedling
maturity: 🪴sapling
tags:
  - 💡atomic
  - 🧠psychology
up: "[[🧠 Psychology MOC]]"
created: 2026-03-10
modified: 2026-04-16
related:
  - "[[Dunning-Kruger Effect]]"
  - "[[Availability Heuristic]]"
---
> [!orbit] Wayfinder | [[🧠 Psychology MOC]] | [[Dunning-Kruger Effect]] | [[Availability Heuristic]]

# Confirmation Bias

Tendency to search for, interpret, and recall information in a way that confirms one's preexisting beliefs.

## Why it matters

...

## Related
- [[Dunning-Kruger Effect]]
- [[Availability Heuristic]]
```

---

### Source note

```markdown
---
title: "Thinking, Fast and Slow — Kahneman"
type: source
status: 🔄active
maturity: 🌱seedling
tags:
  - 📚source
  - 🧠psychology
up: "[[📚 Books MOC]]"
created: 2026-01-15
modified: 2026-04-16
related:
  - "[[Confirmation Bias]]"
---
> [!orbit] Wayfinder | [[📚 Books MOC]] | [[03-Efforts/Active/PKM Research]]

# Thinking, Fast and Slow

**Author:** Daniel Kahneman  
**Type:** Book

## Key Ideas

...

## Related
- [[Confirmation Bias]]
```

---

### Effort note

```markdown
---
title: "Vault Quality Review"
type: effort
status: 🔄active
maturity: 🌱seedling
tags:
  - 🚀effort
up: "[[🚀 Efforts MOC]]"
created: 2026-04-16
modified: 2026-04-16
related:
  - "[[Origin v2.0]]"
---
> [!orbit] Wayfinder | [[🚀 Efforts MOC]] | [[Origin v2.0]]

# Vault Quality Review

## Goal

...

## Tasks

...
```

---

### MOC note

```markdown
---
title: "🧠 Psychology MOC"
type: moc
status: 🔄active
maturity: 🌲evergreen
tags:
  - 🗺️moc
up: "[[🗺️ Root MOC]]"
created: 2025-11-01
modified: 2026-04-16
---
> [!orbit] Wayfinder | [[🗺️ Root MOC]] | [[🧠 Cognition MOC]] | [[🧬 Biology MOC]]

# 🧠 Psychology MOC

## Core Concepts
- [[Confirmation Bias]]
- [[Dunning-Kruger Effect]]

## Sources
- [[Thinking, Fast and Slow — Kahneman]]
```

---

### System note (00-Meta)

```markdown
---
title: "🔁My PKM Workflows"
type: system
status: 🔄active
maturity: 🌲evergreen
tags:
  - ⚙️system
up: "[[🗺️My PKM MOC]]"
created: 2025-09-30
modified: 2026-04-16
---
> [!orbit] Wayfinder | [[🗺️My PKM MOC]] | [[🏛️My PKM Governance]] | [[🔢My PKM Metadata]] | [[📁My PKM Folders]] | [[🏷️My PKM Tags]]

# 🔁My PKM Workflows

...
```

---

## Open Questions (resolved)

| Question | Decision |
|---|---|
| Which callout style? | `[!orbit]` only |
| Orbit content: fixed or context-dependent? | Context-dependent by type |
| Overwrite existing callout? | Yes — always overwrite |
| Body structure automation? | Manual review only for now |
