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

[[+About Knowledgeℹ️]]

- [[Articles]]
- [[Books]]
- [[Courses]]
- [[440-Meetings]]]]
## Queries

```base
filters:
  and:
    - file.folder.contains("410-Knowledge")
views:
  - type: table
    name: All Knowledge Notes
    order:
      - file.name
      - status
      - type
      - file.tags
      - related
      - file.mtime

```

