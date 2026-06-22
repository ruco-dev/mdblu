# creamdeck-init

## BOT

- [ ] Read `FLOWDECK.md` for project name and description. Fall back to `package.json` name/description if not found.

- [ ] Check if `.flowdeck/.creamdeck/` already exists. If it does, stop and note under `## HUMAN` that creamdeck is already initialized.

- [ ] Create `.flowdeck/.creamdeck/`, `.flowdeck/.creamdeck/inbox/`, `.flowdeck/.creamdeck/contacts/`.

- [ ] Add `.*` to `.flowdeck/.flowdeckignore` if not already present, so `.creamdeck/` is excluded from `flowdeck turn`.

- [ ] Scaffold `.flowdeck/.creamdeck/README.md` if it does not already exist:
  ```
  # creamdeck

  Project-scoped CRM for {{PROJECT_NAME}}. Tracks contacts and incoming communications
  (emails, calls) relevant to this project.

  ## Structure

  - `inbox/` — incoming items routed from emaildeck or logged manually
  - `contacts/` — one subfolder per tracked contact

  ## Usage

  - Play `inbox/TODO.md` to surface and route unread items.
  - Play a contact card to review interactions and draft follow-ups.
  - Add a contact directly: `flowdeck blueprint use creamdeck-add-contact`.
  ```

- [ ] Create `.flowdeck/.creamdeck/inbox/TODO.md`:
  ```markdown
  # inbox

  ## BOT

  - [ ] List all subdirectories in this folder. For each, read `INBOX-ITEM.md` and check `TODO.md` for any completed routing action (`create-contact`, `log-to-contact`, `route-to-crunchdeck`, `archive`).
  - [ ] Surface unrouted items under `## HUMAN`: subject, type (email/call), date, contact name, and a one-sentence summary.

  ## HUMAN

  ## ACTIONS

  <!-- Move any item to ## BOT (bot executes) or ## HUMAN (you handle it) to activate. -->

  - [ ] create-inbox-item — manually log a call or note: ask for subject, type, contact, date, and notes; scaffold `inbox/<YYYY-MM-DD>-<slug>/INBOX-ITEM.md` from `_energy-cards/INBOX-ITEM.md.template` and a `TODO.md` with the standard ACTIONS menu

  #### COMMENTS
  ```

- [ ] Check if `.flowdeck/.emaildeck/` exists. If it does, surface under `## HUMAN`:
  ```
  emaildeck is installed. To route contact-related emails to creamdeck, add
  `send-to-creamdeck` to the default tasks of any relevant emaildeck filter card.
  ```

- [ ] Commit: `git add .flowdeck/.creamdeck && git commit -m "deck: init creamdeck"`.

## HUMAN

#### COMMENTS
