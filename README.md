# mdblu

**A shared language for humans and AI agents.**

mdblu is an open collection of structured Markdown templates and reusable skills that standardize how humans and AI agents describe knowledge, capabilities, workflows, and software development work.

The goal is simple: make operational knowledge readable by humans, interpretable by AI, portable between tools, and easy to keep inside a codebase.

---

## The Problem

AI agents are powerful but context-starved.

Every session starts cold. Every handoff loses something. Teams document processes in inconsistent ways. Useful knowledge gets trapped in notes, chats, SOPs, courses, internal documents, and individual experience.

At the same time, humans increasingly work with AI agents, but most documentation was designed for either humans or machines, not both.

mdblu provides a common Markdown vocabulary for:

- describing what needs to be produced;
- describing reusable agent capabilities;
- describing reusable human capabilities;
- combining those capabilities into repeatable workflows;
- preserving context between humans and AI agents.

---

## Core Model

mdblu distinguishes between **capabilities** and **workflows**.

```text
SKILL.md
    reusable capability performed by an AI agent

HUMAN.md
    reusable capability performed by a human

PLAYBOOK.md
    contextual workflow combining human and agent capabilities
````

A skill explains **how to perform a capability**.

A playbook explains **when, why, in what order, and in what context capabilities are applied to achieve an outcome**.

For example:

```text
Human Skills
├── Negotiation
├── Presentation
├── Active Listening
└── Decision Making

Agent Skills
├── Proposal Review
├── Market Research
└── Content Analysis

                  ↓

            PLAYBOOK.md

        Prepare Investor Pitch
                  │
        ┌─────────┼─────────┐
        ↓         ↓         ↓
     HUMAN      AGENT     HUMAN
   Research    Review    Presentation
                            +
                       Negotiation
```

The reusable skills can be shared across many organizations.

The playbook contains the specific context in which an organization applies them.

---

## How It Works

mdblu has three main building blocks.

### Templates

Structured `.md` files describing documents such as specifications, missions, handoffs, human skills, and playbooks.

Templates contain explicit instructions for AI agents inside HTML comments. Those instructions are removed from the generated document.

Templates live in:

```text
/templates
```

### Skills

Reusable capabilities that change how a human or agent performs work.

A skill directory may contain:

```text
skill-name/
├── SKILL.md
└── HUMAN.md
```

`SKILL.md` describes how an AI agent performs the capability.

`HUMAN.md` describes how a human performs the capability and allows an AI agent to guide, coach, or assist that person.

Both files represent the same general capability from different actors' perspectives.

Either file may exist independently when the capability only makes sense for one actor.

Skills live in:

```text
/skills
```

### Playbooks

A `PLAYBOOK.md` describes a repeatable, outcome-oriented workflow.

Playbooks can coordinate:

* `HUMAN`
* `AGENT`
* `HUMAN + AGENT`

A playbook references reusable skills instead of duplicating them.

mdblu provides the **PLAYBOOK template and authoring conventions**, while actual organizational playbooks will normally live inside the codebase or knowledge base of the organization using them.

---

## Templates

| Template              | When to use                                                                         |
| --------------------- | ----------------------------------------------------------------------------------- |
| `SPEC.md`             | Plan a feature end-to-end before touching code                                      |
| `MISSION.md`          | Scope a single, concrete agent task                                                 |
| `MISSION-LOG.md`      | Persistent document covering the full mission lifecycle: brief → execution → report |
| `BOOTSTRAP.md`        | Decompose a SPEC into an ordered, tagged task list                                  |
| `OPEN-QUESTIONS.md`   | Surface blockers that only the developer can resolve                                |
| `CODING-NOTES.md`     | Establish conventions at the start of an implementation session                     |
| `CLAUDE.md`           | Give an AI agent the context and mdblu conventions needed for a repository          |
| `HANDOFF.md`          | Document v1 so another developer or agent can take it forward                       |
| `MISSION-REPORT.md`   | Close out a completed mission                                                       |
| `README.md`           | Generate a project README                                                           |
| `DEV.md`              | Generate a developer guide                                                          |
| `ARCHITECTURE.md`     | Document high-level system architecture                                             |
| `STRUCTURE.md`        | Document internal codebase layout                                                   |
| `ADR.md`              | Record a single architectural decision                                              |
| `HUMAN.md`            | Document a reusable human capability                                                |
| `PLAYBOOK.md`         | Define a repeatable human-and-agent workflow                                        |
| `SKILL.md`            | Document a reusable AI agent capability                                             |
| `SKILLS-README.md`    | Index skills in a domain                                                            |
| `TODO.md`             | Simple standalone task list                                                         |
| `GH-PROJECT.md`       | Define a GitHub Project with fields and items                                       |
| `ROADMAP.md`          | Document planned milestones and features                                            |
| `STATS.md`            | Capture recurring npm/GitHub metrics snapshots                                      |
| `AUDIT.md`            | Structured codebase audit with S/M/L scoring                                        |
| `BUYER-PERSONA.md`    | Generate a complete buyer persona from a product description                        |
| `FOLLOWER-PERSONA.md` | Profile a brand's online content audience and advocacy drivers                      |
| `USER-PERSONA.md`     | Profile the daily operator of a product                                             |
| `HIRE-PERSONA.md`     | Profile the ideal candidate for an open role                                        |
| `INVESTOR-PERSONA.md` | Profile the ideal investor for a fundraise                                          |
| `TEMPLATE.md`         | Author a new mdblu template                                                         |

All templates live in [`/templates`](templates/) and are open for contribution.

---

## Skills

Skills represent **reusable capabilities**.

They should remain useful across different projects, organizations, and workflows.

Examples:

```text
skills/
├── agents/
│   ├── autonomous-knowledge/
│   │   ├── SKILL.md
│   │   └── HUMAN.md
│   └── human-skills-author/
│       └── SKILL.md
│
├── communication/
│   ├── negotiation/
│   │   ├── SKILL.md
│   │   └── HUMAN.md
│   └── presentation/
│       ├── SKILL.md
│       └── HUMAN.md
│
└── marketing/
    └── aeo-ai-visibility/
        ├── SKILL.md
        └── HUMAN.md
```

### Agent Skills

`SKILL.md` describes a capability performed by an AI agent.

Examples:

* analyze a website for AI visibility;
* review a proposal;
* operate in critical mode;
* transform course notes into a HUMAN skill;
* author a PLAYBOOK.

### Human Skills

`HUMAN.md` describes a reusable capability performed by a person.

Examples:

* negotiation;
* presentation;
* active listening;
* decision making;
* research;
* sales discovery.

A HUMAN skill is not merely educational content.

It should contain enough structure for:

1. a person to understand and apply the skill;
2. an AI agent to guide that person through applying it.

Typical HUMAN.md sections include:

```text
Overview
When to Use This Skill
Key Principles
Preparation
Steps
What to do next
If this fails
Completion
Common Problems
Related Skills
```

Human skills can reference other human skills through relationships such as:

```yaml
requires:
  - communication/active-listening

related_skills:
  - communication/presentation
  - thinking/decision-making
```

This allows skills to form a reusable capability graph instead of becoming isolated documents.

---

## Human Skills Author

mdblu includes an agent skill for turning existing knowledge into HUMAN.md files.

Typical source material includes:

* class notes;
* course material;
* books;
* transcripts;
* documentation;
* interviews;
* practical experience.

The Human Skills Author does not merely summarize the material.

It identifies the reusable capability, separates **what a person needs to know** from **what a person needs to do**, extracts practical actions, identifies failure guidance, and connects the result to related skills.

Conceptually:

```text
source material
      ↓
identify capability
      ↓
separate KNOW from DO
      ↓
extract principles
      ↓
extract actions
      ↓
identify related skills
      ↓
HUMAN.md
```

This makes knowledge learned by a person reusable later by both that person and their AI agents.

---

## Playbooks

Skills describe reusable capabilities.

Playbooks combine those capabilities into a specific workflow.

For example, negotiation itself is a HUMAN skill:

```text
communication/negotiation/HUMAN.md
```

But negotiating an investment agreement may be part of a client-specific playbook:

```text
playbooks/
└── raise-investment/
    └── PLAYBOOK.md
```

That playbook might use:

```text
research
+
financial analysis
+
presentation
+
active listening
+
negotiation
```

A PLAYBOOK supplies the context that should not live inside reusable skills:

* organizational policies;
* responsibilities;
* sequence;
* approvals;
* thresholds;
* business rules;
* project-specific information;
* escalation paths;
* completion criteria.

### Example

```markdown
### Step 4: Negotiate Commercial Terms

**Performed by:** HUMAN

**Uses skills:**
- `communication/negotiation`

#### Context

The preferred agreement is 12 months.

The minimum acceptable duration is 6 months.

Discounts above 10% require commercial director approval.

#### What to do next

When the commercial terms are agreed, continue to contract preparation.

#### If this fails

If agreement cannot be reached within the approved limits,
escalate to the commercial director.
```

The playbook does not need to teach negotiation again.

That knowledge belongs in:

```text
communication/negotiation/HUMAN.md
```

---

## Playbook Author

mdblu includes an agent capability for transforming repeatable organizational work into PLAYBOOK.md workflows.

The Playbook Author:

1. identifies the desired outcome;
2. identifies the meaningful activities;
3. determines who performs each activity;
4. resolves reusable HUMAN and AGENT skills;
5. adds organization-specific context;
6. defines expected results;
7. defines what happens next;
8. defines recovery and escalation;
9. defines verification;
10. identifies missing skills.

Conceptually:

```text
organizational process
        ↓
identify outcome
        ↓
identify activities
        ↓
assign HUMAN / AGENT / HUMAN + AGENT
        ↓
resolve reusable skills
        ↓
add local context
        ↓
define progression + recovery
        ↓
PLAYBOOK.md
```

---

## Where Playbooks Live

mdblu provides:

```text
skills/
templates/
```

Reusable capabilities and conventions belong in mdblu.

Organization-specific playbooks normally belong in the organization or project's own repository.

Example:

```text
client-project/
├── src/
├── docs/
├── playbooks/
│   ├── publish-content/
│   │   └── PLAYBOOK.md
│   ├── qualify-sales-lead/
│   │   └── PLAYBOOK.md
│   └── deploy-production/
│       └── PLAYBOOK.md
└── ...
```

This keeps reusable knowledge separate from local operational context.

In short:

```text
mdblu
    teaches capabilities
    provides conventions
    provides templates

client codebase
    applies those capabilities
    contains organization-specific playbooks
```

---

## Task Tagging Convention

Templates that contain tasks or deliverables use `[BOT]` and `[HUMAN]`:

```markdown
- [ ] [BOT]: Implement authentication
- [ ] [HUMAN]: Review security model before deploying
```

* `[BOT]` means the task can be executed autonomously by an AI agent from the available context.
* `[HUMAN]` means the task requires human action, judgment, coordination, responsibility, or external input.

This convention allows workflow tools to identify responsibility without requiring template-specific parsing.

PLAYBOOK workflow ownership uses the more explicit actor convention:

```markdown
**Performed by:** HUMAN
```

```markdown
**Performed by:** AGENT
```

```markdown
**Performed by:** HUMAN + AGENT
```

Task tagging and playbook ownership are complementary.

---

## CLI

mdblu ships as an npm package with a CLI for scaffolding templates and skills into projects.

### Install

```bash
npm install -g mdblu
```

Or use without installing:

```bash
npx mdblu
```

### Templates

List available templates:

```bash
mdblu list
```

Download specific templates:

```bash
mdblu get SPEC.md MISSION.md
```

Download all templates:

```bash
mdblu get --all
```

Update already-scaffolded templates:

```bash
mdblu update
```

Pin to a specific release:

```bash
mdblu get SPEC --ref v3.0.0
```

Check what changed:

```bash
mdblu status
mdblu diff SPEC
```

### Skills

List skills:

```bash
mdblu skills list
```

Download a skill:

```bash
mdblu skills get <name>
```

Install a skill for Claude:

```bash
mdblu skills get <name> --claude
```

Download all skills:

```bash
mdblu skills get --all
```

---

## Agent Discovery

`mdblu get` can connect the mdblu conventions to the AI context used by a project.

For Claude Code, the project can import:

```text
@.mdblu/CLAUDE.md
```

This gives the agent access to the mdblu template catalog and guidance for selecting the appropriate document or capability.

The same conventions are designed to remain understandable by other AI tools even when their discovery mechanism differs.

---

## Usage

You can ask an AI agent directly for a document:

> "Write a SPEC for the new notifications system."

> "Create a MISSION-LOG for the authentication migration."

> "Turn these negotiation course notes into a HUMAN skill."

> "Create a PLAYBOOK for how our team qualifies inbound leads."

> "Use the negotiation HUMAN skill to help me prepare for this meeting."

> "Review this workflow and identify which HUMAN and AGENT skills it requires."

The agent selects the appropriate mdblu template or skill and produces a structured Markdown result.

---

## Design Principles

* **Human-readable first.** mdblu documents should remain understandable without specialized tooling.
* **Machine-interpretable structure.** Consistent Markdown conventions allow AI agents and workflow tools to reason about the documents.
* **Capabilities are reusable.** Skills should remain useful outside a single organizational workflow.
* **Context belongs in playbooks.** Organization-specific policies, roles, thresholds, and sequences should not pollute reusable skills.
* **Do not duplicate skills.** Playbooks reference capabilities instead of rewriting them.
* **Observable actions over vague instructions.** Prefer "write down three alternatives" over "understand your alternatives."
* **Natural progression.** Human-facing documents use "What to do next" rather than programming-style conditional syntax.
* **Explicit recovery.** "If this fails" explains how to recover without exposing implementation logic to non-technical users.
* **Human judgment remains human.** AI can assist, explain, suggest, and analyze without silently taking ownership of human decisions.
* **Fill every applicable section.** No unresolved placeholders in final documents.
* **Remove authoring comments from output.** HTML comments guide the model and are not part of the generated artifact.
* **Templates and agent guidance evolve together.** Changes to document conventions should also update the agent instructions that use them.

---

## Contributing

mdblu is intentionally open and collaborative.

Templates and skills are plain Markdown: readable, forkable, improvable, and easy to test in real workflows.

To contribute a new or improved template or skill:

```bash
mdblu propose my-template.md.template --when "Use when you need..."
```

Or contribute manually:

1. Fork the repository.
2. Add or edit the template or skill.
3. Update relevant agent discovery or selection guidance.
4. Regenerate the appropriate manifest.
5. Test the document with a real use case.
6. Open a pull request.

For HUMAN skills in particular, practical use is important.

A HUMAN.md should ideally be used, improved, and validated by people actually applying the capability before being treated as mature guidance.

---

## Repository Structure

```text
mdblu/
├── README.md
├── skills/
│   ├── README.md
│   ├── agents/
│   │   ├── human-skills-author/
│   │   │   └── SKILL.md
│   │   ├── playbook-author/
│   │   │   └── SKILL.md
│   │   └── ...
│   ├── marketing/
│   │   └── ...
│   ├── communication/
│   │   └── ...
│   └── ...
│
├── templates/
│   ├── HUMAN.md.template
│   ├── PLAYBOOK.md.template
│   ├── SKILL.md.template
│   └── ...
│
├── scripts/
└── .github/
```

---

## License

**Runtime** (`CLI`, `bin/`, `scripts/`): [Apache-2.0](LICENSE)

**Content** (`skills/`, `templates/`): [CC-BY-SA-4.0](LICENSE-CC-BY-SA-4.0)

Derivatives of templates or skills must be distributed under the same CC-BY-SA-4.0 license.
