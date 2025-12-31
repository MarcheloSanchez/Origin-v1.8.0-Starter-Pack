---
up: "[[🏡Home]]"
in:
  - "[[Views]]"
related:
  - "[[Relate]]"
  - "[[Communicate]]"
  - "[[🧹Cleaning Lady]]"
  - "[[🌱Incubator]]"
cssclasses:
  - wide-page
obsidianUIMode: preview
---

⬆️:: [[🏡Home]]

*Choose maturity stage* 📤 → 🌱 → 🪴 → 🌲 →  🍓

```base
filters:
  and:
    - "!maturity.isEmpty()"
views:
  - type: table
    name: All Maturity
    order:
      - file.name
      - file.folder
      - tags
      - file.ctime
      - file.mtime
    sort:
      - property: tags
        direction: ASC
    limit: 10
    columnSize:
      file.name: 193
      note.tags: 436
      file.ctime: 153
  - type: table
    name: 📤Seed Maturity
    filters:
      and:
        - maturity == "📤seed"
    order:
      - file.name
      - file.folder
      - tags
      - file.ctime
      - file.mtime
    sort:
      - property: tags
        direction: ASC
    limit: 10
    columnSize:
      file.name: 193
      note.tags: 436
      file.ctime: 153
  - type: table
    name: 🌱Seedling
    filters:
      and:
        - maturity == "🌱seedling"
    order:
      - file.name
      - file.folder
      - tags
      - file.ctime
      - file.mtime
    sort:
      - property: tags
        direction: ASC
    limit: 10
    columnSize:
      file.name: 193
      note.tags: 436
      file.ctime: 153
  - type: table
    name: 🪴Sapling
    filters:
      and:
        - maturity == "🪴sapling"
    order:
      - file.name
      - file.folder
      - tags
      - file.ctime
      - file.mtime
    sort:
      - property: tags
        direction: ASC
    limit: 10
    columnSize:
      file.name: 193
      note.tags: 436
      file.ctime: 153
  - type: table
    name: 🌲Evergreen
    filters:
      and:
        - maturity == "🌲evergreen"
    order:
      - file.name
      - file.folder
      - tags
      - file.ctime
      - file.mtime
    sort:
      - property: tags
        direction: ASC
    limit: 10
    columnSize:
      file.name: 193
      note.tags: 436
      file.ctime: 153
  - type: table
    name: 🍓Fruit
    filters:
      and:
        - maturity == "🍓fruit"
    order:
      - file.name
      - file.folder
      - tags
      - file.ctime
      - file.mtime
    sort:
      - property: tags
        direction: ASC
    limit: 10
    columnSize:
      file.name: 193
      note.tags: 436
      file.ctime: 153

```

# RELATED
[[🧹Cleaning Lady]]
[[Relate]]

