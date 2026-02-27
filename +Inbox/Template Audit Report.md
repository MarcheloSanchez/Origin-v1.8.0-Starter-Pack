---
title:
type: atomic
status: 📥inbox
created:
tags:
processing_priority:
related:
---

  112 templates scanned, 20 issues found
  CRITICAL (breaks functionality)
  None found. All QuickAdd and Templater path references point to existing files.
  WARNING (potential problems)
  1. [Missing Field] Templates/Meta/place-meta.yaml.md — missing standard status field. Has place_status instead but lacks the
  baseline status: that all other types have.
  2. [Missing Field] Templates/Meta/tool-meta.yaml.md — uses tool_status without a standard status: field (same pattern as
  place).
  INFO (cleanup opportunities)
  Unused templates — not referenced by QuickAdd or Templater folder templates:
  ┌─────┬───────────────────────────────────────────┬───────────────────────────────────────────┐
  │  #  │                   File                    │               Likely reason               │
  ├─────┼───────────────────────────────────────────┼───────────────────────────────────────────┤
  │ 1   │ Templates/Create/new-area.md              │ Manual variant — only -auto is wired      │
  ├─────┼───────────────────────────────────────────┼───────────────────────────────────────────┤
  │ 2   │ Templates/Create/new-atomic.md            │ Same                                      │
  ├─────┼───────────────────────────────────────────┼───────────────────────────────────────────┤
  │ 3   │ Templates/Create/new-effort.md            │ Same                                      │
  ├─────┼───────────────────────────────────────────┼───────────────────────────────────────────┤
  │ 4   │ Templates/Create/new-meeting.md           │ Same                                      │
  ├─────┼───────────────────────────────────────────┼───────────────────────────────────────────┤
  │ 5   │ Templates/Create/new-moc.md               │ Same                                      │
  ├─────┼───────────────────────────────────────────┼───────────────────────────────────────────┤
  │ 6   │ Templates/Create/new-person.md            │ Same                                      │
  ├─────┼───────────────────────────────────────────┼───────────────────────────────────────────┤
  │ 7   │ Templates/Create/new-place.md             │ Same                                      │
  ├─────┼───────────────────────────────────────────┼───────────────────────────────────────────┤
  │ 8   │ Templates/Create/new-prompt.md            │ Same                                      │
  ├─────┼───────────────────────────────────────────┼───────────────────────────────────────────┤
  │ 9   │ Templates/Create/new-source.md            │ Same                                      │
  ├─────┼───────────────────────────────────────────┼───────────────────────────────────────────┤
  │ 10  │ Templates/Create/new-tool.md              │ Same                                      │
  ├─────┼───────────────────────────────────────────┼───────────────────────────────────────────┤
  │ 11  │ Templates/Create/new-quick-prompt.md      │ No matching -auto or plugin ref           │
  ├─────┼───────────────────────────────────────────┼───────────────────────────────────────────┤
  │ 12  │ Templates/Calendar/Template Quarterly.md  │ Not in Templater folder config            │
  ├─────┼───────────────────────────────────────────┼───────────────────────────────────────────┤
  │ 13  │ Templates/Gamification/Challenge-Daily.md │ Only Weekly + Monthly are in QuickAdd     │
  ├─────┼───────────────────────────────────────────┼───────────────────────────────────────────┤
  │ 14  │ Templates/Template - Weekly Report.md     │ Only Monthly + Last 7 Days are referenced │
  └─────┴───────────────────────────────────────────┴───────────────────────────────────────────┘
  Naming inconsistencies:
  - Mixed separators in Template prefixed files: Template - X vs Template, X vs Template_X vs Template X (4 different patterns)
  - Czech in Scripts: Templater, YAML aktualizace modifikace.md — Czech filename among English ones
  - Emoji in filenames: +About Templatesℹ️.md, 📊Templater, Quick Vault Check.md
  - No duplicates found among Create templates (auto vs manual variants differ in content)
  ---
  Summary: No critical issues. The 10 manual new-*.md variants in Create/ are the biggest cleanup opportunity — they're all
  unused since only -auto versions are wired to QuickAdd/Templater. The place-meta and tool-meta missing status field is worth
  investigating if Dataview queries filter by status:.