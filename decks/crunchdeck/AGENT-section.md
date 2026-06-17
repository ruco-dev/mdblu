## crunchdeck

The `.crunchdeck/` directory holds product management documents for this project.

**Documents:**
- `PROFILE.md` — product identity: one-liner, elevator pitch, north-star metric, market lane
- `BACKLOG.md` — signals and candidate items. Pipeline: Signal → Candidate → ROADMAP
- `ROADMAP.md` — committed themes by horizon (Now / Next / Later), outcome-oriented
- `decisions/ADR-XXXX.md` — architectural and product decisions
- `launches/LAUNCH-vX.Y.Z.md` — per-launch operational checklists (archived after ship)

**Pipeline:** Signal (email / web / github) → BACKLOG.Signal → BACKLOG.Candidates → ROADMAP.Horizons → flowdeck cards

**Blueprints:**
- `crunchdeck-init` — scaffold `.crunchdeck/` in this project
- `crunchdeck-signal-email` — email signals → BACKLOG
- `crunchdeck-signal-web` — web search signals → BACKLOG
- `crunchdeck-signal-github` — GitHub release comparison → BACKLOG
- `crunchdeck-promote` — promote BACKLOG candidates → ROADMAP
- `crunchdeck-adr` — open a new ADR
