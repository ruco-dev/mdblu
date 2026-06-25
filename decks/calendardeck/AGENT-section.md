## calendardeck

The `.flowdeck/.calendardeck/` directory holds Google Calendar events as flowdeck cards. Sync is one-way: GCal → local. To push a task to Calendar, use `send-to-gcal` in any card's `## ACTIONS`.

**Card hierarchy:** Year → Month → Week → Day

**Card slugs:**
- Year: `YYYY` (e.g. `2026`) — path: `.calendardeck/2026/`
- Month: `YYYYMM` (e.g. `202606`) — path: `.calendardeck/2026/202606/`
- Week: `YYYYMMWn` (e.g. `202606W1`, W1 = days 1–7) — path: `.calendardeck/2026/202606/202606W1/`
- Day: `YYYYMMDD` (e.g. `20260601`) — path: `.calendardeck/2026/202606/202606W1/20260601/`

**Card anatomy:** `EVENTS.md` (day) or `SUMMARY.md` (week/month/year) — synced, do not edit. `TODO.md` — your tasks and activated actions.

**Public calendar source:** `sync/SYNC.md` accepts an optional `Public Source` field — a public GCal ID or ICS URL. Public events are fetched alongside your own and tagged "(public)" in event rows. They are read-only; each day card ships a pre-filled `send-to-gcal` line per public event so you can move it to `## BOT` to copy it to your personal calendar.

**Blueprints:**
- `calendardeck-init` — scaffold `.flowdeck/.calendardeck/`
- `calendardeck-sync` — pull events from GCal and create/update cards
