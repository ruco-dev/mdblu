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
| [`crunchdeck`](crunchdeck/) | Product management — PROFILE, BACKLOG, ROADMAP, ADR, and inbox under `.flowdeck/.crunchdeck/` | `crunchdeck-init`, `crunchdeck-adr`, `crunchdeck-promote`, `crunchdeck-release` |
| [`emaildeck`](emaildeck/) | Gmail filter rules as flowdeck cards — fetch, label, and route findings to crunchdeck | `emaildeck-init`, `emaildeck-add-filter` |
| [`gitdeck`](gitdeck/) | GitHub repo vigilance — watches owned, competitor, provider, consumer, and benchmark repos; routes findings to crunchdeck | `gitdeck-init`, `gitdeck-add-repo` |
| [`webdeck`](webdeck/) | Web search signals — runs configured queries and routes findings to crunchdeck | `webdeck-init`, `webdeck-add-query` |
| [`notedeck`](notedeck/) | Freeform notes as flowdeck cards under `.flowdeck/.notedeck/` | `notedeck-init` |
| [`creamdeck`](creamdeck/) | Project-scoped CRM — contact cards and a unified inbox for emails and calls | `creamdeck-init`, `creamdeck-add-contact` |

## Contributing a Deck

Add a `decks/<name>/` folder to this repo:

```
decks/<name>/
  manifest.json          ← { "blueprints": [...], "energyCards": [...] }
  blueprints/
    <name>-init/
      TODO.md            ← scaffolds the deck's working directory
    <other-blueprint>/
      TODO.md
  energy-cards/
    *.md.template        ← reuse from templates/ or deck-specific
  AGENT-section.md       ← optional; appended to .flowdeck/AGENT.md on --local install
```

The folder name is the deck name. `flowdeck install <name>` resolves to `mdblu/decks/<name>/manifest.json`.
