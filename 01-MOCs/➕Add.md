---
up: "[[🏡Home]]"
in:
  - "[[Views]]"
created: 2022-01-01
related:
  - "[[Relate]]"
  - "[[Communicate]]"
cssclasses:
  - wide-page
obsidianUIMode: preview
---

⬆️:: [[🏡Home]]

This **Add** note isn't just an inbox. It's a cooling pad 🧊.
Thoughts come in hot. But after a few days, they cool down.
When cooler thoughts prevail, you can better prioritize. Cool?

# TOP 10 
```base
views:
  - type: table
    name: ➕Add
    order:
      - file.name
      - file.folder
      - tags
      - file.ctime
      - file.mtime
    sort:
      - property: file.ctime
        direction: ASC
      - property: file.mtime
        direction: ASC
    limit: 10
    columnSize:
      file.name: 193
      note.tags: 301
      file.ctime: 153

```

> [!activity]- ## Added Stuff - dataview archive
> This view looks at the 10 newest notes in your **+** folder. As you process each note: add a link, add details, move them to the best folder, and delete everything that no longer sparks ✨.
>
> ```dataview
> TABLE WITHOUT ID
>  file.link as "",
>  (date(today) - file.cday).day as "Days alive"
>
> FROM "00 Inbox" 
>
> SORT file.cday desc
>
> LIMIT 10
> ```

---
