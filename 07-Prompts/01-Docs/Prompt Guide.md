---
title: How to Use the Prompt Library
type: source
tags: 
  - 📖guide
  - 🤖AI/prompt
status: 🔄active
created: "2025-09-08"
modified: "2025-09-08"
summary: "Guide for creating, organizing, and maintaining prompts in Obsidian using the Prompt Library system."
---
> [!orbit] Wayfinder |  [[Prompt Atlas]] |  [[Prompt Dashboard NEW]] |  [[Prompt Attribute Glossary]] |  [[Prompt Taxonomy]] | [[Prompt Categories Catalog]] |  Prompt Library Guide |  [[PRM-Full-Template]] | [[Prompt Filled Out]] 
# 📚 How to Use the Prompt as Library

## Purpose
This library standardizes how prompts are stored, discovered, and improved in Obsidian.  
Each prompt follows a consistent structure (YAML + sections), making it searchable with Dataview.

---

## 📶Workflow 
1. **Create a new prompt note** using the [[PRM-Full-Template]].  
2. **Fill YAML frontmatter** with correct attributes. Use [[Prompt Attribute Glossary]] for guidance.  
3. **Write the Prompt body** (role, inputs, instructions, guardrails).  
4. **Add Quality Gates** to check scope and format.  
5. **Add Example Invocation** to prove correctness.  
6. **Document Assumptions** in notes.  
7. **Update changelog** with each edit.

---

## ♻️Lifecycle
- **Draft** → initial version (needs testing).  
- **Active** → tested, production-ready.  
- **Archived** → retired, replaced, or obsolete.  

Use the `status` field in YAML to track lifecycle.

---

## 🏷️Discovery
- Use `tags` for quick search.  
- Use `prompt_category` + `prompt_subcategory` for structured browsing.  
- Link related prompts in `related: [[other-id]]`.  
- Dashboard queries (example in [[Prompt Dashboard NEW]]):  
  - Active prompts by category  
  - Prompts sorted by Bloom intent  
  - Recently modified  

---

## ✅Quality Standards
## 💯Prompt Quality Criteria
1. **Clarity** - Instructions are unambiguous and easy to understand
2. **Completeness** - All necessary information is provided
3. **Effectiveness** - Produces desired outcomes consistently
4. **Reusability** - Can be adapted for multiple similar use cases
5. **Maintainability** - Easy to update and modify as needed
## 👁️Review Process
1. Initial creation and self-review
2. Peer review by subject matter expert
3. Testing with representative use cases
4. Quality assessment against criteria
5. Approval and publication
6. Ongoing performance monitoring


---

## 🔥Best Practices
- Always choose **one main category**.  
- Pick **1–3 subcategories** that belong logically.  
- Use **Bloom intent** to clarify cognitive purpose.  
- Keep `summary` outcome-focused (what the prompt does).  
- Never reuse an `id`.  

---

## 🧪Example Flow
1. Draft an idea → use `prompt-template-empty`.  
2. Classify (category, subcategory, intent).  
3. Save in `07 Prompts/` folder.  
4. Check against QA gates.  
5. Promote to **Active** once tested.

---

## 🔗 Related 
#🧹tidy 
Not used yet but need to include these: 
[[07-Prompts/01-Docs/Prompt Concepts]]
[[Prompts — Patterns]]
[[Prompts — Evaluation Rubrics]]
[[Playbook - Prompt]]