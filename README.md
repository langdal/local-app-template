# Local Web Tool Template

A foundation for vibe-coding **local-first personal tools** — small single-page apps that run
entirely in your browser and ship as one self-contained HTML file you can just open. Data
analysis (drop in a CSV, chart it) is one common use, but the template is deliberately
unopinionated: budget trackers, habit trackers, note scratchpads, format converters, dashboards —
anything that scratches a personal-tool itch.

## Getting started

This template is built to be driven by a coding agent (Claude Code). You don't need to run
any setup commands yourself — the agent does it for you.

1. Clone this repo and `cd` into it.
2. Start the agent in the repo:
   ```bash
   claude
   ```
3. Type the kick-off prompt:
   > **let's get going**

The agent will then bootstrap the project for you: it checks that [mise](https://mise.jdx.dev)
is installed (and walks you through installing it if it isn't), provisions the toolchain
(`mise install`), installs dependencies, runs a build to confirm everything works, and starts
the dev server so you can watch the app live in your browser. From there it interviews you for
your first feature and builds it. See `AGENTS.md` for the full workflow.

> If `mise` is missing, the agent will ask you to install it with the official one-line
> installer — run it yourself in your shell (or with the `!` prefix inside Claude Code):
> ```bash
> curl https://mise.run | sh
> ```

## What This Template Includes

- React + TypeScript + Vite setup
- Hash-based client routing for compatibility with local file usage
- Single-file production output support using `vite-plugin-singlefile`
- Strict TypeScript settings and a small starter UI shell

## Core Product Shape

- One browser-based application that solves a single personal-tool need
- Runs fully client-side — your data stays on your machine
- Whatever the tool does (analyze, track, convert, edit, visualize), it does it locally
- Build output is a deployable `index.html` bundle that can be opened directly

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Build output is generated in `dist/`. The template is configured to keep deployment simple for local/static distribution and to preserve a single deployable entry point (`index.html`).

## Customization Checklist

1. Rename the project in `package.json`.
2. Replace the placeholder UI copy in the header and home page.
3. Implement the core interactions for your tool (input handling, parsing/validation as needed).
4. Build out the views and logic for your specific use case.
5. Update this README with project-specific docs.
