---
up: "[[🏡Home]]"
in:
  - "[[Maps]]"
title: MOC - Prompts
type: moc
fileClass: moc
tags:
  - 🗺️MOC
  - 🤖prompt
status: 🔄active
created: 2026-02-13
modified: 2026-02-13
related:
  - "[[07-Prompts]]"
---

# 🤖 MOC - Prompts

> Navigate the Prompt Library — from active prompts to documentation and workflows.

## Key Links

- [[07-Prompts]] — Prompt Library hub
- [[Prompt Guide]] — How to write and manage prompts
- [[Prompt Taxonomy - Canonical Values]] — All allowed field values
- [[Prompt Categories Catalog]] — Category & subcategory definitions
- [[Prompt Dashboard NEW]] — Active dashboard with Dataview queries
- [[Evaluation Rubrics — Prompts]] — Quality scoring rubrics
- [[Patterns — Prompting]] — Design patterns for prompts
- [[Playbook - Prompt]] — Operational workflows

## Active Prompts

```dataview
TABLE prompt_category, prompt_type, prompt_status, modified
FROM "07-Prompts"
WHERE type = "prompt" AND status = "🔄active"
SORT modified DESC
LIMIT 15
```

## Recently Created

```dataview
TABLE prompt_category, difficulty, created
FROM "07-Prompts"
WHERE type = "prompt"
SORT created DESC
LIMIT 10
```

## By Category

```dataview
TABLE rows.file.link AS Prompts, length(rows) AS Count
FROM "07-Prompts"
WHERE type = "prompt"
GROUP BY prompt_category
SORT length(rows) DESC
```
