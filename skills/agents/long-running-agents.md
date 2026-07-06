---
title: "Long-Running Agent Sessions"
type: skill
description: "Patterns for multi-session agent work — scoping in weeks, backlog-depth health metrics, plan-ahead discipline, dual-agent review loops, and context-compression artifacts that let a fresh agent resume."
use_when: "Use when scoping, planning, or executing multi-session agent work — tasks that span more than one conversation, multi-week implementation runs, or any context where the agent will exhaust context limits before the work is done."
output_type: patterns
tags: [agents, orchestration, context-management, multi-session, backlog, review-loop]
related_skills: [autonomous-knowledge]
---

# Skill: Long-Running Agent Sessions

**Author:** Ruco AI

## context
Pattern derived from published guidance on long-session agent runs, combined with the AI Bifurcation thesis and flowdeck's execution model.

---

## Core Principles

### 1. Scope in Weeks, Not Sessions

A session is an implementation unit. The task scope should be defined independently of how many sessions it takes. Define the scope first, then break it into session-sized cards.

**Anti-pattern:** "Let's refactor the auth layer today" → hits context limit, incomplete, next session has no context.
**Pattern:** "Auth layer refactor: 3-week scope. Week 1: audit. Week 2: rewrite. Week 3: migrate." Each week is a card or set of cards.

### 2. Backlog Depth as Health Metric

If the agent is never idle waiting for work, backlog depth is sufficient. If the agent finishes cards faster than humans write new ones, the bottleneck has shifted to plan quality, not execution. Measure both:

- **Completion rate** — cards completed per week
- **Authorship rate** — new cards authored per week

When completion rate consistently exceeds authorship rate, the human is the bottleneck. Invest in card-writing speed.

### 3. Plan Before the Agent Burns Through It

Write the plan document for the *next* card before the agent finishes the *current* card. The agent's execution speed is the baseline — plan quality must stay ahead of it.

For flowdeck: the `## BOT` section of the next card should be fully specified before `flowdeck play` on the current card starts.

### 4. Dual-Agent Review Loop

For every diff the "writer" agent produces, route it through a separate "reviewer" agent before accepting. The reviewer is read-only — it only reads, critiques, and flags. It does not suggest rewrites.

```
writer agent → produces diff
  → reviewer agent reads diff + original context
  → reviewer flags: logic errors, spec deviations, missing edge cases
  → human sees flagged items, decides to accept/reject
  → writer addresses flags (if any) before commit
```

This closes the quality loop without requiring human review of every line.

### 5. Context Compression Artifacts

Long runs hit context limits. Maintain compression artifacts that allow a new agent instance to resume without re-reading the full history:

| Artifact | Purpose |
|----------|---------|
| `AGENT.md` | Project context, decisions, current state |
| `CODEINDEX.md` (xtage) | Token-efficient codebase map |
| `REPO.md` (xtage) | Architecture and conventions |
| Completed card notes | `>` notes in `## BOT` items record what was done and why |

**Rule:** anything a future agent instance needs to do good work must exist in one of these artifacts. If it only lives in conversation history, it will be lost.

---

## Mapping to flowdeck

| Principle | flowdeck mechanism |
|-----------|-------------------|
| Scope in weeks | Card frontmatter `recurrence` or explicit scope note |
| Backlog depth | `_stock/` pile depth |
| Plan ahead | Human writes next card before current play finishes |
| Dual-agent review | Not yet implemented — `review:` step type is a gap |
| Compression artifacts | `AGENT.md` + xtage integration |

**Gap to address:** flowdeck has no built-in reviewer agent step. Candidate: add `review: true` to card frontmatter, which triggers a review pass after the BOT section completes.

---

## Checklist

- [ ] Task scope declared in weeks, not sessions or hours
- [ ] `_stock/` backlog has at least 2–3 ready cards at all times
- [ ] Next card's `## BOT` section written before current play ends
- [ ] `AGENT.md` updated at the end of each significant session with decisions and current state
- [ ] xtage chunks refreshed after major structural changes to the codebase
- [ ] Reviewer agent invoked for any diff touching core logic or interfaces
- [ ] Completed card `>` notes are substantive (what was done, any constraints discovered)
