# crunchdeck-adr

## BOT

- [ ] Read `.crunchdeck/decisions/` to find the highest-numbered ADR. If none exist, start at `ADR-0001`.

- [ ] Create `.crunchdeck/decisions/ADR-<number>.md` from `_energy-cards/ADR.md.template`, substituting:
  - `{{PROJECT_NAME}}` — from the human-provided decision title
  - `{{DATE}}` — today
  - `{{AUTHOR}}` — from `git config user.name`

- [ ] Fill in `## Context` from the human's description. Leave `## Decision`, `## Rationale`, `## Alternatives Considered`, and `## Consequences` for the human to complete — or draft them if enough context is provided.

- [ ] Commit: `git add .crunchdeck/decisions/ && git commit -m "deck: adr <number> — <title>"`.

## HUMAN

- [ ] What decision needs to be recorded? Describe the context, the options considered, and (if known) the chosen path.
  > _answer:_

#### COMMENTS
