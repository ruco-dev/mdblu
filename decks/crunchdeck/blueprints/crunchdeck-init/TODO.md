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

- [ ] Scaffold `.flowdeck/.crunchdeck/launches/v0.0.0/LAUNCH.md` from `_energy-cards/LAUNCH.md.template` — version `v0.0.0`, title "Pre-launch Baseline", Status `Archived`. Fill as a seed/bootstrap state: all checklist items marked with a note that this is the starting baseline, not a real release. Use `{{DATE}}` as today and `{{OWNER}}` from `git config user.name`.

- [ ] Create `.flowdeck/.crunchdeck/launches/v0.0.0/TODO.md`:
  ```
  # launches/v0.0.0

  ## BOT

  - [ ] Review `LAUNCH.md` for placeholder content. Update from `PROFILE.md` where possible.
  - [ ] Flag any unresolved items to `## HUMAN`.

  ## HUMAN

  #### COMMENTS
  ```

- [ ] Commit: `git add -A && git commit -m "deck: init crunchdeck"`.

## HUMAN

#### COMMENTS
