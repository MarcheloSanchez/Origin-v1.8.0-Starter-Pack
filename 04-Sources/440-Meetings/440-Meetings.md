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

[[+About Meetingsℹ️]]
[[MTG-Full-Template]]

## Queries

```base
filters:
  and:
    - file.folder.contains("440-Meetings")
views:
  - type: table
    name: All Meetings
    order:
      - file.name
      - status
      - type
      - file.tags
      - related
      - file.mtime

```