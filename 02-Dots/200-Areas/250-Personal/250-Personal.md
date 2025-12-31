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

[[+About Areasℹ️]] - ADD Personal? 
[[Area-New|Click here for template]] 

## Queries

```base
filters:
  and:
    - file.folder.contains("250-Personal")
views:
  - type: table
    name: All Personal Notes
    order:
      - file.name
      - status
      - type
      - file.tags
      - related
      - file.mtime

```