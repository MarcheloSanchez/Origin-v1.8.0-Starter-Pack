---
title: 🧠 Bloom-Aligned Prompt Chain Specification
type: documentation
tags:
  - 🤖AI/prompt
status: 📦archived
related:
version: 2
---


[[ORGANIZE prompts by Blooms Taxonomy]]
# 🧠 Bloom-Aligned Prompt Chain Specification

> Integration of **Bloom’s Taxonomy** with **Prompt Chain Reasoning Stages (1–5)**  
> Designed for use in Obsidian, local LLM agents, or templater automation pipelines.

---

## 🔷 Overview: Merging Frameworks

| Chain Stage | Bloom Level | Cognitive Goal | Typical Output |
|--------------|-------------|----------------|----------------|
| 1️⃣ Clarify | Remember + Understand | Retrieve & explain concepts | Clear, simple explanation |
| 2️⃣ Explore | Analyze | Examine relationships, contradictions | Structured comparison |
| 3️⃣ Synthesize | Evaluate + Create | Integrate and innovate | Core insight / 80/20 |
| 4️⃣ Apply | Apply | Use in context | Plan, strategy, example |
| 5️⃣ Reflect | Evaluate + Meta-Create | Judge, reframe, learn from | Foresight, meta-insight |

---

## 🌱 Stage 1 – CLARIFY → *Remember / Understand*

> Build foundational comprehension before reasoning.

### 🎯 Core Intent
- Retrieve facts, definitions, and context.  
- Explain in simple terms or through analogy.

### 💬 Bloom-Driven Prompt Set
```

List the key terms and define them in one sentence each.  
Explain {{topic}} as if teaching a 10-year-old.  
Paraphrase the main idea of {{topic}} in your own words.  
Illustrate {{topic}} with a simple real-world example.

```

### 🧩 Add-ons
- “What’s often misunderstood about this?”
- “Summarize in 3 bullet points and one analogy.”

### ⚙️ Output Format
```

**Definition:**  
**Example:**  
**Analogy:**  
**Key Misconception:**

```

---

## 🔍 Stage 2 – EXPLORE → *Analyze*

> Challenge assumptions, deconstruct systems, and uncover patterns.

### 🎯 Core Intent
- Compare, differentiate, and find cause–effect relationships.  
- Uncover implicit assumptions and blind spots.

### 💬 Bloom-Driven Prompt Set
```

Analyze the structure of {{topic}}. What are its main components?  
Compare {{topic}} to its opposite. What changes?  
Investigate what might be causing {{problem}}.  
What patterns or contradictions appear in {{topic}}?

```

### 🧩 Add-ons
- “Visualize the relationships as a concept map.”
- “Classify the main parts into functions or categories.”

### ⚙️ Output Format
```

**System Components:**  
**Relationships:**  
**Contradictions:**  
**Visual Model (if applicable):**

```

---

## 🧠 Stage 3 – SYNTHESIZE → *Evaluate + Create*

> Combine insights to form new, high-leverage understanding.

### 🎯 Core Intent
- Judge the relative importance of findings.  
- Integrate them into new principles or hypotheses.

### 💬 Bloom-Driven Prompt Set
```

Integrate previous insights into a single coherent idea about {{topic}}.  
Evaluate which elements matter most (the 80/20 principle).  
Formulate a new principle or framework that improves {{topic}}.  
Create a short summary statement capturing the core insight.

```

### 🧩 Add-ons
- “What makes this idea unique compared to existing ones?”
- “Design a metaphor or model that captures this concept.”

### ⚙️ Output Format
```

**Key Insight:**  
**Supporting Evidence:**  
**New Framework:**  
**Practical Example:**

```

---

## 🚀 Stage 4 – APPLY → *Apply*

> Use synthesized knowledge to solve, demonstrate, or plan.

### 🎯 Core Intent
- Apply reasoning to realistic or hypothetical situations.  
- Demonstrate cause-effect through examples or workflows.

### 💬 Bloom-Driven Prompt Set
```

Apply the core idea of {{topic}} to a real-world scenario in my context.  
Demonstrate how this could be implemented step by step.  
Design a 3-step plan or workflow using these principles.  
Modify the original idea to fit a different context.

```

### 🧩 Add-ons
- “What tools or methods make this easier?”
- “What constraints could limit implementation?”

### ⚙️ Output Format
```

**Scenario:**  
**Steps to Implement:**  
**Constraints:**  
**Adaptations:**

```

---

## 🔮 Stage 5 – REFLECT → *Evaluate + Meta-Create*

> Audit your reasoning, anticipate risks, and transform insight into future wisdom.

### 🎯 Core Intent
- Evaluate the logic and assumptions of your reasoning.  
- Reframe lessons learned for reuse.

### 💬 Bloom-Driven Prompt Set
```

Evaluate the reasoning process used in previous steps — what worked, what failed?  
What would make this insight backfire or fail in practice?  
Reframe the lesson as a general principle for future decisions.  
Devise a checklist to validate this insight in other cases.

```

### 🧩 Add-ons
- “Summarize one takeaway, one warning, and one opportunity.”
- “How would an expert disagree with this conclusion?”

### ⚙️ Output Format
```

**Lessons Learned:**  
**Potential Risks:**  
**Reframe / Rule of Thumb:**  
**Future Application:**

```

---

## 🔗 Optional Bloom Add-On Prompts (Cross-Stage)
You can append these anywhere in your chain:

| Bloom Verb | Prompt Stem Example |
|-------------|--------------------|
| **List** | “List 5 core components of {{topic}}.” |
| **Compare** | “Compare this to {{alternative}} in structure and purpose.” |
| **Evaluate** | “Judge the reliability of these assumptions.” |
| **Design** | “Design an experiment to test this insight.” |
| **Recommend** | “Propose next steps or improvements.” |
| **Reflect** | “What did this process reveal about your own thinking?” |

---

## 🧭 Implementation Notes

- **Parameter Variables:**  
  - `{{topic}}` → user question or area of reasoning  
  - `{{context}}` → user’s environment (work, learning, etc.)  
  - `{{role}}` → AI role (teacher, critic, designer)  

- **Integration Script:**  
  - Each Stage = `.md` block that can be dynamically included via:
    ```templater
    <% tp.file.include("07-Prompts/Playbooks/Stage-03-Synthesize") %>
    ```
  - Full chain orchestrator reads Bloom level from YAML for intelligent routing.

---

## 📊 Bloom Level ↔ Chain Stage Matrix

| Bloom Level | Chain Stage | Sample AI Role |
|--------------|--------------|----------------|
| Remember | Clarify | Teacher / Explainer |
| Understand | Clarify | Tutor / Translator |
| Apply | Apply | Practitioner / Coach |
| Analyze | Explore | Researcher / Analyst |
| Evaluate | Synthesize / Reflect | Critic / Auditor |
| Create | Synthesize / Reflect | Innovator / Architect |

---

## 🧠 Usage Summary

1️⃣ **Clarify** — Use Bloom’s “Remember/Understand” verbs: *List, Explain, Summarize.*  
2️⃣ **Explore** — Use “Analyze” verbs: *Compare, Differentiate, Investigate.*  
3️⃣ **Synthesize** — Blend “Evaluate” + “Create”: *Judge, Integrate, Design.*  
4️⃣ **Apply** — Use “Apply” verbs: *Demonstrate, Implement, Use.*  
5️⃣ **Reflect** — Return to “Evaluate” verbs: *Critique, Reframe, Recommend.*

---

> **Guiding Principle:**  
> “Each chain stage should elevate one Bloom level higher than the last.”  
> This ensures the AI moves from recall → comprehension → synthesis → innovation → meta-learning.

---

```

---

Would you like the next step to be a **modular breakdown**, where each stage (Clarify, Explore, Synthesize, Apply, Reflect) becomes its own _Bloom-coded prompt module_ file with metadata like `bloom_level`, `verbs_used`, and `expected_output` — so your automation can dynamically select and run stages based on Bloom verbs?