# calendardeck-sync

## BOT

- [ ] **Synchronize calendar** — pull events from Google Calendar and create/update calendardeck cards for the full sync range defined in SYNC.md.

- [ ] Read `.flowdeck/.calendardeck/SYNC.md` — extract `Calendar ID`, `Sync Range`, and `Last Sync`. If the file does not exist, stop and note under `## HUMAN` to run `calendardeck-init` first.

- [ ] Determine the sync date range:
  - If `## HUMAN` below specifies an explicit range (e.g. `range: 2026-06-01–2026-06-30`), use that.
  - Otherwise use the `Sync Range` field from `SYNC.md` (default: current month).
  - Resolve to concrete start/end ISO dates.

- [ ] Check for Google Calendar access via Windsor.ai:
  - Call `mcp__claude_ai_Windsor_ai__get_connectors` and look for a connector with id `google_calendar` or similar.
  - If found: call `mcp__claude_ai_Windsor_ai__get_data` with:
    - `connector`: the matched connector id
    - `fields`: `["event_id", "event_title", "start_datetime", "end_datetime", "location", "description", "attendees", "calendar_id"]`
    - Filter to the resolved date range and the `Calendar ID` from `SYNC.md`.
  - If not found: stop and surface under `## HUMAN` that Windsor.ai Google Calendar connector is required, with a note to connect it at Windsor.ai.

- [ ] For each calendar day in the sync range — whether or not it has events:
  - Compute slug: `YYYYMMDD`.
  - Create `.flowdeck/.calendardeck/{{SLUG}}/` if missing.
  - Write `EVENTS.md` from `_energy-cards/DAY.md.template` — substitute `{{SLUG}}`, `{{WEEKDAY}}`, `{{DATE_LONG}}`, and `{{EVENTS_TABLE}}` (one row per event: time, title, location, attendees). If the day has zero events, substitute `{{EVENTS_TABLE}}` with `_No events._` so the card is still well-formed.
  - Scaffold `TODO.md` only if it does not exist — do not overwrite. Use this template:
    ```markdown
    # {{SLUG}}

    {{WEEKDAY}}, {{DATE_LONG}}

    ## BOT

    ## HUMAN

    ## ACTIONS

    <!-- Move an item to ## BOT to activate it, then play this card. -->

    - [ ] send-to-gcal — [Title | YYYY-MM-DD | HH:MM–HH:MM | optional description]
    - [ ] sync-day — re-fetch events for this day only
    ```

- [ ] For each week spanned by the sync range:
  - Compute slug: `{{YYYYMM}}W{{N}}` where N = `ceil(first_day_of_week_in_month / 7)`.
  - Create `.flowdeck/.calendardeck/{{SLUG}}/` if missing.
  - Write `SUMMARY.md` from `_energy-cards/WEEK.md.template`.
  - Scaffold `TODO.md` only if it does not exist:
    ```markdown
    # {{SLUG}}

    Week {{N}} of {{MONTH_LONG}} — {{DATE_RANGE}}

    ## BOT

    ## HUMAN

    ## ACTIONS

    - [ ] send-to-gcal — [Title | YYYY-MM-DD | HH:MM–HH:MM | optional description]
    ```

- [ ] For each month spanned by the sync range:
  - Compute slug: `{{YYYYMM}}`.
  - Write `SUMMARY.md` from `_energy-cards/MONTH.md.template`.
  - Scaffold `TODO.md` only if it does not exist:
    ```markdown
    # {{YYYYMM}}

    {{MONTH_LONG}} {{YYYY}}

    ## BOT

    ## HUMAN

    ## ACTIONS

    - [ ] send-to-gcal — [Title | YYYY-MM-DD | HH:MM–HH:MM | optional description]
    ```

- [ ] For each year spanned by the sync range:
  - Compute slug: `{{YYYY}}`.
  - Write `SUMMARY.md` from `_energy-cards/YEAR.md.template`.
  - Scaffold `TODO.md` only if it does not exist:
    ```markdown
    # {{YYYY}}

    ## BOT

    ## HUMAN

    ## ACTIONS

    - [ ] send-to-gcal — [Title | YYYY-MM-DD | HH:MM–HH:MM | optional description]
    ```

- [ ] Append a row to the `## Run Log` table in `SYNC.md`:
  | {{TODAY}} | {{RANGE}} | {{DAYS_SYNCED}} | {{EVENTS_FETCHED}} | {{CARDS_CREATED}} | {{CARDS_UPDATED}} |

- [ ] Surface a sync summary under `## HUMAN`: range synced, number of events fetched, cards created, cards updated.

## HUMAN

- [ ] Fill in `.flowdeck/.calendardeck/SYNC.md` with your Calendar ID and Sync Range before syncing.

<!-- Optional: specify an explicit sync range.
range: YYYY-MM-DD–YYYY-MM-DD
-->
