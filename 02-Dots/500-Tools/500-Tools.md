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

[[+About Toolsℹ️]]

[[Tool-New|Click here for template]]
## Queries

```base
filters:
  and:
    - file.folder.contains("500-Tools")
views:
  - type: table
    name: All Tools
    order:
      - file.name
      - status
      - type
      - file.tags
      - related
      - file.mtime
```


