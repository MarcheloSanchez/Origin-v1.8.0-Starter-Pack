---
type: system
status: 🔄active
last_updated: 2026-01-20 21:58:42
---

# 📊 Metrics Cache

> [!info] Cache Information
> This file contains cached metrics to improve dashboard performance.
> **Last Updated**: 2026-01-20 21:58:42
> **Next Update**: Scheduled daily at 6am

## 📈 Quick Stats

```dataviewjs
const cache = {
  "timestamp": "2026-01-20 21:58:42",
  "lastUpdated": "2026-01-20",
  "counts": {
    "total": 405,
    "inbox": 2,
    "atomics": 14,
    "efforts": 15,
    "sources": 19,
    "mocs": 14,
    "dailies": 14,
    "archived": 31,
    "totalContent": 62
  },
  "connections": {
    "total": 191,
    "connected": 62,
    "orphans": 343,
    "density": 15,
    "average": 0.5,
    "hubs": [
      {
        "name": "+About Sourcesℹ️",
        "path": "04-Sources/+About Sourcesℹ️.md",
        "connections": 8
      },
      {
        "name": "🏠 Home Maintenance System",
        "path": "03-Efforts/Ongoing/🏠 Home Maintenance System.md",
        "connections": 8
      },
      {
        "name": "🗺️My PKM MOC",
        "path": "01-MOCs/🗺️My PKM MOC.md",
        "connections": 8
      },
      {
        "name": "Performance Metrics",
        "path": "00-Meta/Documentation/Performance Metrics.md",
        "connections": 7
      },
      {
        "name": "Source Filled Out",
        "path": "Templates/New-Notes/Type/_Examples/Source Filled Out.md",
        "connections": 5
      },
      {
        "name": "🔍My PKM Queries",
        "path": "00-Meta/Documentation/PKM/🔍My PKM Queries.md",
        "connections": 5
      }
    ]
  },
  "xp": {
    "total": 590,
    "level": 5,
    "nextLevelXP": 600,
    "progress": 90
  },
  "growth": {
    "weekly": 227,
    "monthly": 405,
    "growthRate": 0,
    "avgPerDay": 13.5
  },
  "processing": {
    "created": 227,
    "processed": 238,
    "inbox": 2,
    "rate": 105
  }
};

dv.table(["Metric", "Value", "Status"], [
  ["📝 Total Notes", cache.counts.total, ""],
  ["📥 Inbox", cache.counts.inbox, cache.counts.inbox <= 20 ? "🟢" : "🔴"],
  ["💡 Atomics", cache.counts.atomics, ""],
  ["🚀 Efforts", cache.counts.efforts, ""],
  ["📚 Sources", cache.counts.sources, ""],
  ["🗺️ MOCs", cache.counts.mocs, ""],
  ["", "", ""],
  ["🔗 Connection Density", cache.connections.density + "%", cache.connections.density >= 70 ? "🟢" : cache.connections.density >= 40 ? "🟡" : "🔴"],
  ["🏝️ Orphan Notes", cache.connections.orphans, ""],
  ["🌟 Hub Notes", cache.connections.hubs.length, ""],
  ["", "", ""],
  ["⭐ Total XP", cache.xp.total, ""],
  ["🎯 Level", cache.xp.level, ""],
  ["📊 Processing Rate", cache.processing.rate + "%", cache.processing.rate >= 80 ? "🟢" : "🟡"]
]);
```

## 🔗 Connection Metrics

**Cached Data**:
- Connected Notes: 62 / 405
- Orphan Notes: 343
- Average Connections: 0.5 per note
- Network Health: 🔴 Fragmented

**Top Hub Notes**:
- [[+About Sourcesℹ️]] (8 connections)
- [[🏠 Home Maintenance System]] (8 connections)
- [[🗺️My PKM MOC]] (8 connections)
- [[Performance Metrics]] (7 connections)
- [[Source Filled Out]] (5 connections)
- [[🔍My PKM Queries]] (5 connections)

## ⭐ XP & Gamification

**Cached Data**:
- Total XP: 590
- Current Level: 5
- Progress to Next Level: 90%
- XP Needed: 10

## 📈 Growth Trends

**Cached Data**:
- Weekly Captures: 227 notes
- Monthly Captures: 405 notes
- Growth Rate: +0%
- Average per Day: 13.5 notes

## 📊 Processing Metrics

**Cached Data**:
- Created This Week: 227
- Processed This Week: 238
- Current Inbox: 2
- Processing Rate: 105%

---

## 🔄 Usage in Dashboards

To use cached metrics in your dashboards:

```dataviewjs
const cache = dv.page("00-Meta/_Metrics Cache");
// Access cached values directly
const totalXP = cache.xp?.total || 0;
const connectionDensity = cache.connections?.density || 0;
```

## ⚙️ Update Schedule

This cache is automatically updated daily at 6am via Periodic Notes template.

**Manual Update**: Run `Ctrl/Cmd + P → "QuickAdd: 🔄Update Metrics Cache"`

---

*Cache generated: 2026-01-20 21:58:42*
