# Origin v2.0 Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate Origin PKM vault from v1.9.1 to v2.0 folder structure with minimal structural disruption while eliminating the identified friction points.

**Architecture:** Phase-by-phase migration executed in a git worktree (`migration/v2.0` branch, sibling `Origin-v2.0-migration/` folder). Each phase is independently committable and verifiable. Main branch remains untouched as the before-state.

**Tech Stack:** Git worktree, Bash file operations, Python inline scripts for bulk text transforms, Obsidian Bases for frontmatter link repair, JavaScript (Obsidian QuickAdd/Templater scripts)

**Shell:** Git Bash. Use `python` not `python3`. For Unicode in Python: `sys.stdout.reconfigure(encoding='utf-8', errors='replace')` at top of script.

---

## Task 0: Worktree Setup

**Files:**
- No files created — git state only

- [ ] **Step 0.1: Create migration branch**

```bash
cd "/c/Users/MarcelMachanec/Documents/_Foundation for ORIGIN/Origin_DEV_STARTER_PACK/Origin-v1.9.1-Starter-Pack"
git checkout -b migration/v2.0
```

- [ ] **Step 0.2: Create sibling worktree folder**

```bash
git worktree add ../Origin-v2.0-migration migration/v2.0
```

- [ ] **Step 0.3: Verify both worktrees exist**

```bash
git worktree list
```

Expected output: two entries — the main folder and `Origin-v2.0-migration`.

- [ ] **Step 0.4: Switch into the worktree for all subsequent work**

```bash
cd "/c/Users/MarcelMachanec/Documents/_Foundation for ORIGIN/Origin_DEV_STARTER_PACK/Origin-v2.0-migration"
```

> All remaining tasks execute inside `Origin-v2.0-migration/` on branch `migration/v2.0`.

- [ ] **Step 0.5: Commit**

```bash
git commit --allow-empty -m "migration: phase 0 — worktree setup on migration/v2.0"
```

---

## Task 1: `03-Efforts` Subfolder Rename

**Files:**
- Move: `03-Efforts/On/` → `03-Efforts/Active/`
- Move: `03-Efforts/Ongoing/` → `03-Efforts/Active/` (merge)
- Move: `03-Efforts/Simmering/` → `03-Efforts/Paused/`
- Modify: `99-System/Scripts/quick-process-effort.js`
- Modify: `03-Efforts/+About Effortsℹ️.md`

> **Close Obsidian before running file moves.**

- [ ] **Step 1.1: Create new subfolders**

```bash
cd "/c/Users/MarcelMachanec/Documents/_Foundation for ORIGIN/Origin_DEV_STARTER_PACK/Origin-v2.0-migration"
mkdir -p "03-Efforts/Active"
mkdir -p "03-Efforts/Paused"
mkdir -p "03-Efforts/Waiting"
```

- [ ] **Step 1.2: Move `On/` contents into `Active/`**

```bash
if [ -d "03-Efforts/Active" ] && [ "$(ls -A '03-Efforts/On')" ]; then
  mv 03-Efforts/On/* "03-Efforts/Active/"
fi
rmdir "03-Efforts/Active" 2>/dev/null || true
```

- [ ] **Step 1.3: Move `Ongoing/` contents into `Active/`**

```bash
if [ -d "03-Efforts/Active" ] && [ "$(ls -A '03-Efforts/Ongoing')" ]; then
  mv 03-Efforts/Ongoing/* "03-Efforts/Active/"
fi
rmdir "03-Efforts/Active" 2>/dev/null || true
```

- [ ] **Step 1.4: Move `Simmering/` → `Paused/`**

```bash
if [ -d "03-Efforts/Paused" ] && [ "$(ls -A '03-Efforts/Simmering')" ]; then
  mv 03-Efforts/Simmering/* "03-Efforts/Paused/"
fi
rmdir "03-Efforts/Paused" 2>/dev/null || true
```

- [ ] **Step 1.5: Move `Sleeping/` → `Waiting/` (if it exists)**

```bash
if [ -d "03-Efforts/Waiting" ] && [ "$(ls -A '03-Efforts/Sleeping')" ]; then
  mv 03-Efforts/Sleeping/* "03-Efforts/Waiting/"
fi
rmdir "03-Efforts/Waiting" 2>/dev/null || true
```

- [ ] **Step 1.6: Update `quick-process-effort.js`**

Replace folder names and status labels. The script uses folder names `On`, `Ongoing`, `Simmering` in multiple places. Apply all replacements:

```bash
python - << 'PYEOF'
import sys, re
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

path = "99-System/Scripts/quick-process-effort.js"
with open(path, encoding='utf-8') as f:
    content = f.read()

replacements = [
    # Folder name strings used in path logic
    ("folder: 'On'",        "folder: 'Active'"),
    ("folder: 'Ongoing'",   "folder: 'Active'"),
    ("folder: 'Simmering'", "folder: 'Paused'"),
    ("folder: 'Sleeping'",  "folder: 'Waiting'"),
    # UI labels in prompt choices
    ("'🏃 On (",            "'🏃 Active ("),
    ("'♻️ Ongoing (",       "'🔄 Active ("),
    ("'🌊 Simmering (",     "'⏸️ Paused ("),
    # Folder arrays
    ("['On', 'Ongoing', 'Simmering', 'Inbox']", "['Active', 'Paused', 'Waiting', 'Inbox']"),
    # selectedFolder comparisons
    ("selectedFolder === 'On'",       "selectedFolder === 'Active'"),
    ("selectedFolder === 'Ongoing'",  "selectedFolder === 'Active'"),
    ("selectedFolder === 'Simmering'","selectedFolder === 'Paused'"),
]

for old, new in replacements:
    content = content.replace(old, new)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done:", path)
PYEOF
```

- [ ] **Step 1.7: Update `+About Effortsℹ️.md`**

Open the file and update any mentions of `On/`, `Ongoing/`, `Simmering/`, `Sleeping/` to `Active/`, `Paused/`, `Waiting/`. This is a manual edit — the content varies.

```bash
grep -n "On/\|Ongoing/\|Simmering/\|Sleeping/" "03-Efforts/+About Effortsℹ️.md"
```

Edit the file to replace the old subfolder names with the new ones.

- [ ] **Step 1.8: Update `up:` fields in moved notes**

```bash
python - << 'PYEOF'
import sys, os, re
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

import glob

replacements = {
    '[[On]]': '[[Active]]',
    '[[Ongoing]]': '[[Active]]',
    '[[Simmering]]': '[[Paused]]',
    '[[Sleeping]]': '[[Waiting]]',
    '03-Efforts/On': '03-Efforts/Active',
    '03-Efforts/Ongoing': '03-Efforts/Active',
    '03-Efforts/Simmering': '03-Efforts/Paused',
    '03-Efforts/Sleeping': '03-Efforts/Waiting',
}

files = glob.glob("03-Efforts/**/*.md", recursive=True)
changed = 0
for fp in files:
    with open(fp, encoding='utf-8', errors='replace') as f:
        content = f.read()
    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)
    if new_content != content:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(new_content)
        changed += 1
        print(f"  Updated: {fp}")

print(f"Total updated: {changed}")
PYEOF
```

- [ ] **Step 1.9: Verify**

```bash
ls 03-Efforts/
```

Expected: `Active/`, `Paused/`, `Waiting/`, plus any root files. No `On/`, `Ongoing/`, `Simmering/`, `Sleeping/`.

```bash
grep -n "folder: 'On'\|folder: 'Simmering'\|folder: 'Ongoing'" 99-System/Scripts/quick-process-effort.js
```

Expected: no output.

- [ ] **Step 1.10: Commit**

```bash
git add -A
git commit -m "migration: phase 1 — 03-Efforts subfolders renamed to Active/Paused/Waiting"
```

---

## Task 2: `02-Dots` → `02-Knowledge` Rename + Subfolder Restructure

**Files:**
- Move: `02-Dots/` → `02-Knowledge/` (with 5 subfolder renames)
- Modify: `99-System/Scripts/auto-metadata.js`
- Modify: `99-System/Scripts/batch-process-inbox.js`
- Modify: `99-System/Scripts/generate-monthly-report.js`
- Modify: `99-System/Scripts/generate-quarterly-report.js`
- Modify: `99-System/Scripts/generate-weekly-report.js`
- Modify: `99-System/Scripts/generate-yearly-report.js`
- Modify: `CLAUDE.md`
- Rename: `02-Dots/+About Dotsℹ️.md` → `02-Knowledge/+About Knowledgeℹ️.md`

> **Close Obsidian before running file moves.**

- [ ] **Step 2.1: Rename top-level folder**

```bash
mv "02-Knowledge" "02-Knowledge"
```

- [ ] **Step 2.2: Rename numbered subfolders (drop numbers)**

```bash
mv "02-Knowledge/100-Atomics" "02-Knowledge/Atomics" 2>/dev/null || true
mv "02-Knowledge/200-Areas"   "02-Knowledge/Areas"   2>/dev/null || true
mv "02-Knowledge/300-People"  "02-Knowledge/People"  2>/dev/null || true
mv "02-Knowledge/400-Places"  "02-Knowledge/Places"  2>/dev/null || true
mv "02-Knowledge/500-Tools"   "02-Knowledge/Tools"   2>/dev/null || true
```

- [ ] **Step 2.3: Rename About file**

```bash
mv "02-Knowledge/+About Dotsℹ️.md" "02-Knowledge/+About Knowledgeℹ️.md" 2>/dev/null || true
```

Update its content to reference `02-Knowledge` instead of `02-Dots`.

- [ ] **Step 2.4: Update `auto-metadata.js`**

```bash
python - << 'PYEOF'
import sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

path = "99-System/Scripts/auto-metadata.js"
with open(path, encoding='utf-8') as f:
    content = f.read()

replacements = [
    ("02-Knowledge/Atomics", "02-Knowledge/Atomics"),
    ("02-Knowledge/Areas",   "02-Knowledge/Areas"),
    ("02-Knowledge/People",  "02-Knowledge/People"),
    ("02-Knowledge/Places",  "02-Knowledge/Places"),
    ("02-Knowledge/Tools",   "02-Knowledge/Tools"),
    ("02-Knowledge",             "02-Knowledge"),
    ("[[Atomics]]",     "[[Atomics]]"),
    ("[[Areas]]",       "[[Areas]]"),
    ("[[People]]",      "[[People]]"),
    ("[[Places]]",      "[[Places]]"),
    ("[[Tools]]",       "[[Tools]]"),
    ("[[02-Knowledge]]",         "[[02-Knowledge]]"),
]

for old, new in replacements:
    content = content.replace(old, new)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done:", path)
PYEOF
```

- [ ] **Step 2.5: Update `batch-process-inbox.js`**

```bash
python - << 'PYEOF'
import sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

path = "99-System/Scripts/batch-process-inbox.js"
with open(path, encoding='utf-8') as f:
    content = f.read()

replacements = [
    ("02-Knowledge/Atomics", "02-Knowledge/Atomics"),
    ("02-Knowledge/Areas",   "02-Knowledge/Areas"),
    ("02-Knowledge/People",  "02-Knowledge/People"),
    ("02-Knowledge/Places",  "02-Knowledge/Places"),
    ("02-Knowledge/Tools",   "02-Knowledge/Tools"),
    ("02-Knowledge",             "02-Knowledge"),
]

for old, new in replacements:
    content = content.replace(old, new)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done:", path)
PYEOF
```

- [ ] **Step 2.6: Update `maturity-promoter.js` and `yaml_orchestrator.js`**

```bash
python - << 'PYEOF'
import sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

scripts = [
    "99-System/Scripts/maturity-promoter.js",
    "99-System/Scripts/yaml_orchestrator.js",
]

replacements = [
    ("02-Knowledge/Atomics", "02-Knowledge/Atomics"),
    ("02-Knowledge/Areas",   "02-Knowledge/Areas"),
    ("02-Knowledge/People",  "02-Knowledge/People"),
    ("02-Knowledge/Places",  "02-Knowledge/Places"),
    ("02-Knowledge/Tools",   "02-Knowledge/Tools"),
    ("02-Knowledge",             "02-Knowledge"),
]

for path in scripts:
    try:
        with open(path, encoding='utf-8') as f:
            content = f.read()
        new_content = content
        for old, new in replacements:
            new_content = new_content.replace(old, new)
        if new_content != content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {path}")
        else:
            print(f"No changes: {path}")
    except FileNotFoundError:
        print(f"Not found: {path}")
PYEOF
```

- [ ] **Step 2.7: Update report generators (Areas hub paths)**

The 4 report generators have hardcoded Area paths like `02-Dots/200-Areas/210-Health/210-Health.md`. Update all 4:

```bash
python - << 'PYEOF'
import sys, glob
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

scripts = [
    "99-System/Scripts/generate-weekly-report.js",
    "99-System/Scripts/generate-monthly-report.js",
    "99-System/Scripts/generate-quarterly-report.js",
    "99-System/Scripts/generate-yearly-report.js",
]

replacements = [
    ("02-Knowledge/200-Areas/210-Health",        "02-Knowledge/Areas/210-Health"),
    ("02-Knowledge/200-Areas/220-Finance",       "02-Knowledge/Areas/220-Finance"),
    ("02-Knowledge/200-Areas/230-Career",        "02-Knowledge/Areas/230-Career"),
    ("02-Knowledge/200-Areas/240-Relationships", "02-Knowledge/Areas/240-Relationships"),
    ("02-Knowledge/200-Areas/250-Personal",      "02-Knowledge/Areas/250-Personal"),
    ("02-Knowledge/Areas",                   "02-Knowledge/Areas"),
    ('startsWith("02-Knowledge/")',              'startsWith("02-Knowledge/")'),
    ("startsWith('02-Dots/')",              "startsWith('02-Knowledge/')"),
    ("02-Knowledge/",                            "02-Knowledge/"),
]

for path in scripts:
    with open(path, encoding='utf-8') as f:
        content = f.read()
    new_content = content
    for old, new in replacements:
        new_content = new_content.replace(old, new)
    if new_content != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated: {path}")
    else:
        print(f"No changes: {path}")
PYEOF
```

- [ ] **Step 2.8: Update `up:` fields in all moved notes**

```bash
python - << 'PYEOF'
import sys, glob
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

replacements = {
    '[[Atomics]]': '"[[Atomics]]"',
    '[[Areas]]':   '"[[Areas]]"',
    '[[People]]':  '"[[People]]"',
    '[[Places]]':  '"[[Places]]"',
    '[[Tools]]':   '"[[Tools]]"',
    '[[02-Knowledge]]':     '"[[02-Knowledge]]"',
    '02-Dots/':        '02-Knowledge/',
}

files = glob.glob("02-Knowledge/**/*.md", recursive=True)
changed = 0
for fp in files:
    with open(fp, encoding='utf-8', errors='replace') as f:
        content = f.read()
    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)
    if new_content != content:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(new_content)
        changed += 1

print(f"Updated: {changed} files")
PYEOF
```

- [ ] **Step 2.9: Update CLAUDE.md vault architecture table**

Open `CLAUDE.md` and replace the `02-Dots` row:

Find: `| \`02-Dots\` | Atomic knowledge (Ideas, Concepts, Statements, Things, People, Places) |`
Replace: `| \`02-Knowledge\` | Atomic knowledge (Ideas, Concepts, Statements, Things, People, Places) |`

Also update the architecture section text that references `02-Dots`.

- [ ] **Step 2.10: Verify**

```bash
ls 02-Knowledge/
```

Expected: `Atomics/`, `Areas/`, `People/`, `Places/`, `Tools/`, plus root files. No numbered subfolders.

```bash
grep -rn "02-Knowledge" 99-System/Scripts/ --include="*.js" | grep -v ".pyc"
```

Expected: no output.

- [ ] **Step 2.11: Commit**

```bash
git add -A
git commit -m "migration: phase 2 — 02-Dots renamed to 02-Knowledge, subfolder numbers dropped"
```

---

## Task 3: `00-Meta` Merge into `99-System`

**Files:**
- Move: `00-Meta/Documentation/` → `99-System/Documentation/`
- Move: `00-Meta/_Metrics Cache.md` → `99-System/_Metrics Cache.md`
- Move: remaining `00-Meta/` root files → `99-System/Documentation/`
- Modify: `99-System/Scripts/update-metrics-cache.js` (line 330)
- Modify: `99-System/Scripts/generate-weekly-report.js` (line 122)
- Modify: `🏡Home.md`, `👁️Dashboard.md`, `🧭 Review HQ.md`

> **Close Obsidian before running file moves.**

- [ ] **Step 3.1: Grep for ALL `_Metrics Cache` and `00-Meta` references before touching anything**

```bash
grep -rn "_Metrics Cache\|00-Meta" 99-System/Scripts/ --include="*.js"
grep -rn "_Metrics Cache\|00-Meta" *.md 2>/dev/null | head -20
```

Note every file and line number. Any path not covered by later steps needs a manual fix.

- [ ] **Step 3.2: Move `Documentation/` into `99-System/`**

```bash
mkdir -p "99-System/Documentation"
if [ -d "99-System/Documentation" ]; then
  cp -r "99-System/Documentation/Documentation/." "99-System/Documentation/"
  rm -rf "99-System/Documentation"
fi
```

- [ ] **Step 3.3: Move `_Metrics Cache.md`**

```bash
mv "99-System/Documentation/_Metrics Cache.md" "99-System/_Metrics Cache.md" 2>/dev/null || echo "Not found — may already exist elsewhere"
```

- [ ] **Step 3.4: Move remaining `00-Meta/` root files**

```bash
ls "99-System/Documentation/"
```

For each remaining file that is NOT already moved, move it to `99-System/Documentation/`:

```bash
for f in "99-System/Documentation/"*.md; do
  [ -f "$f" ] && mv "$f" "99-System/Documentation/" && echo "Moved: $f"
done
rmdir "99-System/Documentation" 2>/dev/null || echo "00-Meta not empty — check remaining files"
```

- [ ] **Step 3.5: Update `update-metrics-cache.js`**

Line 330 has: `const cachePath = '00-Meta/_Metrics Cache.md';`

```bash
python - << 'PYEOF'
import sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

path = "99-System/Scripts/update-metrics-cache.js"
with open(path, encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "const cachePath = '00-Meta/_Metrics Cache.md';",
    "const cachePath = '99-System/_Metrics Cache.md';"
)
content = content.replace('"99-System/Documentation/_Metrics Cache.md"', '"99-System/_Metrics Cache.md"')
content = content.replace("'00-Meta/_Metrics Cache.md'", "'99-System/_Metrics Cache.md'")
content = content.replace('"99-System/_Metrics Cache"', '"99-System/_Metrics Cache"')
content = content.replace("'00-Meta/_Metrics Cache'", "'99-System/_Metrics Cache'")
# Update comment
content = content.replace('* Cache Location: 00-Meta/_Metrics Cache.md',
                           '* Cache Location: 99-System/_Metrics Cache.md')
content = content.replace('* Fields are queryable via: dv.page("99-System/_Metrics Cache").field_name',
                           '* Fields are queryable via: dv.page("99-System/_Metrics Cache").field_name')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done:", path)
PYEOF
```

- [ ] **Step 3.6: Update `generate-weekly-report.js`**

Line 122: `app.vault.getAbstractFileByPath("99-System/Documentation/_Metrics Cache.md")`

```bash
python - << 'PYEOF'
import sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

scripts = [
    "99-System/Scripts/generate-weekly-report.js",
    "99-System/Scripts/generate-monthly-report.js",
    "99-System/Scripts/generate-quarterly-report.js",
    "99-System/Scripts/generate-yearly-report.js",
    "99-System/Scripts/metrics-core.js",
]

for path in scripts:
    try:
        with open(path, encoding='utf-8') as f:
            content = f.read()
        new_content = content.replace('00-Meta/_Metrics Cache', '99-System/_Metrics Cache')
        new_content = new_content.replace('"99-System/Documentation"', '"99-System"')
        if new_content != content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {path}")
        else:
            print(f"No changes: {path}")
    except FileNotFoundError:
        print(f"Not found: {path}")
PYEOF
```

- [ ] **Step 3.7: Update dashboards**

```bash
grep -n "99-System/Documentation" "🏡Home.md" "👁️Dashboard.md" "🧭 Review HQ.md" 2>/dev/null
```

For each match, replace `00-Meta` with `99-System` in the relevant link or path.

- [ ] **Step 3.8: Verify**

```bash
ls 99-System/Documentation/ | head -10
ls 99-System/ | grep "_Metrics Cache"
```

Expected: `_Metrics Cache.md` present. `Documentation/` folder exists with content.

```bash
grep -rn "99-System/Documentation/_Metrics" 99-System/Scripts/ --include="*.js"
```

Expected: no output.

- [ ] **Step 3.9: Commit**

```bash
git add -A
git commit -m "migration: phase 3 — 00-Meta merged into 99-System/Documentation"
```

---

## Task 4: `07-Prompts` → `99-System/Prompts/`

**Files:**
- Move: `07-Prompts/` → `99-System/Prompts/`
- Modify: `99-System/Scripts/auto-metadata.js`
- Modify: `99-System/Scripts/metrics-core.js`
- Modify: `99-System/Scripts/update-metrics-cache.js`
- Modify: `99-System/Scripts/obsidian-ooda-agent.js`
- Modify: `.obsidian/plugins/quickadd/data.json`

> **Close Obsidian before running file moves.**

- [ ] **Step 4.1: Move `07-Prompts/` into `99-System/Prompts/`**

```bash
mkdir -p "99-System/Prompts"
if [ -d "99-System/Prompts" ]; then
  cp -r "99-System/Prompts/." "99-System/Prompts/"
  rm -rf "99-System/Prompts"
fi
```

- [ ] **Step 4.2: Update all scripts referencing `07-Prompts`**

```bash
python - << 'PYEOF'
import sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

scripts = [
    "99-System/Scripts/auto-metadata.js",
    "99-System/Scripts/metrics-core.js",
    "99-System/Scripts/update-metrics-cache.js",
    "99-System/Scripts/obsidian-ooda-agent.js",
    "99-System/Scripts/normalize_prompts.js",
]

for path in scripts:
    try:
        with open(path, encoding='utf-8') as f:
            content = f.read()
        new_content = content.replace('07-Prompts', '99-System/Prompts')
        new_content = new_content.replace("[[99-System/Prompts]]", '"[[99-System/Prompts]]"')
        if new_content != content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {path}")
        else:
            print(f"No changes: {path}")
    except FileNotFoundError:
        print(f"Not found: {path}")
PYEOF
```

- [ ] **Step 4.3: Backup and update QuickAdd `data.json`**

```bash
cp ".obsidian/plugins/quickadd/data.json" ".obsidian/plugins/quickadd/data.json.bak"
```

```bash
python - << 'PYEOF'
import sys, json, shutil
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

path = ".obsidian/plugins/quickadd/data.json"
with open(path, encoding='utf-8') as f:
    content = f.read()

new_content = content.replace('07-Prompts', '99-System/Prompts')

# Validate JSON
try:
    json.loads(new_content)
except json.JSONDecodeError as e:
    print(f"JSON INVALID after replacement: {e}")
    raise SystemExit(1)

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Done. JSON is valid.")
PYEOF
```

- [ ] **Step 4.4: Update `up:` fields in prompt notes**

```bash
python - << 'PYEOF'
import sys, glob
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

files = glob.glob("99-System/Prompts/**/*.md", recursive=True)
changed = 0
for fp in files:
    with open(fp, encoding='utf-8', errors='replace') as f:
        content = f.read()
    new_content = content.replace('07-Prompts', '99-System/Prompts')
    if new_content != content:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(new_content)
        changed += 1

print(f"Updated: {changed} files")
PYEOF
```

- [ ] **Step 4.5: Update CLAUDE.md**

Find and update the Active Projects section and any references to `07-Prompts`.

```bash
grep -n "99-System/Prompts" CLAUDE.md
```

Edit CLAUDE.md to replace `07-Prompts` → `99-System/Prompts`.

- [ ] **Step 4.6: Verify**

```bash
ls 99-System/Prompts/ | head -10
[ -d "99-System/Prompts" ] && echo "07-Prompts still exists!" || echo "07-Prompts removed — OK"
grep -rn "99-System/Prompts" 99-System/Scripts/ --include="*.js"
```

Expected: `99-System/Prompts/` has content, `07-Prompts` is gone, no script references remain.

- [ ] **Step 4.7: Commit**

```bash
git add -A
git commit -m "migration: phase 4 — 07-Prompts moved to 99-System/Prompts"
```

---

## Task 5: `04-Sources` Internal Flattening

**Files:**
- Move: `04-Sources/410-Knowledge/Books/` → `04-Sources/Books/`
- Move: `04-Sources/410-Knowledge/Articles/` → `04-Sources/Articles/` (if exists)
- Move: `04-Sources/420-Media/` contents → `04-Sources/Media/`
- Move: `04-Sources/430-Guides/` → `04-Sources/Guides/`
- Move: `04-Sources/440-Meetings/` → `04-Sources/Meetings/` (deduplicate)
- Modify: `99-System/Scripts/quick-process-source.js`
- Modify: `99-System/Scripts/auto-metadata.js`
- Modify: `99-System/Scripts/batch-process-inbox.js`

> **Close Obsidian before running file moves.**

- [ ] **Step 5.1: Audit existing `04-Sources/` structure**

```bash
find "04-Sources" -type d | sort
```

Note all numbered and plain-name subfolders before making any moves.

- [ ] **Step 5.2: Create new plain-name subfolders**

```bash
mkdir -p "04-Sources/Books"
mkdir -p "04-Sources/Articles"
mkdir -p "04-Sources/Courses"
mkdir -p "04-Sources/Media"
mkdir -p "04-Sources/Meetings"
mkdir -p "04-Sources/Guides"
mkdir -p "04-Sources/Research"
```

- [ ] **Step 5.3: Move contents from numbered subfolders**

```bash
# 410-Knowledge/Books → Books
if [ -d "04-Sources/Books" ]; then
  mv "04-Sources/Books/"* "04-Sources/Books/" 2>/dev/null || true
fi

# 410-Knowledge/Articles → Articles (if exists)
if [ -d "04-Sources/Articles" ]; then
  mv "04-Sources/Articles/"* "04-Sources/Articles/" 2>/dev/null || true
fi

# 420-Media → Media
if [ -d "04-Sources/Media" ]; then
  mv "04-Sources/Media/"* "04-Sources/Media/" 2>/dev/null || true
fi

# 430-Guides → Guides
if [ -d "04-Sources/Guides" ]; then
  mv "04-Sources/Guides/"* "04-Sources/Guides/" 2>/dev/null || true
fi

# 440-Meetings → Meetings (consolidate with existing Meetings/ if present)
if [ -d "04-Sources/Meetings" ]; then
  mv "04-Sources/Meetings/"* "04-Sources/Meetings/" 2>/dev/null || true
fi

# Move any root 410-Knowledge content not in a subfolder
if [ -d "04-Sources" ]; then
  mv "04-Sources/"*.md "04-Sources/" 2>/dev/null || true
fi
```

- [ ] **Step 5.4: Remove empty numbered folders**

```bash
rmdir "04-Sources/Books" 2>/dev/null || true
rmdir "04-Sources/Articles" 2>/dev/null || true
rmdir "04-Sources" 2>/dev/null || echo "410-Knowledge not empty — check manually"
rmdir "04-Sources/Media" 2>/dev/null || echo "420-Media not empty — check manually"
rmdir "04-Sources/Guides" 2>/dev/null || echo "430-Guides not empty — check manually"
rmdir "04-Sources/Meetings" 2>/dev/null || echo "440-Meetings not empty — check manually"
```

- [ ] **Step 5.5: Update `quick-process-source.js`**

Lines 136–143 have old numbered paths. Replace with new plain-name paths:

```bash
python - << 'PYEOF'
import sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

path = "99-System/Scripts/quick-process-source.js"
with open(path, encoding='utf-8') as f:
    content = f.read()

replacements = [
    ("04-Sources/Books",    "04-Sources/Books"),
    ("04-Sources/Articles", "04-Sources/Articles"),
    ("04-Sources/Media/Videos",       "04-Sources/Media"),
    ("04-Sources/Media/Podcasts",     "04-Sources/Media"),
    ("04-Sources/Guides",             "04-Sources/Guides"),
    ("04-Sources/Meetings",           "04-Sources/Meetings"),
    ("04-Sources/450-Quotes",             "04-Sources/Articles"),
    ("'Book': '04-Sources/410-Knowledge/Books'", "'Book': '04-Sources/Books'"),
]

for old, new in replacements:
    content = content.replace(old, new)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done:", path)
PYEOF
```

- [ ] **Step 5.6: Update `auto-metadata.js`**

Lines 150/249 reference `440-Meetings`:

```bash
python - << 'PYEOF'
import sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

path = "99-System/Scripts/auto-metadata.js"
with open(path, encoding='utf-8') as f:
    content = f.read()

content = content.replace("04-Sources/Meetings", "04-Sources/Meetings")
content = content.replace("[[440-Meetings]]", '"[[Meetings]]"')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done:", path)
PYEOF
```

- [ ] **Step 5.7: Update `batch-process-inbox.js`**

Line 247: `meeting: '04-Sources/Meetings'` — this one is already plain name. Verify:

```bash
grep -n "04-Sources" 99-System/Scripts/batch-process-inbox.js
```

If any numbered paths remain, fix with:

```bash
python - << 'PYEOF'
import sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

path = "99-System/Scripts/batch-process-inbox.js"
with open(path, encoding='utf-8') as f:
    content = f.read()

for old, new in [
    ("04-Sources", "04-Sources/Articles"),
    ("04-Sources/Meetings",  "04-Sources/Meetings"),
]:
    content = content.replace(old, new)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done:", path)
PYEOF
```

- [ ] **Step 5.8: Verify**

```bash
find "04-Sources" -type d | sort
```

Expected: only plain-name subfolders (`Books/`, `Articles/`, `Courses/`, `Media/`, `Meetings/`, `Guides/`, `Research/`). No `410-*`, `420-*`, `430-*`, `440-*`.

```bash
grep -n "410-\|420-\|430-\|440-" 99-System/Scripts/quick-process-source.js 99-System/Scripts/auto-metadata.js
```

Expected: no output.

- [ ] **Step 5.9: Commit**

```bash
git add -A
git commit -m "migration: phase 5 — 04-Sources internal numbering flattened to plain names"
```

---

## Task 6: `06-Archive` Structure Addition

**Files:**
- Create: `06-Archive/Completed/`
- Create: `06-Archive/Inactive/`
- Modify: `99-System/Scripts/archive-old-dailies.js`
- Check: `99-System/Scripts/archive_note.js` (already targets `Completed`)

- [ ] **Step 6.1: Create subfolders**

```bash
mkdir -p "06-Archive/Completed"
mkdir -p "06-Archive/Inactive"
```

- [ ] **Step 6.2: Check `archive_note.js` current target**

```bash
grep -n "ARCH_ROOT\|06-Archive" 99-System/Scripts/archive_note.js
```

Expected: `const ARCH_ROOT = "06-Archive/Completed";` — already correct. No change needed if so.

- [ ] **Step 6.3: Check and update `archive-old-dailies.js`**

```bash
grep -n "06-Archive\|Archive" 99-System/Scripts/archive-old-dailies.js | head -20
```

If it targets bare `06-Archive`, update to `06-Archive/Inactive` (old dailies are inactive, not completed):

```bash
python - << 'PYEOF'
import sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

path = "99-System/Scripts/archive-old-dailies.js"
with open(path, encoding='utf-8') as f:
    content = f.read()

# Only update if it points to root archive, not already to a subfolder
if '"06-Archive"' in content and '06-Archive/Inactive' not in content:
    content = content.replace('"06-Archive"', '"06-Archive/Inactive"')
    content = content.replace("'06-Archive'", "'06-Archive/Inactive'")
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated archive-old-dailies.js → 06-Archive/Inactive")
else:
    print("No change needed")
PYEOF
```

- [ ] **Step 6.4: Sort existing archive root files**

```bash
ls "06-Archive/" 
```

For any files sitting at the root of `06-Archive/` (not in a subfolder), move to `Completed/` or `Inactive/` based on content/type. Completed efforts go to `Completed/`, dormant/paused content to `Inactive/`.

```bash
# Automated: move all root .md files to Inactive as safe default
for f in "06-Archive/"*.md; do
  [ -f "$f" ] && mv "$f" "06-Archive/Inactive/" && echo "Moved: $f"
done
```

Review after and manually relocate any that should be in `Completed/`.

- [ ] **Step 6.5: Verify**

```bash
ls 06-Archive/
```

Expected: `Completed/`, `Inactive/`, plus any other subfolders that were already there.

```bash
grep -n "ARCH_ROOT" 99-System/Scripts/archive_note.js
```

Expected: `"06-Archive/Completed"`.

- [ ] **Step 6.6: Commit**

```bash
git add -A
git commit -m "migration: phase 6 — 06-Archive structured with Completed/ and Inactive/"
```

---

## Task 7: Canonical Values Review

**Files:**
- Modify: `02-Knowledge/**/*.md` (maturity, status sweeps)
- Modify: `03-Efforts/**/*.md`
- Modify: `04-Sources/**/*.md`
- Run: `yaml_orchestrator.js` normalization pass (via Obsidian QuickAdd)

- [ ] **Step 7.1: Fix `🌱seed` → `📤seed` (widespread inconsistency)**

```bash
python - << 'PYEOF'
import sys, glob, re
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

files = glob.glob("**/*.md", recursive=True)
excludes = ['99-System/', 'Templates/', '.obsidian/', 'docs/']

changed = 0
for fp in files:
    if any(fp.startswith(e) for e in excludes):
        continue
    with open(fp, encoding='utf-8', errors='replace') as f:
        content = f.read()
    # Only fix in frontmatter (between --- markers)
    def fix_frontmatter(m):
        return m.group(0).replace('maturity: 🌱seed', 'maturity: 📤seed')
    new_content = re.sub(r'^---\n.*?---\n', fix_frontmatter, content, flags=re.DOTALL)
    if new_content != content:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(new_content)
        changed += 1

print(f"Fixed maturity seed: {changed} files")
PYEOF
```

- [ ] **Step 7.2: Fix bare `active` status → `🔄active`**

```bash
python - << 'PYEOF'
import sys, glob, re
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

files = glob.glob("**/*.md", recursive=True)
excludes = ['99-System/', 'Templates/', '.obsidian/', 'docs/']

changed = 0
for fp in files:
    if any(fp.startswith(e) for e in excludes):
        continue
    with open(fp, encoding='utf-8', errors='replace') as f:
        content = f.read()
    # Match `status: active` (bare, no emoji) in frontmatter only
    def fix_status(m):
        block = m.group(0)
        block = re.sub(r'^(status:\s*)active\s*$', r'\1🔄active', block, flags=re.MULTILINE)
        block = re.sub(r'^(status:\s*)completed\s*$', r'\1✅completed', block, flags=re.MULTILINE)
        block = re.sub(r'^(status:\s*)archived\s*$', r'\1📦archived', block, flags=re.MULTILINE)
        block = re.sub(r'^(status:\s*)inbox\s*$', r'\1📥inbox', block, flags=re.MULTILINE)
        block = re.sub(r'^(status:\s*)waiting\s*$', r'\1⏳waiting', block, flags=re.MULTILINE)
        return block
    new_content = re.sub(r'^---\n.*?---\n', fix_status, content, flags=re.DOTALL)
    if new_content != content:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(new_content)
        changed += 1

print(f"Fixed bare status values: {changed} files")
PYEOF
```

- [ ] **Step 7.3: Fix `deadline:` → `due:`**

```bash
python - << 'PYEOF'
import sys, glob, re
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

files = glob.glob("**/*.md", recursive=True)
excludes = ['99-System/', 'Templates/', '.obsidian/', 'docs/']

changed = 0
for fp in files:
    if any(fp.startswith(e) for e in excludes):
        continue
    with open(fp, encoding='utf-8', errors='replace') as f:
        content = f.read()
    def fix_fm(m):
        return re.sub(r'^deadline:', 'due:', m.group(0), flags=re.MULTILINE)
    new_content = re.sub(r'^---\n.*?---\n', fix_fm, content, flags=re.DOTALL)
    if new_content != content:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(new_content)
        changed += 1

print(f"Fixed deadline→due: {changed} files")
PYEOF
```

- [ ] **Step 7.4: Fix `relatedNotes:` → `related:`**

```bash
python - << 'PYEOF'
import sys, glob, re
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

files = glob.glob("**/*.md", recursive=True)
excludes = ['99-System/', 'Templates/', '.obsidian/', 'docs/']

changed = 0
for fp in files:
    if any(fp.startswith(e) for e in excludes):
        continue
    with open(fp, encoding='utf-8', errors='replace') as f:
        content = f.read()
    def fix_fm(m):
        return re.sub(r'^relatedNotes:', 'related:', m.group(0), flags=re.MULTILINE)
    new_content = re.sub(r'^---\n.*?---\n', fix_fm, content, flags=re.DOTALL)
    if new_content != content:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(new_content)
        changed += 1

print(f"Fixed relatedNotes→related: {changed} files")
PYEOF
```

- [ ] **Step 7.5: Run YAML Orchestrator normalization pass**

Open Obsidian in the worktree folder. Run via QuickAdd: **Normalize YAML** (yaml_orchestrator.js). This handles field reordering and any remaining status map corrections.

- [ ] **Step 7.6: Verify**

```bash
grep -rn "maturity: 🌱seed" --include="*.md" . | grep -v "99-System\|Templates\|docs/"
```

Expected: no output.

```bash
grep -rn "^deadline:" --include="*.md" . | grep -v "99-System\|Templates\|docs/" | head
```

Expected: no output.

- [ ] **Step 7.7: Commit**

```bash
git add -A
git commit -m "migration: phase 7 — canonical values sweep (maturity, status, field names)"
```

---

## Task 8: Link Repair

**Files:**
- Modify: `**/*.md` body text (Python search-replace per rename)
- Manual: Obsidian Bases for `up:` frontmatter field repair

- [ ] **Step 8.1: Body-text link repair — all renames**

```bash
python - << 'PYEOF'
import sys, glob
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

files = glob.glob("**/*.md", recursive=True)
excludes = ['99-System/Scripts/', '.obsidian/', 'docs/superpowers/']

# All old→new path strings that appear in body text wikilinks
replacements = [
    # Efforts
    ('[[03-Efforts/Active/',        '[[03-Efforts/Active/'),
    ('[[03-Efforts/Active/',   '[[03-Efforts/Active/'),
    ('[[03-Efforts/Paused/', '[[03-Efforts/Paused/'),
    ('[[03-Efforts/Waiting/',  '[[03-Efforts/Waiting/'),
    # Knowledge
    ('[[02-Knowledge/',              '[[02-Knowledge/'),
    ('[[02-Knowledge]]',             '[[02-Knowledge]]'),
    ('[[Atomics]]',         '[[Atomics]]'),
    ('[[Areas]]',           '[[Areas]]'),
    ('[[People]]',          '[[People]]'),
    ('[[Places]]',          '[[Places]]'),
    ('[[Tools]]',           '[[Tools]]'),
    # Meta
    ('[[99-System/Documentation/',              '[[99-System/Documentation/'),
    ('[[99-System]]',             '[[99-System]]'),
    # Prompts
    ('[[99-System/Prompts/',           '[[99-System/Prompts/'),
    ('[[99-System/Prompts]]',          '[[99-System/Prompts]]'),
    # Sources
    ('[[04-Sources/', '[[04-Sources/'),
    ('[[04-Sources/Media/',     '[[04-Sources/Media/'),
    ('[[04-Sources/Guides/',    '[[04-Sources/Guides/'),
    ('[[04-Sources/Meetings/',  '[[04-Sources/Meetings/'),
]

changed = 0
for fp in files:
    if any(fp.startswith(e) for e in excludes):
        continue
    with open(fp, encoding='utf-8', errors='replace') as f:
        content = f.read()
    new_content = content
    for old, new in replacements:
        new_content = new_content.replace(old, new)
    if new_content != content:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(new_content)
        changed += 1

print(f"Body-text links repaired: {changed} files")
PYEOF
```

- [ ] **Step 8.2: Frontmatter `up:` repair via Obsidian Bases**

Open Obsidian in the worktree (`Origin-v2.0-migration/`). Use a `view.base` filter to find notes where `up` contains old path strings.

For each old value, bulk-update via Bases:

| Filter `up` contains | Replace with |
|----------------------|--------------|
| `03-Efforts/On` | `03-Efforts/Active` |
| `03-Efforts/Simmering` | `03-Efforts/Paused` |
| `02-Dots` | `02-Knowledge` |
| `100-Atomics` | `Atomics` |
| `200-Areas` | `Areas` |
| `300-People` | `People` |
| `400-Places` | `Places` |
| `500-Tools` | `Tools` |
| `00-Meta` | `99-System/Documentation` |
| `07-Prompts` | `99-System/Prompts` |

- [ ] **Step 8.3: Verify**

```bash
grep -rn "\[\[02-Dots\|02-Dots/" --include="*.md" . | grep -v "Scripts\|docs/superpowers\|\.obsidian" | wc -l
```

Aim for zero or near-zero. Any remaining hits are in template files (handled in Phase 9) or edge cases.

```bash
grep -rn "\[\[07-Prompts\|07-Prompts/" --include="*.md" . | grep -v "Scripts\|docs/superpowers\|\.obsidian" | wc -l
```

- [ ] **Step 8.4: Commit**

```bash
git add -A
git commit -m "migration: phase 8 — body-text wikilinks repaired for all renamed folders"
```

---

## Task 9: Templates Audit + Path Updates

**Files:**
- Modify: `Templates/**/*.md` (path references only)
- Modify: `99-System/Scripts/Templater_script.js`

- [ ] **Step 9.1: Grep all Templates for old path strings**

```bash
grep -rn "02-Dots\|00-Meta\|07-Prompts\|03-Efforts/On\b\|03-Efforts/Ongoing\|03-Efforts/Simmering\|03-Efforts/Sleeping\|410-Knowledge\|420-Media\|430-Guides\|440-Meetings" Templates/ | grep -v ".pyc"
```

Note every file and line number.

- [ ] **Step 9.2: Bulk-update Templates**

```bash
python - << 'PYEOF'
import sys, glob
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

files = glob.glob("Templates/**/*.md", recursive=True)

replacements = [
    ('02-Dots/100-Atomics', '02-Knowledge/Atomics'),
    ('02-Dots/200-Areas',   '02-Knowledge/Areas'),
    ('02-Dots/300-People',  '02-Knowledge/People'),
    ('02-Dots/400-Places',  '02-Knowledge/Places'),
    ('02-Dots/500-Tools',   '02-Knowledge/Tools'),
    ('02-Dots',             '02-Knowledge'),
    ('00-Meta',             '99-System/Documentation'),
    ('07-Prompts',          '99-System/Prompts'),
    ('03-Efforts/On/',      '03-Efforts/Active/'),
    ('03-Efforts/Ongoing/', '03-Efforts/Active/'),
    ('03-Efforts/Simmering/','03-Efforts/Paused/'),
    ('03-Efforts/Sleeping/', '03-Efforts/Waiting/'),
    ('04-Sources/410-Knowledge/', '04-Sources/'),
    ('04-Sources/420-Media/',     '04-Sources/Media/'),
    ('04-Sources/430-Guides/',    '04-Sources/Guides/'),
    ('04-Sources/440-Meetings/',  '04-Sources/Meetings/'),
]

changed = 0
for fp in files:
    with open(fp, encoding='utf-8', errors='replace') as f:
        content = f.read()
    new_content = content
    for old, new in replacements:
        new_content = new_content.replace(old, new)
    if new_content != content:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(new_content)
        changed += 1
        print(f"  Updated: {fp}")

print(f"Templates updated: {changed}")
PYEOF
```

- [ ] **Step 9.3: Update `Templater_script.js`**

```bash
grep -n "02-Dots\|00-Meta\|07-Prompts\|03-Efforts/On\b\|03-Efforts/Simmering" 99-System/Scripts/Templater_script.js
```

Apply the same replacements if any hits:

```bash
python - << 'PYEOF'
import sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

path = "99-System/Scripts/Templater_script.js"
with open(path, encoding='utf-8') as f:
    content = f.read()

replacements = [
    ('02-Dots/100-Atomics', '02-Knowledge/Atomics'),
    ('02-Dots/200-Areas',   '02-Knowledge/Areas'),
    ('02-Dots/300-People',  '02-Knowledge/People'),
    ('02-Dots/400-Places',  '02-Knowledge/Places'),
    ('02-Dots/500-Tools',   '02-Knowledge/Tools'),
    ('02-Dots',             '02-Knowledge'),
    ('00-Meta',             '99-System/Documentation'),
    ('07-Prompts',          '99-System/Prompts'),
    ('03-Efforts/On/',      '03-Efforts/Active/'),
    ('03-Efforts/Simmering/','03-Efforts/Paused/'),
]

new_content = content
for old, new in replacements:
    new_content = new_content.replace(old, new)

if new_content != content:
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Updated Templater_script.js")
else:
    print("No changes needed")
PYEOF
```

- [ ] **Step 9.4: Smoke-test each major template type**

Open Obsidian in the worktree. Create one test note for each type:
- **Atomic** → Template: `new-atomic-auto.md` — check YAML `type: atomic`, `up:` resolves to `[[Atomics]]`
- **Effort** → Template: `new-effort-auto.md` — check `up:` resolves to `[[Active]]` or `[[03-Efforts]]`
- **Source** → Template: `new-source-auto.md` — check `up:` resolves to `[[04-Sources]]`
- **MOC** → Template: `new-moc.md` — check no broken wikilinks
- **Meeting** → Template: `new-meeting.md` — check `up:` resolves to `[[Meetings]]`

For each: open Obsidian developer console (Ctrl+Shift+I) and check for errors after applying template.

Delete the test notes when done.

- [ ] **Step 9.5: Verify**

```bash
grep -rn "02-Dots\|00-Meta\|07-Prompts\|03-Efforts/On\b\|03-Efforts/Simmering\|410-Knowledge\|440-Meetings" Templates/ | wc -l
```

Expected: 0.

- [ ] **Step 9.6: Final commit**

```bash
git add -A
git commit -m "migration: phase 9 — Templates and Templater_script updated for new folder structure"
```

---

## Final Verification Before Merge

- [ ] Open Obsidian in `Origin-v2.0-migration/`. Navigate to `🏡Home.md` — loads without errors.
- [ ] Open `👁️Dashboard.md` — Dataview queries return results.
- [ ] Open `🧭 Review HQ.md` — no broken queries.
- [ ] Run QuickAdd → **Update Metrics Cache** — completes without Notice errors.
- [ ] Run QuickAdd → **Generate Weekly Report** — creates a report in `05-Calendar/Weekly/`.
- [ ] Graph view: check for isolated node clusters (broken links). Aim for zero isolated nodes in main sections.
- [ ] `git log --oneline migration/v2.0` — shows 9 phase commits.
- [ ] Compare folder structure with spec Section 3 — all folders match.

## Merge to Main

Only after all verification passes:

```bash
cd "/c/Users/MarcelMachanec/Documents/_Foundation for ORIGIN/Origin_DEV_STARTER_PACK/Origin-v1.9.1-Starter-Pack"
git checkout main
git merge migration/v2.0 --no-ff -m "feat: Origin v2.0 migration — complete folder restructure"
```

---

*Implementation plan for spec: `docs/superpowers/specs/2026-05-02-origin-v2-migration-design.md`*  
*Plan written: 2026-05-02*
