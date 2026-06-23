# on emaildeck add a default action for email messages 'mark to delete'; this command will dicard the md message and add a label DELETE on gmail 

## BOT

- [ ] 

## HUMAN

- [ ] Should "mark-to-delete" be a per-message action (user manually triggers) or a filter default (auto-applies to all messages from that filter)?
  > _answer:_

- [ ] How should the DELETE label be managed — should it exist in Gmail before first use, or auto-created by flowdeck?
  > _answer:_

- [ ] Where does the Gmail API integration live currently, and what's the precedent for adding new label operations?
  > _answer:_

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

