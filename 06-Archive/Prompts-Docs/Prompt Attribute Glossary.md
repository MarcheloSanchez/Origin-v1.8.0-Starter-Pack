---
up: "[[Prompt MOC V2]]"
title: Prompt Attribute Glossary
type: doc
tags:
  - 🤖AI/prompt
  - 📚glossary
status: 📦archived
created: 2025-09-08
modified: 2025-09-08
related:
  - "[[Prompt Guide]]"
  - "[[Prompt Template v1 filled out]]"
id: prompt-attribute-glossary
language:
  - en
summary: Explanations and usage rules for each YAML attribute in the Prompt Library schema.
---
> [!orbit] Wayfinder |  [[Prompt Atlas]] |  [[Prompt Dashboard NEW]] |  Prompt Attribute Glossary |  [[Prompt Taxonomy]] | [[Prompt Categories Catalog]] |  [[Prompt Guide]] |  [[PRM-Full-Template]] | [[Prompt Filled Out]] 

> The **Prompt Attribute Glossary** explains **why** and **how** each attribute is used, providing detailed descriptions and guidance on filling them out properly. It acts as a usage manual for prompt metadata.

See concrete values: [[Prompt Taxonomy]]
# 📖 Prompt Attribute Glossary

This note documents every YAML field used in the Prompt Library system.
```all-metadata
---
id:                    
title:                 
summary:               
type: prompt
status: 📦archived
tags: ["🤖AI/prompt"]
created: YYYY-MM-DD
modified: YYYY-MM-DD
related: []
language: [en]
fileClass: Prompt
prompt_category:       
prompt_subcategory: [] 
prompt_type:           
difficulty:            
audience: []           
intent:                
role: []               
format:                
tone:                  
length:                
tools: []              
version: "1.0.0"
owner: "MM"
source: personal
---
```
## 🔑 **`id:`**

> _Stable unique slug for the prompt (safe renames, easy linking)._

Pattern: lowercase-hyphen, digits
Example: writing-tech-blog-outline
Good: pg-micro-reframe-v1   Bad: "My Prompt #1"

|Rule|Notes|
|---|---|
|Unique|Do not reuse across files|
|Stable|Keep fixed even if the filename changes|
|Sluggy|`[a-z0-9-]+`|

## 🏷️ **`title:`**

> _Short human-friendly name for lists and dashboards._

|What|Example|
|---|---|
|Concise (≤ 60 chars)|“Technical Blog Outline from Notes”|
|Descriptive|Avoid internal codenames unless meaningful|

## 🧾 **`summary:`**

> _1–2 line purpose. Surfaces in Dataview tables and searches._

|Good Summary|“Turn raw notes into a publishable outline with SEO headings.”|
|---|---|
|Keep it outcome-focused|What this prompt _does_, not how|

---
## 🎓 **`intent:`** _(Bloom-aligned)_

> _Cognitive aim to filter by thinking skill (pairs with your [[ORGANIZE prompts by Blooms Taxonomy|Bloom tables]])._

|Value|Use For|
|---|---|
|remember|Facts, lists, definitions|
|understand|Explanations, paraphrases|
|apply|Worked examples, procedures|
|analyze|Breakdowns, comparisons|
|evaluate|Judgments, critiques|
|create|New ideas, designs, synthesis|

## 🧱 **`format:`**

> _Expected output form, useful for rendering & QA._

|Value Examples|Typical Output|
|---|---|
|outline, table, checklist, rubric|Markdown sections / tables|
|email, brief, memo|Structured prose templates|
|code, json, csv|Validated code/data blocks|

## 🗣️ **`tone:`**

> _Voice of the output._

|Allowed|When to use|
|---|---|
|neutral|Default instructional|
|friendly|Coaching, PG contexts|
|persuasive|Marketing, proposals|
|technical|Dev, QA, specs|
|clear|Plain-language rewrite|

## 📏 **`length:`**

> _Target length (guide, not a hard cap)._

|Value|Guidance|
|---|---|
|short|Bullets, ≤ 120 words|
|medium|2–5 short sections|
|long|Full briefs / walkthroughs|

## 🧰 **`tools:`**

> _External helpers the prompt expects or references._

| Examples                                | Notes                                      |
| --------------------------------------- | ------------------------------------------ |
| browser, code_runner, image_gen, sheets | Inform downstream automation and reviewers |

## 🧾 **`version:`**

> _Semantic version to track changes over time._

|Pattern|Examples|
|---|---|
|`MAJOR.MINOR.PATCH`|`1.0.0` initial release · `1.1.0` adds fields · `1.1.1` fixes typos|

---
# SAME old attributes
---
## 🗂️ `category:`

> _Main use case or theme of the prompt._

```icon
🔥🧠🧾💡 ✍️ 📚 📈 💼 📥 🗣 📊 📣 🧪 🖨
```

| Category Title                   | Examples of Prompts                         |
| -------------------------------- | ------------------------------------------- |
| 📥 Inbox / Unfiltered            | Raw inputs, unorganized ideas               |
| 🧠 Mastery Prompts               | Meta-prompts, prompt engineering            |
| 🗣 Voice & Roleplay              | Simulations, spoken dialogue, actors        |
| 📚 Learning & Teaching           | Explanatory, tutor-style, language learning |
| 💡 Personal Growth               | Self-improvement, productivity, reflection  |
| 💼 Career Building               | Job search, resumes, professional bios      |
| 📊 Strategy & Planning           | Task planning, prioritization, workflows    |
| 📣 Content & Marketing           | Copywriting, campaigns, social posts        |
| 🧾 Comprehension & Summarization | Summarize, reword, compress info            |
| 🧪 QA / Testing Prompts          | Test plans, debugging, automation           |
| 🖨 3D Printing Prompts           | Troubleshooting, optimization               |
| ✍️ Copywriting                   | Email campaigns, landing pages              |
| 📈 Business / Product Dev        | Business strategy, ideation, outlines       |

---
## 🎯 `type:`

> _What kind of task the prompt performs._

| Type          | Use For                                     |
| ------------- | ------------------------------------------- |
| explanation   | Teaching, clarifying topics                 |
| reflection    | Journaling, introspection                   |
| simulation    | Roleplay, interviews, language tests        |
| summarization | Condensing information                      |
| rewrite       | Reframing, rewording text                   |
| generation    | Creative writing, copy, content             |
| analysis      | Evaluate input, give feedback               |
| planning      | Roadmaps, weekly plans                      |
| idea          | Ideation, brainstorming                     |
| prompt-design | Prompt chaining, refining prompts           |
| comparison    | Compare concepts, features                  |
| compression   | Shortening, highlighting                    |
| creative      | For storytelling, branding, creative angles |
| utility       | Markdown templates, command-like usage      |

---
## 👤 `audience:`

> _Who will use or benefit from the prompt._

| Audience          | Notes                                 |
| ----------------- | ------------------------------------- |
| student           | Any type of learner                   |
| teacher           | Tutor-style or instructional prompts  |
| developer         | QA, testing, coding, etc.             |
| content-creator   | Writing, branding, scripting          |
| job-seeker        | Career-oriented prompts               |
| entrepreneur      | Business and product-focused prompts  |
| maker             | For 3D printing and physical creation |
| language-learner  | Simulations, translations             |
| self-improver     | Personal growth, mental wellness      |
| productivity-nerd | Planning, time management             |
| researcher        | Summaries, comparisons                |
| strategist        | Planning, prioritization              |

---

## 📶 `difficulty:`

> _How complex the prompt is to use or understand._

| Level        | Notes                            |
| ------------ | -------------------------------- |
| beginner     | Plug-and-play                    |
| medium       | Requires light customization     |
| intermediate | Includes variables, logic        |
| advanced     | Requires chaining, context       |
| expert       | Meta-prompts, advanced use-cases |

---

## 📚 `source:`

> _Where the prompt idea came from (helps track inspiration)._

|Source|Examples|
|---|---|
|personal|Original idea|
|blog|Copied or inspired from blog|
|youtube|From video tutorial|
|twitter|From X / thread|
|community|Forum, Reddit, Discord|
|ai-output|AI-generated, refined by you|
|book|Based on a method from literature|
|obsidian|Integrated into daily workflow|
|podcast|Interview-style or topic from audio|
|system|Built into your Second Brain/Obsidian|
|external|Imported from tool or workshop|
