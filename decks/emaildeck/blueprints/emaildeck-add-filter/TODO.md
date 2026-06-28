# emaildeck-add-filter
<!-- lifecycle: one-shot -->

## BOT

- [ ] Check if `.flowdeck/.emaildeck/` exists. If not, stop and note under `## HUMAN` to run `emaildeck-init` first.

- [ ] Read `## HUMAN` below for filter name, slug, query, label, and default tasks. Stop and surface any missing values under `## HUMAN`.

- [ ] Create `.flowdeck/.emaildeck/filters/{{FILTER_SLUG}}/`.

- [ ] Scaffold `FILTER.md` from `_energy-cards/FILTER.md.template` — substitute `{{FILTER_NAME}}`, `{{QUERY}}`, `{{LABEL}}`, and `{{DEFAULT_TASKS}}`.

- [ ] Create `TODO.md` in `.flowdeck/.emaildeck/filters/{{FILTER_SLUG}}/`:

  ```markdown
  # {{FILTER_NAME}}

  ## BOT

  - [ ] **Authenticate** — read `~/.config/flowdeck/tokens/google.json`. If missing: stop and note under `## HUMAN` to run `flowdeck auth google`. If `expiry_date` < now: refresh via `~/.config/flowdeck/google-oauth.json` (POST to `https://oauth2.googleapis.com/token` with `grant_type=refresh_token`; merge `access_token` + `expiry_date` back into `google.json`). On 401 from any API call: stop and note to run `flowdeck auth google --force`.

  - [ ] Read `FILTER.md` for query, label, and default tasks.

  - [ ] Check if `.flowdeck/.crunchdeck/profile/PROFILE.md` exists. If it does, read it and extract product name, one-liner, competitors, and north-star metric as a relevance context for scoring threads.

  - [ ] Search Gmail using the query. Default to the last 30 days unless `FILTER.md` specifies a `## Date Range`. If crunchdeck PROFILE.md was found, use the product context to discard threads with no meaningful connection to the product.
    - `curl -s -H "Authorization: Bearer ACCESS_TOKEN" "https://www.googleapis.com/gmail/v1/users/me/threads?q=ENCODED_QUERY&maxResults=50"` — records `snippet` per thread from this response
    - For each thread ID, fetch full content: `curl -s -H "Authorization: Bearer ACCESS_TOKEN" "https://www.googleapis.com/gmail/v1/users/me/threads/THREAD_ID?format=full"` — extract Subject/From/Date from headers, decode the `text/plain` part (base64url) from `messages[0].payload` for the body

  - [ ] Ensure the label from `FILTER.md` exists — list labels: `curl -s -H "Authorization: Bearer ACCESS_TOKEN" "https://www.googleapis.com/gmail/v1/users/me/labels"`. If not found, create it: `curl -s -X POST -H "Authorization: Bearer ACCESS_TOKEN" -H "Content-Type: application/json" -d '{"name":"LABEL_NAME"}' "https://www.googleapis.com/gmail/v1/users/me/labels"`. Record the label ID.

  - [ ] For each matching thread:
    - Apply the label: `curl -s -X POST -H "Authorization: Bearer ACCESS_TOKEN" -H "Content-Type: application/json" -d '{"addLabelIds":["LABEL_ID"]}' "https://www.googleapis.com/gmail/v1/users/me/threads/THREAD_ID/modify"`
    - Create `../../mail-inbox/<YYYY-MM-DD>-<thread-slug>/`
    - Scaffold `EMAIL.md` from `_energy-cards/EMAIL.md.template` — substitute thread metadata including `{{SNIPPET}}` (from threads list) and `{{BODY}}` (decoded `text/plain` body from the full fetch); if crunchdeck PROFILE.md was read, append a `## Relevance` section with one sentence explaining why this thread matters to the product
    - Scaffold `TODO.md` from the `## Default Tasks` block in `FILTER.md`; if `.flowdeck/.crunchdeck/` exists, append `- [ ] send-to-crunchdeck` to the `## ACTIONS` section; always append `- [ ] archive` and `- [ ] mark-to-delete` (mark-to-delete immediately after archive) to the `## ACTIONS` section

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
  > _answer:_
  >
  > Common patterns:
  > - Specific sender: `from:name@example.com`
  > - All mail from a domain: `from:@company.com`
  > - Subject keyword: `subject:invoice`
  > - Relevant to a project (combine sender + keyword): `from:@client.com OR subject:ProjectName`
  > - Unread only: `is:unread from:@domain.com`

- [ ] Label to apply to matched threads:
  > _answer:_ (e.g. `emaildeck/newsletters`)

- [ ] Default tasks for each message card — list them below, prefix with `BOT:` or `HUMAN:`:
  > _answer:_
  >
  > Common defaults:
  > - Auto-summarize: `BOT: summarize`
  > - Route to crunchdeck for project triage: `BOT: send-to-crunchdeck`
  > - Auto-archive after processing: `- [ ] archive`
  > - Flag junk reliably: `BOT: mark-to-delete`
  > - Relevance + summary combo: `BOT: summarize` then `BOT: send-to-crunchdeck`

#### COMMENTS
