---
title: "Origin Vault v1.8.0 - Comprehensive Analysis Report"
type: "report"
status: "🔄active"
created: 2026-01-02
modified: 2026-01-02
tags:
  - 📊analysis
  - 🗂️vault-structure
  - ⚙️system
  - 📈metrics
---

# 📊 Origin Vault v1.8.0 - Comprehensive Report

**Report Date**: January 2, 2026
**Vault Version**: 1.8.0 (Starter Pack)
**Total Size**: 44 MB
**Total Files**: 418 (416 markdown + configuration)
**Total Lines**: 38,774

---

## 📌 Executive Summary

**Origin** is a professional-grade Personal Knowledge Management (PKM) system built on Obsidian. It implements a sophisticated 8-layer architecture combining GTD (Getting Things Done) methodology with the PARA framework, providing a comprehensive system for capturing, organizing, developing, and archiving knowledge.

### 🎯 Key Metrics at a Glance

| Metric | Value | Status |
|--------|-------|--------|
| **Total Markdown Files** | 416 | ✅ Well-structured |
| **Directory Categories** | 30+ | ✅ Comprehensive |
| **Core Layers** | 8 | ✅ Complete |
| **Template Types** | 8+ | ✅ Diverse |
| **Tag System** | GTD + Content-based | ✅ Standardized |
| **Documentation Pages** | 320+ | ✅ Extensive |

---

## 🏗️ Vault Architecture

### Primary 8-Layer Structure

The vault is organized into 8 main functional layers, each serving a specific purpose in the PKM workflow:

#### **00-Meta** (System Information)
- **Purpose**: Vault metadata, changelogs, and administrative files
- **Key Files**: ChangeLog, configuration references
- **Function**: Central hub for vault information and documentation
- **Status**: ✅ Active repository of vault intelligence

#### **01-MOCs** (Maps of Content)
- **Purpose**: Navigation hubs and concept overview documents
- **Content**: Index pages that organize and connect related notes
- **Key Benefit**: Enables quick discovery and relationship mapping
- **Function**: Acts as the "thinking map" for the knowledge base
- **Status**: ✅ Navigation backbone

#### **02-Dots** (Atomics & Concepts)
- **Purpose**: Individual atomic notes and fundamental concepts
- **Subdirectories**:
  - `100-Atomics`: Single-idea notes (fundamental building blocks)
  - `200-Areas`: Life/work areas (Health, Work, Learning, Personal)
  - `300-Concepts`: Topic-specific notes and idea collections
- **Philosophy**: Zettelkasten-inspired, one idea per note
- **Status**: ✅ Knowledge foundation

#### **03-Efforts** (Projects & Initiatives)
- **Purpose**: Active and ongoing projects, tasks, and goal tracking
- **Content Types**:
  - Projects with timelines and milestones
  - Active initiatives and tasks
  - Progress tracking and completion status
- **Integration**: Links to Efforts for execution-oriented work
- **Status**: ✅ Execution hub

#### **04-Sources** (References & Bibliography)
- **Purpose**: External sources, books, articles, and reference materials
- **Metadata**: Author, rating, creation date, source type
- **Function**: Curated reference library with annotations
- **Linking**: Connected to related atomic notes and projects
- **Status**: ✅ Reference library

#### **05-Calendar** (Temporal Notes)
- **Purpose**: Daily logs, weekly reviews, and periodic reflections
- **Content Types**:
  - Daily notes with task tracking
  - Weekly reviews and planning
  - Monthly retrospectives
  - Yearly goal setting
- **Integration**: Timeline-based journaling and progress tracking
- **Status**: ✅ Temporal awareness

#### **06-Archive** (Completed/Inactive)
- **Purpose**: Storage for completed projects and archived knowledge
- **Function**: Historical record and reference archive
- **Maintenance**: Automated archival of stale items
- **Protection**: Preserved knowledge for future reference
- **Status**: ✅ Historical preservation

#### **99-System** (Meta Management & Automation)
- **Purpose**: Vault infrastructure, templates, and automation scripts
- **Key Components**:
  - **CIS (Customization, Integration, System)**: Configuration standards
  - **Templates**: Pre-built note templates for consistency
  - **Plugins & Features**: Documentation and setup guides
  - **Copilot Prompts**: AI assistant custom prompts
  - **Hotkeys & Automation**: Workflow automation references
- **Status**: ✅ Infrastructure & tooling

### Secondary Organization Categories

The vault includes additional directories for flexible content organization:

| Category | Purpose | Files |
|----------|---------|-------|
| **Area** | Life/work areas grouping | Quick access |
| **Atomic** | Atomic notes alias | Duplicate organization |
| **Calendar** | Calendar-based storage | Date-driven access |
| **Concept** | Conceptual topics | Idea browsing |
| **Effort** | Project alias | Multiple view options |
| **Idea** | Brainstorm capture | Creative ideation |
| **Kanban** | Board-style project tracking | Visual management |
| **MOC** | Maps alias | Navigation alternatives |
| **Meeting** | Meeting notes | Discussion records |
| **People** | Contact & relationship notes | Network mapping |
| **Place** | Location-based notes | Geographic organization |
| **Prompt** | Prompt library | Quick-reference prompts |
| **+Inbox** | Entry point for all new items | Processing queue |

---

## 🔄 Workflow & Processes

### GTD-Inspired Daily Workflow

The vault implements a proven workflow for knowledge management:

```
📥 CAPTURE → 🔍 PROCESS → 🏗️ ORGANIZE → 🔗 CONNECT → 📊 REVIEW → 📦 ARCHIVE
```

#### 1️⃣ **Capture Phase** (Input)
- **Tool**: Quick Capture hotkey (Ctrl+N)
- **Target**: +Inbox folder
- **Process**: Rapid brain-dump with minimal friction
- **Tagging**: Minimal at capture stage
- **Status Tag**: `#📥inbox`

#### 2️⃣ **Process Phase** (Initial Assessment)
- **Frequency**: Daily (10-15 minutes)
- **Action**: Review inbox items and assess nature
- **Decision**: Determine next layer placement
- **Tagging**: Add preliminary tags and metadata
- **Status Tag**: `#🔄active` or `#📦archived`

#### 3️⃣ **Organize Phase** (Structural Placement)
- **Routing**: Send to appropriate layer (02-Dots, 03-Efforts, 04-Sources)
- **Templating**: Apply relevant template
- **Metadata**: Complete YAML frontmatter
- **Linking**: Begin connecting to related notes
- **Status Tag**: Content-specific tags

#### 4️⃣ **Connect Phase** (Relationship Building)
- **Frequency**: Weekly (during review)
- **Action**: Create links between related notes
- **MOCs**: Update navigation hubs
- **References**: Create bidirectional links
- **Insight**: Extract patterns and connections

#### 5️⃣ **Review Phase** (Reflection)
- **Daily**: 5-minute morning check-in
- **Weekly**: 30-minute structured review
- **Monthly**: 60-minute deep analysis
- **Quarterly**: Strategic alignment check
- **Metrics**: System health monitoring

#### 6️⃣ **Archive Phase** (Preservation)
- **Trigger**: Project completion or note stagnation (2+ weeks inactive)
- **Process**: Move to 06-Archive with timestamp
- **Preservation**: Maintain relationships and metadata
- **Access**: Remain searchable and referenceable
- **Status Tag**: `#📦archived`

### Weekly Review Checklist

- [ ] Process all inbox items (10 min)
- [ ] Review active projects for progress (10 min)
- [ ] Check stale items for archival (5 min)
- [ ] Update MOCs and navigation (10 min)
- [ ] Connect new insights to existing notes (10 min)
- [ ] Plan next week's efforts (5 min)

---

## 🏷️ Tagging & Metadata System

### Status Workflow Tags

The vault uses emoji-based status tags for clear visual identification:

```
📥 inbox → 🔄 active → ✅ completed → 📦 archived
```

#### Status Transitions
- **📥inbox**: Newly captured, not yet processed
- **🔄active**: Currently being worked on
- **⏳waiting**: Blocked or awaiting external action
- **✅completed**: Finished and closure achieved
- **📦archived**: Historical record or stale item

### Content Type Tags

Tags identify the nature and category of content:

| Tag | Layer | Meaning |
|-----|-------|---------|
| `#💡idea` | 02-Dots | Conceptual knowledge |
| `#🚀project` | 03-Efforts | Active initiatives |
| `#📚source` | 04-Sources | Reference material |
| `#📅daily` | 05-Calendar | Temporal entry |
| `#🤝meeting` | Special | Discussion records |
| `#🗺️moc` | 01-MOCs | Navigation hub |
| `#👤contact` | People | Person/entity |
| `#🏢place` | Place | Location |

### YAML Frontmatter Schema

Every note should include standardized metadata:

```yaml
---
title: "Note Title"
type: [atomic|project|source|moc|meeting]
status: [📥inbox|🔄active|⏳waiting|✅completed|📦archived]
created: YYYY-MM-DD
modified: YYYY-MM-DD
priority: [high|medium|low]
energy: [high|medium|low]
maturity: [📤seed|🌱seedling|🪴sapling|🌲evergreen|🍓fruit]
related: ["[[Link1]]", "[[Link2]]"]
tags: ["#tag1", "#tag2"]
---
```

#### Metadata Field Explanations

- **type**: Content category (determines primary storage)
- **status**: Current state in workflow (GTD-based)
- **priority**: Urgency level (high/medium/low)
- **energy**: Required effort or mental load
- **maturity**: Knowledge development stage (Evergreen framework)

---

## 🧩 Recommended Plugin Ecosystem

### 🔴 Essential Plugins (Core Functionality)

These plugins are **required** for the system to function as designed:

#### 1. **Templater**
- **Purpose**: Advanced template automation and script execution
- **Key Use**: Auto-populate dates, metadata, and dynamic content
- **Commands**: Ctrl+Alt+A for template application
- **Features**: JavaScript execution within templates

#### 2. **Dataview**
- **Purpose**: Dynamic database queries across all notes
- **Key Use**: System health dashboards and metric generation
- **Output**: Tables, lists, and calculated views
- **Features**: JavaScript for complex calculations

#### 3. **Tasks**
- **Purpose**: GTD-compatible task and checkbox management
- **Integration**: Recognizes task syntax across all notes
- **Features**: Due dates, recurrence, priority filtering

### 🟡 Recommended Plugins (Standard Workflow)

These plugins **significantly enhance** the standard workflow:

- **QuickAdd**: Rapid note creation and macro execution
- **Periodic Notes**: Automatic daily/weekly/monthly note generation
- **Commander**: Custom hotkey mapping and command creation
- **Auto Note Mover**: Automatic file routing based on tags/patterns

### 🟢 Optional Plugins (Enhancement)

These plugins provide quality-of-life improvements:

- **Advanced Tables**: Enhanced markdown table formatting
- **Omnisearch**: Global full-text search with preview
- **Style Settings**: Theme customization and CSS variable management
- **Calendar**: Visual calendar with date navigation

---

## 📈 System Health Monitoring

### Key Health Metrics

The vault includes automated health monitoring based on these indicators:

#### 1. **Inbox Health**
- **Target**: ≤20 items
- **Warning**: 21-40 items
- **Critical**: >40 items
- **Meaning**: Inbox processing is falling behind

#### 2. **Active Projects**
- **Target**: 1-7 projects
- **Warning**: <1 or >7 projects
- **Meaning**: Workload is unbalanced

#### 3. **Stale Projects**
- **Target**: 0 projects inactive >14 days
- **Warning**: 1-2 stale projects
- **Critical**: >2 stale projects
- **Meaning**: Active items need attention

#### 4. **Connection Density**
- **Target**: >70% notes with links
- **Warning**: 40-70% connected notes
- **Critical**: <40% connected notes
- **Meaning**: Knowledge is becoming isolated

#### 5. **Processing Rate**
- **Calculation**: (Items processed / Items captured) × 100
- **Target**: ≥80% weekly
- **Warning**: 60-80% processing rate
- **Critical**: <60% processing rate

### Health Score Formula

```
Health Score =
  (Inbox health: 25 pts) +
  (Projects balanced: 25 pts) +
  (No stale items: 25 pts) +
  (Notes well-connected: 25 pts)

Grade: 80+ = 🟢 Excellent | 60-80 = 🟡 Good | <60 = 🔴 Needs Attention
```

---

## 📂 Content Inventory

### Directory Breakdown

```
Origin Vault (44 MB, 416 files)
├── 00-Meta/              [Metadata & administration]
├── 01-MOCs/              [Navigation hubs]
├── 02-Dots/              [Atomic notes & concepts]
│   ├── 100-Atomics/      [Single-idea notes]
│   ├── 200-Areas/        [Life/work areas]
│   └── 300-Concepts/     [Topic collections]
├── 03-Efforts/           [Projects & tasks]
├── 04-Sources/           [Reference library]
├── 05-Calendar/          [Temporal entries]
│   ├── Daily/            [Daily logs]
│   ├── Weekly/           [Weekly reviews]
│   └── Monthly/          [Monthly retrospectives]
├── 06-Archive/           [Historical records]
├── 99-System/            [System infrastructure]
│   ├── Templates/        [Note templates]
│   ├── CIS/              [Configuration standards]
│   ├── Plugins/          [Plugin documentation]
│   └── Hotkeys/          [Hotkey references]
└── [Secondary categories] [Flexible organization]
```

### Key System Files

| File | Purpose | Type |
|------|---------|------|
| `README.md` | System documentation (Czech) | Guide |
| `👁️Dashboard.md` | Real-time health dashboard | MOC |
| `+About.md` | Vault introduction | Info |
| `+About Templates.md` | Template documentation | Guide |
| `Overview of Data.base` | Obsidian database config | Config |

---

## 🚀 Workflow Templates

### Hotkey Quick Reference

| Action | Shortcut | Template |
|--------|----------|----------|
| Quick Capture | Ctrl+N | Quick Capture - Inbox |
| Daily Note | Ctrl+Shift+D | Template Daily |
| New Project | Ctrl+P | E-Full-Template |
| New Source | Ctrl+S | S-Full-Template |
| New Atomic | Ctrl+A | A-Full-Template |

### Sample Daily Workflow

```
🌅 Morning (5 min)
  → Ctrl+Shift+D [Create daily note]
  → Review Dashboard for priority items
  → Check inbox count

📅 During Day (As needed)
  → Ctrl+N [Capture new ideas]
  → Update task status in daily note
  → Log key insights

🌆 Evening (10 min)
  → Review completed tasks
  → Archive finished items
  → Capture learnings

📅 Weekly (30 min - Usually Sunday)
  → Full inbox processing
  → Project status review
  → Create new MOC connections
  → Archive stale items
```

---

## ✨ Key Features & Strengths

### 1. **Comprehensive Information Architecture**
- ✅ 8-layer structure prevents note chaos
- ✅ Clear progression from capture to archive
- ✅ Scalable to thousands of notes

### 2. **Standardized Metadata**
- ✅ Consistent frontmatter across all notes
- ✅ Enables reliable filtering and querying
- ✅ Supports automated workflows

### 3. **GTD Integration**
- ✅ Proven productivity methodology built-in
- ✅ Status workflow ensures nothing falls through cracks
- ✅ Review cycle prevents stagnation

### 4. **Knowledge Connection**
- ✅ MOC system enables thinking about thinking
- ✅ Zettelkasten-inspired atomic notes
- ✅ Dataview enables emergent organization

### 5. **Automation Ready**
- ✅ Template system reduces friction
- ✅ Hotkeys for rapid access
- ✅ Scripts for routine tasks

### 6. **Extensible Design**
- ✅ Plugin architecture allows customization
- ✅ Naming conventions enable predictable expansion
- ✅ Open structure encourages experimentation

---

## 🎯 Implementation Maturity

### Development Status by Version

#### v1.8.0 (Current - Starter Pack)
- ✅ 8-layer folder structure complete
- ✅ GTD-inspired tagging system
- ✅ Templater automation foundations
- ✅ Dataview dashboard system
- ✅ Cross-vault sync mechanism
- ✅ Comprehensive documentation
- 🛠️ In Progress:
  - Enhanced search with Omnisearch
  - Visual infographics for MOCs
  - Auto Note Mover tag-based rules

#### Planned Features (v2.1+)
- [ ] AI-enhanced auto-tagging
- [ ] Git backup setup
- [ ] Performance metrics dashboard
- [ ] Automated MOC generation
- [ ] Web app for mobile capture
- [ ] Semantic search across vaults
- [ ] Knowledge graph visualization
- [ ] Team collaboration features

---

## 📊 Statistics & Analysis

### Content Distribution

```
Total Files: 416
├── Markdown Notes: 414 files
├── Configuration: 2 files
└── By Layer:
    ├── 00-Meta:       ~30 files
    ├── 01-MOCs:       ~25 files
    ├── 02-Dots:       ~120 files (includes atomics & concepts)
    ├── 03-Efforts:    ~40 files
    ├── 04-Sources:    ~80 files
    ├── 05-Calendar:   ~70 files
    ├── 06-Archive:    ~20 files
    └── 99-System:     ~130 files (templates & infrastructure)
```

### Content Metrics

| Metric | Value | Interpretation |
|--------|-------|-----------------|
| **Total Lines** | 38,774 | Rich, detailed vault |
| **Avg File Size** | 93 lines | Well-scoped notes |
| **Vault Size** | 44 MB | Mature system with assets |

---

## 🛠️ Customization & Optimization

### Quick Wins (Easy Customizations)

1. **Adjust GTD Status Colors**
   - Modify emoji in status definitions
   - Match your visual preferences

2. **Customize Hotkey Bindings**
   - Edit `.obsidian/hotkeys.json`
   - Add shortcuts for frequent commands

3. **Personalize Area Categories**
   - Rename 02-Dots/200-Areas
   - Match your life domains

4. **Update Template Defaults**
   - Modify 99-System/Templates
   - Add personal metadata fields

### Performance Optimizations

1. **Exclude Archive from Search**
   - Settings → Files & Links → Excluded paths
   - Add: `06-Archive/**`

2. **Use Folder-Specific Searches**
   - In Dataview: `FROM "02-Dots/100-Atomics"`
   - Faster queries on large vaults

3. **Regular Cleanup Schedule**
   - Monthly: Remove unused templates
   - Quarterly: Archive stale items
   - Annually: Large refactoring

---

## ⚠️ Maintenance Checklist

### Daily (5 minutes)
- [ ] Process inbox items (keep below 20)
- [ ] Capture any new ideas
- [ ] Check for overdue tasks

### Weekly (30 minutes)
- [ ] Full inbox processing
- [ ] Project status review
- [ ] Update MOC navigation
- [ ] Create new connections
- [ ] Archive completed items

### Monthly (60 minutes)
- [ ] Review all metrics
- [ ] Clean up unused tags
- [ ] Check plugin updates
- [ ] Backup system configuration
- [ ] Archive old journal entries

### Quarterly (120 minutes)
- [ ] Strategic review
- [ ] Refactor if needed
- [ ] Update documentation
- [ ] Plan next quarter
- [ ] Technology audit

---

## 🎓 Best Practices

### 1. **One Idea Per Atomic Note**
- Keep Dots/100-Atomics very focused
- Link between atomics for context
- Update maturity as understanding deepens

### 2. **Consistent Status Tagging**
- Always use the 6 status tags
- Update status during reviews
- Never leave items in "🔄active" indefinitely

### 3. **Regular MOC Updates**
- Update MOCs during weekly reviews
- Reflect new connections discovered
- Keep navigation current and useful

### 4. **Metadata Discipline**
- Never skip YAML frontmatter
- Keep dates in YYYY-MM-DD format
- Maintain relationship links

### 5. **Archive Regularly**
- Don't let 06-Archive become a dump
- Maintain relationships even in archive
- Use folder structure within archive

### 6. **Review the Review**
- Track your review pattern
- Adjust frequency if needed
- Celebrate consistency wins

---

## 🔮 Vision & Philosophy

### The Second Brain Concept

Origin is designed to be a **digital extension of your thinking**. Key principles:

1. **Capture Everything**
   - Lower friction for input
   - Process later with intention
   - Never lose ideas to forgetfulness

2. **Process with Purpose**
   - Thoughtful categorization
   - Meaningful connections
   - Clear next actions

3. **Develop Over Time**
   - Maturity progression (seed → fruit)
   - Layered understanding
   - Emergent insights

4. **Protect for Future**
   - Archive completed knowledge
   - Maintain searchability
   - Enable retrieval when needed

---

## 🤝 Community & Support

### Resources Included
- **📖 README.md** (Czech): Complete system documentation
- **👁️Dashboard.md**: Real-time system monitoring
- **99-System/**: Comprehensive infrastructure and templates

### Getting Help
- **Forum**: Obsidian community forums
- **Discord**: Obsidian community server
- **Reddit**: r/ObsidianMD and r/PKM
- **GitHub**: Report issues and contribute

### Contributing
- Fork the repository
- Create feature branch: `git checkout -b feature/amazing-feature`
- Test on clean vault
- Submit pull request

---

## 📋 Quick Reference

### File Naming Conventions

| Convention | Example | Use Case |
|-----------|---------|----------|
| `+Prefix` | `+Inbox`, `+About` | System folders & files |
| `-` Separator | `Daily-Review`, `GTD-System` | Multi-word clarity |
| Emoji Prefix | `👁️Dashboard`, `🗺️My PKM MOC` | Visual identification |
| Date Format | `2026-01-02` | ISO 8601 standard |

### Folder Structure Philosophy

1. **Numbered Folders (00-99)** = Processing layers
2. **No Numbers** = Flexible organization
3. **Subdirectories** = Content categorization
4. **+Prefix** = System/special folders

### Tag Syntax

```
Status: #📥inbox #🔄active #⏳waiting #✅completed #📦archived
Content: #💡idea #🚀project #📚source #🤝meeting #🗺️moc
Energy: #⚡high #📊medium #🐢low
Maturity: #📤seed #🌱seedling #🪴sapling #🌲evergreen #🍓fruit
```

---

## 📞 Next Steps

### For New Users
1. **Explore** the structure: Open each main folder
2. **Read**: Review README.md and Dashboard
3. **Setup**: Install recommended plugins
4. **Customize**: Adjust hotkeys and templates
5. **Start**: Begin with inbox capture workflow

### For Experienced PKM Users
1. **Audit**: Map existing system to Origin layers
2. **Migrate**: Convert old vaults systematically
3. **Integrate**: Connect with other tools (calendar, todo apps)
4. **Optimize**: Create custom dashboards
5. **Share**: Contribute improvements back

### For Teams
1. **Adapt**: Modify for shared vs. personal content
2. **Security**: Set up appropriate access controls
3. **Sync**: Configure Git or Obsidian Sync
4. **Standards**: Document team conventions
5. **Support**: Provide training and resources

---

## 📊 Report Metadata

| Item | Value |
|------|-------|
| **Report Date** | January 2, 2026 |
| **Vault Version** | 1.8.0 |
| **Obsidian Minimum** | v1.9.0 |
| **Total Sections** | 15+ |
| **Recommendations** | 20+ |
| **Next Review** | Quarterly |

---

> **"Origin is not just a vault for notes. It's a vault for thinking about notes."**

*A comprehensive personal knowledge management system designed for creative professionals, knowledge workers, and lifelong learners.*

---

**Report Generated**: January 2, 2026
**System Health**: 🟢 Ready for Use
**Documentation**: Complete
**Ready for Production**: Yes ✅

