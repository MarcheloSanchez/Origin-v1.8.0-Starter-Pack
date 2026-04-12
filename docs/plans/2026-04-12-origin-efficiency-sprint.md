---
title: Origin Efficiency Sprint
date: 2026-04-12
status: active
type: plan
---

# Origin Efficiency Sprint

Derived from 3-pass vault evolution simulation (2026-04-12) + autonomous loops analysis.
Three bottlenecks: broken connections, polluted inbox, dead prompts.

---

## Safeguard Rules (apply before every phase)

These exist because autonomous loops can cause bulk damage silently.

1. **Never auto-commit** — keep the commit step manual until each script has been verified correct 3+ times
2. **Backup before bulk** — `git stash` or commit current state before any script that touches >5 files
3. **Dry-run first** — every new script runs in report-only mode on first execution, no writes
4. **Manual review gate** — after any automated pass, `git diff` before committing
5. **One phase at a time** — do not start Phase 2 until Phase 1 is verified working

---

## Phase 0 — Foundation (do now, ~10 min, fully manual)

These require no scripts. They prevent future backfires.

- [ ] Add output rules to `CLAUDE.md` (project level):
  ```markdown
  ## File Output Rules
  - Analysis/audit output → `00-Meta/`
  - Architecture/design docs → `docs/plans/`
  - Session artifacts → never to `+Inbox`
  - `+Inbox` is for human-captured ideas only
  ```
- [ ] Move current inbox artifacts manually (review each before moving):
  - `+Inbox/tag-audit-2026-04-06.md` → `00-Meta/`
  - `+Inbox/vault-orphans-2026-04-06.md` → `00-Meta/`
  - `+Inbox/vault-architecture-plan.md` → `docs/plans/`
  - `+Inbox/windows-folder-system-design.md` → `docs/plans/`
- [ ] Commit: `chore: move session artifacts out of inbox`

**Why manual:** These 4 files need your eyes — confirm they're not captures before moving.

---

## Phase 1 — First Automation: vault-morning.sh (this week, ~45 min)

**Pattern:** Sequential Pipeline — 3 steps, each a focused `claude -p` call.

**Risk profile:** Medium. Inbox triage requires judgment. Safeguard: dry-run mode first.

### Script: `claude-scripts/vault-morning.sh`

```bash
#!/bin/bash
# vault-morning.sh — daily vault maintenance pipeline
# Run: bash claude-scripts/vault-morning.sh [--dry-run]

set -e

VAULT="C:/Users/MarcelMachanec/Documents/_Foundation for ORIGIN/Origin_DEV_STARTER_PACK/Origin-v1.9.1-Starter-Pack"
DRY_RUN=${1:-""}

echo "=== Origin Vault Morning Maintenance ==="
echo "Vault: $VAULT"
echo "Mode: ${DRY_RUN:-live}"
echo ""

# SAFEGUARD: ensure clean baseline
cd "$VAULT"
if [ -n "$(git status --porcelain)" ]; then
  echo "⚠️  Uncommitted changes detected. Stashing before proceeding..."
  git stash push -m "vault-morning auto-stash $(date +%Y-%m-%d)"
fi

# Step 1: Inbox triage (report only if dry-run)
if [ "$DRY_RUN" = "--dry-run" ]; then
  claude -p "Scan +Inbox/ in '$VAULT'. 
    List every file and classify each as: CAPTURE (user idea/note) or ARTIFACT (session output, audit, design doc, architecture plan).
    Do NOT move anything. Just print the classification table."
else
  claude -p "Scan +Inbox/ in '$VAULT'.
    Move files that are audit reports, architecture plans, or session outputs:
      - Audit/report files → 00-Meta/
      - Design/architecture docs → docs/plans/
    Leave only genuine user captures (ideas, notes written by a person).
    Print exactly what was moved and where."
fi

# Step 2: Metrics cache refresh (always safe — only writes to one file)
claude -p "Update the metrics cache at '$VAULT/00-Meta/_Metrics Cache.md'.
  Count using bash: find each folder, count .md files.
  Folders to count: +Inbox, 02-Dots, 03-Efforts, 04-Sources, 05-Calendar, 06-Archive, 07-Prompts.
  Update these inline fields: total_notes, inbox_count, atomic_count, effort_count, source_count, archived_count, cache_timestamp, cache_date.
  Do NOT touch health scores or gamification fields — those require live Dataview queries."

# Step 3: Git diff preview (always — before any commit)
echo ""
echo "=== Changes summary ==="
git diff --stat
echo ""
echo "Review the diff above. Commit manually when satisfied:"
echo "  git add -A && git commit -m 'vault: morning maintenance $(date +%Y-%m-%d)'"
```

### Verification checklist before using live mode:
- [ ] Run `--dry-run` first — confirm inbox classification looks correct
- [ ] Check metrics update is accurate (compare to manual count)
- [ ] Run live mode once, review `git diff` before committing
- [ ] If both correct: script is trusted, can run unattended

---

## Phase 2 — De-Sloppify Pass (after Phase 1 verified, ~20 min)

**Pattern:** De-Sloppify — separate cleanup agent after any vault edit session.

**Risk profile:** Medium-High. YAML edits can corrupt frontmatter. Safeguard: backup always runs first.

### Script: `claude-scripts/vault-desloppify.sh`

```bash
#!/bin/bash
# vault-desloppify.sh — YAML cleanup after any edit session
# Run: bash claude-scripts/vault-desloppify.sh

VAULT="C:/Users/MarcelMachanec/Documents/_Foundation for ORIGIN/Origin_DEV_STARTER_PACK/Origin-v1.9.1-Starter-Pack"

cd "$VAULT"

# SAFEGUARD: mandatory backup before bulk YAML edits
echo "Creating backup commit before YAML cleanup..."
git add -A
git commit -m "vault: pre-desloppify snapshot $(date +%Y-%m-%d_%H%M)" || echo "Nothing to snapshot"

claude -p "Review all .md files modified in the last git commit in '$VAULT'.
  Check each for YAML violations:
  - maturity: 🌱seed → fix to 📤seed  
  - status without emoji prefix (e.g. 'active' → '🔄active')
  - tags without emoji prefix
  - field named 'deadline' → rename to 'due'
  
  Fix violations using sed with ^ anchors to avoid false matches in note body.
  Run git diff after fixes — if diff looks wrong, git stash and report the issue.
  Print a summary: N files checked, N violations fixed."
```

**Key safeguard:** The snapshot commit before running means you can always `git reset --hard HEAD~1` to undo.

---

## Phase 3 — Prompt Activation Loop (after Phase 2 verified, ~1 hr)

**Pattern:** Infinite Agentic Loop — parallel agents, each reviewing a category.

**Risk profile:** Low-Medium. Writes `prompt_status` field only. Safeguard: one agent first, check output before parallel.

### Spec: `99-System/Config/prompt-activation-spec.md`

```markdown
# Prompt Activation Spec

## Goal
Review draft prompts and promote worthy ones from `draft` → `active`.

## Activation Criteria
- Clear, specific instruction (not vague)
- Reusable across multiple contexts  
- Outcome is predictable — you know what output to expect
- Not a duplicate of an existing active prompt

## Per-agent output
For each prompt reviewed:
- Activating: set `prompt_status: active`, update `modified` to today
- Keep draft: add `draft_note: "reason it's not ready"` field
- Archive: set `prompt_status: archived`

## Each agent reviews: 10 prompts from their assigned category
```

### Run sequence (staged, not all-parallel until verified):

```bash
# Stage 1: one agent, one category — verify output before scaling
claude -p "Read '$VAULT/99-System/Config/prompt-activation-spec.md'.
  Find 10 draft prompts (prompt_status: draft) in '$VAULT/07-Prompts/Workbench/'.
  Apply the spec. Print a table: file | old status | new status | reason."

# Stage 2 (only after Stage 1 output looks correct): parallel agents per category
# Each agent gets a different keyword to filter by in content
```

---

## Phase 4 — Smart Connections Wiring (lowest effort, highest long-term impact)

**Pattern:** Zero-code — QuickAdd configuration only.

**Risk profile:** Zero. This is a UI config change inside Obsidian.

- [ ] Open Obsidian → QuickAdd settings → find the atomic note processing macro
- [ ] Add step after `quick-process-atomic.js`: run command `Smart Connections: Open view`
- [ ] Test: process one inbox note, verify Smart Connections panel opens showing similar notes

---

## Success Metrics (check after 30 days)

| Metric | Baseline (2026-04-12) | Target |
|--------|----------------------|--------|
| Inbox count | 8 (4 artifacts) | ≤ 3, all genuine captures |
| Real orphan count | ~490 | < 400 |
| Active prompts | 0 | ≥ 15 |
| Metrics cache age | 21 days | < 2 days |
| Inbox pollution incidents | recurring | 0 (CLAUDE.md rule in place) |

---

## What is NOT automated (by design)

These stay manual — autonomous loops would create more risk than value:

- **Linking notes** — Smart Connections surfaces suggestions, you decide. Claude should never add `[[links]]` autonomously.
- **Archiving notes** — requires judgment about what's still relevant
- **Deleting anything** — ever
- **Modifying templates** — high blast radius, must be deliberate
- **Committing** — always manual until a script has earned trust through 3+ verified runs

---

## Cross-Session Context

This file is the `SHARED_TASK_NOTES.md` equivalent for vault sessions.

When starting a new Claude Code session to continue this sprint:
> "Read `docs/plans/2026-04-12-origin-efficiency-sprint.md`. Continue from the next unchecked item in the current phase."
