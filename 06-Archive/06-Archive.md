---
exclude: "true"
---
⬆️:: [[🏡Home]]
[[+About Archiveℹ️]]
*Poslední aktualizace: `= date(now)`*

Select a archived note below to view
```dataview
LIST FROM "06-Archive"
WHERE file.name != this.file.name
SORT file.mtime DESC
LIMIT 50
```



