# emaildeck-add-filter

## BOT

- [ ] Check if `.flowdeck/.emaildeck/` exists. If not, stop and note under `## HUMAN` to run `emaildeck-init` first.

- [ ] Read `## HUMAN` below for filter name, slug, query, label, and default tasks. Stop and surface any missing values under `## HUMAN`.

- [ ] Create `.flowdeck/.emaildeck/filters/{{FILTER_SLUG}}/`.

- [ ] Scaffold `FILTER.md` from `_energy-cards/FILTER.md.template` — substitute `{{FILTER_NAME}}`, `{{QUERY}}`, `{{LABEL}}`, and `{{DEFAULT_TASKS}}`.

- [ ] Create `TODO.md` in `.flowdeck/.emaildeck/filters/{{FILTER_SLUG}}/`:

  ```markdown
  # {{FILTER_NAME}}

  ## BOT

  - [ ] Check if `mcp__claude_ai_Gmail__search_threads` is available. If not, add a `## HUMAN` item to connect Gmail MCP and stop.

  - [ ] Read `FILTER.md` for query, label, and default tasks.

  - [ ] Check if `.flowdeck/.crunchdeck/profile/PROFILE.md` exists. If it does, read it and extract product name, one-liner, competitors, and north-star metric as a relevance context for scoring threads.

  - [ ] Search Gmail using the query. Default to the last 30 days unless `FILTER.md` specifies a `## Date Range`. If crunchdeck PROFILE.md was found, use the product context to discard threads with no meaningful connection to the product.

  - [ ] Check if the label from `FILTER.md` exists; create it if not via `mcp__claude_ai_Gmail__create_label`.

  - [ ] For each matching thread:
    - Apply the label using `mcp__claude_ai_Gmail__label_thread`
    - Create `../../mail-inbox/<YYYY-MM-DD>-<thread-slug>/`
    - Scaffold `EMAIL.md` from `_energy-cards/EMAIL.md.template` — substitute thread metadata; if crunchdeck PROFILE.md was read, append a `## Relevance` section with one sentence explaining why this thread matters to the product
    - Scaffold `TODO.md` from the `## Default Tasks` block in `FILTER.md`; if `.flowdeck/.crunchdeck/` exists, append `- [ ] send-to-crunchdeck` to the `## ACTIONS` section; always append `- [ ] archive` to the `## ACTIONS` section

  - [ ] Append a run log entry to `FILTER.md` under `## Run Log`: date, threads found, threads labeled, message cards created.

  - [ ] If no threads matched, note under `## HUMAN` and stop.

  ## HUMAN

  #### COMMENTS
  ```

- [ ] Commit: `git add .flowdeck/.emaildeck/filters/{{FILTER_SLUG}} && git commit -m "deck: add email filter — {{FILTER_NAME}}"`.

## HUMAN

- [ ] Filter name (human-readable):
  > _answer:_

- [ ] Filter slug (kebab-case, used as folder name):
  > _answer:_

- [ ] Gmail query:
  > _answer:_ (e.g. `from:newsletter@example.com`)

- [ ] Label to apply to matched threads:
  > _answer:_ (e.g. `emaildeck/newsletters`)

- [ ] Default tasks for each message card — list them below, prefix with `BOT:` or `HUMAN:`:
  > _answer:_

#### COMMENTS
