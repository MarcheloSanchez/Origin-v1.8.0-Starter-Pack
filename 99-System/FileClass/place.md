---
title: "place"
limit: 20
mapWithTag: true
icon: map-pin
tagNames:
  - 📍place
filesPaths:
  - 02-Dots/400-Places
bookmarksGroups:
excludes:
extends: Base
savedViews: []
favoriteView:
fieldsOrder:
  - pLc1st
  - pLc2rg
  - pLc3lr
  - pLc4rf
version: "2.1"
fields:
  - name: place_status
    type: Cycle
    options:
      sourceType: ValuesList
      valuesList:
        "1": wishlist
        "2": visited
        "3": active
        "4": archived
      allowNull: true
    path: ""
    id: pLc1st
  - name: region
    type: Input
    options: {}
    path: ""
    id: pLc2rg
  - name: last_review
    type: Date
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: false
      linkPath: ""
    path: ""
    id: pLc3lr
  - name: review_frequency
    type: Input
    options: {}
    path: ""
    id: pLc4rf
modified: 2026-03-16
---
