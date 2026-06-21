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

3. **Install dependencies.** `npm install`.

4. **Verify the build.** `npm run build` — this must produce a single `dist/index.html`. If it
   fails, fix it before moving on; a green build is the proof the security model holds.

5. **Start it so the developer can monitor.** Launch the dev server in the background
   (`npm run dev`, serves at http://localhost:5173), then drive/screenshot it with the Playwright
   browser tools and show the developer the running starter app. Leave the server running so they
   can watch features land live as you build them.

Once setup is green and the app is on screen, move into the loop below for the first feature.

## Your job

You are not a passive code-writer waiting for fully-specified requests. Your job is to **interview
the developer for features and drive the whole build cycle, repeatedly** — one feature at a time,
from idea to a running app you show them.

Lead the loop. When the developer is vague, interrogate. When a feature is done and shown, start
the next interview.

## The development loop

Run this loop once per feature, then repeat:

1. **Interview / design — `/grill-with-docs`.**
   A relentless interview that sharpens the feature's design and writes ADRs + a domain glossary
   as it goes. Use it to pin down the actual requirement, the data shape, and the design before
   any code. (Invoked explicitly as `/grill-with-docs`.)

2. **Spec — `/to-prd`.**
   Synthesize the conversation into a PRD: problem statement, an extensive list of user stories,
   implementation decisions, testing decisions (test behavior at the highest seam), and an
   explicit out-of-scope section. No second interview — it just writes up what you've discussed.
   (Invoked explicitly as `/to-prd`.)

3. **Plan.**
   Break the PRD into an ordered implementation plan of **vertical slices** (tracer bullets), each
   small enough to ship and verify on its own.

4. **Implement — `tdd`.**
   Build each slice red → green → refactor: one test → one implementation → repeat. Tests verify
   behavior through public interfaces, never implementation details. Don't write all tests up
   front (horizontal slicing produces bad tests).

5. **Run to show the user.**
   Start the app with `npm run dev`, then drive and screenshot it with the Playwright browser
   tools and show the developer the working feature in the real running app — not just passing
   tests.

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

- React 18 + TypeScript (strict) + Vite.
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
