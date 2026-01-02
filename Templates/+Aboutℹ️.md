---
up: "[[01-MOCs]]"
in:
  - "[[Views]]"
title: 🗺️Overview of Abouts
type: moc
tags:
  - ⚙️system
  - 🗺️MOC
  - 📋about
status: 🔄active
created: 2025-09-30
modified: 2025-09-30
---

⬆️:: [[01-MOCs]]

# List to All all others
```dataview
TABLE
FROM ""
WHERE contains(file.name, "+About") AND  file.name != this.file.name
```

> [!INFO]- Bases view click here
> 
> ```base
> filters:
>   and:
>     - file.name.contains("+About")
> views:
>   - type: table
>     name: Table
> 
> ```
> 
> 