# Design: Views Master Index

**Date:** 2026-02-24
**File:** `01-MOCs/Views.md`
**Goal:** Replace existing auto-query `Views.md` with a static curated master index of all views in the vault, organized by category with one-line descriptions.

---

## Problem

The current `Views.md` uses a Bases query to auto-discover notes that link to `[[Views]]`. This is implicit — you have to know to link to Views for a note to appear. It also shows no descriptions, just link counts.

## Solution

Static curated MOC with 4 sections. Each entry has a wikilink and one-line description. The existing `MOC - Bases.md` remains the deep-dive reference for Bases — `Views.md` links to it rather than duplicating.

---

## Structure

### 1. Dashboards
Hub notes for navigation and status overview.

| Note | Description |
|------|-------------|
| `👁️Dashboard` | Main PKM dashboard — task status, inbox count, active efforts |
| `🏡Home` | Vault home — quick nav to all core areas |
| `🎯GTD Command Center` | GTD workflow hub — next actions, projects, waiting |
| `🎮Gamification Dashboard` | XP, streaks, and habit tracking |
| `📊 Calendar System Dashboard` | Calendar system overview — daily/weekly/monthly status |
| `Prompt Dashboard NEW` | Active prompt library browser |
| `dashboard.html` | HTML static dashboard (external browser view) |

### 2. Bases
`.base` database views — structured data filtered and sorted by folder.

**System:**

| File | Description |
|------|-------------|
| `Overview of Data` | Cross-vault table — all notes with status, type, tags |
| `Active-Types-base` | Browse every note type (atomic, effort, source, etc.) |
| `Daily-View` | Notes created today + modified today across the vault |
| `Vault-Dash-Missing` | Notes grouped by type — scan for gaps |
| `_System_data` | System notes missing status, created, or type |

**Per-folder data bases** (each shows notes scoped to that folder):

| File | Folder scope |
|------|-------------|
| `_Inbox_Data` | +Inbox |
| `_Meta_Data` | 00-Meta |
| `_MOCs_Data` | 01-MOCs |
| `_Dots_Data` | 02-Dots |
| `_Atomics_Data` | 02-Dots/100-Atomics |
| `_People_Data` | 02-Dots/300-People |
| `_Efforts_Data` | 03-Efforts |
| `_Sources_Data` | 04-Sources |
| `_Meetings_Data` | 04-Sources/440-Meetings |
| `_Calendar_Data` | 05-Calendar |
| `_Daily_Data` | 05-Calendar/Daily |
| `_Archive_Data` | 06-Archive |
| `_Prompt_Data` | 07-Prompts |

> Deep reference: `[[MOC - Bases]]`

### 3. MOC Views
MOC notes that function as curated lenses on vault content.

| Note | Description |
|------|-------------|
| `🌱Incubator` | Top 10 notes with most connections — ideas ready to develop |
| `🍓Maturity Garden` | Notes by maturity stage (seed → fruit) |
| `🗺️My PKM MOC` | Master map of the PKM system |
| `🧹Cleaning Lady` | Maintenance view — orphans, stubs, incomplete notes |
| `MOC - Areas` | Active areas of responsibility |
| `MOC - Automation Command Center` | All automation scripts and macros |
| `MOC - Bases` | All `.base` files with filter syntax reference |
| `MOC - Playbooks` | Step-by-step process guides |
| `MOC - Prompts` | Prompt library MOC |
| `MOC - Visual Identity` | Design tokens and visual system |

### 4. Query Library
Reusable Dataview query templates.

| Note | Description |
|------|-------------|
| `🔍My PKM Queries` | Named query library — copy-paste Dataview blocks |
| `Query - Active Projects` | All efforts with active status |
| `Query - Health Status` | Vault health metrics |
| `Query - Inbox Processing` | Items in +Inbox awaiting triage |
| `Query - Maturity Distribution` | Count of notes per maturity stage |
| `Query - Newsletter Queue` | Sources tagged for newsletter |
| `Query - Orphan Notes` | Notes with no inlinks |
| `Query - Weekly Stats` | Stats for the current week |

---

## Implementation Notes

- Replace the entire body of `01-MOCs/Views.md` — keep existing frontmatter, update title and content
- Add `in: ["[[Views]]"]` to any view notes that are missing it (optional, for backlink hygiene)
- Descriptions are written from what the files actually contain — verify any unknowns before publishing
