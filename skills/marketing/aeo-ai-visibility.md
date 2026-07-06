---
title: "AEO & AI Visibility Strategy"
type: skill
description: "Structures and signals content to be cited by AI answer systems — ChatGPT, Gemini, Perplexity, and AI Overviews — by making it extractable, authoritative, and platform-compliant."
use_when: "Use when content is ranking but not appearing in AI-generated answers, when building brand visibility in AI search, or when creating content whose primary goal is citation rather than ranking."
output_type: strategy
tags: [aeo, ai-visibility, seo, answer-engine, citations, structured-data, entity-authority]
related_skills: [topic-expansion-topical-authority, competitor-question-ownership, strategic-content-architecture]
---

# Skill: AEO & AI Visibility Strategy

**Date:** 2026-05-22
**Author:** Ruco AI

---

## Overview

> Structures and signals content to be cited by AI answer systems — ChatGPT, Gemini, Perplexity, and AI Overviews — by making it extractable, authoritative, and platform-compliant.

---

## Skill Description

This skill optimizes content for citation selection by AI systems rather than for traditional search ranking. The two goals overlap but diverge in critical ways: a page can rank #1 and never be cited by an AI, because AI systems extract atomic, portable answer units rather than scoring documents holistically.

It addresses content structure, entity authority, off-site consensus signals, and platform-specific compliance — the four levers that determine whether an AI cites your content or skips it.

**Core principle (2026):** Precision beats breadth for AI citation. Comprehensive "ultimate guide" pages rank well organically but are cited less — AI systems extract the cleanest answer unit, not the most comprehensive page. One focused page answering one question well outperforms one comprehensive page covering many questions adequately. ChatGPT in particular penalizes long-form generic content; shorter, structured, question-specific pages consistently outperform it in citation rate analysis of 815,000+ query-page pairs.

**Scale context (2026):** Google AI Mode serves 1 billion users/month with queries doubling every quarter. AI-mediated discovery is no longer an emerging behavior — it is primary traffic for informational and navigational queries. Strategies built for blue-link SEO are insufficient; AI citation strategy is required in parallel.

**The ranking/citation divergence:** Ranking and being cited in AI answers are not the same job. A page at position 1 may never be pulled into an AI answer; a page at position 2 may be cited by ChatGPT, Gemini, and Perplexity simultaneously. Answer engines select sources that "feel safe to quote" — selection logic runs on structure, evidence density, freshness, and brand presence across the web. Optimizing for one does not guarantee the other.

**Citations vs. mentions:** Being *cited* by an AI (content used as a source) is categorically different from being *mentioned* (brand name appears in a response). Citations carry authority signals — the AI treats your content as evidence. Mentions may be co-occurrence only — the AI referenced your brand without using your content. Measure these separately; brands optimizing for mentions are measuring the wrong metric.

**Cross-engine reality:** 91% of AI citations appear in only one engine. Only 11% of domains cited by ChatGPT are also cited by Perplexity; ChatGPT and Google AI Overview share only 13.7% of citation sources. Each engine operates on a fundamentally different citation logic — optimising for one platform does not generalise to others. Measure platform-specific citation presence separately.

---

## Trigger Conditions

Invoke this skill when:

- Pages rank well organically but are absent from AI Overviews, Perplexity results, or ChatGPT citations on the same queries
- A brand has low presence in AI-generated category or comparison answers despite being an established player
- Creating new content whose primary metric is AI citation rate rather than organic CTR
- Building topical authority in a domain where AI answer systems are the primary discovery channel for the audience
- An entity (brand, person, product) is not resolved or is inconsistently represented in AI-generated responses
- Measuring brand AI presence and need to distinguish citations from mentions

---

## Input

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| topic | string | Yes | The subject or query set to optimize for AI citation |
| persona | string | No | Target audience — affects which intent-stage questions to prioritize |
| competitors | array | No | Competitor entities to benchmark citation presence against |
| intent_stage | string | No | `awareness` \| `consideration` \| `decision` — shifts question selection and content depth |
| target_platforms | array | No | Subset of platforms to prioritize: `ai-overviews` \| `perplexity` \| `chatgpt` \| `gemini` |
| freshness_cadence | number | No | Days between content freshness updates (default: 90) |

---

## Output

| Field | Type | Description |
|-------|------|-------------|
| question_map | array | High-intent questions to target, with citation potential rating per platform |
| content_structure | object | Answer-first content layout with required structural elements per page |
| authority_strategy | object | Entity establishment and off-site consensus plan |
| visibility_actions | array | Prioritized actions by effort and impact, per target platform |

---

## Behavior

### Happy Path

1. **Map the question surface.** Identify the questions AI systems are likely to receive about `topic` at the given `intent_stage`. Focus on: definitional queries ("what is X"), categorical queries ("is X a Y"), comparison queries ("X vs Y"), and process queries ("how to X"). These four types have the highest AI citation rates. Avoid broad head terms — AI systems favor specific, answerable questions over topic-level queries. **Plan one page per question, not one page per topic.**

2. **Assess platform-specific requirements.** Adjust strategy based on `target_platforms`:
   - **Google AI Overviews / Gemini:** Ranking in the top 5 organically is a prerequisite. Add `FAQPage`, `HowTo`, or `Article` schema. Author `Person` schema with E-E-A-T signals. Freshness matters — pages updated within 6 months receive a recency boost. **52.15% of Gemini citations come from the brand's own domain** — brand-owned content with strong entity signals is the primary lever for Gemini visibility.
   - **Perplexity:** Does not require Google ranking — has its own crawler (PerplexityBot). Verify `robots.txt` does not block it. Perplexity weights Reddit co-mentions heavily; target Reddit threads alongside page creation. Markdown-style formatting (headers, lists) indexes better. High citation density within content improves retrieval. **Perplexity cites 21.87 sources per response (vs ~7.92 for ChatGPT)** — multi-source corroboration within content and in off-site signals is the primary lever for Perplexity visibility.
   - **ChatGPT Browse / GPT-4o Search:** Uses Bing as its primary index, not Google. **87% of ChatGPT search-mode citations match Bing's top 10 organic results** — Bing ranking is the prerequisite, not Google ranking. Submit sitemap to Bing Webmaster Tools. Exact-match anchor text and `.edu`/`.gov` co-citations improve citation probability. Author credentials indexed on Bing are weighted for expert-claim queries. **ChatGPT cites ~7.92 sources per response and penalizes long-form generic content** — short, question-specific pages consistently outperform comprehensive guides.

3. **Design extractable answer units.** Each page must contain answer units — self-contained responses under 60 words that fully resolve a single question. Structure:
   - Add a "Quick Answer" box at the top of the page (plaintext + `FAQPage` JSON-LD): 40–60 words, no hedging, no "it depends" without a qualifier.
   - Format H2/H3 headings as questions; follow with a direct answer sentence before any elaboration (inverted pyramid).
   - Use `FAQPage` schema with `Question`/`Answer` pairs — individual answers under 50 words. Tables for any comparison. Numbered lists for processes.
   - Keep standalone answer pages to 800–1,200 words. Dense pillar pages rank well but are cited less. **Do not create comprehensive guides for AI citation purposes; create a cluster of focused pages instead.**
   - Quantified claims and statistics anchor citations — specific, data-backed assertions are more extractable than qualitative summaries.
   - **"Safe to quote" content:** AI systems apply an implicit trust filter — they select content that sounds authoritative, neutral, and evidence-backed. Avoid marketing language, unsupported superlatives, and promotional framing in the answer body. Content that reads like a sales page will not be cited even if it ranks.

4. **Build entity authority.** Establish the brand/entity as a resolvable node in AI knowledge systems:
   - Complete Google Business Profile, Wikidata entry, and consistent NAP across directories.
   - Add `Organization` schema with `sameAs` links to LinkedIn, Crunchbase, and Wikipedia/Wikidata.
   - Add `Person` schema to all content authors with verifiable credential links.
   - Use exact brand name consistently — variations fragment entity resolution across AI systems.

5. **Publish early and update regularly.** 75% of new pages are cited by ChatGPT or Claude within weeks of publication. The citation window opens quickly — waiting to perfect content delays citation establishment without improving citation probability.
   - Publish structured, answer-first content as soon as minimum quality threshold is met.
   - Schedule freshness updates every `freshness_cadence` days (default: 90). Stale content loses recency signals in Gemini specifically, but freshness is a positive signal across platforms.
   - Add a publication timing action to `visibility_actions`: "Publish and submit sitemap immediately on reaching minimum quality threshold."
   - Submit sitemaps to both Google Search Console **and Bing Webmaster Tools** — Bing submission is required for ChatGPT visibility and is often skipped. Use the IndexNow protocol for real-time submission to both simultaneously.

6. **Generate off-site consensus signals.** AI systems require corroboration across independent sources before citing a claim. Priority off-site actions:
   - Press quotes with verbatim brand mentions and backlinks (highest signal weight)
   - Inclusion in "best of" roundups on DA 40–70 sites
   - Industry newsletter citations (Substack, vertical newsletters)
   - Reddit/Quora presence for Perplexity specifically — upvoted answers linking to content are direct citation inputs
   - Podcast appearances with indexed show notes/transcripts

7. **Measure citations separately from mentions.** Set up measurement to distinguish citation presence from mention presence:
   - **Citation tracking:** Query AI platforms directly for your topic area and check if your content is listed as a source
   - **Mention tracking:** Monitor for brand name appearances in AI-generated responses without source attribution
   - Citations are the priority metric — they indicate your content is being used as evidence. Mentions may reflect training data co-occurrence rather than retrieval-time citation.
   - A high mention rate with low citation rate indicates brand awareness exists but content is not structured for extraction — apply steps 3–4 above.

### Edge Cases

- **New domain with no authority signals:** Do not attempt AI citation directly — entity is unresolvable. First phase: establish entity (Wikidata, GBP, NAP consistency, 3–5 indexed off-site mentions). AI citation becomes possible once the entity exists in the knowledge graph.
- **Highly competitive niche where incumbents dominate AI answers:** Target adjacent questions competitors haven't answered, not the same queries. A new entrant cannot outbid an established entity on its own questions — find the unanswered questions at the edge of the topic.
- **Platform conflict:** If `target_platforms` includes both AI Overviews and Perplexity, note that Google may block PerplexityBot via `robots.txt` guidance. Optimize for Google first, then explicitly whitelist PerplexityBot.
- **Comprehensive guide already exists:** Do not delete it — it may rank well organically and contribute to Gemini citations. Instead, extract individual question-answer pairs as standalone pages that link back to the guide. The guide serves SEO; the focused pages serve AI citation.
- **Cross-platform citation gap:** 91% of AI citations appear in only one engine. Do not assume that optimizing for one platform generalizes to others. Measure platform-specific citation presence separately and prioritize based on where your audience is concentrated.
- **Bing vs Google indexing:** Content ranking well on Google but not on Bing is invisible to ChatGPT. If ChatGPT is a priority platform, run a Bing ranking audit alongside Google — the two indexes diverge meaningfully for specialist content.
- **High mentions, low citations:** Brand appears frequently in AI responses but content is never sourced. Root cause is almost always content structure — answer units are absent, promotional language is present, or pages are comprehensive rather than focused. Apply steps 3–4 before pursuing off-site consensus signals.

---

## Instructions

Given `topic` and optional parameters, perform the following:

1. Generate `question_map`: list 10–20 questions across definitional, categorical, comparison, and process types. For each question, rate citation potential per platform (`high` | `medium` | `low`) based on: query specificity, answer extractability, and whether structured data can represent the answer.

2. Build `content_structure` for the highest-priority questions: specify required structural elements for each page — Quick Answer box, heading format, schema type(s), approximate length (800–1,200 words default), and any platform-specific requirements.

3. Produce `authority_strategy`:
   - Entity checklist: what entity signals are missing and what to create
   - Off-site consensus plan: 3–5 prioritized channel actions with the rationale for each

4. Produce `visibility_actions` as a prioritized list ordered by impact-to-effort ratio. Each action: what to do, why it improves citation probability, and which platforms benefit. Always include a publication timing action as a first item. Always include a Bing Webmaster Tools / IndexNow submission action.

If `target_platforms` is specified, weight all recommendations toward those platforms. If not specified, optimize for Google AI Overviews as the default (highest volume).

Return `question_map`, `content_structure`, `authority_strategy`, and `visibility_actions`.

---

## Example

```
Input:
  topic: private orthopedic surgery
  persona: patient considering private care
  intent_stage: consideration
  target_platforms: [ai-overviews, perplexity]

Output:
  question_map:
    - question: "Is private orthopedic surgery faster than NHS?"
      intent: comparison
      citation_potential: { ai-overviews: high, perplexity: high }
      note: "factual, answerable with NHS wait time data — high extractability"

    - question: "How much does private knee replacement cost?"
      intent: decision
      citation_potential: { ai-overviews: high, perplexity: medium }
      note: "needs price range data; add FAQ schema with cost bands"

    - question: "What is an orthopedic surgeon?"
      intent: definitional
      citation_potential: { ai-overviews: medium, perplexity: medium }
      note: "saturated — many authoritative sources already; only pursue if entity is well-established"

  content_structure:
    page: "Is private orthopedic surgery faster than NHS?"
    quick_answer: "Private orthopedic surgery typically has wait times of 1–3 weeks vs
      18+ weeks on the NHS. Most private consultations are available within 48–72 hours."
    heading_format: question-style H2s with direct answer in first sentence
    schema: FAQPage + Article + speakable
    length: 900–1,100 words
    platform_notes:
      ai-overviews: "Requires ranking in top 5 — prioritize internal links from pillar page"
      perplexity: "Ensure PerplexityBot not blocked; add Reddit thread citation in off-site plan"

  authority_strategy:
    entity_gaps:
      - Missing Wikidata entry for clinic entity
      - Author schema absent on all content pages
      - PerplexityBot blocked in current robots.txt
    off_site_plan:
      1. Pitch patient outcomes data to 2 health journalists for press quote + link
      2. Submit to "best private orthopaedic clinics" roundups (DA 45–65 targets)
      3. Answer 3 relevant Reddit threads on r/UKNHS and r/HealthcareUK with page links

  visibility_actions:
    1. [HIGH IMPACT / LOW EFFORT] Publish immediately on reaching minimum quality threshold; submit sitemap to Google Search Console and Bing Webmaster Tools (IndexNow) within 24 hours
    2. [HIGH IMPACT / LOW EFFORT] Add Quick Answer boxes to top 5 pages + FAQPage JSON-LD
    3. [HIGH IMPACT / MEDIUM EFFORT] Create Wikidata entity entry with sameAs links
    4. [HIGH IMPACT / MEDIUM EFFORT] Unblock PerplexityBot in robots.txt
    5. [MEDIUM IMPACT / HIGH EFFORT] Build off-site press quote campaign
```

---

## Dependencies

- Schema markup capability (FAQPage, Article, Person, Organization JSON-LD)
- Bing Webmaster Tools access (required for ChatGPT platform optimization)
- IndexNow API key (optional — enables real-time sitemap submission to Google + Bing simultaneously)
- Off-site content placement contacts (optional — improves consensus strategy)
- AI citation monitoring tooling (to distinguish citations from mentions)

---

## Notes

The single most common failure mode: content that is comprehensive but contains no extractable answer unit. AI systems do not summarize long pages — they extract. If a page does not contain a self-contained 40–60 word answer to a specific question, it will not be cited regardless of its ranking position or domain authority.

The second most common failure mode: optimizing for the wrong citation model. 91% of AI citations appear in only one engine. Measure platform-specific presence and invest in platform-specific tactics rather than assuming a single optimization strategy generalizes.

The third most common failure mode: ignoring Bing. ChatGPT's citation model is 87% Bing-aligned — a site with strong Google rankings but no Bing presence is invisible to ChatGPT. Bing Webmaster Tools submission is a 10-minute task that most teams skip.

The fourth most common failure mode: measuring AI mentions instead of AI citations. A brand that appears frequently in AI responses but is never sourced has awareness, not authority. The distinction matters for strategy: mentions indicate brand salience; citations indicate content extractability. Fix content structure and "safe to quote" signals to convert mentions into citations.

The Quick Answer box is the highest-ROI single change for most existing content. The second-highest: replacing one comprehensive guide with a cluster of focused, single-question pages.

The fifth most common failure mode: optimizing for informational citation in a zero-click environment. AI summaries on informational and navigational queries increasingly remove the click — the user gets the answer without visiting the source. Weight citation strategy toward decision-stage and transactional queries where AI citation triggers a next action (purchase, booking, download, contact). Measure citation volume segmented by intent stage; high citation volume on informational queries may generate brand awareness with zero visits or conversions.

---

*Made with [mdblu](https://github.com/ruco-ai/mdblu) · source: `templates/SKILL.md.template`*
