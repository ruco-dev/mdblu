## crunchdeck

The `.flowdeck/.crunchdeck/` directory is a product management deck. Each asset is a card — a folder with a document and a `TODO.md` that drives work on it.

**Standing cards (created by `crunchdeck-init`):**
- `.flowdeck/.crunchdeck/profile/` — `PROFILE.md` + `TODO.md` — product identity: one-liner, elevator pitch, north-star, market lane
- `.flowdeck/.crunchdeck/backlog/` — `BACKLOG.md` + `TODO.md` — signals (email / web / github) and candidate items
- `.flowdeck/.crunchdeck/roadmap/` — `ROADMAP.md` + `TODO.md` — committed themes by horizon (Now / Next / Later)

**Created per-instance:**
- `.flowdeck/.crunchdeck/decisions/ADR-XXXX/` — `ADR-XXXX.md` + `TODO.md` — architectural and product decisions
- `.flowdeck/.crunchdeck/launches/vX.Y.Z/` — `LAUNCH.md` + `TODO.md` — per-launch operational checklists

**Pipeline:** Signal (email / web / github) → `backlog/BACKLOG.md` Signal table → Candidates → `roadmap/ROADMAP.md` Horizons → flowdeck cards

**To play a crunchdeck card**, read the `TODO.md` in the relevant folder and execute its `## BOT` tasks, writing changes to the companion document in the same folder.
