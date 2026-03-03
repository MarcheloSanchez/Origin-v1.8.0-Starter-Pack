---
status: 📦archived
title: Evaluation Rubrics — Prompts
type: evaluation
modified: 2026-03-03
---
# 🧮 Prompts — Evaluation Rubrics

**Purpose:**  
Defines how to _measure_ prompt quality consistently.  
Each criterion uses a 0–2 scale for simplicity.

|Score|Description|
|---|---|
|0|Missing or incorrect|
|1|Partially met|
|2|Fully met / Excellent|

---

## 🎓 General Evaluation Rubric

|Criterion|Question|Weight|
|---|---|---|
|**Clarity**|Is the instruction clear and unambiguous?|1|
|**Structure**|Does output follow defined format?|1|
|**Relevance**|Does response stay on topic and meet intent?|1|
|**Factuality**|Are facts accurate and consistent?|1|
|**Conciseness**|Is it free of redundancy?|0.5|
|**Tone Fit**|Does tone match the defined audience?|0.5|
|**Creativity**|(Optional) Does it show original thinking?|0.5|
|**Guardrail Adherence**|Did it respect the guardrails listed?|1|

Total possible: 7–8 points → normalize to 10 for dashboard display.

---

## 🧩 Rubric: Educational Prompts

|Criterion|Description|Weight|
|---|---|---|
|Alignment with Bloom Level|Question matches stated cognitive goal|1|
|Clarity & Age Appropriateness|Language suits audience|1|
|Coverage|Covers full concept with balanced difficulty|1|
|Feedback Accuracy|Correct answer key / rationale|1|
|Engagement|Stimulates learner curiosity|0.5|

---

## 🧩 Rubric: Business / Strategy Prompts

|Criterion|Description|Weight|
|---|---|---|
|Feasibility|Suggestions are actionable|1|
|Insightfulness|Adds new perspective or synthesis|1|
|Alignment|Matches stated business goal|1|
|Data Use|References or metrics used correctly|0.5|
|Conciseness|Prioritized, avoids fluff|0.5|

---

## 🧩 Rubric: Creative / Writing Prompts

|Criterion|Description|Weight|
|---|---|---|
|Originality|Fresh or inventive ideas|1|
|Style Consistency|Tone matches brief|1|
|Emotional Impact|Evokes target feeling|1|
|Readability|Flow and structure clear|0.5|
|Grammar|Error-free output|0.5|

---

## 🧩 Rubric: Technical / Coding Prompts

|Criterion|Description|Weight|
|---|---|---|
|Correctness|Output runs or compiles|1|
|Efficiency|Reasonable performance or logic|1|
|Documentation|Code/comments clear|1|
|Safety|No risky functions / security holes|1|
|Test Coverage|Includes test cases|0.5|

---

## 🧮 Scoring Formula

`total_score = (sum(actual_score * weight) / sum(weights)) * 10`  
Round to one decimal for `eval_score`.

---

# 🧰 Practical Examples

### Example 1 — Evaluating `edu-quiz-builder-5q`

Applied rubric: _Educational Prompts_

|Criterion|Score (0-2)|Notes|
|---|---|---|
|Alignment with Bloom|2|Perfect mapping 5 levels|
|Clarity|2|Simple wording|
|Coverage|1|Limited to one topic|
|Feedback Accuracy|2|Key correct|
|Engagement|1|Basic phrasing|

Weighted total ≈ 8.5 / 10 →  
`eval_score: 8.5` in YAML.

---

### Example 2 — Evaluating a “Compare-and-Decide” Business Prompt

Applied rubric: _Business / Strategy_

|Criterion|Score|Notes|
|---|---|---|
|Feasibility|2|Clear actionable choice|
|Insightfulness|1|Moderate depth|
|Alignment|2|Matches business aim|
|Data Use|1|Some metrics used|
|Conciseness|1|Few redundant lines|

Weighted total ≈ 7.3 / 10 →  
`eval_score: 7.3`

---

### Example 3 — Evaluating “Reframe Engine” (Creative/Personal Growth)

Applied rubric: _Creative / Writing_

|Criterion|Score|Notes|
|---|---|---|
|Originality|2|Motivational twist|
|Style Consistency|2|Positive tone|
|Emotional Impact|1|Could add sensory phrasing|
|Readability|2|Very clear|
|Grammar|2|No issues|

Weighted total ≈ 9.2 / 10.
