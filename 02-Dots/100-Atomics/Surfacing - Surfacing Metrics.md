---
title: Surfacing - Metrics
type: atomic
maturity: 🌱 seedling
tags: [surfacing, metrics]
created: 2026-02-04
modified: 2026-02-04
---
# Surfacing Metrics

Useful lightweight metrics to track surfacing effectiveness:
- `last_modified` distribution: identifies stale notes
- `inlink_count`: notes with higher inlinks are more discoverable
- `processing_rate`: processed captures → atomics percentage
- `reuse_events`: manual tag when a note was used (e.g., `used:: 2026-02-04`)

Start with `inlink_count` and `processing_rate` for quick wins.
