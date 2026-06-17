# Decks

A **deck** is a named, installable collection of [flowdeck](https://github.com/ruco-dev/flowdeck) blueprints and energy cards for a specific domain. Each deck ships with a `<deck>-init` blueprint that scaffolds its working directory.

Install any deck into a project with a single command:

```bash
flowdeck install <deck-name> --local
```

## Available Decks

| Deck | Description | Blueprints |
|---|---|---|
| [`crunchdeck`](crunchdeck/) | Product management — PROFILE, BACKLOG, ROADMAP, and ADR cards under `.crunchdeck/` | `crunchdeck-init`, `crunchdeck-adr` |

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
