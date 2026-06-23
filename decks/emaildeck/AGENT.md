# emaildeck

The `.flowdeck/.emaildeck/` directory holds Gmail filter rules as cards. Each filter card defines a Gmail search query, a label to apply to matched threads, and default tasks to populate every message card it creates.

**Filter cards (created by `emaildeck-add-filter`):**
- `.flowdeck/.emaildeck/filters/<slug>/` — `FILTER.md` + `TODO.md`
  - `FILTER.md` — Gmail query, label name, default task template, run log
  - `TODO.md` — when played: fetch matching threads → apply label → create message cards

**Message cards (created when a filter is played):**
- `.flowdeck/.emaildeck/mail-inbox/<YYYY-MM-DD>-<thread-slug>/` — `EMAIL.md` + `TODO.md`
  - `EMAIL.md` — thread metadata (subject, sender, date, snippet, thread ID, label applied)
  - `TODO.md` — populated from the filter's `## Default Tasks` block
- `mail-archive/` — destination pile for archived message cards (moved here when the `archive` action runs)

**Draft cards (composed by hand or staged from replies):**
- `.flowdeck/.emaildeck/drafts/<slug>/` — outbound staging for both reply drafts and new messages
  - `MESSAGE.md` — To/Cc/Bcc/Subject metadata table + `## Body`; local `.md` is the source of truth, Gmail draft ID row populated after `push-to-gmail` runs
  - `TODO.md` — `push-to-gmail` / `improve-language` ACTIONS; move to `## BOT` to activate
- Reply drafts (staged from message cards via `draft-reply`) also land here alongside compose drafts

**To play a filter card**, read the `TODO.md` in `.flowdeck/.emaildeck/filters/<slug>/` and execute its `## BOT` tasks.

**Blueprints:**
- `emaildeck-init` — scaffold `.flowdeck/.emaildeck/` in this project
- `emaildeck-add-filter` — create a new filter card
- `emaildeck-compose` — compose a message draft from scratch into `drafts/`
