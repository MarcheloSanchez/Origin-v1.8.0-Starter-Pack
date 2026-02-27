---
title: PKM Tags System
type: system
tags:
  - ⚙️system
  - 🏷️tags
  - 📋documentation
status: 🔄active
created: 2025-09-30
modified: 2025-09-30
related:
  - "[[🔢My PKM Metadata]]"
  - "[[🔁My PKM Workflows]]"
  - "[[📁My PKM Folders]]"
  - "[[Tags - Status Check]]"
---
> [!orbit] Wayfinder | [[🗺️My PKM MOC]] | [[🏛️My PKM Governance]] | [[🔢My PKM Metadata]] | [[🔍My PKM Queries]] |  [[📁My PKM Folders]] | 🏷️My PKM Tags |  [[🔁My PKM Workflows]] | [[✅My PKM Tasks]] | [[ℹ️My PKM Naming Convention]]

⬆️:: [[🏡Home]]

## 💡 Content Type Tags  
🗂️ `#💡atomic`, `#🚀effort`, `#📚source`, `#🗺️MOC`, `#🤝meeting`

## 🔄 Workflow Status Tags  
📥 → 🔄 → ⏳ → ✅ → 📦  

## 🌱 Development Lifecycle  
📤 → 🌱 → 🧹 → ⚗️ → 🌲  

## Maturity Evolve
📤 → 🌱 → 🪴 → 🌲 →  🍓

## ⚡ Priority & Context  
🔥 → ⚡ → 💤 → 🎯  

## 🧭 Domain & Topic  


# Overview of active tags 
```dataview
TABLE WITHOUT ID
tag as "🏷️ Tag",
length(rows) as "Usage Count",
join(rows.file.link, ", ") as "Files Using It"
FROM ""
FLATTEN file.tags as tag
WHERE !contains(tag, "system")
GROUP BY tag
SORT length(rows) DESC
LIMIT 20
```


## many notes query

```dataview
TABLE WITHOUT ID
file.link as "⚠️ Over-Tagged Notes",
length(file.tags) as "Count"
FROM ""
WHERE length(file.tags) > 10
SORT length(file.tags) DESC
LIMIT 15
```
### 🧮 Tag Usage Summary
```dataview

TABLE WITHOUT ID
tag as "🏷️ Tag",
length(rows) as "Usage Count",
join(rows.file.link, ", ") as "Used In"
FROM ""
FLATTEN file.tags as tag
GROUP BY tag
SORT length(rows) DESC
LIMIT 25
```
### ⚠️ Orphan Tags (Unused)
```dataview

TABLE WITHOUT ID
tag as "Tag",
length(rows) as "Usage Count"
FROM ""
FLATTEN file.tags as tag
GROUP BY tag
WHERE length(rows) < 3
SORT length(rows) ASC
LIMIT 20

```

# 🏷️ PKM Tags System

> [!info]+ **⚡ Tags Overview**
> **Purpose**: Multi-dimensional knowledge organization beyond folder hierarchy  
> **Philosophy**: Tags complement folders - folders = location, tags = attributes  
> **Automation**: Template-based auto-tagging + hotkey favorites  
> **Maintenance**: Quarterly tag audit and pruning

---

## 🎯 Tag System Philosophy

```mermaid
graph TB  
A[📁 Folders] -->|WHERE| D[Note Location]  
B[🏷️ Tags] -->|WHAT/HOW/WHEN| D  
C[📊 Metadata] -->|STRUCTURED DATA| D  
D --> E[🔍 Multi-Path Discovery]  
E --> F[💡 Insights]
```


### **Core Principles**

> [!success]+ **Tagging Best Practices**
> - ✅ **Folders answer WHERE** - Physical location
> - ✅ **Tags answer WHAT/HOW/WHEN** - Attributes and context
> - ✅ **Emoji-First** - Visual scan-ability (optional text after)
> - ✅ **Hierarchical When Needed** - Use `/` for sub-categories
> - ✅ **Template Auto-Tagging** - Reduce manual overhead
> - ✅ **Regular Pruning** - Remove unused tags quarterly

---

## 📊 Complete Tag Taxonomy

### **🗂️ 1. Content Type Tags**

> [!note]+ **Purpose**
> Identify note type quickly, especially for notes outside their standard folders

| Tag | Emoji | Primary Folder | Use Case | Auto-Tagged |
|-----|-------|---------------|----------|-------------|
| `#💡atomic` | 💡 | `02-Dots/100-Atomics` | Knowledge atoms, concepts | ✅ Template |
| `#🚀effort` | 🚀 | `03-Efforts` | Projects and active work | ✅ Template |
| `#📚source` | 📚 | `04-Sources` | External reference material | ✅ Template |
| `#🗺️MOC` | 🗺️ | `01-MOCs` | Maps of Content, topic hubs | ✅ Template |
| `#🤝meeting` | 🤝 | `04-Sources/Meetings` | Meeting notes | ✅ Template |
| `#📅daily` | 📅 | `05-Calendar/Daily` | Daily notes | ✅ Periodic Notes |
| `#📅weekly` | 📅 | `05-Calendar/Weekly` | Weekly reviews | ✅ Periodic Notes |
| `#📅monthly` | 📅 | `05-Calendar/Monthly` | Monthly reflections | ✅ Periodic Notes |
| `#👤person` | 👤 | `02-Dots/300-People` | Person profiles | ✅ Template |
| `#📍place` | 📍 | `02-Dots/600-Places` | Location notes | ✅ Template |
| `#🛠️tool` | 🛠️ | `02-Dots/500-Tools` | Tool documentation | ✅ Template |
| `#🎯prompt` | 🎯 | `07-Prompts` | AI prompts and templates | ✅ Template |

---

### **📥 2. Workflow Status Tags**

> [!gear]+ **Purpose**
> Track note lifecycle and workflow stage  
> **⚠️ Important**: Use YAML `status:` metadata primarily, tags as visual supplement

| Tag           | Emoji | Meaning                    | Folder Movement        | Query Use             |
| ------------- | ----- | -------------------------- | ---------------------- | --------------------- |
| `#📥inbox`    | 📥    | Unprocessed capture        | `+Inbox`               | Daily processing list |
| `#🔄active`   | 🔄    | Currently working on       | All folders            | Active work dashboard |
| `#⏳waiting`   | ⏳     | Blocked, waiting for input | All folders            | Follow-up reminders   |
| `#✅completed` | ✅     | Finished, ready to archive | Pre-archive            | Archive preparation   |
| `#📦archived` | 📦    | Long-term storage          | `06-Archive`           | Archived items query  |
| `#⏸️paused`   | ⏸️    | Temporarily inactive       | `03-Efforts/Simmering` | Someday/maybe list    |
| `#❌cancelled` | ❌     | Abandoned, not pursuing    | `06-Archive/Cancelled` | Lessons learned       |

**Workflow Progression**:
📥 inbox → 🔄 active → ✅ completed → 📦 archived  
↘ ⏸️ paused  
↘ ❌ cancelled


---

### **🌱 3. Development Lifecycle Tags**

> [!growth]+ **Purpose**
> Track knowledge maturity and content development needs

| Tag | Emoji | Stage | Action Required | Template Auto-Tag |
|-----|-------|-------|-----------------|-------------------|
| `#📤seed` | 📤 | Raw capture | Add structure | ✅ Quick Capture |
| `#🌱develop` | 🌱 | Needs expansion | Develop content | ✅ Idea Template |
| `#❔question` | ❔ | Research needed | Answer questions | Manual |
| `#🧹tidy` | 🧹 | Needs cleanup | Reorganize/refactor | Manual |
| `#⚗️experiment` | ⚗️ | Testing phase | Evaluate results | Manual |
| `#🚤floating` | 🚤 | No clear home yet | Find proper location | Manual |
| `#🌲evergreen` | 🌲 | Stable, mature | Maintain & reference | Promoted manually |

**Development Query** (Weekly Review):

```
TABLE WITHOUT ID  
file.link as "Note",  
tags as "Development Tags",  
modified as "Last Updated"  
WHERE contains(tags, "#🌱develop")  
OR contains(tags, "#❔question")  
OR contains(tags, "#🧹tidy")  
SORT modified ASC  
LIMIT 20
```


---

### **🎯 4. Priority & Urgency Tags**

> [!fire]+ **Purpose**
> Quick visual indicators for important work  
> **Integration**: Works with GTD Eisenhower Matrix

| Tag | Emoji | Meaning | Use Case | Query Visibility |
|-----|-------|---------|----------|------------------|
| `#priority/high` | 🔥 | Critical importance | Must do first | Top of dashboards |
| `#priority/medium` | ⚡ | Standard importance | Regular work | Standard lists |
| `#priority/low` | 💤 | Nice to have | When time allows | Lower priority |
| `#urgent` | 🚨 | Time-sensitive | Deadline pressure | Urgent alerts |
| `#important` | ⭐ | High impact | Strategic value | Focus work |
| `#quick-win` | ⚡ | Fast results | 5-15 min tasks | Energy fillers |

**Priority Matrix Query**:
```
TABLE WITHOUT ID  
file.link as "Item",  
priority as "Priority",  
tags as "Tags"  
WHERE contains(tags, "#priority/high") OR contains(tags, "#urgent")  
SORT priority DESC, modified DESC
```


---

### **⚡ 5. Energy & Context Tags** (GTD-Inspired)

> [!battery]+ **Purpose**
> Match tasks to available energy and location context

#### **Energy Level Tags**

| Tag | Emoji | Energy State | Best For | Time of Day |
|-----|-------|--------------|----------|-------------|
| `#energy/high` | 🔋 | Peak performance | Deep work, creative | Morning (8-12) |
| `#energy/medium` | ⚡ | Normal focus | Meetings, writing | Afternoon (1-4) |
| `#energy/low` | 💤 | Low capacity | Admin, email | Late day (4-6) |

#### **Context Tags**

| Tag | Emoji | Location/Tool | Required Resources | Query Use |
|-----|-------|---------------|-------------------|-----------|
| `#context/work` | 💼 | Office environment | Work computer, access | Work hours filter |
| `#context/home` | 🏠 | Personal space | Home setup | Personal time |
| `#context/computer` | 💻 | Digital tools | Computer access | Digital work |
| `#context/calls` | 📞 | Phone/video | Communication setup | Call batching |
| `#context/errands` | 🚗 | Outside activities | Transportation | Errand batching |
| `#context/anywhere` | 🌍 | Location-free | Mobile device | Flexible work |
| `#context/focus` | 🎯 | Quiet, uninterrupted | Deep work setup | Focus sessions |

---

### **🎓 6. Topic & Domain Tags**

> [!book]+ **Purpose**
> Thematic organization across folder boundaries  
> **Structure**: Hierarchical when beneficial

#### **Knowledge Domains**

| Tag Pattern | Examples | Use Case |
|-------------|----------|----------|
| `#domain/` | `#domain/psychology` | Academic/professional fields |
| | `#domain/technology` | Tech and engineering |
| | `#domain/business` | Business and finance |
| | `#domain/health` | Health and wellness |
| | `#domain/creativity` | Art and creative work |

#### **Skill Categories**

| Tag Pattern | Examples | Use Case |
|-------------|----------|----------|
| `#skill/` | `#skill/programming` | Technical skills |
| | `#skill/writing` | Communication skills |
| | `#skill/leadership` | Soft skills |

#### **Project Categories**

| Tag Pattern | Examples | Use Case |
|-------------|----------|----------|
| `#project/` | `#project/learning` | Learning projects |
| | `#project/building` | Creation projects |
| | `#project/shipping` | Publishing projects |

---

### **🔬 7. Source & Reference Tags**

> [!book]+ **Purpose**
> Categorize external content and reading material

| Tag | Emoji | Source Type | Processing Stage | Action |
|-----|-------|-------------|------------------|--------|
| `#source/book` | 📚 | Books | Reading | Progressive summarization |
| `#source/article` | 📰 | Articles | Quick read | Extract key ideas |
| `#source/video` | 🎥 | Videos | Watch | Note timestamps |
| `#source/podcast` | 🎙️ | Podcasts | Listen | Episode highlights |
| `#source/course` | 🎓 | Courses | Learning | Module notes |
| `#source/paper` | 📄 | Research papers | Study | Citation tracking |
| `#source/web` | 🌐 | Web content | Clip | Archive URL |

**Reading Status Sub-Tags**:
- `#status/unread` - In queue
- `#status/reading` - Currently processing
- `#status/completed` - Finished and extracted
- `#status/reference` - Keep for lookup

---

### **🌍 8. Special Context Tags**

> [!globe]+ **Purpose**
> Additional context for organization and filtering

| Tag | Emoji | Purpose | Use Case |
|-----|-------|---------|----------|
| `#lang/en` | 🇬🇧 | English content | Language filtering |
| `#lang/cs` | 🇨🇿 | Czech content | Native language |
| `#public` | 🌐 | Shareable externally | Publishing candidates |
| `#private` | 🔒 | Personal only | Privacy filtering |
| `#review/daily` | 📅 | Daily review | Routine checklist |
| `#review/weekly` | 📅 | Weekly review | Weekly ritual |
| `#review/monthly` | 📅 | Monthly review | Monthly reflection |
| `#favorite` | ⭐ | Frequently referenced | Quick access |
| `#template` | 📋 | Note template | Template library |

---

## 🔄 Workflow Integration

### **Daily Capture → Processing Workflow**


```

```mermaid
graph TD  
A[📥 Capture] -->|Quick Capture Template| B[#📥inbox]  
B -->|Daily Processing| C{What is it?}  
C -->|Knowledge| D[#💡atomic + #🌱develop]  
C -->|Project| E[#🚀effort + #🔄active]  
C -->|Reference| F[#📚source + domain tag]  
C -->|Question| G[#❔question]  
D --> H[02-Dots]  
E --> I[03-Efforts]  
F --> J[04-Sources]  
G --> K[Relevant Folder]
```


### **Tag Assignment by Template**

| Template | Auto-Tags | Manual Tags to Add |
|----------|-----------|-------------------|
| **Quick Capture** | `#📥inbox`, `#📤seed` | Priority, context |
| **Atomic** | `#💡atomic`, `#🌱develop` | Domain, maturity |
| **Effort** | `#🚀effort`, `#🔄active` | Priority, energy |
| **Source** | `#📚source`, `#status/unread` | Source type, domain |
| **Meeting** | `#🤝meeting`, `#📅daily` | Participants, project |
| **Daily Note** | `#📅daily`, `#🔄active` | Focus area, mood |

---

## 🎯 Hotkey Integration

### **Alt+T - Quick Tag Favorites**

Most-used tag combinations for rapid tagging:

📥 Processing Tags:
- #📥inbox → #🔄active
- #🔄active → #✅completed
- #✅completed → #📦archived
🚀 Priority Boost:
- #priority/high
- #urgent
- #quick-win
🌱 Development Tags:
- #🌱develop
- #🧹tidy
- #❔question
⚡ Context Tags:
- #context/work
- #context/home
- #energy/high

---
## 📊 Tag-Based Queries
### **1. Daily Processing Dashboard**
```
TABLE WITHOUT ID  
file.link as "Item",  
tags as "Tags",  
created as "Captured"  
FROM #📥inbox  
WHERE contains(tags, "#📥inbox")  
SORT created DESC  
LIMIT 20
```

### **2. Active Work Dashboard**

```
TABLE WITHOUT ID  
file.link as "Active Work",  
priority as "Priority",  
tags as "Context"  
WHERE contains(tags, "#🔄active")  
AND !contains(tags, "#📦archived")  
SORT priority DESC, modified DESC
```

### **3. Development Pipeline**

```
TABLE WITHOUT ID  
file.link as "Developing",  
tags as "Stage",  
modified as "Last Edit"  
WHERE contains(tags, "#🌱develop")  
OR contains(tags, "#❔question")  
OR contains(tags, "#🧹tidy")  
SORT modified ASC  
LIMIT 15
```


### **4. High-Priority Urgent Items**

```
TASK  
WHERE contains(tags, "#priority/high") OR contains(tags, "#urgent")  
AND !completed  
GROUP BY file.link

```


### **5. Context-Based Work Lists**

```
TABLE WITHOUT ID  
file.link as "Task",  
energy as "Energy",  
context as "Context"  
WHERE contains(tags, "#context/computer")  
AND contains(tags, "#energy/high")  
AND status = "🔄active"
```

---

## 🩺 Tag Health Monitoring 
### **Orphan Tags Query** (Unused Tags)

```
TABLE WITHOUT ID  
tag as "Tag",  
length(rows) as "Usage Count"  
FROM ""  
FLATTEN file.tags as tag  
GROUP BY tag  
SORT length(rows) ASC  
LIMIT 20
```

### **Over-Tagged Notes Query**

```
TABLE WITHOUT ID  
file.link as "Note",  
length(file.tags) as "Tag Count",  
file.tags as "Tags"  
FROM ""  
WHERE length(file.tags) > 10  
SORT length(file.tags) DESC
```
### **Missing Critical Tags**

```
TABLE WITHOUT ID  
file.link as "Note",  
type as "Type",  
tags as "Tags"  
FROM "02-Dots" OR "03-Efforts"  
WHERE !contains(tags, "#💡atomic")  
AND !contains(tags, "#🚀effort")  
AND !contains(tags, "#📚source")  
AND type != "moc"
```


---

## 🧹 Tag Maintenance Workflow

### **Quarterly Tag Audit** (Every 3 months)

**Audit Checklist**:
- [ ] Run orphan tags query - remove unused tags
- [ ] Check over-tagged notes - simplify
- [ ] Review tag consistency - fix variations
- [ ] Update tag documentation - add new, remove old
- [ ] Bulk rename tags if needed (MetaEdit plugin)
- [ ] Update templates with new auto-tags

**Tag Pruning Rules**:
1. **Less than 3 uses** - Candidate for removal
2. **Duplicate meaning** - Consolidate tags
3. **Unclear purpose** - Define or delete
4. **Never in queries** - Remove if not useful

---

## ✅ Tag Best Practices

### **Do's ✅**

- ✅ Use emoji-first format for visual scanning
- ✅ Auto-tag via templates whenever possible
- ✅ Keep tags consistent (same emoji + text)
- ✅ Use hierarchical tags for sub-categories (`#context/work`)
- ✅ Review and prune unused tags quarterly
- ✅ Combine tags with YAML metadata (not duplicating)
- ✅ Use tags in Dataview queries for insights

### **Don'ts ❌**

- ❌ Create duplicate tags (e.g., `#idea` and `#💡idea`)
- ❌ Over-tag notes (10+ tags = too many)
- ❌ Use tags to replace proper folder organization
- ❌ Create one-off tags without clear use case
- ❌ Ignore tag variations (inconsistency)
- ❌ Tag everything the same way (lose signal)
- ❌ Forget to update templates when adding new tags

---

## 🚀 Getting Started with Tags

### **Week 1: Foundation**
- [ ] Review existing tags in vault
- [ ] Add critical tags to templates
- [ ] Set up Alt+T quick tag favorites
- [ ] Practice daily inbox processing with tags

### **Week 2-4: Habit Building**
- [ ] Tag notes consistently during capture
- [ ] Use priority and context tags actively
- [ ] Run weekly development pipeline query
- [ ] Refine auto-tagging in templates

### **Month 2+: Mastery**
- [ ] Create custom tag-based dashboards
- [ ] Optimize tag combinations for workflows
- [ ] Conduct first quarterly tag audit
- [ ] Share tag system with community

---

## 🔗 Related System Notes

- [[MOC - Visual Identity]] – Visual standards hub (emoji-first tags documented here)
- [[🔢My PKM Metadata]] - YAML metadata standards
- [[🔁My PKM Workflows]] - How tags enable workflows
- [[📁My PKM Folders]] - Folder structure guide
- [[🔍My PKM Queries]] - Dataview query collection
- [[+About Templatesℹ️]] - Auto-tagging configuration

---

> [!quote]+ **💭 Tagging Philosophy**
> *"Tags are the connective tissue of your PKM - they reveal patterns across folders, enable flexible queries, and surface insights that folder hierarchies hide. Tag deliberately, not exhaustively. Let templates do the work."*

---

*Last Updated: 2025-09-30 | Review: Quarterly | Status: 🟢 Active & Optimized*


## **Key Features:**
## **📊 Complete Taxonomy**
- **8 major tag categories** fully detailed
- **50+ specific tags** with purpose and usage
- **Visual emoji system** for quick scanning
- **Hierarchical structure** where beneficial
## **🎨 Visual Excellence**
- **Mermaid workflow** diagrams
- **Comparison tables** for all tag types
- **Color-coded callouts** by category
- **Query examples** for each tag group
## **🤖 Practical Automation**
- **Template auto-tagging** configuration
- **Hotkey favorites** for rapid tagging
- **Dataview queries** for 5 key dashboards
- **Health monitoring** queries
## **🔧 Maintenance System**
- **Quarterly audit** checklist
- **Pruning rules** for tag hygiene
- **Best practices** (Do's and Don'ts)
- **Getting started** roadmap


----

#🧹tidy - hmmm - Use everytag here for consistency in using for notes 

GO HERE: [[🏷️My PKM Tags#**Alt+T (Quick Tag) Favorites **]] #🌱develop 

# 🏷️ Tags Showcase 🏷️ - NEEDS UPDATE (Status, Effort)

#🔥on 
#♻️ongoing 
#🌊simmering 
#💤sleeping 
#👤people 
#🤝meeting 
 #📦archived
#💡idea 
#🚀project 
#📚source 
#🗺️MOC 
 
 #🔧tool
 
#🧹tidy
#🚤boat
#🌱develop
#❔question 
#⚗️experiment

#💼work
#🏠home
