# crunchdeck-init

## BOT

- [ ] Read `FLOWDECK.md` for the product name and description. If not found, check `package.json` for `name` and `description`.

- [ ] Check if `.crunchdeck/` already exists. If it does, stop and note under `## HUMAN` that crunchdeck is already initialized.

- [ ] Create the directory structure: `.crunchdeck/`, `.crunchdeck/decisions/`, `.crunchdeck/launches/`.

- [ ] Scaffold `.crunchdeck/PROFILE.md` from `_energy-cards/PROFILE.md.template`, substituting `{{PRODUCT_NAME}}`, `{{DATE}}` (today), and `{{PROMPT}}` (one-sentence product description from context).

- [ ] Scaffold `.crunchdeck/BACKLOG.md` from `_energy-cards/BACKLOG.md.template`, substituting `{{PRODUCT_NAME}}` and `{{DATE}}`.

- [ ] Scaffold `.crunchdeck/ROADMAP.md` from `_energy-cards/ROADMAP.md.template`, substituting `{{PRODUCT_NAME}}`, `{{DATE}}`, and `{{OWNER}}` from `git config user.name`.

- [ ] Add `.crunchdeck/` to `.gitignore` if not already present.

- [ ] Commit: `git add -A && git commit -m "deck: init crunchdeck"`.

## HUMAN

#### COMMENTS
