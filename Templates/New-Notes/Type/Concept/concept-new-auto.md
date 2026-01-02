<%*
const name = await tp.system.prompt("Concept name (e.g., Idempotency)");
const domain = await tp.system.prompt("Domain (e.g., QA, Security, DevOps)");
const priority = await tp.system.suggester(["high","medium","low"],["high","medium","low"]);
const status = await tp.system.suggester(["📥inbox","🔄 active","📦 archived"],["📥inbox","🔄 active","📦 archived"]);
const review_frequency = await tp.system.suggester(["quarterly","yearly","as-needed"],["quarterly","yearly","as-needed"]);
%>
---
up: "[[Concepts]]"
in: "[[Concepts]]"
title: <% name %>
aliases: []
type: concept
fileClass: Concept
tags: 
  - 📝concept 
  - <% domain %>
status: <% status %>
priority: <% priority %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
last_review: <% tp.date.now("YYYY-MM-DD") %>
review_frequency: <% review_frequency %>
related: []
---

# 🧠 <% name %>
**Domain:** <% domain %> • **Status:** <% status %> • **Priority:** <% priority %>

## TL;DR
*A crisp definition in 1–2 lines.*

## Why it matters
*Impact, risks if ignored, where it shows up.*

## Examples
- 
- 

## Related
- [[ ]]

*Next review: <% review_frequency %>*
