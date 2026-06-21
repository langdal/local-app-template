# Project instructions

The canonical, agent-agnostic instructions for this repo live in `AGENTS.md`.
Claude Code reads `CLAUDE.md`, so this file imports them:

@AGENTS.md

## Skills

The Matt Pocock workflow skills are vendored in `.agents/skills/` (the agent-agnostic
location) and exposed to Claude Code via the `.claude/skills` symlink. They are available
as slash commands — the spine of the build loop is `/grill-with-docs` → `/to-prd` →
`/to-issues` → `tdd`, with artifacts (ADRs, glossary, PRD, dependency-ordered issues) landing
in `docs/` and `.scratch/`. See `AGENTS.md` for how they fit the cycle.

## Agent skills

### Issue tracker

Local markdown — issues and PRDs live under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical roles (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
