---
title: "Assess note maturity"
copilot-command-context-menu-enabled: true
copilot-command-slash-enabled: true
copilot-command-context-menu-order: 1060
copilot-command-model-key: ""
copilot-command-last-used: 0
modified: 2026-03-03
---
Assess the maturity of {} using this PKM scale:

- **📤 Seed**: Raw capture, unprocessed thought
- **🌱 Seedling**: Initial processing, basic structure
- **🪴 Sapling**: Developed idea with connections
- **🌲 Evergreen**: Mature, well-linked, reviewed
- **🍓 Fruit**: Published/shared, actionable output

Provide:
1. **Current maturity**: Which stage and why
2. **Gaps identified**: What's missing for the next level
3. **Action items**: Specific steps to mature this note
4. **Confidence**: How certain are you of this assessment (high/medium/low)

---

## ⏭️ Workflow Continuation

**Skill type**: Review & Assessment
**Compatible chains**:
- `Note Evolver` (Step 1/4)
- `Weekly Review` (Component skill)
- `Standalone` (Can be used independently)

### Handoff Package

```yaml
chain_context:
  skill_completed: "Assess note maturity"
  outputs_produced:
    - current_maturity: "[📤/🌱/🪴/🌲/🍓 with reasoning]"
    - gaps_identified: "[List of what's missing for next stage]"
    - action_items: "[Specific steps to mature]"
    - confidence: "[High/Medium/Low]"

recommended_next:
  primary: "Find connections"
  trigger: "If note lacks connections (most common blocker)"
  alternatives:
    - "Extract atomic notes (if multiple ideas tangled)"
    - "Challenge this idea (if core idea unclear)"
    - "Suggest metadata (if structure/classification missing)"

handoff_instruction: |
  Maturity assessed. Key findings:
  - Current stage: [from output]
  - Primary gap: [from gaps identified]
  - Priority action: [first action item]

  Based on gaps, recommended next skill:
  - Missing connections → "Find connections"
  - Multiple ideas → "Extract atomic notes"
  - Unclear idea → "Challenge this idea"
  - Missing metadata → "Suggest metadata"
```

### 🔄 Chain Progress Tracker

If following **Note Evolver** chain:
- [x] **Assess note maturity** ← YOU ARE HERE
- [ ] Find connections → Build link network
- [ ] Suggest metadata → Proper classification
- [ ] Manual integration → MOC placement

**Primary blocker identified**: [From gaps]

**To continue**: Run the skill that addresses the primary gap