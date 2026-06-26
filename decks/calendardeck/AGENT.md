# calendardeck

The `.flowdeck/.calendardeck/` directory holds Google Calendar events as flowdeck cards. Sync is one-way: GCal → local — including an optional public calendar source (a public GCal ID or ICS URL configured in `sync/SYNC.md`). Public events are read-only and are tagged "(public)" in event rows; to copy one to your personal calendar, move its pre-filled `send-to-gcal` action to `## BOT` and play the card. To push any other task to Google Calendar, use the `send-to-gcal` action in any card.

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

### `send-to-gcal`

Creates a Google Calendar event from a task description. Format:

```
- [ ] send-to-gcal — [Title | date YYYY-MM-DD | HH:MM–HH:MM | optional description]
```

When `send-to-gcal` is in `## BOT`:
1. Parse title, date, start time, end time, and description from the task line.
2. Resolve the day card path from the date: compute `YYYYMMDD`, `YYYYMM`, and week slug `YYYYMMWn` (W1 = days 1–7, W2 = 8–14, W3 = 15–21, W4 = 22–28, W5 = 29–31). Locate `.flowdeck/.calendardeck/YYYY/YYYYMM/YYYYMMWn/YYYYMMDD/EVENTS.md` — scaffold the path and file if they don't exist.
3. Append the event as a row to `EVENTS.md`. If the file already has an events table, add a row; if not, create the table with header first. Row format: `| HH:MM–HH:MM | Title | — | — |`.
4. If the Google Calendar MCP server (`mcp__google_calendar__create_event`) is available, call it with the parsed fields (`summary`, `start` dateTime, `end` dateTime, `description`) and capture the returned event ID.
5. Replace the task line with `- [x] sent-to-gcal — YYYYMMDD HH:MM–HH:MM | Title` (append `| gcal: EVENT_ID` if step 4 succeeded).
6. If the Google Calendar MCP server is unavailable, skip step 4 silently — writing to `EVENTS.md` is the primary record. Do not surface to `## HUMAN`.

### `sync-day`

Re-fetches events for this specific day from Google Calendar and rewrites `EVENTS.md`. Does not touch `TODO.md`. Uses the same Google Calendar MCP fetch path as the `sync` card but scoped to a single date.

---

## Blueprints

- `calendardeck-init` — scaffold `.flowdeck/.calendardeck/` and the `sync` card in this project

## Usage

- **Sync:** play `.calendardeck/sync`
- **Play a day:** `flowdeck play .calendardeck/20260601`
- **Add event from task:** move `send-to-gcal` to `## BOT` in any card, then play it
