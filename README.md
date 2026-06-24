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

All templates live in [`/templates`](templates/) and are open for contribution.

---

## Decks

A **deck** is a named, installable collection of [flowdeck](https://github.com/ruco-dev/flowdeck) blueprints and energy cards for a specific domain. mdblu distributes decks under [`/decks`](decks/) — each deck is a folder with a `manifest.json`, its blueprints, and any domain-specific energy card templates.

**Source vs. runtime:** deck definitions live in `mdblu/decks/` (this repo). When installed, flowdeck copies blueprints and energy cards into the target project's `.flowdeck/` directory. That runtime copy is gitignored and gets overwritten on reinstall — never edit it directly. To change a deck, edit the source in `mdblu/decks/<name>/` and re-run `flowdeck install`.

Install a deck into any flowdeck project:

```bash
flowdeck install crunchdeck --local
```

`--local` runs `flowdeck init` if needed, installs the deck's blueprints and energy cards, patches `.flowdeck/AGENT.md`, and runs the deck's init blueprint to scaffold its working directory — one command from blank to ready.

| Deck | What it sets up |
|---|---|
| [`crunchdeck`](decks/crunchdeck/) | Product management under `.crunchdeck/` — PROFILE, BACKLOG, ROADMAP, ADR, inbox |
| [`creamdeck`](decks/creamdeck/) | Contact and relationship management under `.creamdeck/` — contacts, creamdeck-inbox |
| [`emaildeck`](decks/emaildeck/) | Gmail filter rules as flowdeck cards — fetch, label, and route findings to crunchdeck |
| [`gitdeck`](decks/gitdeck/) | GitHub repo vigilance — watches owned, competitor, provider, consumer, and benchmark repos; routes findings to crunchdeck |
| [`webdeck`](decks/webdeck/) | Web search signals — runs configured queries and routes findings to crunchdeck |
| [`farmdeck`](decks/farmdeck/) | Domain and hosting asset tracker — monitors domain expiry, DNS, and hosting health |
| [`calendardeck`](decks/calendardeck/) | Calendar and scheduling signals — tracks events, deadlines, and recurring commitments |
| [`notedeck`](decks/notedeck/) | Freeform notes as flowdeck cards under `.notedeck/` |

See [`decks/DECKS.md`](decks/DECKS.md) for the full index and instructions for contributing a new deck.

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

**Update already-scaffolded templates:**

```bash
mdblu update
```

---

## MCP Server

mdblu runs as an MCP server at `https://mdblu.ruco.dev/mcp`, so any MCP-compatible AI tool can pull templates on demand.

The server reads templates and `CLAUDE.md` directly from this repository at request time — no redeploy needed when templates change.

### Add to Claude Code

```bash
claude mcp add --transport http mdblu https://mdblu.ruco.dev/mcp
```

### Add to Claude Desktop

```json
{
  "mcpServers": {
    "mdblu": {
      "type": "http",
      "url": "https://mdblu.ruco.dev/mcp"
    }
  }
}
```

### Available tools and prompts

| Name | Type | Description |
|---|---|---|
| `use_template` | tool | Fetch a template by name + return filling instructions with suggested filename |
| `propose_template_update` | tool | Open a GitHub PR with an improved version of a template |
| `scaffold_hook` | tool | Returns a PostToolUse hook config for automatic template improvement detection |
| `use_doc` | prompt | Re-enter a workflow using a filled document as authoritative context |
| `propose_update` | prompt | Critically evaluate and propose a template improvement |

---

## Usage

Once connected, ask your AI agent to use a template by name:

> "Write a SPEC for the new notifications system."

> "Create a MISSION-LOG for the auth migration."

> "Generate a HANDOFF for what we built today."

The agent will select the right template, fill every section from your prompt, strip the HTML comments, and return a clean, structured document.

---

## Contributing

mdblu is intentionally open and collaborative. Templates and decks are plain Markdown — readable, forkable, improvable.

**To contribute a new template or improve an existing one:**

1. Fork the repo
2. Add or edit the template in `/templates`
3. Update `CLAUDE.md` — add or revise the entry that tells agents when and how to use the template
4. Open a PR

The rule: **every template change must be paired with a CLAUDE.md update.**

**To contribute a new deck:**

1. Add a `decks/<name>/` folder — see [`decks/DECKS.md`](decks/DECKS.md) for the required structure
2. Add a row to the decks table in `decks/DECKS.md` and in this README
3. Open a PR

**AI-assisted contributions** — any agent connected to the MCP server can propose template improvements directly by using the `propose_update` prompt. It will open a PR only if the change clears the bar: durable improvement, structural gap, no task-specific bleed, minimal diff.

---

## Design Principles

- **Fill every section.** No placeholders, no empty cells, no "TBD" without a reason.
- **Remove HTML comments from output.** They're instructions for the model, not content.
- **Tag agent vs. human work.** `[BOT]` for what an AI can do autonomously. `[HUMAN]` for checkpoints that require judgment. Any template with tasks must use this format.
- **Templates and CLAUDE.md are a pair.** One without the other is incomplete.

---

## License

MIT
