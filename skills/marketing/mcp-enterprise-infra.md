---
license: CC-BY-SA-4.0
title: "MCP Enterprise Infrastructure Patterns"
type: skill
description: "Deployment architectures for MCP servers in enterprise and regulated environments — tunnels, self-hosted sandboxes, perimeter control, and air-gap patterns."
use_when: "Use when designing MCP server deployment for enterprise clients, when a customer requires data to stay within their perimeter, or when building multi-tenant MCP infrastructure that must not route data through third-party-controlled infra."
output_type: strategy
tags: [mcp, enterprise, infrastructure, security, deployment, tunnels, sandboxes, perimeter]
related_skills: []
---

# Skill: MCP Enterprise Infrastructure Patterns

**Date:** 2026-05-22
**Author:** Ruco AI

---

## Overview

> Deployment architectures for MCP servers in enterprise and regulated environments — tunnels, self-hosted sandboxes, perimeter control, and air-gap patterns.

---

## Skill Description

Enterprise deployments of MCP servers have different requirements from developer or startup deployments: data must stay within customer-controlled infrastructure, audit trails are required, and agents cannot route traffic through third-party-controlled intermediaries.

Anthropic's 2026 release of MCP tunnels and self-hosted sandboxes introduced the enterprise primitives: remote MCP server connectivity without port exposure, and isolated execution environments that run entirely within customer infrastructure. The positioning is explicit: "your perimeter, your rules."

**Core principle:** Enterprise MCP deployment optimizes for perimeter control first, developer ergonomics second. The correct security posture is outbound-only connectivity — the MCP server initiates the tunnel, not the other way around.

---

## Trigger Conditions

Invoke this skill when:

- An enterprise customer requires AI agents that do not route data through external infrastructure
- MCP servers handle regulated data (PII, PHI, financial, classified)
- A deployment needs audit logging of all tool invocations
- Customer security policy prohibits external port exposure
- Multi-tenant MCP infrastructure serves multiple enterprise clients from a single deployment

---

## Input

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| deployment_target | string | Yes | `cloud` \| `self-hosted` \| `air-gap` \| `hybrid` |
| data_classification | string | No | Data sensitivity level — affects which patterns are permitted |
| client_count | number | No | Number of distinct enterprise tenants if multi-tenant |
| transport | string | No | `stdio` \| `http` \| `tunnel` — starting transport type |

---

## Output

| Field | Type | Description |
|-------|------|-------------|
| deployment_architecture | object | Recommended deployment pattern with rationale |
| security_controls | array | Required security controls per pattern, ordered by criticality |
| perimeter_checklist | array | Verification steps before go-live |
| migration_path | object | How to move from current to target architecture |

---

## Behavior

### Happy Path

1. **Classify the deployment context.** Determine `deployment_target` and `data_classification`. This drives all subsequent decisions:
   - **Cloud (public SaaS):** Standard HTTP transport with mTLS. No special enterprise pattern needed.
   - **Self-hosted (customer-controlled infra):** Use MCP tunnels for connectivity. Agents connect to the tunnel endpoint; the MCP server runs inside the customer's perimeter. Customer controls egress filtering.
   - **Air-gap (no external network):** stdio transport only. Agent and MCP server co-located. No network transport layer.
   - **Hybrid:** Separate MCP servers per data classification tier; sensitive tools on self-hosted, public tools on cloud.

2. **Design tunnel topology for self-hosted deployments.** MCP tunnels allow Claude agents to reach remote MCP servers without the server exposing a public port:
   - Customer runs the MCP server on their infrastructure
   - Tunnel establishes an outbound-only connection to the Claude agent endpoint
   - Agent invokes tools over the tunnel — data never leaves the customer's network unencrypted
   - No inbound firewall rules required on the customer side
   - Tunnel authentication must use mTLS or equivalent — a shared secret is not sufficient for enterprise perimeter control

3. **Configure self-hosted sandboxes for execution isolation.** Enterprise MCP deployments that execute code or process documents should use isolated sandbox environments:
   - Sandboxes run within customer-controlled compute (on-prem or customer-owned cloud)
   - Sandbox lifecycle (spin-up, teardown, state) is managed by the customer, not the AI provider
   - Verify sandbox isolation model: bare-metal isolation (e.g. Daytona) vs. container-based isolation have different escape surface areas — select based on customer threat model

4. **Apply perimeter controls.** Regardless of transport:
   - Egress filtering: MCP server should only connect to explicitly whitelisted external services
   - Audit logging: all tool invocations logged with agent identity, tool name, parameters, response hash
   - Secrets management: MCP server credentials must not be embedded in server code — use customer's secrets manager (Vault, AWS Secrets Manager, or equivalent)

5. **Enforce brand/UI compliance for customer-facing MCP surfaces.** If the MCP server powers a customer-facing UI, prevent AI-generated defaults from leaking through:
   - AI models default to recognizable aesthetics (Inter font, purple gradients, nested card layouts) — enterprise deployments require brand compliance
   - Use tools like Hallmark (open-source) to enforce brand-compliant UI generation
   - Define a component allowlist or design token set that the agent must use

### Edge Cases

- **Tunnel latency:** MCP tunnels add round-trip latency. For real-time agent interactions, benchmark tunnel overhead and set timeout budgets accordingly.
- **Multi-region compliance:** If the customer has data residency requirements (EU GDPR, data sovereignty laws), the MCP server, tunnel endpoint, and any logging infrastructure must all reside in the compliant region. Tunnel relay nodes are part of the data flow — verify their region.
- **Hybrid tier boundary:** In hybrid deployments, the boundary between self-hosted and cloud-tier MCP servers must be enforced at the agent level, not just the network level. An agent that can freely invoke tools across tiers defeats the perimeter model.
- **stdio in containerized environments:** stdio transport assumes co-location. In Kubernetes or similar environments, "co-located" means same pod — verify that the agent and MCP server container share the process namespace if using stdio.

---

## Instructions

Given `deployment_target` and optional parameters:

1. Select the recommended architecture from the pattern library above and provide a rationale.
2. Produce `security_controls`: list required controls for the selected pattern, ordered by criticality.
3. Produce `perimeter_checklist`: step-by-step verification checklist for go-live. Each step should be a concrete, verifiable action.
4. If migrating from an existing deployment, produce `migration_path`: what to change, in what order, and what to verify at each step.

---

## Dependencies

- MCP tunnel infrastructure (Anthropic-provided or self-hosted tunnel relay)
- Customer-controlled compute for self-hosted MCP servers
- Secrets management system (Vault, AWS Secrets Manager, or equivalent)
- Audit logging pipeline (ELK, Datadog, Splunk, or customer SIEM)

---

## Notes

The most common enterprise MCP deployment failure: treating MCP servers like regular microservices and exposing them on public ports with a reverse proxy. This works but defeats the perimeter control requirement — the agent now routes through external infrastructure even if the MCP server is "on-prem."

The correct pattern: MCP server initiates an outbound tunnel connection; the agent reaches it through the tunnel. Outbound-only connectivity is the default security posture for enterprise edge nodes in every other protocol (VPN, CDN PoP, IoT gateway) — MCP deployments should follow the same model.

The second most common failure: configuring sandboxes with container-level isolation when the threat model requires bare-metal isolation. For enterprise AI workloads handling sensitive data, container escape is a real attack vector — verify the isolation model matches the customer's compliance requirements.

---

*Made with [mdblu](https://github.com/ruco-ai/mdblu) · source: `templates/SKILL.md.template`*
