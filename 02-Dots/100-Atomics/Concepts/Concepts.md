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

[[+About Conceptsℹ️]]

### 📊 Bases view 
```base
filters:
  and:
    - file.folder == "02-Dots/100-Atomics/Concepts"
views:
  - type: table
    name: All Concepts
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
    - file.folder == "02-Dots/100-Atomics/Concepts"
    - status != "✅completed"
    - status != "📦archived"
views:
  - type: table
    name: Active Concepts
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