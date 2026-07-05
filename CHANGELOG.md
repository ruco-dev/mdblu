# Changelog

## [3.0.0] — 2026-07-05

### Breaking Changes

- **`get` writes to root `CLAUDE.md`:** `mdblu get` now appends `@.mdblu/CLAUDE.md` to the project root `CLAUDE.md` by default. Use `--no-claude-link` to opt out.
- **`update` overwrite semantics changed:** `update` now skips locally edited or conflicted files instead of silently overwriting them. Use `--force` to overwrite.
- **`update` now refreshes `CLAUDE.md`:** the pairing invariant is restored — `update` includes `.mdblu/CLAUDE.md` in the update set.

### Features

- **Manifest-driven fetching:** `list`, `get`, and `update` now fetch `templates/index.json` from `raw.githubusercontent.com` — no GitHub API, no rate limits, ever.
- **`.mdblu/mdblu.lock`:** lockfile records `ref` + `sha256` per file. Pre-v3 scaffolds are adopted automatically on first run.
- **`mdblu status [--json]`:** per-file state table (`ok` / `edited` / `outdated` / `conflict`).
- **`mdblu diff <name>`:** unified diff of local vs upstream at the locked ref.
- **`mdblu propose <file> [--when <text>]`:** validates conventions and opens a PR via the user's `gh` auth — no server, no bot credentials.
- **`--ref <tag|sha>`:** pin any `get` or `update` to a specific release.
- **`--offline` flag:** bypass network entirely, use templates bundled in the npm tarball.
- **Parallel downloads:** `get` fetches all templates concurrently via `Promise.all`.
- **sha256 integrity:** each fetched template is verified against the manifest before writing.
- **Redirect depth cap:** redirect following is capped at 5 hops.
- **Offline fallback:** network failure falls back to bundled templates with a warning.
- **`scripts/build-manifest.js`:** generates `templates/index.json`; CI fails if stale.
- **GitHub Action:** `.github/workflows/check-manifest.yml` enforces manifest freshness on every PR touching templates.
- **`npm test` is now offline:** 40 unit tests with injected fetcher, zero network.

### Fixes

- Template footers: all 27 templates migrated from `ruco-ai/mdblu` to `ruco-dev/mdblu`.
- `mdblu list` no longer prints stale `ruco-ai` org reference.
- Interactive prompt copy corrected: "Enter comma-separated numbers" (was "space to toggle").
- CLAUDE.md: phantom `scripts/gh-project-push.js` reference removed; `scripts/` section now documents `build-manifest.js`.
- CLAUDE.md: `<!-- mdblu:propose:insert -->` anchor added for `mdblu propose` to target.
- README: dead MCP endpoint removed; CLI-first story with all v3 commands.

## [2.1.1] — 2026-06-29

### Fixes
- GitHub repository migrated from `ruco-ai/mdblu` to `ruco-dev/mdblu` — stale links in ADR footer updated

## [2.1.0] — 2026-06-29

### Features

- **`creamdeck` — ticket system:** New `TICKET.md.template`, `PIPELINE.md.template`, and `creamdeck-open-ticket` blueprint. Tickets have ID, status, priority, stage, linked contact, and a full update log. `creamdeck-init` scaffolds a `tickets/` directory with a PIPELINE overview card.
- **`creamdeck` — prefix-based ticket IDs:** `CREAMDECK.md` gains a `## Ticket ID` section with format `{PREFIX}{DDMMYYYY}{SEQ}` (e.g. `MDB29062026001`). Prefix is set at init time via `{{TICKET_PREFIX}}` substitution.
- **`creamdeck` — email inbox scan on ticket card:** The default `tickets/TODO.md` bot task now scans the emaildeck inbox, infers client tasks, and opens a ticket per task via `open-ticket`.
- **`farmdeck` — folders as standing cards:** Every farmdeck folder (inbox, prospects, pipeline, won, dropped) is now a proper standing card backed by a blueprint and a data-doc energy card template. `farmdeck-init` scaffolds all standing cards from blueprints instead of inlining content. `PIPELINE.md` relocated to `pipeline/PIPELINE.md`.
- **`mdblu` — STATS.md template:** New `STATS.md.template` for capturing weekly npm/GitHub metrics snapshots (downloads, stars, issues, forks, bundle size). Diff-friendly over time. Registered in `CLAUDE.md` and `TAGS.md`.
- **`mdblu` — lifecycle markers convention:** `TEMPLATE.md.template` gains a `### Lifecycle Marker` subsection documenting the `<!-- lifecycle: recurring | idempotent | one-shot -->` convention for all blueprint and energy-card `TODO.md` files.

### Fixes

- **CLI — wrong GitHub org in fetches:** `REPO_OWNER` in `bin/mdblu.js` corrected from `ruco-ai` to `ruco-dev`. All template fetches now point at the right org. A GitHub nudge (`Star or contribute →`) added to `mdblu list` and scaffold output.
- **`calendardeck` — transport corrected:** Restored browser-OAuth REST v3 as primary sync path (token refresh via `oauth2.googleapis.com/token`, Bearer fetch from `calendar/v3`). ICS retained as secondary public-source and no-token fallback. `send-to-gcal` write-back re-implemented as authenticated `POST .../calendar/v3/.../events` (no MCP). Dropped `@cocal/google-calendar-mcp` and API-key plumbing. Decision recorded in `decks/calendardeck/decisions/ADR-0001-calendar-transport.md`.

## [2.0.0] — 2026-06-26

### Breaking Changes

- **`calendardeck` — `CALENDAR.md` renamed to `SYNC.md`:** Existing `.flowdeck/.calendardeck/CALENDAR.md` files must be renamed to `SYNC.md`. Re-run `calendardeck-init` or rename manually.
- **`calendardeck` — `calendardeck-sync` blueprint retired:** Sync is now a self-contained card (`SYNC-TODO.md` energy card), not a separate blueprint. Remove any `_blueprints/calendardeck-sync/` directory from existing projects.
- **`calendardeck` — card hierarchy changed:** Cards are now nested `year/month/week/day/` instead of flat. Existing flat day cards are incompatible; re-sync to regenerate under the new hierarchy.

### Features

- **`calendardeck` — flowdeck auth token:** Sync card authenticates via `~/.config/flowdeck/tokens/google.json` (Bearer header + inline refresh). ICS retained as fallback for public calendars.
- **`calendardeck` — Calendar ID optional:** When authenticated, leaving Calendar ID blank or as placeholder defaults to `primary` — no manual ID lookup required.
- **`calendardeck` — public calendar source:** `SYNC.md` gains an optional `Public Source` field (GCal ID or ICS URL). Public events are fetched alongside personal events, tagged `(public)`, and each pre-fills a `send-to-gcal` action in the day card.
- **`crunchdeck` — `crunchdeck-launches` blueprint:** Full-pipeline release card — determines version from untagged `_meld/` cards, bumps `package.json`, updates `CHANGELOG.md`, scaffolds a `LAUNCH.md`, handles npm auth and publish, and annotates meld cards with `**Released: vX.Y.Z**`.

### Fixes

- **`calendardeck` — sync path bug:** Fixed double `.flowdeck/` prefix in energy-card existence check inside `SYNC-TODO.md.template`.
- **`calendardeck` — ICS-first fetch order:** Sync now tries ICS before MCP for public calendars; avoids spurious "stale data" MCP prompts when ICS succeeds.

## [1.3.0] — 2026-06-24

### Added

- **`emaildeck` deck:** Gmail integration deck with inbox scanning, filter cards, message cards (mail-inbox/), archive-move action, mark-to-delete action, and human-compose draft path (`MESSAGE.md` + `emaildeck-compose` blueprint + `push-to-gmail` action).
- **`creamdeck` deck:** project-scoped CRM deck with unified inbox (`creamdeck-inbox/`), contact cards, and `creamdeck-add-contact` blueprint. Default contact categories include Colleagues.
- **`gitdeck` and `webdeck` decks:** registered in `DECKS.md` with init and query/repo blueprints.
- **`farmdeck`, `notedeck`, `calendardeck` decks:** additional domain decks shipped in the registry.
- **Inbox column naming convention:** inbox columns renamed to `<deck>-inbox/` (e.g. `creamdeck-inbox/`, `crunchdeck-inbox/`) across all blueprints to prevent slug collisions between decks.

## [1.2.0] — 2026-06-17

### Added

- **`decks/` distribution layer:** mdblu now distributes [flowdeck](https://github.com/ruco-dev/flowdeck) decks alongside templates. A deck is a named, installable collection of blueprints and energy cards for a specific domain — installed with `flowdeck install <name> --local`.
- **`crunchdeck` deck:** first deck in the registry. Installs product management cards (PROFILE, BACKLOG, ROADMAP, ADR) under `.crunchdeck/` via two blueprints: `crunchdeck-init` and `crunchdeck-adr`.
- **`decks/DECKS.md`:** index of available decks and instructions for contributing a new one.

## [1.1.0] — 2026-05-23

### Changed

- Renamed npm package from `@ruco-ai/mdblu` to `mdblu` (unscoped). The scoped package is deprecated.
- Updated canonical home to `https://mdblu.ruco.dev`.
- Updated MCP server URL from `https://mdblu.fly.dev/mcp` to `https://mdblu.ruco.dev/mcp` in README and `README.md.template`.
- Added `homepage` field to `package.json`.

## [1.0.0] — initial release
