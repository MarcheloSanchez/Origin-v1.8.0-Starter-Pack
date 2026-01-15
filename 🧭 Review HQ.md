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
  - 🏠system
  - 🎯gtd
  - ⚡productivity
  - 🧭navigation
status: 🔄active
maturity: 🌲evergreen
priority: high
processing_priority: high
created: 2026-01-15
modified: 2026-01-15
cssclasses:
  - wide-page
  - review-hq
related:
  - "[[🎯GTD Command Center]]"
  - "[[🎯GTD Weekly Review]]"
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

```dataviewjs
// ═══════════════════════════════════════════════════════════════════
// SYSTEM HEALTH INDICATORS
// ═══════════════════════════════════════════════════════════════════

const today = dv.date("today");
const oneWeekAgo = dv.date("today").minus({days: 7});
const twoWeeksAgo = dv.date("today").minus({days: 14});

// --- Inbox Health ---
const inboxItems = dv.pages('"+Inbox"').where(p => p.file.name !== "+Inbox" && !p.file.name.includes("About"));
const inboxCount = inboxItems.length;
const oldInboxItems = inboxItems.filter(p => p.file.ctime < oneWeekAgo).length;
const inboxStatus = inboxCount <= 5 ? "🟢" : inboxCount <= 15 ? "🟡" : "🔴";
const inboxAge = oldInboxItems === 0 ? "🟢" : oldInboxItems <= 3 ? "🟡" : "🔴";

// --- Overdue Tasks ---
const allTasks = dv.pages().file.tasks.where(t => !t.completed);
const overdueTasks = allTasks.filter(t => t.due && dv.date(t.due) < today).length;
const overdueStatus = overdueTasks === 0 ? "🟢" : overdueTasks <= 3 ? "🟡" : "🔴";

// --- Active Efforts ---
const activeEfforts = dv.pages('"03-Efforts"').where(p =>
  p.status === "🔄active" || p.status === "active"
).length;
const effortStatus = activeEfforts <= 5 ? "🟢" : activeEfforts <= 10 ? "🟡" : "🔴";

// --- Waiting For ---
const waitingItems = dv.pages().where(p =>
  p.status === "⏳waiting" || p.status === "waiting" || p.waiting_for
).length;
const waitingTasks = allTasks.filter(t =>
  t.text.toLowerCase().includes("@waiting") || t.text.includes("⏳")
).length;
const totalWaiting = waitingItems + waitingTasks;
const waitingStatus = totalWaiting <= 3 ? "🟢" : totalWaiting <= 7 ? "🟡" : "🔴";

// --- Maintenance Debt ---
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
```

---

## 🔥 Top 3 Focus Suggestions

> [!info] Auto-generated based on: Due soon + Recently modified + Not blocked
> These are your highest-leverage actions right now.

```dataviewjs
// ═══════════════════════════════════════════════════════════════════
// TOP 3 FOCUS ITEMS (Weighted scoring)
// ═══════════════════════════════════════════════════════════════════

const today = dv.date("today");
const threeDays = dv.date("today").plus({days: 3});

// Get all relevant pages
let candidates = dv.pages()
  .where(p =>
    (p.status === "🔄active" || p.status === "active") &&
    p.status !== "⏳waiting" &&
    p.status !== "waiting" &&
    !p.waiting_for &&
    !p.blocked_by &&
    p.file.folder !== "06-Archive" &&
    p.file.folder !== "Templates" &&
    !p.file.path.includes("Archive")
  )
  .map(p => {
    let score = 0;

    // Due date scoring (higher = more urgent)
    if (p.due || p.deadline) {
      const dueDate = dv.date(p.due || p.deadline);
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
      item.page.due || item.page.deadline
        ? `📅 Due: ${item.page.due || item.page.deadline}`
        : item.page.priority === "high"
          ? "⚡ High priority"
          : "🔄 Active momentum",
      item.page.next_actions || "—"
    ])
  );
} else {
  dv.paragraph("*No urgent focus items detected. Check your [[🎯GTD Command Center]] for next actions by context.*");
}
```

> [!tip] Can't decide? Pick #1 and work for 25 minutes. Then reassess.

---

## ⚠️ Urgent Attention

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
  deadline as "📅 Deadline",
  priority as "Priority",
  choice(completion_percentage, completion_percentage + "%", "?") as "Progress"
FROM "03-Efforts"
WHERE (status = "🔄active" OR status = "active")
  AND deadline
  AND deadline <= date(today) + dur(7 days)
SORT deadline ASC
LIMIT 7
```

---

## 📥 Inbox Triage

> [!warning] Target: Process within 48 hours. Items older than 7 days need immediate attention.

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

### Notes in Waiting Status

```dataview
TABLE WITHOUT ID
  file.link as "Item",
  waiting_for as "⏳ Waiting For",
  waiting_since as "📅 Since",
  choice(round((date(today) - waiting_since) / dur(1 day)), round((date(today) - waiting_since) / dur(1 day)) + " days", "?") as "Duration"
FROM ""
WHERE status = "⏳waiting" OR status = "waiting" OR waiting_for
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
  AND !contains(file.path, "00-Meta")
SORT file.mtime DESC
LIMIT 10
```

### Stale Active Notes (Active but untouched >30 days)

```dataview
TABLE WITHOUT ID
  file.link as "Note",
  status as "Status",
  dateformat(file.mtime, "yyyy-MM-dd") as "Last Modified",
  round((date(today) - file.mtime) / dur(1 day)) + " days ago" as "Staleness"
FROM ""
WHERE (status = "🔄active" OR status = "active")
  AND file.mtime < date(today) - dur(30 days)
  AND file.folder != "Templates"
  AND !contains(file.path, "99-System")
SORT file.mtime ASC
LIMIT 10
```

> [!tip] **Quick Fix Protocol**
> Use `Cmd/Ctrl+P` → "MetaEdit" or manually add YAML. Target: 3 fixes per week.

---

## 🔄 Review Flows

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
- [ ] Set tomorrow's intention (write in Daily Note or GTD Command Center)

**Output:** Clear head, closed loops, tomorrow's focus set.

---

### 📅 Weekly Review (30-45 min)

> [!info] Purpose: Get current. Get clear. Get creative. ([Full checklist →](🎯GTD%20Weekly%20Review.md))

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
- [ ] Update this week's [[05-Calendar/Weekly]] note

**This Week's Priorities:**
1.
2.
3.

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
- [ ] Review [[03-Efforts/On]] — still the right active projects?
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
- [ ] Any upcoming deadlines to prepare for?
- [ ] Update [[05-Calendar/Monthly]] note

**This Month's Theme:**


**Top 3 Efforts for This Month:**
1.
2.
3.

---

## 🚨 Re-Entry Protocol

> [!warning] Use this when you've been away from the system for 1+ weeks.

### Triage Mode (15 min)

When returning after neglect, do NOT try to process everything. Follow this sequence:

**Step 1: Assess Damage (3 min)**
- [ ] Check [[#🚦 System Health Dashboard]] — how bad is it?
- [ ] Note the numbers. Don't panic. The system is forgiving.

**Step 2: Emergency Triage (7 min)**
- [ ] Scan [[#⚠️ Urgent Attention]] — any REAL emergencies?
- [ ] Handle only true emergencies (deadline today, angry stakeholder)
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

### Core Hubs
- [[🎯GTD Command Center]] — Task management & contexts
- [[🎯GTD Weekly Review]] — Full weekly review checklist
- [[🏡Home]] — Daily dashboard
- [[👁️Dashboard]] — System overview

### Work Locations
- [[+Inbox]] — Capture dropzone
- [[03-Efforts]] — Active projects
- [[03-Efforts/On]] — Hot projects
- [[03-Efforts/Simmering]] — Backburner
- [[03-Efforts/Ongoing]] — Maintenance efforts

### Knowledge Locations
- [[01-MOCs]] — Maps of Content
- [[02-Dots]] — Atomic knowledge
- [[04-Sources]] — References & sources
- [[MOC - Areas]] — Life areas

### Time Locations
- [[05-Calendar]] — Calendar hub
- [[05-Calendar/Daily]] — Daily notes
- [[05-Calendar/Weekly]] — Weekly notes

### System Locations
- [[99-System]] — System documentation
- [[🧹Cleaning Lady]] — Maintenance queue
- [[🌱Incubator]] — Developing ideas
- [[Templates]] — Note templates

---

## 📊 Advanced: Cleanups That Compound

> [!info] Small fixes that improve the system over time. Pick 1 per week.

### High-Impact Metadata Fixes

```dataview
TABLE WITHOUT ID
  file.link as "Note",
  "Missing: " + choice(!title, "title ", "") + choice(!type, "type ", "") + choice(!status, "status", "") as "Fix Needed"
FROM "03-Efforts" OR "02-Dots" OR "04-Sources"
WHERE (!title OR !type OR !status)
  AND (status = "🔄active" OR status = "active" OR !status)
LIMIT 5
```

### Notes Worth Promoting (Seed → Sapling)

```dataview
TABLE WITHOUT ID
  file.link as "Note",
  maturity as "Current",
  length(file.inlinks) as "Inlinks"
FROM ""
WHERE maturity = "🌱seed" OR maturity = "🌱seedling"
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
  AND !contains(file.path, "00-Meta")
  AND status != "📦archived"
SORT file.mtime DESC
LIMIT 7
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
- Maturity values: `🌱seed`, `🌱seedling`, `🌿sapling`, `🌲evergreen`

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

*Navigate: [[🏡Home]] | [[🎯GTD Command Center]] | [[🎯GTD Weekly Review]] | [[+Inbox]]*
