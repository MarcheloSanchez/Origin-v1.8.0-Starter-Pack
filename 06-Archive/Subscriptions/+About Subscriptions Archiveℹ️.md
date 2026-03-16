---
title: "About Subscriptions Archive"
type: about
status: 🔄active
tags: [⚙️system, 📦archived, 💰subscription]
created: 2026-03-16
modified: 2026-03-16
---
⬆️:: [[06-Archive]]

# 📦 Subscriptions Archive

This folder holds **cancelled, paused, or expired subscriptions**.

Archived subscriptions are not deleted — they form a **decision log** that:
- Prevents re-subscribing to things that didn't work
- Surfaces patterns in spending behavior over time
- Tracks total historical spend per vendor
- Documents what triggered cancellation and what alternative was found

---

## How to Archive a Subscription

**Manual**: Run QuickAdd → `📦 Archive Subscription`
This will:
1. Prompt for cancellation reason
2. Fill `cancelled` date and `cancellation_reason` fields
3. Set `status: 📦archived`
4. Move the file here

**Script**: `99-System/Scripts/archive-subscription.js`

---

## Queries

```dataview
TABLE vendor, cost, billing_cycle, cancelled, cancellation_reason, roi_rating
FROM "06-Archive/Subscriptions"
WHERE type = "subscription"
SORT cancelled DESC
```

---

*Managed by `archive-subscription.js` — do not move files manually*
