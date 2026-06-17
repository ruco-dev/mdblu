# mdblu

Already published unscoped as `mdblu@1.0.0`. Scoped `@ruco-ai/mdblu` exists and needs deprecating. Move metadata to `mdblu.ruco.dev`. Templates themselves need URL audits — they propagate into every project that uses them.

## BOT

- [x] Grep repo for all `@ruco-ai/mdblu` and `@ruco-ai/` references (code, MCP server descriptors, templates, CLI help)
  > Found in README.md (install cmd, MCP add cmd, MCP URL), package.json (name), CLAUDE.md (package name mention). MCP server src only references GitHub org paths — no npm scope.
- [x] **Audit every template file** for hardcoded URLs, install commands, or references to the old scope — these get copied verbatim into user projects
  > Only `templates/README.md.template` had issues: 4x `mdblu.fly.dev` (lines 149, 156, 168, 179). Install commands in template already used unscoped `mdblu`. All footer GitHub links (`github.com/ruco-ai/mdblu`) are correct org paths, not npm scope.
- [x] Update `package.json`: `homepage` → `https://mdblu.ruco.dev`
  > Also renamed `name` from `@ruco-ai/mdblu` to `mdblu` and bumped version to `1.1.0`.
- [x] Update README: install command, canonical-home note, badges
  > Fixed install cmds (`@ruco-ai/mdblu` → `mdblu`), MCP add command, and all `mdblu.fly.dev` → `mdblu.ruco.dev`. Also fixed CLAUDE.md package name reference.
- [x] Update MCP server tool descriptions (`use_template`, `propose_template_update`, `scaffold_hook`) if any return text mentions the old scope or domain
  > No changes needed — MCP server (`mdblu-mcp-server/src/index.ts`) uses GitHub org paths only, no npm scope or fly.dev domain.
- [x] Bump minor version (1.0.0 → 1.1.0); CHANGELOG entry
  > Created `CHANGELOG.md` with 1.1.0 entry documenting the rename and domain move.
- [x] Draft updated GitHub repo description
  > Suggested description: **"Structured Markdown templates for AI-assisted software development. CLI + MCP server. https://mdblu.ruco.dev"**

## HUMAN

- [ ] **Prereq:** `ruco.dev` registered, wildcard DNS configured
- [ ] Provision `mdblu.ruco.dev` (consider hosting a template browser at this URL; minimum: static page linking to GitHub)
- [ ] Review BOT changes carefully — template diffs have downstream reach into every flowdeck-using project
- [ ] `npm publish`
- [ ] `npm deprecate "@ruco-ai/mdblu" "*" "Renamed to mdblu — please install 'mdblu' instead. See https://mdblu.ruco.dev"`
- [ ] Commit + push
- [ ] Verify: scaffolding a fresh template via the MCP server produces URLs/refs pointing to `mdblu.ruco.dev`, not the old scope

#### COMMENTS

- `templates/README.md.template` had `mdblu.fly.dev` hardcoded in 4 places — these would have propagated verbatim into every generated README for projects using mdblu. All replaced with `mdblu.ruco.dev`.
- CLAUDE.md (the repo's agent context) also had `@ruco-ai/mdblu` — updated so future agents in this repo get the correct package name.
- The MCP server source is clean; no changes needed there.
