---
license: CC-BY-SA-4.0
name: "playbook-author"
type: skill
description: "Transforms repeatable work into PLAYBOOK.md workflows that coordinate humans, agents, and reusable skills."
use_when: "Use when an organizational process, procedure, or recurring activity should be represented as a human-and-agent workflow."
output_type: structure
tags: [playbooks, workflows, orchestration, human-agent, procedures]
related_skills: [human-skills-author]
---

# Skill: Playbook Author

## Overview

> Transform repeatable work into an outcome-oriented workflow that coordinates humans, AI agents, and reusable skills.

---

## Skill Description

Playbook Author converts an organizational process, recurring activity, procedure, or desired workflow into a PLAYBOOK.md.

A playbook defines the outcome, sequence, context, responsibilities, constraints, progression, recovery, verification, and completion of the work.

It does not duplicate reusable capability knowledge.

Human capabilities should reference HUMAN.md skills. Agent capabilities should reference SKILL.md skills. The playbook provides the context in which those capabilities are applied.

---

## Trigger Conditions

Invoke this skill when:

- A repeatable organizational process needs to be documented.
- Human and AI work must be coordinated toward a specific outcome.
- Several reusable skills need to be composed into a workflow.
- An existing SOP or runbook should become an mdblu PLAYBOOK.
- A recurring activity needs explicit ownership, progression, recovery, and completion criteria.
- A user describes "how we do this" rather than merely "how to do this skill."

---

## Input

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| workflow_source | text/document | Yes | Description, notes, SOP, procedure, conversation, or other source describing the work. |
| available_human_skills | list | No | HUMAN.md capabilities available for reuse. |
| available_agent_skills | list | No | SKILL.md capabilities available for reuse. |
| organization_context | text | No | Roles, policies, constraints, thresholds, approvals, tools, or other local context. |

---

## Output

| Field | Type | Description |
|-------|------|-------------|
| playbook | PLAYBOOK.md | Complete workflow following `templates/PLAYBOOK.md.template`. |
| missing_skills | list | Reusable capabilities required by the workflow but not found among the supplied skills. |

---

## Behavior

### Happy Path

1. Identify the concrete outcome the workflow is intended to produce.

2. Determine when the workflow starts and what constitutes completion.

3. Break the work into meaningful activities rather than excessively granular actions.

4. For every activity, determine who performs it:
   - HUMAN
   - AGENT
   - HUMAN + AGENT

5. Identify reusable capabilities required by each activity.

6. Match human capabilities to available HUMAN.md skills.

7. Match agent capabilities to available SKILL.md skills.

8. Reference matching skills instead of reproducing their instructions.

9. Keep organization-specific information in the playbook, including:
   - policies;
   - roles;
   - responsibilities;
   - approvals;
   - constraints;
   - thresholds;
   - business rules;
   - sequence;
   - context.

10. For each activity, define the expected result.

11. Explain what happens next after successful completion.

12. Explain what should happen when the activity fails.

13. Define escalation where responsibility must pass to another person, role, or process.

14. Define verification criteria.

15. Define observable completion criteria.

16. Populate the current `PLAYBOOK.md.template`.

17. Review the workflow end-to-end for missing steps, unclear ownership, duplicated skill knowledge, and dead ends.

### Edge Cases

- **Required human capability has no HUMAN.md:** Identify it under `missing_skills`. Do not silently embed a complete reusable skill inside the playbook.

- **Required agent capability has no SKILL.md:** Identify it under `missing_skills`. Keep necessary workflow context, but do not fabricate a canonical agent skill.

- **Activity requires human judgment assisted by AI:** Assign it to HUMAN + AGENT and make clear what remains the human's responsibility.

- **Source describes a reusable capability rather than a workflow:** Recommend HUMAN.md or SKILL.md instead of forcing it into PLAYBOOK.md.

- **Source contains only technical commands:** Preserve commands when they are genuinely required, but still identify ownership, expected result, progression, recovery, and verification.

- **Workflow contains organization-specific capability instructions:** Separate reusable capability knowledge from organizational context. Recommend creation of a HUMAN.md or SKILL.md where appropriate.

- **Responsibility is unclear:** Do not guess silently. Mark the unresolved ownership explicitly.

- **Workflow has no meaningful failure recovery:** Do not invent elaborate recovery procedures. Use simple escalation or stopping guidance where appropriate.

---

## Instructions

Given `workflow_source`, create a PLAYBOOK.md describing the repeatable workflow.

Start by identifying:

1. What outcome must this workflow produce?
2. What causes the workflow to start?
3. What must be true before it begins?
4. What are the meaningful activities?
5. Who performs each activity?
6. Which reusable capabilities does each activity require?
7. Which HUMAN.md or SKILL.md already provides those capabilities?
8. What organization-specific context affects each activity?
9. What result should each activity produce?
10. What happens next?
11. What happens when the activity fails?
12. When must work be escalated?
13. How is the final outcome verified?
14. What proves that the workflow is complete?

Classify every workflow activity as:

`HUMAN`
when the activity is performed by a person.

`AGENT`
when the activity can be performed by an AI agent using an available skill.

`HUMAN + AGENT`
when both participate or when AI assists an activity for which the human retains responsibility.

Do not duplicate reusable skill instructions inside the playbook.

For example, if the workflow requires negotiation and `communication/negotiation/HUMAN.md` exists, reference that skill and include only the context specific to this workflow.

Prefer:

"Use `communication/negotiation`.

The preferred contract duration is 12 months. The minimum acceptable duration is 6 months."

over:

"Listen actively, identify interests, determine your BATNA, make a proposal..."

when those instructions already belong to the Negotiation HUMAN skill.

Use `available_human_skills` and `available_agent_skills` to resolve capabilities.

When a reusable capability is required but unavailable, add it to `missing_skills`.

Do not invent organization-specific policies, approval limits, roles, contacts, or thresholds.

Use "What to do next" to express successful progression.

Use "If this fails" to express recovery.

Return a complete PLAYBOOK.md using the current `templates/PLAYBOOK.md.template`.

---

## Example

```text
Input:

Our account manager prepares a proposal after a discovery call.
AI reviews the proposal for clarity and missing information.
The account manager presents it to the client and negotiates the
commercial terms. Discounts above 10% require commercial director
approval. Once terms are agreed, operations creates the contract.

Available HUMAN skills:
- communication/presentation
- communication/negotiation
- communication/active-listening

Available AGENT skills:
- marketing/clarity-cta-optimization
- analysis/proposal-review

Output:

A PLAYBOOK.md containing:

1. HUMAN — Prepare proposal
   Uses relevant human skills and client-specific context.

2. AGENT — Review proposal
   Uses analysis/proposal-review.

3. HUMAN — Present proposal
   Uses communication/presentation.

4. HUMAN — Negotiate terms
   Uses communication/negotiation.
   Includes the organization-specific 10% approval threshold.

5. HUMAN or AGENT — Create contract
   Assigned according to the supplied organizational context.

The playbook references reusable skills rather than copying their
instructions.
````

---

## Dependencies

* Current `templates/PLAYBOOK.md.template`.
* Workflow source containing enough information to identify the intended outcome and activities.
* HUMAN.md and SKILL.md indexes when skill resolution is required.

---

## Notes

A playbook is not a large skill.

A skill describes a reusable capability.

A playbook composes capabilities within a specific context to produce a repeatable outcome.

Client-specific playbooks normally belong in the client's codebase. mdblu provides the convention, template, reusable skills, and authoring capabilities.

---

*Provided by [mdblu](https://github.com/ruco-dev/mdblu)*

---

*Made with [mdblu](https://github.com/ruco-dev/mdblu)*