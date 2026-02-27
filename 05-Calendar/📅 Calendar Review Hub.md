---
title: "Calendar Review Hub"
type: dashboard
tags:
  - 📅calendar
  - 📊dashboard
  - 🔄review
status: 🔄active
created: 2026-02-17
---

⬆️:: [[05-Calendar]]

# 📅 Calendar Review Hub

Your action center for automated report generation and review tracking. Generate reports, track review consistency, and stay accountable.

> [!tip] **How it works**
> Click a button below to auto-generate a report. Each level aggregates from the level below:
> **Daily Notes → Weekly Report → Monthly Report → Quarterly Report → Yearly Report**

---

## ⚡ Quick Actions

```button
name 📊 Generate Weekly Report
type command
action QuickAdd: 📊 Generate Weekly Report
```
^button-gen-weekly

```button
name 📊 Generate Monthly Report
type command
action QuickAdd: 📊 Generate Monthly Report
```
^button-gen-monthly

```button
name 📊 Generate Quarterly Report
type command
action QuickAdd: 📊 Generate Quarterly Report
```
^button-gen-quarterly

```button
name 📊 Generate Yearly Report
type command
action QuickAdd: 📊 Generate Yearly Report
```
^button-gen-yearly

---

## 🔍 Review Status

```dataviewjs
/**
 * QUERY: Review Accountability Tracker
 * PURPOSE: Show when each review level was last completed + color-coded status
 */
try {
  const now = dv.date('today');

  // Helper: find most recent report in folder with title prefix
  function findLatest(folder, prefix) {
    const reports = dv.pages(`"${folder}"`)
      .where(p => p.file.name.startsWith(prefix))
      .sort(p => p.file.ctime, 'desc');
    return reports.first();
  }

  // Helper: format days ago with color
  function formatDaysAgo(report, greenDays, yellowDays) {
    if (!report) return "❌ Never";
    const days = Math.floor((Date.now() - new Date(report.file.ctime).getTime()) / (1000 * 60 * 60 * 24));
    const icon = days <= greenDays ? "🟢" : days <= yellowDays ? "🟡" : "🔴";
    return `${icon} ${days}d ago — ${report.file.link}`;
  }

  const lastWeekly = findLatest("05-Calendar/Weekly", "Weekly Report");
  const lastMonthly = findLatest("05-Calendar/Monthly", "Monthly Report");
  const lastQuarterly = findLatest("05-Calendar/Quarterly", "Quarterly Report");
  const lastYearly = findLatest("05-Calendar/Yearly", "Yearly Report");

  dv.table(
    ["Period", "Last Report", "Target Frequency"],
    [
      ["📅 Weekly", formatDaysAgo(lastWeekly, 7, 14), "Every week"],
      ["📅 Monthly", formatDaysAgo(lastMonthly, 31, 45), "1st of month"],
      ["📅 Quarterly", formatDaysAgo(lastQuarterly, 90, 120), "1st of quarter"],
      ["📅 Yearly", formatDaysAgo(lastYearly, 365, 400), "January 1st"]
    ]
  );

  // Review completion rates
  const thisYear = now.year;
  const weeklyCount = dv.pages('"05-Calendar/Weekly"')
    .where(p => p.file.name.startsWith("Weekly Report") && p.file.name.includes(String(thisYear)))
    .length;
  const monthlyCount = dv.pages('"05-Calendar/Monthly"')
    .where(p => p.file.name.startsWith("Monthly Report") && p.file.name.includes(String(thisYear)))
    .length;

  // ISO week number calculation (matches weekly report generator)
  const getISOWeek = (d) => {
    const dt = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = dt.getUTCDay() || 7;
    dt.setUTCDate(dt.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(dt.getUTCFullYear(), 0, 1));
    return Math.ceil(((dt - yearStart) / 86400000 + 1) / 7);
  };
  const currentWeek = getISOWeek(new Date());
  const currentMonth = now.month;

  dv.paragraph(`\n**${thisYear} Completion Rates:**`);
  dv.paragraph(`- Weekly: ${weeklyCount}/${currentWeek} weeks (${currentWeek > 0 ? Math.round(weeklyCount / currentWeek * 100) : 0}%)`);
  dv.paragraph(`- Monthly: ${monthlyCount}/${currentMonth} months (${currentMonth > 0 ? Math.round(monthlyCount / currentMonth * 100) : 0}%)`);

} catch (e) {
  dv.paragraph(`⚠️ Error: ${e.message}`);
}
```

---

## 📈 Current Period Snapshot

```dataviewjs
/**
 * QUERY: Live metrics for the current period
 * PURPOSE: Quick health check without generating a full report
 */
try {
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay() + 1);
  weekStart.setHours(0, 0, 0, 0);

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  monthStart.setHours(0, 0, 0, 0);

  const allPages = dv.pages()
    .where(p =>
      !p.file.path.includes("Templates") &&
      !p.file.path.includes("99-System")
    );

  const weekNotes = allPages.where(p => p.file.ctime >= dv.date(weekStart.toISOString().split('T')[0])).length;
  const monthNotes = allPages.where(p => p.file.ctime >= dv.date(monthStart.toISOString().split('T')[0])).length;

  const activeEfforts = dv.pages('"03-Efforts"')
    .where(p => p.status === "🔄active")
    .length;

  const inboxCount = dv.pages('"\\+Inbox"').length;

  // Read from cache for additional metrics
  const cache = dv.page("00-Meta/_Metrics Cache");

  dv.table(
    ["Metric", "Value"],
    [
      ["📝 Notes this week", weekNotes],
      ["📝 Notes this month", monthNotes],
      ["🚀 Active efforts", activeEfforts],
      ["📥 Inbox items", inboxCount],
      ["🔗 Connection density", cache?.connection_density ?? "—"],
      ["⭐ XP Level", cache?.level ?? "—"]
    ]
  );
} catch (e) {
  dv.paragraph(`⚠️ Error: ${e.message}`);
}
```

---

## 📋 Recent Reports

```dataview
TABLE WITHOUT ID
  file.link AS "Report",
  type AS "Period",
  created AS "Generated"
FROM "05-Calendar"
WHERE contains(file.name, "Report") AND (type = "weekly" OR type = "monthly" OR type = "quarterly" OR type = "yearly")
SORT file.ctime DESC
LIMIT 10
```

---

## 🗺️ Period Navigation

### Current Periods

| Period | Generated Report | Manual Note |
|--------|-----------------|-------------|
| **This Week** | [[Weekly Report]] (latest) | Ctrl+Shift+W |
| **This Month** | [[Monthly Report]] (latest) | Ctrl+Shift+M |
| **This Quarter** | [[Quarterly Report]] (latest) | Ctrl+Shift+Q |
| **This Year** | [[Yearly Report]] (latest) | Ctrl+Shift+Y |

### All Reports by Type

> [!abstract]- Weekly Reports
> ```dataview
> LIST
> FROM "05-Calendar/Weekly"
> WHERE contains(file.name, "Weekly Report")
> SORT file.name DESC
> LIMIT 12
> ```

> [!abstract]- Monthly Reports
> ```dataview
> LIST
> FROM "05-Calendar/Monthly"
> WHERE contains(file.name, "Monthly Report")
> SORT file.name DESC
> ```

> [!abstract]- Quarterly Reports
> ```dataview
> LIST
> FROM "05-Calendar/Quarterly"
> WHERE contains(file.name, "Quarterly Report")
> SORT file.name DESC
> ```

> [!abstract]- Yearly Reports
> ```dataview
> LIST
> FROM "05-Calendar/Yearly"
> WHERE contains(file.name, "Yearly Report")
> SORT file.name DESC
> ```

---

## 📖 Documentation

→ [[📅 Calendar Review Hub Guide]] — Step-by-step setup and usage guide

---

## 🔧 Setup & Configuration

### QuickAdd Macros (Pre-configured)

All report generators are registered in the **🧹 Maintain** menu:

| Command | Script | Location |
|---------|--------|----------|
| 📊 Generate Weekly Report | `generate-weekly-report.js` | 🧹 Maintain menu |
| 📊 Generate Monthly Report | `generate-monthly-report.js` | 🧹 Maintain menu |
| 📊 Generate Quarterly Report | `generate-quarterly-report.js` | 🧹 Maintain menu |
| 📊 Generate Yearly Report | `generate-yearly-report.js` | 🧹 Maintain menu |

**If buttons don't work**: Restart Obsidian to reload QuickAdd commands. Scripts are in `99-System/Scripts/`.

### Data Flow

```
Daily Notes (manual, 10 min/day)
  ↓ generate-weekly-report.js
Weekly Reports (auto, run every Friday)
  ↓ generate-monthly-report.js
Monthly Reports (auto, run 1st of month)
  ↓ generate-quarterly-report.js
Quarterly Reports (auto, run 1st of quarter)
  ↓ generate-yearly-report.js
Yearly Reports (auto, run Jan 1st / Dec 31st)
```

Each generator reads from the level below. If reports are missing, it falls back to querying vault data directly (with a "Partial Report" warning).

---

⬆️:: [[05-Calendar]]

*Calendar Review Hub | Created: 2026-02-17*
