# calendardeck

The `.flowdeck/.calendardeck/` directory holds calendar events as flowdeck cards. Sync is one-way and read-only: events are fetched via ICS feeds (public Google Calendar ID or direct `.ics` URL configured in `sync/SYNC.md`) and written to local cards. An optional `Public Source` field adds a second read-only ICS feed. Public events are tagged "(public)" in event rows.

---

## Slug Format

All slugs are unique — no full path needed to identify a card.

| Granularity | Slug format | Example | Week definition |
|---|---|---|---|
| Day | `YYYYMMDD` | `20260601` | — |
| Week | `YYYYMMWn` | `202606W1` | W1 = days 1–7, W2 = 8–14, W3 = 15–21, W4 = 22–28, W5 = 29–31 |
| Month | `YYYYMM` | `202606` | — |
| Year | `YYYY` | `2026` | — |

---

## Directory Layout

```
.flowdeck/.calendardeck/
  sync/                        ← sync card
    SYNC.md                    ← sync config: calendar ID, optional public source, default range, run log
    TODO.md                    ← play this card to synchronize
  README.md
  2026/                        ← year card
    SUMMARY.md
    TODO.md
    202606/                    ← month card (child of year)
      SUMMARY.md
      TODO.md
      202606W1/                ← week card (child of month, W1 = days 1–7)
        SUMMARY.md
        TODO.md
        20260601/              ← day card (child of week)
          EVENTS.md            ← synced event data (do not edit)
          TODO.md
        20260602/
          EVENTS.md
          TODO.md
      202606W2/
        ...
    202607/
      ...
```

---

## Card Anatomy

Every card has a `TODO.md` with `## BOT` / `## HUMAN` / `## ACTIONS` sections, plus a synced data companion (`EVENTS.md` for days, `SUMMARY.md` for week/month/year). The data companion is overwritten on every sync — do not add content to it. All notes and tasks belong in `TODO.md`.

---

## Actions

These actions appear in the `## ACTIONS` section of cards. Move an item to `## BOT` to activate it, then play the card.

---

## Blueprints

- `calendardeck-init` — scaffold `.flowdeck/.calendardeck/` and the `sync` card in this project

## Usage

- **Sync:** play `.calendardeck/sync`
- **Play a day:** `flowdeck play .calendardeck/20260601`
