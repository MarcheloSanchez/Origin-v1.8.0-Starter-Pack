<%*
const tool_name = await tp.system.prompt("Tool name (e.g., Playwright, Docker, FastKeys)");
const tool_type = await tp.system.suggester(
    ["automation", "testing", "productivity", "devops", "database", "editor", "ai", "utility", "hardware", "other"],
    ["automation", "testing", "productivity", "devops", "database", "editor", "ai", "utility", "hardware", "other"],
    false,
    "Select main category"
);
const priority = await tp.system.suggester(["high","medium","low"],["high","medium","low"]);
const tool_status = await tp.system.suggester(["🧩 exploring","🧠 learning","✅ mastered","📦 archived"],["🧩 exploring","🧠 learning","✅ mastered","📦 archived"]);
const maturity = await tp.system.suggester(["🌱 seedling","🌿 sapling","🌳 mature"],["🌱 seedling","🌿 sapling","🌳 mature"]);
const review_frequency = await tp.system.suggester(["monthly","quarterly","as-needed"],["monthly","quarterly","as-needed"]);
%>
---
in: "[[500-Tools]]"
title: <% tool_name %>
aliases: []
type: tool
fileClass: Tool
tags: 
  - 🧰tool
  - <% tool_type %>
tool_status: <% tool_status %>
maturity: <% maturity %>
priority: <% priority %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
last_review: <% tp.date.now("YYYY-MM-DD") %>
review_frequency: <% review_frequency %>
related: []
---

# 🧰 <% tool_name %>

## 📘 Overview
**Type:** <% tool_type %>  
**Status:** <% status %>  
**Priority:** <% priority %>  
**Review frequency:** <% review_frequency %>

> **Purpose:** What does this tool primarily help you achieve?  
> **Context:** Where or when do you use it (e.g., QA automation, scripting, note-taking)?

---

## ⚙️ Installation
*How to install or configure it (CLI commands, prerequisites, versions, etc.)*

---

## ✨ Key Features
- 
- 
- 

---

## 🧾 Syntax / Command Cheatsheet
| Action | Command / Syntax | Notes |
|--------|------------------|-------|
| | | |
| | | |

---

## 💡 Use Cases
| Scenario | Example | Integration |
|-----------|----------|-------------|
| | | |
| | | |

---

## 🔗 References
- [Official Docs](#)
- [Community / Forum](#)
- [Video / Tutorial](#)

---

*Tool maturity: <% maturity %> • Status: <% status %> • Priority: <% priority %> • Next review: <% review_frequency %>*
