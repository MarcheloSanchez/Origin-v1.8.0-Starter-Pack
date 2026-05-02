# Origin v2.0 Migration Design

**Date:** 2026-05-02  
**Status:** Approved — ready for implementation planning  
**Branch:** `migration/v2.0` (git worktree, sibling folder)  
**Source design:** `Origin-Obsidian-handoff.zip` → `PKM Diagram.html`

---

## 1. Why This Migration

The current Origin v1.9.1 structure has accumulated several friction points identified in the PKM Diagram design:

| Issue | Impact |
|-------|--------|
| `02-Dots` — opaque private metaphor | Future-you won't remember what it means |
| Three competing number systems | Top-level `00–99`, inside Dots `100–500`, inside Sources `410–440` — no unified logic |
| Areas buried inside Knowledge | PARA "Areas" (life domains) and Zettelkasten "Atomics" (ideas) are different ontologies in the same folder |
| `00-Meta` duplicates `99-System` | Two meta folders — forces you to remember which meta-thing lives where |
| Meetings in two places | `04-Sources/410-Knowledge/Meetings` AND `04-Sources/440-Meetings` — duplication inevitable |
| Efforts status names are opaque | `On`, `Ongoing`, `Simmering`, `Sleeping` require learning; not scannable |
| `07-Prompts` at wrong level | AI prompts are a tool, not a life domain |

**Design philosophy for this migration: minimal change, maximum clarity.**  
We are NOT implementing every change from the PKM Diagram. We are picking the changes that fix real pain with the least structural disruption. Folder numbers are preserved wherever possible.

---

## 2. Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Folder number strategy | Preserve existing numbers | Avoid cascade renumbering of scripts/links |
| `03-Efforts` number | Keep as `03-Efforts` | Renaming to `04-Projects` would renumber everything below |
| `04-Sources` through `06-Archive` | Keep numbers | No benefit to renumbering |
| `00-Meta` vs `99-System` | Merge `00-Meta` into `99-System` | `99-System` is the more complete and functional of the two |
| `Templates/` | Keep top-level, untouched | 150+ templates — migration risk too high; handle in Phase 5 |
| `07-Prompts` destination | `99-System/Prompts/` | Prompts are a tool, belong in System |
| `02-Knowledge` subfolder numbering | Drop numbers, use plain names | Old `100–500` range was Dots-specific; orphaned without context |
| Areas promotion | Stay inside `02-Knowledge/Areas/` | Promoting to top-level would create a new number slot and cascade |
| Sources internal numbering | Flatten to plain names | Same orphaned-number problem as Dots subfolders |
| Canonical values | Reviewed and approved after folder restructure | Can't approve values before structure is stable |
| Link repair strategy | Bases for frontmatter; search-replace scripts for body text | Fastest approach for each domain |

---

## 3. Target Folder Structure

### Final state after migration

```
+Inbox/                         ← UNCHANGED
  (quick captures, unsorted notes)

99-System/                      ← ABSORBS: 00-Meta + 07-Prompts
  CIS/                          ← unchanged (canonical enum files)
  Config/                       ← unchanged (plugin settings, workspace config)
  Documentation/                ← from 00-Meta (PKM guides, workflows, playbooks)
  FileClass/                    ← unchanged (Metadata Menu schemas)
  Prompts/                      ← from 07-Prompts (AI prompt library)
  Scripts/                      ← unchanged (automation scripts, Dataview queries)
  _Assets/                      ← unchanged (images, PDFs, attachments)

Templates/                      ← UNCHANGED (handled in Phase 9)

01-MOCs/                        ← UNCHANGED
  PKM.md
  Knowledge.md
  Projects.md
  (etc.)

02-Knowledge/                   ← RENAMED from 02-Dots
  Atomics/                      ← was 100-Atomics/ (numbers dropped)
  Areas/                        ← was 200-Areas/ (stays inside Knowledge, not promoted)
  People/                       ← was 300-People/
  Places/                       ← was 400-Places/
  Tools/                        ← was 500-Tools/

03-Efforts/                     ← NUMBER KEPT, subfolders renamed
  Active/                       ← merges On/ + Ongoing/
  Paused/                       ← was Simmering/
  Waiting/                      ← was Sleeping/

04-Sources/                     ← NUMBER KEPT, internal numbering flattened
  Articles/                     ← was 410-Knowledge/Articles (approx)
  Books/                        ← was 410-Knowledge/Books (approx)
  Courses/                      ← was 410-Knowledge/Courses (approx)
  Media/                        ← Movies, Podcasts, YouTube, Music, TV
  Meetings/                     ← deduplicated (was in two places)
  Research/                     ← Papers, deep dives

05-Calendar/                    ← UNCHANGED
  Daily/
  Weekly/
  Monthly/
  Quarterly/
  Yearly/
  _Logs/

06-Archive/                     ← STRUCTURE ADDED
  Completed/                    ← new: finished projects with date prefix
  Inactive/                     ← new: paused areas, dormant efforts
```

### What is NOT changing

- `+Inbox` — no changes
- `01-MOCs` — no changes
- `05-Calendar` — no changes
- All folder numbers (`03-`, `04-`, `05-`, `06-`) — preserved
- `Templates/` — untouched until Phase 9

---

## 4. Migration Map

Full old → new mapping for every affected path:

| Old path | New path | Action |
|----------|----------|--------|
| `00-Meta/` | `99-System/Documentation/` | merge into 99-System |
| `00-Meta/Documentation/` | `99-System/Documentation/` | move |
| `07-Prompts/` | `99-System/Prompts/` | move |
| `02-Dots/` | `02-Knowledge/` | rename folder |
| `02-Dots/100-Atomics/` | `02-Knowledge/Atomics/` | rename (drop number) |
| `02-Dots/200-Areas/` | `02-Knowledge/Areas/` | rename (drop number) |
| `02-Dots/300-People/` | `02-Knowledge/People/` | rename (drop number) |
| `02-Dots/400-Places/` | `02-Knowledge/Places/` | rename (drop number) |
| `02-Dots/500-Tools/` | `02-Knowledge/Tools/` | rename (drop number) |
| `03-Efforts/On/` | `03-Efforts/Active/` | rename |
| `03-Efforts/Ongoing/` | `03-Efforts/Active/` | merge into Active |
| `03-Efforts/Simmering/` | `03-Efforts/Paused/` | rename |
| `03-Efforts/Sleeping/` | `03-Efforts/Waiting/` | rename |
| `04-Sources/410-*/` | `04-Sources/Books/`, `Articles/`, etc. | flatten (drop numbers) |
| `04-Sources/440-Meetings/` | `04-Sources/Meetings/` | deduplicate + rename |
| `06-Archive/` | `06-Archive/Completed/` + `06-Archive/Inactive/` | add structure |

---

## 5. Phase Plan

### Phase 0 — Worktree Setup
**Goal:** Create a safe sandbox for the migration without touching `main`.

Steps:
1. Create branch `migration/v2.0` from `main`
2. Create git worktree in a sibling folder: `Origin-v2.0-migration/`
3. Verify both folders open independently in Obsidian/file manager
4. All subsequent phases execute inside the worktree only

**Verify:** Both folders exist on disk. `git worktree list` shows two entries.

---

### Phase 1 — `03-Efforts` Subfolder Rename
**Goal:** Rename status subfolders to clear English names. Lowest-risk change.

Steps:
1. `On/` → `Active/` (move all contents)
2. `Ongoing/` → `Active/` (merge contents into same folder)
3. `Simmering/` → `Paused/`
4. `Sleeping/` → `Waiting/`
5. Update any script/QuickAdd references to `On`, `Ongoing`, `Simmering`, `Sleeping` subfolder names
6. Update `+About Effortsℹ️.md`
7. Update YAML `up:` fields in moved notes pointing to old subfolder names

**Files to check:** `smart-classifier.js`, `quick-process-effort.js`, `batch-process-inbox.js`, `status-picker.js`, `status-progression.js`, QuickAdd `data.json`

**Verify:** Open `03-Efforts/` in Obsidian — four subfolders replaced by three. All notes accessible. No broken links in note pane.

---

### Phase 2 — `02-Dots` → `02-Knowledge` Rename + Internal Restructure
**Goal:** Rename the top-level folder and drop orphaned subfolder numbers.

Steps:
1. Rename `02-Dots/` → `02-Knowledge/`
2. Rename `100-Atomics/` → `Atomics/`
3. Rename `200-Areas/` → `Areas/`
4. Rename `300-People/` → `People/`
5. Rename `400-Places/` → `Places/`
6. Rename `500-Tools/` → `Tools/`
7. Update `+About Dotsℹ️.md` → rename to `+About Knowledgeℹ️.md`, update content
8. Update YAML `up:` fields in all notes that point to `02-Dots` or numbered subfolders
9. Update all script references: `smart-classifier.js`, `quick-process-atomic.js`, `batch-process-inbox.js`, `auto-metadata.js`, `maturity-promoter.js`, `yaml_orchestrator.js`
10. Update `01-MOCs/Knowledge.md` if it links to old path
11. Update CLAUDE.md vault architecture section

**Verify:** All 5 subfolders present with plain names. Dataview queries in dashboards return correct results. MOC links resolve.

---

### Phase 3 — `00-Meta` Merge into `99-System`
**Goal:** Eliminate `00-Meta` by absorbing its content into `99-System/Documentation/`.

Steps:
1. Move all files from `00-Meta/Documentation/` → `99-System/Documentation/`
2. Move any remaining `00-Meta/` root files into `99-System/Documentation/` (or appropriate subfolder)
3. Move `00-Meta/_Metrics Cache.md` → `99-System/_Metrics Cache.md` (or keep path — check if hardcoded)
4. Delete empty `00-Meta/` folder
5. Update `+About Metaℹ️.md` → move to `99-System/`, update content
6. Update all script references to `00-Meta` paths: `update-metrics-cache.js`, `metrics-core.js`, `generate-weekly-report.js`, `generate-*.js`
7. Update Dataview queries that reference `"99-System/Documentation"` folder
8. Update `🏡Home.md`, `👁️Dashboard.md`, `🧭 Review HQ.md` dashboard links
9. Update CLAUDE.md

**Special attention:** `_Metrics Cache.md` path may be hardcoded in multiple scripts — find all references before moving.

**Verify:** `99-System/Documentation/` contains all former `00-Meta` docs. `_Metrics Cache.md` updates correctly via QuickAdd. Dashboards load without errors.

---

### Phase 4 — `07-Prompts` → `99-System/Prompts/`
**Goal:** Move prompt library into System where it belongs.

Steps:
1. Create `99-System/Prompts/` if not already present
2. Move all contents of `07-Prompts/` → `99-System/Prompts/` (preserve internal subfolder structure: `Workbench/`, `Reference/`, `Fun/`, `Inbox/`, `Archive/`, `01-Docs/`)
3. Delete empty `07-Prompts/` folder
4. Update QuickAdd macros referencing `07-Prompts` paths in `data.json`
5. Update any script references
6. Update `up:` fields in prompt notes pointing to `07-Prompts`
7. Update CLAUDE.md

**Verify:** `99-System/Prompts/` contains all prompt subfolders. QuickAdd prompt macros still function. Prompt Dataview queries return results from new path.

---

### Phase 5 — `04-Sources` Internal Flattening
**Goal:** Drop orphaned `410-*/440-*` numbering, create clean plain-name subfolders.

Steps:
1. Audit current `04-Sources/` internal structure (map all existing numbered subfolders)
2. Create new plain-name subfolders: `Books/`, `Articles/`, `Courses/`, `Media/`, `Meetings/`, `Research/`
3. Move notes from numbered folders into matching plain-name folders
4. Deduplicate Meetings (if notes exist in two locations, consolidate)
5. Delete empty numbered folders
6. Update `+About Sourcesℹ️.md`
7. Update `up:` fields in moved notes
8. Update `quick-process-source.js`, `batch-process-inbox.js`, `smart-classifier.js`

**Verify:** `04-Sources/` shows 6 plain-name subfolders. No duplicate meeting notes. Source Dataview queries return correct results.

---

### Phase 6 — `06-Archive` Structure Addition
**Goal:** Give Archive a clear landing structure instead of a flat dump.

Steps:
1. Create `06-Archive/Completed/` subfolder
2. Create `06-Archive/Inactive/` subfolder
3. Sort existing `06-Archive/` root files into `Completed/` or `Inactive/` as appropriate
4. Update `archive_note.js` and `archive-old-dailies.js` to target correct subfolder
5. Update `+About Archiveℹ️.md` (if exists)

**Verify:** Archive has two subfolders. `archive_note.js` script files into correct subfolder.

---

### Phase 7 — Canonical Values Review + Approval
**Goal:** Audit and fix YAML field values across the vault now that structure is stable.

Items to review:
- **Maturity**: Sweep for `🌱seed` → correct to `📤seed` (known widespread inconsistency)
- **Status**: Verify all notes use emoji-prefixed values (`🔄active` not `active`)
- **Type**: Verify all types match CIS_TYPE canonical list
- **`due` vs `deadline`**: Sweep for any remaining `deadline:` fields → rename to `due:`
- **`related` vs `relatedNotes`**: Sweep for old field name

Approach: Use Obsidian Bases (view.base) to filter by field value and bulk-update frontmatter. Run `yaml_orchestrator.js` for normalization pass.

**Verify:** Run `yaml_validator.js` across a sample of notes. Zero validation errors on canonical fields.

---

### Phase 8 — Link Repair
**Goal:** Fix broken wikilinks caused by folder renames in Phases 1–6.

Two domains:

**Frontmatter links** (e.g., `up:` field):
- Use Obsidian Bases `view.base` to filter notes with `up:` values pointing to old paths
- Bulk-update via Bases interface

**Body text links** (e.g., `[[02-Knowledge/...]]` in note content):
- Use search-replace Python script targeting specific old path strings
- Process per phase (each rename has a known old→new string)
- Backup before running

Priority order: `up:` fields first (structural), body links second (navigational).

**Verify:** Obsidian shows zero broken links in graph view. `vault-consistency-checker` skill passes.

---

### Phase 9 — Templates Audit + Path Updates
**Goal:** Update all templates that reference old folder paths.

Steps:
1. Grep all `Templates/` files for old path strings: `02-Dots`, `00-Meta`, `07-Prompts`, `03-Efforts/On`, `03-Efforts/Simmering`, `03-Efforts/Sleeping`, numbered source paths
2. For each match: update path to new equivalent
3. Update `Templater_script.js` if it references old paths
4. Smoke-test each major template type (atomic, effort, source, moc, meeting) by creating a test note

**Verify:** Create one note of each major type via template. YAML populates correctly. `up:` breadcrumb resolves. No console errors in Obsidian.

---

## 6. Cross-Phase Checklist

Each phase must complete these before moving to the next:

- [ ] All file moves executed
- [ ] About file for affected folder updated
- [ ] Script references updated for affected paths
- [ ] `up:` fields in moved notes updated
- [ ] QuickAdd `data.json` entries updated if relevant
- [ ] CLAUDE.md updated if architecture section affected
- [ ] Obsidian opened in worktree — no obvious broken links
- [ ] Git commit on `migration/v2.0` branch with descriptive message

---

## 7. Out of Scope

These items were explicitly deferred:

| Item | Reason |
|------|--------|
| Promoting `Areas` to top-level folder | Would create new number slot and cascade renaming |
| Renaming `03-Efforts` → `04-Projects` | Cascade renumber of Sources, Calendar, Archive |
| Renaming `04-Sources` → `05-Sources` etc. | Same cascade problem |
| Templates internal restructure | 150+ templates — own dedicated effort after migration |
| Full `up:` field body text repair | Handled in Phase 8; body text is lower priority than frontmatter |
| Graph view optimization | Post-migration concern |
| Dataview query tuning | Scripts updated only for path correctness, not performance |

---

## 8. Reference: Key Files Affected

### Scripts (99-System/Scripts/)
| Script | Phases affected |
|--------|----------------|
| `smart-classifier.js` | 1, 2, 5 |
| `quick-process-atomic.js` | 2 |
| `quick-process-effort.js` | 1 |
| `quick-process-source.js` | 5 |
| `batch-process-inbox.js` | 1, 2, 5 |
| `auto-metadata.js` | 2 |
| `maturity-promoter.js` | 2 |
| `yaml_orchestrator.js` | 2 |
| `update-metrics-cache.js` | 3 |
| `metrics-core.js` | 3 |
| `generate-weekly-report.js` | 3 |
| `generate-monthly-report.js` | 3 |
| `generate-quarterly-report.js` | 3 |
| `generate-yearly-report.js` | 3 |
| `archive_note.js` | 6 |
| `archive-old-dailies.js` | 6 |
| `status-picker.js` | 1 |
| `status-progression.js` | 1 |
| `Templater_script.js` | 9 |

### Config files
| File | Phases affected |
|------|----------------|
| `.obsidian/plugins/quickadd/data.json` | 1, 4 |
| `CLAUDE.md` (project) | 2, 3, 4 |

### Dashboards
| File | Phases affected |
|------|----------------|
| `🏡Home.md` | 3 |
| `👁️Dashboard.md` | 3 |
| `🧭 Review HQ.md` | 3 |

---

## 9. Git Strategy

- **Main branch:** `main` — never touched during migration. Preserved as before-state.
- **Migration branch:** `migration/v2.0` — all changes land here.
- **Worktree:** Sibling folder (e.g., `Origin-v2.0-migration/`) — lets you compare before/after on disk simultaneously.
- **Commit per phase:** One commit per completed phase with message `migration: phase N — <description>`
- **Merge to main:** Only after all 9 phases verified and Obsidian runs cleanly on the worktree.

---

*Design session: 2026-05-02. Source: PKM Diagram.html from Origin-Obsidian-handoff.zip.*
