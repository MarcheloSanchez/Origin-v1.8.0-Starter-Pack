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

[[+About Thingsℹ️]]

### 📊 Bases view 
```base
filters:
  and:
    - file.folder == "02-Dots/100-Atomics/Things"
views:
  - type: table
    name: All Things
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
    - file.folder == "02-Dots/100-Atomics/Things"
    - status != "✅completed"
    - status != "📦archived"
views:
  - type: table
    name: Active Things
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