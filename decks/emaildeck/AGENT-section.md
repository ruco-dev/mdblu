## emaildeck

The `.flowdeck/.emaildeck/` directory holds Gmail filter rules as cards. Each filter card defines a Gmail search query, a label to apply to matched threads, and default tasks to populate every message card it creates.

**Filter cards (created by `emaildeck-add-filter`):**
- `.flowdeck/.emaildeck/filters/<slug>/` — `FILTER.md` + `TODO.md`
  - `FILTER.md` — Gmail query, label name, default task template, run log
  - `TODO.md` — when played: fetch matching threads → apply label → create message cards

**Message cards (created when a filter is played):**
- `.flowdeck/.emaildeck/filters/<slug>/messages/<YYYY-MM-DD>-<thread-slug>/` — `EMAIL.md` + `TODO.md`
  - `EMAIL.md` — thread metadata (subject, sender, date, snippet, thread ID, label applied)
  - `TODO.md` — populated from the filter's `## Default Tasks` block

**To play a filter card**, read the `TODO.md` in `.flowdeck/.emaildeck/filters/<slug>/` and execute its `## BOT` tasks.

**Blueprints:**
- `emaildeck-init` — scaffold `.flowdeck/.emaildeck/` in this project
- `emaildeck-add-filter` — create a new filter card
