# Glossary

Complete decoder ring for Origin v2.0 project terminology.

## Concepts & Systems

| Term | Meaning | Context |
|------|---------|---------|
| **PARA** | Project, Area, Resource, Archive | Foundational PKM organization system |
| **Templater** | Obsidian plugin for JavaScript automation | Powers note creation, metadata injection, workflows |
| **Dataview** | Obsidian query/aggregation plugin | Pulls data across vault; used for daily→weekly→monthly cascade |
| **FileClass** | Obsidian Bases database schema | Defines note types: atomic, effort, source, moc, meeting, prompt, person, place, tool, area |
| **CIS** | Custom Information System | 30+ enum definition files (CIS_STATUS.md, CIS_MATURITY.md, etc.) |
| **Metadata** | YAML frontmatter | up, title, type, status, maturity, priority, tags, created, modified, related, newsletter |
| **3-Tier Template** | Modular template pattern | Meta (YAML) + Body (content) composed at creation time |
| **MOC** | Map of Content | Navigation hubs; topic-based index of related notes |
| **Atomic** | Single idea; smallest unit of knowledge | Ideal for interconnection and reuse |
| **Effort** | Project; bounded work | Sub-folders: On/, Ongoing/, Simmering/ |
| **Review Hub** | Aggregation point for periodic notes | Collects daily notes → weekly reports → monthly reviews → yearly reflections |
| **Bases Daily View** | Mini dashboard view | Shows notes created today; uses Bases/Dataview |

## Maturity Levels

| Emoji | Level | Meaning |
|-------|-------|---------|
| 📤 | seed | Initial capture; raw idea |
| 🌱 | seedling | Early development; some structure |
| 🪴 | sapling | Well-developed; ready to connect |
| 🌲 | evergreen | Complete; stable; connected |
| 🍓 | fruit | Mature; refined; action-ready |

**Note:** Common mistake: using 🌱 for "seed" — actual first level is 📤 (seed), 🌱 is seedling.

## Status Values

| Emoji | Status | Meaning |
|-------|--------|---------|
| 📥 | inbox | Captured; not yet processed |
| 🔄 | active | In progress |
| ⏳ | waiting | Blocked; waiting on external input |
| ✅ | completed | Done |
| 📦 | archived | Completed/inactive; moved to 06-Archive |
| ❌ | cancel | Cancelled; will not proceed |
| ⚠️ | blocked | Blocked; needs intervention |

## Scripts (99-System/Scripts/)

| Script | Purpose |
|--------|---------|
| Templater_script.js | Core engine: inject_meta_if_missing(), add_chapters(), combine(), reset_* functions |
| yaml_orchestrator.js | YAML metadata reorder/normalize/lint (config: yaml-meta-config.json) |
| yaml_validator.js | YAML field type & required field validation |
| smart-classifier.js | Intelligent note type/folder/tag suggestion from content |
| auto-metadata.js | Automatic frontmatter population |
| batch-process-inbox.js | Bulk inbox processing |
| quick-process-atomic.js | Atomic note quick processing |
| quick-process-effort.js | Effort quick processing |
| quick-process-source.js | Source quick processing |
| maturity-promoter.js | Advance note maturity level |
| metrics-core.js | Vault health metrics (inbox health, stale notes, orphans) |
| update-metrics-cache.js | Metrics caching; QuickAdd macro |
| generate-weekly-report.js | Weekly aggregation in 05-Calendar/Weekly; QuickAdd macro |
| generate-newsletter.js | Newsletter draft from newsletter: true flagged notes |
| update-changelog.js | Auto-draft CHANGELOG.md entries from recent vault changes |
| maturity-evolve.js | Maturity evolution logic |
| archive_note.js / archive-old-dailies.js | Archival automation |
| status-picker.js / status-progression.js | Status workflow UI & automation |

## Folder Structure (8-Layer PARA)

| Layer | Folder | Role |
|-------|--------|------|
| 0 | +Inbox | Quick capture entry point |
| 1 | 00-Meta | System documentation, checklists, guides, gamification |
| 2 | 01-MOCs | Maps of Content — topic-based navigation hubs |
| 3 | 02-Dots | Atomic knowledge: Ideas, Concepts, Statements, Things, People, Places |
| 4 | 03-Efforts | Projects: On/ (active), Ongoing/ (in progress), Simmering/ (background) |
| 5 | 04-Sources | External references: Knowledge, Media, Guides, Meetings |
| 6 | 05-Calendar | Periodic notes: Daily, Weekly, Monthly, Quarterly, Yearly |
| 7 | 06-Archive | Completed/inactive content |
| — | 99-System | Infrastructure: Scripts, Config, CIS enums, FileClass, AI prompts, images |
| — | Templates | 155 templates across 16 categories |

## v2.0 Migration Concepts

| Concept | Meaning |
|---------|---------|
| **Template Vault** | Origin is a reusable reference vault for deploying other vaults with different logic (work-only, personal, mixed) |
| **Core vs. Optional** | All folders/systems are core; goal is to make them adaptable without refactoring |
| **Work Vault Setup** | Example: 03-Efforts focuses on projects only; 02-Dots restricted to work-relevant atomics |
| **Documented Workflows** | Every process step-by-step in 00-Meta/PKM Workflows.md so migrations are replicable |
| **Adaptability** | Vault design should support customization at setup time (folder naming, FileClass definitions, tag schema) |

## Plugins (Essential)

| Plugin | Role |
|--------|------|
| Templater | JavaScript automation; core to all workflows |
| Dataview | Query/aggregation across vault |
| Tasks | Task management in notes |
| QuickAdd | Macros for frequent operations |
| Periodic Notes | Automated daily/weekly/monthly/yearly note creation |
| Auto Note Mover | Tag-based routing to correct folder |
| Folder Notes | Folder overview notes |
| Kanban | Visual project board |
| Metadata Menu | Enhanced metadata UI |
| Smart Connections | AI-powered search |
| Homepage | Custom vault home |
| Style Settings | Theme customization |

## Key Gotchas (Known Issues)

| Issue | Explanation | Source |
|-------|-------------|--------|
| 🌱 seed confusion | Many older files use 🌱 for "seed"; actual first level is 📤 (seed), 🌱 is (seedling) | CIS_MATURITY.md is canonical |
| yaml-meta-config partial | Config only lists 5 status values; CIS_STATUS.md defines 7 (includes ❌ cancel, ⚠️ blocked) | CIS files are canonical |
| Obsidian runtime only | Scripts run in Obsidian Templater context (Electron); no CLI/Node.js test harness | Can't test outside Obsidian |
| Field order matters | YAML frontmatter field order enforced by yaml-meta-config.json | Preserve order when editing |

## Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Meta templates | {type}-meta.yaml.md | atomic-meta.yaml.md |
| Body templates | {type}-body.md | atomic-body.md |
| Static templates | {type}.md | atomic.md |
| Create templates | new-{type}.md or new-{type}-auto.md | new-atomic.md |
| Scripts | kebab-case | smart-classifier.js, yaml-orchestrator.js |
| CIS enums | CIS_{FIELD}.md | CIS_STATUS.md, CIS_MATURITY.md |
| YAML keys | snake_case | processing_priority, completion_percentage |
| Tags | emoji + category | 💡atomic, 🚀project, 📚source, 📥inbox |
| About files | +About {Section}ℹ️.md | +About Templates ℹ️.md |

## File Classes (10 Full Types)

| FileClass | Purpose |
|-----------|---------|
| atomic | Single idea; keyword-indexable |
| effort | Project; bounded work with timeline |
| source | External reference (article, video, book, meeting) |
| moc | Map of Content; navigation hub |
| meeting | Meeting notes with attendees, decisions |
| prompt | AI prompt definition with category & model defaults |
| person | Person profile with role, communication style |
| place | Location/space reference |
| tool | Tool/software reference with use cases |
| area | Area of focus/responsibility (long-term) |

## Lightweight Types (CIS_TYPE Only)

| Type | Purpose |
|------|---------|
| system | Infrastructure documentation |
| dashboard | Metrics/overview page |
| about | Folder documentation |
| guide | How-to guide |
| tutorial | Step-by-step learning |
| daily | Daily note (auto-created) |
| weekly | Weekly report (auto-created) |
| monthly | Monthly review (auto-created) |
| quarterly | Quarterly reflection (auto-created) |
| yearly | Yearly reflection (auto-created) |
| challenge | Personal challenge/goal |

## Custom Callouts (Used in Vault)

| Callout | Use |
|---------|-----|
| orbit | Recurring/spaced review item |
| map | Navigation/structure item |
| calendar | Date/time/scheduling related |
| compass | Direction/decision point |
| training | Learning resource |
| milestone | Project achievement |
| recycle | Revision/update needed |
| blocks | Multi-column layout |
| multi-column | Complex layout |
| hint | Helpful tip |

