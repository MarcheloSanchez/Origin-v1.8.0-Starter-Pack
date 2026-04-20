<%*
const d = moment(tp.file.title, "YYYY-MM-DD", true);
const ds = d.isValid() ? d : moment();
const dateStr   = ds.format("YYYY-MM-DD");
const prevStr   = ds.clone().subtract(1, 'day').format("YYYY-MM-DD");
const nextStr   = ds.clone().add(1, 'day').format("YYYY-MM-DD");
const weekStr   = ds.format("gggg-[W]ww");
const fullTitle = ds.format("dddd, MMMM DD, YYYY");
-%>
---
title: "<% dateStr %>"
type: daily
tags:
  - 📅daily
created: "<% dateStr %>"
modified: "<% dateStr %>"
date: "<% dateStr %>"
energy:
mood:
highlight:
---

⬆️:: [[05-Calendar]]
[[05-Calendar/Daily/<% prevStr %>|⏪ Yesterday]] · [[05-Calendar/Weekly/<% weekStr %>|📅 This Week]] · [[05-Calendar/Daily/<% nextStr %>|Tommorow ⏩]]
# <% fullTitle %>

## 🎮 Daily Quest

> [!tip] Today's Challenge: <% ds.format("dddd") %>
> Check [[🎮Gamification Dashboard#Daily Challenges|today's challenge]] for bonus XP!

**Quick XP Opportunities:**
- [ ] Create daily note (+5 XP) ✅
- [ ] Process inbox to zero (+25 XP)
- [ ] Complete 3 high-priority tasks (+30 XP)
- [ ] Add 5+ internal links (+5 XP)
- [ ] Complete today's daily challenge (+50 XP)

**XP Earned Today:** 5 / ______
---
## Today's Focus
🎯**Top 3 priorities**:
1. 
2. 
3. 

🏠**Areas needing attention**:

## 📥Captures
> *Quick thoughts, ideas, tasks throughout the day*


## 🤝 Meetings and calls
![[_Daily_Meetings.base]]

## 🔗 Links Created
> *Connections between ideas, people, and concepts discovered today*


## 💭 Reflections and ideas
### 🌞 What am I grateful for?


### 🧠 What caught my attention/taught me something?


### 💭 Emotions experienced?


## ⚡ Settings for tomorrow
- [ ]
- [ ]
