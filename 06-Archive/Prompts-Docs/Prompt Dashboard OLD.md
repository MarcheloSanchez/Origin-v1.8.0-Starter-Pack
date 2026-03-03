---
title: "Prompt Dashboard OLD"
status: 📦archived
up: "[[🏡Home]]"
tags:
  - 🤖AI
created: 2025-04-30
URLs:
  - https://huggingface.co/datasets/fka/awesome-chatgpt-prompts/
  - https://prompts.chat/
  - https://github.com/f/awesome-chatgpt-prompts
  - https://www.aiforwork.co/
  - https://free.theresanaiforthat.com/leaderboard/
modified: 2026-03-03
---
> [!orbit] Wayfinder **Ej Aj** |   [[AI MOC]] | [[MOC - Prompts]] | [[Prompt Concepts]] | [[AI Agents LINKS]] | [[AI Tools]]  | [[AI Questions of wonder]] |  [[AI jailbreaks]] | [[AI Evolution in Time]] | Prompt Dashboard

# 🧭 Prompt Dashboard - "Queries"
---
_A smart overview of your categorized prompts._

> [!cite]- Settings
> > > [[Prompt_attributes_explained]]
> [[Prompt_Category]]
> [[Prompt_Type]]
> [[Prompt_Audience]]
> [[Prompt_languages]]
> used [[Template, new Prompt]]
> ```
> from "Atlas/Notes/AI/copilot-custom-prompts" or "Atlas/Notes/AI/Prompts" OR "Atlas/Notes/AI/Prompts_org"
> > where contains(category, "📥 Inbox / Unfiltered") and !contains(file.name, "TEMPLATE")
> ```
> 

## not filled prompts
**What this does:**
- Lists all prompt notes (excluding templates) from your main prompt folders.
- Only shows notes where at least one of the key attributes (category, type, audience, difficulty, source) is missing or empty.
```DELETE_THIS_LINE_TO_SHOWUP```DELETE_THIS_LINE_TO_SHOWUP

 > [!example]- Fill out these
> 
> ```dataview
> table WITHOUT ID  file.link as "Prompt", 
>   category, 
>   type, 
>   audience, 
>   difficulty, 
>   source
> from "Atlas/Notes/AI/Prompts" or "Atlas/Notes/AI/Prompts_org"
> where !contains(file.name, "TEMPLATE")
>   and (
>     !category or
>     !type or
>     !audience or
>     !difficulty or
>     !source
>   )
> sort file.name asc
> 
> ```
> 

## DataviewJS

```dataviewjsxxx

```

## Dle Kategorie 
---
> [!abstract]- > ## 📥 Inbox / Unfiltered
> 
> ```dataview
> table  WITHOUT ID file.link as "Prompt", tags, status
> from "Atlas/Notes/AI/copilot-custom-prompts" or "Atlas/Notes/AI/Prompts" OR "Atlas/Notes/AI/Prompts_org"
> where contains(category, "📥 Inbox / Unfiltered") and !contains(file.name, "TEMPLATE")
> sort file.name asc
> ```

> [!quote]- > ## 🗣 Voice & Roleplay
> 
> ```dataview
> table  WITHOUT ID file.link as "Prompt", tags, status
> from "Atlas/Notes/AI/copilot-custom-prompts" or "Atlas/Notes/AI/Prompts" OR "Atlas/Notes/AI/Prompts_org"
> where contains(category, "🗣 Voice & Roleplay") AND !contains(file.name, "TEMPLATE")
> sort file.name asc
> ```

> [!men]- > ## 🧠 Mastery Prompts
> 
> ```dataview
> table  WITHOUT ID file.link as "Prompt", tags, status
> from "Atlas/Notes/AI/copilot-custom-prompts" or "Atlas/Notes/AI/Prompts" OR "Atlas/Notes/AI/Prompts_org"
> where contains(category, "🧠 Mastery Prompts") and !contains(file.name, "TEMPLATE")
> sort file.name asc
> ```

> [!memory]- > ## 📚 Learning & Teaching
> 
> ```dataview
> table WITHOUT ID file.link as "Prompt", tags, status
> from "Atlas/Notes/AI/copilot-custom-prompts" or "Atlas/Notes/AI/Prompts" OR "Atlas/Notes/AI/Prompts_org"
> where contains(category, "📚 Learning & Teaching") AND !contains(file.name, "TEMPLATE")
> sort file.name asc
> ```

> [!int]- > ## 💡 Personal Growth
> 
> ```dataview
> table  WITHOUT ID file.link as "Prompt", tags, status
> from "Atlas/Notes/AI/copilot-custom-prompts" or "Atlas/Notes/AI/Prompts" OR "Atlas/Notes/AI/Prompts_org"
> where contains(category, "💡 Personal Growth") AND !contains(file.name, "TEMPLATE")
> sort file.name asc
> ```

> [!industry]- > ## 💼 Career Building
> 
> ```dataview
> table  WITHOUT ID file.link as "Prompt", tags, status
> from "Atlas/Notes/AI/copilot-custom-prompts" or "Atlas/Notes/AI/Prompts" OR "Atlas/Notes/AI/Prompts_org"
> where contains(category, "💼 Career Building") and !contains(file.name, "TEMPLATE")
> sort file.name asc
> ```
> 

> [!combine]- > ## 📊 Strategy & Planning
> 
> ```dataview
> table  WITHOUT ID file.link as "Prompt", tags, status
> from "Atlas/Notes/AI/copilot-custom-prompts" or "Atlas/Notes/AI/Prompts" OR "Atlas/Notes/AI/Prompts_org"
> where contains(category, "📊 Strategy & Planning") and !contains(file.name, "TEMPLATE")
> sort file.name asc
> ```
> 

> [!calendar]- > ## 📣 Content & Marketing
> 
> ```dataview
> table  WITHOUT ID file.link as "Prompt", tags, status
> from "Atlas/Notes/AI/copilot-custom-prompts" or "Atlas/Notes/AI/Prompts" OR "Atlas/Notes/AI/Prompts_org"
> where contains(category, "📣 Content & Marketing") and !contains(file.name, "TEMPLATE")
> sort file.name asc
> ```
> 

> [!abstract]- > ## 🧾 Comprehension & Summarization
> 
> ```dataview
> table  WITHOUT ID file.link as "Prompt", tags, status
> from "Atlas/Notes/AI/copilot-custom-prompts" or "Atlas/Notes/AI/Prompts" OR "Atlas/Notes/AI/Prompts_org"
> where contains(category, "🧾 Comprehension & Summarization") and !contains(file.name, "TEMPLATE") or contains(type, "summarization")
> sort file.name asc
> ```
> 

> [!tar]- > ## 🧪 QA / Testing Prompts
> 
> ```dataview
> table file.link as "Prompt", tags, status
> from "Atlas/Notes/AI/Prompts_org"
> where contains(category, "🧪 QA / Testing Prompts") and !contains(file.name, "TEMPLATE")
> sort file.name asc
> ```

> [!award]- > ## 🖨 3D Printing Prompts
> 
> ```dataview
> table file.link as "Prompt", tags, status
> from "Atlas/Notes/AI/Prompts_org"
> where contains(category, "🖨 3D Printing Prompts") and  !contains(file.name, "TEMPLATE")
> sort file.name asc
> ```
> 

> [!watch]- > ## ✍️ Copywriting
> 
> ```dataview
> table file.link as "Prompt", tags, status
> from "Atlas/Notes/AI/Prompts_org"
> where contains(category, "✍️ Copywriting") and !contains(file.name, "TEMPLATE")
> sort file.name asc
> ```
> 

> [!plane]- > ## 📈 Business / Product Dev
> 
> ```dataview
> table file.link as "Prompt", tags, status
> from "Atlas/Notes/AI/Prompts_org"
> where contains(category, "📈 Business / Product Dev") AND !contains(file.name, "TEMPLATE")
> sort file.name asc
> LIMIT 5
> ```
> 

---

## Dle jednoduchosti
---

> [!blocks]- > ## 📚 Structured Prompt Library: Automation-Ready
> ---
> 
> | Prompt ID       | Prompt Intent               | Template Example                                                  | Best Use Case                                 |
> | --------------- | --------------------------- | ----------------------------------------------------------------- | --------------------------------------------- |
> | EXPLAIN-01      | Explain Concepts            | "Explain this concept like I'm 5: [TOPIC]"                        | Simplify complex tech for reports             |
> | EXPLAIN-02      | Explain Concepts            | "Summarize this in simple terms: [TOPIC]"                         | Internal comms or sprint summaries            |
> | EXPLAIN-03      | Explain Concepts            | "Use an analogy to describe: [TOPIC]"                             | Training sessions or team briefs              |
> | SUMMARIZE-01    | Summarize Information       | "Summarize the key takeaways from: [DOCUMENT]"                    | Sprint notes or retro highlights              |
> | SUMMARIZE-02    | Summarize Information       | "List the main points as bullet points from: [DOCUMENT]"          | Meeting minutes or PR reviews                 |
> | SUMMARIZE-03    | Summarize Information       | "Summarize in a few sentences: [TOPIC]"                           | Standup updates                               |
> | COMPARE-01      | Create Comparisons          | "Compare [PRODUCT 1] vs [PRODUCT 2]"                              | Tool evaluation (e.g., Playwright vs Cypress) |
> | COMPARE-02      | Create Comparisons          | "Compare [Concept 1] vs [Concept 2]"                              | Framework choices                             |
> | COMPARE-03      | Create Comparisons          | "Highlight differences between [Event 1] and [Event 2]"           | Lessons learned analysis                      |
> | ALTERNATIVES-01 | Offer Alternatives          | "What are other options for solving [PROBLEM]?"                   | Test strategy pivot options                   |
> | ALTERNATIVES-02 | Offer Alternatives          | "What are pros and cons of [APPROACH]?"                           | Risk-based QA planning                        |
> | ALTERNATIVES-03 | Offer Alternatives          | "What would you recommend for [SITUATION]?"                       | Senior test lead inputs                       |
> | CREATIVE-01     | Encourage Creative Thinking | "Brainstorm ideas to improve [PROCESS]"                           | Retrospectives                                |
> | CREATIVE-02     | Encourage Creative Thinking | "Suggest out-of-the-box solutions for [CHALLENGE]"                | Innovation spikes                             |
> | GOALS-01        | Set Goals                   | "Define short-term objectives for [PROJECT]"                      | Sprint planning                               |
> | GOALS-02        | Set Goals                   | "Outline a long-term vision for [INITIATIVE]"                     | Test Automation Roadmaps                      |
> | GOALS-03        | Set Goals                   | "Define key milestones for [PROJECT]"                             | Milestone tracking                            |
> | TRACK-01        | Track Progress              | "Status update: What’s completed? What's next?"                   | Daily standups                                |
> | TRACK-02        | Track Progress              | "What challenges are we facing with [TASK]?"                      | Blockers reporting                            |
> | EXPERT-01       | Provide Expert Insights     | "Act as a subject matter expert on [TOPIC]"                       | Solution proposals                            |
> | EXPERT-02       | Provide Expert Insights     | "Act as a 30-year specialist: What’s the expert view on [TOPIC]?" | Advanced decisions                            |
> | ACTION-01       | Generate Actionable Steps   | "List implementation steps for [TASK]"                            | Deployment plans                              |
> | ACTION-02       | Generate Actionable Steps   | "Define project management steps for [GOAL]"                      | QA project charters                           |
> | ACTION-03       | Generate Actionable Steps   | "Suggest personal development tasks for [SKILL]"                  | Skill-building plans                          |
> | CLARIFY-01      | Ask for Clarifications      | "Can you elaborate on [TOPIC]?"                                   | Deeper technical understanding                |
> | CLARIFY-02      | Ask for Clarifications      | "What are the implications of [DECISION]?"                        | Risk assessments                              |
> | VISUALIZE-01    | Visualize Data              | "Create a chart or graph for [DATA]"                              | KPI dashboards                                |
> | VISUALIZE-02    | Visualize Data              | "Diagram this workflow: [PROCESS]"                                | DevOps/Test pipelines                         |
> | VISUALIZE-03    | Visualize Data              | "Summarize [DATA] into an infographic"                            | Sprint reporting                              |
> | FEEDBACK-01     | Request Feedback            | "How can this [TASK] be improved?"                                | Code reviews or process audits                |
> | FEEDBACK-02     | Request Feedback            | "What did you like or dislike about [FEATURE]?"                   | Beta testing feedback                         |
> | ORGANIZE-01     | Organize Information        | "Categorize these items by theme: [LIST]"                         | Organizing test cases                         |
> | ORGANIZE-02     | Organize Information        | "Prioritize the following tasks by impact: [LIST]"                | Sprint backlog grooming                       |
> | ORGANIZE-03     | Organize Information        | "Group related items from [LIST]"                                 | Categorizing defects                          |
> | REFLECT-01      | Reflect on Learning         | "What have you learned from [EXPERIENCE]?"                        | Sprint retrospectives                         |
> | REFLECT-02      | Reflect on Learning         | "How can the learnings from [EVENT] be applied?"                  | Continuous improvement                        |
> | REFLECT-03      | Reflect on Learning         | "What would you do differently next time after [TASK]?"           | Post-mortems                                  |
> 

> [!blocks]- > ## Upgraded version 
> 
> enhanced consistency and phrasing for professional tone and automation readiness:
> 
>   
> 
> | Prompt ID       | Prompt Intent               | Template Example                                                | Best Use Case                                  |
> | --------------- | --------------------------- | --------------------------------------------------------------- | ---------------------------------------------- |
> | EXPLAIN-01      | Explain Concepts            | "Explain [TOPIC] as if I were 5 years old."                     | Simplifying complex tech for reports           |
> | EXPLAIN-02      | Explain Concepts            | "Summarize [TOPIC] in simple terms."                            | Internal communications, sprint summaries      |
> | EXPLAIN-03      | Explain Concepts            | "Describe [TOPIC] using an analogy."                            | Training sessions, team briefings              |
> | SUMMARIZE-01    | Summarize Information       | "Summarize key takeaways from [DOCUMENT]."                      | Sprint notes, retrospective highlights         |
> | SUMMARIZE-02    | Summarize Information       | "List main points from [DOCUMENT] as bullet points."            | Meeting minutes, pull request reviews          |
> | SUMMARIZE-03    | Summarize Information       | "Provide a brief summary of [TOPIC] in a few sentences."        | Standup updates                                |
> | COMPARE-01      | Create Comparisons          | "Compare [PRODUCT 1] and [PRODUCT 2]."                          | Tool evaluations (e.g., Playwright vs Cypress) |
> | COMPARE-02      | Create Comparisons          | "Compare [CONCEPT 1] and [CONCEPT 2]."                          | Framework or methodology choices               |
> | COMPARE-03      | Create Comparisons          | "Highlight differences between [EVENT 1] and [EVENT 2]."        | Lessons learned analysis                       |
> | ALTERNATIVES-01 | Offer Alternatives          | "What are alternative solutions for [PROBLEM]?"                 | Test strategy pivots                           |
> | ALTERNATIVES-02 | Offer Alternatives          | "List pros and cons of [APPROACH]."                             | Risk-based QA planning                         |
> | ALTERNATIVES-03 | Offer Alternatives          | "Recommend the best approach for [SITUATION]."                  | Senior test lead decision-making               |
> | CREATIVE-01     | Encourage Creative Thinking | "Brainstorm ideas to improve [PROCESS]."                        | Retrospectives                                 |
> | CREATIVE-02     | Encourage Creative Thinking | "Suggest innovative solutions for [CHALLENGE]."                 | Innovation sprints                             |
> | GOALS-01        | Set Goals                   | "Define short-term objectives for [PROJECT]."                   | Sprint planning                                |
> | GOALS-02        | Set Goals                   | "Outline a long-term vision for [INITIATIVE]."                  | Test automation roadmaps                       |
> | GOALS-03        | Set Goals                   | "Identify key milestones for [PROJECT]."                        | Milestone tracking                             |
> | TRACK-01        | Track Progress              | "Provide a status update: What’s completed and what’s next?"    | Daily standups                                 |
> | TRACK-02        | Track Progress              | "What challenges are we facing with [TASK]?"                    | Blocker reporting                              |
> | EXPERT-01       | Provide Expert Insights     | "Act as a subject matter expert on [TOPIC]."                    | Solution proposals                             |
> | EXPERT-02       | Provide Expert Insights     | "As a 30-year specialist, what is your expert view on [TOPIC]?" | Advanced decision-making                       |
> | ACTION-01       | Generate Actionable Steps   | "List implementation steps for [TASK]."                         | Deployment plans                               |
> | ACTION-02       | Generate Actionable Steps   | "Define project management steps to achieve [GOAL]."            | QA project charters                            |
> | ACTION-03       | Generate Actionable Steps   | "Suggest personal development tasks for improving [SKILL]."     | Skill-building plans                           |
> | CLARIFY-01      | Ask for Clarifications      | "Please elaborate on [TOPIC]."                                  | Deepening technical understanding              |
> | CLARIFY-02      | Ask for Clarifications      | "What are the implications of [DECISION]?"                      | Risk assessments                               |
> | VISUALIZE-01    | Visualize Data              | "Create a chart or graph representing [DATA]."                  | KPI dashboards                                 |
> | VISUALIZE-02    | Visualize Data              | "Diagram the workflow for [PROCESS]."                           | DevOps or test pipelines                       |
> | VISUALIZE-03    | Visualize Data              | "Summarize [DATA] in an infographic."                           |                                                |

