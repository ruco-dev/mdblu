# calendardeck-init
<!-- lifecycle: idempotent -->

## BOT

- [ ] This card is idempotent — do not stop early if `.flowdeck/.calendardeck/` already exists. Create each path only if missing; skip silently otherwise:
  - `.flowdeck/.calendardeck/`
  - `.flowdeck/.calendardeck/sync/`

- [ ] Add `.*` to `.flowdeck/.flowdeckignore` if not already present.

- [ ] Check if `.flowdeck/.calendardeck/sync/SYNC.md` exists. If not, scaffold it from `.flowdeck/_energy-cards/SYNC.md.template` with placeholder values:
  - Replace `{{CALENDAR_ID}}` with a blank value — the user must supply a public Google Calendar ID or a direct `.ics` URL; `primary` and OAuth-only calendars are not supported.
  - Replace `{{PUBLIC_SOURCE}}` with `en.usa#holiday@group.v.calendar.google.com` (US holidays — overridable or leave blank to disable)
  - Replace `{{SYNC_RANGE}}` with `current-month`
  Then surface the path under `## HUMAN` so the user can confirm the Calendar ID, preferred sync range, and optional public source.

- [ ] Check if `.flowdeck/.calendardeck/sync/TODO.md` exists. If not, scaffold it from `.flowdeck/_energy-cards/SYNC-TODO.md.template` verbatim.

- [ ] Scaffold `.flowdeck/.calendardeck/README.md` if it does not already exist:
  ```
  # calendardeck

  Calendar events as flowdeck cards. Sync is one-way and read-only: events are fetched from public ICS feeds (public Google Calendar ID or direct `.ics` URL) and written to local cards.

  ## Slugs
  - Day:   YYYYMMDD   (e.g. 20260601)
  - Week:  YYYYMMWn   (e.g. 202606W1, W1 = days 1–7)
  - Month: YYYYMM     (e.g. 202606)
  - Year:  YYYY       (e.g. 2026)

  ## Usage
  - Sync: play `.calendardeck/sync`
  - Play a day: `flowdeck play .calendardeck/20260601`
  ```

- [ ] Surface under `## HUMAN`:
  - Path to `sync/SYNC.md`. Set `Calendar ID` to a public Google Calendar ID or a direct `.ics` URL — the calendar must be ICS-accessible. `primary` and OAuth-only calendars are not supported. Set `Sync Range` and optionally `Public Source` (a public GCal ID or ICS URL — defaults to US holidays; leave blank to disable).

- [ ] Merge calendardeck section into `.flowdeck/AGENT.md`: if the file does not already contain a `## calendardeck` heading, append the following block verbatim:
  ```
  ## calendardeck

  The `.flowdeck/.calendardeck/` directory holds calendar events as flowdeck cards. Sync is one-way and read-only: events are fetched from public ICS feeds and written to local cards.

  **Card hierarchy:** Year → Month → Week → Day

  **Card slugs:**
  - Year: `YYYY` (e.g. `2026`) — path: `.calendardeck/2026/`
  - Month: `YYYYMM` (e.g. `202606`) — path: `.calendardeck/2026/202606/`
  - Week: `YYYYMMWn` (e.g. `202606W1`, W1 = days 1–7) — path: `.calendardeck/2026/202606/202606W1/`
  - Day: `YYYYMMDD` (e.g. `20260601`) — path: `.calendardeck/2026/202606/202606W1/20260601/`

  **Card anatomy:** `EVENTS.md` (day) or `SUMMARY.md` (week/month/year) — synced, do not edit. `TODO.md` — your tasks.

  **Public calendar source:** `sync/SYNC.md` accepts an optional `Public Source` field — a public GCal ID or ICS URL. Public events are tagged "(public)" and are read-only.

  **Blueprints:**
  - `calendardeck-init` — scaffold `.flowdeck/.calendardeck/` and the `sync` card
  ```

- [ ] Commit: `git add .flowdeck/.calendardeck && git commit -m "deck: init calendardeck"`.

## HUMAN
