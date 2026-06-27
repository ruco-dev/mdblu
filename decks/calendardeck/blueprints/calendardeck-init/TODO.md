# calendardeck-init
<!-- lifecycle: idempotent -->

## BOT

- [ ] This card is idempotent — do not stop early if `.flowdeck/.calendardeck/` already exists. Create each path only if missing; skip silently otherwise:
  - `.flowdeck/.calendardeck/`
  - `.flowdeck/.calendardeck/sync/`

- [ ] Add `.*` to `.flowdeck/.flowdeckignore` if not already present.

- [ ] Check if `.flowdeck/.calendardeck/sync/SYNC.md` exists. If not, scaffold it from `.flowdeck/_energy-cards/SYNC.md.template` with placeholder values:
  - Replace `{{CALENDAR_ID}}` with `primary` (syncs the user's main calendar when authenticated via `flowdeck auth google`; replace with a specific Calendar ID, a public Google Calendar ID, or a direct `.ics` URL to target another)
  - Replace `{{PUBLIC_SOURCE}}` with `en.usa#holiday@group.v.calendar.google.com` (US holidays — overridable or leave blank to disable)
  - Replace `{{SYNC_RANGE}}` with `current-month`
  Then surface the path under `## HUMAN` so the user can confirm the Calendar ID, preferred sync range, and optional public source.

- [ ] Check if `.flowdeck/.calendardeck/sync/TODO.md` exists. If not, scaffold it from `.flowdeck/_energy-cards/SYNC-TODO.md.template` verbatim.

- [ ] Scaffold `.flowdeck/.calendardeck/README.md` if it does not already exist:
  ```
  # calendardeck

  Google Calendar events as flowdeck cards. Sync is one-way: GCal → local.
  To push a task to Google Calendar, use the `send-to-gcal` action in any card.

  ## Beta access

  calendardeck is in private beta. To request access, email validator-mc@ruco.pt — you will be added as a tester and can then authorize via `flowdeck auth google`.

  ## Slugs
  - Day:   YYYYMMDD   (e.g. 20260601)
  - Week:  YYYYMMWn   (e.g. 202606W1, W1 = days 1–7)
  - Month: YYYYMM     (e.g. 202606)
  - Year:  YYYY       (e.g. 2026)

  ## Usage
  - Sync: play `.calendardeck/sync`
  - Play a day: `flowdeck play .calendardeck/20260601`
  - Add event from task: move `send-to-gcal` to `## BOT` in any card, then play it
  ```

- [ ] Surface under `## HUMAN`:
  - Path to `sync/SYNC.md`. Calendar ID defaults to `primary` (main calendar) when authenticated — change it only to target a different calendar, a public GCal ID, or a direct `.ics` URL. Set `Sync Range` and optionally `Public Source` (a public GCal ID or ICS URL — defaults to US holidays; leave blank to disable).
  - Reminder to authorize Google Calendar before playing the `sync` card: run `flowdeck auth google` in the terminal. A browser will open — click Allow. One-time per machine. **Note:** calendardeck is in private beta — if Google blocks the sign-in, email validator-mc@ruco.pt to be added as a tester.

- [ ] Merge calendardeck section into `.flowdeck/AGENT.md`: if the file does not already contain a `## calendardeck` heading, append the following block verbatim:
  ```
  ## calendardeck

  The `.flowdeck/.calendardeck/` directory holds Google Calendar events as flowdeck cards. Sync is one-way: GCal → local. To push a task to Calendar, use `send-to-gcal` in any card's `## ACTIONS`.

  **Card hierarchy:** Year → Month → Week → Day

  **Card slugs:**
  - Year: `YYYY` (e.g. `2026`) — path: `.calendardeck/2026/`
  - Month: `YYYYMM` (e.g. `202606`) — path: `.calendardeck/2026/202606/`
  - Week: `YYYYMMWn` (e.g. `202606W1`, W1 = days 1–7) — path: `.calendardeck/2026/202606/202606W1/`
  - Day: `YYYYMMDD` (e.g. `20260601`) — path: `.calendardeck/2026/202606/202606W1/20260601/`

  **Card anatomy:** `EVENTS.md` (day) or `SUMMARY.md` (week/month/year) — synced, do not edit. `TODO.md` — your tasks and activated actions.

  **Public calendar source:** `sync/SYNC.md` accepts an optional `Public Source` field — a public GCal ID or ICS URL. Public events are tagged "(public)" and are read-only; day cards ship a pre-filled `send-to-gcal` line per public event to copy it to your personal calendar.

  **`send-to-gcal` — adding an event**

  Format: `- [ ] send-to-gcal — [Title | YYYY-MM-DD | HH:MM–HH:MM | optional description]`

  Move to `## BOT` and play the card. Execution steps:
  1. Parse title, date, start/end times, description.
  2. Compute day card path — week slug `YYYYMMWn`: W1 = days 1–7, W2 = 8–14, W3 = 15–21, W4 = 22–28, W5 = 29–31. Full path: `.calendardeck/YYYY/YYYYMM/YYYYMMWn/YYYYMMDD/EVENTS.md`. Scaffold if missing.
  3. Append row to `EVENTS.md`: `| HH:MM–HH:MM | Title | — | — |`
  4. If a `flowdeck auth` token is present, `POST` the event to the Google Calendar REST API (`https://www.googleapis.com/calendar/v3/calendars/primary/events`, `Authorization: Bearer ACCESS_TOKEN`); capture the event ID.
  5. Replace task line: `- [x] sent-to-gcal — YYYYMMDD HH:MM–HH:MM | Title` (append `| gcal: EVENT_ID` if step 4 succeeded).
  6. If no token, skip step 4 silently — `EVENTS.md` is the primary record.

  **Blueprints:**
  - `calendardeck-init` — scaffold `.flowdeck/.calendardeck/` and the `sync` card
  ```

- [ ] Commit: `git add .flowdeck/.calendardeck && git commit -m "deck: init calendardeck"`.

## HUMAN
