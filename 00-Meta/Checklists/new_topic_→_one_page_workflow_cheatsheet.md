# New Topic → One‑Page Workflow Cheatsheet
Use this when you add any **brand‑new topic** (example: *Cryptography*). It’s a compact map of *what to create* and *iyy\n what order*, with file paths and YAML invariants.

---
## 1) Visual Flow (5‑minute drill)
```
Start new topic
   │
   ▼
Seed 2–3 Atomics (Concepts)
   │      └─ PATH → 02-Dots/100-Atomics/Concepts/
   │
   ▼
Add 1 Source note (book/article/video)
   │      └─ PATH → 04-Sources/
   │
   ▼
Create Sprint Effort (2 weeks)
   │      └─ PATH → 03-Efforts/
   │
   ▼
Create MOC (scope + anchors)
   │      └─ PATH → 01-MOCs/
   │
   ▼
Link everything (MOC ↔ Atomics ↔ Source ↔ Effort)
   │
   ▼
Governance checks (YAML + links)
   │
   ▼
Regression checks (dashboards/queries see it)
   │
   ▼
Done → Iterate (add atomics from reading/exercises)
```

---
## 2) What to Create (exact files)
**A. MOC**
- `01-MOCs/<Topic> (MOC).md`
- Contents: Scope paragraph; sections for Atomics, Sources, Efforts; Related links; Log.

**B. Atomics (2–3 to start)**
- `02-Dots/100-Atomics/Concepts/<Topic> – <Concept>.md`
- Contents: Claim/definition; Why it matters (tester/engineer angle); Examples; Checks; Related.

**C. Source (1 to start)**
- `04-Sources/<Topic> – Starter Sources.md` (or a specific book/article)
- Contents: Tiered list; Extracted Insights checklist (turn highlights → Atomics).

**D. Effort (Sprint 01)**
- `03-Efforts/<Topic> – Sprint 01.md`
- Contents: Goals, Tasks, Definition of Done, Retro, `start`, `due`, `next_action`.

---
## 3) YAML Invariants (copy‑paste mental model)
For **MOC**:
```yaml
---
type: MOC
status: 🟢 Active
in: []
up: []
related: []
---
```
For **Atomic**:
```yaml
---
type: Atomic
status: 📝 Draft
in: [[<Topic> (MOC)]]
up: []
related: []
---
```
For **Source**:
```yaml
---
type: Source
status: 📚 Reading
in: [[<Topic> (MOC)]]
related: []
---
```
For **Effort**:
```yaml
---
type: Effort
status: 🟢 Active
in: [[<Topic> (MOC)]]
start: YYYY-MM-DD
due: YYYY-MM-DD
next_action: "…"
---
```

---
## 4) Governance Checks (pass/fail)
- **Type correctness:** Each note has the right `type` (MOC/Atomic/Source/Effort).
- **Status emoji:** Use your standard set (🟢 Active / 📝 Draft / 📚 Reading / etc.).
- **Anchors:** MOC lists Atomics, Sources, Effort; each Atomic has `in: [[<Topic> (MOC)]]`.
- **Related:** Put 1–3 meaningful backlinks in `related:` and a "🔗 Related" section.
- **No orphans:** Each new note links to ≥2–3 other notes.

---
## 5) Regression Checks (queries should “just work”)
- New **Source** appears in source dashboards (by `type`/`status`).
- New **Effort** appears in active‑work views (by `type: Effort`, `status`, `due`).
- Recent **Atomics** show up in "recently edited"/"by folder" views.

---
## 6) Naming Guide (fast patterns)
- MOC: `<Topic> (MOC)` → e.g., `Cryptography (MOC)`
- Atomic: `<Topic> – <Concise concept>` → e.g., `Crypto – Kerckhoffs's principle`
- Source: `<Topic> – Starter Sources` or exact title
- Effort: `<Topic> – Sprint 0N` (duration in title optional)

---
## 7) Definition of Done for a New Topic
- [ ] 1 MOC created and linked.
- [ ] ≥2 Atomics seeded; both linked in MOC.
- [ ] 1 Source captured; insights checkbox added.
- [ ] 1 Effort planned (dates + `next_action`).
- [ ] Governance + Regression checks both pass.

---
## 8) Optional Add‑Ons (when the topic grows)
- Create secondary MOCs (e.g., `TLS (MOC)`, `OAuth (MOC)`).
- Promote recurring work into Epics/Programs under `03-Efforts`.
- Add a **QA checklist** Atomic (e.g., *Crypto Review Checklist*) for PR reviews.

