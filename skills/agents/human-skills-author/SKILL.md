---
license: CC-BY-SA-4.0
name: "human-skills-author"
type: skill
description: "Transforms source knowledge into reusable HUMAN.md capabilities that people can apply with AI assistance."
use_when: "Use when notes, lessons, books, transcripts, documentation, or experience should be converted into a reusable human skill."
output_type: structure
tags: [human-skills, knowledge, learning, procedures, authoring]
related_skills: [playbook-author]
---

# Skill: Human Skills Author

## Overview

> Transform knowledge about how people perform a capability into a reusable HUMAN.md skill.

---

## Skill Description

Human Skills Author converts source material such as class notes, course transcripts, books, documentation, interviews, or practical experience into a structured HUMAN.md.

The objective is not to summarize the source. The objective is to identify the human capability contained in the source and represent it so that a person can apply it directly and an AI agent can guide that person through applying it.

The skill separates knowledge that must be understood from actions that must be performed, preserves important nuance, identifies relationships with other human skills, and follows the HUMAN.md template.

---

## Trigger Conditions

Invoke this skill when:

- A user asks to turn class or course notes into a human skill.
- Source material teaches a reusable capability rather than only describing a topic.
- Knowledge from a book, transcript, lesson, interview, or document should become actionable.
- An existing HUMAN.md needs to be created from unstructured knowledge.
- A capability needs to be extracted from a larger body of material.

---

## Input

| Parameter       | Type          | Required | Description                                                                                           |
| --------------- | ------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| source_material | text/document | Yes      | Notes, transcript, book extract, documentation, interview, or other source containing the capability. |
| skill_context   | text          | No       | Additional information about the intended capability, audience, or domain.                            |
| existing_skills | list          | No       | Existing HUMAN skills that may be referenced as prerequisites or related capabilities.                |

---

## Output

| Field       | Type     | Description                                                   |
| ----------- | -------- | ------------------------------------------------------------- |
| human_skill | HUMAN.md | Complete human skill following `templates/HUMAN.md.template`. |

---

## Behavior

### Happy Path

1. Read the complete source material before deciding the skill structure.

2. Identify what the source teaches a person to **do**, not merely what topic it discusses.

3. Determine whether the source represents one coherent human capability.

4. Define the capability independently of the specific example or situation used to teach it.

5. Separate the source into:
   - principles and knowledge required to perform the skill;
   - preparation required before applying it;
   - observable actions;
   - progression between actions;
   - recovery guidance;
   - completion criteria;
   - common problems;
   - relationships with other skills.

6. Preserve concepts, mental models, heuristics, warnings, and examples when they materially affect how the capability is performed.

7. Convert actionable knowledge into clear steps.

8. Prefer observable actions over internal mental states.

9. Express progression using "What to do next".

10. Express recovery using "If this fails".

11. Identify prerequisite and related HUMAN skills without duplicating their content.

12. Populate the current `HUMAN.md.template`.

13. Review the result from two perspectives:
    - Can a person use this to perform the capability?
    - Can an AI use this to guide that person?

### Edge Cases

- **Source contains several distinct capabilities:** Do not force them into one HUMAN.md. Identify the candidate skills and separate them when they are independently reusable.

- **Source is mostly conceptual:** Preserve useful principles and create practical steps only where the source supports them. Do not fabricate a procedure to make the document appear actionable.

- **Source is mostly procedural:** Extract the reusable capability behind the procedure. Organization-specific sequences may belong in a PLAYBOOK rather than HUMAN.md.

- **Source contains organization-specific rules:** Separate reusable human capability from local policy. Keep the reusable capability in HUMAN.md and recommend that organization-specific workflow be represented in PLAYBOOK.md.

- **Source conflicts with another source:** Preserve the disagreement or context dependency. Do not silently select one position as universal truth.

- **Source does not contain enough information:** Produce only what the source supports and identify important gaps rather than inventing expertise.

- **No prerequisite skills are evident:** Leave the dependency relationship empty rather than manufacturing dependencies.

---

## Instructions

Given `source_material`, create a HUMAN.md representing the reusable human capability taught by the material.

First identify the capability.

Ask:

1. What will a person be able to do after learning this?
2. Is that capability reusable outside the immediate example?
3. Does the material describe one skill or several?
4. What must the person understand before acting?
5. What actions can be observed?
6. What commonly prevents successful application?
7. What should the person do next after each important action?
8. What should the person do when an action fails?
9. What observable evidence demonstrates successful application?
10. Which other HUMAN skills are prerequisites or useful complements?

Do not summarize the source section by section.

Do not transform headings from the source mechanically into steps.

Do not invent methods, thresholds, claims, rules, or best practices unsupported by the source.

Do not force conceptual material into artificial actions.

When converting knowledge into actions, prefer instructions such as:

"Write down the outcomes you would accept."

over:

"Understand your acceptable outcomes."

Keep HUMAN.md context-independent whenever possible.

If the source describes how a specific organization performs a sequence of work, identify that content as a candidate PLAYBOOK rather than embedding the organizational workflow into the human skill.

Use "What to do next" to express progression.

Use "If this fails" to express recovery.

Do not expose programming-style conditional logic to the human reader.

Use `existing_skills`, when provided, to identify reusable dependencies and related capabilities instead of duplicating them.

Return a complete HUMAN.md using the current `templates/HUMAN.md.template`.

---

## Example

```text
Input:

Course notes explain BATNA, reservation points, understanding the
other party's interests, preparing alternatives, making proposals,
and evaluating whether an agreement is preferable to walking away.

Output:

A HUMAN.md for "Negotiation" that:

- explains BATNA and interests under Key Principles;
- asks the person to identify objectives and alternatives during Preparation;
- converts proposal preparation and evaluation into observable Steps;
- explains what to do next after each stage;
- provides recovery guidance for stalled negotiations;
- defines observable completion criteria;
- references Active Listening and Decision Making as related skills.

It does not simply summarize the course notes.
```

---

## Dependencies

- Current `templates/HUMAN.md.template`.
- Source material containing the capability to extract.

---

## Notes

HUMAN.md represents reusable human capability.

Organization-specific workflows, policies, responsibilities, approvals, and sequences should normally be represented by PLAYBOOK.md.

A HUMAN skill may be useful without a corresponding agent SKILL.md.

---

_Made with [mdblu](https://github.com/ruco-dev/mdblu)_
