# StrawberryLike

A minimal AI-agentic browser: Electron + Vercel AI SDK + your own OpenRouter key.

Built as a clean-room alternative to the architecture observed in Strawberry
Browser 1.0.5. No Strawberry code, assets, or copy is used.

## What it does

- A chat sidebar that streams from a model you choose.
- Real browsing tabs (`WebContentsView`), each with `contextIsolation`,
  `sandbox`, and no node integration.
- Agent tools the model can call: `create_tab`, `list_tabs`, `list_page_links`,
  `list_clickable`, `click_link`, `click_page`, `list_fields`, `type_into`,
  `read_page`, `run_command`. There is deliberately no `navigate_tab`: the model
  drives the page by clicking and typing, never by editing a URL.
- Skills loaded from `skills/<name>/SKILL.md` (Claude-Skills frontmatter).
- An untrusted-content boundary around page text, so a hostile page cannot
  impersonate a user instruction.
- A fail-closed execution gate.

## Setup

```bash
npm install
node node_modules/electron/install.js   # if the Electron binary did not download
cp .env.example .env
```

Edit `.env`:

```ini
OPENROUTER_API_KEY=sk-or-v1-...          # from openrouter.ai/keys
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_MODEL=nvidia/nemotron-3-ultra-550b-a55b:free
APP_API_BASE_URL=http://localhost:8787   # your backend, if you add one
EXEC_POLICY=deny                         # sandbox | deny | direct-host
```

```bash
npm run dev        # develop
npm run build      # build to out/
npm run typecheck  # both tsconfigs
```

## The provider seam

There is exactly one place a model credential is used:

`src/main/llm/openrouter.ts` — builds an OpenAI-compatible client against
OpenRouter, key read from `.env` in the main process only. The renderer never
sees it. Pointing at a different provider means changing this file and nothing
else.

Models come from `src/shared/models.json`, validated by a zod schema in
`src/shared/models.ts`. Ids are passed to the provider verbatim, so OpenRouter's
`author/model` slugs work as-is. Add or remove entries freely.

> Implementation note: Strawberry builds its provider with Vercel's
> `createGateway` against its own API host, so its client holds no provider key
> and all usage is metered server-side. This app inverts that — the key is local
> and calls go straight to OpenRouter. There is no credit system here.

## Execution policy

`src/main/sandbox/policy.ts` is the only place that decides whether the agent may
run a command.

| `EXEC_POLICY` | Behaviour |
| --- | --- |
| `deny` (default) | No agent command runs. |
| `sandbox` | Runs via an isolation backend — **fails closed** if none is available. |
| `direct-host` | Runs as your own user, unsandboxed. Opt-in only. Commands are limited to 30 seconds and 256 KiB per output stream. |

`detectSandboxBackend()` returns `null`, so `sandbox` currently refuses
everything. That is deliberate: the runner is not implemented, and the default
must be safe. The implemented `direct-host` runner uses the platform shell (`cmd.exe` on
Windows and `$SHELL` or `/bin/sh` elsewhere). It is intentionally disabled by
default because the model can request arbitrary commands. The `sandbox`
backend remains unavailable until a real isolation backend is wired.

Worth knowing, because it is the trap in the design this is modelled on:
Strawberry runs agent commands through Windows sandbox users and firewall rules,
but falls back to unsandboxed `direct-host` after *any* sandbox failure — mid
session, silently. This scaffold never auto-escalates.

## Skills

```
skills/
  web-summarize/SKILL.md
  tab-hygiene/SKILL.md
```

```markdown
---
name: my-skill
description: One line telling the model when this applies.
category: browsing
allowed-tools:
  - list_tabs
---

Instructions in Markdown.
```

Only `name` and `description` are inlined into the system prompt; the body is
kept out of context until used. A malformed skill is logged and skipped rather
than breaking startup.

## Untrusted content

`src/main/security/untrusted.ts` wraps external text in a boundary delimited by a
per-session random nonce, so page content cannot close the block early by
reproducing the delimiter. Page text is *data*; the model is told so explicitly.

## The virtual pointer

The agent navigates by clicking, so the browser shows its own pointer: an SVG
arrow with an `AI` badge that glides onto a target before the click lands.

It is injected into the page rather than drawn as a separate
`WebContentsView`. That is forced by the platform: a transparent overlay view
composited above a tab swallows every mouse event aimed at the page beneath it
(measured — the overlay received the moves, the page received none), so an
overlay would make the site unusable for the person watching. Living in the
page keeps the pointer click-through for free, at the cost of being re-injected
after each navigation and of being reachable by page CSS. A closed shadow root
closes that second hole.

`src/main/cursor.ts` owns the pointer; `TabManager` re-injects it on every
`dom-ready`. `list_clickable` reports what is clickable with coordinates,
`click_link` finds a target by its visible label, and `click_page` clicks raw
coordinates for targets that have no label.

## Searching

The agent has no URL bar and no `navigate_tab` tool. It cannot type an address
or build a query string, so a search is performed the way a person performs
one: `list_fields` finds the search box, and `type_into` types the query into
it character by character and presses Enter.

`list_fields` tags each field with a `data-vc-field` index and reports its
label, placeholder, `aria-label`, name and enclosing form's submit control, so
the model picks the right box from the DOM rather than guessing.

Typing writes through the input prototype's `value` setter and emits
`keydown`/`keypress`/`input`/`keyup` per character. Assigning `el.value`
directly is invisible to React, Vue and Svelte, which track their own state
and read the value from their event handlers.

A synthetic `KeyboardEvent` is untrusted, so dispatching Enter does **not**
trigger a form's default submit action. `type_into` therefore checks whether
the URL moved and, if not, clicks the form's submit control — the fallback is
required for correctness, not merely defensive.

## Dev scripts

| Script | Purpose |
| --- | --- |
| `scripts/smoke.cjs` | Boots the app, asserts preload + IPC + DOM rendered. |
| `scripts/smoke-chat.cjs` | Drives a chat turn, asserts a terminal state reaches the renderer. |
| `scripts/smoke-click.cjs` | Asserts label matching, click dispatch, and scroll re-location. |
| `scripts/smoke-cursor.cjs` | Asserts the pointer is painted, click-through, and survives navigation. |
| `scripts/smoke-cursor-visible.cjs` | Boots the app and asserts the pointer appears with no click. |
| `scripts/smoke-type.cjs` | Asserts field discovery, per-character typing, and Enter fallback. |
| `scripts/smoke-search.cjs` | Runs a full search against a local server, home page to results. |
| `scripts/capture.cjs` | Writes `ui-capture.png` of the current window. |

## Not implemented

- The sandbox runner (see above).
- Any backend: account, sync, billing, connectors.
- Companion avatars, meetings, WhatsApp, integrations.
