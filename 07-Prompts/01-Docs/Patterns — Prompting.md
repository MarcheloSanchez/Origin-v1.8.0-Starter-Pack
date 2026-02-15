---
title: Patterns — Prompting
type: pattern
tags: 
  - 🧹tidy
created: "2026-02-13"
---
# Patterns — Prompting

## 1. Role + Constraint + Deliverable (RCD)
Use when you need consistent tone and output schema.

**Skeleton**
```
You are {role}. Follow {constraints}. Produce {deliverable schema}.  
Inputs: {context bullets}  
Output JSON: {fields}
```

## 2. Few-Shot Scaffolding
Show 1–3 gold examples; then a new input.

## 3. Chain-of-Checks
Ask the model to produce draft → self-critique → final.

## 4. Guardrailed JSON
Force machine-readable output for evals.

## 5. Dual-Pass (Plan then Write)
First pass = outline, second pass = prose.
