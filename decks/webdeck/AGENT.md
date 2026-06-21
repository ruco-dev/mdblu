# webdeck

The `.flowdeck/.webdeck/` directory runs web searches on a configured set of queries and routes findings to crunchdeck. Queries are grouped by intent — category, competitor, user pain, trends — and each search pass generates finding cards.

**Standing cards (created by `webdeck-init`):**
- `.flowdeck/.webdeck/queries/` — `TODO.md` — orchestrates all configured query cards

**Created per-instance:**
- `.flowdeck/.webdeck/queries/<slug>/` — `QUERY.md` + `TODO.md` — search terms, intent, run log, findings

**Pipeline:** Web search queries → finding cards → `send-to-crunchdeck` → crunchdeck inbox

**To run all queries**, play `.flowdeck/.webdeck/queries/`.

**Blueprints:**
- `webdeck-init` — scaffold `.flowdeck/.webdeck/` in this project
- `webdeck-add-query` — configure a new search query
