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

[[+About Areasℹ️]] - ADD HEALTH? 
[[Area-New|Click here for template]] 

## Queries

```base
filters:
  and:
    - file.folder.contains("210-Health")
views:
  - type: table
    name: All Health Notes
    order:
      - file.name
      - status
      - type
      - file.tags
      - related
      - file.mtime

```