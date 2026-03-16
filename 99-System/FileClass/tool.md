---
title: "tool"
limit: 20
mapWithTag: true
icon: wrench
tagNames:
  - 🧰tool
filesPaths:
  - 02-Dots/500-Tools
bookmarksGroups:
excludes:
extends: Base
savedViews: []
favoriteView:
fieldsOrder:
  - tLc1st
  - tLc2lr
  - tLc3rf
version: "2.1"
fields:
  - name: tool_status
    type: Cycle
    options:
      sourceType: ValuesList
      valuesList:
        "1": evaluating
        "2": active
        "3": retired
      allowNull: true
    path: ""
    id: tLc1st
  - name: last_review
    type: Date
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: false
      linkPath: ""
    path: ""
    id: tLc2lr
  - name: review_frequency
    type: Input
    options: {}
    path: ""
    id: tLc3rf
modified: 2026-03-16
---
