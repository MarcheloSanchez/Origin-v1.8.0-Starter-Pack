<%*
const person_name = await tp.system.prompt("Person name");
const role = await tp.system.prompt("Role or relation (e.g., Mentor, Colleague, Historical Figure, Influencer)");
const org = await tp.system.prompt("Organization / Affiliation (optional)");
const connection_type = await tp.system.suggester(
    ["personal","professional","inspirational","fictional","other"],
    ["personal","professional","inspirational","fictional","other"],
    false,
    "Connection type"
);
const status = await tp.system.suggester(["📥inbox","🔄 active","📦 archived"],["📥inbox","🔄 active","📦archived"]);
const priority = await tp.system.suggester(["high","medium","low"],["high","medium","low"]);
const review_frequency = await tp.system.suggester(["monthly","quarterly","as-needed"],["monthly","quarterly","as-needed"]);
%>
---
up: "[[300-People]]"
in: "[[300-People]]"
title: <% person_name %>
aliases: []
type: person
fileClass: Person
tags:
  - 👤person
  - <% connection_type %>
status: <% status %>
priority: <% priority %>
org: <% org %>
role: <% role %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
last_review: <% tp.date.now("YYYY-MM-DD") %>
review_frequency: <% review_frequency %>
related: []
---

# 👤 <% person_name %>
**Role:** <% role %>  
**Affiliation:** <% org %>  
**Connection:** <% connection_type %>  
**Priority:** <% priority %>

---

## 💬 Summary
*A short description of who this person is and why they matter in your network or field.*

---

## 🧩 Context & Relationship
- **First contact / discovery:**  
- **Collaboration / influence:**  
- **Current status:** <% status %>  

---

## 🧠 Key Insights / Learnings
- 
- 

---

## 📚 References & Sources
- [LinkedIn / Website](#)
- [Talks / Publications](#)
- [Shared Projects](#)

---

*Status: <% status %> | Priority: <% priority %> | Next review: <% review_frequency %>*
