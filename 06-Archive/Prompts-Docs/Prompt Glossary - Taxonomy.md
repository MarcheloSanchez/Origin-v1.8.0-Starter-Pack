---
title: "Prompt Glossary - Taxonomy"
status: 📦archived
modified: 2026-03-03
---

[[MOC - Prompts]]
- Identity & lifecycle: `id`, `title`, `status`, `version`, `owner`, `created`, `modified`
    
- Retrieval tags you actually filter on: `tags`, `prompt_category`, `prompt_subcategory`, `audience`
    
- **Purpose & outcome**: `summary`, `intent` (e.g., create/critique/convert), `prompt_type` (generation, evaluation, rewrite)
    
- **Inputs** (the variables users fill): human-readable + a tiny `inputs_schema` (so you can validate)
    
- **Constraints & Guardrails** (specific to this prompt)
    
- **Deliverable/Output schema** (so you can evaluate & parse)
    
- **Quality Gates** (definition of done)
    
- **Examples** (1 input/output gold pair is plenty)
    
- **Ops fields**: `pattern` (which pattern it uses), `model_defaults` (optional), `last_run`, `eval_score`
    
- **Links**: `related`, `context_packs` (style guide, glossary), `experiments`

---

# Taxonomy
>  Canonical Options (Enums)

## Intent
- create | critique | explain | decide | compare | extract | transform

## Prompt Type
- generation | evaluation | rewrite | convert | chain-of-checks

## Audience
- student | teacher | operator | decision-maker | general

## Tone
- clear | formal | friendly | technical | concise | persuasive

## Length
- micro | short | medium | long

## Difficulty
- easy | medium | hard | expert

## Deliverable Format
- markdown | json | table | checklist | memo | sop

## Bloom Levels
- Remember | Understand | Apply | Analyze | Evaluate | Create

## Status
- draft | active | winner | archived

# Field Conventions
- `tags`: top-level topic + medium, e.g., `🤖AI/prompt`, `🎓education`
- `pattern`: always link to a Pattern note
- `language`: ISO codes list, default `[en]`
- `owner`: personal | team | shared
