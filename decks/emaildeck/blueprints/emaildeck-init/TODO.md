# emaildeck-init
<!-- lifecycle: idempotent -->

## BOT

- [ ] This card is idempotent — do not stop early if `.flowdeck/.emaildeck/` already exists. For each path below, create it only if missing; skip silently if it already exists:
  - `.flowdeck/.emaildeck/`
  - `.flowdeck/.emaildeck/filters/`
  - `.flowdeck/.emaildeck/mail-inbox/`
  - `.flowdeck/.emaildeck/mail-archive/`
  - `.flowdeck/.emaildeck/drafts/`

- [ ] Add `.*` to `.flowdeck/.flowdeckignore` if not already present, so `.emaildeck/` is excluded from `flowdeck turn`.

- [ ] Scaffold `.flowdeck/.emaildeck/README.md` if it does not already exist:
  ```
  # emaildeck

  Gmail filter rules as flowdeck cards.

  ## Recipes

  ### Get emails from a specific sender
  1. `flowdeck blueprint use emaildeck-add-filter start`
  2. Set query to `from:name@example.com` or `from:@domain.com` for all mail from a domain.
  3. Play the filter card — message cards land in `mail-inbox/`.

  ### Get emails relevant to a project
  Option A (automatic): if `.flowdeck/.crunchdeck/profile/PROFILE.md` exists, every filter already scores threads against your product profile and discards irrelevant ones. No extra setup.
  Option B (manual): create a filter with a keyword or sender query, then set `BOT: send-to-crunchdeck` as a Default Task — matched cards are routed to the crunchdeck inbox for triage.

  ### Get summaries of messages
  - Per card: open any message card in `mail-inbox/` and move `summarize` into `## BOT`.
  - Per filter (bulk): add `BOT: summarize` to the filter's `## Default Tasks` — every card created by that filter will auto-summarize when the filter runs.
  - Combined with relevance: set both `BOT: send-to-crunchdeck` and `BOT: summarize` as default tasks.

  ### Draft a new email
  1. `flowdeck blueprint use emaildeck-compose start`
  2. Fill in To / Subject / Body when prompted — a draft card is created in `drafts/`.
  3. Edit `MESSAGE.md` if needed, then move `push-to-gmail` into `## BOT` to push it to Gmail.

  ### Reply to a message
  1. Open a message card in `mail-inbox/`.
  2. Move `draft-reply` into `## BOT`. Add instructions after the `—` to guide the reply (e.g. `draft-reply — decline politely`), or leave it bare to let the bot draft from context.
  3. The reply is saved to `drafts/` — open it, review or edit `MESSAGE.md`, then move `push-to-gmail` into `## BOT`.

  ## Structure

  ACTIONS.md       — reference for all available email actions
  filters/<slug>/
    FILTER.md      — query, label, default task template
    TODO.md        — when played: fetch → label → create message cards in mail-inbox/
  mail-inbox/
    <date>-<slug>/
      EMAIL.md     — thread metadata
      TODO.md      — ## ACTIONS menu; move items to ## BOT or ## HUMAN to activate
  mail-archive/    — processed message cards (moved here by the archive action)
  drafts/          — outbound drafts staged for review before push to Gmail
  ```

- [ ] Check if `.flowdeck/.creamdeck/CREAMDECK.md` exists:
  - If it does not exist, skip this step entirely.
  - If it exists, read the `## Tracked Domains` table and collect all values from the `Domain` column (strip backtick wrappers).
  - If no domains are found, skip.
  - Build `CREAMDECK_QUERY` by joining all domains as: `(from:@domain1 OR from:@domain2 ...)`.
  - Scaffold `.flowdeck/.emaildeck/filters/creamdeck-contacts/FILTER.md` if it does not already exist — substitute `{CREAMDECK_QUERY}` with the built query:
    ```markdown
    # Filter: Creamdeck Contacts

    ## Query

    ```
    {CREAMDECK_QUERY}
    ```

    ## Label

    emaildeck/creamdeck-contacts

    ## Default Tasks

    > Tasks below are added to every message card this filter creates.
    > Prefix with `BOT:` or `HUMAN:` — unprefixed defaults to HUMAN.

    BOT: send-to-creamdeck

    ## Date Range

    ## Run Log

    | Date | Threads found | Labeled | Cards created |
    |------|--------------|---------|---------------|
    ```
  - Scaffold `.flowdeck/.emaildeck/filters/creamdeck-contacts/TODO.md` if it does not already exist — same structure as `mock-filter-card/TODO.md` but with `# Creamdeck Contacts` as the title.

- [ ] Scaffold `.flowdeck/.emaildeck/ACTIONS.md` if it does not already exist:
  ```markdown
  # Email Actions

  Reference for all actions available on email cards.
  To activate an action, move it from `## ACTIONS` in the card's `TODO.md` into `## BOT` (bot executes) or `## HUMAN` (you handle it).

  ---

  ## summarize

  Summarize the thread and append the summary to `EMAIL.md`.

  **Trigger:** `- [ ] summarize`

  ---

  ## draft-reply

  Compose a reply draft based on this thread and save it to `drafts/<slug>/MESSAGE.md`.
  Instructions after the `—` are optional — omit them to let the bot draft from context, or add them to specify tone, content, or constraints (e.g. `decline politely`, `ask for a call next week`).
  After the draft is saved, open `drafts/<slug>/TODO.md` and move `push-to-gmail` into `## BOT` to push it to Gmail.

  **Trigger:** `- [ ] draft-reply` — bot drafts from thread context
  **Trigger:** `- [ ] draft-reply — [instructions, e.g. "confirm the meeting" or "ask for the invoice"]`

  ---

  ## improve-language

  Rewrite an existing draft in `drafts/` with improved clarity, tone, or style.

  **Trigger:** `- [ ] improve-language — [target tone, e.g. "more concise" or "formal"]`

  ---

  ## create-card

  Create a flowdeck card for this email thread as a work item to follow up on.

  **Trigger:** `- [ ] create-card`

  ---

  ## extract-tasks

  Extract action items from the email body and append them as tasks under `## HUMAN`.

  **Trigger:** `- [ ] extract-tasks`

  ---

  ## label

  Apply a Gmail label to the thread.

  **Trigger:** `- [ ] label — [label name]`

  ---

  ## forward

  Forward the thread to another address with optional context.

  **Trigger:** `- [ ] forward — [recipient and any context]`

  ---

  ## translate

  Translate the email body into another language and append to `EMAIL.md`.

  **Trigger:** `- [ ] translate — [target language]`

  ---

  ## snooze

  Add a follow-up reminder as a `## HUMAN` task with a target date.

  **Trigger:** `- [ ] snooze — [date or condition, e.g. "in 3 days" or "after reply"]`

  ---

  ## archive

  Mark the thread as read and archive it in Gmail, then move this message card's folder from `mail-inbox/<...>/` to the `mail-archive/<...>/` pile (create `mail-archive/` if missing). Provenance is preserved — `EMAIL.md` still records the thread ID and the label applied, so the matching filter is recoverable without folder nesting.

  **Trigger:** `- [ ] archive`

  ---

  ## mark-to-delete

  Apply the `emaildeck/DELETE` label to the thread in Gmail, then delete this message card's local folder. Use for mail confirmed as junk.

  **Trigger:** `- [ ] mark-to-delete`

  When activated:
  1. Read the thread ID from this card's `EMAIL.md`.
  2. Ensure the `emaildeck/DELETE` label exists — list labels and create if missing: `curl -s -X POST -H "Authorization: Bearer ACCESS_TOKEN" -H "Content-Type: application/json" -d '{"name":"emaildeck/DELETE"}' "https://www.googleapis.com/gmail/v1/users/me/labels"`.
  3. Apply the label: `curl -s -X POST -H "Authorization: Bearer ACCESS_TOKEN" -H "Content-Type: application/json" -d '{"addLabelIds":["LABEL_ID"]}' "https://www.googleapis.com/gmail/v1/users/me/threads/THREAD_ID/modify"`.
  4. **Only after the label call succeeds**, delete this message card's local folder (the `<YYYY-MM-DD>-<thread-slug>/` directory under `mail-inbox/`). If the label call fails, do NOT delete the folder — note the failure under `## HUMAN` so the card survives for retry.

  Can also be set as a filter default via `BOT: mark-to-delete` in a filter's `## Default Tasks`, for filters whose mail is reliably junk.

  ---

  ## send-to-crunchdeck

  Forward this email card to the crunchdeck product inbox for triage. Creates a card at `.flowdeck/.crunchdeck/crunchdeck-inbox/<YYYY-MM-DD>-<thread-slug>/`. Only runs if `.flowdeck/.crunchdeck/` exists — stops silently otherwise.

  **Trigger:** `- [ ] send-to-crunchdeck`

  When activated:
  1. Check `.flowdeck/.crunchdeck/` exists — if not, note under `## HUMAN` and stop.
  2. Read `EMAIL.md` for subject, sender, date, snippet, and `## Relevance` note (if present).
  3. Create `.flowdeck/.crunchdeck/crunchdeck-inbox/<YYYY-MM-DD>-<thread-slug>/EMAIL.md` — copy all metadata and relevance note.
  4. Create `.flowdeck/.crunchdeck/crunchdeck-inbox/<YYYY-MM-DD>-<thread-slug>/TODO.md`:
     ```
     # [Subject]

     ## BOT

     ## HUMAN

     ## ACTIONS

     <!-- Move an item to ## BOT (bot executes) or ## HUMAN (you handle it) to activate. -->

     - [ ] to-backlog — append as a candidate item in `../../backlog/BACKLOG.md`
     - [ ] to-roadmap — promote directly to `../../roadmap/ROADMAP.md` under the relevant horizon
     - [ ] to-decision — open a new ADR: `flowdeck blueprint use crunchdeck-adr <slug>`
     - [ ] discard

     #### COMMENTS
     ```

  ---

  ## push-to-gmail

  Read this draft card's `MESSAGE.md` (To / Cc / Bcc / Subject metadata table + `## Body`). Authenticate via `~/.config/flowdeck/tokens/google.json` (refresh if expired). Encode the message as RFC 2822 base64url and POST to `https://www.googleapis.com/gmail/v1/users/me/drafts`. Write the returned draft ID into the `Gmail draft ID` row of `MESSAGE.md`. The local `.md` remains the source of truth — this only pushes a copy to Gmail.

  **Trigger:** `- [ ] push-to-gmail`

  ---

  <!-- Add your own actions below -->
  ```

- [ ] Scaffold `.flowdeck/.emaildeck/drafts/TODO.md` if it does not already exist:
  ```markdown
  # Drafts

  ## BOT

  - [ ] List all draft cards in `drafts/` (subdirectories with a `TODO.md`).
  - [ ] **Authenticate** — read `~/.config/flowdeck/tokens/google.json`; refresh if expired (same pattern as filter cards). On 401: stop and note to run `flowdeck auth google --force`.
  - [ ] For each reply draft (has `EMAIL.md` + a completed `draft-reply` task): read the drafted reply, encode as RFC 2822 base64url, POST to `https://www.googleapis.com/gmail/v1/users/me/drafts`.
  - [ ] For each compose draft (has `MESSAGE.md` with an empty `Gmail draft ID` row): read the To/Cc/Bcc/Subject table and `## Body`, encode as RFC 2822 base64url, POST to `https://www.googleapis.com/gmail/v1/users/me/drafts`, and write the returned draft ID back into the `Gmail draft ID` row of `MESSAGE.md`. Skip compose drafts that already have a draft ID.
  - [ ] Note each pushed draft under `## HUMAN` with its Gmail draft ID.

  ## HUMAN

  Review drafts in Gmail and send when ready.

  #### COMMENTS
  ```

- [ ] Scaffold `.flowdeck/.emaildeck/drafts/mock-email-card/EMAIL.md` if it does not already exist:
  ```markdown
  # Email: [Subject here]

  | Field | Value |
  |-------|-------|
  | From | sender@example.com |
  | Date | YYYY-MM-DD |
  | Thread ID | <!-- Gmail thread ID --> |
  | Label applied | <!-- emaildeck/label --> |
  | Filter | <!-- filter slug --> |

  ## Snippet

  <!-- First lines of the thread -->

  ## Thread URL

  https://mail.google.com/mail/u/0/#inbox/THREAD_ID
  ```

- [ ] Scaffold `.flowdeck/.emaildeck/drafts/mock-email-card/TODO.md` if it does not already exist:
  ```markdown
  # [Subject here]

  ## BOT

  ## HUMAN

  ## ACTIONS

  <!-- Move any item to ## BOT (bot executes) or ## HUMAN (you handle it) to activate -->

  - [ ] summarize
  - [ ] draft-reply — [describe what the reply should say]
  - [ ] improve-language — [target tone, e.g. "more concise" or "formal"]
  - [ ] create-card
  - [ ] extract-tasks
  - [ ] label — [label name]
  - [ ] forward — [recipient and context]
  - [ ] translate — [target language]
  - [ ] snooze — [date or condition]
  - [ ] archive
  - [ ] mark-to-delete

  #### COMMENTS
  ```

- [ ] Scaffold `.flowdeck/.emaildeck/drafts/mock-compose-card/MESSAGE.md` if it does not already exist:
  ```markdown
  # [Subject here]

  | Field | Value |
  |-------|-------|
  | To | recipient@example.com |
  | Cc |  |
  | Bcc |  |
  | Subject | [Subject here] |
  | Gmail draft ID | <!-- populated by push-to-gmail; empty until pushed --> |

  ## Body

  <!-- Write your message here -->
  ```

- [ ] Scaffold `.flowdeck/.emaildeck/drafts/mock-compose-card/TODO.md` if it does not already exist:
  ```markdown
  # [Subject here]

  ## BOT

  ## HUMAN

  Author / edit the message in `MESSAGE.md`. When ready, move `push-to-gmail` into `## BOT` to create the Gmail draft.

  ## ACTIONS

  <!-- Move an item to ## BOT (bot executes) or ## HUMAN (you handle it) to activate. -->

  - [ ] improve-language — [target tone, e.g. "more concise" or "formal"]
  - [ ] push-to-gmail

  #### COMMENTS
  ```

- [ ] Scaffold `.flowdeck/.emaildeck/mail-inbox/mock-email-card/EMAIL.md` if it does not already exist — same structure as the drafts mock:
  ```markdown
  # Email: [Subject here]

  | Field | Value |
  |-------|-------|
  | From | sender@example.com |
  | Date | YYYY-MM-DD |
  | Thread ID | <!-- Gmail thread ID --> |
  | Label applied | <!-- emaildeck/label --> |
  | Filter | <!-- filter slug --> |

  ## Snippet

  <!-- First lines of the thread -->

  ## Thread URL

  https://mail.google.com/mail/u/0/#inbox/THREAD_ID
  ```

- [ ] Scaffold `.flowdeck/.emaildeck/mail-inbox/mock-email-card/TODO.md` if it does not already exist — same structure as the drafts mock:
  ```markdown
  # [Subject here]

  ## BOT

  ## HUMAN

  ## ACTIONS

  <!-- Move any item to ## BOT (bot executes) or ## HUMAN (you handle it) to activate -->

  - [ ] summarize
  - [ ] draft-reply — [describe what the reply should say]
  - [ ] improve-language — [target tone, e.g. "more concise" or "formal"]
  - [ ] create-card
  - [ ] extract-tasks
  - [ ] label — [label name]
  - [ ] forward — [recipient and context]
  - [ ] translate — [target language]
  - [ ] snooze — [date or condition]
  - [ ] archive
  - [ ] mark-to-delete

  #### COMMENTS
  ```

- [ ] Scaffold `.flowdeck/.emaildeck/mail-inbox/TODO.md` if it does not already exist:
  ```markdown
  # Inbox

  ## BOT

  - [ ] Scan `.flowdeck/.emaildeck/filters/` for filter card subdirectories. A valid filter card contains both `FILTER.md` and `TODO.md`. List valid filters; for incomplete filters (missing either file), note under `## HUMAN` as "incomplete: <slug> (missing <file>)".
  - [ ] If no valid filters exist, note under `## HUMAN` that the user should add one using `flowdeck blueprint use emaildeck-add-filter`, then stop.
  - [ ] For each valid filter, play its `TODO.md` to fetch Gmail threads and create message cards. On failure: if it's an auth error (token expired/revoked), halt immediately and report "re-authenticate"; for other errors, skip that filter, record error under `## HUMAN`, and continue with remaining filters.
  - [ ] Report under `## HUMAN`: filters run, threads found per filter, incomplete/failed filters with details, and filters that found zero threads in this run AND have never matched in prior runs (check `FILTER.md` run log).

  ## HUMAN
  ```

- [ ] Scaffold `.flowdeck/.emaildeck/filters/TODO.md` if it does not already exist:
  ```markdown
  # Filters

  ## BOT

  - [ ] List all filter cards under `filters/` (subdirectories containing a `FILTER.md`) and their last run date from each `FILTER.md`'s `## Run Log`.

  ## HUMAN

  - [ ] Add a new filter: `flowdeck blueprint use emaildeck-add-filter start`

  #### COMMENTS
  ```

- [ ] Scaffold `.flowdeck/.emaildeck/filters/mock-filter-card/FILTER.md` if it does not already exist:
  ```markdown
  # Filter: Example Filter

  ## Query

  ```
  from:example@example.com
  ```

  ## Label

  emaildeck/example

  ## Default Tasks

  > Tasks below are added to every message card this filter creates.
  > Prefix with `BOT:` or `HUMAN:` — unprefixed defaults to HUMAN.

  BOT: summarize
  - [ ] archive

  ## Date Range

  ## Run Log

  | Date | Threads found | Labeled | Cards created |
  |------|--------------|---------|---------------|
  ```

- [ ] Scaffold `.flowdeck/.emaildeck/filters/mock-filter-card/TODO.md` if it does not already exist:
  ```markdown
  # Example Filter

  ## BOT

  - [ ] Read `FILTER.md` for query, label, and default tasks.
  - [ ] **Authenticate** — read `~/.config/flowdeck/tokens/google.json`. If missing: stop and note under `## HUMAN` to run `flowdeck auth google`. If `expiry_date` < now: refresh via `~/.config/flowdeck/google-oauth.json` (POST to `https://oauth2.googleapis.com/token` with `grant_type=refresh_token`). On 401: stop and note to run `flowdeck auth google --force`.
  - [ ] Read `FILTER.md` for query, label, and default tasks.
  - [ ] Search Gmail: `curl -s -H "Authorization: Bearer ACCESS_TOKEN" "https://www.googleapis.com/gmail/v1/users/me/threads?q=ENCODED_QUERY&maxResults=50"`. Default to last 30 days unless `FILTER.md` specifies a `## Date Range`.
  - [ ] Ensure the label exists — list labels and create if missing: `curl -s -X POST -H "Authorization: Bearer ACCESS_TOKEN" -H "Content-Type: application/json" -d '{"name":"LABEL_NAME"}' "https://www.googleapis.com/gmail/v1/users/me/labels"`. Record the label ID.
  - [ ] For each matching thread:
    - Apply the label: `curl -s -X POST -H "Authorization: Bearer ACCESS_TOKEN" -H "Content-Type: application/json" -d '{"addLabelIds":["LABEL_ID"]}' "https://www.googleapis.com/gmail/v1/users/me/threads/THREAD_ID/modify"`
    - Create `../../mail-inbox/<YYYY-MM-DD>-<thread-slug>/`
    - Scaffold `EMAIL.md` from `_energy-cards/EMAIL.md.template` — substitute thread metadata
    - Scaffold `TODO.md` using the `## ACTIONS` template — pre-populate `## BOT` from `## Default Tasks` in `FILTER.md`
  - [ ] Append a run log entry to `FILTER.md` under `## Run Log`.
  - [ ] If no threads matched, note under `## HUMAN` and stop.

  ## HUMAN

  #### COMMENTS
  ```

- [ ] Scaffold `.flowdeck/.emaildeck/mail-archive/TODO.md` if it does not already exist:
  ```markdown
  # Archive

  Processed message cards moved here by the `archive` action. Destination pile only — no further action.

  ## BOT

  - [ ] List archived cards in `mail-archive/` (subdirectories with an `EMAIL.md`). This pile is a destination only — take no further action on them.

  ## HUMAN

  #### COMMENTS
  ```

- [ ] Scaffold `.flowdeck/.emaildeck/AGENT.md` if it does not already exist — copy verbatim from `_energy-cards/emaildeck-AGENT.md`.

- [ ] Commit: `git add .flowdeck/.emaildeck && git commit -m "deck: init emaildeck"`.

## HUMAN

#### COMMENTS
