---
title: "🪪 Vault Identity"
type: guide
status: 🔄active
created: 2026-03-17
modified: 2026-03-17
tags:
  - 📊metadata
up: "[[🗺️My PKM MOC]]"
---

# 🪪 Vault Identity

> [!abstract] Účel
> Definuje **co Origin je**, čím se liší od ostatních vaultů, a kde jsou hranice jeho odpovědnosti. Ostatní PKM dokumenty říkají *jak* Origin funguje — tento říká *proč existuje*.

---

## 1. Vault Identity Card

| | |
|---|---|
| **Název** | Origin |
| **Verze** | v1.9.1 |
| **Účel** | Centrální meta-vault pro PKM metodiku, workflow, šablony a knowledge architecture |
| **Jazyk** | Czech obsah, English metadata |
| **Git** | Ano — jediný verzovaný vault |
| **Velikost** | ~1 028 poznámek |

> [!quote] Filosofie
> **Origin není vault na poznámky — je to vault na myšlení o poznámkách.**

### Co Origin JE

- Meta PKM systém — pravidla, konvence, governance
- Template a workflow architektura pro všechny vaulty
- Reference library (atomické poznámky, zdroje, MOC)
- Experimentální laboratoř pro PKM techniky
- Git-backed single source of truth

### Co Origin NENÍ

| Potřeba | Kam patří |
|---------|-----------|
| Plánování jídel, recepty, nákupy | **Muza** (food planning vault) |
| Osobní GTD, Zettelkasten deník | **Ideaversee** (personal second brain) |
| QA dokumentace, pracovní projekty | **Work** (organizational vault) |
| Spolupráce s dalšími lidmi | **Muza** (sdílený se Zůzou) |

---

## 2. Cross-Vault Contrast Table

| Dimension | Origin | Muza | Ideaversee | Work |
|-----------|--------|------|------------|------|
| **Účel** | PKM meta-systém, knowledge architecture | Meal planning & food cost automation | Personal second brain, GTD + Zettelkasten | QA/testing docs & project management |
| **Audience** | Solo (template-shareable) | Collaborative (Zůza + Marchelo) | Solo personal | Organizational/work |
| **Jazyk** | Czech obsah, English metadata | Czech (diacritics in filenames) | Mixed Czech/English | Czech |
| **Architektura** | PARA 8-layer | Domain-specific (Ingredients/Recipe/FoodPlan) | Zettelkasten + GTD (Efforts/Atlas/Calendar) | Org structure (PROJEKTY/KANBAN/Testování) |
| **Data model** | Two-tier types, emoji status, base views | PascalCase YAML formulas (BoughtCost, CostPerMeal) | Tags + Dataview + Kanban | Markdown + Kanban boards |
| **Automatizace** | Heavy (36 scripts, QuickAdd, Templater) | Python bulk scripts | Plugin-heavy (Tasks, Tracker, Review) | Light (templates) |
| **Velikost** | ~1 028 souborů | ~308 souborů | ~2 588 souborů (largest) | ~338 souborů |
| **Git-backed** | Ano | Ne | Ne | Ne |
| **Unikátní rys** | CIS enum systém, gamification, AI classifier | Cost-per-meal calculations | Massive interlinked graph | Kanban workflow boards |

---

## 3. Origin-Specific Rules

Pravidla platná **výhradně** v Origin. Detaily v odkazovaných dokumentech — zde jen přehled.

| Pravidlo                    | Stručně                                                 | Detaily                        |
| --------------------------- | ------------------------------------------------------- | ------------------------------ |
| PARA 8-layer struktura      | 8 vrstev od Inbox po Archive                            | [[📁My PKM Folders]]           |
| Emoji status & maturity     | 📤seed → 🌱seedling → 🪴sapling → 🌲evergreen → 🍓fruit | [[🏷️My PKM Tags]]             |
| Two-tier type systém        | 10 full types + 11 lightweight                          | [[🔢My PKM Metadata]]          |
| 3-tier template composition | Meta + Body + Create layers                             | [[📦Template System Guide]]    |
| Base views embed pattern    | `![[_Data.base]]` v každém folder indexu                | CLAUDE.md                      |
| Gamification (XP/levels)    | Akce = XP, level = XP ÷ 100                             | [[🎮Gamification Dashboard]]   |
| Bilingual classifiers       | Czech keywords ve skriptech, English metadata keys      | Smart Classify Note            |
| CIS enum systém             | 35 číselníků v `99-System/CIS/`                         | [[📁My PKM Folders#99-System]] |
| Naming conventions          | Emoji prefix, PascalCase templates                      | [[ℹ️My PKM Naming Convention]] |
| Governance                  | Change process, documentation standards                 | [[🏛️My PKM Governance]]       |

---

## 4. Automation Inventory

### QuickAdd Commands

#### Create New Note (menu `⚡Create New Note`)

| Submenu | Příkazy |
|---------|---------|
| 🌱 Basic | Quick Idea, Quick Inbox, Atomic, MOC, Effort, Meeting, Source, Prompt, Area |
| Specific Type | People - Professional, People - Personal |
| 🔗 Link 2 Curr Line | Vytvoří novou poznámku a vloží odkaz na aktuální řádek |
| 🤖 Auto - input based | AI-assisted creation (Atomic, Effort, Meeting, Source, MOC, Prompt, Area) |

#### YAML Automation (menu `🔢YAML - Automation ⚡`)

| Submenu | Co dělá |
|---------|---------|
| 1️⃣ Apply to Curr note | Lint / reorder / normalize frontmatter aktuální poznámky |
| 📂 Pick MULTI-FOLDERS | Totéž pro vybrané složky hromadně |
| ⛔ SETUP | Přednastavené batch operace (Inbox, Dots, Efforts, MOCs, Sources) |

#### Standalone Macros

| Příkaz | Účel |
|--------|------|
| 🤖 Smart Classify Note | AI analýza → type, folder, tags, maturity suggestion |
| 📝 Auto-Fill Metadata | Doplní chybějící frontmatter fields |
| 📦 Batch Process Inbox | Hromadné zpracování Inbox poznámek |
| ⚡ Quick Process - Atomic | Rychlé zařazení do 100-Atomics |
| ⚡ Quick Process - Source | Rychlé zařazení do 04-Sources |
| ⚡ Quick Process - Effort | Rychlé zařazení do 03-Efforts |
| 🔄 Update Metrics Cache | Přepočítá metriky do `_Metrics Cache.md` |
| 📦 Archive Old Dailies | Archivace daily notes starších 12 měsíců |
| ➕ Turn selected text into New Note | Extrahuje výběr do nové poznámky |
| MATURITY-EVOLVE | Automatický posun maturity na základě obsahu |

#### Captures

| Příkaz | Účel |
|--------|------|
| ➡️ Status Progression NEXT | Posune status o krok vpřed |
| ⬅️ Status Progression PREV | Vrátí status o krok zpět |
| 🏷️ Quick Tag | Rychlé přidání tagu |
| 🔗 LINK | Vloží wiki-link |

### Hotkeys

Viz [[⚡Workflow Quick Reference#⌨️ Keyboard Shortcuts Reference]] pro kompletní seznam.

### Key Scripts (`99-System/Scripts/`)

34 skriptů celkem. Klíčové:

| Script | Účel |
|--------|------|
| `auto-metadata.js` | Automatic frontmatter population |
| `quick-process-atomic.js` | Fast atomic note filing |
| `quick-process-source.js` | Fast source note filing |
| `quick-process-effort.js` | Fast effort note filing |
| `metrics-core.js` | XP/gamification calculations |
| `maturity-evolve.js` | Content-based maturity promotion |
| `archive-old-dailies.js` | Daily note archival |
| `status-progression.js` | Status workflow transitions |
| `archive_note.js` | General note archival |
| `generate-weekly-report.js` | Weekly vault analytics |

Kompletní seznam viz [[🔧Scripts Reference]].

---

## 5. Vault Direction

Origin směřuje k **plně automatizovanému PKM lifecycle** — od zachycení myšlenky přes AI klasifikaci až po maturity-driven archivaci. Hlavní strategické osy: zlepšení AI classifieru, sjednocení tagů s CIS enumy, a rozšíření base views s custom CSS.

**Roadmapa a backlog:**
- [[README#🚀 Roadmapa]] — plánované verze a milníky
- [[BACKLOG]] — Kanban board s aktivními úkoly

**Otevřené design otázky:**
- Tag unification — `🏷️My PKM Tags` taxonomie vs skutečné použití v poznámkách divergují
- Base views CSS — potřeba inspekce DOM tříd pro custom styling
- Template consolidation — některé QuickAdd entries mají `(copy)` duplicity

---

## 🔗 Related

- [[🗺️My PKM MOC]] — mapa celého vault systému
- [[📁My PKM Folders]] — PARA 8-layer folder structure
- [[🏛️My PKM Governance]] — pravidla a change process
- [[🔢My PKM Metadata]] — frontmatter schema
- [[⚡Workflow Quick Reference]] — kompletní workflow guide
- [[🔧Scripts Reference]] — all scripts documentation

---

*Vault Identity v1.0 — 2026-03-17*
