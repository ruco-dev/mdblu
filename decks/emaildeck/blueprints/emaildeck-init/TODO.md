# emaildeck-init

## BOT

- [ ] This card is idempotent — do not stop early if `.flowdeck/.emaildeck/` already exists. For each path below, create it only if missing; skip silently if it already exists:
  - `.flowdeck/.emaildeck/`
  - `.flowdeck/.emaildeck/filters/`
  - `.flowdeck/.emaildeck/inbox/`
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

  FILTERS.md       — human-editable filter criteria (edit before playing a filter)
  ACTIONS.md       — reference for all available email actions
  filters/<slug>/
    FILTER.md      — query, label, default task template
    TODO.md        — when played: fetch → label → create message cards
    messages/
      <date>-<slug>/
        EMAIL.md   — thread metadata
        TODO.md    — ## ACTIONS menu; move items to ## BOT or ## HUMAN to activate
  inbox/           — fetched threads not yet routed to a filter
  drafts/          — reply drafts staged for human review
  ```

- [ ] Scaffold `.flowdeck/.emaildeck/FILTERS.md` if it does not already exist:
  ```markdown
  # Email Filters

  Edit this file to define which emails emaildeck will pull and how to route them.
  Each block maps to a filter card under `filters/`. Duplicate the block to add more filters.

  ---

  ## Filter: [give it a name]

  - **Since**: <!-- e.g. 2026-01-01 — leave blank for last 30 days -->
  - **Sender email**: <!-- e.g. hello@example.com — leave blank to skip -->
  - **Sender domain**: <!-- e.g. example.com — leave blank to skip -->
  - **Keyword**: <!-- word or phrase that must appear in subject or body — leave blank to skip -->
  - **Topic relevance**: <!-- describe the topic; bot will score threads against this — leave blank to skip -->
  - **Label**: <!-- Gmail label to apply, e.g. emaildeck/newsletters -->
  - **Slug**: <!-- kebab-case folder name under filters/ -->

  ---
  ```

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

- [ ] Scaffold `.flowdeck/.emaildeck/inbox/mock-email-card/EMAIL.md` if it does not already exist — same structure as the drafts mock:
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

- [ ] Scaffold `.flowdeck/.emaildeck/inbox/mock-email-card/TODO.md` if it does not already exist — same structure as the drafts mock:
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

- [ ] Scaffold `.flowdeck/.emaildeck/inbox/TODO.md` if it does not already exist:
  ```markdown
  # Inbox

  ## BOT

  - [ ] Search Gmail for threads not yet labeled with any `emaildeck/*` label (query: `-label:emaildeck`). Default to the last 30 days.
  - [ ] For each unrouted thread, create `inbox/<YYYY-MM-DD>-<thread-slug>/` with `EMAIL.md` (from `_energy-cards/EMAIL.md.template`) and `TODO.md` (using the `## ACTIONS` template).
  - [ ] Check each new thread against defined filters in `filters/` — if it matches a filter's query, move the card there and apply the filter label.
  - [ ] Report count of new threads and any routed ones under `## HUMAN`.

  ## HUMAN

  #### COMMENTS
  ```

- [ ] Scaffold `.flowdeck/.emaildeck/filters/TODO.md` if it does not already exist:
  ```markdown
  # Filters

  ## BOT

  - [ ] Read `FILTERS.md` for all defined filter blocks.
  - [ ] For each filter with a `Slug` value, check if `filters/<slug>/` exists — if not, scaffold it from `emaildeck-add-filter` blueprint.
  - [ ] List all filter cards under `filters/` and their last run date from each `FILTER.md`'s `## Run Log`.

  ## HUMAN

  - [ ] Add a new filter: `flowdeck blueprint use emaildeck-add-filter start`
  - [ ] Edit `FILTERS.md` to define filter criteria, then run: `flowdeck play .emaildeck/filters/<slug>`

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
