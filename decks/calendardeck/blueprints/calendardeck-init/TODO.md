# calendardeck-init

## BOT

- [ ] This card is idempotent — do not stop early if `.flowdeck/.calendardeck/` already exists. Create each path only if missing; skip silently otherwise:
  - `.flowdeck/.calendardeck/`
  - `.flowdeck/.calendardeck/sync/`

- [ ] Add `.*` to `.flowdeck/.flowdeckignore` if not already present.

- [ ] Check if `.flowdeck/.calendardeck/sync/SYNC.md` exists. If not, scaffold it from `.flowdeck/_energy-cards/SYNC.md.template` with placeholder values, then surface the path under `## HUMAN` so the user can fill in their Calendar ID and preferred sync range.

- [ ] Check if `.flowdeck/.calendardeck/sync/TODO.md` exists. If not, scaffold it from `.flowdeck/_energy-cards/SYNC-TODO.md.template` verbatim.

- [ ] Scaffold `.flowdeck/.calendardeck/README.md` if it does not already exist:
  ```
  # calendardeck

  Google Calendar events as flowdeck cards. Sync is one-way: GCal → local.
  To push a task to Google Calendar, use the `send-to-gcal` action in any card.

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
  - Path to `sync/SYNC.md` that needs to be filled in (Calendar ID and sync range).
  - Reminder to connect Google Calendar before playing the `sync` card: open Claude Code → Settings → Integrations → Google Calendar and complete the OAuth flow. The sync card will use this connection automatically.

- [ ] Commit: `git add .flowdeck/.calendardeck && git commit -m "deck: init calendardeck"`.

## HUMAN
