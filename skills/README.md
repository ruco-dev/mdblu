# Skills

Skills are reusable guidance documents that an AI agent reads and applies at runtime.

**Skill vs template:**
- A *template* is a scaffold an agent fills — you get a structured document out.
- A *skill* is guidance an agent applies — you get changed behavior, not a document.

## Domains

| Domain | Contents |
|--------|----------|
| `marketing/` | SEO, AEO, conversion, CRO, and content strategies |
| `agents/` | AI agent design, behavior, and orchestration guidance |

## Consuming skills

**Install to a project scaffold** (plain markdown, read by any agent):

```bash
mdblu skills get <name>           # writes to .mdblu/skills/<name>.md
mdblu skills get --all            # download all skills
```

**Install for zero-config auto-apply** (Claude Code):

```bash
mdblu skills get <name> --claude  # writes to .claude/skills/<name>/SKILL.md
```

With `--claude`, the skill's `use_when` field folds into `description` so Claude Code's routing layer auto-applies it without configuration.

**Read directly:** skills are plain markdown — open any `skills/<domain>/<name>.md` to apply guidance inline.

## Contributing

Propose a new skill with the same flow as templates:

```bash
mdblu propose skills/marketing/my-skill.md
```

Skill frontmatter must include: `title`, `type: skill`, `description`, `use_when`, `tags`.

## License

Content licensed under [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/).
