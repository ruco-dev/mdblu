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
  ACTIONS.md       — actions the bot can perform on emails; trigger via thread TODO.md
  filters/<slug>/
    FILTER.md      — query, label, default task template
    TODO.md        — when played: fetch → label → create message cards
    messages/
      <date>-<slug>/
        EMAIL.md   — thread metadata
        TODO.md    — populated from default tasks
  inbox/           — raw fetched threads land here before being processed
  drafts/          — bot-generated reply drafts staged for human review
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

  Actions you can ask the bot to perform on emails in your inbox.
  Trigger an action by adding it as a task in the thread's `TODO.md`.

  ---

  ## add-card

  Create a flowdeck card for this email thread. The card captures subject, sender, date, and a brief summary.

  **Trigger:** `- [ ] add-card`

  ---

  ## draft-reply

  Compose a reply draft using Gmail MCP and save it to `drafts/`.
  Provide context or instructions on what the reply should say.

  **Trigger:** `- [ ] draft-reply — [your instructions here]`

  ---

  ## summarize

  Summarize the thread and append the summary to `EMAIL.md`.

  **Trigger:** `- [ ] summarize`

  ---

  ## label

  Apply a Gmail label to the thread.

  **Trigger:** `- [ ] label — [label name]`

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

  - **From**: sender@example.com
  - **Date**: YYYY-MM-DD
  - **Thread ID**: <!-- Gmail thread ID -->
  - **Subject**: <!-- Subject line -->
  - **Labels**: <!-- Applied labels -->

  ## Summary

  <!-- One-paragraph summary of the thread -->

  ## Body

  <!-- Email body or most recent message -->
  ```

- [ ] Scaffold `.flowdeck/.emaildeck/drafts/mock-email-card/TODO.md` if it does not already exist:
  ```markdown
  # [Subject here]

  ## BOT

  - [ ] draft-reply — [describe what the reply should say]

  ## HUMAN

  #### COMMENTS
  ```

- [ ] Commit: `git add .flowdeck/.emaildeck && git commit -m "deck: init emaildeck"`.

## HUMAN

#### COMMENTS
