---
title: Review HQ
aliases:
  - Review Hub
  - Command Center
  - Review Dashboard
type: moc
fileClass: MOC
tags:
  - 📊dashboard
  - ⚙️system
  - 🎯gtd
  - ⚡productivity
  - 🧭navigation
status: 🔄active
maturity: 🌲evergreen
priority: high
processing_priority: high
created: 2026-01-15
modified: 2026-03-18
version: 2
cssclasses:
  - wide-page
  - review-hq
related:
  - "[[🎯GTD Weekly Review - Template]]"
  - "[[🧹Cleaning Lady]]"
  - "[[🌱Incubator]]"
---

# 🧭 Review HQ

> [!quote] One Place Where Remaining Work Meets
> This is your single convergence point for all work that needs attention. When in doubt, start here.

---

## 📖 Table of Contents

1. [[#🚦 System Health Dashboard]] — Am I okay? (30 sec glance)
2. [[#🔥 Top 3 Focus Suggestions]] — What should I do right now?
3. [[#⚠️ Urgent Attention]] — Overdue + due soon
4. [[#📥 Inbox Triage]] — What's piling up?
5. [[#⏳ Waiting & Blocked]] — What's stuck?
6. [[#🛠️ Maintenance Queue]] — Notes needing love
7. [[#🔍 Data Integrity]] — Broken metadata
8. [[#🔄 Review Flows]] — Daily / Weekly / Monthly checklists
9. [[#🚨 Re-Entry Protocol]] — Coming back after absence
10. [[#🔗 Quick Navigation]] — Jump to subsystems

---

## 🚦 System Health Dashboard

> [!tip] Glance here first. Green = calm. Yellow = attention needed. Red = action required.
>
> **Quick Actions by Status:**
> 
> | If Red... | Go To | Action |
> |-----------|-------|--------|
> | 📥 Inbox | [[+Inbox]] | Triage oldest 5 items |
> | ⚠️ Overdue | [[#⚠️ Urgent Attention]] | Reschedule or complete |
> | 🚀 Efforts | [[03-Efforts]] | Archive or pause 2 |
> | ⏳ Waiting | [[#⏳ Waiting & Blocked]] | Follow up or close |
> | 🧹 Maintenance | [[🧹Cleaning Lady]] | Quick 5-min fix |

```dataviewjs
/**
 * QUERY: System Health Indicators (Cache-Optimized)
 * PURPOSE: Comprehensive GTD health dashboard with 6 metrics
 * DEPENDS ON: 99-System/_Metrics Cache (primary), live queries (fallback)
 * UPDATED: 2026-02-07
 */
try {
const cache = dv.page("99-System/_Metrics Cache");
const today = dv.date("today");
const oneWeekAgo = dv.date("today").minus({days: 7});

// --- Inbox Health (cache for count, live for age) ---
const inboxItems = dv.pages('"+Inbox"').where(p => p.file.name !== "+Inbox" && !p.file.name.includes("About"));
const inboxCount = cache?.cache_date ? (cache.inbox_count ?? inboxItems.length) : inboxItems.length;
const oldInboxItems = inboxItems.filter(p => p.file.ctime < oneWeekAgo).length;
const inboxStatus = inboxCount <= 5 ? "🟢" : inboxCount <= 15 ? "🟡" : "🔴";
const inboxAge = oldInboxItems === 0 ? "🟢" : oldInboxItems <= 3 ? "🟡" : "🔴";

// --- Overdue Tasks (live — time-sensitive) ---
const allTasks = dv.pages().file.tasks.where(t => !t.completed);
const overdueTasks = allTasks.filter(t => t.due && dv.date(t.due) < today).length;
const overdueStatus = overdueTasks === 0 ? "🟢" : overdueTasks <= 3 ? "🟡" : "🔴";

// --- Active Efforts (cache or live) ---
const activeEfforts = cache?.cache_date
  ? (cache.effort_count ?? 0)
  : dv.pages('"03-Efforts"').where(p => p.status === "🔄active").length;
const effortStatus = activeEfforts <= 5 ? "🟢" : activeEfforts <= 10 ? "🟡" : "🔴";

// --- Waiting For (live — needs task scanning) ---
const waitingItems = dv.pages().where(p =>
  p.status === "⏳waiting" || p.waiting_for
).length;
const waitingTasks = allTasks.filter(t =>
  t.text.toLowerCase().includes("@waiting") || t.text.includes("⏳")
).length;
const totalWaiting = waitingItems + waitingTasks;
const waitingStatus = totalWaiting <= 3 ? "🟢" : totalWaiting <= 7 ? "🟡" : "🔴";

// --- Maintenance Debt (live — needs tag scanning) ---
const tidyNotes = dv.pages().where(p => p.file.tags && p.file.tags.some(t => t.includes("tidy") || t.includes("🧹"))).length;
const developNotes = dv.pages().where(p => p.file.tags && p.file.tags.some(t => t.includes("develop") || t.includes("🌱develop"))).length;
const maintenanceTotal = tidyNotes + developNotes;
const maintenanceStatus = maintenanceTotal <= 5 ? "🟢" : maintenanceTotal <= 15 ? "🟡" : "🔴";

// --- Render Dashboard ---
dv.paragraph(`
| Metric | Count | Status | Target |
|--------|-------|--------|--------|
| 📥 **Inbox Items** | ${inboxCount} | ${inboxStatus} | ≤ 5 |
| 📥 **Inbox Age (>7d)** | ${oldInboxItems} | ${inboxAge} | 0 |
| ⚠️ **Overdue Tasks** | ${overdueTasks} | ${overdueStatus} | 0 |
| 🚀 **Active Efforts** | ${activeEfforts} | ${effortStatus} | ≤ 5 |
| ⏳ **Waiting/Blocked** | ${totalWaiting} | ${waitingStatus} | ≤ 3 |
| 🧹 **Maintenance Debt** | ${maintenanceTotal} | ${maintenanceStatus} | ≤ 5 |
`);

// Overall health score
const scores = [
  inboxCount <= 5 ? 2 : inboxCount <= 15 ? 1 : 0,
  oldInboxItems === 0 ? 2 : oldInboxItems <= 3 ? 1 : 0,
  overdueTasks === 0 ? 2 : overdueTasks <= 3 ? 1 : 0,
  activeEfforts <= 5 ? 2 : activeEfforts <= 10 ? 1 : 0,
  totalWaiting <= 3 ? 2 : totalWaiting <= 7 ? 1 : 0,
  maintenanceTotal <= 5 ? 2 : maintenanceTotal <= 15 ? 1 : 0
];
const totalScore = scores.reduce((a, b) => a + b, 0);
const maxScore = 12;
const healthEmoji = totalScore >= 10 ? "🟢" : totalScore >= 6 ? "🟡" : "🔴";
const healthLabel = totalScore >= 10 ? "Healthy" : totalScore >= 6 ? "Needs Attention" : "Critical";

dv.paragraph(`**Overall System Health:** ${healthEmoji} ${healthLabel} (${totalScore}/${maxScore})`);
} catch (e) {
  dv.paragraph(`⚠️ Error loading system health: ${e.message}`);
}
```

---

## 🔥 Top 3 Focus Suggestions

> [!info] Auto-generated based on: Due soon + Recently modified + Not blocked
> These are your highest-leverage actions right now.

```dataviewjs
/**
 * QUERY: Top 3 Focus Items (Weighted Scoring)
 * PURPOSE: Surface highest-leverage actions based on due date, priority, momentum
 * DEPENDS ON: status, due, priority, file.mtime, energy_required, completion_percentage
 * UPDATED: 2026-02-07
 */
try {
const today = dv.date("today");
const threeDays = dv.date("today").plus({days: 3});

// Get all relevant pages
let candidates = dv.pages()
  .where(p =>
    p.status === "🔄active" &&
    !p.waiting_for &&
    !p.blocked_by &&
    p.file.folder !== "06-Archive" &&
    p.file.folder !== "Templates" &&
    !p.file.path.includes("Archive")
  )
  .map(p => {
    let score = 0;

    // Due date scoring (higher = more urgent)
    if (p.due) {
      const dueDate = dv.date(p.due);
      if (dueDate) {
        const daysUntilDue = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
        if (daysUntilDue < 0) score += 50; // Overdue
        else if (daysUntilDue <= 1) score += 40; // Due today/tomorrow
        else if (daysUntilDue <= 3) score += 30; // Due soon
        else if (daysUntilDue <= 7) score += 15; // This week
      }
    }

    // Priority scoring
    if (p.priority === "high") score += 25;
    else if (p.priority === "medium") score += 10;

    // Recently modified = momentum
    if (p.file.mtime) {
      const daysSinceModified = Math.floor((today - p.file.mtime) / (1000 * 60 * 60 * 24));
      if (daysSinceModified <= 1) score += 15;
      else if (daysSinceModified <= 3) score += 10;
      else if (daysSinceModified <= 7) score += 5;
    }

    // Energy boost for high-energy when it's morning (approximate)
    if (p.energy_required === "high") score += 5;

    // Completion percentage (prefer nearly done)
    if (p.completion_percentage && p.completion_percentage >= 70) score += 10;

    return { page: p, score: score };
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, 3);

if (candidates.length > 0) {
  dv.table(
    ["#", "Focus Item", "Why", "Next Action"],
    candidates.map((item, i) => [
      `**${i + 1}**`,
      item.page.file.link,
      item.page.due
        ? `📅 Due: ${item.page.due}`
        : item.page.priority === "high"
          ? "⚡ High priority"
          : "🔄 Active momentum",
      item.page.next_actions || "—"
    ])
  );
} else {
  dv.paragraph("*No urgent focus items detected. Check your [[TODO]] for next actions by context.*");
}
} catch (e) {
  dv.paragraph(`⚠️ Error loading focus items: ${e.message}`);
}
```

> [!tip] Can't decide? Pick #1 and work for 25 minutes. Then reassess.

> [!abstract]- 🎯 **Action Hub: Focus Work**
> **Where to work:**
> - Open the linked note directly and start working
> - Use [[TODO#🔥 Focus Now]] for energy-based filtering
> - Need more context? → [[TODO#📋 Next Actions by Context]]
>
> **After completing:**
> 1. Mark task ✅ done in the source note
> 2. Update `completion_percentage` if it's an effort
> 3. Return here to check next focus item

---

## ⚠️ Urgent Attention

> [!danger]- 🚨 **Action Hub: Urgent Items**
> **Overdue tasks:**
> - Click the task link → complete it NOW or reschedule with a new `due::` date
> - Can't do it? → Change to `@waiting` and note who/what you're waiting for
>
> **Approaching dues:**
> - Open the effort → update `next_actions` field with immediate step
> - Need to delegate? → Add `waiting_for::` and `waiting_since::` fields
> - Need to postpone? → Update `due` and add reason in note body
>
> **Where to manage:** [[TODO#📅 Calendar View]]

### 🔴 Overdue Tasks

```dataview
TASK
WHERE !completed
  AND due
  AND due < date(today)
SORT due ASC
LIMIT 10
```

### 🟡 Due Within 3 Days

```dataview
TASK
WHERE !completed
  AND due
  AND due >= date(today)
  AND due <= date(today) + dur(3 days)
SORT due ASC
LIMIT 10
```

### 📅 Efforts with Approaching Deadlines

```dataview
TABLE WITHOUT ID
  file.link as "Effort",
  due as "📅 Deadline",
  priority as "Priority",
  choice(completion_percentage, completion_percentage + "%", "?") as "Progress"
FROM "03-Efforts"
WHERE status = "🔄active"
  AND due
  AND due <= date(today) + dur(7 days)
SORT due ASC
LIMIT 7
```

---

## 📥 Inbox Triage

> [!warning] Target: Process within 48 hours. Items older than 7 days need immediate attention.

> [!example]- 📬 **Action Hub: Inbox Processing**
> **Go to:** [[+Inbox]] to process items directly
>
> **2-Minute Triage Decision Tree:**
> ```
> Is it actionable?
> ├─ NO → Is it reference material?
> │       ├─ YES → Move to [[04-Sources]] or [[02-Dots]]
> │       └─ NO → 🗑️ Delete it
> └─ YES → Can I do it in <2 min?
>         ├─ YES → Do it now, then delete/archive
>         └─ NO → Is it a project?
>                 ├─ YES → Create in [[03-Efforts/Simmering]]
>                 └─ NO → Add task to relevant note
> ```
>
> **Quick destination guide:**
> | Content Type | Move To | Template |
> |--------------|---------|----------|
> | Idea/thought | [[100-Atomics]] | `Atomic-New` |
> | Task/project | [[03-Efforts]] | `Effort-New` |
> | Reference | [[04-Sources]] | `Source-New` |
> | Meeting note | [[Meetings]] | `Meeting-New` |
> | Unsure | Keep + add #🚤floating | — |

### Inbox Overview

```dataview
TABLE WITHOUT ID
  file.link as "📄 Item",
  dateformat(file.ctime, "yyyy-MM-dd") as "📅 Captured",
  round((date(today) - file.ctime) / dur(1 day)) + " days" as "⏰ Age"
FROM "+Inbox"
WHERE file.name != "+Inbox"
  AND !contains(file.name, "About")
SORT file.ctime ASC
LIMIT 15
```

### 🚨 Stale Inbox Items (>7 days)

```dataview
TABLE WITHOUT ID
  file.link as "📄 Item",
  round((date(today) - file.ctime) / dur(1 day)) + " days" as "⏰ Age"
FROM "+Inbox"
WHERE file.name != "+Inbox"
  AND !contains(file.name, "About")
  AND file.ctime < date(today) - dur(7 days)
SORT file.ctime ASC
LIMIT 10
```

> [!tip] **Quick Triage Protocol**
> For each stale item, decide in under 2 minutes:
> - 🗑️ **Delete** — Not valuable
> - 📤 **Move** — Has a clear home → move it now
> - 📝 **Process** — Needs thinking → schedule 15 min block
> - 🏷️ **Tag** — Not sure → add #🚤floating and revisit in weekly review

---

## ⏳ Waiting & Blocked

> [!info] Things you can't act on until someone/something else moves.

> [!question]- ⏳ **Action Hub: Unblock Your Work**
> **For each waiting item, decide:**
>
> | Situation | Action | How |
> |-----------|--------|-----|
> | No response >3 days | Send follow-up | Note the follow-up in the task |
> | Stale >2 weeks | Escalate or find alternative | Update `waiting_for` or remove |
> | Resolved | Unblock it | Remove `waiting_for`, set `status: 🔄active` |
> | No longer needed | Close it | Set `status: ❌cancelled` or delete |
>
> **Quick follow-up template:**
> ```
> Hey [name], following up on [topic] from [date].
> Let me know if you need anything from me to move forward.
> ```
>
> **Where to manage waiting contexts:** [[TODO#⏳ Waiting For]]

### Notes in Waiting Status

```dataview
TABLE WITHOUT ID
  file.link as "Item",
  waiting_for as "⏳ Waiting For",
  waiting_since as "📅 Since",
  choice(round((date(today) - waiting_since) / dur(1 day)), round((date(today) - waiting_since) / dur(1 day)) + " days", "?") as "Duration"
FROM ""
WHERE status = "⏳waiting" OR waiting_for
SORT waiting_since ASC
LIMIT 10
```

### Tasks Tagged @waiting

```tasks
not done
(description includes @waiting) OR (description includes ⏳)
sort by created
limit 10
```

### Blocked Efforts

```dataview
TABLE WITHOUT ID
  file.link as "Effort",
  blocked_by as "🚫 Blocked By",
  priority as "Priority"
FROM "03-Efforts"
WHERE blocked_by OR status = "⚠️blocked"
SORT priority DESC
LIMIT 7
```

> [!tip] **Weekly Waiting Review**
> For each waiting item:
> 1. Is follow-up needed? → Send reminder
> 2. Is it stale (>2 weeks)? → Escalate or find alternative
> 3. Is it no longer relevant? → Close it

---

## 🛠️ Maintenance Queue

> [!info] Notes that need attention but aren't urgent. Tackle during low-energy time.

> [!success]- 🧹 **Action Hub: Maintenance Work**
> **Go to:** [[🧹Cleaning Lady]] for full maintenance dashboard
>
> **What each tag means & what to do:**
>
> | Tag | Meaning | Action | Time |
> |-----|---------|--------|------|
> | #🧹tidy | Needs reorganization | Restructure, fix formatting, clean up | 5-15 min |
> | #🌱develop | Incomplete content | Add sections, expand ideas, add links | 10-30 min |
> | #❔question | Needs research | Answer the question, then remove tag | 5-20 min |
> | #🚤floating | No clear home | Decide: move, merge, or delete | 2-5 min |
>
> **Efficient workflow:**
> 1. Pick **1 note** from lists below
> 2. Open it → do the work → remove the tag
> 3. If >15 min needed, schedule a time block instead
>
> **For bulk maintenance:** [[🧹Cleaning Lady]] | [[🌱Incubator]]

### 🧹 Notes Tagged #tidy

```dataview
TABLE WITHOUT ID
  file.link as "Note",
  file.folder as "Location",
  dateformat(file.mtime, "yyyy-MM-dd") as "Last Modified"
FROM ""
WHERE file.tags AND (contains(file.tags, "#tidy") OR contains(file.tags, "#🧹tidy") OR contains(string(file.tags), "tidy"))
SORT file.mtime ASC
LIMIT 10
```

### 🌱 Notes Tagged #develop

```dataview
TABLE WITHOUT ID
  file.link as "Note",
  maturity as "Maturity",
  dateformat(file.mtime, "yyyy-MM-dd") as "Last Modified"
FROM ""
WHERE file.tags AND (contains(file.tags, "#develop") OR contains(file.tags, "#🌱develop") OR contains(string(file.tags), "develop"))
SORT file.mtime ASC
LIMIT 10
```

### ❔ Notes Needing Research

```dataview
TABLE WITHOUT ID
  file.link as "Note",
  file.folder as "Location"
FROM ""
WHERE file.tags AND (contains(file.tags, "#question") OR contains(file.tags, "#❔question") OR contains(string(file.tags), "question"))
LIMIT 7
```

### 🚤 Floating Notes (No Clear Home)

```dataview
TABLE WITHOUT ID
  file.link as "Note",
  file.folder as "Current Location"
FROM ""
WHERE file.tags AND (contains(file.tags, "#floating") OR contains(file.tags, "#🚤floating") OR contains(string(file.tags), "floating"))
LIMIT 7
```

> [!tip] **Maintenance Habit**
> Pick 1 note from above during each daily review. 5 minutes max. Progress > perfection.

---

## 🔍 Data Integrity

> [!warning] Notes with missing or inconsistent metadata. Fixing these improves queries and future-proofs your vault.

> [!bug]- 🔧 **Action Hub: Fix Metadata**
> **Tools:** `Cmd/Ctrl+P` → "MetaEdit" or edit YAML manually
>
> **Quick fix guide:**
>
> | Missing | Add This | Valid Values |
> |---------|----------|--------------|
> | `title` | `title: Note Name` | Any text |
> | `type` | `type: atomic` | `atomic`, `effort`, `source`, `moc`, `meeting`, `area` |
> | `status` | `status: 🔄active` | `📥inbox`, `🔄active`, `⏳waiting`, `✅completed`, `📦archived` |
> | `created` | `created: 2026-01-15` | `YYYY-MM-DD` format |
>
> **Stale active notes:** These are marked "active" but haven't been touched in 30+ days.
> - Still relevant? → Touch it (make any edit) or update `modified`
> - Actually done? → Change to `status: ✅completed`
> - No longer relevant? → Change to `status: 📦archived`
>
> **Reference docs:** [[CIS_STATUS]] | [[CIS_TYPE]] | [[99-System/FileClass]]

### Missing Critical Metadata

```dataview
TABLE WITHOUT ID
  file.link as "Note",
  choice(title, "✓", "❌") as "Title",
  choice(type, "✓", "❌") as "Type",
  choice(status, "✓", "❌") as "Status",
  choice(file.cday, "✓", "❌") as "Created"
FROM ""
WHERE file.folder != "Templates"
  AND file.folder != "99-System/CIS"
  AND file.folder != "99-System/FileClass"
  AND file.folder != "99-System/Config"
  AND !contains(file.path, "template")
  AND !contains(file.path, "Template")
  AND (!title OR !type OR !status)
SORT file.mtime DESC
LIMIT 15
```

### Active Notes Without Type

```dataview
TABLE WITHOUT ID
  file.link as "Note",
  file.folder as "Location"
FROM ""
WHERE !type
  AND file.folder != "Templates"
  AND !contains(file.path, "99-System")
  AND !contains(file.path, "template")
  AND !contains(file.path, "99-System")
SORT file.mtime DESC
LIMIT 10
```

### Per-Type Metadata Gaps

> [!info] Type-specific validation — checks fields required by each note type's schema.
> Full queries: [[🔍My PKM Queries#31. Effort Metadata Gaps|Q31 Efforts]] · [[🔍My PKM Queries#32. Atomic Metadata Gaps|Q32 Atomics]] · [[🔍My PKM Queries#33. Source Metadata Gaps|Q33 Sources]] · [[🔍My PKM Queries#34. Meeting Metadata Gaps|Q34 Meetings]] · [[🔍My PKM Queries#35. Person Metadata Gaps|Q35 People]]

```dataview
TABLE WITHOUT ID
  file.link as "Note",
  type as "Type",
  choice(type = "effort" AND !priority, "priority", "") +
  choice(type = "source" AND !source_type, "source_type", "") +
  choice(type = "source" AND !read_status, "read_status", "") +
  choice(type = "meeting" AND !meeting_type, "meeting_type", "") +
  choice(type = "person" AND !relationship, "relationship", "") +
  choice(type = "atomic" AND (!tags OR length(file.tags) = 0), "tags", "") as "Missing Field"
FROM "02-Dots" OR "03-Efforts" OR "04-Sources"
WHERE
  (type = "effort" AND !priority) OR
  (type = "source" AND (!source_type OR !read_status)) OR
  (type = "meeting" AND !meeting_type) OR
  (type = "person" AND !relationship) OR
  (type = "atomic" AND (!tags OR length(file.tags) = 0))
SORT type ASC
LIMIT 15
```

### Stale Active Notes (Active but untouched >30 days)

```dataview
TABLE WITHOUT ID
  file.link as "Note",
  status as "Status",
  dateformat(file.mtime, "yyyy-MM-dd") as "Last Modified",
  round((date(today) - file.mtime) / dur(1 day)) + " days ago" as "Staleness"
FROM ""
WHERE status = "🔄active"
  AND file.mtime < date(today) - dur(30 days)
  AND file.folder != "Templates"
  AND !contains(file.path, "99-System")
SORT file.mtime ASC
LIMIT 10
```

> [!tip] **Stale Content Actions**
> For each stale item, decide:
> - **Still relevant?** → Touch it (edit) or update `modified` date
> - **Actually done?** → Change to `status: ✅completed`
> - **No longer needed?** → Change to `status: 📦archived`
> - **Paused intentionally?** → Change to `status: ⏸️paused`
>
> Use `Cmd/Ctrl+P` → "MetaEdit" or manually edit YAML. Target: 3 fixes per week.

---

## 🔄 Review Flows

> [!multi-column]
>
> > [!note]+ ☀️ Daily (10 min)
> > **When:** Morning + Evening
> > **Focus:** Clarity & closure
> > **Skip to:** [[#☀️ Daily Review (10 min)]]
>
> > [!note]+ 📅 Weekly (30-45 min)
> > **When:** End of week
> > **Focus:** Get current
> > **Skip to:** [[#📅 Weekly Review (30-45 min)]]
> > **Full version:** [[🎯GTD Weekly Review - Template]]
>
> > [!note]+ 📆 Monthly (60-90 min)
> > **When:** First weekend
> > **Focus:** Zoom out & realign
> > **Skip to:** [[#📆 Monthly Review (60-90 min)]]

### ☀️ Daily Review (10 min)

> [!info] Purpose: Start the day with clarity. End the day with closure.

**Morning Start (5 min)**
- [ ] Glance at [[#🚦 System Health Dashboard]] — any red indicators?
- [ ] Check [[#🔥 Top 3 Focus Suggestions]] — what's my #1 priority?
- [ ] Scan [[#⚠️ Urgent Attention]] — any overdue items?
- [ ] If inbox > 10: quick-triage 3 oldest items (2 min each)

**Evening Close (5 min)**
- [ ] Log what I accomplished in today's Daily Note
- [ ] Any new tasks captured? Quick inbox sweep
- [ ] Pick 1 note from [[#🛠️ Maintenance Queue]] → 5 min cleanup
- [ ] Set tomorrow's intention (write in Daily Note or TODO)

**Output:** Clear head, closed loops, tomorrow's focus set.

> [!done]- ✅ **After Daily Review: What's Next?**
> **Morning path:**
> - Open your #1 focus item from [[#🔥 Top 3 Focus Suggestions]]
> - Or go to [[TODO#📋 Next Actions by Context]] for context-based work
>
> **Evening path:**
> - Create tomorrow's Daily Note in [[Daily]]
> - Or log today's wins in [[🏡Home]]

---

### 📅 Weekly Review (30-45 min)

> [!info] Purpose: Get current. Get clear. Get creative. ([Full checklist →](🎯GTD%20Weekly%20Review%20-%20Template.md))

#### Phase 1: GET CLEAR (10 min)
- [ ] Empty inbox to ≤5 items ([[+Inbox]])
- [ ] Process all new captures from the week
- [ ] Clear email/messaging inboxes (external)
- [ ] Mind sweep: any floating commitments? Capture them.

#### Phase 2: GET CURRENT (15 min)
- [ ] Review [[#⏳ Waiting & Blocked]] — follow up needed?
- [ ] Review [[#⚠️ Urgent Attention]] — reschedule if needed
- [ ] Check active efforts in [[03-Efforts]] — any stalled?
- [ ] Review calendar: past week (anything missed?) + next 2 weeks (prep needed?)
- [ ] Update any stale `completion_percentage` values

#### Phase 3: GET CREATIVE (10 min)
- [ ] Review [[🌱Incubator]] — any ideas ready to activate?
- [ ] Look at [[#🛠️ Maintenance Queue]] — pick 2-3 for next week
- [ ] Any new efforts to start? Create note in [[03-Efforts/Simmering]]
- [ ] Connect dots: any notes that should be linked?

#### Phase 4: COMMIT (5 min)
- [ ] Set 3 priorities for next week (write below or in Weekly Note)
- [ ] Schedule any calendar blocks needed
- [ ] Update this week's [[Weekly]] note

**This Week's Priorities:**
1.
2.
3.

> [!done]- ✅ **After Weekly Review: What's Next?**
> **Wrap-up actions:**
> - [ ] Update [[Weekly]] with this week's priorities
> - [ ] Block time in your calendar for priority #1
> - [ ] Send any follow-ups identified in Waiting review
>
> **Quick links for next week:**
> - Start Monday with [[#☀️ Daily Review (10 min)]]
> - Deep work? → [[TODO#🔥 Focus Now]]
> - Process captures? → [[+Inbox]]

---

### 📆 Monthly Review (60-90 min)

> [!info] Purpose: Zoom out. Archive completed work. Realign with goals.

#### Part A: Archive & Clean (20 min)
- [ ] Move ✅completed efforts to [[06-Archive/Completed]]
- [ ] Archive completed sources you won't reference again
- [ ] Clear all red indicators from [[#🚦 System Health Dashboard]]
- [ ] Run [[#🔍 Data Integrity]] fixes — target: clear the list

#### Part B: Review Areas (20 min)
- [ ] Open [[MOC - Areas]] and review each life area
- [ ] Any area neglected? Add to next month's focus
- [ ] Update `last_review` date on Area notes
- [ ] Check: Are efforts aligned with areas that matter?

#### Part C: Effort Pipeline (20 min)
- [ ] Review [[On]] — still the right active projects?
- [ ] Review [[03-Efforts/Simmering]] — anything ready to activate?
- [ ] Review [[03-Efforts/Ongoing]] — any maintenance work overdue?
- [ ] Kill or archive stalled efforts (>60 days no progress)

#### Part D: System Health (20 min)
- [ ] Review [[🧹Cleaning Lady]] — any systemic issues?
- [ ] Check [[99-System]] docs — anything outdated?
- [ ] Template check: Are templates still serving you?
- [ ] Identify 1 system improvement for next month

#### Part E: Look Ahead (10 min)
- [ ] What's the theme for next month?
- [ ] What 3 efforts would make next month successful?
- [ ] Any upcoming dues to prepare for?
- [ ] Update [[Monthly]] note

**This Month's Theme:**


**Top 3 Efforts for This Month:**
1.
2.
3.

> [!done]- ✅ **After Monthly Review: What's Next?**
> **Celebrate & capture:**
> - [ ] Update [[Monthly]] with theme and top efforts
> - [ ] Archive this month's completed efforts → [[06-Archive/Completed]]
> - [ ] Share a win with someone (optional but rewarding)
>
> **Set up for success:**
> - [ ] Review [[MOC - Areas]] — ensure efforts align with what matters
> - [ ] Clear any remaining 🔴 indicators in [[#🚦 System Health Dashboard]]
> - [ ] Schedule next month's review in your calendar
>
> **System health:** [[🧹Cleaning Lady]] | [[99-System]]

---

## 🚨 Re-Entry Protocol

> [!warning] Use this when you've been away from the system for 1+ weeks.

> [!tip]- 🆘 **Quick Re-Entry Decision**
> **How long were you away?**
>
> | Absence | What To Do | Time Needed |
> |---------|------------|-------------|
> | 3-7 days | Do a normal weekly review | 45 min |
> | 1-2 weeks | Use [[#Triage Mode (15 min)]] below | 15 min + scheduled weekly |
> | 2+ weeks | Use [[#Recovery Week Protocol]] | 5 days of 15-min sessions |
>
> **Remember:** The goal is "good enough," not "perfect." Your past self captured things for a reason—trust that and triage ruthlessly.

### Triage Mode (15 min)

When returning after neglect, do NOT try to process everything. Follow this sequence:

**Step 1: Assess Damage (3 min)**
- [ ] Check [[#🚦 System Health Dashboard]] — how bad is it?
- [ ] Note the numbers. Don't panic. The system is forgiving.

**Step 2: Emergency Triage (7 min)**
- [ ] Scan [[#⚠️ Urgent Attention]] — any REAL emergencies?
- [ ] Handle only true emergencies (due today, angry stakeholder)
- [ ] Everything else can wait

**Step 3: Containment (5 min)**
- [ ] DON'T empty inbox now — just scan for anything urgent
- [ ] DON'T process waiting list — just note anything critical
- [ ] Capture any floating thoughts from your absence (brain dump)
- [ ] Schedule a proper weekly review within 48 hours

### Recovery Week Protocol

After triage, use this modified weekly review:

**Day 1-2: Inbox Blitz**
- Process 10 items per day maximum
- Delete ruthlessly (if unsure after 30 sec, delete)
- Don't perfect — just sort

**Day 3-4: Status Update**
- Update effort statuses (many may now be stale/completed)
- Close or archive anything no longer relevant
- Reset waiting items that expired

**Day 5: Normal Weekly Review**
- By now you should be back to baseline
- Do a full weekly review
- Forgive yourself for any dropped balls

> [!quote] Remember: The system exists to serve you, not the other way around. A week of chaos doesn't require a week of admin. Get to "good enough" fast, then iterate.

---

## 🔗 Quick Navigation

> [!tip]- 🧭 **When to Use Each Hub**
> | I want to... | Go to |
> |--------------|-------|
> | See system health at a glance | **You're here!** [[#🚦 System Health Dashboard]] |
> | Work on tasks by context (@computer, @home) | [[TODO]] |
> | Do a full weekly review checklist | [[🎯GTD Weekly Review - Template]] |
> | Process new captures | [[+Inbox]] |
> | Work on active projects | [[03-Efforts]] |
> | Fix and maintain notes | [[🧹Cleaning Lady]] |
> | Develop incomplete ideas | [[🌱Incubator]] |
> | See today's focus | [[🏡Home]] |

### Core Hubs
- [[TODO]] — Task management & contexts
- [[🎯GTD Weekly Review - Template]] — Full weekly review checklist
- [[🏡Home]] — Daily dashboard
- [[👁️Dashboard]] — System overview

### Work Locations
- [[+Inbox]] — Capture dropzone
- [[03-Efforts]] — Active projects
- [[On]] — Hot projects
- [[03-Efforts/Simmering]] — Backburner
- [[03-Efforts/Ongoing]] — Maintenance efforts

### Knowledge Locations
- [[01-MOCs]] — Maps of Content
- [[02-Dots]] — Atomic knowledge
- [[04-Sources]] — References & sources
- [[MOC - Areas]] — Life areas

### Time Locations
- [[05-Calendar]] — Calendar hub
- [[Daily]] — Daily notes
- [[Weekly]] — Weekly notes

### System Locations
- [[99-System]] — System documentation
- [[🧹Cleaning Lady]] — Maintenance queue
- [[🌱Incubator]] — Developing ideas
- [[Templates]] — Note templates

---

## 📊 Advanced: Cleanups That Compound

> [!info] Small fixes that improve the system over time. Pick 1 per week.

> [!abstract]- 🔨 **Action Hub: System Improvements**
> **Where to do deep cleanup:** [[🧹Cleaning Lady]]
>
> **Priority order for cleanup work:**
> 1. **Metadata fixes** → Makes queries work correctly
> 2. **Orphan linking** → Improves discoverability
> 3. **Note promotion** → Surfaces valuable content
>
> **Efficient batch workflow:**
> 1. Open [[🧹Cleaning Lady]] in one pane
> 2. Pick 3 notes from one category below
> 3. Fix all 3 in one 15-min session
> 4. Mark them done (remove tag or update metadata)
>
> **Tools:** MetaEdit plugin | [[99-System/FileClass]] for templates

### High-Impact Metadata Fixes

```dataview
TABLE WITHOUT ID
  file.link as "Note",
  "Missing: " + choice(!title, "title ", "") + choice(!type, "type ", "") + choice(!status, "status", "") as "Fix Needed"
FROM "03-Efforts" OR "02-Dots" OR "04-Sources"
WHERE (!title OR !type OR !status)
  AND (status = "🔄active" OR !status)
LIMIT 5
```

### Notes Worth Promoting (Seed → Sapling)

```dataview
TABLE WITHOUT ID
  file.link as "Note",
  maturity as "Current",
  length(file.inlinks) as "Inlinks"
FROM ""
WHERE maturity = "📤seed" OR maturity = "🌱seedling"
SORT length(file.inlinks) DESC
LIMIT 5
```

### Orphan Notes (No inlinks, not archived)

```dataview
TABLE WITHOUT ID
  file.link as "Note",
  file.folder as "Location"
FROM ""
WHERE length(file.inlinks) = 0
  AND file.folder != "Templates"
  AND file.folder != "06-Archive"
  AND !contains(file.path, "99-System")
  AND !contains(file.path, "99-System")
  AND status != "📦archived"
SORT file.mtime DESC
LIMIT 7
```

---

## 🌱 Maturity Promotion Suggestions

> [!info] Notes that have grown enough connections to be promoted to a higher maturity stage.

```dataviewjs
/**
 * QUERY: Maturity Promotion Suggestions
 * PURPOSE: Surface notes ready for promotion based on link density
 * CRITERIA: outlinks + inlinks + stability days
 * UPDATED: 2026-02-05
 */
try {
  const today = dv.date('today');

  const candidates = dv.pages('"02-Dots"')
    .where(p => p.maturity && p.type === 'atomic')
    .map(p => {
      const outlinks = p.file.outlinks?.length ?? 0;
      const inlinks = p.file.inlinks?.length ?? 0;
      const daysSinceModified = Math.round(today.diff(p.file.mtime, 'days')?.days ?? 0);

      // Determine suggested maturity
      let suggested = null;
      if (p.maturity === '📤seed' && outlinks >= 2 && inlinks >= 1) {
        suggested = '🌱seedling';
      } else if (p.maturity === '🌱seedling' && outlinks >= 5 && inlinks >= 2 && daysSinceModified >= 30) {
        suggested = '🪴sapling';
      } else if (p.maturity === '🪴sapling' && outlinks >= 10 && inlinks >= 5 && daysSinceModified >= 90) {
        suggested = '🌲evergreen';
      }

      return suggested ? {
        file: p.file.link,
        current: p.maturity,
        suggested,
        reason: `${outlinks} out, ${inlinks} in, ${daysSinceModified}d stable`
      } : null;
    })
    .filter(x => x !== null)
    .slice(0, 7);

  if (candidates.length > 0) {
    dv.header(4, `📈 Ready for Promotion (${candidates.length})`);
    dv.table(
      ["Note", "Current", "Suggested", "Metrics"],
      candidates.map(c => [c.file, c.current, c.suggested, c.reason])
    );
    dv.paragraph("*Update maturity in note YAML or use YAML Orchestrator*");
  } else {
    dv.paragraph("✅ No promotion candidates at this time. Keep building connections!");
  }
} catch (e) {
  dv.paragraph(`⚠️ Error: ${e.message}`);
}
```

---

## 🏷️ Tag Health Monitor

> [!info] Monitor tag hygiene: orphan tags (rarely used) and over-tagged notes.

```dataviewjs
/**
 * QUERY: Tag Health Analysis
 * PURPOSE: Surface tag maintenance opportunities
 * UPDATED: 2026-02-05
 */
try {
  const pages = dv.pages().where(p =>
    !p.file.path.includes("99-System") &&
    !p.file.path.includes("Templates")
  );

  // Collect all tags with counts
  const tagCounts = {};
  pages.forEach(p => {
    (p.file.tags || []).forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  // Orphan tags (< 3 uses)
  const orphanTags = Object.entries(tagCounts)
    .filter(([tag, count]) => count < 3 && !tag.includes("tidy") && !tag.includes("develop"))
    .sort((a, b) => a[1] - b[1])
    .slice(0, 10);

  // Over-tagged notes (> 8 tags)
  const overTagged = pages
    .where(p => (p.file.tags?.length ?? 0) > 8)
    .sort(p => p.file.tags.length, 'desc')
    .slice(0, 5);

  // Render results
  if (orphanTags.length > 0) {
    dv.header(4, `🏷️ Low-Use Tags (< 3 occurrences)`);
    dv.table(
      ["Tag", "Count", "Action"],
      orphanTags.map(([tag, count]) => [tag, count, "Consolidate or remove"])
    );
  } else {
    dv.paragraph("✅ No orphan tags found.");
  }

  if (overTagged.length > 0) {
    dv.header(4, `📊 Over-Tagged Notes (> 8 tags)`);
    dv.table(
      ["Note", "Tag Count"],
      overTagged.map(p => [p.file.link, p.file.tags.length])
    );
  } else {
    dv.paragraph("✅ No over-tagged notes found.");
  }
} catch (e) {
  dv.paragraph(`⚠️ Error: ${e.message}`);
}
```

---

## 🔗 Connection Suggestions

> [!tip]+ **AI-Suggested Links**
> Use the **Smart Connections** sidebar to discover semantically related notes.
> **Shortcut**: `Ctrl+Shift+S`
>
> **Weekly Goal**: Add 5+ meaningful connections to reduce orphan notes.

### Recently Well-Connected (Last 7 Days)

```dataviewjs
/**
 * QUERY: Recently Well-Connected Notes
 * PURPOSE: Surface notes that gained 5+ outlinks recently — highlights good linking work
 * UPDATED: 2026-02-07
 */
try {
  const today = dv.date('today');
  const weekAgo = today.minus({days: 7});

  const recentlyConnected = dv.pages('"02-Dots"')
    .where(p =>
      p.file.mtime >= weekAgo &&
      (p.file.outlinks?.length ?? 0) >= 5
    )
    .sort(p => p.file.outlinks.length, 'desc')
    .slice(0, 5);

  if (recentlyConnected.length > 0) {
    dv.table(
      ["Note", "Outlinks", "Inlinks"],
      recentlyConnected.map(p => [
        p.file.link,
        p.file.outlinks?.length ?? 0,
        p.file.inlinks?.length ?? 0
      ])
    );
  } else {
    dv.paragraph("No well-connected notes modified this week. Try linking some seeds!");
  }
} catch (e) {
  dv.paragraph(`⚠️ Error: ${e.message}`);
}
```

### Least Connected Active Notes

```dataviewjs
/**
 * QUERY: Least Connected Active Notes
 * PURPOSE: Surface active notes with fewest connections — prime targets for linking
 * UPDATED: 2026-02-07
 */
try {
  const leastConnected = dv.pages()
    .where(p =>
      p.status === "🔄active" &&
      !p.file.path.includes("Templates") &&
      !p.file.path.includes("99-System") &&
      (p.file.outlinks?.length ?? 0) <= 1
    )
    .sort(p => (p.file.outlinks?.length ?? 0) + (p.file.inlinks?.length ?? 0), 'asc')
    .slice(0, 7);

  if (leastConnected.length > 0) {
    dv.table(
      ["Note", "Outlinks", "Inlinks", "Type"],
      leastConnected.map(p => [
        p.file.link,
        p.file.outlinks?.length ?? 0,
        p.file.inlinks?.length ?? 0,
        p.type ?? "—"
      ])
    );
    dv.paragraph("*Open these notes and use Smart Connections to find related content.*");
  } else {
    dv.paragraph("✅ All active notes have connections. Great work!");
  }
} catch (e) {
  dv.paragraph(`⚠️ Error: ${e.message}`);
}
```

---

## ⚙️ WIP Limits & Noise Control

To keep this hub usable, all queries above enforce limits:

| Section | Max Items | Rationale |
|---------|-----------|-----------|
| Focus Suggestions | 3 | More choices = paralysis |
| Overdue Tasks | 10 | Focus on worst offenders |
| Due Soon Tasks | 10 | Sufficient for 3-day horizon |
| Inbox Items | 15 | See enough to act |
| Waiting Items | 10 | Follow-up is bounded |
| Maintenance | 10 per type | Prevents doom-scrolling |
| Data Integrity | 15 | Manageable batch |
| Connection Suggestions | 7 per list | Actionable batch |

**If lists feel overwhelming:**
1. Focus only on items with 🔴 health indicators
2. Process just the first 3 items in any list
3. Use the [[#🚨 Re-Entry Protocol]] to reset

---

## 📝 Configuration Notes

> [!info] Adjust these values to match your vault conventions.

**Current assumptions in this hub:**
- Inbox folder: `+Inbox`
- Efforts folder: `03-Efforts`
- Archive folder: `06-Archive`
- Templates folder: `Templates`
- System folder: `99-System`
- Status field uses emoji prefixes: `📥`, `🔄`, `⏳`, `✅`, `📦`
- Priority values: `high`, `medium`, `low`
- Maturity values: `📤seed`, `🌱seedling`, `🪴sapling`, `🌲evergreen`, `🍓fruit`

**Tags checked for maintenance:**
- `#tidy` or `#🧹tidy`
- `#develop` or `#🌱develop`
- `#question` or `#❔question`
- `#floating` or `#🚤floating`

**Thresholds (edit DataviewJS to adjust):**
- Inbox green: ≤5 | yellow: ≤15 | red: >15
- Overdue green: 0 | yellow: ≤3 | red: >3
- Active efforts green: ≤5 | yellow: ≤10 | red: >10
- Waiting items green: ≤3 | yellow: ≤7 | red: >7
- Maintenance debt green: ≤5 | yellow: ≤15 | red: >15

---

*Last updated: `= this.modified`*

*Navigate: [[🏡Home]] | [[TODO]] | [[🎯GTD Weekly Review - Template]] | [[+Inbox]]*
