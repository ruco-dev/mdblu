# farmdeck-init
<!-- lifecycle: idempotent -->

## BOT

- [ ] This card is idempotent — create each path only if missing; skip silently otherwise:
  - `.flowdeck/.farmdeck/`
  - `.flowdeck/.farmdeck/farmdeck-inbox/`
  - `.flowdeck/.farmdeck/prospects/`
  - `.flowdeck/.farmdeck/won/`
  - `.flowdeck/.farmdeck/dropped/`
  - `.flowdeck/.farmdeck/pipeline/`

- [ ] Scaffold `.flowdeck/.farmdeck/farmdeck-inbox/TODO.md` if it does not already exist:
  ```markdown
  # farmdeck-inbox

  ## BOT

  - [ ] List every `farmdeck-inbox/*/PROSPECT.md` — extract slug, name, company, source.
  - [ ] Surface each unqualified lead under `## HUMAN` as a `- [ ]` item with a one-line summary.

  ## HUMAN

  ## ACTIONS

  <!-- Move an item to ## BOT to activate it, then play this card. -->

  - [ ] qualify — move a lead folder from farmdeck-inbox/ to prospects/, set Stage to Seed
  - [ ] drop — move a lead folder to dropped/, set Stage to Dropped
  ```

- [ ] Add `.*` to `.flowdeck/.flowdeckignore` if not already present.

- [ ] Scaffold `.flowdeck/.farmdeck/PIPELINE.md` from `_energy-cards/PIPELINE.md.template` if it does not already exist.

- [ ] Scaffold `.flowdeck/.farmdeck/pipeline/TODO.md` if it does not already exist:
  ```markdown
  # Pipeline Overview

  ## BOT

  - [ ] Read `PIPELINE.md` for stage definitions and stale threshold.
  - [ ] Scan all `prospects/*/PROSPECT.md` files — extract slug, name, stage, last-interaction date.
  - [ ] Group by stage (Seed / Nurture / Active). For each group, list prospects and flag any whose last interaction is older than the stale threshold.
  - [ ] Surface a pipeline summary table and a "needs attention" list under `## HUMAN`.

  ## HUMAN

  ## ACTIONS

  <!-- Move an item to ## BOT to activate it, then play this card. -->

  - [ ] add-prospect — open farmdeck-add-prospect blueprint
  ```

- [ ] Scaffold `.flowdeck/.farmdeck/README.md` if it does not already exist:
  ```
  # farmdeck

  Prospection pipeline. Tracks contacts through Seed → Nurture → Active → Won / Dropped.

  ## Usage
  - Pipeline status: play `pipeline/TODO.md`
  - Add prospect: play `farmdeck-add-prospect` blueprint
  - Work a prospect: play `prospects/<slug>/TODO.md`

  ## Programmatic intake
  flowdeck create-card farmdeck <column> <slug> --data '{"name":"...","email":"...","stage":"seed"}'
  ```

- [ ] Commit: `git add .flowdeck/.farmdeck && git commit -m "deck: init farmdeck"`.

## HUMAN
