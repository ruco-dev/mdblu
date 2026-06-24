# calendardeck

The `.flowdeck/.calendardeck/` directory holds Google Calendar events as flowdeck cards. Sync is one-way: GCal → local. To push a task to Google Calendar, use the `send-to-gcal` action in any card.

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
  SYNC.md              ← sync config: calendar IDs, default range, run log
  README.md
  20260601/            ← day card
    EVENTS.md          ← synced event data (do not edit)
    TODO.md
  202606W1/            ← week card
    SUMMARY.md         ← synced weekly summary (do not edit)
    TODO.md
  202606/              ← month card
    SUMMARY.md
    TODO.md
  2026/                ← year card
    SUMMARY.md
    TODO.md
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
2. Call `mcp__claude_ai_Windsor_ai__list_actions` with the `google_calendar` connector to confirm the create-event action identifier.
3. Call `mcp__claude_ai_Windsor_ai__execute_action` with the parsed fields.
4. Replace the task line with `- [x] sent-to-gcal — event ID: {{EVENT_ID}}`.
5. If Windsor.ai Google Calendar is unavailable, surface the gap under `## HUMAN` with instructions to connect the connector.

### `sync-day`

Re-fetches events for this specific day from Google Calendar and rewrites `EVENTS.md`. Does not touch `TODO.md`. Uses the same Windsor.ai fetch path as `calendardeck-sync` but scoped to a single date.

---

## Blueprints

- `calendardeck-init` — scaffold `.flowdeck/.calendardeck/` in this project
- `calendardeck-sync` — pull events from Google Calendar and create/update all cards in range
