---
up: "[[04-Sources]]"
in:
  - "[[Views]]"
created: 2025-10-13
related:
cssclasses:
  - wide-page
obsidianUIMode: preview
---
⬆️:: [[04-Sources]]

[[+About Guidesℹ️]]

## Queries

```base
filters:
  and:
    - file.folder.contains("430-Guides")
views:
  - type: table
    name: All Guides
    order:
      - file.name
      - status
      - type
      - file.tags
      - related
      - file.mtime

```

