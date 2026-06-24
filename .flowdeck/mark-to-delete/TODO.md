# on emaildeck add a default action for email messages 'mark to delete'; this command will dicard the md message and add a label DELETE on gmail 

## BOT

- [x] Add a new `## mark-to-delete` action to the `ACTIONS.md` heredoc inside `decks/emaildeck/blueprints/emaildeck-init/TODO.md`. Insert it between the `## archive` section (~lines 157–161) and the `## send-to-crunchdeck` section (~line 165), using the same shape as `## archive`. Body:
  > Already present from a prior flash run; verified correct content (label create, label apply, delete-after-success, trigger line, filter-default note).

- [x] In the same file (`decks/emaildeck/blueprints/emaildeck-init/TODO.md`), add `- [ ] mark-to-delete` to the `## ACTIONS` menu list in both mock message-card `TODO.md` heredocs — `mail-inbox/mock-email-card/TODO.md` (the list ending ~line 352) and `drafts/mock-email-card/TODO.md` (the list ending ~line 268). Place it immediately after the `- [ ] archive` line in each list.
  > `drafts/` mock already had it; added to `mail-inbox/` mock after `- [ ] archive`.

- [x] In `decks/emaildeck/blueprints/emaildeck-add-filter/TODO.md`, update the message-card scaffolding instruction (line 34) so the `## ACTIONS` section also gets `- [ ] mark-to-delete`. Change the trailing clause "always append `- [ ] archive` to the `## ACTIONS` section" so it appends both `- [ ] archive` and `- [ ] mark-to-delete` (mark-to-delete immediately after archive).
  > Updated — scaffold line now appends both archive and mark-to-delete.

- [x] Document `mark-to-delete` as an available filter default task in `decks/emaildeck/energy-cards/FILTER.md.template`. Extend the `## Default Tasks` guidance comment (lines 15–16) to note that `BOT: mark-to-delete` is available for filters whose mail is reliably junk. Do not change the `{{DEFAULT_TASKS}}` substitution placeholder itself.
  > Added third line to guidance comment listing available BOT actions including mark-to-delete.

- [x] Commit the changes: `git add decks/emaildeck && git commit -m "emaildeck: add mark-to-delete action"`.
  > Committed as c39c89b.

## HUMAN

- [ ] Should "mark-to-delete" be a per-message action (user manually triggers) or a filter default (auto-applies to all messages from that filter)?
  > _kemps:_ Both — implement it primarily as a per-message **action** (mirrors the existing `archive` action), so it lives in each message card's `## ACTIONS` menu and the user moves `- [ ] mark-to-delete` into `## BOT` to fire it. Then *also* allow it as a filter `## Default Tasks` entry (`BOT: mark-to-delete`) for filters whose mail is reliably junk, so it auto-populates every new message card. This matches how `archive` works today and avoids hard-coding deletion as always-on.

- [ ] How should the DELETE label be managed — should it exist in Gmail before first use, or auto-created by flowdeck?
  > _kemps:_ Auto-created, following the existing label pattern. The action should ensure the label exists via `mcp__claude_ai_Gmail__create_label` (idempotent — create-if-missing, same as the `emaildeck/creamdeck-contacts` setup in `emaildeck-init`), then apply it with `mcp__claude_ai_Gmail__label_thread`. Suggest namespacing the label as `emaildeck/DELETE` (or `emaildeck/marked-for-deletion`) rather than a bare `DELETE`, to stay consistent with the other emaildeck labels and preserve provenance. Don't require manual Gmail setup before first use.

- [ ] Where does the Gmail API integration live currently, and what's the precedent for adding new label operations?
  > _kemps:_ There is no local Gmail code — integration is the external Claude AI Gmail MCP (`mcp__claude_ai_Gmail__create_label`, `label_thread`, `search_threads`), invoked directly inside card `## BOT` task descriptions (no `$var` binding). Precedent for new label ops: the `archive` action in `decks/emaildeck/blueprints/emaildeck-init/TODO.md` (the ACTIONS.md scaffold, ~lines 75–198) — copy its shape. Add a new `## mark-to-delete` action there (apply the DELETE label + delete the local message-card folder), add it to `FILTER.md`'s `## Default Tasks` as an optional default, and document it in the emaildeck ACTIONS reference. **Edit `decks/emaildeck/`, never `.flowdeck/` (the runtime copy is gitignored and overwritten on reinstall).** Note: define the failure order — apply the Gmail label *first*, then delete the local `.md` card, so a label failure leaves the card intact for retry rather than losing the record.

#### COMMENTS

**What this involves:**
- Extend emaildeck's action system to support a "mark-to-delete" action for both per-message use and as a filter default
- Action must: (1) apply `emaildeck/DELETE` label via Gmail API (auto-create if missing), (2) delete the local message card folder
- Mirroring existing `archive` action shape — editorial changes only, no new infrastructure

**Dependencies:**
- emaildeck action pattern (follows `archive` precedent in `decks/emaildeck/blueprints/emaildeck-init/TODO.md`)
- External Claude AI Gmail MCP (`mcp__claude_ai_Gmail__create_label`, `label_thread`) — already used, no new integration needed
- Message card folder structure under `mail-inbox/` and `drafts/`

**Resolved (from HUMAN answers):**
- ✓ Per-message action AND filter default (both — mirroring archive's dual use)
- ✓ DELETE label auto-created via `mcp__claude_ai_Gmail__create_label` (idempotent, namespaced as `emaildeck/DELETE`)
- ✓ Gmail API via external MCP invocation in card `## BOT` sections (no local code needed)
- ✓ Atomicity: apply label *first*, then delete folder — if label fails, card survives for retry
- ✓ Default tasks are static, defined in blueprints (no runtime resolution needed)

**Implementation footprint** (5 locations in `decks/emaildeck/`):
1. `blueprints/emaildeck-init/TODO.md` — add `## mark-to-delete` action to ACTIONS.md heredoc (~line 157)
2. Same file — insert action into 2 mock message-card TODO.md lists (mail-inbox ~352, drafts ~268)
3. `blueprints/emaildeck-add-filter/TODO.md` — scaffold the action into new message cards (line 34)
4. `energy-cards/FILTER.md.template` — document mark-to-delete as available filter default (lines 15–16)
5. Final commit: `git add decks/emaildeck && git commit -m "emaildeck: add mark-to-delete action"`

<!-- tokens 2026-06-23 flash: in=114 out=4574 -->
<!-- tokens 2026-06-23 kemps: in=8290 out=4244 -->
<!-- tokens 2026-06-23 deal: in=8439 out=13944 -->
<!-- tokens 2026-06-23 flash: in=42 out=3340 -->
<!-- tokens 2026-06-23 play: in=10 out=4015 -->
