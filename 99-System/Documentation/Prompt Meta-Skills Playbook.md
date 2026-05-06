---
title: Meta-Skills Playbook
type: prompt
fileClass: Prompt
tags:
  - pkm
  - 🔄workflow
  - guide
status: 🔄active
created: 2025-01-26
modified: 2025-01-26
audience: productivity-nerd
prompt_category: education
prompt_type: reference
related:
- "[[Research Orchestrator]]"
- "[[Idea Validator]]"
- "[[Content Pipeline]]"
- "[[Decision Navigator]]"
- "[[Learning Path Designer]]"
- "[[Note Evolver]]"
context_packs: pkm-vault
eval_score:
id: playbook-001
intent: guide
language: [en]
last_run:
model_defaults:
provider: anthropic
model: claude-sonnet
temperature: 0.3
owner: personal
pattern: reference-guide
prompt_subcategory: playbook
source: obsidian
summary: Complete reference playbook with 6 real-world scenarios demonstrating each meta-skill in action with note flows and artifacts
version: "1.0.0"
copilot-command-context-menu-enabled: false
copilot-command-slash-enabled: true
copilot-command-context-menu-order: 800
copilot-command-model-key: ""
copilot-command-last-used: 0
---
## 💡Prompt Meta-Skills Playbook
<system>
You are a PKM workflow guide helping users understand when and how to use each meta-skill. This playbook provides:
- Real-world scenarios for each meta-skill
- Complete note flows showing inputs → transformations → outputs
- Artifact examples at each stage
- Decision criteria for choosing the right meta-skill
META-SKILL OVERVIEW:
  
┌─────────────────────────────────────────────────────────────────────────────┐
│ META-SKILLS ARCHITECTURE │
├─────────────────────────────────────────────────────────────────────────────┤
│ │
│ 📚 RESEARCH ORCHESTRATOR 🔍 IDEA VALIDATOR 📝 CONTENT PIPELINE │
│ Deep research → Extract → Challenge → Questions Synthesize → Model → │
│ Connect → Synthesize → Connect → Decide Outline → Draft │
│ │
│ 🧭 DECISION NAVIGATOR 📖 LEARNING PATH 🌱 NOTE EVOLVER │
│ Challenge → Questions → Research → Explain → Assess → Connect → │
│ Analysis → Synthesize Questions → Model Metadata → Integrate │
│ │
└─────────────────────────────────────────────────────────────────────────────┘
  
WHEN TO USE WHICH:
| Starting Point | Goal | Use This |
|----------------|------|----------|
| Curiosity about topic | Deep understanding | Research Orchestrator |
| Hypothesis or belief | Validate/refine | Idea Validator |
| Knowledge to share | Published content | Content Pipeline |
| Choice to make | Clear decision | Decision Navigator |
| Skill to acquire | Learning mastery | Learning Path Designer |
| Raw note to improve | Evergreen asset | Note Evolver |
</system>
<task>
Reference this playbook to understand meta-skill usage:
{}
</task>
## 📝Description
Complete reference playbook demonstrating all 6 meta-skills through realistic scenarios. Each scenario shows the full workflow from initial trigger through all chain steps to final deliverables, with example notes and artifacts at each stage.
### Inputs
- **{scenario_interest}** – (Optional) Which scenario you want to explore
- **{your_situation}** – (Optional) Your current situation to match to a meta-skill
### Quality Gates
- ✅ All 6 meta-skills covered with complete scenarios
- ✅ Each scenario shows realistic note content
- ✅ Artifacts demonstrated at each chain step
- ✅ Decision criteria clear for meta-skill selection
- ✅ Handoff points between skills explicitly shown
### Guardrails
- Scenarios are illustrative, not prescriptive
- Adapt flows to your actual vault structure
- Not every situation needs a meta-skill
- Simple tasks use individual skills directly
---
## 📋Instructions
 ENG 
1. Review the meta-skill overview to understand the landscape
2. Find the scenario closest to your current need
3. Follow the example flow, adapting to your content
4. Use the artifact examples as templates
5. Track progress through the chain checkpoints
  
 CZ 
6. Prohlédněte si přehled meta-dovedností
7. Najděte scénář nejbližší vaší potřebě
8. Následujte příklad, přizpůsobte svému obsahu
9. Použijte příklady artefaktů jako šablony
10. Sledujte pokrok přes kontrolní body
  
---
# 🎬 SCENARIO 1: Research Orchestrator
## The Situation
> **Maya** is a product manager who keeps hearing about "Jobs to be Done" framework. She's read a few articles but nothing stuck. She wants to truly understand JTBD so she can apply it to her product decisions.
## Why This Meta-Skill
- ✅ Starting from curiosity/interest
- ✅ Goal is deep understanding
- ✅ Wants actionable knowledge
- ✅ Has scattered raw material
---
### 🔗 CHAIN STEP 1: Deep Research
 **Skill**: /deep-research 
**Maya's Input**:
  
Topic: Jobs to be Done (JTBD) framework
I want to understand:
- What is JTBD and where does it come from?
- How is it different from personas?
- How do I actually use it?
- What are common mistakes?
I've read some articles but they were confusing.
  
**Output Artifact**:
 md 
# Research Plan: JTBD Framework
## Research Questions
1. What is the core theory behind JTBD?
2. Who created it and how has it evolved?
3. What's the practical methodology?
4. How does it compare to alternatives?
## Source Strategy
- Primary: Clayton Christensen's original work
- Secondary: Alan Klement, Tony Ulwick interpretations
- Practical: Intercom's JTBD implementation guides
- Critical: Criticisms and limitations
## Learning Roadmap
Week 1: Theory foundations
Week 2: Methodology deep-dive
Week 3: Case studies and application
## Key Concepts to Extract
- Job statement structure
- Functional vs emotional jobs
- Outcome-driven innovation
- Switch interviews
  
 **Handoff Signal**: → Research plan complete, proceed to extraction 
---
### 🔗 CHAIN STEP 2: Extract Atomic Notes
 **Skill**: /extract-atomic-notes 
**Feed it**: Maya's highlights from Christensen's articles and Intercom guides
**Output Artifacts** (5 atomic notes created):
 md 
---
# Atomic Note 1
---
title: Jobs to be Done - Core Definition
type: atomic
maturity: 🌱 seedling
created: 2025-01-26
---
A job is the progress a person is trying to make in a particular circumstance. It's not about the product—it's about what the customer is trying to accomplish.
Key insight: People don't buy products; they hire them to make progress in their lives.
Source: [[Clayton Christensen - Competing Against Luck]]
  
 md 
---
# Atomic Note 2
---
title: JTBD vs Personas - Key Difference
type: atomic
maturity: 🌱 seedling
created: 2025-01-26
---
Personas describe WHO buys. Jobs describe WHY they buy.
The same job can be held by different personas. A busy CEO and a working parent might both hire a fast-food restaurant for the same job: "Help me get a meal quickly so I can get back to what matters."
Related: [[Jobs to be Done - Core Definition]]
  
 md 
---
# Atomic Note 3
---
title: Job Statement Structure
type: atomic
maturity: 🌱 seedling
created: 2025-01-26
---
Formula: [When ___] [I want to ___] [So I can ___]
- When: The triggering circumstance
- I want to: The progress sought
- So I can: The desired outcome
Example: "When I'm commuting alone, I want to feel productive, so I can arrive at work feeling accomplished rather than like I wasted time."
  
 md 
---
# Atomic Note 4
---
title: Functional vs Emotional Jobs
type: atomic
maturity: 🌱 seedling
created: 2025-01-26
---
Every job has three dimensions:
1. **Functional**: The practical task (get breakfast)
2. **Emotional**: How I want to feel (not rushed)
3. **Social**: How I want to be perceived (responsible parent)
Products that address all three win. Products that only address functional often lose to inferior solutions that nail emotional and social.
  
 md 
---
# Atomic Note 5
---
title: Switch Interviews Method
type: atomic
maturity: 🌱 seedling
created: 2025-01-26
---
Interview people who recently switched TO your product or AWAY from it. Focus on:
1. **First thought**: When did you first realize you needed something?
2. **Push**: What was wrong with your old solution?
3. **Pull**: What attracted you to the new solution?
4. **Anxiety**: What almost stopped you from switching?
5. **Habit**: What kept you using the old way?
The push-pull-anxiety-habit framework reveals the full job story.
  
 **Handoff Signal**: → 5 atomic notes extracted, proceed to connection mapping 
---
### 🔗 CHAIN STEP 3: Find Connections
 **Skill**: /find-connections 
**Feed it**: Each atomic note, one at a time
**Output Artifact** (Connection Map):
 md 
# JTBD Connection Map
## Structural Connections (same domain)
- [[Jobs to be Done - Core Definition]] ←→ [[Job Statement Structure]]
- [[JTBD vs Personas - Key Difference]] ←→ [[User Research Methods]]
- [[Switch Interviews Method]] ←→ [[Customer Interview Techniques]]
## Bridge Connections (cross-domain insights)
- [[Functional vs Emotional Jobs]] ←→ [[Emotional Design Principles]]
→ Insight: Design for feeling, not just function
- [[Jobs to be Done - Core Definition]] ←→ [[Systems Thinking]]
→ Insight: Jobs are about progress within a larger life system
- [[Switch Interviews Method]] ←→ [[Behavior Change Models]]
→ Insight: Push/pull/anxiety/habit maps to behavior change forces
## MOC Placement
- All notes → [[Product Strategy MOC]]
- Emotional jobs note → [[Design Thinking MOC]]
- Switch interviews → [[Research Methods MOC]]
  
 **Handoff Signal**: → 8 connections mapped, proceed to synthesis 
---
### 🔗 CHAIN STEP 4: Synthesize Knowledge
 **Skill**: /synthesize-knowledge 
**Feed it**: All 5 atomic notes + connection map
**Output Artifact** (Framework):
 md 
# JTBD Mental Model
## Core Framework
  
┌─────────────────────────────────────────────────────────┐
│ THE JOB LANDSCAPE │
├─────────────────────────────────────────────────────────┤
│ │
│ CIRCUMSTANCE JOB PROGRESS │
│ (Trigger) (What to hire) (Outcome) │
│ │
│ "When I'm..." "I want to..." "So I can..." │
│ │
├─────────────────────────────────────────────────────────┤
│ JOB DIMENSIONS │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ │Functional│ │Emotional │ │ Social │ │
│ │ (Task) │ │(Feeling) │ │(Status) │ │
│ └──────────┘ └──────────┘ └──────────┘ │
└─────────────────────────────────────────────────────────┘
  
## My Key Insights
1. **Products are hired, not bought** — Stop asking "who is my customer?" Start asking "what job are they hiring my product for?"
2. **Circumstance is everything** — The same person has different jobs at different times. Morning commute vs evening commute = different jobs.
3. **Emotional often trumps functional** — A technically superior product can lose to an inferior one that makes people feel better.
4. **Competition is weird** — Your competition isn't similar products; it's anything that could be hired for the same job. Milkshakes compete with bananas AND podcasts.
## How I'll Use This
- [ ] Conduct 5 switch interviews this month
- [ ] Reframe my product's value prop around jobs
- [ ] Map the emotional and social jobs we're missing
- [ ] Stop building personas, start identifying jobs
  
 **Chain Complete**: ✅ Research to insight pipeline finished 
---
### 📊 Scenario 1 Summary
| Stage | Input | Output | Time |
|-------|-------|--------|------|
| Deep research | Curiosity + scattered reading | Research plan | 15 min |
| Extract atoms | Raw highlights | 5 atomic notes | 30 min |
| Find connections | Atomic notes | 8 connections + MOC placement | 20 min |
| Synthesize | All notes + connections | Mental model + action items | 25 min |
**Total invested**: ~90 minutes
**Value created**: Reusable knowledge asset, not just consumed information
---
# 🎬 SCENARIO 2: Idea Validator
## The Situation
> **Jake** believes that "documentation is a waste of time for early-stage startups." He's been arguing this in team discussions but got pushback. He wants to test if his belief holds up or needs refinement.
## Why This Meta-Skill
- ✅ Has a hypothesis/belief to test
- ✅ Received challenging feedback
- ✅ Wants intellectual honesty
- ✅ Open to being wrong
---
### 🔗 CHAIN STEP 1: Challenge This Idea
 **Skill**: /challenge-this-idea 
**Jake's Input**:
  
My belief: Documentation is a waste of time for early-stage startups.
Context: We're a 5-person team moving fast. Writing docs feels like it slows us down. I'd rather we just talk to each other.
  
**Output Artifact**:
 md 
# Idea Challenge: Documentation in Early Startups
## Devil's Advocate Arguments
### Against Jake's Position
1. **Bus Factor**: If key knowledge lives only in heads, losing one person is catastrophic
2. **Onboarding Tax**: Every new hire requires expensive synchronous transfer
3. **Decision Amnesia**: "Why did we build it this way?" becomes unanswerable
4. **Scaling Cliff**: The transition from "we all know" to "we need docs" is brutal
5. **Remote Reality**: Even 5 people can't always be in the same room
### Steelman Counter-Position
"Lightweight documentation for critical decisions and architecture creates leverage, not drag. The cost is front-loaded but compounds."
## Weak Points in Original Belief
| Assumption | Challenge |
|------------|-----------|
| "Just talk" scales | Doesn't past ~7 people |
| Speed > durability | Tech debt applies to knowledge too |
| Everyone knows everything | Already false—you just don't notice |
## Alternative Framings
1. **Not "document everything" vs "document nothing"** — What's the minimum viable documentation?
2. **Async vs sync** — Docs enable async, which is faster than meetings
3. **Documentation as thinking** — Writing forces clarity
## Refined Hypothesis
"Heavy documentation process is wasteful for early startups, but zero documentation creates hidden debt. The minimum viable approach: document decisions, not processes."
  
 **Handoff Signal**: → Belief challenged, proceed to deepen questions 
---
### 🔗 CHAIN STEP 2: Generate Questions
 **Skill**: /generate-questions 
**Feed it**: The challenge output + original belief
**Output Artifact**:
 md 
# Deepening Questions: Documentation Tradeoffs
## Questions That Could Change My Mind
1. What's the actual cost of undocumented decisions? (Measure it)
2. Have I personally experienced "documentation saved us" moments?
3. What's the lightest-weight documentation that creates value?
4. Which startups I admire have good docs practices?
## Questions to Research
1. What do YC partners advise on early documentation?
2. Is there data on documentation ROI for small teams?
3. What's the GitLab/Basecamp approach? (Documentation-heavy companies)
## Questions That Reveal Hidden Assumptions
1. Am I conflating "documentation" with "bureaucracy"?
2. Is my resistance about docs or about writing?
3. What would I document if it took zero effort?
## Experiments I Could Run
1. Try: Document one decision per day for 2 weeks
2. Measure: Time spent answering repeated questions
3. Test: New hire onboarding with vs without docs
  
 **Handoff Signal**: → Questions generated, proceed to research & connect 
---
### 🔗 CHAIN STEP 3: Find Connections
 **Skill**: /find-connections 
**Feed it**: Challenge + questions, looking for existing knowledge
**Output Artifact**:
 md 
# Connection Discoveries
## Links to Existing Notes
- [[Technical Debt]] — "Knowledge debt" is a subset
→ Insight: Same compound interest problem
- [[Writing as Thinking]] — Docs force clarity
→ Insight: Documentation isn't overhead, it's thinking
- [[Amazon Six-Pager Memo]] — Writing > meetings for decisions
→ Supports: Lightweight decision docs add value
## Contradicting Evidence Found
- My note [[Stripe Documentation Culture]] — Stripe docs from day 1, scaled well
- My highlight: "Every decision not documented will be relitigated"
## Vault Shows Pattern
3 previous projects had "wish we'd documented X" retrospective notes
  
 **Handoff Signal**: → Connections reveal pattern, proceed to verdict 
---
### 🔗 CHAIN STEP 4: Synthesize or Decide
 **Skill**: /synthesize-knowledge or /decision-analysis 
**Feed it**: All artifacts from previous steps
**Output Artifact**:
 md 
# Belief Validation Verdict
## Original Belief
"Documentation is a waste of time for early-stage startups"
## Verdict: 🔄 REFINED
## Updated Belief
"Process documentation is wasteful for early startups. Decision documentation is essential. The minimum viable approach: ADRs (Architecture Decision Records) for tech choices, and a living FAQ for recurring questions."
## What Changed
| Before | After |
|--------|-------|
| Docs = bureaucracy | Docs = async communication |
| All or nothing | Lightweight decision logs |
| "We can just talk" | Talk is expensive, doesn't scale |
## Evidence That Convinced Me
1. My own vault has 3 "wish we documented" regrets
2. Stripe's success with early documentation
3. The "knowledge debt" framing clicked
## Action Items
- [ ] Start ADR practice (1 page per major decision)
- [ ] Create FAQ doc, add to it when questions repeat
- [ ] Stop writing process docs
- [ ] Share refined view with team
  
 **Chain Complete**: ✅ Idea validated through challenge chain 
---
### 📊 Scenario 2 Summary
| Stage | Transformation |
|-------|----------------|
| Challenge | Absolute belief → Nuanced tension |
| Questions | Assumptions → Testable hypotheses |
| Connections | Isolated idea → Linked to evidence |
| Verdict | Refined belief + action items |
**Outcome**: Jake didn't abandon his belief but refined it into something defensible and actionable.
---
# 🎬 SCENARIO 3: Content Pipeline
## The Situation
> **Sarah** has accumulated 20+ notes on "building a second brain." Her newsletter is due in 3 days. She wants to turn her knowledge into a compelling article for her audience of productivity enthusiasts.
## Why This Meta-Skill
- ✅ Has existing knowledge to share
- ✅ Specific format goal (newsletter)
- ✅ Known audience
- ✅ Deadline pressure
---
### 🔗 CHAIN STEP 1: Synthesize Knowledge
 **Skill**: /synthesize-knowledge 
**Sarah's Input**:
  
Notes to synthesize (20 notes on PKM, tagging these):
- [[Progressive Summarization]]
- [[PARA Method]]
- [[Capture vs Create Tension]]
- [[Digital Garden Philosophy]]
- [[Note Maturity Stages]]
[... 15 more notes]
Goal: Find the unifying insight for a newsletter article
  
**Output Artifact**:
 md 
# Synthesis: Second Brain Insights
## Emergent Theme
The "second brain" isn't about storage—it's about **creating surfaces for serendipity**. Every technique (PARA, progressive summarization, linking) increases the probability that relevant knowledge surfaces at the right moment.
## Core Framework
  
Capture → Organize → Surface → Create
↓ ↓ ↓ ↓
Easy Findable Serendipity Output
  
## Key Tension Discovered
Everyone focuses on capture and organize. The magic is in surfacing. Most "second brain" failures are surfacing failures.
## Newsletter Angle
"Why your second brain isn't working: You're building a vault, not a greenhouse"
  
 **Handoff Signal**: → Core insight found, proceed to mental model 
---
### 🔗 CHAIN STEP 2: Build Mental Model
 **Skill**: /build-mental-model 
**Feed it**: Synthesis output
**Output Artifact**:
 md 
# Mental Model: Vault vs Greenhouse
## The Model
**Vault Mentality** (common, failing)
- Optimize for: Storage, retrieval
- Metric: Notes collected
- Fear: Losing information
- Result: Graveyard of notes
**Greenhouse Mentality** (rare, working)
- Optimize for: Growth, connection
- Metric: Ideas combined
- Fear: Isolation of ideas
- Result: Living knowledge system
## Visual
  
VAULT GREENHOUSE
┌─────────┐ ┌─────────┐
│ █ █ █ █ │ │ 🌱──🌿 │
│ █ █ █ █ │ → transform → │ ╲╱ ╲ │
│ █ █ █ █ │ │ 🌱──🌳 │
└─────────┘ └─────────┘
Stored Growing
Static Connected
Retrieved Surfacing
  
## Implication for Reader
Stop asking "where should I store this?"
Start asking "what could this connect to?"
  
 **Handoff Signal**: → Mental model ready, proceed to outline 
---
### 🔗 CHAIN STEP 3: Content Outline
**Sarah creates outline using the synthesis + model**
**Output Artifact**:
 md 
# Newsletter Outline: Vault vs Greenhouse
## Hook (2 sentences)
Your second brain isn't working because you built a vault when you needed a greenhouse. Here's how to transform a note graveyard into a living knowledge system.
## Section 1: The Vault Problem
- We optimize for capture (easy)
- We optimize for organization (comfortable)
- We neglect surfacing (hard, unfamiliar)
- Result: Notes we never see again
## Section 2: The Greenhouse Model
- Introduce the mental model
- Growth > storage
- Connection > collection
- Visual diagram
## Section 3: Three Surfacing Practices
1. **Daily random note** — Force serendipity
2. **Connection ritual** — Link every new note to 3 existing
3. **Weekly synthesis** — Combine notes into new notes
## Section 4: The Transformation
- Vault metric: Notes collected
- Greenhouse metric: Notes that influenced something
- Challenge: Check your "last modified" dates
## CTA
"This week, pick 5 notes you haven't touched in months. Connect each to something new. Watch them come alive."
  
 **Handoff Signal**: → Outline complete, proceed to draft 
---
### 🔗 CHAIN STEP 4: Draft Content
**Sarah writes using outline as skeleton**
**Output Artifact** (Newsletter Draft):
 md 
# Why Your Second Brain Isn't Working
Your second brain is failing—not because you're not capturing enough, but because you built a vault when you needed a greenhouse.
Let me explain.
## The Vault Problem
We've all been there. You read something brilliant, highlight it, save it to your note-taking app, tag it perfectly... and never see it again.
The note sits there. Pristine. Organized. Completely useless.
This is the Vault Problem. We optimize for:
- **Capture** (because it feels productive)
- **Organization** (because it feels clean)
- **Retrieval** (which rarely happens)
We neglect the only thing that matters: **surfacing**.
A vault stores things. A greenhouse grows things.
[... continues with full draft ...]
---
*This week's challenge: Pick 5 notes you haven't touched in months. Connect each to something new. Watch them come alive.*
  
 **Chain Complete**: ✅ Knowledge transformed to publishable content 
---
### 📊 Scenario 3 Summary
| Stage | Input | Output |
|-------|-------|--------|
| Synthesize | 20 scattered notes | Core insight + theme |
| Mental model | Insight | Vault vs Greenhouse framework |
| Outline | Framework | 4-section structure |
| Draft | Outline | 800-word newsletter |
**Time**: 2 hours from notes to draft
**Reusability**: Mental model can become its own atomic note
---
# 🎬 SCENARIO 4: Decision Navigator
## The Situation
> **Marcus** is a senior engineer choosing between staying at his current company (stable, good pay, boring work) or joining an early-stage startup (exciting, equity, risky). He's been going in circles for weeks.
## Why This Meta-Skill
- ✅ High-stakes decision
- ✅ Multiple competing factors
- ✅ Emotional involvement
- ✅ Analysis paralysis
---
### 🔗 CHAIN STEP 1: Challenge This Idea
 **Skill**: /challenge-this-idea 
**Marcus's Input**:
  
I'm leaning toward: Staying at my current company
Reasoning: The startup is too risky. I have a mortgage and kids. The smart move is stability.
  
**Output Artifact**:
 md 
# Decision Challenge: Stay vs Startup
## Devil's Advocate: Why Staying Might Be Wrong
1. **Regret Asymmetry**: Will you regret not trying more than trying and failing?
2. **Golden Handcuffs**: "Stability" can become a prison
3. **Skill Atrophy**: Boring work = stagnating skills
4. **Market Timing**: You're 35, not 55—recovery time exists
5. **Kids Argument Reversal**: Do you want them to see you play it safe?
## Steelman for Startup
"Financial risk is real but bounded. Career risk of staying in a dying role is unbounded. The startup is a 2-year experiment with asymmetric upside."
## Hidden Assumptions in "Stay" Position
| Assumption | Challenge |
|------------|-----------|
| Current job is stable | Industry disruption? Layoffs? |
| Startup = financial ruin | You have savings. Worst case? |
| Kids need stability | Kids need a present, fulfilled parent |
| This is the only startup | If not this one, would another? |
## Questions This Raises
- What's the actual financial worst case, quantified?
- Is "boring" fixable at current company?
- What would make the startup a clear yes?
  
 **Handoff Signal**: → Assumptions challenged, proceed to deepen 
---
### 🔗 CHAIN STEP 2: Generate Questions
 **Skill**: /generate-questions 
**Output Artifact**:
 md 
# Decision-Critical Questions
## Financial Reality Check
1. If startup fails in 18 months, what's the actual damage? (Calculate it)
2. How many months of runway do savings provide?
3. What's the startup's funding situation? Runway?
4. What's your market value if you need to job search?
## Career Trajectory Questions
1. Where does current path lead in 5 years?
2. What skills does the startup build that current job doesn't?
3. If you stay, what's the "stay excited" plan?
4. Is the startup's domain where the industry is going?
## Values Alignment Questions
1. What do you want your kids to learn from this decision?
2. When you imagine yourself at 50, which choice leads to fewer regrets?
3. What does your gut say when you remove fear?
## Reversibility Questions
1. If you join and hate it, can you return to similar role?
2. If you stay and it gets worse, what's the exit?
3. What's the "try it and fail" scenario?
  
 **Handoff Signal**: → Questions mapped, proceed to analysis 
---
### 🔗 CHAIN STEP 3: Decision Analysis
 **Skill**: /decision-analysis 
**Feed it**: Challenge + questions + Marcus's answers
**Output Artifact**:
 md 
# Decision Analysis: Career Choice
## Options Evaluated
### Option A: Stay at Current Company
**Pros**:
- Financial stability (known salary)
- Low stress
- Time with family
**Cons**:
- Skill stagnation
- Growing resentment
- No equity upside
**Risk profile**: Low short-term, high long-term
### Option B: Join Startup
**Pros**:
- Learning acceleration
- Equity potential
- Excitement/meaning
**Cons**:
- Salary cut (30%)
- Failure risk
- More hours initially
**Risk profile**: High short-term, potentially high reward
---
## Quantified Worst Case (Option B)
| Factor | Reality |
|--------|---------|
| Salary cut | -$40k/year |
| If fails in 18 months | -$60k total |
| Savings buffer | 8 months expenses |
| Market re-entry time | ~3 months historically |
**Actual worst case**: 18 months of hard work, -$60k, back to similar job
**This is survivable**: Yes
---
## Decision Matrix
| Criterion (Weight) | Stay | Startup |
|--------------------|------|---------|
| Financial security (25%) | 9 | 5 |
| Career growth (25%) | 3 | 9 |
| Daily fulfillment (20%) | 4 | 8 |
| Family time (15%) | 7 | 5 |
| Long-term trajectory (15%) | 4 | 8 |
| **Weighted Score** | **5.4** | **7.1** |
---
## Regret Minimization
**If you stay**: "I'll always wonder what if. In 10 years, will I resent playing it safe?"
**If you go and it fails**: "I tried. I learned. I can tell my kids I took a shot."
**Asymmetry**: Regret of not trying > Regret of trying and failing
  
 **Handoff Signal**: → Analysis complete, proceed to synthesis 
---
### 🔗 CHAIN STEP 4: Synthesize Decision
 **Skill**: /synthesize-knowledge 
**Output Artifact**:
 md 
# Decision Synthesis
## The Core Insight
This isn't a decision between stability and risk. It's a decision between **two types of risk**:
1. **Visible risk** (startup): Financial, known, bounded, recoverable
2. **Invisible risk** (stay): Career stagnation, unknown, unbounded, compounds
The "safe" choice isn't safe. It's just a different kind of gamble.
## Decision Framework Created
  
For any career decision, ask:
1. What's the ACTUAL worst case? (Quantify it)
2. Is the worst case survivable?
3. What's the invisible risk of the "safe" option?
4. Which regret is worse: trying or not trying?
  
## My Decision
**Join the startup**, with conditions:
- Negotiate 3-month runway guarantee
- Set 18-month evaluation point
- Maintain network at current company
- Create monthly family check-in on stress levels
## Why This Is Right For Me
The numbers support it, but more importantly: the person I want to be takes calculated risks for growth. Staying would be a slow betrayal of that person.
  
 **Chain Complete**: ✅ Decision reached through structured navigation 
---
# 🎬 SCENARIO 5: Learning Path Designer
## The Situation
> **Priya** wants to learn Rust programming. She's an experienced Python developer but has heard Rust is "hard." She doesn't know where to start or how deep to go.
## Why This Meta-Skill
- ✅ Specific skill to acquire
- ✅ Unclear learning path
- ✅ Fear/uncertainty about difficulty
- ✅ Wants structured approach
---
### 🔗 CHAIN STEP 1: Deep Research
 **Skill**: /deep-research 
**Priya's Input**:
  
I want to learn Rust programming.
Background: 5 years Python, some C experience
Goal: Build CLI tools and possibly contribute to open source
Timeline: 3 months part-time
  
**Output Artifact**:
 md 
# Research Plan: Learning Rust
## Learning Landscape
### What Makes Rust "Hard"
1. Ownership system (completely new mental model)
2. Borrow checker (compiler fights you)
3. Explicit error handling (no exceptions)
4. Lifetimes (advanced, can defer)
### What Transfers from Python
- Pattern matching (similar to match statement)
- Iterators and functional patterns
- Strong typing (if you use type hints)
### What Transfers from C
- Memory awareness
- Systems-level thinking
- Compilation model
## Resource Map
| Resource | Type | Depth |
|----------|------|-------|
| The Rust Book | Official guide | Comprehensive |
| Rustlings | Exercises | Practice |
| Rust by Example | Code snippets | Reference |
| Jon Gjengset videos | Deep dives | Advanced |
## Learning Sequence Recommendation
1. Chapters 1-4 of Rust Book (basics)
2. Rustlings exercises (practice)
3. Build small CLI tool (apply)
4. Chapters 5-10 (intermediate)
5. Contribute to good-first-issues (real world)
## Key Concepts to Master
- [ ] Ownership (the big one)
- [ ] Borrowing & references
- [ ] Enums and pattern matching
- [ ] Error handling with Result
- [ ] Traits (Rust's interfaces)
- [ ] Cargo and ecosystem
  
 **Handoff Signal**: → Learning landscape mapped, proceed to concept breakdown 
---
### 🔗 CHAIN STEP 2: Explain Concept
**Skill**: /explain-concept (applied to the hardest part)
**Feed it**: "Explain Rust ownership to a Python developer"
**Output Artifact**:
 md 
# Concept Explanation: Rust Ownership
## For a Python Developer
### In Python
 python 
x = [1, 2, 3]
y = x # Both point to same list
y.append(4)
print(x) # [1, 2, 3, 4] - Python doesn't care
  
### In Rust
 rust 
let x = vec![1, 2, 3];
let y = x; // Ownership MOVED to y
println!("{:?}", x); // ERROR! x is no longer valid
  
## The Mental Shift
**Python model**: Variables are labels pointing to objects
**Rust model**: Variables OWN values, ownership can transfer
## Why This Exists
Rust guarantees memory safety WITHOUT garbage collection by tracking who owns what at compile time.
| Language | Memory Safety | How |
|----------|---------------|-----|
| Python | GC cleans up | Runtime cost |
| C | You manage | Bugs possible |
| Rust | Compiler enforces | Ownership rules |
## The Three Rules
1. Each value has ONE owner
2. When owner goes out of scope, value is dropped
3. Ownership can be transferred (moved) or borrowed
## Your Python Intuition Will Fight This
| Python Habit | Rust Reality |
|--------------|--------------|
| Pass object to function, use it after | Can't—ownership moved |
| Store same object in two places | Can't—one owner only |
| Modify while iterating | Can't—borrow rules |
## How to Adapt
1. **Default to cloning** (like Python) at first—it's fine
2. **Learn borrowing** when cloning feels wasteful
3. **Trust the compiler**—it's teaching you, not fighting you
  
 **Handoff Signal**: → Key concept explained, proceed to practice questions 
---
### 🔗 CHAIN STEP 3: Generate Questions
 **Skill**: /generate-questions 
**Feed it**: Learning plan + concept explanations
**Output Artifact**:
 md 
# Learning Checkpoint Questions
## Ownership (must answer YES to proceed)
- [ ] Can you explain why let y = x makes x invalid?
- [ ] Can you draw ownership transfer in a function call?
- [ ] Can you explain when to clone vs borrow?
## Borrowing (next level)
- [ ] What's the difference between & and &mut?
- [ ] Why can't you have &mut and & at the same time?
- [ ] How do lifetimes relate to borrowing?
## Practice Challenges
1. **Ownership**: Rewrite this Python code in Rust without cloning:
 python 
def process(items):
for item in items:
print(item)
return len(items)
  
2. **Error Handling**: Build a function that reads a file and handles missing file, permission error, and parse error differently
3. **CLI Tool**: Create a word counter that reads from stdin or file argument
  
 **Handoff Signal**: → Checkpoints created, proceed to mental model 
---
### 🔗 CHAIN STEP 4: Build Mental Model
 **Skill**: /build-mental-model 
**Feed it**: All learning artifacts
**Output Artifact**:
 md 
# Rust Learning Mental Model
## The Journey Map
  
AWARENESS UNDERSTANDING APPLICATION MASTERY
│ │ │ │
▼ ▼ ▼ ▼
"Rust exists" "Ownership makes "I can build "I think in
sense now" CLI tools" ownership"
│ │ │ │
└── Week 1-2 ───────└── Week 3-6 ──────└── Week 7-10 ────└── Ongoing
  
## Concept Dependency Graph
  
FUNDAMENTALS
├── Variables & Types
├── Functions
└── Control Flow
│
▼
OWNERSHIP (The Gate)
├── Move semantics
├── Borrowing
└── Lifetimes (later)
│
▼
ERROR HANDLING
├── Result<T, E>
├── Option<T>
└── ? operator
│
▼
INTERMEDIATE
├── Structs & Enums
├── Traits
└── Generics
│
▼
YOUR GOALS
├── CLI tools
└── Open source
  
## Learning Strategy
| Week | Focus | Proof of Learning |
|------|-------|-------------------|
| 1-2 | Rust Book Ch 1-4 | Complete Rustlings basics |
| 3-4 | Ownership deep dive | Explain to rubber duck |
| 5-6 | Error handling | Build file processor |
| 7-8 | First CLI tool | Ship to crates.io |
| 9-10 | Find good-first-issue | Submit PR |
## When You're Stuck
The borrow checker error → Read it carefully, it's usually right
"I don't know why this works" → That's fine, keep going
"I'm slower than Python" → Normal, speed comes later
  
 **Chain Complete**: ✅ Learning path designed with checkpoints 
---
# 🎬 SCENARIO 6: Note Evolver
## The Situation
> **Tom** has a quick note from a podcast: "Naval says specific knowledge is knowledge you can't be trained for." It's been sitting in his vault for 2 months. He wants to turn it into something useful.
## Why This Meta-Skill
- ✅ Has raw/seed note
- ✅ Note is stuck/isolated
- ✅ Wants to integrate into vault
- ✅ Sees potential value
---
### 🔗 CHAIN STEP 1: Assess Note Maturity
 **Skill**: /assess-note-maturity 
**Tom's Input**:
 md 
# Specific Knowledge
Naval says specific knowledge is knowledge you can't be trained for.
---
created: 2024-11-15
  
**Output Artifact**:
 md 
# Maturity Assessment
## Current State
| Criterion | Status | Notes |
|-----------|--------|-------|
| Clear title | ⚠️ | Too vague—what ABOUT specific knowledge? |
| Atomic | ⚠️ | Potentially—but underdeveloped |
| Own words | ❌ | Direct quote, no interpretation |
| Connections | 0 | Completely isolated |
| Metadata | ❌ | No tags, no type |
| In MOC | ❌ | Not placed |
## Verdict
**Current Stage**: 📤 Seed
**Quality**: Low—this is a capture, not a note
## Core Idea (Reconstructed)
"Some valuable knowledge can only be acquired through unique life experience, not formal training. This knowledge is rare and therefore valuable."
## Primary Blocker
**Not in own words** — It's a quote capture, not a processed idea
**No context** — What does this mean TO YOU?
## Worth Maturing?
**Yes** — This connects to career strategy, learning philosophy, competitive advantage. High potential value.
  
 **Handoff Signal**: → Assessment complete, proceed to develop & connect 
---
### 🔗 CHAIN STEP 2: Develop the Note (Manual + Challenge)
**Tom rewrites the note in his own words**
**Evolved Note**:
 md 
# Specific knowledge cannot be taught
There's a category of valuable knowledge that can't be acquired through courses, books, or training programs. Naval Ravikant calls this "specific knowledge."
**Why it can't be taught:**
- It emerges from unique combination of your experiences
- It lives at the intersection of unusual skill combinations
- It requires context that can't be transferred
- If it could be taught, it would be commoditized
**Examples:**
- A designer who's also a developer AND understands sales psychology
- Deep expertise in a niche that seems "weird" to pursue
- Pattern recognition from failed startups
**Implication for my career:**
Instead of asking "what should I learn?", ask "what am I uniquely positioned to understand?"
Source: Naval Ravikant podcast
  
 **Handoff Signal**: → Note developed, proceed to find connections 
---
### 🔗 CHAIN STEP 3: Find Connections
 **Skill**: /find-connections 
**Feed it**: The evolved note
**Output Artifact**:
 md 
# Connection Map: Specific Knowledge
## Structural Connections (same domain)
- [[Career Moats]] — specific knowledge IS a moat
- [[Skill Stacking]] — unique combinations create specific knowledge
- [[Learning Philosophy]] — reframes what's worth learning
## Bridge Connections (cross-domain)
- [[Compound Interest]] — specific knowledge compounds
→ Insight: Early weird interests pay off exponentially later
- [[Creativity as Combination]] — specific knowledge = novel combinations
→ Insight: Your "random" interests ARE your edge
- [[Competitive Advantage]] — Porter's framework applies to careers
→ Insight: Differentiation > cost leadership for individuals
## New Insight Discovered
The advice "follow your curiosity" isn't just about happiness—it's a strategy for building specific knowledge. Random curiosity → unique skill stack → unteachable expertise.
## MOC Placement
- Primary: [[Career Strategy MOC]]
- Secondary: [[Learning MOC]]
- Link from: [[Personal Competitive Advantage]]
## Notes to Create (Emerged)
- [[Follow curiosity as strategy, not just happiness]]
- [[Skill stacking creates specific knowledge]]
  
 **Handoff Signal**: → 5 connections found + 2 new notes emerged, proceed to metadata 
---
### 🔗 CHAIN STEP 4: Suggest Metadata + Integrate
 **Skill**: /suggest-metadata 
**Output Artifact**:
 md 
# Final Evolved Note
---
title: Specific knowledge cannot be taught
type: atomic
maturity: 🪴 sapling
tags: [career, learning, competitive-advantage, naval-ravikant]
created: 2024-11-15
modified: 2025-01-26
MOC: "[[Career Strategy MOC]]"
related:
- "[[Career Moats]]"
- "[[Skill Stacking]]"
- "[[Creativity as Combination]]"
---
# Specific knowledge cannot be taught
There's a category of valuable knowledge that can't be acquired through courses, books, or training programs. Naval Ravikant calls this "specific knowledge."
**Why it can't be taught:**
- It emerges from unique combination of your experiences
- It lives at the intersection of unusual skill combinations
- It requires context that can't be transferred
- If it could be taught, it would be commoditized
**Examples:**
- A designer who's also a developer AND understands sales psychology
- Deep expertise in a niche that seems "weird" to pursue
- Pattern recognition from failed startups
**Implication:**
Instead of asking "what should I learn?", ask "what am I uniquely positioned to understand?"
**My specific knowledge:**
[Personal reflection space]
---
## Links
- Relates to [[Career Moats]] — specific knowledge IS a moat
- Supports [[Skill Stacking]] — unique combinations create this
- Explains why [[Follow curiosity as strategy, not just happiness]]
Source: Naval Ravikant podcast
  
 **Chain Complete**: ✅ Note evolved from 📤 Seed to 🪴 Sapling 
---
### 📊 Scenario 6 Summary
| Stage | Before | After |
|-------|--------|-------|
| Content | 1 sentence quote | 150 words, own interpretation |
| Connections | 0 | 5 quality links |
| Metadata | None | Full frontmatter |
| MOC | None | Career Strategy MOC |
| Maturity | 📤 Seed | 🪴 Sapling |
**Bonus output**: 2 new atomic notes emerged from connections
---
# 🧭 Quick Reference: Choosing a Meta-Skill
  
START HERE: What do you have?
│
├─ Curiosity about a topic
│ └─→ Research Orchestrator
│
├─ A belief to test
│ └─→ Idea Validator
│
├─ Knowledge to publish
│ └─→ Content Pipeline
│
├─ A decision to make
│ └─→ Decision Navigator
│
├─ A skill to learn
│ └─→ Learning Path Designer
│
└─ A note to improve
└─→ Note Evolver
  
---
## 📝Changelog
- **1.0.0 (2025-01-26)** — Created comprehensive playbook with 6 scenarios demonstrating all meta-skills. Includes realistic note flows, artifacts, and decision guidance.