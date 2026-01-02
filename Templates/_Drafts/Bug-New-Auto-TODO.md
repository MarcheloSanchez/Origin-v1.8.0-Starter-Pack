<%*
const title = await tp.system.prompt("Bug title (short)");
const component = await tp.system.prompt("Component / Area");
const severity = await tp.system.suggester(["S1-critical","S2-high","S3-medium","S4-low"],["S1-critical","S2-high","S3-medium","S4-low"]);
const status = await tp.system.suggester(["new","triaged","in-progress","fixed","won't-fix","duplicate"],["new","triaged","in-progress","fixed","won't-fix","duplicate"]);
%>
---
up: "[[720-Bugs]]"
in: "[[720-Bugs]]"
title: BUG — <% title %>
aliases: []
type: bug
fileClass: Bug
tags:
  - 🐞bug
  - <% component %>
severity: <% severity %>
status: <% status %>
component: <% component %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
env: 
linked_tc: []
---

# 🐞 BUG — <% title %>

## Summary
*One-liner impact.*

## Environment
- 

## Repro Steps
1. 
2. 
3. 

## Expected vs Actual
- **Expected:**  
- **Actual:**  

## Attachments / Evidence
- 

## Links
- Related TC: 
- Commit / PR: 
