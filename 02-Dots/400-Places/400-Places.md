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

[[+About Placesℹ️]]
[[Templates/New-Notes/Type/Place/place-new|👉Click here for template👈]]

## Queries

```base
filters:
  and:
    - file.folder.contains("400-Places")
views:
  - type: table
    name: All Places
    order:
      - file.name
      - status
      - type
      - file.tags
      - related
      - file.mtime

```
