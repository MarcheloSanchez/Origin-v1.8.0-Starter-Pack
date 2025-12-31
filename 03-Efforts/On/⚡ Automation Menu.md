---
title: 
type: 
tags: 
  - 🚀project
status: 
priority: 
action_required: 
created: "2025-08-20"
modified: 
deadline: 
completion_percentage: 
next_actions: 
related: 
recurrence: 
time_required: 
---
# Action MENU
## Capture

```button
name New Inbox
type command
action QuickAdd: Quick Inbox
```

```button
name New Effort 
type command
action QuickAdd: Atomic 
```

```button
name New Effort 
type command
action QuickAdd: Effort 
```

```button
name New Meeting
type command
action QuickAdd: Meeting
```

```button
name New Source
type command
action QuickAdd: Source 
```

```button
name Daily Note
type command
action Periodic notes: Open daily note
```

```button
name New Idea
type command
action QuickAdd: New Idea
```

```button
name New Area
type command
action QuickAdd: Area
```

```button
name New Area
type command
action QuickAdd: Area
```

# Menu
Here’s what the **Menu.md** gives you at a glance:

- **Capture** — One-tap inputs to your system: quick task/idea/meeting forms, “clip URL from clipboard,” and “send to Inbox/Daily” actions (via QuickAdd).
- **Create** — Buttons that generate fully-scaffolded notes from templates: Daily, Dot (atomic), Effort (project), Source, Meeting (Templater/QuickAdd).
- **Review** — Open your Daily/Weekly review notes, refresh Dataview, surface project boards, and jump to “stale/orphan” clean-ups.
- **Utilities** — Handy helpers for any note: insert or re-apply templates, normalize YAML, rebuild MOC indexes, open QuickAdd menu, command palette.
- **Admin** — Shortcuts to plugin settings (Templater/QuickAdd), reveal the System folder, toggle reading/editing, and run maintenance scripts.

- [MOC] Home (Start Here Navigation Hub)
- [Folder] +Inbox (Quick Capture Dropzone)
- [Folder] 01-MOCs (Maps And Dashboards)
- [Folder] 02-Dots (Atomic Knowledge Notes)
- [Folder] 03-Efforts (Projects And Initiatives)
- [Folder] 04-Sources (References And Materials)
- [Folder] 05-Calendar (Daily Weekly Monthly Logs)
- [Folder] 06-Archive (Completed Cold Storage)
- [Folder] 99-System (Templates Scripts Automation)
- [Folder] 99-System/Templates (Reusable Note Templates)
- [Folder] 99-System/Templater (Scripts And Config)
- [Folder] 99-System/Scripts (Maintenance Dataview Tasks)
- [Template] Daily-Note (ISO Date YAML Autofill)
- [Template] Effort (Project Fields And Status)
- [Macro] QuickAdd — Capture Inbox (Fast Idea Task Capture)
- [Script] Templater — YAML Auto-Fill (Created Modified Author)
## Review

```
name Dashboard
type command
action QuickAdd: Weekly Review
```

## Utilities

```
name Insert Timestamp
type command
action Templater: Run user script
```

```
name Refresh Dataview
type command
action Dataview: Force refresh views
```

```task-entry
- [ ] {{VALUE:task}} ⏱️ {{VALUE:energy}} @{{VALUE:context}} {{VALUE:priority}}
  ^created:: {{DATE:YYYY-MM-DD}}
```
# new 

### 🔗 Meta Bind tlačítka

```
style: primary
label: 🔄 Obnovit přehledy
action: 
  type: command
  command: "dataview:refresh-views"
```

```
style: destructive
label: 🚨 Pouze urgentní
action: 
  type: templater
  template: "Templates/Urgent Only View"
```

```
style: primary
label: 📊 Týdenní report
action: 
  type: templater
  template: "Templates/Weekly Review"
```


**Variables (form):**

- `task` (text)
- `energy` (select: low, medium, high)
- `context` (select: work, home, out, deep)
- `priority` (select: ⬜, 🔵, 🟠, 🔴)

# Ideas 
**QuickAdd:** “Promote to Active” → set `status: 🔄active`, stamp `last_reviewed` to today, recompute `next_review`.
QuickAdd: “Snooze Review (+7d)” → add 7 to next_review without changing last_reviewed.
**Templater:** “Review Done” button → update `last_reviewed` = today and `next_review` = `last_reviewed + review_interval`.
Add action buttons (via [Buttons plugin](https://github.com/shabegom/buttons)) to:Inbox Triage Panel
- Move
- Update metadata
- Link to MOCs
- Auto-status updates

## related
[[Guide — YAML Orchestrator]]

## Template

```
```button
name New Title
type command
action QuickAdd: Title
```
```