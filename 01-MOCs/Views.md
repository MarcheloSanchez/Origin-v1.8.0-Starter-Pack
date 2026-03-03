---
up: "[[🏡Home]]"
in:
  - "[[Views]]"
title: Overview of all views 
type: moc
fileClass: moc
tags:
  - ⚙️system
  - 🗺️MOC
status: 🔄active
created: 2025-09-30
modified: 2026-02-24
related:
  - "[[🔍My PKM Queries]]"
  - "[[🔁My PKM Workflows]]"
  - "[[Maps]]"
---

⬆️:: [[🏡Home]]

> Master index of every view in the vault — dashboards, bases, MOC lenses, and query templates. For Bases deep-dive see [[MOC - Bases]].

---

## 📊 Dashboards

Hub notes for navigation and status overview.

| Note                             | Description                                                   |
| -------------------------------- | ------------------------------------------------------------- |
| [[👁️Dashboard]]                 | Main PKM dashboard — task status, inbox count, active efforts |
| [[🏡Home]]                       | Vault home — quick nav to all core areas                      |
| [[TODO]]                         | GTD workflow hub — next actions, projects, waiting            |
| [[🎮Gamification Dashboard]]     | XP, streaks, and habit tracking                               |
| [[📊 Calendar System Dashboard]] | Calendar system overview — daily/weekly/monthly status        |
| [[Prompt Dashboard NEW]]         | Active prompt library browser                                 |
| [[Tags - Status Check]]          |                                                               |


---

## 🗄️ Bases

`.base` database views — structured data filtered and sorted by folder.

### System

| File                        | Description                                           |
| --------------------------- | ----------------------------------------------------- |
| [[Overview of Data.base]]   | Cross-vault table — all notes with status, type, tags |
| [[Active-Types-base.base]]  | Browse every note type (atomic, effort, source, etc.) |
| [[Daily-View.base]]         | Notes created today + modified today across the vault |
| [[Vault-Dash-Missing.base]] | Notes grouped by type — scan for gaps                 |
| [[_System_data.base]]       | System notes missing status, created, or type         |

### Per-Folder Data Bases

| File               | Folder scope            |
| ------------------ | ----------------------- |
| [[_Inbox_Data.base]]    | +Inbox                  |
| [[_Meta_Data.base]]     | 00-Meta                 |
| [[_MOCs_Data.base]]     | 01-MOCs                 |
| [[_Dots_Data.base]]     | 02-Dots                 |
| [[_Atomics_Data.base]]  | 02-Dots/100-Atomics     |
| [[_People_Data.base]]   | 02-Dots/300-People      |
| [[_Efforts_Data.base]]  | 03-Efforts              |
| [[_Sources_Data.base]]  | 04-Sources              |
| [[_Meetings_Data.base]] | 04-Sources/440-Meetings |
| [[_Calendar_Data.base]] | 05-Calendar             |
| [[_Daily_Data.base]]    | 05-Calendar/Daily       |
| [[_Archive_Data.base]]  | 06-Archive              |
| [[_Prompt_Data.base]]   | 07-Prompts              |

> Deep reference: [[MOC - Bases]]

---

## 🗺️ MOC Views

MOC notes that function as curated lenses on vault content.

| Note | Description |
|------|-------------|
| [[🌱Incubator]] | Top 10 notes with most connections — ideas ready to develop |
| [[🍓Maturity Garden]] | Notes by maturity stage (seed → fruit) |
| [[🗺️My PKM MOC]] | Master map of the PKM system |
| [[🧹Cleaning Lady]] | Maintenance view — orphans, stubs, incomplete notes |
| [[MOC - Areas]] | Active areas of responsibility |
| [[MOC - Automation Command Center]] | All automation scripts and macros |
| [[MOC - Bases]] | All `.base` files with filter syntax reference |
| [[MOC - Playbooks]] | Step-by-step process guides |
| [[MOC - Prompts]] | Prompt library MOC |
| [[MOC - Visual Identity]] | Design tokens and visual system |

---

## 🔍 Query Library

Reusable Dataview query templates.

| Note | Description |
|------|-------------|
| [[🔍My PKM Queries]] | Named query library — copy-paste Dataview blocks |
| [[Query - Active Projects]] | All efforts with active status |
| [[Query - Health Status]] | Vault health metrics |
| [[Query - Inbox Processing]] | Items in +Inbox awaiting triage |
| [[Query - Maturity Distribution]] | Count of notes per maturity stage |
| [[Query - Newsletter Queue]] | Sources tagged for newsletter |
| [[Query - Orphan Notes]] | Notes with no inlinks |
| [[Query - Weekly Stats]] | Stats for the current week |
