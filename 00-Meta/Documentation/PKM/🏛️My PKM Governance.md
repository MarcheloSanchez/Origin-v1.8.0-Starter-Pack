---
title: PKM Standards AKA Governance
type: moc
tags:
  - ⚙️system
  - 📊metadata
  - 📋documentation
status: 🔄active
created: 2025-09-30
modified: 2025-09-30
related:
  - "[[🏛️My PKM Governance]]"
  - "[[🔁My PKM Workflows]]"
  - "[[+About Templatesℹ️]]"
---
> [!orbit] Wayfinder | [[🗺️My PKM MOC]] | 🏛️My PKM Governance | [[🔢My PKM Metadata]] | [[🔍My PKM Queries]] |  [[📁My PKM Folders]] |  [[🏷️My PKM Tags]] |  [[🔁My PKM Workflows]] | [[✅My PKM Tasks]] | [[ℹ️My PKM Naming Convention]]

⬆️:: [[🏡Home]]
## 🗒️ What is Obsidian?

A Markdown notes app where you link ideas with `[[anchors]]` 🔗, build simple dashboards 📊, and keep everything local 💾.

## **Related Links Policy**
**Dual Storage Required** - maintain both locations:
1. **YAML metadata**: `related: ["[[Link 1]]", "[[Link 2]]"]` (for queries)
2. **Content section**: `## 🔗 Related` (for readability)
## **Template Compliance Rules**
1. All templates must use emoji status format (`🔄active` not `active`)
2. Type field must match folder location and note purpose
3. FileClass field must align with primary type
4. Processing_priority field standardized across all templates
5. Related links maintained in both YAML and content sections
6. Custom metadata documented and governed (47 fields tracked)

### **1️⃣ Folders & Purpose**

![[📁My PKM Folders#🏗️ Structure]]

[[📁My PKM Folders|Read more...]] 

---
### **2️⃣ Workflow Pipeline**

**Capture → Process → Organize → Review → Archive**
```
📥 Capture (QuickAdd / Mobile / Voice)
   ↓
🔍 Process (Daily Inbox Review, <2min rule, triage to folder)
   ↓
🏗 Organize (Linking, tagging, MOC updates, metadata fill)
   ↓
📊 Review (Daily priorities, Weekly project review, Monthly cleanup)
   ↓
📦 Archive (Move to 06 Archive, auto-add archived_date)
```

**📥Status workflow:**

```
 📥inbox (New captures requiring processing)
   ↓
 🔄active (Currently being worked on)
   ↓
 ⏳waiting (Blocked/waiting for external input)
   ↓
 ✅completed (Finished, ready for archive)
   ↓
 📦archived (Long-term storage, inactive)
```

![[Maturity Evolve#Maturity Lifecycle]]
[[Maturity Evolve|Read more...]] 

**Review Workflow:**
- **Daily** 
    - Process Inbox (10 min)
    - Check Today’s tasks & priorities
    - Log reflections in Daily Note
- **Weekly** | [[Weekly Review Playbook|Read more...]]
    - Review active Efforts & MOCs
    - Update statuses & archive completed items
    - Clean `#🧹tidy` and `#❔question` notes
    - Projects: update `next_action`, prune `#TASK` noise, advance status.
    - Prompts: promote/demote **Favorites/Active/Draft**.
    - Daily notes: compress highlights → weekly summary.
- **Monthly** | [[Monthly Audit Playbook|Read more...]]
    - Topic promotion check (Effort → MOC).
    - Cleanup unused tags, adjust queries, optimize templates, adjust metadata rules.
    - Expire temporary tags; archive completed work.
    - Backup vault & review plugin list
- **Quarterly**
    - Audit system relevance - what’s slowing you down, what’s unused?
    - Optimize templates & queries
[[🔁My PKM Workflows|Read more...]]

---
### **3️⃣ Tags Taxonomy**
- `#TASK` — actionable checklist items in the **body** (never in YAML).
- Project/initiative tags: `#proj/<slug>` (avoid bare project names).
- Temporary focus tags allowed but expire during monthly review.
- **Content type:** `#💡idea` / `#🚀project` / `#📚source` / `#🗺️moc`
- **Note development:** `#🌱develop`, `#❔question`, `#🧹tidy`, `#⚗️experiment`
- **Priority/Energy:** `#priority/high`, `#priority/low`, `#energy/high`, `#energy/low`
- **Context:** `#context/work`, `#context/home`
[[🏷️My PKM Tags|Read more...]]
---
### **4️⃣ Metadata Integration**

![[🔢My PKM Metadata#📊 Universal Metadata Schema]]

> Each **type** has a FileClass defining **required** YAML + optional keys. See in link below.

[[🔢My PKM Metadata#00- atomic Metadata|Read more...]]

----
### **5️⃣ Plugins & Automation Touchpoints**

| Plugin / Tool         | Stage Used         | Role                                              |
| --------------------- | ------------------ | ------------------------------------------------- |
| **QuickAdd**          | Capture            | Instant note/task templates                       |
| **Templater**         | Capture / Process  | Auto-fill metadata, context tags,  project wizard |
| **Tasks**             | Organize / Review  | Manage GTD-style task lists                       |
| **Dataview**          | Review             | Dashboards, reports, queries                      |
| **Kanban**            | Organize / Execute | Visual project tracking                           |
| **MetaEdit**          | Process / Archive  | Bulk update metadata                              |
| **Periodic Notes**    | Capture / Review   | Daily, Weekly, Monthly notes                      |
| **Hotkeys/Shortcuts** | All stages         | Speed & frictionless flow                         |
| **Bases**             | All stages         | Dashboards (store filter YAML).                   |
| **n8n**               | undefined          | GCal → daily/effort notes; append highlights.     |
|                       |                    |                                                   |
[[MOC - Automation Command Center|Read more...]]
#🧹tidy  - create as embeded obsidian plugins note

---
### **6️⃣ Contextual Dashboards** 
**[[👁️Dashboard]]**
- 📥 **New inbox items** (last 7 days)
- ⏳ **Active Efforts with deadlines**
- 💡 **Recently updated Dots**
- 📚 **Sources to process**
- ✅ **Tasks due today**

**[[🏡Home]]** 
Human-curated quick links + “one-glance” counters. #🧹tidy  Implement dasboards
- **Dashboards:** Focused, filterable views (Bases) by type/lifecycle:
    - **Prompt Dashboard:** Favorites | Active | Draft | Archive
    - **Efforts Dashboard:** Active projects by priority/due
    - **Review Dashboard:** Items in `review` across types
_(Implement with Bases; store filter criteria in YAML for reproducibility.)_
---
### 7️⃣ Naming Convention
![[ℹ️My PKM Naming Convention]]

### 8️⃣ Typed Links (sensemaking) 
Use these to annotate links (inline comments or dedicated field): #🧹tidy link to examples
- `supports`, `contradicts`, `depends_on`, `informs`, `instance_of`.

> [!tip] > **Promotion rule (Effort → MOC):** 
> When a topic’s Effort grows to ≥7 curated atomic notes, ≥1 stable outline, and ≥1 dashboard/bases view, **promote** to a MOC (move to `01-MOCS`, set `type: moc`, record promotion date in YAML).

### 9️⃣ Definition of Done (DoD) — per type (short)
- **Atomic:** `summary` present; 1+ link to Sources or Evidence; placed in correct folder; status not `draft`.
- **Project:** `owner`, `due`, `next_action`; at least one milestone or backlog; review note when closing.
- **Source:** `origin`, `author` or publisher; `reliability` set; citation usable.
- **MOC:** curated `includes`, short scope paragraph, one diagram/table or query.
- **Meeting:** `when`, participants; `decisions` & `actions` captured (actions mirrored as #TASK).
- **Prompt:** `goal`, `audience`, `tone`, `patterns`, `inputs`; one example I/O.
- **Archive:** reason recorded; all internal links remain valid.

---
# ✅Do/❌Don’t rules
- **Do** keep top-level folders fixed (00–07, 99); **don’t** add new top-levels ad-hoc.
- **Do** route everything through **+**; **don’t** create notes directly elsewhere.
- **Do** assign **one** `type` per note; **don’t** mix multiple types.
- **Do** use ISO dates in filenames/fields; **don’t** use other date formats.
- **Do** keep `status` to the enum above; (use tags if you want visuals).
- **Do** create via templates per folder; **don’t** hand-type frontmatter.
- **Do** store raw content only in 02/03/04/05; **don’t** park raw notes in **01-MOCs** (indexes only).
- **Do** move finished items to **06-Archive** and set `status: archived`; **don’t** leave completed work in active folders.
- **Do** keep names short with “ – ” separators; **don’t** exceed ~60 chars or add noisy prefixes/suffixes.
- **Do** optimize for [DEVICES] (no special path chars; mobile-safe titles); **don’t** rely on plugins unavailable across devices.
- **Do** write in [LANG] and adapt examples to [EXAMPLES] and [PURPOSE]; **don’t** drift from these scopes.