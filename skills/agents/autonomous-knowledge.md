---
license: CC-BY-SA-4.0
title: "Autonomous Knowledge Evolution"
type: skill
description: "Patterns for a knowledge base or intelligence layer that improves without continuous human input — scheduled incubation loops, domain watch, and insight-interview gating that reduce drift and hallucination."
use_when: "Use when building or operating a knowledge base, skill library, or intelligence layer that should improve without continuous human input — cron-driven analysis, pattern recognition across accumulated notes, or self-reinforcing feedback loops in AI agent / PKM systems."
output_type: patterns
tags: [agents, knowledge-base, automation, cron, pkm, self-improvement, incubation]
related_skills: [long-running-agents]
---

# Skill: Autonomous Knowledge Evolution

**Author:** Ruco AI

## context
Pattern derived from a PKM system with autonomous incubation, domain watch, and insight-interview capabilities deployed on self-hosted Docker agent fleets.

---

## Core Capabilities

### 1. Incubation Loop
A scheduled process that runs analytical moves on accumulated knowledge without user presence. The loop rotates through a set of analytical lenses:

- **Bayesian update** — treat new notes as evidence; update confidence on existing beliefs
- **Steelmanning** — find the strongest version of a weak or contested idea in the KB
- **ACH (Analysis of Competing Hypotheses)** — generate alternative explanations for a pattern in the KB
- **Cross-domain transfer** — identify structural analogies between domains in the KB

**Implementation pattern:**
```
cron: every N hours
  for each analytical_move in rotation:
    select: recently_added_notes + high_resonance_existing_notes
    apply: analytical_move
    write: incubation_output to KB with metadata.type = "incubation"
    flag: high-confidence insights for human review
```

Research basis: hypnagogic state studies cite 83% insight rate vs 30% for wakefulness — incubation between active sessions produces disproportionate signal.

### 2. Domain Watch
The system scans the KB for new content matching declared interest areas. When resonance exceeds a threshold, it auto-activates the finding for the next session.

**Key design decisions:**
- Interest areas are declared explicitly (not inferred) to avoid drift
- Resonance is scored relative to existing KB density in that area (not absolute relevance)
- High-resonance findings are surfaced as `## HUMAN` items in the next turn/session

### 3. Insight Interview
Before asking the agent a question about a topic, the system performs a Socratic dialogue grounded in existing KB notes. No question reaches the LLM before the KB has been consulted.

**Pattern:**
```
user_question → KB lookup → gap analysis → clarifying questions from KB
→ refined question → LLM response grounded in KB context
```

This reduces hallucination by anchoring responses in accumulated knowledge before adding new inference.

---

## Application to xtage

xtage's CODEINDEX.md and per-file chunks are a codebase KB. The autonomous patterns map as:

| Autonomous pattern | xtage equivalent |
|-----------|-----------------|
| Incubation loop | Scheduled re-analysis of CODEINDEX to detect drift from recent commits |
| Domain watch | Watch declared "interest areas" in REPO.md (e.g. auth layer, API surface) |
| Insight interview | Read CODEINDEX before any code question, not raw files |

**Practical xtage extension:** add a `~/xtage/{repo}/INCUBATION.md` file updated by a scheduled pass that surfaces cross-file patterns the agent should be aware of for the next session.

## Checklist

- [ ] Declare interest areas explicitly before enabling domain watch
- [ ] Incubation outputs tagged with metadata (lens used, confidence, source notes)
- [ ] High-resonance findings surfaced as actionable items, not passive observations
- [ ] Insight interview gates every LLM call on KB consultation first
- [ ] Schedule incubation at low-activity windows (off-peak, not during active sessions)
- [ ] Cap incubation output rate to prevent KB pollution (max N insights per run)
