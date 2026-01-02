<%*
const place_name = await tp.system.prompt("Place name (e.g., Ostrava, GitHub, Workspace)");
const place_type = await tp.system.suggester(
    ["city","workspace","digital platform","event venue","nature","organization","other"],
    ["city","workspace","digital platform","event venue","nature","organization","other"],
    false,
    "Select place type"
);
const place_status = await tp.system.suggester(["🧩 exploring","✅ visited","📦 archived"],["🧩 exploring","✅ visited","📦 archived"]);
const priority = await tp.system.suggester(["high","medium","low"],["high","medium","low"]);
const region = await tp.system.prompt("Region / Country (optional)");
const review_frequency = await tp.system.suggester(["quarterly","yearly","as-needed"],["quarterly","yearly","as-needed"]);
%>
---
up: "[[450-Places]]"
in: "[[450-Places]]"
title: <% place_name %>
aliases: []
type: place
fileClass: Place
tags:
  - 📍place
  - <% place_type %>
place_status: <% status %>
priority: <% priority %>
region: <% region %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
last_review: <% tp.date.now("YYYY-MM-DD") %>
review_frequency: <% review_frequency %>
related: []
---

# 📍 <% place_name %>
**Type:** <% place_type %>  
**Region:** <% region %>  
**Status:** <% status %>  
**Priority:** <% priority %>

---

## 🗺️ Overview
*Describe what this place is, why it’s relevant, and how it fits into your network or projects.*

---

## 🧭 Key Details
| Attribute | Value |
|------------|--------|
| Address / URL |  |
| Coordinates / Timezone |  |
| Access / Entry Info |  |

---

## 📸 Impressions or Notes
- First impression:  
- Memorable experiences:  
- Lessons / takeaways:  

---

## 🔗 Related Links
- [Official Site](#)
- [Map / Location](#)
- [Photos / Media](#)

---

*Status: <% status %> | Priority: <% priority %> | Next review: <% review_frequency %>*
