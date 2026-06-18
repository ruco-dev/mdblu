# emaildeck-init

## BOT

- [ ] Check if `.flowdeck/.emaildeck/` already exists. If it does, stop and note under `## HUMAN` that emaildeck is already initialized.

- [ ] Create `.flowdeck/.emaildeck/` and `.flowdeck/.emaildeck/filters/`.

- [ ] Add `.*` to `.flowdeck/.flowdeckignore` if not already present, so `.emaildeck/` is excluded from `flowdeck turn`.

- [ ] Scaffold `.flowdeck/.emaildeck/README.md`:
  ```
  # emaildeck

  Gmail filter rules as flowdeck cards. Each filter card defines a Gmail search query,
  a label to apply to matching threads, and default tasks added to every message card.

  ## Usage

  Add a filter: `flowdeck blueprint use emaildeck-add-filter start`
  Play a filter: `flowdeck play .emaildeck/filters/<slug>`

  ## Structure

  filters/<slug>/
    FILTER.md   — query, label, default task template
    TODO.md     — when played: fetch → label → create message cards
    messages/
      <date>-<slug>/
        EMAIL.md   — thread metadata
        TODO.md    — populated from default tasks
  ```

- [ ] Commit: `git add .flowdeck/.emaildeck && git commit -m "deck: init emaildeck"`.

## HUMAN

#### COMMENTS
