---
up: "[[200-Areas]]"
in:
  - "[[Views]]"
created: 2025-10-13
related:
cssclasses:
  - wide-page
obsidianUIMode: preview
---
⬆️:: [[200-Areas]]

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