---
license: CC-BY-SA-4.0
title: "Newsletter Digest"
type: skill
description: "Fetches unread newsletters from Gmail, distils project-relevant signals, and presents a triage digest with immediate-action options."
use_when: "Use when the agent is asked to process unread newsletters and surface insights relevant to active projects."
output_type: "structure"
tags: [content-ingestion, gmail, digest, triage, ai-workflow]
related_skills: []
---

# Skill: Newsletter Digest

**Date:** 2026-05-16
**Author:** ruco-ai

---

## Overview

> Reads all unread newsletters from Gmail, tags each `BOT-READ`, maps content to active projects, and emits a single triage digest MD with per-item action choices executed immediately on reply.

---

## Skill Description

This skill is a systematic content ingestion ritual. It replaces ad-hoc newsletter reading with a reproducible pipeline: fetch → tag → distil → triage. It is designed to run on demand (via a flowdeck `play digest` card) and produces one dated digest file per run. The triage vocabulary — Keep, Deep, Delete, Skill, AddCard, Tweet, ADR — is standardised across all digest runs, making the action layer reusable for future ingestion skills (e.g. arxiv-digest, github-trending).

The skill is most effective when the operator has a stable set of active projects with known relevance criteria — in this case: mcpster, sitegrow, flowdeck, mdblu, xtage, skillms.

---

## Trigger Conditions

Invoke this skill when:

- The operator asks to process, triage, or read unread newsletters
- A flowdeck card `cards/rituals/digest.md` is played via `play digest`
- The operator wants to clear inbox noise and extract project-relevant signals in one pass

---

## Input

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `gmail_query` | string | No | Gmail search query to scope newsletters. Default: `is:unread category:updates OR unsubscribe -label:BOT-READ` |
| `projects` | string[] | No | Active project names for relevance mapping. Default: `[mcpster, sitegrow, flowdeck, mdblu, xtage, skillms]` |
| `output_path` | string | No | Path to write the digest MD. Default: `digests/YYYY-MM-DD.md` in the flowdeck repo |

---

## Output

| Field | Type | Description |
|-------|------|-------------|
| `digest_file` | markdown file | Dated digest with one section per newsletter, relevance mapping, and triage action blocks |
| `bot_read_label` | gmail label | Applied to every processed thread |
| `action_labels` | gmail labels | `TO-READ`, `DELETE` applied per operator choice |
| `secondary_artifacts` | files | Optional: deep MD, SKILL.md file, flowdeck card, tweet draft, ADR — created per operator choice |

---

## Behavior

### Happy Path

1. **Ensure labels exist.** Check Gmail for `BOT-READ`, `TO-READ`, `DELETE`. Create any missing via `create_label`. Cache IDs for the session.

2. **Fetch unread newsletters.** Run `search_threads` with the resolved `gmail_query`. Fetch all pages until exhausted. For each thread, call `get_thread` to retrieve the full body of the latest message.

3. **Tag immediately.** Apply `BOT-READ` label to each thread as it is read — before processing — so a partial run never leaves threads unlabelled.

4. **Filter for signal.** Discard threads with no body content or that are purely transactional (receipts, auth codes, calendar invites). Flag any thread where the body is >10k tokens for truncation with a note.

5. **Map to projects.** For each newsletter, identify which of the active projects the content is relevant to. A newsletter can map to multiple projects. If no project match is found, mark as `relevance: low` but still include it in the digest.

6. **Write digest file.** Produce a single dated MD at `output_path`. Structure: one `## [Newsletter Name]` section per item, containing: sender, date, relevance tags, a 3–5 sentence distillation, and the triage action block (see Output Format below).

7. **Execute actions immediately.** When the operator replies with a choice (or choices) for a given item, execute the corresponding action before moving to the next item. Do not batch.

### Edge Cases

- **No unread newsletters found:** Write a digest file noting zero items processed. Do not error.
- **Thread body is HTML-heavy with minimal text:** Extract text nodes only; skip image-only newsletters with a note.
- **Operator provides a comment with AddCard but doesn't specify project:** Infer from the newsletter's relevance mapping. If ambiguous, ask once before creating.
- **Gmail rate limits:** Pause 1s between `get_thread` calls if batch >20 threads.
- **Label creation fails (already exists):** Treat as success; use the existing label ID.

---

## Instructions

Given the active `projects` list and Gmail access, perform the following:

1. Call `list_labels` and collect IDs for `BOT-READ`, `TO-READ`, `DELETE`. For any missing label, call `create_label` with a neutral grey color and store the returned ID.

2. Call `search_threads` with `gmail_query` (default: `is:unread (unsubscribe OR newsletter OR digest) -label:BOT-READ`), paginating until all results are collected.

3. For each thread:
   a. Call `get_thread` to fetch the latest message body.
   b. Immediately apply `BOT-READ` via `label_thread`.
   c. Extract: sender name, sender email, send date, subject, plain-text body (strip HTML tags, collapse whitespace).
   d. Score relevance: for each project in `projects`, emit a relevance tag if the content touches that project's domain. Use the project descriptions from AGENT.md context.
   e. Write a 3–5 sentence distillation focused on the relevant signals. Omit generic filler.

4. Assemble the digest MD using the Output Format below.

5. Write the file to `output_path`. Report the file path and item count in your text response — do not print the digest table itself to the console.

6. For each item the operator acts on, execute the action immediately:
   - **Keep** → apply `TO-READ` label via `label_thread`
   - **Deep** → create `digests/deep/YYYY-MM-DD-[slug].md` with expanded analysis + web-search-enriched context; accept operator comment as focus directive
   - **Delete** → apply `DELETE` label via `label_thread`
   - **Skill** → before writing anything, do two things in sequence:
     1. **Check visibility** — ask the operator: "Public (`skills/`) or private (`private-skills/`)?" Wait for the answer.
     2. **Check for an existing file** — read `skills://index`; if a skill already covers this domain (same `tags` or overlapping `use_when`), ask the operator: "Add to `[EXISTING.md]` or create a new file?" Wait for the answer.
     Then scaffold using the mdblu SKILL.md template, populated from the newsletter content; accept operator comment as scope directive; call `write_skill` with `private: true` if the operator chose private.
   - **AddCard** → create a flowdeck BOT/HUMAN card in the inferred project folder; accept operator comment as card brief; write to `flowdeck/cards/[project]/[slug].md`
   - **Tweet** → draft a tweet or thread (≤3 tweets) from the item's key insight; write to `digests/tweets/YYYY-MM-DD-[slug].md`
   - **ADR** → scaffold an ADR using the mdblu ADR template if the item surfaces a decision for one of the active projects; write to `[project]/docs/adr/YYYY-MM-DD-[slug].md`

Return the digest file path and a summary of actions taken.

---

## Output Format

```markdown
# Newsletter Digest — YYYY-MM-DD

_N newsletters processed. Labels applied: BOT-READ._

---

## [Newsletter Name] — [Subject]

**From:** sender@example.com  
**Date:** YYYY-MM-DD  
**Relevance:** mcpster, mdblu

[3–5 sentence distillation focused on project-relevant signals.]

**Actions:**
- [ ] Keep — add TO-READ label
- [ ] Deep — expanded MD with complementary research _(comment: ...)_
- [ ] Delete — add DELETE label
- [ ] Skill — create skillms skill _(visibility: public|private) (target: new|existing file) (comment: ...)_
- [ ] AddCard — create flowdeck card _(comment: ...)_
- [ ] Tweet — draft tweet/thread
- [ ] ADR — scaffold architectural decision record

---
```

---

## Example

```
Input:
  gmail_query: "is:unread (unsubscribe OR newsletter) -label:BOT-READ"
  projects: [mcpster, sitegrow, flowdeck, mdblu, xtage, skillms]

Output (digest excerpt):
  ## TLDR Newsletter — "MCP gains HTTP streaming support in spec v2.1"

  **From:** tldr@tldr.tech
  **Date:** 2026-05-14
  **Relevance:** mcpster, flowdeck

  The MCP spec v2.1 draft adds native HTTP streaming support,
  deprecating the SSE workaround currently used by most server
  implementations. The change is backward-compatible but requires
  servers to advertise a new capability flag. Relevant to mcpster's
  transport layer and flowdeck's planned ACP-style HTTP API.

  **Actions:**
  - [ ] Keep
  - [x] Deep _(comment: focus on transport migration path for mcpster)_
  - [ ] Delete
  - [x] Skill _(visibility: public) (target: new) (comment: MCP transport patterns)_
  - [x] AddCard _(comment: mcpster — evaluate HTTP streaming upgrade)_
  - [ ] Tweet
  - [ ] ADR
```

---

## Dependencies

- Gmail MCP (`gmailmcp.googleapis.com`) — thread search, label management, body fetch
- mdblu MCP (`mdblu.fly.dev`) — SKILL.md and ADR templates for Skill and ADR actions
- flowdeck repo filesystem — for writing cards and digest files

---

## Notes

- The `DELETE` label does not delete email. It marks threads for the operator to bulk-delete manually — preserving human control over permanent actions.
- Deep dives may invoke web search to enrich context; this is at agent discretion based on the operator's comment.
- This skill is intentionally stateless: Gmail labels carry all state between runs. Re-running the skill on the same inbox is safe.

---

*Made with [mdblu](https://github.com/ruco-dev/mdblu)*
