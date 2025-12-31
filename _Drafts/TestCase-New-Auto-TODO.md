<%*
const title = await tp.system.prompt("Test Case title");
const component = await tp.system.prompt("Component / Feature");
const priority = await tp.system.suggester(["P1","P2","P3"],["P1","P2","P3"]);
const status = await tp.system.suggester(["draft","ready","blocked","deprecated"],["draft","ready","blocked","deprecated"]);
%>
---
up: "[[700-Testing]]"
in: "[[710-Test-Cases]]"
title: TC — <% title %>
aliases: []
type: tc
fileClass: TC
tags:
  - ✅tc
  - <% component %>
priority: <% priority %>
status: <% status %>
component: <% component %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
owner: 
preconditions: 
---

# TC — <% title %>

## Scope
**Component:** <% component %> • **Priority:** <% priority %> • **Status:** <% status %>

## Preconditions
- 

## Steps & Expected
| # | Step | Expected |
|---|------|----------|
| 1 |  |  |
| 2 |  |  |
| 3 |  |  |

## Data
- 

## Notes / Evidence
- Screenshot: 
- Logs: 
