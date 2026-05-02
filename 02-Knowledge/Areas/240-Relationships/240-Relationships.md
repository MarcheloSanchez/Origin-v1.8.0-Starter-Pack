---
title: "240-Relationships"
up: ""[[Areas]]""
in:
  - "[[Views]]"
created: 2025-10-13
related:
  - ""[[Areas]]""
  - ""[[People]]""
cssclasses:
  - wide-page
obsidianUIMode: preview
modified: 2026-03-03
---
⬆️:: "[[Areas]]"

[[+About Areasℹ️]] - ADD Relationships? 
[[Area-New|Click here for template]] 

## Queries

```base
filters:
  and:
    - file.folder.contains("240-Relationships")
views:
  - type: table
    name: All Relationships Notes
    order:
      - file.name
      - status
      - type
      - file.tags
      - related
      - file.mtime

```