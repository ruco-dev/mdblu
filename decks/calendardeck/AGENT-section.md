## calendardeck

The `.flowdeck/.calendardeck/` directory holds Google Calendar events as flowdeck cards. Sync is one-way: GCal → local. To push a task to Calendar, use `send-to-gcal` in any card's `## ACTIONS`.

**Card slugs (all unique, no path needed):**
- Day: `YYYYMMDD` (e.g. `20260601`)
- Week: `YYYYMMWn` (e.g. `202606W1`, W1 = days 1–7)
- Month: `YYYYMM` (e.g. `202606`)
- Year: `YYYY` (e.g. `2026`)

**Card anatomy:** `EVENTS.md` (day) or `SUMMARY.md` (week/month/year) — synced, do not edit. `TODO.md` — your tasks and activated actions.

**Blueprints:**
- `calendardeck-init` — scaffold `.flowdeck/.calendardeck/`
- `calendardeck-sync` — pull events from GCal and create/update cards
