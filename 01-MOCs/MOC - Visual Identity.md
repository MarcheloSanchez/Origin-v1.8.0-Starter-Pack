---
title: Visual Identity
type: moc
status: 🔄active
created: 2026-02-04
modified: 2026-02-04
tags:
  - "#🗺️MOC"
  - "#⚙️system"
  - "#🎨design"
review_frequency: monthly
related:
  - "[[🗺️My PKM MOC]]"
  - "[[🙂My PKM Icon Reference]]"
  - "[[Icon Package]]"
  - "[[🏷️My PKM Tags]]"
  - "[[🔢My PKM Metadata]]"
  - "[[ℹ️My PKM Naming Convention]]"
  - "[[🎮My PKM Gamification]]"
---

⬆️:: [[🏡Home]] · [[🗺️My PKM MOC]]

> [!summary] Purpose
> Central hub for all **visual, design, and aesthetic** elements of the vault. Icons, colors, CSS snippets, callouts, themes, and hotkey visualization live here.

---

## 🎨 Icon System

The foundation of visual consistency across the vault.

- [[🙂My PKM Icon Reference]] – Core icon standards & color psychology
- [[Icon Package]] – Comprehensive icon library with search keywords
- [[Visual hotkeys]] – Keyboard shortcuts visualized with icons

### Quick Reference
| Category | Primary Icons | Color |
|----------|--------------|-------|
| Status | ✅❌⏳🔄📥📦⚠️ | Context-dependent |
| Actions | 🚀📝🔗📊⚙️🗑️✏️📁 | Green/Blue family |
| Time | 📅⏰📈📉🔄 | Yellow/Orange |
| People | 👤👥🤝💬 | Neutral |
| System | 🔧⚙️🛠️💻🖥️ | Purple |

---

## 🖌️ CSS Snippets

Custom styling for enhanced visual hierarchy.

**Location**: `.obsidian/snippets/`

| Snippet | Purpose |
|---------|---------|
| `Colored Sidebar Items.css` | Folder color coding |
| `MCL Gallery Cards.css` | Card-based layouts |
| `MCL Multi Column.css` | Multi-column content |
| `MCL Wide Views.css` | Wide page layouts |
| `cornell-banner-v2.css` | Note banners |
| `headers-custom.css` | Custom header styling |
| `kanban_custom.css` | Kanban board visuals |
| `nick-milo-callouts.css` | Custom callout system |
| `timeline-snippet.css` | Timeline visualization |

---

## 📢 Callout System

Custom callouts for semantic visual organization.

- [[List of Custom Callouts]] – 55+ custom callouts (Nick Milo + LifeQuest)
- [[Custom Callout System]] – CSS definitions & usage examples

### Callout Categories
| Type | Purpose | Examples |
|------|---------|----------|
| Progress | Success, wins, milestones | `[!success]`, `[!win]`, `[!progress]` |
| Insight | Learning, connections | `[!insight]`, `[!connection]`, `[!synthesis]` |
| Action | Tasks, next steps | `[!action]`, `[!next]`, `[!planning]` |
| System | Meta, maintenance | `[!system]`, `[!meta]`, `[!maintenance]` |
| Research | Hypotheses, evidence | `[!hypothesis]`, `[!evidence]`, `[!methodology]` |
| Creative | Ideas, brainstorming | `[!idea]`, `[!brainstorm]`, `[!creative]` |

---

## 🎨 Theme Configuration

**Current Theme**: Minimal

**Style Settings Plugin**: Fine-tuned appearance controls

### Color Variables (Light/Dark)
```css
/* Core PKM Colors */
--pkm-primary: #3742fa / #5352ed
--pkm-success: #2ed573 / #00b894
--pkm-warning: #ffd32a / #fdcb6e
--pkm-danger: #ff4757 / #ff7675
--pkm-info: #40739e / #74b9ff
```

---

## ⌨️ Hotkey Visualization

Visual guides for keyboard shortcuts.

- [[Visual hotkeys]] – ASCII keyboard maps, workflow chains
- [[Obsidian Hotkeys - Compact Cheatsheet]] – Quick reference

### Color-Coded Actions
| Color | Category | Examples |
|-------|----------|----------|
| 🔵 Blue | Navigation | Search, Switch, Back/Forward |
| 🟢 Green | Creation | New note, Daily, Weekly |
| 🟡 Yellow | Automation | QuickAdd, Templates, Tagging |
| 🔴 Red | Management | Move, Delete, Rename |

---

## 📊 Visual Hierarchy

How information is prioritized visually.

### Priority Levels
- 🔴 **P1 - Critical** – `#ff3838` – Immediate action
- 🟠 **P2 - High** – `#ffa502` – Important
- 🟡 **P3 - Medium** – `#ffd32a` – Standard
- 🟢 **P4 - Low** – `#2ed573` – When available
- ⚪ **P5 - Someday** – Gray – Future

### Progress/Maturity
- 🌱 Seed → 🌿 Seedling → 🪴 Sapling → 🌲 Evergreen → 🍓 Fruit

---

## 🔧 Maintenance

### Monthly Review Checklist
- [ ] Audit icon consistency across templates
- [ ] Check CSS snippet compatibility after updates
- [ ] Review callout usage patterns
- [ ] Test theme in light/dark modes
- [ ] Update color variables if needed

### Accessibility
- High contrast combinations meet WCAG AA
- Icons supplement (never replace) text meaning
- Mobile-responsive styling maintained

---

## 🏷️ Visual Standards in PKM System

These PKM files contain visual/emoji standards that integrate with this MOC:

| Document | Visual Elements |
|----------|-----------------|
| [[🏷️My PKM Tags]] | Emoji-first tags (`#💡atomic`, `#🚀effort`), priority colors |
| [[🔢My PKM Metadata]] | Maturity icons (🌱→🍓), status emojis, Mermaid diagrams |
| [[ℹ️My PKM Naming Convention]] | Emoji prefixes for note types (📅, 🚀, 💡, 📚) |
| [[🎮My PKM Gamification]] | Achievement badges, level icons, rarity colors (⚪🟢🔵🟣🟠) |

---

## 🗺️ Related Hubs

- [[🗺️My PKM MOC]] – Parent system hub
- [[🏛️My PKM Governance]] – Rules and standards
- [[🔢My PKM Metadata]] – Frontmatter standards
- [[🏷️My PKM Tags]] – Tag conventions
- [[ℹ️My PKM Naming Convention]] – File naming with emoji prefixes
- [[🎮My PKM Gamification]] – Visual achievement system
- [[+About Templatesℹ️]] – Template system

---

## 📚 Design Resources

External references for expanding the visual system.

- Lucide Icons (used by Obsidian)
- Minimal Theme documentation
- CSS snippets community (GitHub)

