# crunchdeck-release

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
- [ ] Create `TODO.md`:
  ```
  # vX.Y.Z

  ## BOT

  - [ ] Read `LAUNCH.md` and verify all checklist sections are filled — flag any TBDs under `## HUMAN`.
  - [ ] Confirm Go/No-Go gate criteria match the current state of the codebase.

  ## HUMAN

  - [ ] Review and complete `LAUNCH.md` checklist.
  - [ ] Activate actions below when Go criteria are met — move each to `## BOT` to execute.

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

---

### Hand off

- [ ] Surface the resolved version, the untagged meld card list, and the path to the launch card under `## HUMAN`. Do not commit or tag.

## HUMAN

- [ ] Bump level override (leave blank to let BOT infer — major / minor / patch): ___

#### COMMENTS
