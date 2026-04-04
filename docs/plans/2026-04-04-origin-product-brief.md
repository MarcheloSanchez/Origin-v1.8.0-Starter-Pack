---
title: Origin — Product Brief v1
date: 2026-04-04
status: active
type: product-brief
---

# Origin — Product Brief

## The User

**You.** Specifically:
- Morning you (needs direction — what are today's TOP 3?)
- Capture-mode you (idea fires during the day — needs to land somewhere and not die)
- Processing-mode you (reviews, links, approves AI suggestions)
- End-of-day you (wants to feel like the day had a shape)

All four of these must be served. If any one of them can't do their job in Origin, the system fails.

---

## The Pain

> "I never review what I captured."

This is the real problem. Not missing features. Not inconsistencies. **The notes go in and never come back out.**

Root cause: no reliable daily processing ritual is built into the system. Capture is working. The loop is broken at review + link + close.

Secondary pain: inconsistencies (template mismatches, broken QuickAdd commands, unreadable note structure) destroy trust in the system. If you don't trust it, you don't use it.

---

## Why Now

FOMO overwhelm from information overload. The second brain doesn't feel like a relief — it feels like another inbox. This needs to flip: opening Origin should feel like relief, not guilt.

---

## The 10-Star Version

A typical Tuesday:
- Morning: physical routine → open Daily note → write TOP 3 priorities (pre-populated with yesterday's carry-overs and scheduled tasks)
- During the day: capture fires through QuickAdd in <5 seconds; AI discusses the note, proposes links and tags; you approve or reject
- End of day: automated summary lands in the Daily note — what was created, what was processed, what carried forward
- Weekly: a review surfaces what was captured but never processed

AI is a co-pilot that suggests, never commits without approval. You are always the editor.

---

## MVP (v1 Ship Criteria)

Origin DEV is the closest existing version. It ships as v1 when ALL of these are true:

1. **QuickAdd commands work** — every command in the menu executes without error
2. **Templates are readable** — opening any template produces a human-readable note with no broken syntax
3. **Same-day pipeline works** — an idea can be captured → processed → linked → filed within the same day without friction
4. **Daily note has structure** — TOP 3 is visible; end-of-day summary can land in it (manually or auto)
5. **Inbox is trustworthy** — inbox count is visible; items don't silently disappear or get duplicated

That's it. No AI integrations required for v1. Those are v2.

---

## Anti-Goals (Explicit)

- No sensitive personal information in the vault
- AI cannot edit files without explicit per-action approval
- Not an image backup or media archive — text and links only
- Not a task manager — TOP 3 is a focus tool, not a full GTD system
- Not a social or shared system — this is a permanent personal second brain

---

## How You Know It's Working

**Signal, not vibes:**
- QuickAdd success rate: every command works on first attempt
- Template integrity: no broken Templater syntax when a template fires
- Same-day closure rate: ideas captured today are processed (linked, tagged, filed) before end of day
- Daily note completeness: TOP 3 is set before 10am; summary exists by end of day

If these four metrics are green, Origin is working.

---

## Go / No-Go

**GO** — with one scope constraint.

Do not build AI integration before the four v1 criteria above are solid. The 10-star vision is real and worth building toward. But if QuickAdd is broken and templates are inconsistent, adding AI on top creates a broken AI on top of a broken vault.

**The order:**
1. Fix inconsistencies (templates, QuickAdd, note structure)
2. Lock the daily ritual (Daily note → TOP 3 → end-of-day summary → inbox review)
3. Then: AI layer on top of a vault you already trust

---

## Biggest Risk

**You keep working on Origin instead of working in Origin.**

The system becomes the project. Ship v1 (criteria above), declare it stable, and use it for 30 days before touching the structure again.

---

## Next Step

Run an audit of Origin DEV against the 5 v1 criteria above. For each one: pass / fail / what's needed to pass.
