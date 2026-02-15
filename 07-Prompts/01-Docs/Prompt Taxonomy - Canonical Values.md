
## **Purpose:**  
Authoritative list of allowed values, field types, and data rules for every attribute in the Prompt Library.  
This note is your single source of truth for **metadata standardization**.
**Includes:**

- prompt_category & subcategory (links to catalog)
    
- prompt_type, intent, difficulty, audience, role, format, tone, length, tools
    
- guardrails, version, status

---

## 🗂 prompt_category

Main theme of the prompt.  
Use slugs from → [[Prompt Categories Catalog]].   #🧹tidy -Clean Category so it can be referenced from here
Allowed: `[writing, coding, business, education, productivity, creative, prompt-engineering]`

---

## 🧩 prompt_subcategory

Fine-grained grouping.  
Pick **1–3** values that logically fit your category.  
List of all allowed slugs is in → [[Prompt Categories Catalog]]. #🧹tidy -Clean sub-Category so it can be referenced from here

---

## 🧱 prompt_type

Describes what the AI _does_ in this prompt.  
`[explanation, reflection, simulation, summarization, rewrite, generation, analysis, planning, idea, prompt-design, comparison, compression, creative, utility]`

---

## 🎯 intent (Bloom Taxonomy)

Cognitive goal of the prompt — select one.  
`[remember, understand, apply, analyze, evaluate, create]`  
Legacy mapping:

- `explain→understand`
- `decide→evaluate`
- `compare→analyze`
- `extract→remember/apply`
- `transform→rewrite or generation`

---

## 🧠 difficulty

Complexity level.  
`[beginner, medium, intermediate, advanced, expert]`  
Legacy mapping: `easy→beginner`, `hard→advanced`.

---

## 👥 audience

Intended user group or reader.  
`[student, teacher, developer, content-creator, job-seeker, entrepreneur, maker, language-learner, self-improver, productivity-nerd, researcher, strategist, designer, tester, decision-maker, general]`

---

## 🧑‍💼 role

Persona or role the AI adopts during execution.  
`[coach, editor, qa_tester, teacher, product_manager, marketer, analyst, architect, mentor, creative_partner, interviewer, assistant, operator, explainer, reviewer]`

---

## 🧱 format

Preferred structure of the output.  
`[outline, checklist, table, rubric, email, code, json, markdown, report, dialogue, flowchart, plan, story, canvas, sop, memo]`  
_(Field alias: `format_pref` → deprecated)_

---

## 🗣 tone

Writing voice or communication style.  
`[neutral, clear, friendly, persuasive, technical, formal, concise, encouraging, analytical, empathetic]`

---

## 📏 length

Expected scope of the output.  
`[short, medium, long]`

---

## 🛠 tools

External helpers or execution environments referenced or expected.  
`[browser, code_runner, image_gen, sheets, web_search, diagram_gen]`

---

## ⚖️ guardrails

Reusable safety & quality constraints (comma-separated YAML list).  
`[no_personal_data, no_bias, factual_only, concise_output, markdown_only, cite_sources, maintain_tone, avoid_redundancy, no_speculation, safe_for_work, limit_scope, respect_ip, stable_output, deterministic, language_safe, proper_formatting]`

Example:

```yaml
guardrails: [no_personal_data, cite_sources, concise_output]
```

---

## 🧮 status

Lifecycle state of the prompt.  
`[draft, active, winner, archived]`  
`winner` = top-performing version (evaluation phase result).

---

## 📦 pattern

Links to a pattern defined in → [[Prompts — Patterns]].  
Allowed value: wikilink or slug of a known pattern (e.g., `[[Pattern – Chain of Thought]]`).

---

## 🧾 inputs_schema

JSON definition of expected input variables.  
Allowed primitives: `string`, `number`, `boolean`, `enum`, `array`, `object`.  
Example:

```json
{
  "topic": "string",
  "audience": "enum: [student, teacher]"
}
```

---

## 📦 deliverable_schema

JSON definition describing required output fields (for automation and evaluation).  
Example:

```json
{
  "sections": "array",
  "summary": "string",
  "references": "array"
}
```

---

## ⚙️ model_defaults

Default LLM settings.  
Example keys:  
`provider`, `model`, `temperature`, `max_tokens`, `system_message`.  
Example:

```yaml
model_defaults:
  provider: openai
  model: gpt-5
  temperature: 0.7
```

---

## 🧩 context_packs

References to external context notes or datasets.  
Type: wikilink list  
Example:

```yaml
context_packs: [[House Style]], [[Prompt Glossary]]
```

---

## 🗓 last_run

Date of the most recent test or run (ISO: `YYYY-MM-DD`).

## 🔢 eval_score

Numeric evaluation result (0–10 or percentage).  
Paired with → [[Prompts — Evaluation Rubrics]].

---

## ⚖️ license

Usage rights.  
`[internal, CC-BY, CC-BY-SA, CC0, MIT, proprietary]`

---

## 🧰 source

Where the idea originated.  
`[personal, blog, youtube, twitter, community, ai-output, book, obsidian, podcast, system, external]`

---

## 🧮 version

Semantic version format → `MAJOR.MINOR.PATCH`  
Example: `1.0.0` (first release) → `1.1.0` (new field) → `1.1.1` (minor fix)

---

## 🔗 Related Notes

[[Prompt Attribute Glossary]] – reasoning & usage  
[[Prompt Categories Catalog]] – category/subcategory values  
[[Prompts — Patterns]] – pattern library  
[[Prompts — Evaluation Rubrics]] – quality scoring  
[[Playbook - Prompt]] – operational workflow

---

# 📗 2. Prompt Attribute Glossary (Usage Guide) #🧹tidy there is need for compare if it fits. From first perspective its not clear
---
**Purpose:**  
Explains the intent, rationale, and correct usage of each YAML attribute.  
Use this note when **designing** or **reviewing** prompts.

---

## 🧩 id

Unique, stable slug. Lowercase + hyphens. Never reuse.  
`writing-tech-blog-outline` ✅ `My Prompt #1` ❌  
Keeps links stable even if filenames change.

---

## 🏷 title

Human-friendly name shown in dashboards.  
≤ 60 chars, descriptive not cute.  
Good: “Weekly Sprint Summary Generator”.

---

## 🧾 summary

One-sentence description of **what the prompt produces**, not how.  
Visible in Dataview tables — make it outcome-focused.

---

## 🗂 type (prompt_type)

Defines the _kind_ of cognitive or generative action.  
Choose from Canonical Values.  
Tip: Align it with **intent** (e.g., `analysis` + `evaluate`).

---

## 🎯 intent

Specifies the Bloom level — helps filter prompts by thinking depth.  
`remember` = facts `create` = synthesis.  
Use only one per prompt to avoid scope creep.

---

## 📚 prompt_category / prompt_subcategory

Tell the library _where_ this prompt lives conceptually.  
1 category + 1–3 subcategories = discoverability & thematic linkage.  
Reference → [[Prompt Categories Catalog]] for valid slugs.

---

## 👥 audience

Clarify the human beneficiary.  
Guideline: if unclear, your audience is _you in a specific role_ (e.g., “tester” or “writer”).  
Max 3 entries.

---

## 🧑‍💼 role

Defines the **AI persona** for tone control.  
Use realistic work-aligned roles: _editor_, _coach_, _qa_tester_, not characters like “wizard” unless creative intent.

---

## 🧱 format

Output blueprint. Choose structure that simplifies downstream parsing.  
Tip: prefer `markdown` for human-readable; `json` for automations.

---

## 🗣 tone

Voice of output.  
Align tone with audience expectations:

- _Technical_ → specs, reports
    
- _Friendly_ → education
    
- _Persuasive_ → marketing
    

---

## 📏 length

Guides verbosity; helps maintain consistency across outputs.

---

## 🛠 tools

Document external dependencies (e.g., `image_gen`, `browser`).  
Important for reproducibility and automation triggers.

---

## ⚖️ guardrails

Explicitly state restrictions to ensure factual, safe, compliant results.  
Example:  
`no_personal_data`, `cite_sources`, `markdown_only`.  
Add only those relevant; avoid over-stacking.

---

## 🧠 difficulty

Reflects expected skill of prompt user.  
Helps others pick suitable complexity and training order.

---

## 🧮 status

Tracks lifecycle.

- `draft` → under construction
    
- `active` → validated, reusable
    
- `winner` → best-performing after evaluation
    
- `archived` → retired
    

---

## 📦 pattern

Names reusable structural archetypes (e.g., _Chain of Checks_, _Role + Goal + Steps_).  
Stored in → [[Prompts — Patterns]].  
Allows cross-comparison of performance by pattern.

---

## 🧾 inputs_schema / deliverable_schema

Document expected inputs and outputs.  
Used by automation, validation, and evaluation scripts.  
Follow JSON schema syntax; see examples in Canonical note.

---

## ⚙️ model_defaults

Presets to ensure reproducibility (provider, model, temperature, tokens).  
Only include if needed; otherwise inherit system defaults.

---

## 🧩 context_packs

Link reference notes (style guides, glossaries, evidence bases) that shape output tone or facts.  
Useful for large projects or knowledge-dense prompts.

---

## 🗓 last_run / 🔢 eval_score

Operational metrics.  
`last_run` = last test date.  
`eval_score` = quantified quality (0–10).  
Evaluated using → [[Prompts — Evaluation Rubrics]].

---

## ⚖️ license

Specifies reuse rights; keeps intellectual property clear.  
If unsure, default to `internal`.

---

## 🧮 version

Semantic versioning ensures traceability.  
Increment:

- PATCH → typos
    
- MINOR → content or param tweaks
    
- MAJOR → schema changes
    

---

## 🧰 source

Document where inspiration came from.  
Transparency supports reproducibility.

---

## 💡 Best Practices

- One prompt = one purpose.
    
- Keep YAML alphabetical for easy linting.
    
- Use Canonical Values for all enums.
    
- When updating, bump version and record in [[prompt-global-changelog]].
    
- Validate fields using Dataview queries before publishing.
    

---

## 🔗 Related Notes

[[Prompt Attributes — Canonical Values]] – allowed enums & examples  
[[Prompt Categories Catalog]] – category tree  
[[Prompts — Patterns]] – design patterns reference  
[[Prompts — Evaluation Rubrics]] – quality checks  
[[Playbook - Prompt]] – workflow & lifecycle automation

---

✅ With these two notes:
- _Canonical Values_ = **machine-facing truth** (what’s valid)
- _Glossary_ = **human-facing guide** (why and how)
They fully replace _Prompt Taxonomy_ and unify your schema across Playbook, Templates, and Dashboards.