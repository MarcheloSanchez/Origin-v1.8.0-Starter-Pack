# Windows Folder Organization System

> Captured from Claude Code session — 2026-04-06
> Status: design agreed, not yet implemented

---

## What Was Decided

Single-machine setup (work + personal), two cloud services already providing a natural split:
- **OneDrive (M365)** → work files
- **Google Drive** → personal files
- **Local only** → `Documents\Scratch\`, Desktop (temp), Downloads (inbox)

Primary organizing axis: **Project / Area** — not by file type, not by date, not by client. Everything about a project lives inside one folder. Navigation happens via Quick Access pins and Windows Search — not by duplicating files.

---

## Windows Storage Levels (Mental Model)

```
C:\
├── Program Files\     ← apps, don't touch
├── Windows\           ← OS, never touch
├── ProgramData\       ← hidden, app config, don't touch
└── Users\
    └── Marcel\        ← EVERYTHING YOURS lives here
        ├── AppData\   ← hidden, app config for your profile, don't touch
        ├── Desktop\   ← temp whiteboard
        ├── Downloads\ ← inbox only
        ├── Documents\ ← local scratch / overflow
        ├── OneDrive - [Company]\   ← work cloud root
        └── Google Drive\           ← personal cloud root
```

Rule: **your files never go outside `C:\Users\Marcel\`**. You don't need folders anywhere else.

---

## Proposed Structure

### Work — `OneDrive - [Company]\`

```
OneDrive - [Company]\
├── Projects\
│   ├── ProjectName\
│   │   ├── contracts\
│   │   ├── design\
│   │   └── notes\
│   └── _archive\
├── Clients\
│   └── ClientName\
├── Admin\
│   ├── contracts\
│   ├── invoices\
│   └── hr\
└── Reference\
```

### Personal — `Google Drive\`

```
Google Drive\
├── Finance\
│   └── 2026\
├── Health\
├── Legal\
├── Home\
├── Learning\
│   └── certificates\
├── Travel\
│   └── _archive\
├── Purchases\
├── Media\
│   ├── Photos\
│   └── Video\
└── Projects\
    └── _archive\
```

### Local — `Documents\`

```
Documents\
└── Scratch\    ← drafts not yet assigned to a project
```

---

## Personal Folders — What Goes Where

| Folder | What lives here |
|--------|----------------|
| `Finance\YYYY\` | Bank statements, invoices received, tax returns, salary slips |
| `Health\` | Test results, prescriptions, doctor letters, vaccination records |
| `Legal\` | ID scans, birth certificate, lease, insurance policies, employment contracts |
| `Home\` | Appliance manuals, warranties, utility/ISP info, landlord contacts |
| `Learning\` | Course certificates, downloaded materials (notes → Obsidian, not here) |
| `Travel\` | Bookings, itineraries, insurance — one subfolder per trip |
| `Purchases\` | Receipts and warranties for electronics, tools, goods |
| `Media\` | Photos, video — Photos can be flat or `YYYY\` or `YYYY-MM-Event\` |
| `Projects\` | Personal projects with multiple files and an active goal |

---

## Naming Conventions

```
Folders:
  PascalCase for project/client names  →  AlphaLaunch, ClientAcme
  lowercase for category subfolders    →  contracts, design, notes
  _archive prefix (underscore)         →  sorts to bottom in Explorer

Files:
  Date-first when order matters        →  2026-04-06_contract_acme_v1.pdf
  Descriptor-first when type matters   →  invoice_electricity_2026-03.pdf
  Version suffix                       →  _v1, _v2, _final  (never _final_FINAL)
  Avoid in names: ( ) & # % '          →  cause issues in scripts and URLs
```

**Path depth limit:** max 4 levels — Windows default path limit is 260 chars.

---

## Workflow Rules

### Downloads — Inbox, Not Storage
- Process once a week minimum
- Each file: file it, delete it, or move to `Documents\Scratch\`
- Never use as permanent storage

### Desktop — Temp Whiteboard
- Active-week shortcuts and in-progress files only
- Clear every Friday
- Use Quick Access pins for navigation instead of Desktop shortcuts

### New Project Checklist
1. Work or personal? → pick the right cloud root
2. Create `Projects\ProjectName\` with subfolders
3. Pin to Quick Access (right-click → Pin to Quick Access)
4. When done: unpin, move to `_archive\`

### Files That Legitimately Touch Both Contexts (rare)
- Keep in primary location
- Create a Windows `.lnk` shortcut pointing to it from the secondary location
- Never duplicate the actual file

---

## Anti-Patterns (What NOT to Create)

| Don't create | Why |
|-------------|-----|
| `Contacts\` folder | Lives in phone/Google Contacts |
| `Notes\` folder | Lives in Obsidian |
| `Books\` / `Articles\` folder | Lives in reading app or Obsidian |
| Folder per file type across projects | Fragments related material — use search instead |
| Date-based top-level folders | Makes finding active projects harder — archive handles old |
| Nested folders deeper than 4 levels | Path length issues + cognitive overhead |
| Duplicate files for "different contexts" | Single source of truth + shortcuts |

---

## Windows Features to Use

**Quick Access** — pin 5–8 active folders max; unpin when project ends

**Windows Search filters:**
- `kind:document` — filter by content type
- `date:this week` — filter by recency
- `*.pdf` — filter by extension
- Search from within a folder in Explorer to scope results

**File Explorer view tips:**
- Details view for folders with many files (sortable columns)
- Sort by `Date Modified` as default
- Group by `Date Modified` for Downloads and Desktop

---

## What to Implement Next

1. **Verify cloud roots** — confirm where OneDrive and Google Drive folders actually land on your machine (`C:\Users\Marcel\...`)
2. **Create work structure** inside OneDrive — Projects, Clients, Admin, Reference
3. **Create personal structure** inside Google Drive — the folders above
4. **Set up Quick Access** — pin both cloud roots + Downloads + 1–2 active projects
5. **Process Downloads** — file or delete everything currently sitting there
6. **Establish Desktop habit** — clear everything non-active off it now
7. **Optional automation** — PowerShell scaffold script for new projects; Downloads cleanup script

---

## Open Questions (Not Yet Covered)

- Work folder elaboration (same depth as personal)
- Naming conventions with real examples for your file types
- Migration strategy — how to move from current structure without a weekend project
- PowerShell automation scripts (scaffold, cleanup)
