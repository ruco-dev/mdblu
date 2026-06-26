# farmdeck

The `.flowdeck/.farmdeck/` directory is a prospection pipeline deck. It tracks individual contacts (prospects) through a Seed → Nurture → Active → Won / Dropped funnel.

---

## Pipeline Stages

| Stage | Meaning |
|---|---|
| Seed | Identified — no meaningful contact yet |
| Nurture | Engaged — active conversation or drip in progress |
| Active | Qualified — evaluating or in proposal stage |
| Won | Closed successfully |
| Dropped | Disqualified or abandoned |

Stage definitions and stale thresholds are in `PIPELINE.md`.

---

## Directory Layout

```
.flowdeck/.farmdeck/
  README.md
  pipeline/
    PIPELINE.md                ← stage config and stale thresholds
    TODO.md                    ← standing pipeline overview card
  farmdeck-inbox/
    INBOX.md                   ← auto-updated leads index
    TODO.md                    ← standing inbox card — review and route leads
    <slug>/                    ← unqualified lead (PROSPECT.md, INTERACTIONS.md, TODO.md)
  prospects/
    PROSPECTS.md               ← auto-updated prospects index
    TODO.md                    ← standing prospects card — overview, triage, add
    <slug>/
      PROSPECT.md              ← data companion: name, email, company, stage, source, score
      INTERACTIONS.md          ← chronological interaction log
      TODO.md                  ← active tasks + ACTIONS
  won/
    WON.md                     ← auto-updated won deals index
    TODO.md                    ← standing won card — archive overview, re-engage
    <slug>/                    ← archived won prospect (moved, not deleted)
  dropped/
    DROPPED.md                 ← auto-updated dropped prospects index
    TODO.md                    ← standing dropped card — archive overview, re-engage
    <slug>/                    ← archived dropped prospect (moved, not deleted)
```

---

## Inbox

Raw and unqualified leads land in `farmdeck-inbox/` — from manual entry, programmatic intake, or forwards from other decks (emaildeck, crunchdeck). Each inbox entry has the same structure as a prospect card (`PROSPECT.md`, `INTERACTIONS.md`, `TODO.md`) but is not yet part of the active pipeline.

Play `farmdeck-inbox/TODO.md` to review and route leads. From there, the `qualify` action promotes a lead into `prospects/` (Stage → Seed), and `drop` archives it in `dropped/`.

---

## Card Anatomy

Each prospect card folder contains:
- **`PROSPECT.md`** — structured data (stage, contact info, source, score). Edited by bot actions; do not edit the stage field manually — use `advance-stage` or `drop` instead.
- **`INTERACTIONS.md`** — append-only log of every interaction (date, type, notes).
- **`TODO.md`** — active tasks and ACTIONS. Safe to edit freely.

---

## Actions

These appear in `## ACTIONS` of every prospect card. Move one to `## BOT` and play the card to activate it.

| Action | What it does |
|---|---|
| `qualify` | Moves a lead from `farmdeck-inbox/<slug>/` to `prospects/<slug>/`; sets Stage to Seed |
| `log-interaction` | Appends an entry to `INTERACTIONS.md` — type, date, notes from task line |
| `advance-stage` | Promotes prospect to the next stage; updates stage field in `PROSPECT.md` |
| `drop` | Moves the card folder to `dropped/<slug>/`; updates stage to Dropped |
| `win` | Moves the card folder to `won/<slug>/`; updates stage to Won |
| `draft-email` | Creates a Gmail draft via emaildeck for this prospect |
| `send-to-crunchdeck` | Routes a signal or insight to `.crunchdeck/crunchdeck-inbox/` |

---

## Programmatic Intake

Prospects can be created programmatically via `flowdeck create-card`:

```bash
flowdeck create-card farmdeck <slug> --data '{"name":"...", "email":"...", "stage":"seed"}'
```

Both paths are available: `flowdeck create-card` for programmatic intake, `farmdeck-add-prospect` blueprint for manual intake.

---

## Blueprints

- `farmdeck-init` — scaffold `.flowdeck/.farmdeck/` in this project
- `farmdeck-add-prospect` — create a new prospect card from `## HUMAN` input
- `farmdeck-inbox` — standing card for `farmdeck-inbox/` (installed by farmdeck-init)
- `farmdeck-prospects` — standing card for `prospects/` (installed by farmdeck-init)
- `farmdeck-won` — standing card for `won/` (installed by farmdeck-init)
- `farmdeck-dropped` — standing card for `dropped/` (installed by farmdeck-init)
- `farmdeck-pipeline` — standing card for `pipeline/` (installed by farmdeck-init)
