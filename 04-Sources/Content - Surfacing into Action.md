---
title: Surfacing into Action (Expert)
type: guide
status: ready-for-review
author: GitHub Copilot — PKM systems designer
tags: [surfacing, content, newsletter, guide]
created: 2026-02-04
modified: 2026-02-04
---
# Surfacing into Action — Expert Guide

Summary
This short guide presents a minimal, high-impact approach to make your notes resurface reliably. These three moves are field-tested for PKM systems: signals, edges, and lightweight instrumentation.

Why this works
- Discoverability = Signals + Graph. Clear titles and metadata make notes findable; links create the graph that surfaces related ideas.
- Small rituals compound: linking two edges per processed note multiplies rediscovery opportunities across the vault.

Three proven moves (do these now)

1) Design discovery-first signals
- Rule: Title = circumstance + intent. Example: "When commuting — 10m micro-learning ritual".
- Minimal metadata: `tags: [Area, Method]`, `maturity: sapling|grown`, `MOC: "🗺️My PKM MOC"`.
- Quick action: rewrite titles for 10 high-potential captures (2–3 minutes each).

2) Make linking a non-negotiable processing step
- Rule: Every processed capture gets 2 links: one structural (MOC/area) and one lateral (related atomic).
- Implementation: add a `## Connections` section and paste two backlinks while processing.
- Quick action: add links during regular inbox processing (60–120s per capture).

3) Instrument two lightweight metrics and review weekly
- `inlink_count`: expose on `👁️Dashboard`; prioritize notes with 0–1 links for targeted linking.
- `processing_rate`: inbox → atomic conversion percentage; target ≥ 60%.
- Quick action: add `used:: YYYY-MM-DD` when you reuse a note; surface these during your weekly review.

Implementation templates (copy into your templates folder)

Frontmatter template
```
---
title: 
type: atomic
maturity: sapling
tags: [Area, Method]
MOC: "🗺️My PKM MOC"
---
```

Connections section (paste into atomics)
```
## Connections
- [[Related Atomic 1]]
- [[MOC — Area]]
```

2-week experiment (measurable)
- Baseline: capture `inlink_count` distribution and `processing_rate` from `👁️Dashboard`.
- Intervention: rewrite 20 titles, link every processed note to 2 existing notes, record `used::` when reusing.
- Measurement: after 2 weeks, compare changes in `median inlink_count`, total `used::` events, and `processing_rate`.

Expected outcome
- Increased discoverability for high-value notes, more visible items in weekly review, and higher reuse rate in writing and projects.

References
- Atomics: [[Surfacing - Signal Design]], [[Surfacing - Connection Ritual]], [[Surfacing - Surfacing Metrics]].

Next steps I can take for you
- Integrate this guide into `🗺️My PKM MOC` and add `inlink_count` & `processing_rate` widgets to `👁️Dashboard`.
- Or: I can generate the two-week experiment tasks and add them to your GTD Weekly Review.

