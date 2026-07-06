---
title: "Topic Expansion & Topical Authority"
type: skill
description: "Decomposes a seed topic into a structured ecosystem of content angles across all intent types, enabling a domain to become the recognized authority on a subject in both search and AI answer systems."
use_when: "Use when expanding content from a single keyword or topic, planning an editorial calendar, or when a domain lacks the coverage depth needed to rank or get cited on a subject."
output_type: strategy
tags: [seo, topical-authority, content-strategy, topic-clusters, editorial-planning]
related_skills: [strategic-content-architecture, aeo-ai-visibility]
---

# Skill: Topic Expansion & Topical Authority

**Date:** 2026-04-17
**Author:** Ruco AI

---

## Overview

> Decomposes a seed topic into a structured ecosystem of content angles across all intent types, enabling a domain to become the recognized authority on a subject in both search and AI answer systems.

---

## Skill Description

This skill takes a single topic and systematically expands it into the full set of questions, angles, and formats that together constitute topical authority. It produces clustered content ideas across informational, comparative, tactical, and decision-stage intents — ensuring a domain covers a subject with the depth and breadth that search engines and AI systems use to assess expertise.

The distinction from content architecture is scope: this skill works at the topic level, generating ideas. Architecture works at the site level, organizing them. Both are typically used in sequence.

---

## Trigger Conditions

Invoke this skill when:

- A domain has one or a few strong pages on a topic but lacks surrounding coverage that would establish authority
- An editorial calendar needs to be populated for a new subject area
- A topic is being entered for the first time and requires a coverage map before writing begins
- AI visibility is low for a topic the domain should own — indicating coverage gaps that AI systems interpret as incomplete authority
- `depth_level` is being calibrated: shallow for quick wins, deep for full authority campaigns

---

## Input

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| topic | string | Yes | The seed subject to expand — can be a keyword, product category, or domain concept |
| audience | string | No | Target persona — shifts intent weighting (e.g. patient vs clinician changes which angles matter) |
| existing_content | array | No | Current content titles or URLs on this topic — used to avoid duplication and identify gaps |
| depth_level | string | No | `shallow` (10–15 angles, quick wins), `medium` (25–40 angles, balanced), `deep` (60+ angles, full authority campaign) |

---

## Output

| Field | Type | Description |
|-------|------|-------------|
| content_angles | array | Full list of content ideas with title, intent type, and format recommendation |
| topic_clusters | object | Angles grouped into thematic sub-clusters for editorial sequencing |
| coverage_map | object | What intent types are covered vs missing, relative to a complete authority profile |
| authority_pathway | array | Sequenced publishing order: which pieces to publish first to build foundation, then which to layer on top |

---

## Behavior

### Happy Path

1. **Map the full intent surface.** For the given `topic`, generate angles across all four intent types:
   - **Informational:** definitions, mechanisms, explanations, FAQs ("what is X", "how does X work", "why does X happen")
   - **Comparative:** alternatives, versus, trade-offs ("X vs Y", "best alternatives to X", "X or Y for [use case]")
   - **Tactical:** how-tos, guides, checklists ("how to do X", "X step by step", "X for beginners")
   - **Decision-stage:** buyer guides, cost content, provider selection ("best X for Y", "X cost", "how to choose X")

2. **Cluster by sub-theme.** Group angles into 3–6 thematic sub-clusters. Each cluster should be coherent enough to support a pillar page. Name each cluster as if it were a section of an authoritative guide.

3. **Apply audience weighting.** If `audience` is provided, deprioritize angles that don't match the persona's likely queries and elevate those that do. A clinician persona shifts weight toward tactical and evidence-based angles; a patient persona toward informational and decision-stage.

4. **Check against existing content.** If `existing_content` is provided, remove duplicate angles and flag any existing pages that are underperforming their intent — they may need updating rather than replacement.

5. **Sequence the authority pathway.** Order `authority_pathway` as: (1) foundational informational pieces that establish baseline authority, (2) tactical and FAQ content that captures long-tail traffic and AI citations, (3) comparative and decision-stage pieces that convert. Publishing out of sequence weakens the authority signal.

### Edge Cases

- **Very narrow topic with limited expansion potential:** If fewer than 10 non-duplicate angles can be generated at `medium` depth, the topic may be too narrow to support standalone authority. Recommend rolling it into a broader parent topic as a cluster rather than treating it as a pillar.
- **Saturated content landscape:** When top-ranking pages cover most angles comprehensively, flag the saturation. In this case, the `authority_pathway` should prioritize unique angles (data-driven, proprietary perspective, underserved sub-audiences) rather than covering already-crowded ground.
- **Highly technical domains:** For medical, legal, or engineering topics, add a `requires_expertise` flag to angles that need subject matter expert input before publishing. Do not generate shallow angles on YMYL subjects.

---

## Instructions

Given `topic`, perform the following:

1. Generate `content_angles` across all four intent types. Each angle entry must include: a working title, the primary query it targets, the intent type (`informational` | `comparative` | `tactical` | `decision`), and a recommended format (`article` | `faq` | `guide` | `comparison-page` | `landing-page`).

2. Group angles into `topic_clusters` of 5–10 pieces each. Name each cluster and identify which angle in it would serve as the cluster's pillar (the broadest, most authoritative piece).

3. Build `coverage_map`: for each intent type, state how many angles are present and what percentage of a complete authority profile is covered. Flag the most critical gaps.

4. Produce `authority_pathway` as a sequenced publishing plan. Group into three phases: Foundation (publish first), Depth (publish second), Conversion (publish third). Each entry: title + intent type + rationale for phase placement.

If `existing_content` is provided, cross-reference and mark duplicates. If `depth_level` is specified, scale total angle count accordingly.

Return `content_angles`, `topic_clusters`, `coverage_map`, and `authority_pathway`.

---

## Example

```
Input:
  topic: orthopedic surgery
  audience: patient considering private care
  depth_level: medium

Output:
  content_angles (sample):
    - title: "What is orthopedic surgery?"
      query: "what is orthopedic surgery"
      intent: informational
      format: article

    - title: "Private vs NHS orthopedic surgery: wait times, cost, and outcomes"
      query: "private vs nhs orthopaedic surgery"
      intent: comparative
      format: comparison-page

    - title: "How much does knee replacement surgery cost privately?"
      query: "private knee replacement cost UK"
      intent: decision
      format: landing-page

    - title: "Questions to ask your orthopedic surgeon before surgery"
      query: "questions to ask orthopedic surgeon"
      intent: tactical
      format: guide

  topic_clusters:
    "Understanding Orthopedic Surgery":
      pillar: "What is orthopedic surgery?"
      cluster: [types of ortho surgery, how ortho surgery works, what to expect, recovery overview]

    "Cost & Access":
      pillar: "Private vs NHS orthopedic surgery"
      cluster: [knee replacement cost, hip replacement cost, how to get a referral, insurance coverage]

  coverage_map:
    informational: 8 angles — 80% coverage
    comparative: 4 angles — 60% coverage
    tactical: 6 angles — 75% coverage
    decision: 3 angles — 40% coverage ← PRIORITY GAP

  authority_pathway:
    Phase 1 – Foundation:
      - "What is orthopedic surgery?" [informational] — establishes baseline entity relevance
      - "Types of orthopedic surgery" [informational] — expands entity surface for AI citation

    Phase 2 – Depth:
      - "Recovery time after knee surgery" [tactical] — captures high-volume long-tail
      - "Questions to ask your surgeon" [tactical] — high AI citation probability (FAQ format)

    Phase 3 – Conversion:
      - "Private vs NHS orthopedic surgery" [comparative] — intercepts evaluation stage
      - "How much does knee replacement cost privately?" [decision] — captures bottom-funnel
```

---

## Dependencies

- Keyword intent data (optional — improves angle prioritization and query targeting)
- Content inventory (optional — required for gap analysis against existing assets)

---

## Notes

Topical authority is not about volume — it's about coverage completeness. A domain with 10 well-structured, intent-matched pieces on a topic will outperform one with 50 shallow, unfocused pieces. The `authority_pathway` output is the most actionable section: publishing order matters as much as publishing volume.

---

*Made with [mdblu](https://github.com/ruco-ai/mdblu) · source: `templates/SKILL.md.template`*
