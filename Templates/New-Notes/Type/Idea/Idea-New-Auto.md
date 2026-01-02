---
in:
  - "[[Ideas]]"
title: <% tp.file.title %>
type: atomic
fileClass: Atomic
tags:
  - 💡idea
  - <% tp.system.prompt("Category tag", "innovation") %>
status: 📥inbox
maturity: 🌱seed
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
modified: <% tp.date.now("YYYY-MM-DD HH:mm") %>
related:
confidence: <% tp.system.suggester(["high", "medium", "low"], ["high", "medium", "low"]) %>
idea_type: <% tp.system.suggester(["project", "content", "product", "process", "research"], ["project", "content", "product", "process", "research"]) %>
---

# 💡 <% tp.file.title %>

> [!tip]+ **⚡ Idea Spark**
> **Type**: Project / Content / Product / Process / Research  
> **Confidence**: High / Medium / Low  
> **Origin**: <% tp.system.prompt("Where did this idea come from?", "Shower thought") %>

---

## 🎯 Core Idea (One-Liner)

<% tp.file.cursor(1) %>

---

## 📝 Description

**The Problem**:
[What problem does this solve?]

**The Solution**:
[How does this idea address it?]

**Why This Matters**:
[Why is this worth pursuing?]

---

## 🔍 Initial Thoughts

**What excites me**:
- 
- 
- 

**Potential challenges**:
- 
- 
- 

**Similar ideas/precedents**:
- 
- 

---

## 🛠️ Potential Implementation

**Resources needed**:
- Resource 1
- Resource 2
- Resource 3

**Skills required**:
- Skill 1
- Skill 2

**Estimated effort**: Low / Medium / High

**Timeline**: Days / Weeks / Months / Years

---

## 🎲 Feasibility Check

| Aspect | Rating (1-5) | Notes |
|--------|--------------|-------|
| **Excitement** | ⭐⭐⭐⭐⭐ | How exciting is this? |
| **Impact** | ⭐⭐⭐☆☆ | Potential impact if successful |
| **Feasibility** | ⭐⭐⭐⭐☆ | How realistic is implementation? |
| **Urgency** | ⭐⭐☆☆☆ | How time-sensitive is this? |
| **Fit** | ⭐⭐⭐⭐☆ | Alignment with goals/values |

**Overall Score**: X/25

---

## 🚀 Next Steps

**Immediate action (< 1 hour)**:
- [ ] 

**Research needed**:
- [ ] 
- [ ] 

**People to discuss with**:
- [[Person 1]]
- [[Person 2]]

**Decision deadline**: 
- [ ] Pursue by [date]
- [ ] Revisit on [date]
- [ ] Archive if not started by [date]

---

## 🔗 Connections

**Related to**:
- [[Area or Effort this supports]]
- [[Similar idea]]
- [[Related concept]]

**Could combine with**:
- [[Another idea]]
- [[Existing project]]

**Inspired by**:
- [[Source]]
- [[Person]]

---

## 📊 Evolution Log

**<% tp.date.now("YYYY-MM-DD") %>**: Initial capture
- 
- 

---

## 💭 Reflection Space

[Free-form space for thoughts, sketches, brainstorming]




---

*Captured: <% tp.date.now("YYYY-MM-DD HH:mm") %> | Status: 📤 Seed | Review: <% tp.date.now("YYYY-MM-DD", 7) %>*
