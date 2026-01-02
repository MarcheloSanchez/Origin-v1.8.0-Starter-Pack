---
up: 
in: "[[04-Sources]]"
title: "<% tp.file.title %>"
aliases: 
type: source
fileClass: source
cssclass: source-layout
tags:   
- 📚source
status: 📥inbox
maturity: 📤seed
priority: 
processing_priority: normal
completeness: draft
action_required: true
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
start: 
due: 
end: 
last_review: <% tp.date.now("YYYY-MM-DD") %>
review_frequency: quarterly
capture_method: <% await tp.system.suggester(['manual', 'quickadd', 'mobile', 'email'], ['manual', 'quickadd', 'mobile', 'email']) %>
confidence_level: 
evidence_quality: 
read_status: <% await tp.system.suggester(['to-read', 'reading', 'completed', 'reference'], ['to-read', 'reading', 'completed', 'reference']) %>
rating_type: 
source_author: <% await tp.system.prompt('Author name') %>
source_date: <% await tp.system.prompt('Publication date (YYYY-MM-DD)') %>
source_type: <% await tp.system.suggester(['book', 'article', 'video', 'podcast', 'course', 'paper', 'website', 'experience'], ['book', 'article', 'video', 'podcast', 'course', 'paper', 'website', 'experience']) %>
related:  
see_also:
<%* tp.user.yaml_reorder() %>
---

# <% tp.file.title %>

## 📝 TL;DR — 5 bullets
1. 
2. 
3. 
4. 
5. 

## 💡 Key Insights
1. **[Insight Title]**: Brief explanation
2. **[Insight Title]**: Brief explanation  
3. **[Insight Title]**: Brief explanation

## ✍️ Quotes
- *"Quote here"* — p./timestamp
- *"Quote here"* — p./timestamp

## 🧠 Personal Synthesis
**Connection to My PKM**: How does this connect to your existing knowledge system?

**Key Revelation**: What changed your understanding?

**Implementation Gap**: What do you need to work on?

## 🔗 Generated Dots & Connections
*
- **Related to**: 
- **Supports**: 
- **Contradicts**: 