# calendardeck-switch-mcp

Switch the calendardeck connector from Windsor.ai to a direct Google Calendar MCP server.
Windsor.ai is a marketing analytics platform — its Calendar connector is unreliable for
read/write agent workflows. A dedicated MCP server gives full API access and predictable auth.

## BOT

- [ ] Research available Google Calendar MCP servers. Candidates to evaluate:
  - Community servers: search npm and GitHub for `google-calendar-mcp`, `mcp-google-calendar`, etc.
  - mcpster-built option: could be scaffolded with `@ruco-ai/mcpster` if no suitable community server exists.
  - Evaluate each on: read + write support, OAuth2 flow (service account or user credentials), maintenance activity, install complexity.
  - Select the best option and document the choice with a one-line rationale.

- [ ] Update `AGENT.md` — replace all Windsor.ai references:
  - `send-to-gcal` steps 2–3: replace `mcp__claude_ai_Windsor_ai__list_actions` and `mcp__claude_ai_Windsor_ai__execute_action` with the new connector's tool calls.
  - `send-to-gcal` step 5: update the fallback message to name the new connector.
  - `sync-day`: update the Windsor.ai fetch path description to reference the new connector.

- [ ] Update `blueprints/calendardeck-init/TODO.md`:
  - Replace the Windsor.ai reminder in `## BOT` (last bullet) with instructions to install and configure the new connector.

- [ ] Surface under `## HUMAN`:
  - Name and install command for the chosen MCP server.
  - Auth setup steps (OAuth app creation or service account, scopes required).
  - Any `.flowdeck/.calendardeck/sync/SYNC.md` config fields that need updating.

## HUMAN
