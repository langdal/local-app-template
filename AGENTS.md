# Agent Instructions for This Repository

This repo is a template for **vibe coding local-first personal tools** — small single-purpose
apps that solve one person's need. Data analysis (load a file, explore and chart it) is a common
case, but the foundation is deliberately general: trackers, converters, note tools, dashboards,
calculators — whatever the developer wants. Each app you build here ships as a **single
self-contained `index.html`** with all JavaScript inlined — it runs by being opened directly in a
browser, no server, no network. That is the security model, and it is the whole point (see
[Security model](#security-model-hard-rules)).

## First run — bootstrap the project

When the developer kicks off (e.g. they say **"let's get going"**, "let's get started", or
otherwise start a fresh session on an un-bootstrapped checkout), run this one-time setup before
anything else. Do it for them — don't make them run commands by hand.

1. **Ensure `mise` is installed.** Check with `command -v mise`.
   - If it's missing, **do not install it silently.** Tell the developer to run the official
     installer themselves (it modifies their shell), e.g. by typing it with the `!` prefix in
     Claude Code or pasting it into their terminal:
     ```bash
     curl https://mise.run | sh
     ```
     Then have them open a new shell / activate mise, and confirm `mise --version` works before
     continuing.

2. **Provision the toolchain.** Run `mise install` (installs the Node/npm versions pinned in
   `mise.toml`). If `npm`/`node` aren't on the agent's PATH afterwards, run the remaining commands
   through mise, e.g. `mise exec -- npm install`.

3. **Install dependencies.** `npm install`. Testing is pre-wired (`vitest`); confirm with
   `npm test` (it passes with no tests yet).

4. **Make sure the workflow skills are set up.** The build cycle runs on the Matt Pocock
   engineering skills — `grill-with-docs`, `to-prd`, `to-issues`, `tdd`, plus the helpers
   `grilling` and `domain-modeling`. Check `.agents/skills/` for them.
   - If any are missing, **do not install them yourself** (external code — the developer
     authorizes it). Ask the developer to run, e.g.:
     ```bash
     npx skills add mattpocock/skills@grilling mattpocock/skills@domain-modeling
     ```
   - Once, on a fresh repo, ask the developer to invoke **`/setup-matt-pocock-skills`** and choose
     the **Local markdown** issue tracker. This scaffolds the local artifact store under
     `.scratch/` (PRDs + issues), the triage labels, and the domain-doc layout. It's user-invoked
     and interactive — prompt them, don't try to run it yourself.

5. **Verify the build.** `npm run build` — this must produce a single `dist/index.html`. If it
   fails, fix it before moving on; a green build is the proof the security model holds.

6. **Start it so the developer can monitor.** Launch the dev server in the background.
   - **Only add `--host` when you are sandboxed** (VM / container / remote box) — there `localhost`
     binds inside the sandbox and the developer can't reach it, so use `npm run dev -- --host` and
     hand over the **Network** URL Vite prints. When you run on the developer's own machine, plain
     `npm run dev` + `http://localhost:5173` is correct.
   - Drive/screenshot the app with the Playwright browser tools, then **stop and ask the developer
     to confirm they can load the URL** before continuing. Your own screenshot proves the build
     renders; it does **not** prove the human can see it. Leave the server running so they can
     watch features land live.

Once setup is green and the developer confirms the app is on screen, move into the loop below for
the first feature.

## Your job

You are not a passive code-writer waiting for fully-specified requests. Your job is to **interview
the developer for features and drive the whole build cycle, repeatedly** — one feature at a time,
from idea to a running app you show them.

Lead the loop. When the developer is vague, interrogate. When a feature is done and shown, start
the next interview.

## The development loop

Run this loop once per feature, then repeat. **Each step produces an inspectable artifact before
the next begins — never skip a step or fabricate its output inline in chat.** The first three
skills are user-invoked (`disable-model-invocation`); you cannot run them yourself, so **prompt
the developer to invoke the slash-command** and wait for the artifact to land before moving on.

1. **Interview / design — `/grill-with-docs`.**
   Ask the developer to run `/grill-with-docs`. It runs a relentless interview that sharpens the
   feature's design and, via `domain-modeling`, writes **ADRs (`docs/adr/`) and a domain glossary
   / `CONTEXT.md`** as it goes. Don't substitute a quick inline Q&A — the artifacts are the point.

2. **Spec — `/to-prd`.**
   Ask the developer to run `/to-prd`. It synthesizes the conversation into a **PRD** (problem,
   user stories, implementation + testing decisions, out-of-scope) and writes it to the issue
   tracker — for the local-markdown tracker that's `.scratch/<feature-slug>/PRD.md`.

3. **Plan / issues — `/to-issues`.**
   Ask the developer to run `/to-issues`. It breaks the PRD into a **dependency-ordered list of
   vertical-slice issues** (each a tracer bullet with a `Blocked by` field), written under
   `.scratch/<feature-slug>/issues/NN-slug.md`. This issue list is what drives implementation.

4. **Implement — `tdd`.**
   Work the issues in dependency order. For each, use the `tdd` skill: red → green → refactor, one
   test → one implementation → repeat, testing behavior through public interfaces. Don't write all
   tests up front (horizontal slicing produces bad tests). `tdd` is model-invocable — you run it.

5. **Run to show the developer.**
   Start the dev server (see bootstrap step 6 — `--host` only if sandboxed). Drive the app with
   the Playwright browser tools and **verify the actual values/behavior, not just the screenshot**
   (read the DOM / console / computed data — a screenshot can hide both bugs and non-bugs). Then
   show the developer the working feature and confirm they can see it.
   - Verifying an upload/file feature? The sample must live inside the repo — Playwright can't
     read files outside the project root. Copy the developer's sample in first.

6. **Loop.**
   Return to step 1 for the next feature.

## Security model (hard rules)

These are non-negotiable. A feature that breaks any of them is not done, regardless of tests.

- **Single static file.** The deployable artifact is one `index.html` with **all JavaScript
  inlined** (via `vite-plugin-singlefile`). It must run by opening the file — no backend, no
  server process.
- **No runtime network calls.** No external CDNs, fonts, scripts, or API requests at runtime.
  Bundle and inline every dependency and asset into the single file.
- **Data never leaves the browser.** All parsing, computation, and analysis happen client-side.
  No uploads to a server, no telemetry, no analytics.
- **Works fully offline.** The app must function with no network connection at all.
- **`file://`-safe routing.** Preserve `HashRouter` and relative (`./`) asset paths so routing
  works when the file is opened directly from disk.
- **Only bundleable dependencies.** Reject any library that requires a backend, a runtime fetch,
  or a build step that can't be inlined into the single file.

## Tech baseline

- React 18 + TypeScript (strict) + Vite, with **Vitest** pre-wired for the `tdd` loop
  (`npm test`).
- Core product shape: a single-purpose tool that does its job entirely client-side. Many tools
  follow a load → work-with-it → see-results arc (e.g. load data → analyze → visualize), but
  don't force that shape if the tool doesn't need it.
- Validate the security model with `npm run build` — it must emit a single `dist/index.html`.

## Working norms

- On the first real feature, replace the template's placeholder project name and UI copy with
  project-specific language.
- Keep changes incremental; build and show often.
- If a change would threaten single-file or offline deployment, **stop and confirm with the
  developer first** before proceeding.
