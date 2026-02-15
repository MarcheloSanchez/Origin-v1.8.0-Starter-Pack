
## Klíčové principy pro efektivní použití

**Oddělení logiky od obsahu:**

- Vždy použij `<procento*` pro čistou logiku
- Proměnné definuj na začátku
- Podmínky strukturuj čitelně

**Opětovná použitelnost:**

- Vytvárej utility funkce v externích skriptech
- Používej konzistentní naming konvence
- Dokumentuj složitější logiku

**Performance:**

- Minimalizuj async operace v loopech
- Cachuj výsledky náročných operací
- Používej lazy evaluation kde možno
## Práce se soubory a metadaty

**Základní file operace:**
```
tp.file.title                    // název souboru
tp.file.content                  // obsah souboru
tp.file.creation_date("YYYY-MM-DD")  // datum vytvoření
tp.file.last_modified_date()     // datum úpravy
tp.file.size                     // velikost souboru
```

**Přesun a přejmenování souborů**
```
await tp.file.move("/03-Projects/" + tp.file.title)
await tp.file.rename("Nový název")
await tp.file.create_new(obsah, cesta)
```

**Práce s obsahem:**

```
tp.file.selection()              // vybraný text
tp.file.cursor_append(text)      // přidat na pozici kurzoru
await tp.file.include("[[Šablona]]")  // vložit jinou šablonu
```
## Uživatelská interakce

**Prompty a inputy:**

```
await tp.system.prompt("Název projektu?")
await tp.system.suggester(["Volba 1", "Volba 2"], ["val1", "val2"])
await tp.system.clipboard()      // obsah schránky
```
**Obsidian notifikace:**
```
new Notice("Úspěšně vytvořeno!", 5000)
```
## Pokročilé file operace

**Vyhledávání a filtrování souborů:**
```
tp.date.now("YYYY-MM-DD")        // aktuální datum
tp.date.tomorrow("DD.MM.YYYY")   // zítřek
tp.date.weekday("dddd")          // den v týdnu
moment().add(7, 'days').format("YYYY-MM-DD")  // za týden
```
## Opakované proměnné

**Základní pattern pro uložení a opětovné použití:**
```


# Projekt: aaa
Vedoucí: s s

## Úkoly pro s
- [ ] Kontaktovat s s
- [ ] Připravit materiály pro aaa
```
## Podmíněné zobrazování obsahu

**Podle dne v týdnu:**
```

## Pracovní úkoly
- [ ] Kontrola emailů
- [ ] Standup meeting



```
**Error handling v templatech:**
```

Údaj: ww


```

```

```


## Pokročilé

**Auto-tagging podle klíčových slov**

```
const content = tp.file.content;
const autoTags = [];

if (content.includes("projekt") || content.includes("plán")) autoTags.push("#project");
if (content.includes("meeting") || content.includes("schůzka")) autoTags.push("#meeting");
if (content.includes("kniha") || content.includes("článek")) autoTags.push("#resource");
if (content.includes("nápad") || content.includes("idea")) autoTags.push("#idea");

return autoTags.join(" ");

```

## Pracovní workflow automatizace

**[[Týdenní batch processing]]**

```
const today = moment();
const weekStart = today.clone().startOf('week');
const files = app.vault.getMarkdownFiles();

const thisWeekNotes = files.filter(file => {
    const created = moment(file.stat.ctime);
    return created.isBetween(weekStart, today);
});

let output = "## Poznámky z tohoto týdne:\n";
thisWeekNotes.forEach(file => {
    output += `- [[${file.basename}]]\n`;
});

return output;

```

**Generování weekly dashboard**

```
const today = moment();
const weekStart = today.clone().startOf('week');

let dashboard = `# Týdenní přehled (${weekStart.format('DD.MM')} - ${today.format('DD.MM')})\n\n`;

dashboard += `## Statistiky:\n`;
dashboard += `- Nové poznámky: ${newNotesCount}\n`;
dashboard += `- Dokončené úkoly: ${completedTasks}\n`;
dashboard += `- Aktivní projekty: ${activeProjects}\n\n`;

dashboard += `## Top tagy tohoto týdne:\n`;
dashboard += getTopTags().map(tag => `- ${tag}`).join('\n');

return dashboard;

```

**Generování TODO seznamů z obsahu**
```
const content = tp.file.content;
const actionWords = ["udělat", "zkontrolovat", "ověřit", "napsat", "poslat", "zavolat"];
const todos = [];

actionWords.forEach(word => {
    const regex = new RegExp(`.*${word}.*`, 'gi');
    const matches = content.match(regex);
    if (matches) {
        matches.forEach(match => {
            todos.push(`- [ ] ${match.trim()}`);
        });
    }
});

return todos.length > 0 ? "## Akční body:\n" + todos.join('\n') : "";

```
