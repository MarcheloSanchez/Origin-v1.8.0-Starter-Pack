---
up: "[[99-System]]"
title: Quick Reference Card
type: documentation
created: 2026-02-27
modified: 2026-03-03
---

# Origin Vault — Quick Reference Card

## Page Header Buttons

These buttons appear at the top of every note:

| # | Button | Icon | What it does |
|---|--------|------|-------------|
| 1 | **Advance Status** | ➡️ circle | Change note lifecycle status (inbox → active → done → archived) |
| 2 | **Quick Tag** | 🏷️ tag | Insert a tag at cursor from the tag picker |
| 3 | **Archive Note** | 📦 archive | Move current note to the archive |
| 4 | **Focus Mode** | 👁️ eye | Toggle both sidebars for distraction-free writing |

## Left Ribbon Buttons

Always visible in the left sidebar:

| # | Button | Icon | What it does |
|---|--------|------|-------------|
| 1 | **Quick Idea** | 💡 lightbulb | Instantly capture a new idea to Inbox |
| 2 | **Daily Note** | 📅 calendar | Open today's daily note |
| 3 | **Process Inbox** | 📥 inbox | Batch-process all inbox notes |

## Essential Hotkeys

| Hotkey | Action |
|--------|--------|
| `Alt+Q` | Open QuickAdd menu (all actions) |
| `Alt+N` | Quick Idea (new inbox note) |
| `Alt+T` | Quick Tag (insert tag at cursor) |
| `Alt+S` | Advance Status |
| `Alt+A` | Archive Note |
| `Ctrl+Shift+D` | Open Daily Note |
| `Ctrl+Alt+F` | Focus Mode (toggle sidebars) |

## QuickAdd Menu Structure

Press `Alt+Q` to see 4 organized menus:

### 📝 Capture — Create content
- **New Inbox Note** — quick capture to Inbox
- **New Quick Idea** — idea capture to Inbox
- **New Note…** — submenu with all note types:
  - Atomic, Effort, Source, Meeting, MOC, Area, Prompt, People (Professional/Personal)
- **Extract Selection to Note** — turn selected text into a new note
- **Add Task to Daily** — append a task to today's daily note

### 🧩 Process — Work on current note
- **Process Note (Safe)** — one-click: Classify + Autofill + Normalize
- **Classify Note** — suggest type, folder, and tags
- **Autofill Metadata** — fill missing frontmatter fields
- **Normalize YAML** — fix values and reorder frontmatter
- **Lint YAML** — report-only check for YAML issues
- **Set Status** — pick a lifecycle status
- **Set Maturity** — pick a maturity stage (seed → evergreen)

### 🧹 Maintain — Vault-wide operations
- **Normalize YAML (Pick Folders)** — batch normalize with folder picker
- **Batch Process Inbox** — process all inbox notes at once
- **Archive Note** — move current note to archive
- **Rebuild Metrics Cache** — update vault metrics

### ⚙️ System — Settings and experiments
- **Toggle Focus Mode** — hide/show sidebars
- **Backroom (Experimental)** — sandbox utilities:
  - Insert Callout, Insert TOC, Add to Changelog
  - Quick Process variants (Atomic, Source, Effort)
  - Archive Old Dailies

## Beginner Workflow

> **Capture → Process → Tag → Review**

1. **Capture** with `Alt+N` — jot down your idea
2. **Process** with `Alt+Q` → 🧩 Process → Process Note (Safe)
3. **Tag** with `Alt+T` — add relevant tags
4. **Review** with `Ctrl+Shift+D` — check your daily note for tasks and captures
