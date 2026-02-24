# Views Master Index Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the auto-query body of `01-MOCs/Views.md` with a static curated master index of all views in the vault, organized into 4 sections with one-line descriptions per entry.

**Architecture:** Single file edit — keep existing frontmatter intact, replace everything after the frontmatter with the curated index. No scripts, no automation, no new files.

**Tech Stack:** Markdown, Obsidian wikilinks

---

### Task 1: Rewrite Views.md body

**Files:**
- Modify: `01-MOCs/Views.md` (keep frontmatter lines 1–17, replace lines 18–42)

**Step 1: Open the file and verify frontmatter**

Read `01-MOCs/Views.md`. Confirm frontmatter ends at line 17 (`---`). Do not touch anything above line 18.

**Step 2: Replace body with curated index**

Replace everything from line 18 onward with:

```markdown

⬆️:: [[🏡Home]]

> Master index of every view in the vault — dashboards, bases, MOC lenses, and query templates. For Bases deep-dive see [[MOC - Bases]].

---

## 📊 Dashboards

Hub notes for navigation and status overview.

| Note | Description |
|------|-------------|
| [[👁️Dashboard]] | Main PKM dashboard — task status, inbox count, active efforts |
| [[🏡Home]] | Vault home — quick nav to all core areas |
| [[🎯GTD Command Center]] | GTD workflow hub — next actions, projects, waiting |
| [[🎮Gamification Dashboard]] | XP, streaks, and habit tracking |
| [[📊 Calendar System Dashboard]] | Calendar system overview — daily/weekly/monthly status |
| [[Prompt Dashboard NEW]] | Active prompt library browser |
| [[dashboard.html]] | HTML static dashboard (external browser view) |

---

## 🗄️ Bases

`.base` database views — structured data filtered and sorted by folder.

### System

| File | Description |
|------|-------------|
| [[Overview of Data]] | Cross-vault table — all notes with status, type, tags |
| [[Active-Types-base]] | Browse every note type (atomic, effort, source, etc.) |
| [[Daily-View]] | Notes created today + modified today across the vault |
| [[Vault-Dash-Missing]] | Notes grouped by type — scan for gaps |
| [[_System_data]] | System notes missing status, created, or type |

### Per-Folder Data Bases

| File | Folder scope |
|------|-------------|
| [[_Inbox_Data]] | +Inbox |
| [[_Meta_Data]] | 00-Meta |
| [[_MOCs_Data]] | 01-MOCs |
| [[_Dots_Data]] | 02-Dots |
| [[_Atomics_Data]] | 02-Dots/100-Atomics |
| [[_People_Data]] | 02-Dots/300-People |
| [[_Efforts_Data]] | 03-Efforts |
| [[_Sources_Data]] | 04-Sources |
| [[_Meetings_Data]] | 04-Sources/440-Meetings |
| [[_Calendar_Data]] | 05-Calendar |
| [[_Daily_Data]] | 05-Calendar/Daily |
| [[_Archive_Data]] | 06-Archive |
| [[_Prompt_Data]] | 07-Prompts |

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
```

**Step 3: Update frontmatter `modified` date**

In the frontmatter, change:
```
modified: 2025-09-30
```
to:
```
modified: 2026-02-24
```

**Step 4: Commit**

```bash
git add 01-MOCs/Views.md
git commit -m "feat: rewrite Views.md as curated master index"
```

---

### Task 2: Verify in Obsidian

**Step 1: Open `01-MOCs/Views.md` in Obsidian**

Switch to Reading view. Confirm:
- All 4 sections render as tables
- Wikilinks are blue (not red/unresolved) for all entries that exist
- Note any red links — those are files that don't exist or have different names

**Step 2: Fix any broken wikilinks**

If a link is red, either:
- Correct the note name to match the actual file name
- Or remove the entry if the file genuinely doesn't exist

**Step 3: Commit fix if needed**

```bash
git add 01-MOCs/Views.md
git commit -m "fix: correct wikilink names in Views master index"
```
