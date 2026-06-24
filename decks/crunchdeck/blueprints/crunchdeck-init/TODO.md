# crunchdeck-init

## BOT

- [ ] Read `FLOWDECK.md` for product name and description. Fall back to `package.json` name/description if not found.

- [ ] Check if `.flowdeck/.crunchdeck/` already exists. If it does, stop and note under `## HUMAN` that crunchdeck is already initialized.

- [ ] Create `.flowdeck/.crunchdeck/`, `.flowdeck/.crunchdeck/inbox/`, `.flowdeck/.crunchdeck/decisions/`, `.flowdeck/.crunchdeck/launches/`.

- [ ] Add `.*` to `.flowdeck/.flowdeckignore` if not already present, so `.crunchdeck/` is excluded from `flowdeck turn`.

- [ ] Scaffold `.flowdeck/.crunchdeck/AGENT.md` if it does not already exist — copy verbatim from `_energy-cards/crunchdeck-AGENT.md`.

- [ ] Scaffold `.flowdeck/.crunchdeck/README.md` from `_energy-cards/README.md.template` — substitute `{{PRODUCT_NAME}}` and `{{DATE}}` (today).

- [ ] Scaffold `.flowdeck/.crunchdeck/profile/PROFILE.md` from `_energy-cards/PROFILE.md.template` — substitute `{{PRODUCT_NAME}}`, `{{DATE}}`, and `{{PROMPT}}` from context.

- [ ] Create `.flowdeck/.crunchdeck/profile/TODO.md`:
  ```
  # profile

  ## BOT

  - [ ] Read current `PROFILE.md` and any recent changes in `../backlog/BACKLOG.md` and `../roadmap/ROADMAP.md`.
  - [ ] Update `PROFILE.md` if any of these changed: one-liner, elevator pitch, north-star metric, market lane, tagline candidates.
  - [ ] Flag any remaining `{{PLACEHOLDER}}` values to `## HUMAN`.

  ## HUMAN

  #### COMMENTS
  ```

- [ ] Scaffold `.flowdeck/.crunchdeck/backlog/BACKLOG.md` from `_energy-cards/BACKLOG.md.template` — substitute `{{PRODUCT_NAME}}` and `{{DATE}}`.

- [ ] Create `.flowdeck/.crunchdeck/backlog/TODO.md`:
  ```
  # backlog

  ## BOT

  - [ ] Check `../inbox/` for unrouted cards forwarded from emaildeck, gitdeck, or webdeck. Route any that are clearly backlog candidates by moving `to-backlog` to `## BOT` on each card.

  - [ ] Review P0/P1 candidates not yet in `../roadmap/ROADMAP.md` — surface them under `## HUMAN` for promotion decision.

  ## HUMAN

  #### COMMENTS
  ```

- [ ] Create `.flowdeck/.crunchdeck/inbox/TODO.md`:
  ```
  # inbox

  ## BOT

  - [ ] List all subdirectories in this folder whose `TODO.md` has no completed routing action (`to-backlog`, `to-roadmap`, `to-decision`, or `discard`).
  - [ ] For each unrouted item, read whichever document is present — `EMAIL.md` (emaildeck), `FINDING.md` (gitdeck / webdeck) — and surface title/subject, source, date, and relevance note under `## HUMAN`.

  ## HUMAN

  #### COMMENTS
  ```

- [ ] Scaffold `.flowdeck/.crunchdeck/roadmap/ROADMAP.md` from `_energy-cards/ROADMAP.md.template` — substitute `{{PRODUCT_NAME}}`, `{{DATE}}`, and `{{OWNER}}` from `git config user.name`.

- [ ] Create `.flowdeck/.crunchdeck/roadmap/TODO.md`:
  ```
  # roadmap

  ## BOT

  - [ ] Read `../backlog/BACKLOG.md` Promotion Log for newly promoted items not yet in `ROADMAP.md`.
  - [ ] Add promoted items to the correct horizon (Now / Next / Later) with outcome, hypothesis, and metric tracing to PROFILE north-star.
  - [ ] Check if any "Now" items have shipped — update Status.
  - [ ] Verify cross-product dependencies are still current.

  ## HUMAN

  #### COMMENTS
  ```

- [ ] Scaffold `.flowdeck/.crunchdeck/decisions/ADR-0001/ADR-0001.md` from `_energy-cards/ADR.md.template` — number `ADR-0001`, title "Initial Technology Stack", Status `Accepted`. Fill Context/Decision/Rationale with plausible initial choices derived from `package.json` and `PROFILE.md` (language, runtime, key dependencies). Use `{{AUTHOR}}` from `git config user.name` and `{{DATE}}` as today.

- [ ] Create `.flowdeck/.crunchdeck/decisions/ADR-0001/TODO.md`:
  ```
  # decisions/ADR-0001

  ## BOT

  - [ ] Review `ADR-0001.md` for placeholder content. Update from `PROFILE.md` or `package.json` where possible.
  - [ ] Flag any unresolved items to `## HUMAN`.

  ## HUMAN

  #### COMMENTS
  ```

- [ ] Create `.flowdeck/.crunchdeck/launches/TODO.md`:
  ```
  # release

  ## BOT

  ---

  ### Determine version

  - [ ] List existing launch folders under `.flowdeck/.crunchdeck/launches/` — find the highest vX.Y.Z. If none, start at v0.1.0.
  - [ ] Scan `.flowdeck/_meld/` for card `TODO.md` files that do not contain a `**Released:**` line — these represent work completed since the last release.
  - [ ] Classify each untagged meld card as: **feature** (new capability), **fix** (bug or regression), or **breaking** (incompatible change). Surface the list as a note.
  - [ ] Infer bump level — any breaking → major, any feature → minor, fixes only → patch. Use HUMAN override if set.
  - [ ] Resolve the new version string.

  ---

  ### Scaffold launch card

  - [ ] Create `.flowdeck/.crunchdeck/launches/vX.Y.Z/` using the resolved version.
  - [ ] Scaffold `LAUNCH.md` from `_energy-cards/LAUNCH.md.template` — substitute product name from `PROFILE.md`, version, today's date as target, and owner from `git config user.name`. Pre-fill with the classified meld card summaries as the shipped items.
  - [ ] Create `launches/vX.Y.Z/TODO.md` with: `## BOT` containing "Read LAUNCH.md and verify all checklist sections are filled — flag any TBDs under ## HUMAN" and "Confirm Go/No-Go gate criteria match the current state of the codebase"; `## HUMAN` containing "Review and complete LAUNCH.md checklist", "Run publish commands when Go criteria are met", and "After publishing: move annotate-meld to ## BOT and replay this card"; `## ACTIONS` containing "annotate-meld — add **Released: vX.Y.Z** to every untagged _meld/ card TODO.md and commit".

  ---

  ### Hand off

  - [ ] Surface the resolved version, the untagged meld card list, and the path to the launch card under `## HUMAN`. Do not commit or tag.

  ## HUMAN

  - [ ] Bump level override (leave blank to let BOT infer — major / minor / patch): ___

  #### COMMENTS
  ```

- [ ] Scaffold `.flowdeck/.crunchdeck/launches/v0.0.0/LAUNCH.md` from `_energy-cards/LAUNCH.md.template` — version `v0.0.0`, title "Pre-launch Baseline", Status `Archived`. Fill as a seed/bootstrap state: all checklist items marked with a note that this is the starting baseline, not a real release. Use `{{DATE}}` as today and `{{OWNER}}` from `git config user.name`.

- [ ] Create `.flowdeck/.crunchdeck/launches/v0.0.0/TODO.md`:
  ```
  # launches/v0.0.0

  ## BOT

  - [ ] Review `LAUNCH.md` for placeholder content. Update from `PROFILE.md` where possible.
  - [ ] Flag any unresolved items to `## HUMAN`.

  ## HUMAN

  ## ACTIONS

  <!-- Move any item to ## BOT (bot executes) or ## HUMAN (you handle it) to activate. -->

  - [ ] npm-publish — run `npm publish` with the correct scope; confirm the package resolves from a clean install
  - [ ] tag-release — create git tag vX.Y.Z, push tag and branch to remote
  - [ ] update-docs — sync README and any mdblu-served docs to reflect the shipped API
  - [ ] draft-announce — draft a launch post using the content angle and one-liner from PROFILE
  - [ ] capture-baseline — record the north-star metric value (defined in PROFILE) as a comment on this card before and after launch
  - [ ] annotate-meld — add `**Released: vX.Y.Z**` to every untagged `_meld/` card `TODO.md` and commit

  #### COMMENTS
  ```

- [ ] Commit: `git add -A && git commit -m "deck: init crunchdeck"`.

## HUMAN

#### COMMENTS
