# on emaildeck add a default action for email messages 'mark to delete'; this command will dicard the md message and add a label DELETE on gmail 

## BOT

- [ ] 

## HUMAN

- [ ] Should "mark-to-delete" be a per-message action (user manually triggers) or a filter default (auto-applies to all messages from that filter)?
  > _kemps:_ Both — implement it primarily as a per-message **action** (mirrors the existing `archive` action), so it lives in each message card's `## ACTIONS` menu and the user moves `- [ ] mark-to-delete` into `## BOT` to fire it. Then *also* allow it as a filter `## Default Tasks` entry (`BOT: mark-to-delete`) for filters whose mail is reliably junk, so it auto-populates every new message card. This matches how `archive` works today and avoids hard-coding deletion as always-on.

- [ ] How should the DELETE label be managed — should it exist in Gmail before first use, or auto-created by flowdeck?
  > _kemps:_ Auto-created, following the existing label pattern. The action should ensure the label exists via `mcp__claude_ai_Gmail__create_label` (idempotent — create-if-missing, same as the `emaildeck/creamdeck-contacts` setup in `emaildeck-init`), then apply it with `mcp__claude_ai_Gmail__label_thread`. Suggest namespacing the label as `emaildeck/DELETE` (or `emaildeck/marked-for-deletion`) rather than a bare `DELETE`, to stay consistent with the other emaildeck labels and preserve provenance. Don't require manual Gmail setup before first use.

- [ ] Where does the Gmail API integration live currently, and what's the precedent for adding new label operations?
  > _kemps:_ There is no local Gmail code — integration is the external Claude AI Gmail MCP (`mcp__claude_ai_Gmail__create_label`, `label_thread`, `search_threads`), invoked directly inside card `## BOT` task descriptions (no `$var` binding). Precedent for new label ops: the `archive` action in `decks/emaildeck/blueprints/emaildeck-init/TODO.md` (the ACTIONS.md scaffold, ~lines 75–198) — copy its shape. Add a new `## mark-to-delete` action there (apply the DELETE label + delete the local message-card folder), add it to `FILTER.md`'s `## Default Tasks` as an optional default, and document it in the emaildeck ACTIONS reference. **Edit `decks/emaildeck/`, never `.flowdeck/` (the runtime copy is gitignored and overwritten on reinstall).** Note: define the failure order — apply the Gmail label *first*, then delete the local `.md` card, so a label failure leaves the card intact for retry rather than losing the record.

#### COMMENTS

**What this involves:**
- Extend emaildeck's default task system to support a "mark-to-delete" action
- Action must: (1) delete the message card's .md file, (2) apply a DELETE label in Gmail
- Requires understanding current emaildeck task execution model and Gmail API integration

**Dependencies:**
- emaildeck filter card architecture (how default tasks are populated and executed)
- Gmail API label-application mechanism (likely already exists for other filters)
- Whether the DELETE label exists in Gmail or needs auto-creation

**Risks & unknowns:**
- Is this a per-message action (user clicks a button) or a filter default (auto-applied to all messages)?
- How are current emaildeck default tasks executed — are they static or dynamically resolved at runtime?
- Error handling: if Gmail API succeeds but file deletion fails (or vice versa), what's the recovery?
- Atomicity: should both operations complete or roll back together?
- Does flowdeck have a mechanism for invoking Gmail API calls, or does this need to be scaffolded?

<!-- tokens 2026-06-23 flash: in=114 out=4574 -->
<!-- tokens 2026-06-23 kemps: in=8290 out=4244 -->
