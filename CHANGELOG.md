# Changelog

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
