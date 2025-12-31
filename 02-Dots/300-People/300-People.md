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

[[+About Peopleℹ️]]

[[people-new-auto|👉Click here for template👈]]
[[👤 Person BIO Template]]
[[👤 Person Professional Template]]
## Queries

```base
filters:
  and:
    - file.folder.contains("300-People")
views:
  - type: table
    name: All People
    order:
      - file.name
      - status
      - type
      - file.tags
      - related
      - file.mtime
```

