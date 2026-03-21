# Origin v1.8.0 Starter Pack - Vault Report

> **Generated**: January 31, 2026
> **Vault Version**: 1.8.0

---

## Executive Summary

Origin v1.8.0 is a **production-grade Personal Knowledge Management (PKM) system** built on Obsidian. It implements a hybrid PARA+Meta architecture with extensive automation, AI integration, and a comprehensive template library. The vault is designed for power users managing complex knowledge domains.

| Metric | Value |
|--------|-------|
| Total Files | ~550+ |
| Markdown Notes | 445 |
| Installed Plugins | 32 |
| Template Files | 150 |
| Automation Scripts | 13 |
| Custom Hotkeys | 30+ |

---

## Folder Architecture

The vault uses an **8-layer PARA-inspired structure** with supporting systems:

```
Origin-v1.8.0-Starter-Pack/
├── +Inbox/              (3 files)   - Capture gate
├── 00-Meta/            (64 files)   - Meta-management & documentation
├── 01-MOCs/            (15 files)   - Maps of Contents & navigation
├── 02-Dots/            (37 files)   - Atomistic knowledge base
├── 03-Efforts/         (16 files)   - Projects & active initiatives
├── 04-Sources/         (22 files)   - External references & learning
├── 05-Calendar/        (25 files)   - Temporal organization
├── 06-Archive/         (32 files)   - Completed/inactive content
├── 99-System/         (133 files)   - Core infrastructure
├── Templates/         (150 files)   - Template library (15 categories)
└── [Root files]        (11 files)   - Documentation & dashboards
```

### Folder Breakdown

| Folder | Purpose | Key Contents |
|--------|---------|--------------|
| **+Inbox** | Quick capture entry point | Unprocessed notes awaiting organization |
| **00-Meta** | System documentation | Checklists, guides, gamification, kanban config |
| **01-MOCs** | Navigation hubs | PKM MOC, Automation Center, Playbooks, Areas |
| **02-Dots** | Atomic knowledge | Ideas, Concepts, Statements, People, Places, Tools |
| **03-Efforts** | Project management | Active, Ongoing, Simmering projects |
| **04-Sources** | Reference materials | Knowledge base, Media, Guides, Meetings |
| **05-Calendar** | Time-based notes | Daily, Weekly, Monthly, Quarterly, Yearly |
| **06-Archive** | Completed work | Finished projects, used templates |
| **99-System** | Infrastructure | Scripts, Images, PDFs, FileClasses, AI prompts |
| **Templates** | Template library | 15 subcategories, 150 templates |

---

## Core Systems & Features

### 1. Knowledge Organization

- **MOC System**: Central navigation hubs with custom callouts
- **Atomic Notes**: Structured taxonomy (Ideas/Concepts/Statements/Things)
- **PARA Extension**: Projects, Areas, Resources, Archive + Meta layer
- **Maturity Tracking**: Seed → Seedling → Sapling → Evergreen → Fruit

### 2. Task & Time Management

- **GTD Implementation**: Capture → Process → Organize → Review → Archive
- **Periodic Notes**: Daily, Weekly, Monthly, Quarterly, Yearly templates
- **Status Workflow**: 📥inbox → 🔄active → ⏳waiting → ✅completed → 📦archived
- **Challenge System**: Daily/Weekly/Monthly gamified productivity

### 3. Automation Infrastructure

| Component | Count | Description |
|-----------|-------|-------------|
| JavaScript Scripts | 9 | Templater automation, batch processing |
| Python Scripts | 2 | Plugin tracking, translation |
| QuickAdd Macros | - | Hotkey-triggered capture |
| Auto-Note Mover | - | Tag-based file routing |
| YAML Orchestrator | - | Metadata workflow automation |

### 4. AI Integration

- **Copilot Custom Prompts**: 20+ pre-built AI templates
- **Smart Connections**: Semantic AI-powered linking
- **Key Prompts**:
  - Note Evolver - Mature notes to evergreen
  - Synthesize Knowledge - Cross-reference integration
  - Decision Analysis - Logical evaluation
  - Research Orchestrator - Investigation coordination
  - Idea Validator - Concept validation

---

## Plugin Ecosystem

**32 plugins installed**, organized by function:

### Essential/Core
| Plugin | Purpose |
|--------|---------|
| templater-obsidian | Advanced templating & automation |
| dataview | Dynamic querying & database queries |
| quickadd | Quick capture & macros |
| periodic-notes | Daily/Weekly/Monthly automation |
| obsidian-tasks-plugin | GTD task management |

### Organization & Automation
| Plugin | Purpose |
|--------|---------|
| auto-note-mover | Auto-file notes by tags |
| folder-notes | Folder index pages |
| obsidian-kanban | Kanban board interface |
| metadata-menu | Enhanced metadata management |
| tag-wrangler | Tag organization |

### Advanced Features
| Plugin | Purpose |
|--------|---------|
| smart-connections | AI semantic search |
| obsidian-advanced-uri | URI-based automation |
| nldates-obsidian | Natural language dates |
| homepage | Custom home page |
| lazy-plugins | Performance optimization |

### Visual & Enhancement
| Plugin | Purpose |
|--------|---------|
| obsidian-minimal-settings | Minimal theme config |
| obsidian-style-settings | Style customization |
| callout-manager | Custom callout types |
| obsidian-excalidraw-plugin | Whiteboarding |

---

## Template Library

**150 templates across 15 categories**:

| Category | Description |
|----------|-------------|
| Actions | Automation & reset actions |
| Add-Sections | Modular content blocks |
| Body | Content templates |
| Core | Navigation components (breadcrumb, wayfinder) |
| Create | Note creation templates |
| Gamification | Challenge templates |
| Meta | Metadata templates |
| New-Notes | Note type templates (Kanban, Calendar) |
| Quick-Inserts | Rapid insertion snippets |
| Scripts | Templater & YAML scripts |
| Static | Static template content |

---

## Metadata & Database Schema

### Database Files (10 .base files)
- `_Meta_Data.base` - Meta folder schema
- `_Inbox_Data.base` - Inbox processing
- `_MOCs_Data.base` - MOC structure
- `_Atomics_Data.base` - Atomic notes schema
- `_Dots_Data.base` - Knowledge base
- `_Efforts_Data.base` - Project tracking
- `_Sources_Data.base` - Reference materials
- `_Calendar_Data.base` - Temporal notes
- `_Archive_Data.base` - Archived content
- `_System_data.base` - System configuration

### YAML Front Matter Schema
```yaml
title: Note title
type: atomic | source | effort | calendar
status: 📥inbox | 🔄active | ⏳waiting | ✅completed
created: YYYY-MM-DD
priority: high | medium | low
energy: high | medium | low
maturity: seed | seedling | sapling | evergreen | fruit
```

---

## Custom Styling

### Theme
- **Minimal Theme**: Clean, distraction-free interface

### Custom Callouts (10+ types)
- `orbit` - Orbital/system callouts
- `map` - Navigation callouts
- `calendar` - Time-based callouts
- `compass` - Direction/guidance
- `training` - Learning callouts
- `milestone` - Achievement markers
- `recycle` - Review/refresh
- `blocks` - Building blocks
- `multi-column` - Layout callouts
- `hint` - Helpful tips

---

## Keyboard Shortcuts

### Critical Shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+I` | Quick Inbox Capture |
| `Ctrl+Shift+D` | Open Daily Note |
| `Ctrl+Shift+W` | Open Weekly Note |
| `Ctrl+Shift+M` | Open Monthly Note |
| `Alt+T` | Quick Tag assignment |
| `Alt+Q` | QuickAdd menu |
| `Alt+R` | Insert Templater |
| `Ctrl+M` | Move file |
| `Alt+E` | Insert template |
| `Ctrl+K` | Insert wikilink |

---

## Documentation Suite

### Technical Guides
- Templater User Guide
- Dataview Query Handbook
- Git User Guide
- Obsidian Troubleshooting Handbook
- Debug Guide

### Workflow Guides
- My PKM Workflows - Global Guidelines
- My PKM Tags (complete tagging system)
- My PKM Metadata (schema documentation)
- Origin Vault Workflow Guide
- GTD Contexts Guide

### Quick References
- Hotkeys Quick Reference
- Google Search Cheatsheet
- Kanban Handbook
- Visual Hotkeys guide

---

## Version History

| Version | Date | Highlights |
|---------|------|------------|
| v1.0.0 | Jun 12, 2025 | Initial foundation |
| v1.3.0 | Aug 4, 2025 | Workflow templates, enhanced callouts |
| v1.4.0 | Aug 16, 2025 | Technical documentation, automation |
| v1.5.0 | Aug 23, 2025 | Atomic template system |
| v1.6.0 | Oct 13, 2025 | JavaScript modules, Meta-skills |
| v1.7.0 | Jan 15, 2026 | Gamification, GTD, Review HQ, Home Maintenance |
| v1.8.0 | Jan 31, 2026 | Meta-skills architecture, Template refactoring |

---

## Key Architectural Insights

1. **Hybrid PARA+Meta**: Combines PARA methodology with central meta-layer
2. **GTD-First Workflow**: Structured capture-to-archive pipeline
3. **Template-Driven**: 150 templates enable rapid note creation
4. **Automation-Heavy**: 13 scripts + 32 plugins for extensive automation
5. **AI-Ready**: Integrated Copilot with 20+ prompt templates
6. **Maturity-Aware**: Built-in note evolution tracking
7. **Performance-Optimized**: Lazy plugin loading, query optimization
8. **Mobile-Prepared**: QuickAdd + Advanced URI for external capture

---

## Getting Started

1. **Quick Start**: Open `START HERE.md`
2. **Full Documentation**: Read `README.md`
3. **Daily Workflow**: Use `🏡Home.md` as your dashboard
4. **Task Management**: Access `TODO.md`
5. **Weekly Reviews**: Follow `🎯GTD Weekly Review.md`

---

## License

MIT License - Fork-friendly, open for contributions

---

*Report generated for Origin v1.8.0 Starter Pack*
