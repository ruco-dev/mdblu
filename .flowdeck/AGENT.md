# Project Context

> Claude reads this file at the start of every `play` and `turn`. Keep it updated with decisions, constraints, and preferences that should inform all work in this project.
>
> The deck is `.flowdeck/`. Columns are folders inside it. Cards are `TODO.md` files.
> Run `flowdeck turn` to play the full hand. Run `flowdeck play <slug>` to play one card.

## Commands

- `flowdeck turn` — orchestrates cards in parallel using declared `depends:` headers
- `flowdeck turn --serial` — bypasses parallel execution; use when the orchestrator's grouping is wrong
- `flowdeck play <slug>` — plays a single card; warns if declared dependencies have open items
- `flowdeck play <slug> --no-dep-check` — skips dependency check

## Architecture

<!-- Describe the project structure, stack, and key conventions here. -->

## Piles

Special subfolders inside `.flowdeck/` that are **not active columns**. Bot must never treat cards inside piles as playable during `turn` or `play`.

| Pile | Purpose |
|------|---------|
| `_meld/` | Shipped cards — completed and merged |
| `_discard/` | Cancelled or abandoned cards |
| `_frozen/` | Blocked cards — each has a `FREEZE.md` with an unfreeze signal |
| `_stock/` | Backlog — cards not yet ready to play |
| `_energy/` | mdblu templates and prompts — not cards, not played |

### Frozen card protocol (`turn` responsibility)

At the start of each `turn`, the orchestrator must:
1. Read `.flowdeck/_frozen/FROZEN.md` (if it exists) — it lists all frozen cards and their unfreeze signals.
2. Evaluate each signal against current repo/project state.
3. Surface any cards whose unfreeze condition is now met as `- [ ]` items under `## HUMAN` in the turn summary, so the human can decide to thaw them.

The bot must not auto-unfreeze cards — only flag candidates for human review.

## Preferences

<!-- Coding style, commit format, naming conventions, etc. -->

## Current priorities

<!-- What matters most right now. Update this each turn. -->
