<%*
const name = await tp.system.prompt("Pattern / Heuristic name (e.g., STRIDE, CRUD coverage)");
const use_case = await tp.system.prompt("Primary use case (e.g., threat modeling, coverage)");
const priority = await tp.system.suggester(["high","medium","low"],["high","medium","low"]);
const status = await tp.system.suggester(["📥inbox","🔄 active","✅completed","📦 archived"],["📥inbox","🔄 active","✅completed","📦 archived"]);
%>
---
up: "[[310-Patterns]]"
in: "[[310-Patterns]]"
title: <% name %>
aliases: []
type: pattern
fileClass: Pattern
tags:
  - ♟️pattern
  - <% use_case %>
status: <% status %>
priority: <% priority %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
last_review: <% tp.date.now("YYYY-MM-DD") %>
review_frequency: quarterly
related: []
---

# ♟️ <% name %>
**Use case:** <% use_case %> • **Status:** <% status %>

## When to use
- 

## How to apply
1. 
2. 
3. 

## Anti-patterns
- 

## References
- [ ](#)
