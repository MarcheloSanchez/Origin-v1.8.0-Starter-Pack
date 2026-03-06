# Prompt — Start Here

## Mandatory fields (must fill before first run)
- **title** — human outcome
- **summary** — 1 sentence
- **status** — draft/active/winner/archived
- **prompt_category / prompt_subcategory** — pick from [[Prompt Taxonomy]]
- **prompt_type** — generation/evaluation/…
- **intent** — create/explain/decide/…
- **audience** — persona
- **pattern** — link a [[Prompts — Patterns]] entry
- **inputs** + **inputs_schema** — name, type, required
- **deliverable_schema** — fields, types, required
- **canonical prompt** — the exact text to run

## Where to find what
- **Enums & allowed values** → [[Prompt Taxonomy]]
- **Style & expectations** → [[House Style Guide]]
- **Evaluation rules** → [[Prompts — Evaluation Rubrics]]
- **Known pitfalls** → [[Failures & Anti-Patterns]]
- **Overview** → [[Prompt Dashboard NEW]]

## Default Workflow
1) Select pattern → 2) Slot task specifics → 3) Run small sample → 4) Evaluate using rubric → 5) Revise prompt → 6) Run full set → 7) Document results

## Quality gates (pre-run)
-  Inputs are named & typed (schema present)
-  Deliverable schema defined (parse/grade possible)
-  Constraints & guardrails listed
-  Example input/output present
## After first run
-  `last_run` set
-  `eval_score` recorded
-  If ≥ target → set `status: winner`, else iterate
## Pro tips
- Keep prompts **atomic** (one job). Use `related:` to chain.
- Put reusable rules in **patterns**; keep the prompt lean.
- Always link to **House Style** and **Glossary** to enforce expansions and headings.

## (Optional) Tiny **Templater** helpers

**New Prompt hotkey**
```templater
<%* 
tR = tp.file.title
-%>
<% tp.file.move("Prompts/" + tR) %>
<% tp.file.include("[[Template — Prompt (Canonical)]]") %>
```

## Stamp run result

```
last_run: <% tp.date.now("YYYY-MM-DD") %>
eval_score: <%* tR = await tp.system.prompt("Eval score 0-10?"); tR %>
```