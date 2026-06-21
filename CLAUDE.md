# Project instructions

The canonical, agent-agnostic instructions for this repo live in `AGENTS.md`.
Claude Code reads `CLAUDE.md`, so this file imports them:

@AGENTS.md

## Skills

The Matt Pocock workflow skills are vendored in `.agents/skills/` (the agent-agnostic
location) and exposed to Claude Code via the `.claude/skills` symlink. They are available
as slash commands — the spine of the build loop is `/grill-with-docs` → `/to-prd` → `tdd`.
See `AGENTS.md` for how they fit the cycle.
