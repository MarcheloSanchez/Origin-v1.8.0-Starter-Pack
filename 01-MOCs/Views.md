---
up: "[[🏡Home]]"
in:
  - "[[Views]]"
title: Overview of all views 
type: moc
tags:
  - ⚙️system
  - 🗺️MOC
status: 🔄active
created: 2025-09-30
modified: 2025-09-30
related:
  - "[[🔍My PKM Queries]]"
  - "[[🔁My PKM Workflows]]"
  - "[[Maps]]"
---

⬆️:: [[🏡Home]]

This note is about linking *every note type* that contains query & Sorted by most links.

```base
filters:
  and:
    - file.links.contains(link("Views"))
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