---
title: Edu – Quiz Builder (5 Questions)
type: prompt
fileClass: Prompt
tags: 
  - 🤖AI/prompt
status: 🔄active
created: "2025-09-08"
modified: "2025-09-08"
audience: 
  - student
  - teacher
difficulty: medium
prompt_category: education
prompt_type: generation
prompt_status: draft
intent: create
role: 
  - teacher
  - quiz_master
format: checklist
id: "edu-quiz-builder-5q"
language: 
  - en
length: medium
owner: personal
prompt_subcategory: 
  - assessment
source: obsidian
summary: "Builds a 5-question quiz on any given topic, aligned with Bloom’s levels, including brief answer key."
tone: clear
version: 1.0.0
---

## 💡Prompt Edu – Quiz Builder (5Q)

You are an **experienced teacher**. Create a short quiz on **{topic}** with exactly **5 questions**, one per Bloom level (up to *Analyze*).  

### Requirements
- Each question should explicitly target a Bloom’s level:  
  - Remember  
  - Understand  
  - Apply  
  - Analyze  
  - Evaluate (optional if topic too simple, else replace with Analyze 2nd variant)  
- Provide a brief **Answer Key** with one-sentence explanations.  
- Format in Markdown for easy reading.  

### Constraints
- Tone: clear, student-friendly.  
- Keep questions concise (≤30 words).  
- No duplicate Bloom levels.  

---

## 📝Description
Generates a compact quiz for classroom or self-study, aligned to Bloom’s taxonomy, including answers with short rationales.

---

### Inputs
- **{topic}** – subject area (e.g., Photosynthesis, World War II, SQL basics)  

---

### Quality Gates
- ✅ 5 questions produced, one per Bloom level  
- ✅ Answer key provided with explanations  
- ✅ Markdown checklist or numbered list format  
- ✅ Language clear and age-appropriate for {audience}  
- ✅ Constraints respected (no duplication, concise questions)  

---

### Guardrails
- Do not create >5 questions.  
- Do not omit the answer key.  
- Do not exceed Bloom’s *Analyze* unless explicitly requested.  

---

## 📋Instructions 
```ENG
Create a 5-question quiz on {topic}.  
Each question must map to a Bloom level (Remember → Analyze).  
Add an answer key with short explanations.  
Output in Markdown:
1. Questions list  
2. Answer Key  
```

```CZ
Vytvoř 5 otázek k tématu {topic}.  
Každá otázka odpovídá úrovni Bloom (Pamatuj → Analyzuj).  
Přidej správné odpovědi s krátkým vysvětlením.  
Výstup v Markdownu:  
1. Seznam otázek  
2. Klíč odpovědí  
```

## Example Input
```
topic: Photosynthesis
audience: High school students
```
## Example Output
```
### Quiz: Photosynthesis

1. (Remember) What gas do plants release during photosynthesis?  
2. (Understand) Explain why chlorophyll is important.  
3. (Apply) Predict what happens if a plant has no sunlight.  
4. (Analyze) Compare photosynthesis with respiration.  
5. (Evaluate) Judge which factor is more critical: CO₂ or sunlight?

---

### Answer Key
1. Oxygen – released as byproduct.  
2. Chlorophyll absorbs light energy.  
3. Without sunlight, photosynthesis stops.  
4. Photosynthesis stores energy; respiration releases it.  
5. Sunlight is more critical because it drives the reaction.  
```
## 📝Changelog
**1.0.0 (2025-09-08)** — Initial example prompt created.