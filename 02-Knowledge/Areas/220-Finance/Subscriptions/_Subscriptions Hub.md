---
title: "Subscriptions Hub"
up: "[[220-Finance]]"
type: dashboard
status: 🔄active
tags: [⚙️system, 💰subscription, 📊metrics]
cssclasses:
  - wide-page
obsidianUIMode: preview
created: 2026-03-16
modified: 2026-03-16
---
⬆️:: [[220-Finance]]

# 💳 Subscriptions Hub

> Manage all recurring payments — active, paused, and archived.
> **Add new**: `Ctrl+P` → QuickAdd: 💳 New Subscription

---

## 📊 Summary

> [!tip] Monthly spend
> ```dataview
> LIST WITHOUT ID "**Total active:** " + string(sum(filter(rows, (r) => r.billing_cycle = "monthly").cost)) + " CZK/mo  |  **Annual equivalent:** " + string(round(sum(filter(rows, (r) => r.billing_cycle = "monthly").cost) * 12 + sum(filter(rows, (r) => r.billing_cycle = "annual").cost))) + " CZK/yr"
> FROM "02-Knowledge/Areas/220-Finance/Subscriptions"
> WHERE type = "subscription" AND status = "🔄active"
> GROUP BY true
> ```

---

## 🔄 Active Subscriptions

```dataview
TABLE WITHOUT ID
  file.link AS "Subscription",
  vendor AS "Vendor",
  cost + " " + currency AS "Cost",
  billing_cycle AS "Cycle",
  renewal_date AS "Renewal",
  category AS "Category",
  roi_rating AS "ROI ⭐"
FROM "02-Knowledge/Areas/220-Finance/Subscriptions"
WHERE type = "subscription" AND status = "🔄active"
SORT renewal_date ASC
```

---

## ⚠️ Renewing Soon (next 30 days)

```dataview
TABLE WITHOUT ID
  file.link AS "Subscription",
  vendor AS "Vendor",
  cost + " " + currency AS "Cost",
  renewal_date AS "Renewal"
FROM "02-Knowledge/Areas/220-Finance/Subscriptions"
WHERE type = "subscription" AND status = "🔄active"
  AND renewal_date >= date(today)
  AND renewal_date <= date(today) + dur(30 days)
SORT renewal_date ASC
```

---

## ⏸️ Paused

```dataview
TABLE WITHOUT ID
  file.link AS "Subscription",
  vendor AS "Vendor",
  cost + " " + currency AS "Cost",
  billing_cycle AS "Cycle"
FROM "02-Knowledge/Areas/220-Finance/Subscriptions"
WHERE type = "subscription" AND status = "⏸️paused"
SORT file.name ASC
```

---

## 📊 By Category

```dataview
TABLE WITHOUT ID
  category AS "Category",
  length(rows) AS "Count",
  sum(rows.cost) + " CZK" AS "Monthly Cost"
FROM "02-Knowledge/Areas/220-Finance/Subscriptions"
WHERE type = "subscription" AND status = "🔄active" AND billing_cycle = "monthly"
GROUP BY category
SORT sum(rows.cost) DESC
```

---

## 📦 Recently Archived

```dataview
TABLE WITHOUT ID
  file.link AS "Subscription",
  vendor AS "Vendor",
  cost + " " + currency AS "Was",
  cancelled AS "Cancelled",
  cancellation_reason AS "Reason"
FROM "06-Archive/Subscriptions"
WHERE type = "subscription"
SORT cancelled DESC
LIMIT 10
```

→ [[+About Subscriptions Archiveℹ️|Full archive]]

---

*QuickAdd: 💳 New Subscription | 📦 Archive Subscription*
