# Decks

A **deck** is a named, installable collection of [flowdeck](https://github.com/ruco-dev/flowdeck) blueprints and energy cards for a specific domain. Each deck ships with a `<deck>-init` blueprint that scaffolds its working directory.

**Source vs. runtime:** the canonical source for every deck is `mdblu/decks/<name>/` (this repo). When a deck is installed into a project, flowdeck copies its blueprints and energy cards into the project's `.flowdeck/` directory. That copy is a runtime artifact — gitignored and overwritten on reinstall. Never edit it directly; always edit the source here.

Install any deck into a project with a single command:

```bash
flowdeck install <deck-name> --local
```

## Available Decks

| Deck | Description | Blueprints |
|---|---|---|
| [`crunchdeck`](crunchdeck/) | Product management — PROFILE, BACKLOG, ROADMAP, ADR, and inbox under `.flowdeck/.crunchdeck/` | `crunchdeck-init`, `crunchdeck-adr`, `crunchdeck-promote` |
| [`emaildeck`](emaildeck/) | Gmail filter rules as flowdeck cards — fetch, label, and route findings to crunchdeck | `emaildeck-init`, `emaildeck-add-filter` |
| [`gitdeck`](gitdeck/) | GitHub repo vigilance — watches owned, competitor, provider, consumer, and benchmark repos; routes findings to crunchdeck | `gitdeck-init`, `gitdeck-add-repo` |
| [`webdeck`](webdeck/) | Web search signals — runs configured queries and routes findings to crunchdeck | `webdeck-init`, `webdeck-add-query` |
| [`notedeck`](notedeck/) | Freeform notes as flowdeck cards under `.flowdeck/.notedeck/` | `notedeck-init` |
| [`creamdeck`](creamdeck/) | Project-scoped CRM — contact cards and a unified inbox for emails and calls | `creamdeck-init`, `creamdeck-add-contact` |
| [`calendardeck`](calendardeck/) | Google Calendar events as flowdeck cards — one-way sync (GCal → local) with per-day, week, month, and year cards; `send-to-gcal` action for pushing tasks back | `calendardeck-init` |
| [`farmdeck`](farmdeck/) | Prospection pipeline — track contacts through Seed → Nurture → Active → Won / Dropped; programmatic intake via `flowdeck create-card` (CLI-001) | `farmdeck-init`, `farmdeck-add-prospect` |

## Contributing a Deck

Add a `decks/<name>/` folder to this repo:

```
decks/<name>/
  manifest.json          ← deck registry (see format below)
  AGENT.md               ← full deck reference — required
  AGENT-section.md       ← inline embed version; appended to .flowdeck/AGENT.md on --local install — required
  blueprints/
    <name>-init/
      TODO.md            ← idempotent scaffold of the working directory
    <name>-add-<item>/   ← if the deck has configurable items
      TODO.md
    <name>-sync/         ← if the deck pulls from an external source on demand
      TODO.md
  energy-cards/
    *.md.template        ← one per document type; plain markdown, no frontmatter
```

The folder name is the deck name. `flowdeck install <name>` resolves to `mdblu/decks/<name>/manifest.json`.

### `manifest.json` format

```json
{
  "name": "<name>",
  "version": "0.1.0",
  "agentMd": "AGENT.md",
  "blueprints": ["<name>-init", "<name>-add-<item>"],
  "energyCards": ["ITEM.md.template"],
  "description": "one-line deck description"
}
```

### Card anatomy

Every card folder contains two files:

- **Data companion** (`EVENTS.md`, `FILTER.md`, `CONTACT.md`, etc.) — structured data written by a blueprint or sync card. Overwritten on each sync. Do not edit manually.
- **`TODO.md`** — flowdeck tasks. Sections: `## BOT` (bot executes), `## HUMAN` (you handle), `## ACTIONS` (inactive; move to `## BOT` to activate).

The `## ACTIONS` pattern:
```markdown
## ACTIONS

<!-- Move an item to ## BOT to activate it, then play this card. -->

- [ ] send-to-crunchdeck — route this finding to the product backlog
- [ ] archive
```

### Blueprint rules

- **Init blueprints** must be idempotent — check before creating, skip silently if present. End with a commit: `git add .flowdeck/.<name> && git commit -m "deck: init <name>"`.
- **Add-item and sync blueprints** must never overwrite an existing `TODO.md` — only scaffold when missing to preserve the human's notes. Data companions (the non-TODO companion file) may be overwritten.
- **Referencing energy-card templates** from a blueprint: use the `_energy-cards/` prefix, e.g. `_energy-cards/ITEM.md.template`. This is how flowdeck resolves templates at runtime.
- **MCP-dependent blueprints**: always check connector availability first (e.g. `mcp__claude_ai_Windsor_ai__get_connectors`). Surface a `## HUMAN` gap with setup instructions if the required connector is absent — never fail silently.

Use `/new-deck` to scaffold a deck with full Claude assistance.
