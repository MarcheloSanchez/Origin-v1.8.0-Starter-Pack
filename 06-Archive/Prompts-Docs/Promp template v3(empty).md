---
title: 
type: prompt
fileClass: Prompt
tags: 
status: 📦archived
created: 
modified: 
audience: 
prompt_category: education
prompt_type: generation  # generation | critique | evaluation | rewrite | convert
related: []
context_packs: 
eval_score:
id: 
intent: create           # create | explain | decide | compare | extract | transform
language: [en, cs]
last_run:
model_defaults:
  provider: openai
  model: gpt-4o
  temperature: 0.2
owner: personal
pattern: 
prompt_subcategory: 
source: obsidian
summary: 
version: "1.0.0"
---

## 💡Prompt [TITLE]
[Write the main prompt instruction here. Include role, steps, constraints, and output format.]
## 📝Description 
[1–2 lines: what this prompt does, outcome-focused.]
### Inputs
- **{variable1}** – description  
- **{variable2}** – description  
### Quality Gates
- ✅ Exactly 5 questions; Bloom levels non-duplicated
- ✅ Answer Key present; each rationale ≤ 1 sentence
- ✅ Markdown headings: `### Quiz: {topic}` + `### Answer Key`
- ✅ Language matches `{language}` and `{audience}`

- ✅ Scope aligned with category + intent  
- ✅ Correct Markdown formatting  
- ✅ Output matches target audience & tone  
- ✅ Guardrails respected  
- ✅ Example works with minimal input  
### Guardrails
[List forbidden actions, common errors to avoid.]
## Constraints & Guardrails

- Tone: clear, student-friendly.
- ≤ 30 words per question.
- No duplicate Bloom levels.
- Do not exceed _Analyze_ unless explicitly requested.
- Must include Answer Key with 1-sentence explanations.

## 📋Instructions 
```ENG
[English version of step-by-step instructions]
```

```CZ
[Optional Czech version of instructions, if multilingual]
```
## Example Input
```INPUT
[Provide a minimal input example]
```
## Example Output
```
[Show the expected Markdown output]
```
## 📝Changelog
- **1.0.0 (YYYY-MM-DD)** — Created from empty template.