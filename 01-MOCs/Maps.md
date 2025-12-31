---
up: "[[01-MOCs]]"
in:
  - "[[Views]]"
title: 🗺️Overview of Maps
type: system
tags:
  - ⚙️system
  - 🗺️MOC
status: 🔄active
created: 2025-09-30
modified: 2025-09-30
---

⬆️:: [[🏡Home]]

This note is about linking every MOC in this vault. Via Folder or tag `🗺️MOC`

```base
filters:
  or:
    - file.folder == "01-MOCs"
    - and:
        - file.tags == ["🗺️MOC"]
formulas:
  Count links): file.links.length
properties:
  formula.Count links):
    displayName: Count links
views:
  - type: table
    name: All Views
    order:
      - file.name
      - formula.Count links)
    sort:
      - property: formula.Count links)
        direction: DESC

```