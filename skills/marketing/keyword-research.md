---
title: "Keyword Research & Semantic Clustering"
type: skill
description: "Transforms raw SERP data (organic results, People Also Ask, related searches) into prioritised keyword clusters mapped to search intent and content types."
use_when: "Use when planning content for a new site or page, auditing keyword gaps, or mapping a topic to content opportunities — especially when SERP data is available from serper-search."
output_type: strategy
tags: [seo, keyword-research, content-strategy, serp, semantic-clustering]
related_skills: [topic-expansion-topical-authority, strategic-content-architecture, aeo-ai-visibility]
---

# Skill: Keyword Research & Semantic Clustering

**Date:** 2026-06-30
**Author:** Ruco AI

---

## Overview

> Transforms raw SERP data (organic results, People Also Ask, related searches) into prioritised keyword clusters mapped to search intent and content types.

---

## Skill Description

Keyword research in isolation produces lists. This skill produces a content strategy.

It starts from structured SERP data returned by the `serper-search` pill and extracts every meaningful signal: what pages rank, what questions users ask, what related searches reveal about intent drift. From those signals, it builds semantic clusters — groups of keywords that share intent and can be addressed by a single piece of content — and scores each cluster by opportunity.

This is especially effective in early-stage site planning (no GSC data yet) and in competitive niches where understanding SERP composition matters as much as knowing volume.

---

## Trigger Conditions

Invoke this skill when:

- Planning content for a new site, section, or campaign with no existing traffic data
- Identifying topic gaps relative to a competitor's ranking pages
- Mapping a broad topic into specific content pieces before writing
- SERP data is available from `serper-search` and needs to be interpreted strategically
- A client needs a content brief with keyword rationale, not just a list of terms

---

## Input

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| serp_data | object | Yes | Output from `serper-search`: `{ query, organic, peopleAlsoAsk, relatedSearches }` |
| seed_query | string | Yes | The original search query used to generate the SERP data |
| locale | string | No | Target market locale (e.g. `pt-PT`, `pt-BR`, `en-US`). Defaults to `pt-PT`. |
| competitor_urls | array | No | URLs of known competitors to flag when they appear in organic results |
| content_goal | string | No | The business outcome the content should drive: `lead`, `sale`, `awareness`, `retention` |

---

## Output

| Field | Type | Description |
|-------|------|-------------|
| clusters | array | Semantic keyword clusters, each with intent, keywords, content type, and priority score |
| paa_topics | array | People Also Ask questions grouped by theme — input for FAQ sections and AEO |
| related_drift | array | Related searches that signal topic expansion opportunities |
| competitor_presence | array | Competitors found in the top-10 organic results, with their positions |
| content_brief | object | Recommended primary keyword, supporting keywords, intent, and suggested content format |

---

## Behavior

### Happy Path

1. **Extract all keyword signals.** From `serp_data`, collect:
   - Organic result titles and snippets (surface implied keywords and semantic patterns)
   - `peopleAlsoAsk` questions (explicit user needs)
   - `relatedSearches` (topic boundary and drift signals)
   - Organic URLs (domain authority signals, content format clues)

2. **Classify search intent.** For each extracted signal, assign one of four intent types:
   - `informational` — user wants to learn ("o que é", "como funciona", "diferença entre")
   - `navigational` — user wants a specific site or brand
   - `commercial` — user is researching before buying ("melhor", "comparar", "reviews")
   - `transactional` — user is ready to act ("comprar", "preço", "marcar consulta", "inscrever")

   Assign the dominant intent to the seed query based on the majority pattern in organic results.

3. **Build semantic clusters.** Group keywords that share intent and could be addressed by the same content piece. A cluster should have:
   - One **primary keyword** (the seed or closest variant)
   - 3–8 **supporting keywords** (long-tail, PAA-derived, or related)
   - A **content type** matched to intent: article, FAQ page, landing page, comparison page, local page

4. **Score opportunity per cluster.** Use SERP composition as a proxy for difficulty:
   - High opportunity: top-10 dominated by aggregators, directories, or weak brand pages
   - Medium opportunity: mix of strong and weak results; one or two dominant brands
   - Low opportunity: top-10 dominated by strong national or international brands with deep authority

   Do not fabricate volume numbers — if no volume data is provided, describe opportunity qualitatively.

5. **Identify PAA topic groups.** Cluster PAA questions by theme. Each theme is a candidate for an FAQ block, a dedicated section, or an AEO-optimised answer page.

6. **Flag related drift.** Related searches that move away from the seed query's intent signal adjacent content opportunities — flag these separately rather than forcing them into existing clusters.

7. **Compose the content brief.** Select the highest-opportunity cluster and summarise: primary keyword, 3–5 supporting keywords, intent, recommended format, and one line on what the content must do to outrank current top-3 results.

### Edge Cases

- **Empty PAA or related searches:** Proceed with organic signal analysis only. Note the absence — it may indicate a niche or low-volume query where SERP data is thin.
- **All top-10 results are strong brands:** Flag as low opportunity. Suggest pivoting to a long-tail variant or a local/specific angle with less competition.
- **Multilingual SERP (mixed PT/EN results):** Treat EN-language results as a signal of weak localised content — high opportunity for PT content that directly addresses the query.
- **Navigational dominant intent:** If the seed query is navigational (someone looking for a specific brand), flag it as unsuitable for content targeting. Recommend a related informational variant instead.
- **No `content_goal` provided:** Default to `awareness` for informational intent, `lead` for commercial/transactional intent.

---

## Instructions

Given `serp_data` and `seed_query`, perform the following:

1. Read all organic titles, snippets, PAA questions, and related searches. List every distinct keyword pattern you observe — do not filter yet.

2. Classify the dominant intent of `seed_query` based on the organic result pattern.

3. Group keywords into clusters of 1 primary + 3–8 supporting terms. Each cluster must share a coherent intent and could realistically be addressed by one content piece.

4. Assess opportunity for each cluster based on SERP composition. Be honest — if the top-10 is dominated by strong incumbents, say so.

5. Group PAA questions by theme. Label each group with a descriptive topic name.

6. List related searches that represent adjacent topics not covered by existing clusters. Label them as drift signals.

7. If `competitor_urls` is provided, note which competitors appear in the top-10 and at what positions.

8. Compose the `content_brief` for the highest-opportunity cluster: primary keyword, supporting keywords, intent label, recommended content format, and one sentence on what would make the content outrank the current top-3.

Return all fields: `clusters`, `paa_topics`, `related_drift`, `competitor_presence`, `content_brief`.

---

## Example

```
Input:
  seed_query: "yoga porto"
  locale: "pt-PT"
  content_goal: "lead"
  serp_data:
    organic:
      - { position: 1, title: "Áshrama Porto | Aulas de Yoga", link: "yogaporto.com", snippet: "..." }
      - { position: 2, title: "Sítios para fazer ioga no Porto – TimeOut", link: "timeout.pt/...", snippet: "..." }
      - { position: 5, title: "Aulas de yoga no Porto - 53 profs desde 10€/h - Superprof", ... }
    peopleAlsoAsk:
      - "Qual é o melhor estúdio de yoga no Porto?"
      - "Quanto custa uma aula de yoga no Porto?"
      - "Yoga para iniciantes no Porto"
    relatedSearches:
      - "yoga online porto"
      - "meditação porto"
      - "pilates porto"

Output:
  clusters:
    - primary: "aulas de yoga porto"
      supporting: ["yoga porto", "estúdio yoga porto", "yoga iniciantes porto", "aulas ioga porto"]
      intent: commercial
      content_type: local landing page
      opportunity: medium
      rationale: "Top-10 mixes directories (TimeOut, Superprof) and one strong incumbent (yogaporto.com). A local studio with a dedicated landing page targeting 'aulas de yoga porto' can compete."

    - primary: "quanto custa yoga porto"
      supporting: ["preço aula yoga porto", "yoga porto 10€", "yoga barato porto"]
      intent: commercial
      content_type: FAQ page or pricing section
      opportunity: high
      rationale: "No direct page answers this question. Pricing transparency is a conversion lever for lead-goal content."

  paa_topics:
    - theme: "escolha de estúdio"
      questions: ["Qual é o melhor estúdio de yoga no Porto?"]
    - theme: "preço e acessibilidade"
      questions: ["Quanto custa uma aula de yoga no Porto?"]
    - theme: "nível iniciante"
      questions: ["Yoga para iniciantes no Porto"]

  related_drift:
    - "yoga online porto"      # adjacent: digital offering
    - "meditação porto"        # adjacent: wellness category
    - "pilates porto"          # competitor category

  content_brief:
    primary_keyword: "aulas de yoga porto"
    supporting: ["yoga porto", "estúdio yoga porto", "yoga iniciantes porto"]
    intent: commercial
    format: local landing page
    to_outrank: "Provide clear pricing, instructor bios, and a specific class schedule — the two ranking incumbents (TimeOut directory, Superprof aggregator) offer no studio-specific trust signals."
```

---

## Dependencies

- `serper-search` pill — provides structured SERP data (`query`, `organic`, `peopleAlsoAsk`, `relatedSearches`)
- `TOPICAL-AUTHORITY` skill — for mapping clusters into a full topic map across a site
- `CONTENT-ARCHITECTURE` skill — for deciding how clusters map to site structure

---

## Notes

Volume numbers are not produced by this skill. Serper.dev returns SERP composition, not search volume. If exact volume is needed, supplement with Google Ads Keyword Planner or a third-party tool. For most early-stage sites, SERP composition is a better signal than volume anyway — a 500-search/month query with weak incumbents is more actionable than a 10,000-search/month query dominated by Wikipedia and major brands.

---

*Made with [mdblu](https://github.com/ruco-ai/mdblu) · source: `templates/SKILL.md.template`*
