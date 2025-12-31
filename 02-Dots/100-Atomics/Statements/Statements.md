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
#🌱develop 
[[+About Statementsℹ️]]

### 📊 Bases view 
```base
filters:
  and:
    - file.folder == "02-Dots/100-Atomics/Statements"
views:
  - type: table
    name: All Statements
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

```base
filters:
  and:
    - file.folder == "02-Dots/100-Atomics/Statements"
    - status != "✅completed"
    - status != "📦archived"
views:
  - type: table
    name: Active Statements
    order:
      - file.name
      - status
      - maturity
      - file.tags
      - file.mtime
    sort:
      - property: file.mtime
        direction: DESC

```