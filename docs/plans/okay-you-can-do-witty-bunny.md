# Smoke-Test Issues — Origin v2.0 Post-Migration Fixes

## Context

Marchelo ran the Obsidian smoke test after the v2.0 plugin config repair and identified 9 issues across scripts, QuickAdd config, and vault consistency. Previous plan (plugin path repair, gitignore, promotion gating) is complete. This plan addresses what the smoke test surfaced.

Issues are grouped by category, ordered by type: bugs first, then behavioral improvements (NOTES), then structural/doc cleanup.

---

## Issue 1 — QuickAdd Insert Menu: JS errors on Callout and ToC

**File:** `.obsidian/plugins/quickadd/data.json` (tracked)

**Root cause:** The `💭Insert Callout` and `➕Insert Table of content` choices are Capture type choices whose `format` field contains Templater syntax (`<%* tp.system.prompt(...) %>`, `tp.file.content`, etc.). QuickAdd Capture format is processed by QuickAdd's own template engine — it does NOT invoke Templater unless the choice has `"useTemplater": true` in its config. Without that flag, QuickAdd tries to parse `<%* ... %>` as its own syntax, which fails with "Invalid or unexpected token".

**Action:** In `data.json`, find both Capture choices under `MENU: 🔗 Insert` and add `"useTemplater": true` to each. Use Python inline script for the JSON edit (never hand-edit JSON). Backup first.

**Verification:** Trigger both choices in Obsidian → no JS error, picker/prompt appears.

---

## Issue 2 — QuickAdd Insert LINK: useless entry

**File:** `.obsidian/plugins/quickadd/data.json`

**Current behavior:** Format is literally `[[]]` — inserts an empty wikilink. Obsidian already completes `[[` natively; this adds no value.

**Action:** Delete the `🔗LINK` Capture choice from `MENU: 🔗 Insert` entirely. If the Insert menu then has only 2 items, consider collapsing them to top-level commands (optional refinement — defer to user judgment after deletion).

**Decision point for Marchelo:** Do you want a replacement? Options: (a) just delete, (b) replace with "Insert link to current note" (copies `[[CurrentNote]]` to clipboard or inserts at cursor), (c) replace with a note-search picker that inserts `[[ChosenNote]]`. Confirm before executing.

---

## Issue 3 — Smart-Classify: wrong prompt folder + trust audit

**File:** `99-System/Scripts/smart-classifier.js`

**Known bug:** `folderMap` entry for `prompt` is `99-System/copilot-custom-prompts`. In v2.0 prompts live in `99-System/Prompts/Inbox`. Every prompt classification suggestion points to a wrong folder.

**Fix:** Change line ~197:
```js
prompt:  '99-System/copilot-custom-prompts'
// → 
prompt:  '99-System/Prompts/Inbox'
```

**Trust audit (separate):** The user doesn't trust the classifier generally. Before or after the path fix, manually test it on 3–5 notes of known types and verify the suggested type + confidence % make sense. If the keyword lists are too sparse (they were written for English content but vault is Czech), that's a deeper problem requiring keyword expansion for Czech terms. Document the test result in TASKS.md as either "classifier OK" or "classifier needs Czech keywords".

**Do NOT:** Rewrite the scoring logic — that's scope creep until the simple path bug is verified fixed.

---

## Issue 4 — Quick Process: tag/metadata merge behavior (NOTE — explore first)

**Files:** `99-System/Scripts/quick-process-atomic.js` (and equivalents for source, effort)

**Current behavior:** The script does a shallow merge (`{ ...frontmatter }`). Tags are appended (type emoji added only if missing). Previous tags and all other metadata fields are preserved, not replaced.

**The tension:** Merge is correct for notes that already have good metadata. But for inbox notes that were auto-classified incorrectly or have stale tags from a previous manual edit, the script silently keeps the bad data.

**Actions (in order):**
1. **Read** all three quick-process scripts (`quick-process-atomic.js`, `quick-process-source.js`, `quick-process-effort.js`) to confirm they all use the same merge pattern — do not assume they're identical.
2. **Add a "what changed" notice** at the end of each script: show which fields were updated vs which were kept from existing frontmatter. Use `new Notice()` with a 6-second timeout listing changed fields.
3. **Do NOT** add a "clean mode" or a destructive overwrite option — that's scope creep. The user asked to explore the approach, and the notice is the minimum useful improvement.
4. **Defer** tag-cleaning decisions until the notice reveals actual patterns of stale data.

---

## Issue 5 — Batch Process Inbox: generate per-note report file (NOTE)

**File:** `99-System/Scripts/batch-process-inbox.js`

**Current behavior:** After processing, shows a Notice popup with aggregate counts (processed/classified/moved/errors). For dozens of notes this is untrustworthy — no way to verify what happened to each note.

**Action:** After the run completes, write a Markdown report file to `99-System/Documentation/` (named `batch-report-YYYY-MM-DD.md`). Format:

```markdown
# Batch Process Report — YYYY-MM-DD HH:mm

| Note | Classified As | Confidence | Moved To | Result |
|------|--------------|------------|----------|--------|
| [[Note Name]] | atomic | 84% | 02-Knowledge/Atomics | ✅ moved |
| [[Note 2]] | source | 61% | 04-Sources | ✅ moved |
| [[Note 3]] | — | 40% | — | ⚠️ skipped (low confidence) |
```

Keep the popup summary — it's good for quick feedback. The file report is for audit.

**Do NOT** change the processing logic itself. Report generation only.

---

## Issue 6 — Changelog: add usage rules at the top of the note

**File:** Changelog note in vault (wherever it currently lives)

**What to do:** No new script. Open the Changelog note and add a short rules block at the very top (before any existing entries) explaining how to use it:
- New entries are added at the **bottom** (oldest-at-top, newest-at-bottom — linear writing order)
- Entry structure to use (e.g. date header `## YYYY-MM-DD`, then bullet lines like `- [[Note]]: description`)

**Actions:**
1. Find the Changelog note path.
2. Read its current content to understand existing structure.
3. Prepend a `## How to use this Changelog` section at the top with the rules above, written in a callout or blockquote so it's visually distinct from entries.

**Do NOT** touch `update-changelog.js` — the existing scan behavior is separate and unaffected.

---

## Issue 7 — Maturity Evolve: debug or delete (NOTE)

**File:** `99-System/Scripts/maturity-evolve.js`

**Script overview:** 76 lines. Reads active file, shows a QuickAdd suggester with 5 maturity stages, regex-replaces the `maturity:` line in frontmatter. Simple and correct in principle.

**Honest assessment:**
- The maturity field already auto-suggests values via FileClass/Obsidian's property panel. Clicking the property is equally fast.
- The script's value is being triggerable via command palette or hotkey without clicking into the properties panel.
- 76 lines — if there's a bug, it's fast to fix.

**Action to diagnose:** Read the script, then test manually to find the exact failure:
- If the QuickAdd API path is wrong (`app.plugins.plugins.quickadd.api` — this can fail if QuickAdd version changed the API)
- If the regex fails because `maturity:` has emoji in value

**Recommendation:** Fix if the bug is a 1-2 line fix. Delete if the QuickAdd API changed fundamentally and requires rearchitecting. Do not spend more than **5 minutes** on it.

**If deleting:** Remove from `data.json` choice list + delete the script file. Note in TASKS.md that maturity change = use Obsidian property panel directly.

---

## Issue 8 — YAML Orchestrator: remove lint mode, document Linter plugin

### Task 8A — Research: orchestrator lint vs Linter plugin (create task, do not execute yet)

**Do NOT remove anything yet.** This task is about understanding first, then deciding.

**Create a TASKS.md entry** for this research task with the following scope:

**Goal:** Understand how the `lint` mode in `yaml_orchestrator.js` works vs how the Obsidian Linter plugin works, identify where they overlap and where they differ, then decide: which to keep, which to remove, or whether both serve different purposes.

**Research questions to answer:**
1. What does `yaml_orchestrator.js` lint mode actually check? (read the `if (mode === "lint")` block)
2. What does the Obsidian Linter plugin do on save? (read `.obsidian/plugins/obsidian-linter/data.json` enabled rules)
3. Where do they overlap (same YAML fields/rules)? Where does only one cover something?
4. Does orchestrator lint offer batch/folder mode that the plugin doesn't? (plugin = current file only)
5. Based on answers: keep both, remove one, or merge?

**Output of the task:** A short decision note added to TASKS.md with the chosen path and rationale.

### Task 8B — Document Linter plugin settings

**No linter documentation exists in `99-System/Documentation/`** (searched — nothing matches "lint").

**Current enabled rules in `.obsidian/plugins/obsidian-linter/data.json`:**
- `add-blank-line-after-yaml` — ensures blank line after frontmatter
- `format-tags-in-yaml` — normalizes tag format in YAML
- `insert-yaml-attributes` — inserts missing YAML fields (currently set to insert a template with aliases, tags, up, in, title, type, fileClass, cssclass, status, maturity, priority, created, modified)
- `yaml-timestamp` — auto-updates `modified:` on save (format: YYYY-MM-DD), does NOT touch `created:`

**Action:** Create `99-System/Documentation/Obsidian/Linter Setup.md` documenting:
- Which rules are enabled and why
- What `insert-yaml-attributes` template covers (and what it doesn't — e.g., `related:`, `due:`)
- When to run manually vs auto-on-save
- Known interactions with the YAML Orchestrator (orchestrator runs normalize; linter runs on save — they should not conflict)

---

## Issue 9 — Create New Note: simplify and rename (NOTE)

**File:** `.obsidian/plugins/quickadd/data.json`

**Current structure (top of MENU:⚡Create New Note):**
```
MENU:⚡Create New Note
  MENU: Specific Type
  MENU: 🌱Basic            ← Quick Idea + Quick Inbox + 8 types
  MENU: 🔗Link 2 Curr Line ← copies of all types
  MENU: 🤖Auto - input based ← unimplemented Templater suggestive mode
```

**User's intent:**
- Move Quick Idea + Quick Inbox capture directly into the main menu (not buried under 🌱Basic)
- Rename `MENU: 🤖Auto - input based` to something that describes what it actually is (prepared for Templater suggestive dialog, not yet functional)

**Actions:**
1. Move `Quick Idea` and `Quick Inbox` choices from inside `MENU: 🌱Basic` to the top level of `MENU:⚡Create New Note` (before the sub-menus).
2. Rename `MENU: 🤖Auto - input based` → `MENU: 🤖Auto (Templater — not yet active)` or similar. User to confirm name.
3. Do NOT restructure the type list inside 🌱Basic or delete Link 2 Curr Line — keep those as-is until separately reviewed.

**Decision point for Marchelo:** Confirm new name for the Auto menu before execution.

---

## Issue 10 — Overview note naming: consistency check

**User report:** "Only the folders were renamed." Concern: overview/index notes inside the renamed folders may still have v1.9.x names (e.g., `100-Atomics.md`, `200-Areas.md`).

**Current state observed in git:** `02-Knowledge/Areas/+About Areasℹ️.md` and `02-Knowledge/Areas/200-Areas.md` both show as modified. The `200-Areas.md` filename still uses the old number prefix.

**Actions:**
1. **Audit** each renamed folder for overview notes with old naming:
   - `02-Knowledge/Atomics/` — look for `100-*.md` or similar
   - `02-Knowledge/Areas/` — `200-Areas.md` is confirmed present
   - `02-Knowledge/People/` — look for `300-*.md`
   - `02-Knowledge/Places/` — look for `400-*.md`
   - `02-Knowledge/Tools/` — look for `500-*.md`
2. **Check Templates** — search `Templates/` for any reference to the old overview note names (e.g., `[[200-Areas]]`) that would break after renaming.
3. **Rename** overview notes to match v2.0 naming convention. Pattern used for Areas: `+About Areasℹ️.md`. Confirm if all overviews should follow the same `+About {Folder}ℹ️.md` pattern.
4. After renaming, run a grep for old note names in tracked `.md` files to find broken links.

**Do NOT assume** a consistent naming convention exists — audit first.

---

## Execution Order

1. **Issue 1** (JS error fix — Insert Callout/ToC) — blocks smooth daily use
2. **Issue 2** (delete LINK) — 2-minute cleanup
3. **Issue 3** (smart-classify path fix) — one-line fix, then test
4. **Issue 8A** (remove lint from orchestrator + QuickAdd) — before 8B so doc reflects final state
5. **Issue 8B** (document Linter) — documentation
6. **Issue 10** (overview note audit + rename) — do before any template changes
7. **Issue 6** (changelog refactor) — new script, moderate effort
8. **Issue 5** (batch process report) — additive, moderate effort
9. **Issue 4** (quick process "what changed" notice) — additive, moderate effort
10. **Issue 7** (maturity evolve debug/delete) — depends on diagnosis result
11. **Issue 9** (Create New Note simplify) — requires two user confirmations before execution

---

## Files to Modify

| File | Issue(s) |
|------|----------|
| `.obsidian/plugins/quickadd/data.json` | 1, 2, 8A, 9 |
| `99-System/Scripts/smart-classifier.js` | 3 |
| `99-System/Scripts/quick-process-atomic.js` | 4 |
| `99-System/Scripts/quick-process-source.js` | 4 |
| `99-System/Scripts/quick-process-effort.js` | 4 |
| `99-System/Scripts/batch-process-inbox.js` | 5 |
| `99-System/Scripts/update-changelog.js` (rename + keep) | 6 |
| `99-System/Scripts/log-to-changelog.js` (new file) | 6 |
| `99-System/Scripts/yaml_orchestrator.js` | 8A |
| `99-System/Documentation/Obsidian/Linter Setup.md` (new file) | 8B |
| `99-System/Scripts/maturity-evolve.js` (fix or delete) | 7 |
| Overview notes in `02-Knowledge/*/` | 10 |
| `Templates/**` (if broken links found) | 10 |

---

## Decisions (resolved)

**Issue 2 — LINK choice:** Delete `🔗LINK` entirely.

**Issue 8A — Lint mode:** Leave for further inspection — defer as a future task. Do NOT remove lint from orchestrator or QuickAdd in this session. Add to TASKS.md: "Compare orchestrator lint vs Linter plugin — decide which to keep."

**Issue 9 — Auto menu name:** Rename to `🤖Auto (Templater dialog)`.

**Issue 10 — Overview notes:** Audit first, then decide on naming pattern. Do not assume `+About {Folder}ℹ️.md` is the correct convention until audit results are reviewed.

**Issue 7 — Maturity Evolve:** Try to fix (30-min cap). If fix is more than 2 lines of substantive logic change, delete instead.
