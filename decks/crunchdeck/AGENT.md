# crunchdeck

The `.flowdeck/.crunchdeck/` directory is a product management deck. Each asset is a card — a folder with a document and a `TODO.md` that drives work on it.

**Standing cards (created by `crunchdeck-init`):**
- `.flowdeck/.crunchdeck/inbox/` — `TODO.md` — finding cards forwarded from emaildeck / gitdeck / webdeck, awaiting routing
- `.flowdeck/.crunchdeck/profile/` — `PROFILE.md` + `TODO.md` — product identity: one-liner, elevator pitch, north-star, market lane
- `.flowdeck/.crunchdeck/backlog/` — `BACKLOG.md` + `TODO.md` — candidate items promoted from inbox
- `.flowdeck/.crunchdeck/roadmap/` — `ROADMAP.md` + `TODO.md` — committed themes by horizon (Now / Next / Later)

**Created per-instance:**
- `.flowdeck/.crunchdeck/decisions/ADR-XXXX/` — `ADR-XXXX.md` + `TODO.md` — architectural and product decisions
- `.flowdeck/.crunchdeck/launches/vX.Y.Z/` — `LAUNCH.md` + `TODO.md` — per-launch operational checklists

**Pipeline:** emaildeck / gitdeck / webdeck (`send-to-crunchdeck`) → `inbox/` → Backlog / Roadmap / Decision → flowdeck cards

**To play a crunchdeck card**, read the `TODO.md` in the relevant folder and execute its `## BOT` tasks, writing changes to the companion document in the same folder.

## Triggers

Act on these without waiting to be asked:

- **Architectural or product decision made** — open an ADR immediately: `flowdeck blueprint use crunchdeck-adr <slug>`, fill it with the decision, rationale, and rejected alternatives.
- **Release being prepared** — run `flowdeck blueprint use crunchdeck-release`; it infers the version from the last launch and roadmap state.
- **Open question resolved into a significant choice** — if reversing it would cost meaningful time or money, it warrants an ADR.

Surface the created file path under `## HUMAN` so the human can review.

## Protocol: Undocumented Work

Before implementing any non-trivial change — new capability, changed behavior, user-visible fix, or architectural decision:

1. **Offer a card first**: "This looks like it warrants a flowdeck card — want me to create one before starting?"
2. **If declined**, implement the work.
3. **After implementation**, if no card was created: "I implemented this without a card. Want me to write and meld it now so it's tracked for the next release?" If yes, create the card with tasks pre-marked `[x]` and move it to `_meld/` with today's timestamp.

A change is non-trivial if it would appear in a CHANGELOG: new feature, changed behavior, fixed bug, or significant refactor. Small edits, typo fixes, and config tweaks do not need cards.
