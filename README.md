# mdblu

**A shared language for humans and AI agents.**

mdblu is an open collection of structured Markdown templates that standardize how humans and AI agents communicate during software development — and an MCP server that makes those templates available to any AI tool, anywhere.

---

## The Problem

AI agents are powerful but context-starved. Every session starts cold. Every handoff loses something. Every team invents their own way to write specs, missions, and handoffs — and none of it is machine-readable.

mdblu fixes this by giving agents a common vocabulary: a set of templates that define *what to produce*, *when to produce it*, and *how to fill it in correctly*.

---

## How It Works

mdblu has two parts that work together:

**Templates** — Structured `.md` files for every phase of development: planning, implementation, handoff, documentation. Each template has explicit instructions for the AI embedded as HTML comments (stripped from final output).

**CLAUDE.md** — A meta-template that tells any AI agent *which* template to use and *when*. It's the decision layer that connects the right document to the right moment.

They are interdependent: adding or updating a template always means updating CLAUDE.md too.

---

## Templates

| Template | When to use |
|---|---|
| `SPEC.md` | Plan a feature end-to-end before touching code |
| `MISSION.md` | Scope a single, concrete agent task |
| `MISSION-LOG.md` | Persistent document covering the full mission lifecycle: brief → execution → report |
| `BOOTSTRAP.md` | Decompose a SPEC into an ordered, tagged task list |
| `OPEN-QUESTIONS.md` | Surface blockers that only the developer can resolve |
| `CODING-NOTES.md` | Establish conventions at the start of an implementation session |
| `CLAUDE.md` | Give any AI agent the minimal context it needs for a repo |
| `HANDOFF.md` | Document v1 so a developer can take it forward |
| `MISSION-REPORT.md` | Close out a completed mission |
| `README.md` | Generate a project README |
| `DEV.md` | Generate a developer guide |
| `ARCHITECTURE.md` | Document high-level system architecture |
| `STRUCTURE.md` | Document internal codebase layout |
| `ADR.md` | Record a single architectural decision |
| `PLAYBOOK.md` | Write a repeatable operational procedure |
| `SKILL.md` | Document a reusable AI agent capability |
| `SKILLS-README.md` | Index of skills in a domain subfolder |
| `TODO.md` | Simple standalone task list |
| `GH-PROJECT.md` | Define a GitHub Project with fields and items |
| `ROADMAP.md` | Document planned milestones and features |
| `STATS.md` | Capture recurring npm/GitHub metrics snapshots |
| `AUDIT.md` | Structured codebase audit with S/M/L scoring |
| `BUYER-PERSONA.md` | Generate a complete buyer persona from a product description |
| `FOLLOWER-PERSONA.md` | Profile a brand's online content audience and advocacy drivers |
| `USER-PERSONA.md` | Profile the daily operator of a product (distinct from the buyer) |
| `HIRE-PERSONA.md` | Profile the ideal candidate for an open role (candidate-centered) |
| `INVESTOR-PERSONA.md` | Profile the ideal investor for a fundraise |
| `TEMPLATE.md` | Author a new mdblu template |

All templates live in [`/templates`](templates/) and are open for contribution.

---

## Skills

Skills are reusable guidance documents that agents apply at runtime — they change behavior rather than produce a document.

| Domain | Contents |
|--------|----------|
| `skills/marketing/` | SEO, AEO, conversion, CRO, and content strategies |
| `skills/agents/` | AI agent design, behavior, and orchestration guidance |

Skills share the same manifest, contribution flow, and sha256 verification as templates.

```bash
mdblu skills get <name>           # installs to .mdblu/skills/<name>.md
mdblu skills get <name> --claude  # installs to .claude/skills/<name>/SKILL.md
mdblu skills get --all            # download all skills
```

Skills are licensed under [CC-BY-SA-4.0](https://creativecommons.org/licenses/by-sa/4.0/). Templates are too.

---

## Decks

Flowdeck domain-specific card collections (crunchdeck, emaildeck, gitdeck, and more) live in the [flowdeck](https://github.com/ruco-dev/flowdeck) repo. Install any deck into a project with:

```bash
flowdeck install <deck-name> --local
```

---

## Task tagging convention

Templates that include tasks or deliverables tag every item `[BOT]` or `[HUMAN]`:

```markdown
- [ ] [BOT]: Implement authentication
- [ ] [HUMAN]: Review security model before deploying
```

- `[BOT]` — implementable by an AI agent from the document alone
- `[HUMAN]` — requires human judgment, coordination, or external input

This convention is the contract between a filled document and any workflow tool that processes it. Workflow tools scan for this pattern to create issues, track progress, and sync state — they do not rely on a specific section name, so the pattern works across any template.

**When designing a new template:** if it has tasks, deliverables, or a step sequence, use the `[BOT]`/`[HUMAN]` checkbox format. This makes the template processable by tools without any template-specific parsing logic.

---

## CLI

mdblu ships as an npm package with a CLI for scaffolding templates directly into any project.

### Install

```bash
npm install -g mdblu
# or use without installing:
npx mdblu
```

### Commands

**List available templates:**

```bash
mdblu list
```

**Download specific templates:**

```bash
mdblu get SPEC.md MISSION.md
```

Downloads the named templates into `.mdblu/templates/` and writes a `CLAUDE.md` stub to `.mdblu/CLAUDE.md`.

**Download all templates:**

```bash
mdblu get --all
```

**Update already-scaffolded templates** (skips locally edited files):

```bash
mdblu update
```

**Pin to a specific release:**

```bash
mdblu get SPEC --ref v3.0.0
```

**Check what changed since you last scaffolded:**

```bash
mdblu status
mdblu diff SPEC
```

**Download skills:**

```bash
mdblu skills list
mdblu skills get <name>           # writes to .mdblu/skills/<name>.md
mdblu skills get <name> --claude  # writes to .claude/skills/<name>/SKILL.md
mdblu skills get --all
```

**Contribute a new or improved template or skill:**

```bash
mdblu propose my-new-template.md.template --when "Use when you need..."
mdblu propose skills/marketing/my-skill.md
```

---

## Agent discovery

`mdblu get` automatically appends one line to your project's root `CLAUDE.md`:

```
@.mdblu/CLAUDE.md
```

Claude Code loads this import at the start of every session, giving the agent the full template catalog and selection guidance without any manual setup. Use `--no-claude-link` to opt out.

---

## Usage

Ask your AI agent to use a template by name:

> "Write a SPEC for the new notifications system."

> "Create a MISSION-LOG for the auth migration."

> "Generate a HANDOFF for what we built today."

The agent selects the right template, fills every section from your prompt, strips the HTML instructions, and returns a clean structured document.

---

## Contributing

mdblu is intentionally open and collaborative. Templates are plain Markdown — readable, forkable, improvable.

**To contribute a new template or improve an existing one:**

```bash
mdblu propose my-template.md.template --when "One-paragraph description of when to use it."
```

This validates conventions, forks the repo, and opens a PR under your own GitHub account — no server, no bot credentials.

Or contribute manually:

1. Fork the repo
2. Add or edit the template in `/templates`
3. Update `CLAUDE.md` — add or revise the entry that tells agents when and how to use the template
4. Run `node scripts/build-manifest.js` to regenerate `templates/index.json`
5. Open a PR

The rule: **every template change must be paired with a CLAUDE.md update and a manifest regeneration.**

---

## Design Principles

- **Fill every section.** No placeholders, no empty cells, no "TBD" without a reason.
- **Remove HTML comments from output.** They're instructions for the model, not content.
- **Tag agent vs. human work.** `[BOT]` for what an AI can do autonomously. `[HUMAN]` for checkpoints that require judgment. Any template with tasks must use this format.
- **Templates and CLAUDE.md are a pair.** One without the other is incomplete.

---

## License

**Runtime** (CLI, `bin/`, `scripts/`): [Apache-2.0](LICENSE)

**Content** (`skills/`, `templates/`): [CC-BY-SA-4.0](LICENSE-CC-BY-SA-4.0)

Derivatives of the templates or skills must be distributed under the same CC-BY-SA-4.0 license.
