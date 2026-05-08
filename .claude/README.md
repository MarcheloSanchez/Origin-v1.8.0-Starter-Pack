# Origin Claude Code Kit — v0.1

Foundation skill + first reflection command for the Origin Obsidian vault.

This kit gives Claude Code the context it needs to operate inside Origin without violating your locked enums, boundary tiers, or YAML schema. It does NOT replace your existing scripts (`yaml_orchestrator.js`, `smart-classifier.js`, etc.) — it adds a synthesis layer on top.

## What's in this kit

```
.claude/
├── skills/
│   └── origin-vault/
│       └── SKILL.md          ← Foundation: enums, schema, boundaries, conventions
└── commands/
    └── reflect-daily.md      ← First command: daily note synthesis
```

## Installation

1. **Copy the `.claude` folder** to your Origin vault root, alongside `.obsidian/`:

   ```
   Origin/
   ├── .obsidian/
   ├── .claude/              ← drop this in
   ├── +Inbox/
   ├── 00-Meta/
   ...
   ```

2. **Open a terminal** in the Origin vault root.

3. **Start Claude Code**: `claude`

   Claude Code will auto-detect `.claude/skills/` and `.claude/commands/`.

4. **Test the skill is loading**: ask `Are you using the origin-vault skill?` — Claude should confirm and reference your enums/folder structure.

5. **Run the first command**: `/reflect-daily` (with no argument, runs on today's daily note).

   Or with a specific date: `/reflect-daily 2026-05-07`

## What this command does (and doesn't do)

### Does
- Reads today's daily note from `05-Calendar/Daily/`
- Synthesizes wins, lessons, blockers, energy/focus pattern
- Suggests top 3 for tomorrow
- Identifies captures that could become atomics or efforts
- Suggests wikilinks to existing notes (verified to exist)
- Appends an `## 🔁 AI Reflection` section to the daily note
- Flags stuck-loops if a blocker recurs 3+ days running
- Honestly names unproductive days instead of papering over them

### Doesn't
- Modify YAML frontmatter
- Move or create new files (only suggests routing)
- Auto-translate Czech → English or vice versa
- Touch Wayfinder callouts
- Invent enum values not in CIS
- Run on files outside `05-Calendar/Daily/`

## Why a skill + commands instead of just commands

Without the skill, every command would have to repeat your enums, folder structure, YAML order, boundaries, and conventions — copy-pasted, drifting out of sync. The skill is loaded once and inherited by every command. Single source of truth.

Future commands you add will load `origin-vault` automatically. You only update conventions in one place.

## What's NOT in this kit (yet)

These were proposed but not built — easy to add as the pattern proves out:

- **`/reflect-weekly`** — synthesis across the last 7 daily notes; surfaces recurring themes, energy patterns, time allocation, stuck loops
- **`/reflect-monthly`** — strategic synthesis with Areas health check and Effort progress
- **`/lint-vault`** — produces a report (doesn't modify): broken links, orphan notes, type/status mismatches, fileClass violations, YAML order violations, maturity-vs-link-count mismatches
- **`/review-moc <name>`** — pick a MOC, audit linked notes for staleness, suggest content gaps, flag missing connections
- **`/process-inbox-item`** — propose classification for a single Inbox item (would integrate with your existing `smart-classifier.js`, not replace it)
- **`/extract-actions`** — scan any note for implicit TODOs, format per Tasks plugin conventions, with GTD context tags
- **`/suggest-links`** — find missing wikilink candidates by semantic similarity

Pick whichever proves most valuable after running `/reflect-daily` for a week. The pattern is consistent — once you see one command, the rest follow the same structure.

## Customization tips

- The reflection section structure (Wins / Lessons / Blockers / Energy / Top 3 / Captures / Links) can be adjusted in `commands/reflect-daily.md`. Edit the markdown template inside the command file.
- If your daily notes use a specific filename pattern (e.g. `📅 YYYY-MM-DD - Weekday.md`), update the "Locate the daily note" section in `reflect-daily.md` to match.
- The skill's "Existing Automation" section lists scripts the agent should NOT duplicate. Update this list as you add or remove scripts.

## Versioning

- **v0.1** — Foundation skill + `/reflect-daily`
- Track changes by adding entries below as you extend the kit.

## Notes on usage

This is a **collaborative AI** approach, not a delegation system. Treat the reflection as a draft to react to — push back on synthesis you disagree with, and the next iteration will be sharper. If you find yourself accepting reflections passively without engagement, the system is failing its purpose.

The honest mode is the point. If the command starts producing flattery or papering over bad days, edit `reflect-daily.md` to crank up the directness.
