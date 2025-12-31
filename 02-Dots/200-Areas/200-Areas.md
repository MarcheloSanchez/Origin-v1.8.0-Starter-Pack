---
up: "[[02-Dots]]"
in:
  - "[[Views]]"
created: 2025-10-13
related:
cssclasses:
  - wide-page
obsidianUIMode: preview
---
⬆️:: [[02-Dots]]

[[+About Areasℹ️]]
[[Area-New|Click here for template]]
```button
name New Area
type command
action QuickAdd: Area
```
## Queries

```base
filters:
  and:
    - file.folder.contains("200-Areas")
views:
  - type: table
    name: All Areas
    order:
      - file.name
      - status
      - type
      - file.tags
      - related
      - file.mtime

```

