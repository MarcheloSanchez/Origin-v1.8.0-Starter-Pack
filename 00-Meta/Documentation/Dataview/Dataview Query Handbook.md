Tato příručka slouží jako centrální zdroj informací pro práci s dotazy v rámci PKM systému postaveného na Obsidianu. Zaměřujeme se na **Dataview plugin** jako klíčový nástroj pro dynamické výpisy a správu metadat. Cílem je vytvořit systém, který kombinuje flexibilitu s výkonem při práci s 10 000+ poznámkami.

> [!SUMMARY]+ Table of Contents
>    - [📚 Základy Dataview syntaxe](Dataview%20Query%20Handbook.md#📚%20Základy%20Dataview%20syntaxe)
>    - [Klíčové syntaktické elementy](Dataview%20Query%20Handbook.md#Klíčové%20syntaktické%20elementy)
>    - [Typy dotazů a jejich využití](Dataview%20Query%20Handbook.md#Typy%20dotazů%20a%20jejich%20využití)
>- [Syntax](Dataview%20Query%20Handbook.md#Syntax)
>        - [**Dataview Query Types**](Dataview%20Query%20Handbook.md#**Dataview%20Query%20Types**)
>        - [**Fields**](Dataview%20Query%20Handbook.md#**Fields**)
>        - [**Filters and Conditions**](Dataview%20Query%20Handbook.md#**Filters%20and%20Conditions**)
>        - [**Sorting**](Dataview%20Query%20Handbook.md#**Sorting**)
>        - [**Grouping**](Dataview%20Query%20Handbook.md#**Grouping**)
>        - [**Formatting and Aggregations**](Dataview%20Query%20Handbook.md#**Formatting%20and%20Aggregations**)
>        - [**Date Functions**](Dataview%20Query%20Handbook.md#**Date%20Functions**)
>        - [**Operators**](Dataview%20Query%20Handbook.md#**Operators**)
>        - [**Dynamic Values**](Dataview%20Query%20Handbook.md#**Dynamic%20Values**)
>        - [**Tags and Metadata**](Dataview%20Query%20Handbook.md#**Tags%20and%20Metadata**)
>        - [Front-matter](Dataview%20Query%20Handbook.md#Front-matter)
>        - [Data commands](Dataview%20Query%20Handbook.md#Data%20commands)
>        - [FROM](Dataview%20Query%20Handbook.md#FROM)
>        - [WHERE](Dataview%20Query%20Handbook.md#WHERE)
>- [🔧 Řešení běžných problémů](Dataview%20Query%20Handbook.md#🔧%20Řešení%20běžných%20problémů)
>    - [Debug workflow pro prázdné výsledky](Dataview%20Query%20Handbook.md#Debug%20workflow%20pro%20prázdné%20výsledky)
>- [🚀 Pokročilé techniky pro váš PKM systém](Dataview%20Query%20Handbook.md#🚀%20Pokročilé%20techniky%20pro%20váš%20PKM%20systém)
>    - [Automatizovaný denní dashboard](Dataview%20Query%20Handbook.md#Automatizovaný%20denní%20dashboard)
>    - [Výkonnostní metriky pro PKM systém](Dataview%20Query%20Handbook.md#Výkonnostní%20metriky%20pro%20PKM%20systém)
>    - [Sledování životního cyklu poznámek](Dataview%20Query%20Handbook.md#Sledování%20životního%20cyklu%20poznámek)
>    - [Auto Note Mover integrace](Dataview%20Query%20Handbook.md#Auto%20Note%20Mover%20integrace)
>    - [Weekly Review dashboard](Dataview%20Query%20Handbook.md#Weekly%20Review%20dashboard)
>    - [Maintenance checklist](Dataview%20Query%20Handbook.md#Maintenance%20checklist)
>    - [🔄 Integrace s vaším tagovacím systémem](Dataview%20Query%20Handbook.md#🔄%20Integrace%20s%20vaším%20tagovacím%20systémem)
>        - [Status workflow queries](Dataview%20Query%20Handbook.md#Status%20workflow%20queries)
>        - [Priority matrix](Dataview%20Query%20Handbook.md#Priority%20matrix)
>- [🎯 DataviewJS](Dataview%20Query%20Handbook.md#🎯%20DataviewJS)
>    - [📊 Optimalizace výkonu dotazů](Dataview%20Query%20Handbook.md#📊%20Optimalizace%20výkonu%20dotazů)
>        - [Indexování a cacheování](Dataview%20Query%20Handbook.md#Indexování%20a%20cacheování)
>        - [Návrhové vzory pro dotazy](Dataview%20Query%20Handbook.md#Návrhové%20vzory%20pro%20dotazy)
>        - [Performance tipy](Dataview%20Query%20Handbook.md#Performance%20tipy)
>    - [📝 Best Practices a doporučení](Dataview%20Query%20Handbook.md#📝%20Best%20Practices%20a%20doporučení)
>    - [Návrhové vzory pro udržitelnost](Dataview%20Query%20Handbook.md#Návrhové%20vzory%20pro%20udržitelnost)
>    - [🔗 Užitečné odkazy a zdroje](Dataview%20Query%20Handbook.md#🔗%20Užitečné%20odkazy%20a%20zdroje)
## 📚 Základy Dataview syntaxe

```
```dataview```
```

```
LIST field1  / TABLE field1, field2, field3
FROM //source""/#
WHERE //if condition
FLATTEN field AS F //Metadata manipulation
WHERE //if condition the flattened array
GROUP BY //Grouping
SORT //Sorting
```

At a high level, a query conforms to the following pattern:
``` 
<QUERY-TYPE> <fields> 
FROM <source> 
<DATA-COMMAND> <expression> 
<DATA-COMMAND> <expression> 
... 
```

## Klíčové syntaktické elementy
- **FROM**: Určuje zdroj dat (`"složka"`, `#tag`, `[[poznámka]]`)
- **WHERE**: Filtruje výsledky podle podmínek
- **SORT**: Řadí výsledky (ASC/DESC)
- **GROUP BY**: Seskupuje podle kritérií
- **LIMIT**: Omezuje počet výsledků
## Typy dotazů a jejich využití
Tento základní příklad demonstruje **strukturovaný přístup** s explicitním určením sloupců a filtrací podle statusu[13](https://blacksmithgu.github.io/obsidian-dataview/queries/query-types/). Pro různé use cases používáme:
1. **LIST** - jednoduchý výpis odkazů
2. **TABLE** - tabulkové zobrazení s vlastními sloupci
3. **TASK** - správa úkolů a GTD workflow
4. **CALENDAR** - temporální zobrazení událostí

```
LIST
FROM "00 Inbox"
WHERE status = "📥inbox"
SORT created DESC
LIMIT 5
```
	
```
TABLE WITHOUT ID
  file.link as "Projekt",
  status as "Stav", 
  priority as "Priorita"
FROM "03 Efforts"
WHERE status = "🔄active"
SORT priority DESC
```
	
```
TASK
FROM "02 Dots"
WHERE !completed AND priority = "high"
GROUP BY file.folder
```

```
CALENDAR
coooo?
```

# Syntax
### **Dataview Query Types**

- `list`
- `table`
- `task`
- `calendar`
---
### **Fields**

- `file.name`
- `file.path`
- `file.link`
- `file.folder`
- `file.cday`
- `file.mday`
- `file.etag`
- `file.tasks`
- `file.size`
- `file.ext`
- `file.tags`
---
### **Filters and Conditions**

- `from`
- `where`
- `contains`
- `regexmatch`
- `startswith`
- `endswith`
- `!contains`
- `!regexmatch`
- `and`
- `or`
- `not`
- `in`
---
### **Sorting**
- `sort`
- `asc`
- `desc`
**Example**
sort file.name asc

---
### **Grouping**
- `group by`
---
### **Formatting and Aggregations**
- `limit`
- `flatten`
- `map`
- `reduce`
- `length`
- `sum`
- `count`
- `average`
- `min`
- `max`
- `join`
- `filter`
---
### **Date Functions**
- `date(today)`
- `date(tomorrow)`
- `date(yesterday)`
- `date(now)`
- `date(week)`
- `date(month)`
- `date(year)`
- `dateadd`
- `datefrom`
- `dateto`
---
### **Operators**
- =
- `!=`
- `<`
- `>`
- `<=`
- `>=`
---
### **Dynamic Values**
- `rows`
- `this.file`
- `this.file.link`
- `this.file.tags`
---
### **Tags and Metadata**
- `tags`
- `metadata`


### Front-matter
[Frontmatter Overview - Dataview Example Vault](https://s-blu.github.io/obsidian_dataview_example_vault/20%20Dataview%20Queries/Frontmatter%20Overview/)

### Data commands
[Data Commands - Dataview](https://blacksmithgu.github.io/obsidian-dataview/queries/data-commands/)

### FROM
---
- **Tags**: To select from a tag (and all its subtags), use `FROM #tag`.
- **Folders**: To select from a folder (and all its subfolders), use `FROM "folder"`.
- **Single Files**: To select from a single file, use `FROM "path/to/file"`.
- **Links**: You can either select links TO a file, or all links FROM a file.
- To obtain all pages which link TO `[[note]]`, use `FROM [[note]]`.
- To obtain all pages which link FROM `[[note]]` (i.e., all the links in that file), use `FROM outgoing([[note]])`.
### WHERE
---
Filter pages that evaluates to *true*.
```
WHERE <clause>
```

1. Obtain all files which were modified in the last 24 hours:
    
    `LIST WHERE file.mtime >= date(today) - dur(1 day)`
    
2. Find all projects which are not marked complete and are more than a month old:
    
    `LIST FROM #projects WHERE !completed AND file.ctime <= date(today) - dur(1 month)`

3. **Using `WHERE` Clauses**: You can use the `WHERE` clause to filter out notes based on certain conditions. For example, you can exclude notes that contain specific tags or keywords.
    
4. **`!contains` Function**: Use the `!contains` function to exclude notes that contain certain elements. For instance, `!contains(file.tags, "#tag")` would exclude notes with the specified tag.
    
5. **`NOT` Operator**: The `NOT` operator can be used to negate conditions. For example, `WHERE NOT file.name = "Example"` would exclude notes with the name "Example".
    
6. **Combining Conditions**: You can combine multiple conditions using logical operators like `AND` and `OR` to refine your exclusions. For example, `WHERE !contains(file.tags, "#tag1") AND !contains(file.tags, "#tag2")`.
    
7. **Excluding by Path**: You can exclude notes from specific folders or paths using conditions like `WHERE !contains(file.path, "FolderName")`.

---

# 🔧 Řešení běžných problémů

1. **Nesprávné cesty k složkám**
```
// ❌ Chybně - mezera vs pomlčka
FROM "02 Dots"
// ✅ Správně podle vaší struktury  
FROM "02-Dots"
```
2. **Chybějící uvozovky u emoji tagů**
```
// ❌ Chybně
WHERE status = #🔄active
// ✅ Správně
WHERE contains(tags, "#🔄active")
```
3. **Neexistující metadata pole**
```
// Debug query pro kontrolu dostupných polí
TABLE file.name, tags, status, priority
FROM ""
WHERE file.name = "test-note"
```

- **Nekonzistentní cesty k složkám**: `FROM "02 Dots"` vs `FROM "02-Dots"`
	
- **Chybějící uvozovky u tagů**: `#🔄active` místo `"#🔄active"`
	
- **Neexistující metadata**: ověřte pomocí `LIST WITHOUT ID file.name, missing_field FROM "" WHERE missing_field = null`

## Debug workflow pro prázdné výsledky

Když query nevrací očekávané výsledky, použijte postupnou diagnostiku:
```
// Krok 1: Základní test existence
LIST FROM "03-Efforts"
```

```
// Krok 2: Kontrola tagů
TABLE tags FROM "03-Efforts" WHERE tags
```

```
// Krok 3: Specifický tag test
LIST FROM #active OR FROM #🔄active
```

# 🚀 Pokročilé techniky pro váš PKM systém

## Automatizovaný denní dashboard

```dataviewjs-NOTWORKING
dv.header(2, `📊 Denní přehled - ${moment().format('DD.MM.YYYY')}`);

// Vysoké priority napříč všemi složkami
const highPriority = dv.pages()
  .where(p => p.priority === "high" && p.status !== "📦archived")
  .sort(p => p.created, 'desc');

if (highPriority.length > 0) {
  dv.header(3, "🎯 Vysoká priorita");
  dv.table(["Poznámka", "Složka", "Status"], 
    highPriority.map(p => [p.file.link, p.file.folder, p.status]));
}

// Nové položky v Inboxu za posledních 24h
const newInbox = dv.pages('"00 Inbox"')
  .where(p => p.created >= dv.date("today"));

if (newInbox.length > 0) {
  dv.header(3, "📥 Nové v Inboxu");
  dv.list(newInbox.map(p => p.file.link));
}
```

## Výkonnostní metriky pro PKM systém

```
TABLE WITHOUT ID
  choice(folder = "00 Inbox", "📥 Neroztříděné", 
    choice(folder = "03 Efforts", "🚀 Aktivní projekty",
      choice(folder = "02 Dots", "💡 Nápady", "📊 Ostatní"))) as "Kategorie",
  length(rows) as "Počet"
FROM ""
WHERE folder != "06 Archive"
GROUP BY file.folder
SORT length(rows) DESC
```

## Sledování životního cyklu poznámek

```
TABLE 
  file.link as "Poznámka",
  choice(status = "📥inbox", "🔴 Nezpracováno",
    choice(status = "🔄active", "🟡 V práci", 
      choice(status = "✅completed", "🟢 Hotovo", "⚪ Neurčeno"))) as "Status",
  round((date(today) - created).days, 0) as "Stáří (dny)"
FROM ""
WHERE status != "📦archived"
SORT created ASC
```

## Auto Note Mover integrace

_Identifikuje poznámky připravené k automatickému přesunu_

```
TABLE file.name as "Poznámka", tags as "Tagy", "→ Doporučená složka" as "Akce"
FROM "+Inbox"
WHERE contains(tags, "#💡atomic") OR contains(tags, "#🚀effort") OR contains(tags, "#📚source")
```

## Weekly Review dashboard

```
TABLE WITHOUT ID
  "📋 " + file.link as "Týdenní úkoly",
  choice(completed, "✅", "⏳") as "Status"
FROM ""
WHERE contains(tags, "#weekly-review")
SORT completed ASC, created DESC
```

## Maintenance checklist

```
TASK
FROM "99-System"
WHERE contains(text, "maintenance") OR contains(text, "cleanup")
GROUP BY file.link
```

## 🔄 Integrace s vaším tagovacím systémem

### Status workflow queries
```
TABLE 
  length(rows.file.link) as "Počet"
FROM ""
WHERE status
GROUP BY status
SORT length(rows) DESC
```

### Priority matrix
```
TABLE WITHOUT ID
  file.link as "Úkol",
  priority as "Priorita",
  choice(contains(tags, "#energy/high"), "⚡", "🔋") as "Energie"
FROM ""
WHERE priority AND status = "🔄active"
SORT priority DESC, file.name ASC
```

# 🎯 DataviewJS
```dataviewjs
// Výpočet produktivity na základě vašich metrik
function calculateProductivity(pages) {
    const totalNotes = pages.length;
    const processedNotes = pages.filter(p => p.status !== "📥inbox").length;
    const linkedNotes = pages.filter(p => p.file.inlinks.length > 0).length;
    
    return {
        processing_rate: Math.round((processedNotes / totalNotes) * 100),
        link_density: Math.round((linkedNotes / totalNotes) * 100)
    };
}

const stats = calculateProductivity(dv.pages());
dv.paragraph(`📊 **Produktivita**: ${stats.processing_rate}% zpracováno, ${stats.link_density}% propojeno`);
```

## 📊 Optimalizace výkonu dotazů

| Velikost vaultu | Doporučená strategie   | Příklad implementace      |
| --------------- | ---------------------- | ------------------------- |
| <1,000 poznámek | Přímé dotazy           | `FROM ""`                 |
| 1,000-10,000    | Folder-based filtering | `FROM "02-Dots"`          |
| >10,000         | Kombinace + LIMIT      | `FROM "02-Dots" LIMIT 50` |

### Indexování a cacheování
- **Omezení rozsahu dotazů**: `FROM "02-Dots/Concepts"` místo globálního `FROM ""`
- **Časové filtry**: `WHERE created >= date(today) - dur(7 days)`
- **Dávkové zpracování**: rozdělte komplexní dotazy na menší části
### Návrhové vzory pro dotazy
1. **Minimalistický přístup**: Používejte pouze nezbytná metadata
2. **Version control**: `schema_version: 2.1.0` v YAML hlavičkách
3. **Dokumentace dotazů**: Komentáře přímo v kódu pomocí `<!-- Comment -->`
### Performance tipy
1. **Používejte specifické FROM cesty** místo globálního `""`
2. **Implementujte časové filtry** pro redukci zpracovávaných dat
3. **Kombinujte s LIMIT** při testování komplexních dotazů
4. **Cachujte výsledky** pomocí MOC poznámek
## 📝 Best Practices a doporučení
## Návrhové vzory pro udržitelnost
1. **Používejte konzistentní naming conventions** pro metadata
2. **Dokumentujte složité dotazy** pomocí komentářů
3. **Testujte na malých datasetech** před nasazením
4. **Implementujte error handling** pro chybějící pole
---
## 🔗 Užitečné odkazy a zdroje
- **Oficiální dokumentace**: [Dataview Documentation](https://blacksmithgu.github.io/obsidian-dataview/)
- **Community příklady**: [Obsidian Example Vault](https://s-blu.github.io/obsidian_dataview_example_vault/)
- **Forum diskuse**: [Obsidian Forum - Dataview](https://forum.obsidian.md/tag/dataview)

⬆️:: [[🏡Home]]