---
title: "Suggest metadata"
copilot-command-context-menu-enabled: true
copilot-command-slash-enabled: true
copilot-command-context-menu-order: 1090
copilot-command-model-key: ""
copilot-command-last-used: 0
modified: 2026-03-03
---
Analyze {} and suggest appropriate YAML frontmatter:

```yaml
title: [suggested title]
type: [atomic|effort|source|moc|meeting|prompt]
status: [📥inbox|🔄active|⏳waiting|✅completed]
maturity: [📤seed|🌱seedling|🪴sapling|🌲evergreen]
priority: [high|medium|low]
tags:
  - [suggested tag 1]
  - [suggested tag 2]
related:
  - [[suggested link 1]]
  - [[suggested link 2]]
```

Explain your reasoning for each field choice.

---

## ⏭️ Workflow Continuation

**Skill type**: Classification & Organization
**Compatible chains**:
- `Note Evolver` (Step 3/4)
- `Process Inbox` (Component skill)
- `Standalone` (Can be used independently)

### Handoff Package

```yaml
chain_context:
  skill_completed: "Suggest metadata"
  outputs_produced:
    - suggested_title: "[Assertion-style title]"
    - type: "[Note type assigned]"
    - status: "[Status assigned]"
    - maturity: "[Maturity level assigned]"
    - tags: "[List of tags]"
    - related_links: "[Suggested wikilinks]"
    - reasoning: "[Why these choices]"

recommended_next:
  primary: "Manual integration"
  trigger: "Apply the metadata and add to MOC(s)"
  alternative: "Find connections (if related links need expansion)"

handoff_instruction: |
  Metadata suggested. Key outputs:
  - Title: [suggested title]
  - Type: [type]
  - Maturity: [maturity]
  - Tags: [tags]
  - Related: [links]

  Next steps (manual):
  1. Apply the YAML frontmatter to the note
  2. Add the note to appropriate MOC(s)
  3. Create backlinks from related notes
  4. Set review reminder based on maturity
```

### 🔄 Chain Progress Tracker

If following **Note Evolver** chain:
- [x] Assess note maturity → Current stage identified
- [x] Find connections → Links mapped
- [x] **Suggest metadata** ← YOU ARE HERE
- [ ] Manual integration → Apply and place in MOC

**Metadata ready to apply**: Copy the YAML block above

**To complete evolution**:
1. Add frontmatter to note
2. Place in MOC
3. Set review date