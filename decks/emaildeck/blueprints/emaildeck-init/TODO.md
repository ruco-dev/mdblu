# emaildeck-init

## BOT

- [ ] This card is idempotent — do not stop early if `.flowdeck/.emaildeck/` already exists. For each path below, create it only if missing; skip silently if it already exists:
  - `.flowdeck/.emaildeck/`
  - `.flowdeck/.emaildeck/filters/`
  - `.flowdeck/.emaildeck/mail-inbox/`
  - `.flowdeck/.emaildeck/drafts/`

- [ ] Add `.*` to `.flowdeck/.flowdeckignore` if not already present, so `.emaildeck/` is excluded from `flowdeck turn`.

- [ ] Scaffold `.flowdeck/.emaildeck/README.md` if it does not already exist:
  ```
  # emaildeck

  Gmail filter rules as flowdeck cards. Each filter card defines a Gmail search query,
  a label to apply to matching threads, and default tasks added to every message card.

  ## Usage

  Add a filter: `flowdeck blueprint use emaildeck-add-filter start`
  Play a filter: `flowdeck play .emaildeck/filters/<slug>`

  ## Structure

  ACTIONS.md       — reference for all available email actions
  filters/<slug>/
    FILTER.md      — query, label, default task template
    TODO.md        — when played: fetch → label → create message cards
    messages/
      <date>-<slug>/
        EMAIL.md   — thread metadata
        TODO.md    — ## ACTIONS menu; move items to ## BOT or ## HUMAN to activate
  mail-inbox/      — fetched threads not yet routed to a filter
  drafts/          — reply drafts staged for human review
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

  Compose a reply draft using Gmail MCP and save it to `drafts/`.
  Include instructions on what the reply should say.

  **Trigger:** `- [ ] draft-reply — [your instructions here]`

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

  Mark the thread as read and archive it in Gmail.

  **Trigger:** `- [ ] archive`

  ---

  ## send-to-crunchdeck

  Forward this email card to the crunchdeck product inbox for triage. Creates a card at `.flowdeck/.crunchdeck/inbox/<YYYY-MM-DD>-<thread-slug>/`. Only runs if `.flowdeck/.crunchdeck/` exists — stops silently otherwise.

  **Trigger:** `- [ ] send-to-crunchdeck`

  When activated:
  1. Check `.flowdeck/.crunchdeck/` exists — if not, note under `## HUMAN` and stop.
  2. Read `EMAIL.md` for subject, sender, date, snippet, and `## Relevance` note (if present).
  3. Create `.flowdeck/.crunchdeck/inbox/<YYYY-MM-DD>-<thread-slug>/EMAIL.md` — copy all metadata and relevance note.
  4. Create `.flowdeck/.crunchdeck/inbox/<YYYY-MM-DD>-<thread-slug>/TODO.md`:
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

  <!-- Add your own actions below -->
  ```

- [ ] Scaffold `.flowdeck/.emaildeck/drafts/TODO.md` if it does not already exist:
  ```markdown
  # Drafts

  ## BOT

  - [ ] List all draft cards in `drafts/` (subdirectories with a `TODO.md`).
  - [ ] For each draft card that has a completed `draft-reply` task, read its `EMAIL.md` and the drafted reply, then create a Gmail draft via `mcp__claude_ai_Gmail__create_draft`.
  - [ ] Note each sent draft under `## HUMAN` with the Gmail draft ID.

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
  - [ ] Search Gmail using the query. Default to the last 30 days unless `FILTER.md` specifies a `## Date Range`.
  - [ ] Check if the label from `FILTER.md` exists; create it if not via `mcp__claude_ai_Gmail__create_label`.
  - [ ] For each matching thread:
    - Apply the label using `mcp__claude_ai_Gmail__label_thread`
    - Create `messages/<YYYY-MM-DD>-<thread-slug>/` inside this filter folder
    - Scaffold `EMAIL.md` from `_energy-cards/EMAIL.md.template` — substitute thread metadata
    - Scaffold `TODO.md` using the `## ACTIONS` template — pre-populate `## BOT` from `## Default Tasks` in `FILTER.md`
  - [ ] Append a run log entry to `FILTER.md` under `## Run Log`.
  - [ ] If no threads matched, note under `## HUMAN` and stop.

  ## HUMAN

  #### COMMENTS
  ```

- [ ] Scaffold `.flowdeck/.emaildeck/AGENT.md` if it does not already exist — copy verbatim from `_energy-cards/emaildeck-AGENT.md`.

- [ ] Commit: `git add .flowdeck/.emaildeck && git commit -m "deck: init emaildeck"`.

## HUMAN

#### COMMENTS
