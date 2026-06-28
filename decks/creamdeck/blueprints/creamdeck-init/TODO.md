# creamdeck-init
<!-- lifecycle: idempotent -->

## BOT

- [ ] Read `FLOWDECK.md` for project name and description. Fall back to `package.json` name/description if not found.

- [ ] Check if `.flowdeck/.creamdeck/` already exists. If it does, stop and note under `## HUMAN` that creamdeck is already initialized.

- [ ] Create `.flowdeck/.creamdeck/`, `.flowdeck/.creamdeck/creamdeck-inbox/`, `.flowdeck/.creamdeck/contacts/`, `.flowdeck/.creamdeck/tickets/`.

- [ ] Add `.*` to `.flowdeck/.flowdeckignore` if not already present, so `.creamdeck/` is excluded from `flowdeck turn`.

- [ ] Scaffold `.flowdeck/.creamdeck/README.md` if it does not already exist:
  ```
  # creamdeck

  Project-scoped CRM for {{PROJECT_NAME}}. Tracks contacts and incoming communications
  (emails, calls) relevant to this project.

  ## Structure

  - `creamdeck-inbox/` — incoming items routed from emaildeck or logged manually
  - `contacts/` — one subfolder per tracked contact
  - `tickets/` — open support or project tickets

  ## Usage

  - Play `creamdeck-inbox/TODO.md` to surface and route unread items.
  - Play a contact card to review interactions and draft follow-ups.
  - Play `tickets/TODO.md` to see open tickets by stage.
  - Add a contact directly: `flowdeck blueprint use creamdeck-add-contact`.
  - Open a ticket: `flowdeck blueprint use creamdeck-open-ticket`.
  ```

- [ ] Create `.flowdeck/.creamdeck/creamdeck-inbox/TODO.md`:
  ```markdown
  # creamdeck-inbox

  ## BOT

  - [ ] List all subdirectories in this folder. For each, read `INBOX-ITEM.md` and check `TODO.md` for any completed routing action (`create-contact`, `log-to-contact`, `route-to-crunchdeck`, `archive`).
  - [ ] Surface unrouted items under `## HUMAN`: subject, type (email/call), date, contact name, and a one-sentence summary.

  ## HUMAN

  ## ACTIONS

  <!-- Move any item to ## BOT (bot executes) or ## HUMAN (you handle it) to activate. -->

  - [ ] create-inbox-item — manually log a call or note: ask for subject, type, contact, date, and notes; scaffold `creamdeck-inbox/<YYYY-MM-DD>-<slug>/INBOX-ITEM.md` from `_energy-cards/INBOX-ITEM.md.template` and a `TODO.md` with the standard ACTIONS menu

  #### COMMENTS
  ```

- [ ] Scaffold `.flowdeck/.creamdeck/CREAMDECK.md` from `_energy-cards/CREAMDECK.md.template` — substitute `{{PROJECT_NAME}}`, `{{PROJECT_DESCRIPTION}}`, and `{{TICKET_PREFIX}}`. Derive `TICKET_PREFIX` from the project name: uppercase first 3 consonants or first 3 letters if unclear (e.g. `hcv-mcp` → `HCV`, `mdblu` → `MDB`). Ask under `## HUMAN` if ambiguous.

- [ ] Scaffold an example contact at `.flowdeck/.creamdeck/contacts/john-dee/`:

  **`CONTACT.md`** (copy verbatim, substitute `{{DATE}}` with today):
  ```markdown
  # John Dee

  | Field | Value |
  |-------|-------|
  | Company | Alchemy Labs |
  | Role | CTO |
  | Email | john.dee@alchemy-labs.io |
  | Phone | — |
  | Added | {{DATE}} |

  ## Context

  Example contact — replace or delete. Met via a GitHub issue; evaluating this project
  for internal use. Main interest: CLI scaffolding and template customisation.

  ## Interaction Log

  <!-- most recent first — format: **YYYY-MM-DD** · type (email/call/note) · summary -->

  **{{DATE}}** · email · Introduced himself, asked about custom template support and
  private registry hosting. Stack: TypeScript, Prisma, tRPC.

  ## Follow-up

  <!-- dated next actions — format: **YYYY-MM-DD** · description -->

  ## Notes

  Potential design partner. Delete this file and replace with real contacts.
  ```

  **`TODO.md`**:
  ```markdown
  # John Dee

  ## BOT

  - [ ] Read `CONTACT.md` — extract name, company, role, last interaction date, and any open follow-ups.
  - [ ] Surface a contact summary and any overdue follow-ups under `## HUMAN`.

  ## HUMAN

  ## ACTIONS

  <!-- Move any item to ## BOT (bot executes) or ## HUMAN (you handle it) to activate. -->

  - [ ] draft-email — create a Gmail draft to this contact via emaildeck
  - [ ] log-interaction — append a new entry to `CONTACT.md` interaction log (date, type, notes)
  - [ ] schedule-follow-up — add a follow-up entry with a target date to `CONTACT.md`
  - [ ] route-to-crunchdeck — surface this contact's context as a signal in `.crunchdeck/crunchdeck-inbox/`
  - [ ] sync-from-inbox — scan `../../creamdeck-inbox/` for unlogged items linked to this contact; append missing interactions to `CONTACT.md`

  #### COMMENTS
  ```

- [ ] Scaffold an example inbox item at `.flowdeck/.creamdeck/creamdeck-inbox/{{DATE}}-example-intro/`:

  **`INBOX-ITEM.md`** (substitute `{{DATE}}` with today):
  ```markdown
  # Evaluating this project for internal use

  | Field | Value |
  |-------|-------|
  | Type | email |
  | Source | email:thread-example |
  | Contact | John Dee |
  | Date | {{DATE}} |
  | Status | unrouted |

  ## Summary

  Example inbox item — replace or delete. John Dee (CTO, Alchemy Labs) reached out
  after finding this project online. Two questions: (1) custom template support,
  (2) private registry hosting for the CLI.

  ## Raw

  > Hi,
  >
  > I came across your project while researching AI workflow tooling. We're a ~12-person
  > product team using Claude for most of our planning and handoff docs, and your template
  > set looks very close to what we've been building ad-hoc.
  >
  > Two questions: can we add our own templates without forking? And is there a way to
  > point the CLI at a private registry?
  >
  > Happy to jump on a call if that's easier.
  >
  > John Dee, CTO — Alchemy Labs
  ```

  **`TODO.md`**:
  ```markdown
  # Evaluating this project for internal use

  ## BOT

  - [ ] Read `INBOX-ITEM.md` — extract subject, source, contact, date, and summary.
  - [ ] Surface the item summary under `## HUMAN` with suggested next actions.

  ## HUMAN

  ## ACTIONS

  <!-- Move any item to ## BOT (bot executes) or ## HUMAN (you handle it) to activate. -->

  - [ ] draft-reply — create a Gmail draft in emaildeck responding to this thread
  - [ ] create-contact — scaffold `contacts/<name>/TODO.md` from this item's context
  - [ ] log-to-contact — append this interaction to an existing `contacts/<name>/CONTACT.md`
  - [ ] route-to-crunchdeck — copy this item to `.crunchdeck/crunchdeck-inbox/` as a signal card
  - [ ] schedule-follow-up — add a follow-up task with a target date to the linked contact card
  - [ ] archive — mark this item as resolved; move `completed: true` to `INBOX-ITEM.md`

  #### COMMENTS
  ```

- [ ] Scaffold `.flowdeck/.creamdeck/tickets/PIPELINE.md` from `_energy-cards/PIPELINE.md.template` — substitute `{{PROJECT_NAME}}`.

- [ ] Create `.flowdeck/.creamdeck/tickets/TODO.md`:
  ```markdown
  # tickets

  ## BOT

  - [ ] List all subdirectories in this folder. For each, read `TICKET.md` — extract title, ID, status, stage, priority, and linked contact.
  - [ ] Surface open tickets (Stage ≠ Closed) under `## HUMAN`, grouped by stage, sorted by priority (high first).
  - [ ] Flag any tickets in `Waiting` stage where the last update in `TICKET.md` is older than 7 days.
  - [ ] Scan emaildeck inbox — for each email, infer tasks and their current status implied by the client's message. For each task found: open a ticket using the `open-ticket` action (auto-generating ID, linking to the contact, setting stage and priority from the inferred status); then update the ticket status field to reflect the inferred state (e.g. New, In Progress, Waiting, Blocked).

  ## HUMAN

  ## ACTIONS

  <!-- Move any item to ## BOT (bot executes) or ## HUMAN (you handle it) to activate. -->

  - [ ] open-ticket — scaffold a new ticket card from `_energy-cards/TICKET.md.template`; ask for title, priority (high/medium/low), stage (default: New), linked contact slug, and description. Auto-generate the ticket ID: read `Prefix` from the `## Ticket ID` table in `CREAMDECK.md`, count existing ticket subdirs for the sequence (zero-padded to 3 digits), and combine as `{PREFIX}{DDMMYYYY}{SEQ}` using today's date (e.g. `HCV29062026001`). Use this ID as the folder name and as `{{TICKET_ID}}` in the scaffolded `TICKET.md`.
  - [ ] close-ticket — prompt for ticket slug; set Status to Closed and fill Closed date in `TICKET.md`

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
