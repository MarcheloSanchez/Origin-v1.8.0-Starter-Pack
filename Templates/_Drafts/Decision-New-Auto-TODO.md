<%*
const title = await tp.system.prompt("Decision title (ADR)");
const status = await tp.system.suggester(["proposed","accepted","rejected","superseded"],["proposed","accepted","rejected","superseded"]);
const owner = await tp.system.prompt("Owner / Approver");
%>
---
up: "[[200-Architecture]]"
in: "[[215-Decisions]]"
title: ADR — <% title %>
aliases: []
type: decision
fileClass: Decision
tags:
  - 🧭decision
status: <% status %>
owner: <% owner %>
date: <% tp.date.now("YYYY-MM-DD") %>
supersedes: 
superseded_by: 
---

# ADR — <% title %>

## Context
*Background, constraints, drivers.*

## Options
1)  
2)  
3)  

## Decision
*Chosen option and rationale.*

## Consequences
- Positive:  
- Negative / Risks:  

## Links
- Related: 
- Tickets/PRs: 
