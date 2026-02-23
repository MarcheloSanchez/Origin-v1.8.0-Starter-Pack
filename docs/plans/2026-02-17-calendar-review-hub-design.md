# Calendar Review Hub - Design Document

**Date**: 2026-02-17
**Status**: Implemented
**Author**: Claude (brainstorming session with Marchelo)

## Problem

The Origin vault has daily notes and a weekly report generator, but the review cascade stops there. Monthly, quarterly, and yearly folders exist with templates but have zero automation. Reviews are inconsistent and ad hoc, with no system to make them easy and rewarding.

## Solution

Build the full review cascade (monthly/quarterly/yearly report generators) plus a live Calendar Review Hub dashboard.

## Architecture: Cascading Report Chain

Each report level aggregates from the level below, with vault-query fallback for sparse data.

```
Daily Notes (manual capture)
  ↓ generate-weekly-report.js (EXISTS)
Weekly Reports (metrics, trends, highlights)
  ↓ generate-monthly-report.js (NEW)
Monthly Reports (area health, effort portfolio)
  ↓ generate-quarterly-report.js (NEW)
Quarterly Reports (strategic themes, major initiatives)
  ↓ generate-yearly-report.js (NEW)
Yearly Reports (annual vision, knowledge growth)
```

## Files Created

| File | Purpose |
|------|---------|
| `99-System/Scripts/generate-monthly-report.js` | Aggregates weekly reports + area health + effort portfolio |
| `99-System/Scripts/generate-quarterly-report.js` | Aggregates monthly reports + major initiatives |
| `99-System/Scripts/generate-yearly-report.js` | Aggregates quarterly reports + knowledge growth + system maturity |
| `05-Calendar/📅 Calendar Review Hub.md` | Standalone dashboard with Buttons + DataviewJS |

## Files Modified

| File | Change |
|------|--------|
| `05-Calendar/📊 Calendar System Dashboard.md` | Added link to Review Hub |

## Key Design Decisions

1. **Language**: English for all generated reports (matches weekly report)
2. **Coexistence**: Generated reports live alongside manual template notes
3. **Naming**: `Monthly Report YYYY-MM.md` (not `YYYY-MM.md`)
4. **Sparse data handling**: "Partial Report" badge + vault-query fallback
5. **Templates untouched**: Existing templates remain for manual use
6. **Hub vs Dashboard**: Hub = action center, Dashboard = reference guide

## Data Aggregated at Each Level

### Monthly Report
- Sums from weekly: notes created/modified, tasks completed, efforts completed
- Latest from weekly: active efforts, inbox count
- Direct query: area health (backlinks to 5 area hubs), effort portfolio (status/completion)
- Fallback: vault-wide date-filtered queries if <2 weekly reports

### Quarterly Report
- Sums from monthly: all metrics
- Trend: area health month-over-month comparison
- Direct query: high-priority efforts for major initiatives
- Fallback: vault-wide date-filtered queries if <2 monthly reports

### Yearly Report
- Sums from quarterly: all metrics
- Direct query: knowledge growth (atomics/sources/MOCs created)
- Direct query: system maturity (connections, orphans, review consistency)
- Direct query: area overview (yearly activity per area)
- Fallback: vault-wide date-filtered queries if <2 quarterly reports

## Hub Features

- **4 Buttons**: Generate Weekly/Monthly/Quarterly/Yearly reports
- **Review Status**: Last report date per level, days-since with color coding, completion rates
- **Current Period Snapshot**: Live metrics (notes this week/month, active efforts, inbox)
- **Recent Reports**: Dataview table of last 10 reports across all types
- **Period Navigation**: Collapsible lists of all reports by type

## QuickAdd Setup (Manual)

After implementation, user adds 3 macros:
1. Generate Monthly Report → `99-System/Scripts/generate-monthly-report.js`
2. Generate Quarterly Report → `99-System/Scripts/generate-quarterly-report.js`
3. Generate Yearly Report → `99-System/Scripts/generate-yearly-report.js`
