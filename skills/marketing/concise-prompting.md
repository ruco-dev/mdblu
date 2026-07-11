---
license: CC-BY-SA-4.0
title: "Concise Prompting — Token-Efficient AI Communication"
type: skill
description: "Strips non-informational content from LLM interactions — pleasantries, re-statements, hedging, trailing summaries — to reduce token usage ~65% without losing technical accuracy."
use_when: "Use when authoring skills, writing CLAUDE.md instructions, building prompts for agent loops, or whenever token efficiency matters and verbose AI responses are a friction or cost concern."
output_type: style-guide
tags: [prompting, token-efficiency, meta-skill, agent-loops, communication, claude-code]
related_skills: []
---

# Skill: Concise Prompting — Token-Efficient AI Communication

**Date:** 2026-05-19
**Author:** Ruco AI

---

## Overview

> Strips non-informational content from LLM interactions to reduce token usage ~65% without losing technical accuracy. Applies to skill files, CLAUDE.md instructions, agent prompts, and any context where brevity compounds across many calls.

---

## Skill Description

Most LLM responses contain 30–40% non-informational content: greetings, hedging phrases, re-statements of the question, and trailing summaries of what was just said. Removing this does not reduce technical quality — it produces responses that read like a senior engineer, not an eager assistant.

This skill encodes the rules from the Caveman pattern (open-source, 11k+ stars), which achieves ~65% average token reduction across Claude Code, Codex, and Gemini CLI interactions.

At agent-loop scale, the saving compounds: 100 tool calls at 500 tokens each → 50,000 tokens → 17,500 tokens with compression.

---

## Trigger Conditions

Invoke this skill when:

- Writing a new skill file — apply these rules to the skill's own instructions
- Writing CLAUDE.md instructions for a project — include the concise-communication directive
- Building a prompt for an agent loop where the same prompt runs hundreds of times
- Token cost or latency is a visible concern in the workflow

---

## Input

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| context | string | Yes | The text to compress — a prompt, skill instruction, CLAUDE.md section, or response template |
| target | string | No | `skill` \| `claude-md` \| `prompt` \| `response` — shifts which rules apply most heavily |

---

## Output

| Field | Type | Description |
|-------|------|-------------|
| compressed | string | The compressed version of the input |
| rules_applied | array | Which rules were applied and what was removed |
| token_delta | string | Estimated token reduction (approximate) |

---

## Behavior

### The six compression rules

Apply all six unless a specific rule conflicts with the target context:

**1. No pleasantries.**
Remove: "I'll help with that", "Great question", "Certainly!", "Of course", "Happy to assist", "Sure thing".
These add 5–15 tokens per response and carry zero information.

**2. No re-statement.**
Do not repeat the user's question before answering it. Start with the answer.
Bad: "You asked how to configure X. To configure X, you should..."
Good: "Configure X by..."

**3. No trailing summaries.**
Do not summarize what was just written. If the answer was clear, a summary adds noise.
Bad: "...so in summary, the three key points are A, B, and C."
Good: End on the last substantive point.

**4. Imperative, not hedging.**
Use direct instructions instead of suggestions with uncertainty markers.
Bad: "You might want to consider using X, as it could potentially help with Y."
Good: "Use X for Y."
Reserve hedging for genuine uncertainty: "This may fail if the API rate-limits before step 3."

**5. Omit the obvious.**
If the reader can infer it from context, don't write it. Trust the reader.
Bad: "First, make sure you have Node.js installed. Node.js is a JavaScript runtime."
Good: (Skip if the reader is a developer)

**6. Code > prose.**
When explaining a technical pattern, lead with a working example. Follow with explanation only if the code isn't self-documenting.
Bad: "To create a new tool, you instantiate the Tool class and pass a config object with the name, description, and handler function."
Good: `const tool = new Tool({ name: 'my-tool', description: '...', handler: async (args) => { ... } })`

### Applying to skill files

When writing or reviewing a skill file, apply these rules to:
- The `## Behavior` section instructions — prefer numbered steps over prose paragraphs
- The `## Instructions` section — imperative mood throughout, no re-statement of the skill description
- The `## Notes` section — trim to non-obvious gotchas only; if it's obvious, delete it

### Applying to CLAUDE.md

Add this directive to any project CLAUDE.md to apply the style globally:

```
## Communication style

Respond concisely: no pleasantries, no re-statements of the question, no trailing summaries.
Use imperative mood. Prefer code examples over prose explanations. Omit the obvious.
```

### Applying to agent prompts

For prompts that run in loops (tool descriptions, system prompts for background agents):
- Cut every sentence that doesn't add a constraint or instruction
- Replace "when you receive X, you should Y" with "on X: Y"
- Replace enumerated prose with a table or bullet list

---

## Instructions

Given `context` and optional `target`:

1. Identify non-informational segments: pleasantries, re-statements, hedging phrases, trailing summaries.
2. Remove or replace them using the six rules above.
3. Verify no technical content was lost — the compressed version must be semantically equivalent.
4. Return `compressed`, `rules_applied` (list of rules triggered with examples of what was removed), and `token_delta` (approximate reduction percentage).

If `target` is `claude-md`, also prepend the standard concise-communication directive block.

---

## Example

```
Input:
  context: |
    Certainly! I'd be happy to help you with configuring the mcpster deploy CLI.
    You asked how to set up Railway deployment. To set up Railway deployment, you need to
    follow these steps. First, you'll want to make sure you have the Railway CLI installed.
    Next, you might consider running `npx mcpster deploy --target railway`. This should
    hopefully deploy your MCP server. In summary, the key thing to remember is to have
    Railway CLI installed before running the deploy command.
  target: response

Output:
  compressed: |
    Install Railway CLI first, then run:
    ```
    npx mcpster deploy --target railway
    ```
  rules_applied:
    - "No pleasantries: removed 'Certainly! I'd be happy to help you'"
    - "No re-statement: removed 'You asked how to set up Railway deployment'"
    - "Imperative: 'you'll want to' → 'Install'"
    - "Hedging removed: 'might consider', 'should hopefully'"
    - "No trailing summary: removed 'In summary...' sentence"
    - "Code > prose: replaced procedural description with command"
  token_delta: "~72% reduction (approx. 95 tokens → 27 tokens)"
```

---

## Dependencies

None. This is a style and prompting skill — no external services required.

---

## Notes

The single most common failure mode when applying this skill: removing hedging from statements that are genuinely uncertain. Keep hedging when the uncertainty is real and the reader needs to know ("this may fail if..."). Remove hedging when it's reflexive verbal padding ("you might want to consider...").

Compression compounds in agent loops. A 65% reduction on a 200-token system prompt saves 130 tokens per call. At 1,000 calls: 130,000 tokens. At Sonnet pricing ($3/M input): $0.39 saved. Trivial per run, but across all projects using the skill, adds up fast.

---

*Made with [mdblu](https://github.com/ruco-ai/mdblu) · source: `templates/SKILL.md.template`*
