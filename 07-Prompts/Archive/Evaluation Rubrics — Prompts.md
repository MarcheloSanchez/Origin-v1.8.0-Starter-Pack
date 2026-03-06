---
title: Evaluation Rubrics — Prompts
type: evaluation
tags: 
  - 🧹tidy
created: "2025-10-21"
modified: 2026-03-03
---
# Evaluation Rubrics — Prompts

## Writing/Docs rubric (0–5 each; weight in parentheses)
- Faithfulness (3): No fabricated facts vs. sources
- Structure (2): Headings, topic sentences, logical flow
- Actionability (2): Clear TL;DR/CTA, decisions supported
- Style (1): Matches house style & persona
- Evidence Use (2): Claims cite notes/sources

**Composite score:** weighted sum / 10 → `eval_score`

## Procedure
- Run on `control set` (3–5 representative inputs)
- Score manually or via a grading prompt
- If `eval_score ≥ 8.5`, mark prompt `status: winner`
