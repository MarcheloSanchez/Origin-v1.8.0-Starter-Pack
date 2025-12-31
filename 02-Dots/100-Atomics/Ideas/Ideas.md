---
up:
  - "[[100-Atomics]]"
in:
  - "[[Views]]"
created: 2025-10-13
related:
cssclasses:
  - wide-page
obsidianUIMode: preview
---

⬆️:: [[100-Atomics]]

[[+About Ideasℹ️]]

[[Quick Idea Capture]]
[[Idea-New]]
### 📊 Bases view 
```base
filters:
  or:
    - file.folder == "02-Dots/100-Atomics/Ideas"
    - or:
        - file.tags == ["💡idea"]
views:
  - type: table
    name: All Ideas
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
    - file.folder == "02-Dots/100-Atomics/Ideas"
    - status != "✅completed"
    - status != "📦archived"
    - status == "🔄active"
views:
  - type: table
    name: Active Ideas
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