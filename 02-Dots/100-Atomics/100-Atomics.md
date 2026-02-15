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

[[+About Atomicsℹ️]]

[[Templates/Static/atomic|Click here for template]]
[[atomic-meta.yaml|Click here for metadata]]
## Sub-Categories
[[Concepts]]
[[Ideas]]
[[Quotes]]
[[Statements]]
[[Things]]

# Queries

```base
filters:
  and:
    - type == "atomic"
    - or:
        - status == "🔄active"
        - status == "⏳waiting"
formulas:
  stage: maturity
properties:
  title:
    displayName: Atomic
  stage:
    displayName: Maturity
  tags:
    displayName: Tags
  related:
    displayName: Related
  file.mtime:
    displayName: Modified
views:
  - type: cards
    name: Atomics — Cards
    order:
      - file.name
    limit: 100
  - type: table
    name: Atomics — Table
    order:
      - maturity
      - file.mtime
      - file.basename

```

### tagged


```base
filters:
  or:
    - type == "atomic"
    - and:
        - file.tags.contains("💡atomic")
formulas:
  stage: maturity
properties:
  title:
    displayName: Atomic
  stage:
    displayName: Maturity
  tags:
    displayName: Tags
  related:
    displayName: Related
  file.mtime:
    displayName: Modified
views:
  - type: cards
    name: Atomics — Cards
    order:
      - file.name
    limit: 100
  - type: table
    name: Atomics — Table
    order:
      - maturity
      - file.mtime
      - file.basename

```