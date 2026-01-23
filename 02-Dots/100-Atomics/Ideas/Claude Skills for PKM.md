---
up: "[[🗺️My PKM MOC]]"
title: Claude Skills for PKM
type: atomic
tags:
  - 📋documentation
  - 🤖ai
  - 💡idea
status: 🔄active
maturity: 🪴sapling
created: 2025-01-23
modified: 2025-01-23
related:
  - "[[🗺️My PKM MOC]]"
---

# Claude Skills for PKM (Level 3)

An advanced guide to leveraging Claude AI for sophisticated Personal Knowledge Management workflows. These prompts use advanced prompt engineering techniques including system contexts, chain-of-thought reasoning, and structured output formats.

---

## Prompt Architecture

All Level 3 prompts follow this structure:

```
<system>
Expert role definition + vault context + principles
</system>

<task>
Specific task with content placeholder {}
</task>

<reasoning_steps>
Chain-of-thought framework for systematic analysis
</reasoning_steps>

<output_format>
Detailed, structured output template
</output_format>
```

This architecture ensures:
- **Consistent expertise** via system prompts
- **Systematic thinking** via reasoning steps
- **Actionable output** via structured formats
- **Vault integration** via PKM-specific context

---

## Available Claude Prompts

### 🔄 Processing & Triage

| Prompt | Purpose | Complexity | When to Use |
|--------|---------|------------|-------------|
| **Process inbox note** | GTD triage with classification, connections, and next actions | Advanced | Fresh captures in +Inbox |
| **Extract atomic notes** | Zettelkasten decomposition with atomicity testing | Advanced | Dense sources, books, articles |
| **Suggest metadata** | Generate YAML frontmatter matching vault schema | Moderate | Any note needing metadata |

### 🔗 Connection & Synthesis

| Prompt | Purpose | Complexity | When to Use |
|--------|---------|------------|-------------|
| **Find connections** | Knowledge graph mapping across domains | Advanced | Orphan notes, integration |
| **Synthesize knowledge** | Create emergent insights from multiple sources | Expert | After research, before MOC |
| **Create MOC structure** | Build navigation architecture | Moderate | 5+ notes on a topic |

### 🧠 Thinking & Analysis

| Prompt | Purpose | Complexity | When to Use |
|--------|---------|------------|-------------|
| **Challenge this idea** | Steel-man + red team with boundary analysis | Expert | Testing assumptions |
| **Generate questions** | Socratic exploration with question taxonomy | Advanced | Deepening understanding |
| **Build mental model** | Construct reusable frameworks | Expert | Pattern recognition |
| **Decision analysis** | Multi-criteria evaluation with pre-mortem | Expert | Important choices |

### 📚 Learning & Research

| Prompt | Purpose | Complexity | When to Use |
|--------|---------|------------|-------------|
| **Deep research** | Design systematic learning roadmaps | Advanced | New topic exploration |
| **Explain concept** | Feynman-technique explanations | Advanced | Understanding verification |

### 📊 Review & Maintenance

| Prompt | Purpose | Complexity | When to Use |
|--------|---------|------------|-------------|
| **Weekly review helper** | Comprehensive note health check | Advanced | Weekly reviews |
| **Assess note maturity** | Evaluate seed → evergreen progression | Moderate | Periodic reviews |

### ✅ Task & Meeting

| Prompt | Purpose | Complexity | When to Use |
|--------|---------|------------|-------------|
| **Extract tasks** | GTD-style task extraction | Moderate | Meeting notes, brainstorms |
| **Summarize meeting** | Structured meeting notes | Moderate | Post-meeting processing |

---

## Advanced Prompt Engineering Techniques

### 1. System Context Architecture

Every Level 3 prompt includes vault-specific context:

```xml
<system>
VAULT CONTEXT:
- Types: atomic, effort, source, meeting, moc, prompt, tool, person, place
- Status flow: 📥inbox → 🔄active → ⏳waiting → ✅completed → 📦archived
- Maturity: 📤seed → 🌱seedling → 🪴sapling → 🌲evergreen → 🍓fruit
- Tag taxonomy: #💡idea, #🚀project, #📚source, #🗺️moc
</system>
```

### 2. Chain-of-Thought Reasoning

Prompts guide Claude through systematic analysis:

```xml
<reasoning_steps>
STEP 1: [First analysis phase]
- Question to answer
- Criteria to apply

STEP 2: [Second phase]
- Building on step 1
- New considerations
</reasoning_steps>
```

### 3. Structured Output Templates

Every prompt specifies exact output format:

```xml
<output_format>
## Section 1
| Column | Column |
|--------|--------|
| data | data |

### Subsection
**Key point**: [explanation]
</output_format>
```

### 4. Expert Role Assignment

Prompts assign specific expertise:

- **PKM analyst** - Zettelkasten, GTD, PARA frameworks
- **Knowledge graph architect** - Connection mapping
- **Socratic facilitator** - Question generation
- **Decision analyst** - Strategic thinking
- **Research strategist** - Learning design

---

## Workflow Integration

### Advanced Daily Capture

```
1. Capture → +Inbox
2. "Process inbox note" → Triage analysis
3. If complex: "Extract atomic notes" → Multiple notes
4. "Find connections" → Link to knowledge graph
5. If pattern emerges: "Synthesize knowledge" → New insight
```

### Deep Learning Workflow

```
1. "Deep research" → Create learning roadmap
2. Process each source with "Extract atomic notes"
3. "Synthesize knowledge" → Combine insights
4. "Build mental model" → Create framework
5. "Explain concept" → Verify understanding
6. "Create MOC structure" → Organize domain
```

### Intellectual Development Workflow

```
1. Capture idea → Atomic note
2. "Generate questions" → Deepen inquiry
3. "Challenge this idea" → Test robustness
4. "Find connections" → Integrate with existing knowledge
5. "Synthesize knowledge" → Combine with related ideas
6. "Build mental model" → Extract framework
```

### Decision Making Workflow

```
1. Capture decision context
2. "Decision analysis" → Full evaluation
3. "Challenge this idea" → Test assumptions
4. "Generate questions" → Identify unknowns
5. Document decision rationale as atomic note
```

---

## Chaining Prompts

For complex tasks, chain prompts in sequence:

### Research Chain
```
Deep research → Extract atomic notes → Find connections → Synthesize → Build mental model
```

### Critique Chain
```
Challenge this idea → Generate questions → Find connections → Synthesize (improved version)
```

### Explanation Chain
```
Explain concept → Generate questions → Challenge this idea → Build mental model
```

---

## Customization Guide

### Adding Vault-Specific Context

Edit the `<system>` section to include:
- Your specific folder structure
- Custom metadata fields
- Domain-specific terminology
- Preferred frameworks

### Adjusting Output Depth

For shorter outputs, add to task:
```
Keep analysis focused. Maximum 500 words for main sections.
```

For deeper analysis:
```
Provide exhaustive analysis. Include edge cases and alternative perspectives.
```

### Domain Adaptation

For technical content:
```
Apply software engineering and systems thinking frameworks.
```

For creative work:
```
Apply design thinking and creative process frameworks.
```

---

## Best Practices

### Do
- **Review and edit** all Claude outputs
- **Add your own insights** to synthesized content
- **Verify connections** before adding to notes
- **Iterate prompts** based on results
- **Chain prompts** for complex tasks

### Don't
- Accept analysis without critical review
- Let Claude determine what's important to you
- Over-automate personal reflection
- Skip the reasoning steps in output
- Forget to link outputs to existing notes

### Quality Checklist

After using any prompt:
- [ ] Core insight accurately captures the content?
- [ ] Connections are meaningful, not superficial?
- [ ] Output format matches my vault conventions?
- [ ] I've added my own perspective and context?
- [ ] Action items are specific and doable?

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Output too long | Add word limits to task section |
| Missing nuance | Use "Challenge this idea" as follow-up |
| Generic connections | Be more specific about your knowledge domains |
| Wrong format | Copy exact format from output_format section |
| Shallow analysis | Chain with "Generate questions" first |

---

## Related

- [[🗺️My PKM MOC]] - Main PKM index
- [[🔁My PKM Workflows]] - Standard workflows
- [[🔢My PKM Metadata]] - Metadata schema reference
- [[🔍My PKM Queries]] - Dataview query reference

---

*Document Status: 🪴 Sapling | Last Updated: 2025-01-23 | Version: Level 3*
