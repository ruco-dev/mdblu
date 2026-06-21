# gitdeck

The `.flowdeck/.gitdeck/` directory watches GitHub repositories for signal. Repos are grouped by category — owned, competitor, provider, consumer, benchmark — and each watch pass generates finding cards routed to crunchdeck.

**Standing cards (created by `gitdeck-init`):**
- `.flowdeck/.gitdeck/repos/` — `TODO.md` — orchestrates all configured repo cards

**Created per-instance:**
- `.flowdeck/.gitdeck/repos/<owner>-<repo>/` — `REPO.md` + `TODO.md` — watch config, run log, findings

**Pipeline:** GitHub repos → finding cards → `send-to-crunchdeck` → crunchdeck inbox

**To watch all repos**, play `.flowdeck/.gitdeck/repos/`.

**Blueprints:**
- `gitdeck-init` — scaffold `.flowdeck/.gitdeck/` in this project
- `gitdeck-add-repo` — configure a new repo to watch
