
> [!SUMMARY]- Table of Contents
> - [🎨 Board Template (5-Column System)](Universal%20Kanban%20Settings.md#🎨%20Board%20Template%20(5-Column%20System))
> - [📋 COPY-PASTE ESSENTIALS](Universal%20Kanban%20Settings.md#📋%20COPY-PASTE%20ESSENTIALS)
> - [🏷️ Universal Tag System](Universal%20Kanban%20Settings.md#🏷️%20Universal%20Tag%20System)
> - [🎨 Color Reference](Universal%20Kanban%20Settings.md#🎨%20Color%20Reference)
> - [🎨 Visual Styling](Universal%20Kanban%20Settings.md#🎨%20Visual%20Styling)
> - [📱 IMPLEMENTATION STEPS](Universal%20Kanban%20Settings.md#📱%20IMPLEMENTATION%20STEPS)
> - [🔧 MAINTENANCE](Universal%20Kanban%20Settings.md#🔧%20MAINTENANCE)
> - [🔄 Workflow Integration](Universal%20Kanban%20Settings.md#🔄%20Workflow%20Integration)
> - [⚙️ Automation & Shortcuts](Universal%20Kanban%20Settings.md#⚙️%20Automation%20&%20Shortcuts)
> - [📱 Mobile Optimization](Universal%20Kanban%20Settings.md#📱%20Mobile%20Optimization)
> - [🎯 READY TO USE](Universal%20Kanban%20Settings.md#🎯%20READY%20TO%20USE)
> - [Kanban settings](Universal%20Kanban%20Settings.md#Kanban%20settings)
> - [📝 Card Templates](Universal%20Kanban%20Settings.md#📝%20Card%20Templates)
> - [🎯 Board Types & Use Cases](Universal%20Kanban%20Settings.md#🎯%20Board%20Types%20&%20Use%20Cases)
>- [🔗 Related notes](Universal%20Kanban%20Settings.md#🔗%20Related%20notes)
## 🎨 Board Template (5-Column System)

### Column Configuration
Copy this exact setup for consistent boards:

| Column | WIP Limit | Color Code | Purpose |
|--------|-----------|------------|---------|
| **📥 Inbox** | 10 | `#ff6b6b` (Red) | Quick captures, unsorted tasks |
| **📋 To Do** | 8 | `#4ecdc4` (Teal) | Planned, prioritized tasks |
| **⚡ In Progress** | 3 | `#45b7d1` (Blue) | Active work, limited WIP |
| **👁️ Review** | 5 | `#f9ca24` (Yellow) | Completed, awaiting review |
| **✅ Done** | No limit | `#6c5ce7` (Purple) | Finished work |

### Archive Settings
- **Auto-archive**: After 30 days in Done column
- **Archive location**: `06-Archive/Kanban-Archive/`
- **Archive format**: `YYYY-MM - Board Name Archive`
### 2. 🎨 universal_kanban_styles.css (insude Snippets folder .obsidian)
**Visual styling** - Goes in your Obsidian CSS snippets folder
- Color-coded columns and tags
- Responsive design for mobile
- Hover effects and animations
- Dark/light theme support
- Priority indicators
### 3. ⚙️ [[kanban_config.json]] - [[Universal Kanban Settings#Kanban settings|Link to settings]]
**Backup/automation file** - For advanced users
- JSON format for easy export/import
- Complete settings backup
- Automation script ready
- Plugin development reference

## 📋 COPY-PASTE ESSENTIALS

### Quick Plugin Settings (Copy This):
```
✅ Enable card checkboxes: TRUE
✅ New line trigger: Shift+Enter
✅ Prepend new cards: TRUE
✅ Show card counts: TRUE
✅ Date format: YYYY-MM-DD
✅ Time format: HH:mm
✅ Link dates to daily notes: TRUE
✅ Show relative dates: TRUE
✅ Max archive size: 100 cards
✅ Auto-archive after: 30 days
```

## 🏷️ Universal Tag System

### Priority Tags (Red Family)
```markdown
#urgent - 🔴 Immediate action required
#high-priority - 🟠 Important, tackle soon  
#medium-priority - 🟡 Standard priority
#low-priority - 🟢 When time allows
```

### Category Tags (Blue Family)  
```markdown
#project - 🔵 Part of larger effort
#personal - ⚪ Personal life tasks
#work - 🔷 Professional tasks
#learning - 📘 Knowledge/skill development
#maintenance - 🔧 System upkeep
#review - 🟣 Needs evaluation
```

### Status Tags (Contextual)
```markdown
#blocked - ⚫ Waiting on external dependency
#waiting - 🟡 Awaiting response/input
#bug - 🔴 Something to fix
#feature - 🟦 New capability to add
#research - 🔍 Investigation needed
#meeting - 👥 Meeting-related task
#documentation - 📄 Writing/documenting
```

### Time Tags (Green Family)
```markdown
#quick - ⚡ <15 minutes
#short - 🟢 15-30 minutes  
#medium - 🟡 30-90 minutes
#long - 🟠 90+ minutes
#project - 🔴 Multi-session work
```

## 🎨 Color Reference
- 🔴 Red: @ff3838 (Urgent), @ff4757 (High Priority), @ff6b6b (Inbox)
- 🟠 Orange: @ffa502 (Medium Priority)
- 🟡 Yellow: @ffd32a (Waiting), @f9ca24 (Review Column)
- 🟢 Green: @2ed573 (Low Priority), @44bd32 (Documentation)
- 🔵 Blue: @3742fa (Project), @45b7d1 (In Progress), @40739e (Research)
- 🟣 Purple: @8c7ae6 (Review), @6c5ce7 (Done Column)
- ⚫ Gray: @747d8c (Blocked), @2f3542 (Personal)
- 🟤 Navy: @1e3799 (Work)


## 🎨 Visual Styling

### CSS Snippet for Consistent Kanban Styling
**File**: `.obsidian/snippets/universal-kanban.css`

```css
/* Universal Kanban Styling */

/* Column Colors */
.kanban-plugin__lane[data-lane="0"] { /* Inbox */
  background: linear-gradient(135deg, #ff6b6b20 0%, #ff6b6b10 100%);
  border-left: 4px solid #ff6b6b;
}

.kanban-plugin__lane[data-lane="1"] { /* To Do */
  background: linear-gradient(135deg, #4ecdc420 0%, #4ecdc410 100%);
  border-left: 4px solid #4ecdc4;
}

.kanban-plugin__lane[data-lane="2"] { /* In Progress */
  background: linear-gradient(135deg, #45b7d120 0%, #45b7d110 100%);
  border-left: 4px solid #45b7d1;
}

.kanban-plugin__lane[data-lane="3"] { /* Review */
  background: linear-gradient(135deg, #f9ca2420 0%, #f9ca2410 100%);
  border-left: 4px solid #f9ca24;
}

.kanban-plugin__lane[data-lane="4"] { /* Done */
  background: linear-gradient(135deg, #6c5ce720 0%, #6c5ce710 100%);
  border-left: 4px solid #6c5ce7;
}

/* Card Priority Styling */
.kanban-plugin__item:has(.tag[href="#urgent"]) {
  border-left: 4px solid #ff3838;
  background: #ff383810;
}

.kanban-plugin__item:has(.tag[href="#high-priority"]) {
  border-left: 3px solid #ff4757;
  background: #ff475710;
}

.kanban-plugin__item:has(.tag[href="#low-priority"]) {
  border-left: 2px solid #2ed573;
  background: #2ed57310;
}

/* Tag Styling */
.tag[href="#urgent"] { background: #ff3838; color: white; }
.tag[href="#high-priority"] { background: #ff4757; color: white; }
.tag[href="#medium-priority"] { background: #ffa502; color: white; }
.tag[href="#low-priority"] { background: #2ed573; color: white; }

.tag[href="#project"] { background: #3742fa; color: white; }
.tag[href="#personal"] { background: #2f3542; color: white; }
.tag[href="#work"] { background: #1e3799; color: white; }
.tag[href="#learning"] { background: #0c2461; color: white; }

.tag[href="#blocked"] { background: #747d8c; color: white; }
.tag[href="#waiting"] { background: #ffd32a; color: black; }
.tag[href="#quick"] { background: #2ed573; color: white; }

/* Mobile Responsive */
@media (max-width: 768px) {
  .kanban-plugin__lane {
    min-width: 250px;
    margin: 0 5px;
  }
  
  .kanban-plugin__item {
    font-size: 14px;
    padding: 8px;
  }
  
  .tag {
    font-size: 10px;
    padding: 2px 4px;
  }
}

/* Dark Theme Adjustments */
.theme-dark .kanban-plugin__lane {
  background: rgba(255,255,255,0.05);
}

.theme-dark .kanban-plugin__item {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
}
```


## 📱 IMPLEMENTATION STEPS

1. **Install CSS**: Copy `universal_kanban_styles.css` to `.obsidian/snippets/`
2. **Enable Snippet**: Settings > Appearance > CSS Snippets > Enable
3. **Configure Plugin**: Use settings from `universal_kanban_settings.md`
4. **Create Board**: Use the 5-column template
5. **Apply Tags**: Use the universal tag system
6. **Set Shortcuts**: Configure keyboard shortcuts
7. **Test Mobile**: Verify responsive design

## 🔧 MAINTENANCE

**Daily**: Process inbox, move cards, update dates
**Weekly**: Review completed items, adjust WIP limits
**Monthly**: Update templates, optimize CSS, backup config

## 🔄 Workflow Integration

### From Inbox to Kanban
```markdown
1. Daily inbox processing identifies actionable items
2. Actionable items become Kanban cards  
3. Cards get appropriate tags and estimates
4. Cards placed in "To Do" column with priority
5. Work pulled from "To Do" to "In Progress"
6. Completed work moves to "Review" then "Done"
```

### From Daily Notes to Kanban
```markdown
- Tasks identified in daily note → Quick capture card
- Project updates in daily note → Update project Kanban
- Learning insights in daily note → Learning Kanban tasks
- System friction noted → Maintenance Kanban task
```

### From Efforts to Project Kanbans
```markdown
- New effort created → Dedicated project Kanban board
- Effort milestones → Major Kanban cards  
- Next actions → Individual task cards
- Effort completion → Archive project Kanban
```

## ⚙️ Automation & Shortcuts
[[MOC - Automation Command Center]]
### Hotkey Recommendations
```json
{
  "kanban_hotkeys": {
    "new_card": "Ctrl+Shift+K",
    "move_card_right": "Ctrl+Right",
    "move_card_left": "Ctrl+Left", 
    "edit_card": "Enter",
    "complete_card": "Ctrl+Space",
    "archive_card": "Ctrl+Shift+A",
    "add_due_date": "Ctrl+Shift+D",
    "add_priority": "Ctrl+Shift+P"
  }
}
```

### Templater Integration (If using Templater plugin)
```javascript
// Quick Kanban Card Creation
<%*
const priority = await tp.system.suggester(
  ["🔴 Urgent", "🟠 High", "🟡 Medium", "🟢 Low"],
  ["urgent", "high-priority", "medium-priority", "low-priority"]
);

const estimate = await tp.system.suggester(
  ["⚡ Quick (<15min)", "🟢 Short (15-30min)", "🟡 Medium (30-90min)", "🟠 Long (90min+)"],
  ["quick", "short", "medium", "long"]
);

const dueDate = await tp.system.prompt("Due date (YYYY-MM-DD) - optional:");
const context = await tp.system.prompt("Context/Notes:");

tR += `- [ ] ${tp.file.title}
  - Priority: #${priority}
  - Estimate: #${estimate}${dueDate ? `\n  - Due: ${dueDate}` : ''}${context ? `\n  - Context: ${context}` : ''}
  - Tags: `;
%>
```

## 📱 Mobile Optimization

### Touch-Friendly Settings
```json
{
  "mobile_settings": {
    "column_width": "250px",
    "touch_gestures": true,
    "reduced_metadata": true,
    "simplified_view": true,
    "auto_hide_sidebar": true,
    "swipe_actions": {
      "swipe_right": "move_to_next_column",
      "swipe_left": "move_to_previous_column", 
      "long_press": "edit_card",
      "double_tap": "complete_task"
    }
  }
}


## 🎯 READY TO USE

All files are ready for immediate use. Each file serves a specific purpose:
- Settings file: For configuration
- CSS file: For visual styling
- JSON file: For backup/automation
- Setup guide: For implementation
```

## Kanban settings

```
{
  "kanban_settings": {
    "plugin": {
      "enable_card_checkboxes": true,
      "new_line_trigger": "Shift+Enter",
      "prepend_new_cards": true,
      "show_card_counts": true,
      "hide_tags_in_titles": false,
      "date_format": "YYYY-MM-DD",
      "time_format": "HH:mm",
      "link_dates_to_daily_notes": true,
      "show_relative_dates": true,
      "max_archive_size": 100,
      "auto_archive_after_days": 30
    },
    "board": {
      "columns": [
        { "name": "Inbox", "wip_limit": 10, "color": "#ff6b6b" },
        { "name": "To Do", "wip_limit": 8, "color": "#4ecdc4" },
        { "name": "In Progress", "wip_limit": 3, "color": "#45b7d1" },
        { "name": "Review", "wip_limit": 5, "color": "#f9ca24" },
        { "name": "Done", "wip_limit": null, "color": "#6c5ce7" }
      ]
    },
    "tags": {
      "priority": {
        "urgent": "#ff3838",
        "high-priority": "#ff4757",
        "medium-priority": "#ffa502",
        "low-priority": "#2ed573"
      },
      "category": {
        "project": "#3742fa",
        "personal": "#2f3542",
        "work": "#1e3799",
        "review": "#8c7ae6"
      },
      "status": {
        "blocked": "#747d8c",
        "waiting": "#ffd32a",
        "bug": "#ff4757",
        "feature": "#5352ed",
        "research": "#40739e",
        "meeting": "#487eb0",
        "documentation": "#44bd32"
      }
    },
    "shortcuts": {
      "new_card": "Ctrl+N",
      "move_card_right": "Ctrl+Right",
      "move_card_left": "Ctrl+Left",
      "edit_card": "Enter",
      "complete_card": "Ctrl+Space",
      "archive_card": "Ctrl+Shift+A",
      "search": "Ctrl+F"
    },
    "templates": {
      "default": "- [ ] {{title}}\n  - Status: {{status}}\n  - Priority: {{priority}}\n  - Due: {{due}}\n  - Tags: {{tags}}\n  - Notes: {{notes}}",
      "project": "- [ ] {{title}}\n  - Status: {{status}}\n  - Priority: {{priority}}\n  - Assignee: {{assignee}}\n  - Estimated: {{hours}} hours\n  - Due: {{due}}\n  - Criteria: {{criteria}}\n  - Tags: {{tags}}",
      "research": "- [ ] {{title}}\n  - Question: {{question}}\n  - Findings: {{findings}}\n  - References: {{references}}\n  - Status: {{status}}\n  - Tags: {{tags}}",
      "meeting": "- [ ] {{title}}\n  - Agenda: {{agenda}}\n  - Attendees: {{attendees}}\n  - Actions: {{actions}}\n  - Date: {{date}}\n  - Tags: {{tags}}"
    },
    "mobile": {
      "column_width": "250px",
      "touch_gestures": true,
      "reduced_metadata": true,
      "simplified_view": true,
      "auto_hide_sidebar": true
    }
  }
}
```

## 📝 Card Templates

### Default Task Card
```markdown
- [ ] {{Task Title}}
  - Priority: {{priority}}
  - Estimate: {{time-estimate}}
  - Due: {{due-date}}
  - Context: {{context}}
  - Tags: {{tags}}
```

### Project Task Card  
```markdown
- [ ] {{Task Title}}
  - Project: [[{{project-link}}]]
  - Priority: {{priority}}
  - Assignee: {{person}}
  - Estimated: {{hours}} hours
  - Due: {{due-date}}
  - Success Criteria: {{criteria}}
  - Dependencies: {{dependencies}}
  - Tags: {{tags}}
```

### Research Task Card
```markdown
- [ ] {{Research Task}}
  - Question: {{research-question}}
  - Method: {{approach}}
  - Sources: {{sources}}
  - Expected Outcome: {{outcome}}
  - Deadline: {{due-date}}
  - Tags: #research {{additional-tags}}
```

### Meeting Task Card
```markdown
- [ ] {{Meeting Task}}
  - Meeting: [[{{meeting-note}}]]
  - Agenda Item: {{agenda}}
  - Attendees: {{people}}
  - Prep Required: {{preparation}}
  - Follow-up: {{next-actions}}
  - Tags: #meeting {{tags}}
```

### Review Task Card
```markdown
- [ ] {{Review Task}}
  - Subject: [[{{content-to-review}}]]
  - Review Type: {{type}}
  - Criteria: {{standards}}
  - Reviewer: {{person}}
  - Deadline: {{due}}
  - Tags: #review {{tags}}
```
## 🎯 Board Types & Use Cases

### 1. Master Task Board (`Master-Kanban.md`)
**Purpose**: Central task management hub
**Scope**: Cross-cutting tasks from all life areas
**Review**: Daily processing, weekly cleanup

### 2. Project Kanban (`Project-[Name]-Kanban.md`)  
**Purpose**: Specific project task management
**Scope**: Single effort/project tasks only
**Review**: During project work sessions

### 3. Learning Kanban (`Learning-Kanban.md`)
**Purpose**: Knowledge acquisition tasks
**Scope**: Research, courses, reading, skill development
**Review**: Weekly learning sessions

### 4. Maintenance Kanban (`System-Maintenance-Kanban.md`)
**Purpose**: PKM system upkeep tasks
**Scope**: Templates, organization, cleanup, optimization
**Review**: Monthly system reviews

# 🔗 Related notes

[[PKM KANBAN Board Templates]]
[[Template, Kanban Blocks - Without settings]]
[[Template, Kanban PKM setup]]
[[Template, Content Card Kanban]]
[[Template, Learning Card Kanban]]
[[Template - Research Card - Kanban]]
