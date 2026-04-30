# ADR-0001: Vault Workflow Architecture — MCP + Skills + Bash Layers

**Date**: 2026-04-26
**Status**: accepted
**Deciders**: Marchelo

## Context

Origin PKM vault needs a repeatable workflow for daily triage, weekly review, and quarterly maintenance when working with Claude Code. The vault has a dedicated `origin-minimal` MCP server (14 declared tools), active Claude Code plugins (superpowers, feature-dev, context7, sequential-thinking, memory), and existing in-vault automation (Templater/QuickAdd scripts). Testing revealed only 2 of 8 MCP tools are currently functional (`inbox_health`, `list_inbox`). The remaining 6 fail with server-side Python naming/serialization bugs. This gap means the MCP cannot yet serve as the primary tooling layer as intended.

## Decision

We adopt a three-layer workflow stack:
1. **`origin-minimal` MCP tools** where functional — primary vault read/write interface
2. **Bash + Python scripts** for operations where MCP is broken or absent
3. **Claude Code skills** (sequential-thinking, brainstorming, debugging) for design/planning tasks

MCP layer is treated as aspirational — fix broken tools incrementally and promote each to primary status once verified.

## Alternatives Considered

### Alternative 1: MCP-first (all vault ops via origin-minimal)
- **Pros**: Clean, single interface; vault-aware; no Bash plumbing needed
- **Cons**: 6/8 tools broken today; blocks real work
- **Why not**: Can't rely on it until bugs fixed

### Alternative 2: Bash-only (no MCP, use claude-scripts/)
- **Pros**: Already works; proven; `vault-morning.sh` and `vault-desloppify.sh` exist
- **Cons**: No structured vault context for Claude; no semantic search; harder to compose with skills
- **Why not**: MCP adds genuine value when working — abandoning it loses that upside

### Alternative 3: In-vault only (Templater/QuickAdd, no Claude Code involvement)
- **Pros**: Zero dependency on Claude Code session
- **Cons**: No AI-assisted triage, classification, or planning; manual only
- **Why not**: Defeats purpose of Claude Code integration

## Consequences

### Positive
- Working tools usable immediately (`list_inbox`, `inbox_health`)
- Bash fallback covers broken MCP gaps without blocking workflow
- Skills layer (brainstorming, sequential-thinking) remains available for planning

### Negative
- Two-track maintenance: fix MCP bugs AND maintain Bash scripts
- Must track which MCP tools are verified vs broken

### Risks
- MCP bugs may signal deeper server stability issues — monitor after each Obsidian/plugin update
