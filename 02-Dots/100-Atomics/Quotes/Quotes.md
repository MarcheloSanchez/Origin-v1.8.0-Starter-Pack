---
up: "[[100-Atomics]]"
in:
  - "[[Views]]"
created: 2025-10-13
related:
cssclasses:
  - wide-page
obsidianUIMode: preview
---
⬆️:: [[100-Atomics]]

-#🌱develop - from experience will see
[[+About Quotesℹ️]]

### 📊 Bases view 
- Maybe via tag as in LYT 
```base
filters:
  and:
    - file.folder == "02-Dots/100-Atomics/Quotes"
views:
  - type: table
    name: All Quotes
    order:
      - file.name
      - file.tags
      - status
      - maturity
      - type
      - modified
      - in
      - file.mtime
    sort:
      - property: file.mtime
        direction: ASC

```
