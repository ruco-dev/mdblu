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

- [ ] Scaffold standing cards from blueprints — copy each blueprint's `TODO.md` to the target path if it does not already exist:
  - `.flowdeck/_blueprints/farmdeck-inbox/TODO.md` → `.flowdeck/.farmdeck/farmdeck-inbox/TODO.md`
  - `.flowdeck/_blueprints/farmdeck-prospects/TODO.md` → `.flowdeck/.farmdeck/prospects/TODO.md`
  - `.flowdeck/_blueprints/farmdeck-won/TODO.md` → `.flowdeck/.farmdeck/won/TODO.md`
  - `.flowdeck/_blueprints/farmdeck-dropped/TODO.md` → `.flowdeck/.farmdeck/dropped/TODO.md`
  - `.flowdeck/_blueprints/farmdeck-pipeline/TODO.md` → `.flowdeck/.farmdeck/pipeline/TODO.md`

- [ ] Scaffold data documents from energy card templates — copy each template to the target path if it does not already exist:
  - `_energy-cards/PIPELINE.md.template` → `.flowdeck/.farmdeck/pipeline/PIPELINE.md`
  - `_energy-cards/FARMDECK-INBOX.md.template` → `.flowdeck/.farmdeck/farmdeck-inbox/FARMDECK-INBOX.md`
  - `_energy-cards/PROSPECTS.md.template` → `.flowdeck/.farmdeck/prospects/PROSPECTS.md`
  - `_energy-cards/WON.md.template` → `.flowdeck/.farmdeck/won/WON.md`
  - `_energy-cards/DROPPED.md.template` → `.flowdeck/.farmdeck/dropped/DROPPED.md`

- [ ] Add `.*` to `.flowdeck/.flowdeckignore` if not already present.

- [ ] Scaffold `.flowdeck/.farmdeck/README.md` if it does not already exist:
  ```
  # farmdeck

  Prospection pipeline. Tracks contacts through Inbox → Seed → Nurture → Active → Won / Dropped.

  ## Usage
  - Inbox: play `farmdeck-inbox/TODO.md`
  - Pipeline status: play `pipeline/TODO.md`
  - Prospects: play `prospects/TODO.md`
  - Add prospect: open `farmdeck-add-prospect` blueprint
  - Work a prospect: play `prospects/<slug>/TODO.md`

  ## Programmatic intake
  flowdeck create-card farmdeck <column> <slug> --data '{"name":"...","email":"...","stage":"seed"}'
  ```

- [ ] Commit: `git add .flowdeck/.farmdeck && git commit -m "deck: init farmdeck"`.

## HUMAN
