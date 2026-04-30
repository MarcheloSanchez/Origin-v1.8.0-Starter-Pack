# Skill Design — `reform-note`

**Date**: 2026-04-30
**Status**: Design approved, ready for implementation plan
**Skill location**: `~/.claude/skills/reform-note/SKILL.md`

## Purpose

Take a fast-capture or incomplete note that has been (or will be) assigned a type — `atomic`, `effort`, `source`, `moc`, `meeting`, `area`, `prompt`, `person`, `place`, `tool` — and produce a properly-shaped reformed note matching the type's body chapter structure and YAML schema. **Body shaping only.** YAML normalization is already handled by the existing JS scripts (`yaml_orchestrator.js`, `auto-metadata.js`, `quick-process-*.js`).

## Non-goals

- Not a replacement for `quick-process-*.js` scripts (those handle bulk YAML)
- Not a link-suggester (Smart Notes plugin's territory)
- Not a batch processor (one note per invocation)
- Not a translator (preserves source language)
- Not a fact-finder (does not invent specific names, URLs, dates, numbers)

## Activation

Triggers on:
- `/reform-note <path>`
- Natural language: "reform this note", "shape this into a proper {type}", "process this capture into a real note"

Path is required. Skill never operates on ambiguous input.

## Read budget (hard ceiling ~3500 tokens)

Allowed reads only:

| File | Why |
|---|---|
| Source note (full path supplied by user) | The thing being reformed. Bail if body >2000 tokens. |
| `Templates/Body/{type}-body.md` | Chapter structure |
| `Templates/Meta/{type}-meta.yaml.md` | YAML schema |
| `Templates/_Examples/{Type} Filled Out.md` | Voice/style exemplar |
| `99-System/CIS/CIS_TYPE.md` | Type enum (only when proposing a type) |
| `99-System/CIS/CIS_STATUS.md` | Status enum (only if YAML missing) |
| `99-System/CIS/CIS_MATURITY.md` | Maturity enum (only if YAML missing) |

**Forbidden reads**:
- No vault-wide grep/glob
- No reading linked notes
- No reading other notes of the same type (exemplar covers this)
- No reading dashboards, MOCs, PARA folder contents

**Exemplar fallback**: if `Templates/_Examples/{Type} Filled Out.md` doesn't exist (currently missing for `person`, `place`, `tool`), proceed without exemplar and log a warning in the user-facing report.

## Process flow

```
1. Validate input
   - source path exists and readable
   - source body ≤ 2000 tokens (else bail with reason)

2. Determine type
   - if `type:` in YAML → honor by default
     - if STRONG mismatch detected (e.g. atomic with action verbs +
       deadlines + multi-step plan), ask once:
       "You marked this `atomic`, but it reads like an `effort` because
       [one reason]. Keep `atomic` or switch to `effort`?"
     - mismatch threshold is conservative; borderline cases default
       to honoring user's choice silently
   - if no `type:` → propose with one-sentence reasoning, wait for
     confirm before continuing

3. Word-count source body (excluding YAML)
   - <20 words → STOP. Tell user "needs more substance, add detail
     and re-invoke."
   - 20–100 words → SCAFFOLD MODE
   - 100+ words → EXPANSION MODE

4. Load reads (per read budget above)

5. Compose reformed note

   YAML (from Templates/Meta/{type}-meta.yaml.md):
   - title: derived from source title or first line
   - type: <decided type>
   - status: 📥inbox       (always — user promotes later)
   - maturity: 📤seed      (always — user promotes later)
   - created: <today>
   - source_capture: "[[<original-filename-without-ext>]]"
   - other fields: leave blank, do not invent
   - wikilinks in YAML scalars MUST be quoted (per MEMORY.md
     YAML wikilink quoting rule)

   Body:
   - Top: `## Original capture` chapter
     Source body verbatim, untouched, inside the chapter.
   - Then: chapters from Templates/Body/{type}-body.md, in template order
     - Chapter has content derivable from source:
       SCAFFOLD MODE → leave a single-line `> [!todo] {chapter} —
       fill in based on capture` callout. Do not write content.
       EXPANSION MODE → write structural draft inside
       `> [!ai-draft]` callout. No invented facts. Match source
       voice/language.
     - Chapter has no derivable content:
       Single-line `> [!todo] {chapter} — not yet developed` callout.
       Do not include a heading + empty body — just the callout.

6. Write output
   - Path: `+Inbox/_reformed/<original-stem>.reformed.md`
   - If exists, append timestamp: `<original-stem>.reformed.<HHMM>.md`
   - Never overwrite

7. Report to user (one short message)
   - Type used (and whether mismatch was flagged)
   - Mode (scaffold/expansion)
   - Output path
   - Any warnings (missing exemplar, ambiguities)
   - Do NOT auto-open in Obsidian
```

## Hard rules

These are stated as the spine of the skill. Each has a *why* so future-Claude can judge edge cases.

| Rule | Why |
|---|---|
| Never edit the source file | User's capture is sacred; reformed is a separate artifact |
| Never write outside `+Inbox/_reformed/` | Predictable output location, bulk review/move/delete |
| Never invent facts, names, URLs, dates, numbers | Preserves intent; expansions are *structural*, not informational |
| Verbatim `## Original capture` block must contain source body unchanged | Audit trail — user can always diff |
| Expansions only in expansion mode (>100 words), wrapped in `> [!ai-draft]` | Visual signal: this came from Claude, not the user |
| One type-mismatch question max, then proceed | No nagging; respect stated type |
| No vault-wide search, no reading other notes | Token discipline; Smart Notes handles relations |
| Single note per invocation | Batch is the JS scripts' job |
| Bail on source body >2000 tokens | Not a fast-capture anymore — doesn't need reforming |
| Output `status:` always `📥inbox` | User decides when it goes live |
| Output `maturity:` always `📤seed` | Promotion is a human decision |
| Czech content stays Czech, English stays English | Don't translate, don't mix |
| Don't suggest `related`/`up`/`parent` links beyond `source_capture` | Smart Notes plugin's territory |
| Wikilinks in YAML scalar fields must be quoted (`up: "[[Page]]"`) | Per MEMORY.md gotcha — unquoted wikilinks get re-parsed as flow arrays |

**Tone rule** (for expansion-mode content):
- Match source voice and language
- Short sentences, no marketing voice
- No "In this note, we will explore..." preambles

## Output anatomy (reference)

```markdown
---
title: <derived>
type: <type>
status: 📥inbox
maturity: 📤seed
created: 2026-04-30
source_capture: "[[<original-stem>]]"
tags: []
---

## Original capture

<source body verbatim>

## <Chapter 1 from template>

> [!todo] <Chapter 1> — not yet developed

## <Chapter 2 from template>

> [!ai-draft]
> <structural draft, no invented facts>

> [!todo] <Chapter 3> — fill in based on capture
```

(Chapters with content vs without are distinguished by callout type. No empty `## Heading` followed by blank body.)

## Failure modes & responses

| Trigger | Response |
|---|---|
| Source path doesn't exist | "Source not found: `<path>`" — stop |
| Source body >2000 tokens | "Source too long for reform — already developed past capture stage" — stop |
| Source body <20 words | "Needs more substance (only N words). Add detail and re-invoke." — stop |
| No `type:` in YAML | Propose type + reason, wait for confirm |
| Strong type mismatch | Ask once, accept either answer |
| Missing exemplar for type | Proceed without exemplar, warn in report |
| Output path already exists | Append `.HHMM` timestamp suffix |

## What this skill does NOT decide

- Where the reformed note ultimately lives (PARA folder) — user moves it from staging
- Whether the original gets deleted/archived — user's choice
- Whether tags get added beyond what's in the meta template — user adds later
- What links should connect this note to others — Smart Notes plugin

## Open question

Currently missing exemplars in `Templates/_Examples/`: `person`, `place`, `tool`. Skill works without them but warns. Recommend adding them as a follow-up task — outside this skill's scope.

## Implementation notes

- Skill file: `~/.claude/skills/reform-note/SKILL.md`
- Frontmatter: `name: reform-note`, single-paragraph `description` covering "use when reforming a fast-capture or incomplete note into a properly-typed note matching the vault's body chapter template, without modifying the source"
- No supporting scripts — the skill is purely instructional. All file ops use Claude Code's Read/Write/Edit tools directly.
- Hard rules are embedded directly in the skill file (skills must be self-contained — Claude reads `SKILL.md` not external docs at activation). This design doc is reference material; if rules change, update both.
