---
license: CC-BY-SA-4.0
title: "Strategic Content Architecture"
type: skill
description: "Designs pillar-cluster content hierarchies that eliminate cannibalization, close coverage gaps, and compound domain authority across SEO and AI retrieval systems."
use_when: "Use when planning a new content site, auditing an existing site for gaps or cannibalization, or when content is not ranking despite production volume."
output_type: structure
tags: [seo, content-architecture, pillar-cluster, internal-linking, information-architecture]
related_skills: [topic-expansion-topical-authority, aeo-ai-visibility]
---

# Skill: Strategic Content Architecture

**Date:** 2026-04-17
**Author:** Ruco AI

---

## Overview

> Designs pillar-cluster content hierarchies that eliminate cannibalization, close coverage gaps, and compound domain authority across SEO and AI retrieval systems.

---

## Skill Description

This skill builds the structural backbone of a content strategy. It maps relationships between pillar pages (broad, authoritative hubs) and cluster pages (focused, intent-specific), defines internal linking logic, and ensures every content asset reinforces the domain's topical authority rather than diluting it.

It is especially effective when a site produces content volume without seeing authority gains — the usual cause is structural fragmentation, not content quality. It also applies to new domains where architecture decisions made early have compounding long-term impact.

---

## Trigger Conditions

Invoke this skill when:

- A site publishes regularly but rankings remain flat or fragmented across many low-position keywords
- Multiple pages are competing for the same or overlapping queries (cannibalization)
- Content exists but internal linking is sparse, inconsistent, or absent
- Planning a content strategy from scratch before any pages are written
- Migrating or consolidating content after a rebrand or domain change

---

## Input

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| domain | string | Yes | Site domain or content vertical being structured |
| core_topics | array | Yes | 3–7 primary pillars — the broadest subjects the domain should own |
| existing_pages | array | No | Current page titles or URLs for audit and cannibalization detection |
| audience | string | No | Target persona — affects depth and intent prioritization per cluster |

---

## Output

| Field | Type | Description |
|-------|------|-------------|
| pillar_map | object | Each pillar with its supporting cluster pages, grouped by intent |
| linking_plan | array | Specific internal linking recommendations: which pages link to which, and anchor text guidance |
| gap_analysis | array | Missing content identified by intent type and cluster |
| cannibalization_flags | array | Pages targeting overlapping queries with consolidation recommendations |

---

## Behavior

### Happy Path

1. **Define pillar scope.** For each item in `core_topics`, establish the boundaries: what does this pillar own vs. what belongs to a sibling pillar? Pillars should not overlap. If two pillars share significant query territory, merge them or split into parent/child.

2. **Generate cluster pages per pillar.** For each pillar, populate clusters across four intent types: informational ("what is X", "how does X work"), comparative ("X vs Y", "alternatives to X"), tactical ("how to do X", "X checklist"), and decision-stage ("best X for [use case]", "X pricing"). Aim for minimum 5–8 cluster pages per pillar for meaningful authority signals.

3. **Map internal links.** Each cluster page links up to its pillar. Each pillar links down to all its clusters. Identify lateral linking opportunities between related clusters across pillars. Specify anchor text for each link — it should reflect the target page's primary keyword, not generic phrases like "click here" or "learn more".

4. **Detect cannibalization.** If `existing_pages` is provided, scan for pages targeting the same primary keyword or query intent. Flag pairs with consolidation options: merge into the stronger page, redirect the weaker, or differentiate by intent if both serve distinct user needs.

5. **Prioritize gap-filling.** Rank missing cluster pages by: (a) presence of the intent type in competitor content, (b) position in the buyer journey — decision-stage gaps are higher priority than informational ones, (c) whether the missing page would complete a pillar's internal linking loop.

### Edge Cases

- **Large legacy sites (500+ pages):** Do not attempt full audit without `existing_pages` list. Instead, focus architecture on `core_topics` and flag that cannibalization detection requires a crawl export.
- **Multi-language or multi-region domains:** Treat each language/region as a separate domain instance. Do not cross-link clusters across languages as if they share authority.
- **Overlapping product and editorial content:** Product pages and blog/editorial pages serve different intents and should not compete. Map editorial clusters to support product pillars — editorial builds topical authority, product pages capture decision-stage traffic. They link to each other but are not interchangeable.

---

## Instructions

Given `domain` and `core_topics`, perform the following:

1. Define each pillar's scope and confirm there is no overlap between pillars. If overlap exists, resolve it before proceeding.

2. For each pillar, generate cluster pages across all four intent types: informational, comparative, tactical, decision-stage. Each cluster entry should include: a working page title, the primary query it targets, and its intent type.

3. Build `linking_plan`: for each cluster page, specify which pillar it links up to, and which related cluster pages it links laterally to. Include suggested anchor text for each link.

4. If `existing_pages` is provided, compare against the generated structure and produce `cannibalization_flags`. For each flagged pair, recommend: merge, redirect, or differentiate — with a one-sentence rationale.

5. Produce `gap_analysis` as a prioritized list of missing cluster pages, ranked by business impact (decision-stage first).

Return `pillar_map`, `linking_plan`, `gap_analysis`, and `cannibalization_flags`.

---

## Example

```
Input:
  domain: physio-clinic.com
  core_topics: ["physiotherapy", "sports injury rehab", "post-surgical recovery"]
  existing_pages: ["back pain treatment", "knee pain physio", "knee rehabilitation exercises"]

Output:
  pillar_map:
    physiotherapy:
      informational:
        - "What is physiotherapy?" → query: "what is physiotherapy"
        - "Physiotherapy vs chiropractic" → query: "physio vs chiro"
      tactical:
        - "How to prepare for your first physio session" → query: "first physio appointment"
      decision-stage:
        - "Private vs NHS physiotherapy: what's the difference?" → query: "private physio vs NHS"

  linking_plan:
    - "Physiotherapy vs chiropractic" → links up to pillar: "Physiotherapy" (anchor: "physiotherapy")
    - "Physiotherapy vs chiropractic" → links laterally to "Post-surgical recovery options" (anchor: "recovery after surgery")

  cannibalization_flags:
    - "knee pain physio" and "knee rehabilitation exercises" both target decision-stage knee queries.
      Recommendation: merge into "Knee Pain Physiotherapy: Treatment & Rehab Exercises" — keeps decision intent, absorbs tactical content.

  gap_analysis:
    1. [DECISION] No page targeting "sports injury physio near me" — highest traffic intent in sports rehab pillar
    2. [COMPARATIVE] No "physiotherapy vs massage therapy" page — common evaluation query
    3. [INFORMATIONAL] No FAQ page on session duration or costs — frequently cited in AI answers
```

---

## Dependencies

- Content inventory or sitemap export (required for cannibalization detection)
- Keyword intent data (optional — improves cluster prioritization)

---

## Notes

Architecture decisions compound over time in both directions. A well-structured site accumulates authority with each new page. A fragmented site dilutes it. This skill should be applied before content production scales — retrofitting architecture onto hundreds of existing pages is significantly more expensive than designing it upfront.

---

*Made with [mdblu](https://github.com/ruco-dev/mdblu) · source: `templates/SKILL.md.template`*
