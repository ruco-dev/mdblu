# calendardeck-init
<!-- lifecycle: idempotent -->

## BOT

- [ ] This card is idempotent — do not stop early if `.flowdeck/.calendardeck/` already exists. Create each path only if missing; skip silently otherwise:
  - `.flowdeck/.calendardeck/`
  - `.flowdeck/.calendardeck/sync/`

- [ ] Add `.*` to `.flowdeck/.flowdeckignore` if not already present.

- [ ] Check if `.flowdeck/.calendardeck/sync/SYNC.md` exists. If not, scaffold it from `.flowdeck/_energy-cards/SYNC.md.template` with placeholder values:
  - Replace `{{CALENDAR_ID}}` with `primary` (syncs the user's main calendar; replace with a specific Calendar ID to target another)
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
  - Path to `sync/SYNC.md`. Calendar ID defaults to `primary` (main calendar) — change it only if targeting a different calendar. Set `Sync Range` and optionally `Public Source` (a public GCal ID or ICS URL — defaults to US holidays; leave blank to disable).
  - Reminder to authorize Google Calendar before playing the `sync` card: run `flowdeck auth google` in the terminal. A browser will open — click Allow. One-time per machine. **Note:** calendardeck is in private beta — if Google blocks the sign-in, email validator-mc@ruco.pt to be added as a tester.

- [ ] Commit: `git add .flowdeck/.calendardeck && git commit -m "deck: init calendardeck"`.

## HUMAN
