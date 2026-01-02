---
up: "[[Templates]]"
title: Templates-About
type: about
status: 🔄active
tags:
  - 📝template
  - 📋about
  - 🏠system
created: 2025-09-30
modified: 2025-09-30
related:
  - "[[🔁My PKM Workflows]]"
  - "[[🔢My PKM Metadata]]"
  - "[[👁️Dashboard]]"
  - "[[🏛️My PKM Governance]]"
---

⬆️:: [[🏡Home]]

# About Templates

The template system provides **structured note creation** that integrates seamlessly with your PKM workflow. Each template is designed for **speed, consistency, and automated processing** while maintaining the flexibility needed for different contexts.

## 📋 Template Ecosystem Overview

### **Content Templates** (What you create)
| Template    | Purpose          | Location             | Integration              |
| ----------- | ---------------- | -------------------- | ------------------------ |
| **Atomic**  | Ideas & insights | `02-Dots/`           | MOCs, daily reflection   |
| **Source**  | External content | `04-Sources/`        | Knowledge extraction     |
| **Effort**  | Projects & goals | `03-Efforts/`        | Areas, progress tracking |
| **Area**    | Life domains     | `02-Dots/200-Areas/` | Monthly reviews, balance |
| **MOC**     | Knowledge maps   | `01-MOCs/`           | Navigation, overview     |
| **Meeting** | Discussions      | `03-Efforts/`        | Action items, follow-up  |

### **Temporal Templates** (When you create)
| Template | Purpose | Frequency | Navigation |
|----------|---------|-----------|-----------|
| **Daily** | Focus & reflection | Every day | Calendar plugin, hotkeys |
| **Weekly** | Progress review | Every week | Periodic notes automation |
| **Monthly** | Strategic assessment | Every month | Areas review cycle |
| **Quarterly** | Major initiatives | Every quarter | OKR planning |
| **Yearly** | Vision & themes | Every year | Annual review |

### **Context Templates** (How you create)
| Template | Purpose | Context | Trigger |
|----------|---------|---------|---------|
| **Mobile-Atomic** | iPhone capture | On-the-go ideas | Siri shortcuts |
| **Mobile-Daily** | Phone check-ins | Commute, breaks | Quick access |
| **Voice-Note** | Audio capture | Walking, driving | Voice memos |
| **Quick-Effort** | Rapid project setup | Meeting outcomes | Mobile creation |

## 🎯 Template Selection Logic

### **Content Decision Tree**
```
New Information → Type?  
├── 💡 Personal insight → Atomic Template  
├── 📚 External source → Source Template  
├── 🚀 Actionable project → Effort Template  
├── 🏠 Life area focus → Area Template  
├── 🗺️ Topic overview → MOC Template  
└── 🤝 Discussion record → Meeting Template
```
### **Context Decision Tree**
```
Creation Context → Template Variant?  
├── 📱 Mobile device → Mobile-optimized version  
├── 🎤 Voice capture → Voice-note template  
├── ⚡ Quick capture → Minimal version  
└── 🖥️ Desktop deep work → Full template
```


## 🔄 Template Integration Points

### **Workflow Connections**
- **Daily Notes** → Check Efforts progress → Update Areas attention
- **Source Templates** → Extract to Atomic notes → Connect to MOCs
- **Effort Templates** → Link to Areas → Track in weekly reviews
- **Area Templates** → Monthly reviews → Strategic planning
- **MOC Templates** → Knowledge navigation → Learning paths

### **Automation Bridges**
- **Templater** → Auto-fills dates, suggests content
- **YAML Orchestrator** → Maintains metadata consistency  
- **Dataview** → Dynamic queries pull template data
- **Periodic Notes** → Calendar templates auto-apply
- **QuickAdd** → Context-aware template selection

### **Cross-Reference Network**
- **Areas ↔ Efforts** → Life domains connect to projects
- **Sources ↔ Atomics** → External content becomes insights
- **MOCs ↔ All Types** → Knowledge maps reference everything
- **Daily ↔ Everything** → Time-based view of all activity

## 📱 Mobile Optimization Strategy

### **Design Principles**
- **Minimal friction** → Fastest possible capture
- **Essential fields only** → Reduce cognitive load
- **Voice-first design** → Leverage iPhone capabilities
- **Desktop processing** → Mobile captures, desktop develops

### **Mobile Template Features**
- **Reduced metadata** → Only critical fields
- **Voice prompts** → Structured voice capture
- **Quick tags** → `#📱mobile` for processing identification
- **Smart defaults** → Status: inbox, priority: normal
- **Processing flags** → `#🧹tidy` for later cleanup

## 🎯 Template Selection Decision Tree

## **What are you creating?**

**🆕 New Complete Note**
```
💡 Idea/Insight         → New-Notes/Atomic-Template.md
📚 External Source      → New-Notes/Source-Template.md  
🚀 Project/Goal         → New-Notes/Effort-Template.md
🏠 Life Domain          → New-Notes/Area-Template.md
🗺️ Knowledge Map       → New-Notes/MOC-Template.md
🤝 Meeting/Discussion   → New-Notes/Meeting-Template.md
📅 Daily Planning       → New-Notes/Daily-Template.md
📅 Weekly Review        → New-Notes/Weekly-Template.md
📅 Monthly Strategy     → New-Notes/Monthly-Template.md
📱 Mobile Quick Note    → New-Notes/Mobile-Atomic.md
```

**➕ Add to Existing Note**
```
📊 Progress Section     → Add-Sections/Progress-Section.md
💭 Reflection Headers   → Add-Sections/Reflection-Section.md
🔗 Links Section        → Add-Sections/Links-Section.md
📋 Meeting Table        → Add-Sections/Meeting-Table.md
📍 Navigation Block     → Add-Sections/Navigation-Block.md
```

**⚡ Quick Insert**
```
📊 Status Buttons       → Quick-Inserts/Status-Buttons.md
🔥 Priority Tags        → Quick-Inserts/Priority-Tags.md
📅 Date Shortcuts       → Quick-Inserts/Date-Shortcuts.md
🔗 Common Links         → Quick-Inserts/Common-Links.md
```

**🤖 Run Script/Automation**
```
🔧 YAML Processing      → Scripts/YAML-Functions.md
📅 Date Calculations    → Scripts/Date-Calculations.md
📁 File Operations      → Scripts/File-Operations.md
✨ Content Generation   → Scripts/Content-Helpers.md
```


```
Templates/
│
├── 📝 New-Notes/                    # Complete note creation
│   ├── Atomic-Template.md          # Ideas & insights
│   ├── Source-Template.md          # External content  
│   ├── Effort-Template.md          # Projects & goals
│   ├── Area-Template.md            # Life domains
│   ├── MOC-Template.md             # Knowledge maps
│   ├── Meeting-Template.md         # Discussions
│   ├── Daily-Template.md           # Daily planning
│   ├── Weekly-Template.md          # Weekly reviews
│   ├── Monthly-Template.md         # Monthly strategy
│   └── Mobile-Atomic.md            # Quick mobile capture
│
├── ➕ Add-Sections/                 # Content blocks for existing notes
│   ├── Progress-Section.md         # Progress tracking
│   ├── Reflection-Section.md       # Daily/weekly reflection
│   ├── Links-Section.md            # Related links
│   ├── Meeting-Table.md            # Meeting participants/agenda
│   ├── Navigation-Block.md         # MOC/Calendar navigation
│   └── Review-Block.md             # Areas review structure
│
├── ⚡ Quick-Inserts/                # One-liners and snippets
│   ├── Status-Buttons.md           # 📥→🔄→✅ progression
│   ├── Priority-Tags.md            # 🔥🔴🟡🟢 priority markers
│   ├── Date-Shortcuts.md           # Today/tomorrow/week links
│   ├── Common-Links.md             # Dashboard/Areas/Efforts
│   └── Emoji-Sets.md               # Consistent icon usage
│
└── 🤖 Scripts/                     # Templater automation
    ├── YAML-Functions.md           # Metadata processing
    ├── Date-Calculations.md        # Calendar operations
    ├── File-Operations.md          # Bulk actions
    ├── Link-Generators.md          # Auto-link creation
    └── Content-Helpers.md          # Smart content assistance

```
## **Not Sure? Ask These Questions**

- **Creating a whole note?** → `New-Notes/`
- **Adding to existing note?** → `Add-Sections/`
- **Need quick element?** → `Quick-Inserts/`
- **Want automation?** → `Scripts/`

This gives you **crystal clear organization** with **obvious paths** to the right template!


## 🔗 Related

- [[🏛️My PKM Governance]] - Template standards and rules  
- [[🔁My PKM Workflows]] - Daily template usage patterns
- [Link for documentation](https://silentvoid13.github.io/Templater/introduction.html)
- [[👤 Templater Guide]]
- [[Templater Handbook 2025]]
- [[abbreviations|Use naming like these]]


---
#🧹tidy  Dont know how happened to be v2 but check out 

  ---

# About Templates_ Advanced note

> [!tip]+ **⚡ Quick Reference**
> **What**: Your standardized note creation system - consistent structures, automated metadata, and friction-free capture  
> **Why**: Ensure consistency, reduce cognitive load, enable automation, and accelerate note creation  
> **How**: Design → Standardize → Automate → Use → Evolve  
> **When**: Every note creation, template reviews monthly, evolution quarterly  
> **Where**: 00-META/Templates with Templater integration for automation  
> **Success**: Sub-2-minute note creation, 100% metadata consistency, effortless structure
>
> **📝 Next Action**: Use appropriate template for your next note or identify missing template need

---

## 🎯 What Templates Are

> [!abstract]+ **Your Note Creation Intelligence System**
> Templates provide the standardized foundation for every note type in your PKM system - from Efforts and Sources to Daily Notes and Meeting records. They ensure consistency, automate metadata creation, and eliminate the "blank page" problem by providing proven structures.
>
> **Not Just Structure** - Templates include automation, prompts, and intelligent defaults  
> **Not Rigid Constraints** - Templates provide foundation that can be adapted per specific need

---

## 📖 Template Portfolio Overview

### **📊 Universal Template Components**

> [!info]+ **🎯 Every Template Includes**
> **Standard YAML Front-matter**:
> ![[🔢My PKM Metadata#base YAML Properties (Dublin Core inspired)]]
> 
> **Consistent Structure Elements**:
> - Quick Reference callout for immediate context
> - Purpose/goal clarity section
> - Progress tracking or status indicators
> - Connection prompts for linking
> - Next action or follow-up sections

### **🗂️ Template Types by Category**

> [!example]+ **📋 Complete Template Inventory**
> **Core Content Templates**:
> - `Effort-Template.md` - Project and initiative structure
> - `Source-Template.md` - External knowledge processing
> - `Dot-Template.md` - Universal template for Dots system
> - `Atomic-Template.md` - Atomic insights and concepts
> - `Area-Template.md` - Life domain management
> - `MOC-Template.md` - Maps of Content navigation
>
> **Specialized Knowledge Templates**:
> - `Person-Template.md` - Relationship intelligence
> - `Place-Template.md` - Geographic knowledge
> - `Tool-Template.md` - Capability enhancement tracking
> - `Media-Template.md` - Multimedia learning processing
> - `Knowledge-Template.md` - Formal learning documentation
> - `Guide-Template.md` - Step-by-step process documentation
>
> **Time-Based Templates**:
> - `Daily-Note-Template.md` - Daily reflection and planning
> - `Meeting-Template.md` - Meeting capture and follow-up
> - `Weekly-Review-Template.md` - Weekly reflection structure
> - `Monthly-Review-Template.md` - Monthly strategic planning
>
> **System Templates**:
> - `About-Template.md` - System documentation structure
> - `Archive-Template.md` - Intelligent archiving process
> - `Prompt-Template.md` - AI interaction documentation

---

## 🩺 Template Health Diagnostics

### **🔴 Red Flags - Template System Breakdown**

> [!danger]+ **Critical Template Issues**
> - ❌ **Template Abandonment** - Creating notes without templates for 1+ week
> - ❌ **Metadata Chaos** - Inconsistent or missing metadata across note types
> - ❌ **Outdated Templates** - Templates not updated for 6+ months despite system changes
> - ❌ **Automation Failure** - Templater scripts not working, manual metadata entry
> - ❌ **Structure Drift** - Notes varying significantly from template structure

### **🟡 Yellow Warnings - Template Optimization Needed**

> [!warning]+ **Template Efficiency Issues**
> - ⚠️ **Template Gaps** - Note types lacking dedicated templates
> - ⚠️ **Overcomplex Structure** - Templates so detailed they discourage use
> - ⚠️ **Poor Adoption** - Some templates rarely used despite relevant note types
> - ⚠️ **Automation Gaps** - Manual steps that could be automated
> - ⚠️ **Inconsistent Evolution** - Some templates updated while others lag behind

### **🟢 Green Health Indicators**

> [!success]+ **Optimized Template System**
> - ✅ **Universal Adoption** - All notes created using appropriate templates
> - ✅ **Automation Excellence** - Metadata and structure generated automatically
> - ✅ **Living Evolution** - Templates regularly refined based on usage patterns
> - ✅ **Effortless Creation** - Note creation consistently under 2 minutes
> - ✅ **Intelligent Prompts** - Templates guide thinking and ensure comprehensive capture

---

## 🔮 Template Intelligence & Design Patterns

### **Template Design Success Patterns**

> [!note]+ **📊 What Makes Templates Effective**
> - **Progressive Disclosure**: Essential fields first, optional details later increases adoption by 85%
> - **Contextual Prompts**: Questions that guide thinking improve note quality by 70%
> - **Automation Balance**: Automating 80% while leaving 20% flexible optimizes satisfaction
> - **Quick Reference**: Summary sections enable faster note scanning and usage
> - **Connection Cues**: Built-in prompts for linking increase knowledge network density by 60%
> - **Evolution Signals**: Templates that capture their own usage data improve 3x faster

### **Template Automation Intelligence**

> [!info]+ **📈 Templater Integration Patterns**
> **Metadata Automation**:
> - **Auto-dates**: `created: <% tp.date.now() %>` eliminates manual date entry
> - **Smart titles**: Auto-generate from filename or prompt for custom titles
> - **Tag suggestions**: Context-aware tag prompts based on template type
> - **Status defaults**: Intelligent status based on template type (inbox for captures, active for efforts)
>
> **Dynamic Content Generation**:
> - **Related note suggestions**: Auto-populate based on current context or tags
> - **Template branching**: Different structures based on user input or context
> - **Quick capture modes**: Minimal templates for rapid idea capture
> - **Review scheduling**: Auto-generate review dates based on note type and priority
>
> **Intelligence Integration**:
> - **Dashboard queries**: Templates designed to work with specific dashboard views
> - **Workflow triggers**: Templates that initiate specific workflow processes
> - **Archive preparation**: Templates that facilitate easy archiving when complete
> - **Pattern recognition**: Templates that capture data for system analytics

### **Template Evolution Patterns**

> [!info]+ **📊 Template Lifecycle Management**
> **🌱 Template Creation (Week 1-2)**:
> - Identify need through repeated manual note creation patterns
> - Draft basic structure with essential fields and prompts
> - Test with 3-5 actual notes to validate structure
> - Success Metric: Template reduces note creation time by 50%+
>
> **🪴 Template Optimization (Month 1-3)**:
> - Add automation for metadata and common content
> - Refine prompts based on actual usage patterns
> - Integrate with existing queries and workflows
> - Success Metric: Template adoption reaches 90%+ for relevant notes
>
> **🌲 Template Maturity (Month 3+)**:
> - Advanced automation and intelligent defaults
> - Deep integration with system workflows and analytics
> - Template generates usage data for continuous improvement
> - Success Metric: Template enhances thinking, not just structure

---

## 🔄 Template Management Workflows

### **Daily Template Usage** (Integrated into note creation)

> [!gear]+ **📝 Frictionless Note Creation**
> **Template Selection Process**:
> - Quick access via Templater hotkeys or QuickAdd commands
> - Context-aware template suggestions based on current work
> - Default templates for common note types (daily, meeting, capture)
>
> **Quality Assurance**:
> - Quick metadata completeness check during creation
> - Connection prompts completed before finalizing note
> - Status and tag accuracy verification

### **Monthly Template Review** (20 minutes)

> [!star]+ **🔄 Template Performance Assessment**
> **Usage Pattern Analysis** (10 minutes):
> - Which templates used most/least frequently?
> - What note types created without templates?
> - Where do users skip template sections or add custom content?
> - What automation is working vs. causing friction?
>
> **Template Enhancement Planning** (10 minutes):
> - Identify highest-impact template improvements
> - Plan automation enhancements for frequently used templates
> - Update templates based on system evolution (new metadata, workflows)
> - Create new templates for emerging note patterns

### **Quarterly Template Evolution** (60 minutes)

> [!milestone]+ **🏗️ Strategic Template Architecture**
> **Template Portfolio Assessment** (30 minutes):
> - Evaluate template coverage across all note types
> - Assess template complexity vs. adoption rates
> - Review automation reliability and enhancement opportunities
> - Analyze template contribution to overall system efficiency
>
> **Strategic Template Planning** (30 minutes):
> - Plan major template architecture improvements
> - Design templates for new system capabilities or workflows
> - Optimize template integration with queries, dashboards, automation
> - Create template documentation and training materials

---

## 🎯 Template Philosophy & Design Principles

> [!quote]+ **💡 Template Philosophy**
> **"Templates should disappear into workflow - providing structure without constraining thinking."**
>
> ### **Core Design Principles**
> - **Friction Reduction** - Templates make note creation faster and easier, never slower
> - **Thinking Enhancement** - Templates guide and improve thinking through structured prompts
> - **Consistency Enablement** - Templates ensure system-wide consistency without rigidity
> - **Automation Foundation** - Templates provide structure that enables powerful automation
> - **Evolution Capability** - Templates adapt and improve based on actual usage patterns
>
> ### **Template Development Guidelines**
> - **Start Minimal** - Begin with essential structure, add complexity only when proven valuable
> - **Automate Intelligently** - Automate metadata and routine content while preserving creative flexibility
> - **Prompt Thoughtfully** - Include questions that guide better thinking and more complete capture
> - **Connect Systematically** - Build in connection prompts and related note suggestions
> - **Measure Usage** - Track template effectiveness and evolution opportunities

---

## 🚀 Template Mastery Development

> [!rocket]+ **🎬 Build Template Excellence**
> 
> ### **Week 1: Template Foundation Audit**
> - **Day 1-2**: Review current template coverage and identify gaps
> - **Day 3-4**: Test existing templates for ease of use and adoption
> - **Day 5-6**: Assess metadata consistency across notes created with templates
> - **Day 7**: Create template improvement priority list
> 
> ### **Week 2-4: Template Optimization Implementation**
> - **Enhance highest-use templates** with better automation and prompts
> - **Create missing templates** for common note types lacking structure
> - **Implement Templater automation** for metadata and routine content
> - **Test template improvements** with real note creation scenarios
> 
> ### **Month 2+: Advanced Template Intelligence**
> - **Develop dynamic templates** that adapt based on context or user input
> - **Create template analytics** to track usage patterns and effectiveness
> - **Build template teaching materials** for sharing with PKM community
> - **Integrate templates** deeply with dashboard queries and system workflows

---

## 📊 Template Success Metrics

### **Template Performance Indicators**

> [!info]+ **📈 Template Effectiveness Measurement**
> **Adoption Metrics**:
> - **Template Usage Rate**: Percentage of notes created using appropriate templates
> - **Note Creation Speed**: Average time from template selection to completed note
> - **Metadata Consistency**: Percentage of notes with complete, correct metadata
> - **User Satisfaction**: Subjective experience of template-based note creation
>
> **Quality Metrics**:
> - **Note Completeness**: Average percentage of template sections completed
> - **Connection Density**: Average number of links created through template prompts
> - **Review Efficiency**: Time saved in note review due to consistent structure
> - **System Integration**: Percentage of template-created notes that work with queries/dashboards
>
> **Evolution Metrics**:
> - **Template Updates**: Frequency of template improvements based on usage
> - **Automation Advancement**: Percentage of manual template tasks automated over time
> - **Coverage Expansion**: Number of new note types receiving template support
> - **Community Contribution**: Templates shared and adopted by others

---

## 🔗 Integration Network

**Core System Connections:**
- [[+About Systemℹ️]] → Templates as foundation of consistent system operation
- [[🏛️My PKM Governance]] → Template standards and metadata schema enforcement
- [[🔁My PKM Workflows]] → Templates integrated into daily capture and review processes
- [[👁️Dashboard]] → Template-created notes designed to work with system queries
- [Link for documentation](https://silentvoid13.github.io/Templater/introduction.html)
- [[👤 Templater Guide]]
- [[Templater Handbook 2025]]
- [[abbreviations|Use naming like these]]

**Automation Connections:**
- **Templater Scripts** → Advanced automation for metadata and content generation
- **QuickAdd Integration** → Rapid template access and context-aware suggestions
- **Dataview Queries** → Templates designed to support dynamic content views
- **Plugin Ecosystem** → Template integration with calendar, tasks, and other plugins

**Evolution Connections:**
- **Usage Analytics** → Template performance tracking and optimization opportunities
- **User Feedback** → Template improvement based on actual usage friction and success
- **System Evolution** → Templates adapt to support new PKM capabilities and workflows
- **Community Knowledge** → Template design patterns shared with PKM community

---

*Last Updated: 2025-09-30 | Status: 🔄Enhanced | Next Review: Monthly | Health: 🟢 Structure-Driven*