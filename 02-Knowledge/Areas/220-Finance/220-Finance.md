---
title: "220-Finance"
up: ""[[Areas]]""
in:
  - "[[Views]]"
created: 2025-10-13
related:
  - ""[[Areas]]""
  - "[[230-Career]]"
cssclasses:
  - wide-page
obsidianUIMode: preview
modified: 2026-03-03
---
⬆️:: "[[Areas]]"

[[+About Areasℹ️]] - ADD Finance? 
[[Area-New|Click here for template]] 

## Queries

```base
filters:
  and:
    - file.folder.contains("220-Finance")
views:
  - type: table
    name: All FinanceNotes
    order:
      - file.name
      - status
      - type
      - file.tags
      - related
      - file.mtime

```