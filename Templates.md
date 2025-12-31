---
up: "[[🏡Home]]"
in:
  - "[[Views]]"
created: 2025-10-13
related:
cssclasses:
  - wide-page
obsidianUIMode: preview
---


[[+About Templatesℹ️]]
## Recent edited
```dataview
LIST
FROM "Templates"
WHERE file.mtime >= date(today) - dur(14 days)
SORT file.mtime DESC
LIMIT 10
```

## ALL
```dataview
LIST type
FROM "Templates"
SORT file.name ASC
```
