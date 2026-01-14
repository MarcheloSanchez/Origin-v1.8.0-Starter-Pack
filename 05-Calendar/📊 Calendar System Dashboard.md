---
title: "Calendar System Dashboard"
type: dashboard
tags:
  - 📅calendar
  - 📊dashboard
  - 🔍monitoring
status: 🔄active
created: 2026-01-14
---

⬆️:: [[05-Calendar]]

# 📊 Calendar System Dashboard

Central view of your temporal reflection system—see all your period reviews at a glance and track your review consistency.

> [!info]+ **What This Shows**
> - Current period notes (daily, weekly, monthly, quarterly, yearly)
> - Review completion status and health
> - Quick links to all active periods
> - System health metrics
> - Links to setup and documentation

---

## 🎯 Quick Navigation - Current Periods

### 🔴 RIGHT NOW
Use these hotkeys to jump to current period notes:
- **Today**: `Ctrl+Shift+T` → Opens today's daily note
- **This Week**: `Ctrl+Shift+W` → Opens this week's weekly note
- **This Month**: `Ctrl+Shift+M` → Opens this month's monthly note
- **This Quarter**: `Ctrl+Shift+Q` → Opens this quarter's quarterly note
- **This Year**: `Ctrl+Shift+Y` → Opens this year's yearly note

### Direct Links
| Period | Current | Review Days | Status |
|--------|---------|------------|--------|
| **Daily** | [[2026-01-14]] | Every day | 🟡 Building |
| **Weekly** | [[2026-W02]] | Every Friday | 🟡 Establishing |
| **Monthly** | [[2026-01]] | 1st of month | 🆕 New |
| **Quarterly** | [[2026-Q1]] | Every 3 months | 🆕 New |
| **Yearly** | [[2026]] | Every Jan 1 | 🆕 New |

---

## 📅 Period Calendar

### January 2026

```
Mo Tu We Th Fr Sa Su
          1  2  3  4
 5  6  7  8  9 10 11   ← Week 02 (W02)
12 13 14 15 16 17 18   ← Today: 2026-01-14 (W03)
19 20 21 22 23 24 25   ← Week 04 (W04)
26 27 28 29 30 31      ← Week 05 (W05)
│                      ← Q1 2026: Jan-Mar
```

---

## 🔄 Review Rhythm & Schedule

### Daily Reviews (Every Day)
- **When**: Morning (intention) + Evening (reflection)
- **Time**: 10 minutes total (5 min morning + 5 min evening)
- **Template**: `[[05-Calendar/Daily/YYYY-MM-DD]]`
- **Key Sections**:
  - Morning intention (3 min)
  - Evening reflection (7 min)
  - Links to today's efforts/areas
- **Status**: 🟡 Establishing routine

### Weekly Reviews (Every Friday, 4:00 PM)
- **When**: Fridays, 4:00-4:30 PM (calendar event)
- **Time**: 30 minutes
- **Template**: `[[05-Calendar/Weekly/YYYY-W##]]`
- **Key Sections**:
  - Week summary (what happened?)
  - Area attention tracking
  - Effort progress
  - Next week planning
- **Status**: 🟡 Establishing habit

### Monthly Reviews (1st of Month, 3:00 PM)
- **When**: 1st of month, 3:00-3:45 PM (calendar event)
- **Time**: 45 minutes
- **Template**: `[[05-Calendar/Monthly/YYYY-MM]]`
- **Key Sections**:
  - Monthly theme review
  - Area health check (all 5 areas)
  - Effort portfolio review
  - Next month planning
- **Status**: 🆕 Ready to launch

### Quarterly Reviews (1st of Quarter, 2:00 PM)
- **When**: Apr 1, Jul 1, Oct 1, Jan 1 (2:00-3:30 PM, calendar event)
- **Time**: 90 minutes
- **Template**: `[[05-Calendar/Quarterly/YYYY-Q#]]`
- **Key Sections**:
  - Quarter achievements review
  - Strategic outcomes by area
  - Major initiatives status
  - Next quarter planning
- **Status**: 🆕 Ready to launch

### Yearly Reviews (January 1 or December 31)
- **When**: Dec 31 (10am-12pm) or Jan 1 (2 hours)
- **Time**: 2 hours
- **Template**: `[[05-Calendar/Yearly/YYYY]]`
- **Key Sections**:
  - Annual vision and themes
  - Life area reviews
  - Major initiatives status
  - Next year vision
- **Status**: 🆕 Ready to launch

---

## 📊 System Health Indicators

### Daily Note Tracking
- **Days with notes**: ___/365 (goal: 70%+)
- **Consistency streak**: ___ days
- **Latest note**: 2026-01-14
- **Status**: 🟡 Building habit

### Weekly Review Completion
- **Weeks reviewed**: ___/52 (goal: 95%+)
- **Last review**: [[2026-W02]]
- **Next scheduled**: [[2026-W03]] (Friday)
- **Status**: 🟡 Establishing

### Monthly Review Completion
- **Months reviewed**: 0/12 (goal: 12/12)
- **Last review**: Not yet started
- **Next scheduled**: [[2026-02|February 1st]]
- **Status**: 🆕 Not started

### Quarterly Review Completion
- **Quarters reviewed**: 0/4 (goal: 4/4)
- **Last review**: Not yet started
- **Next scheduled**: [[2026-Q2|April 1st]]
- **Status**: 🆕 Not started

### Yearly Review Completion
- **Years reviewed**: 0 (goal: 1/year)
- **Last review**: Not yet started
- **Next scheduled**: [[2027|January 1st, 2027]]
- **Status**: 🆕 Not started

---

## 📈 Calendar System Metrics

| Metric | Target | Current | Trend |
|--------|--------|---------|-------|
| Daily consistency | 70%+ | __% | 🔄 |
| Weekly completion | 95%+ | __% | 🔄 |
| Monthly completion | 100% | __% | 🆕 |
| Quarterly completion | 100% | __% | 🆕 |
| Review time/month | <2 hrs | __ min | 🆕 |
| System satisfaction | 8+/10 | __/10 | 🔄 |

---

## 📚 All Period Notes

### Daily Notes (This Month)
```dataview
LIST file.link
FROM "05-Calendar/Daily"
WHERE string(file.name) CONTAINS "2026-01"
SORT file.name DESC
LIMIT 14
```

### Weekly Notes (This Quarter)
```dataview
LIST file.link
FROM "05-Calendar/Weekly"
WHERE string(file.name) CONTAINS "2026-W"
SORT file.name DESC
LIMIT 13
```

### Monthly Notes (All)
```dataview
LIST file.link
FROM "05-Calendar/Monthly"
SORT file.name DESC
```

### Quarterly Notes (All)
```dataview
LIST file.link
FROM "05-Calendar/Quarterly"
SORT file.name DESC
```

### Yearly Notes (All)
```dataview
LIST file.link
FROM "05-Calendar/Yearly"
SORT file.name DESC
```

---

## 🎯 Review Status by Area

### How Each Life Area Gets Reviewed

| Area | Daily? | Weekly? | Monthly? | Quarterly? | Yearly? |
|------|--------|---------|----------|-----------|---------|
| [[210-Health]] | ✓ | ✓ | ✓ | ✓ | ✓ |
| [[220-Finance]] | | ✓ | ✓ | ✓ | ✓ |
| [[230-Career]] | | ✓ | ✓ | ✓ | ✓ |
| [[240-Relationships]] | | ✓ | ✓ | ✓ | ✓ |
| [[250-Personal]] | | ✓ | ✓ | ✓ | ✓ |

**Legend**: ✓ = Reviewed at this frequency

---

## 🔗 System Documentation

### Essential Reading
- **Setup Guide**: [[📅 Calendar Period Architecture Setup]]
- **Philosophy**: [[+About Calendarℹ️]]
- **Quick Start**: Just use hotkeys above!

### Period Note Templates
- **Daily Template**: `Template Daily Review`
- **Weekly Template**: `Template Weekly Review`
- **Monthly Template**: `[[2026-01]]` (use as example)
- **Quarterly Template**: `[[2026-Q1]]` (use as example)
- **Yearly Template**: `[[2026]]` (use as example)

---

## ⚡ Quick Actions

### I want to...

**Create today's daily note**: Use hotkey `Ctrl+Shift+T` or open [[05-Calendar]]

**Do my weekly review**: Friday at 4 PM
- Open this week: `Ctrl+Shift+W`
- Check effort progress
- Note patterns
- Plan next week

**Do my monthly area check**: 1st of month at 3 PM
- Open this month: `Ctrl+Shift+M`
- Review all 5 areas
- Check health status
- Plan next month

**Do my quarterly strategy review**: 1st of quarter at 2 PM
- Open this quarter: `Ctrl+Shift+Q`
- Assess progress on major initiatives
- Plan next quarter focus

**Do my yearly reflection**: January 1st (2 hours)
- Open this year: `Ctrl+Shift+Y`
- Reflect on major growth
- Set next year vision

---

## 📞 Setup Questions?

Not sure if your calendar is set up correctly?

**Checklist**:
- [ ] Periodic Notes plugin installed
- [ ] Monthly/Quarterly/Yearly folders exist
- [ ] Plugin configured with correct folders
- [ ] Hotkeys working
- [ ] Can create period notes

**If stuck**: See [[📅 Calendar Period Architecture Setup]] or restart Obsidian.

---

## 🚀 Next Steps

### TODAY
- [ ] Make sure you can create today's daily note (use hotkey)
- [ ] Skim this dashboard to understand the structure

### THIS WEEK
- [ ] Do your first Friday weekly review
- [ ] Feel the rhythm starting

### NEXT MONTH (Feb 1st)
- [ ] Do your first monthly area review
- [ ] Watch patterns emerge

### NEXT QUARTER (April 1st)
- [ ] Do your first quarterly strategic review
- [ ] See how time connects

---

## 📊 What This Enables

Once this system is running:
- ✅ You have clear visibility into your life across all 5 domains
- ✅ Patterns become obvious (energy, productivity, attention)
- ✅ You make strategic decisions based on data, not impulse
- ✅ Time becomes your biggest asset
- ✅ The entire Origin system works as one organism

**This is the connective tissue that makes everything work.**

---

⬆️:: [[05-Calendar]]

*Calendar System Dashboard | Status: 🟡 Building | Last Updated: 2026-01-14*
