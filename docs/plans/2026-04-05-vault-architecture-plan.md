# Vault Architecture Plan

## The Problem

Two vaults (Origin DEV + MAIN) drifted apart. Manual changelog to track changes is not maintainable. WinMerge to resolve differences is not maintainable. The root cause: no clear rules about what can change where.

## The Model

```
Origin DEV  ←  only place config/structure changes happen
    ↓
 promote (explicit, deliberate)
    ↓
MAIN (Ideaverse)  ←  only place personal content lives
```

**Origin DEV owns:** plugins, plugin settings, templates, scripts, folder structure, Linter rules, QuickAdd macros, hotkeys.

**MAIN owns:** all personal notes, content, attachments. Nothing else.

**The rule:** MAIN never makes config changes directly. If you want to change a template or plugin setting — do it in Origin DEV first, test it, then promote it.

## What "Stable" Means

Not perfect. This set of things works reliably:

- [ ] Rules are written and agreed (this document)
- [ ] Promotion workflow documented and tested at least once
- [ ] MAIN config aligned to Origin DEV (one-time reset, with review)

## What Is Explicitly Deferred

- Work vault (second downstream — comes after MAIN is stable)
- AI access boundaries (separate concern)
- Automating the promotion process (manual is fine for v1)
- Origin-Minimal public release (on hold)

## Promotion Workflow (draft)

When a change in Origin DEV is tested and ready:

1. Identify what changed — which files, which plugin, which template
2. Copy only those specific files to MAIN (never bulk copy folders)
3. Verify in MAIN that the change works and nothing broke
4. Done — no changelog needed, the git history in Origin DEV is the record

**What never gets promoted:** personal notes, attachments, PDFs, images, session files, workspace state.

## The One-Time MAIN Reset

Current state: unknown drift between Origin DEV and MAIN config.

When ready to align:
1. **Warning:** this will overwrite MAIN plugin settings and templates
2. Review diff between Origin DEV and MAIN for each config file before applying
3. Apply file by file, verify after each
4. From that point on — follow the promotion workflow above

## Phases to Get There

1. **Define ownership** — go through each file type and decide: Origin DEV owns it or MAIN owns it. Write it down.
2. **Document promotion workflow** — make it a one-page reference, test it with one real change.
3. **MAIN alignment** — one-time reset with review step. Get MAIN to known state.

---

## Pre-Promotion Checklist

Gate: all items must be green before promoting DEV → MAIN.

- [ ] Fix 1 (plugin configs) verified working in Obsidian (QuickAdd, Templater, Linter, Auto-mover)
- [ ] Fix 2 (Migration Guide) architecture tree matches actual v2.0 folder structure
- [ ] Smoke test: every QuickAdd menu, Templater folder template, Linter rule fires without path errors
- [ ] Verification grep returns zero stale paths (`grep -rln "02-Dots\|07-Prompts\|00-Meta\|/Ongoing\|/Simmering" .obsidian/`)

## Promotion Method

Preserves MAIN's git history — do **not** clone DEV over MAIN.

1. Identify the exact file delta DEV → MAIN (plugin configs, scripts, templates only — no personal notes)
2. Copy each changed file individually from DEV to MAIN
3. Commit in MAIN referencing the DEV commit hash: `promotion: sync v2.0 configs from DEV (ref: <hash>)`
4. Personal notes and attachments in MAIN are never touched

---
*Created: 2026-04-05*
*Status: Active — gated on v2.0 verification*
