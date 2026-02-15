---
title: Prompt Library Dashboard
type: dashboard
tags: 
  - 📊dashboard
  - 🤖AI/prompt
status: 🔄active
created: "2025-09-08"
modified: "2026-02-13"
related: 
  - "[[Prompt Taxonomy - Canonical Values]]"
  - "[[MOC - Prompts]]"
  - "[[Prompt Categories Catalog]]"
summary: "Central overview of all prompts with Dataview queries for status, category, intent, and recency."
---
> [!orbit] Wayfinder | [[MOC - Prompts]] | Prompt Dashboard | [[Prompt Taxonomy - Canonical Values]] | [[Prompt Categories Catalog]] | [[Prompt Guide]]
# 📊 Prompt Library Dashboard

This dashboard lists all prompts in the library, grouped and sorted for discoverability.

## Favorites

> Tip: mark favorites with `favorite: true` in front-matter.

```dataview
TABLE file.link as Prompt, status, intent, prompt_status, modified
FROM "07-Prompts"
WHERE type = "prompt" AND favorite = true
SORT modified DESC
LIMIT 20
```

---

## Active Prompts
```dataview
TABLE title, prompt_category, prompt_type, intent, prompt_status, modified
FROM "07-Prompts"
WHERE type = "prompt" AND status = "🔄active"
SORT modified DESC
LIMIT 20
```

## Drafts in Progress
```dataview
TABLE title, prompt_category, prompt_type, created
FROM "07-Prompts"
WHERE type = "prompt" AND prompt_status = "draft"
SORT created DESC
LIMIT 20
```

## Archived
```dataview
LIST
FROM "07-Prompts"
WHERE type = "prompt" AND status = "📦archived"
SORT modified DESC
LIMIT 20
```

## By Category
```dataview
TABLE rows.file.link AS Prompts, length(rows) AS Count
FROM "07-Prompts"
WHERE type = "prompt"
GROUP BY prompt_category
SORT length(rows) DESC
```

## By Bloom Intent
```dataview
TABLE rows.file.link AS Prompts, length(rows) AS Count
FROM "07-Prompts"
WHERE type = "prompt"
GROUP BY intent
SORT length(rows) DESC
```

## Recently Modified
```dataview
LIST
FROM "07-Prompts"
WHERE type = "prompt"
SORT modified DESC
LIMIT 10
```

## Health Checks

**Missing required fields**
```dataview
TABLE file.link AS Prompt, prompt_status, prompt_category
FROM "07-Prompts"
WHERE type = "prompt" AND (!prompt_category OR !prompt_type)
SORT file.name ASC
LIMIT 20
```

**Stale (not modified in 30+ days)**
```dataview
TABLE file.link AS Prompt, modified
FROM "07-Prompts"
WHERE type = "prompt" AND status = "🔄active" AND modified < date(today) - dur(30 days)
SORT modified ASC
LIMIT 20
```
---
# 🥵🔥Migration Map (from your current labels → new system)
#🧹tidy 
This maps the labels shown in your attributes note to the normalized catalog (left column are your originals) .

|Old label|Move to (category → subcat)|Or move to facet|Notes|
|---|---|---|---|
|📥 Inbox / Unfiltered|—|`workflow_state: "inbox"`|Workflow state, not a category.|
|🧠 Mastery Prompts|Prompt Engineering → Meta-prompts & Templates|—|Meta about prompting.|
|🗣 Voice & Roleplay|Prompt Engineering → Style/Voice & Roleplay|—|Style control lives in meta.|
|📚 Learning & Teaching|Education → (pick subcats)|—|Choose **Lesson Design**, **Tutoring**, etc.|
|💡 Personal Growth|Productivity → Personal Growth|—|Journals, habits, coaching prompts.|
|💼 Career Building|Productivity → Career Materials|—|CVs, outreach, interview prep.|
|📊 Strategy & Planning|Business → Strategy & Planning|—|High-level planning.|
|📣 Content & Marketing|Business → Marketing|—|Content plan lives here, _output_ is Writing.|
|🧾 Comprehension & Summarization|—|`prompt_type: "summarization"`|Task type, not a category.|
|🧪 QA / Testing Prompts|Prompt Engineering → Prompt QA/Testing|—|Prompt eval + testing.|
|🖨 3D Printing Prompts|—|`domain: ["3d-printing"]` + pick category by task|Domain facet to avoid sprawl.|
|✍️ Copywriting|Writing → Copywriting/Ads|—|Fold into Writing.|
|📈 Business / Product Dev|Business → Product Management (or Strategy & Planning)|—|Choose one per prompt.|