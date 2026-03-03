---
title:
  "{ title }":
type: prompt
fileClass: Prompt
tags:
  - 🤖AI/prompt
status: 📦archived
created:
  "{ date:YYYY-MM-DD }":
modified:
  "{ date:YYYY-MM-DD }":
audience:
  - operator
difficulty: medium
prompt_category:
prompt_type: generation
related: []
context_packs:
  - "[[House Style Guide]]"
  - "[[Glossary & Abbreviations]]"
  - "[[Evidence Bank]]"
eval_score:
format_pref: markdown
id:
  - - date: YYYYMMDD+title:slug
intent: create
language:
  - en
last_run:
length: medium
model_defaults:
  provider: openai
  model: gpt-4o
  temperature: 0.2
owner: personal
pattern:
  - - Pattern — <choose>
prompt_subcategory:
  - <enum>
source: obsidian
summary:
  "{ one-line purpose/outcome }":
tone: clear
tools: []
version: 1.0.0
---

# 💡 {{title}}

> [!summary] Mission
> {{summary}}

## Inputs
- **{var1}** — …
- **{var2}** — …

```json
{
  "inputs_schema": {
    "var1": {"type":"string","required":true,"example":"Photosynthesis"},
    "var2": {"type":"string","required":false,"default":"operator"}
  }
}
```
## Constraints & Guardrails
- …
- …

## Deliverable (Output Schema)
```json
{
  "deliverable_schema": {
    "sections":[{"heading":"string","content":"string"}],
    "format":"markdown",
    "requirements":["TL;DR","Headings","First-use expansions"]
  }
}
```

## Quality Gates (Definition of Done)
- ✅ …
- ✅ …

## Canonical Prompt
```
You are {role}. Follow House Style. …
Inputs: {var1}, {var2}
Output: {deliverable spec}
Constraints: {limits}
```

## Examples
XY

## Known Limits & Risks

- …
    
## Evaluation Hooks
- Rubric: [[Evaluation Rubrics — Prompts#Writing/Docs rubric]]
- Control set: [[Benchmarks — <topic>]]
- Grader: [[Docs]]
## Experiments
- [[Experiment — {{title}} — {{date:YYYYMMDD}} — gpt-4o]]
## Changelog
- 1.0.0 ({{date:YYYY-MM-DD}}) — Initial.


