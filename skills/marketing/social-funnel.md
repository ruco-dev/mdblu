---
title: "Social-First Funnel — Collapsed Discovery and Conversion"
type: skill
description: "Structures content for social-first platforms where discovery, consideration, and purchase happen in the same content moment — replacing the sequential SEO funnel with a collapsed single-experience model."
use_when: "Use when creating content for TikTok, Instagram Reels, YouTube Shorts, or any platform where social-first traffic dominates. Also use when generating landing pages for social traffic sources in sitegrow, or when the audience skews mobile-social rather than search-intent."
output_type: strategy
tags: [content-strategy, social, tiktok, funnel, conversion, sitegrow, landing-page]
related_skills: [conversion-first-content, strategic-content-architecture, aeo-ai-visibility]
---

# Skill: Social-First Funnel — Collapsed Discovery and Conversion

**Date:** 2026-05-19
**Author:** Ruco AI

---

## Overview

> Structures content for social-first platforms where discovery, consideration, and purchase happen in the same moment — replacing the traditional sequential funnel with a single, self-contained content experience that carries all three layers.

---

## Skill Description

TikTok has collapsed the traditional marketing funnel. On TikTok and short-form video platforms, users encounter a product (awareness), understand its value (consideration), and decide to purchase (conversion) within the same 30–60 second content experience — without leaving the platform.

This is not a TikTok-specific phenomenon. Instagram Reels, YouTube Shorts, and Pinterest have adopted the same model. Social-first audiences do not follow the SEO funnel: they do not click from an awareness ad to a blog post to a product page. They buy from the content or they leave.

**The implication:** creating "awareness content" as a separate category from "conversion content" is the wrong strategy for social-first audiences. Every piece of content must carry all three funnel layers or it fails.

---

## Trigger Conditions

Invoke this skill when:

- Creating content for TikTok, Instagram Reels, YouTube Shorts, or Pinterest
- Generating landing pages in sitegrow for campaigns with social traffic sources
- Audience is mobile-first, under 35, or primarily social-platform users
- The product has a visible demonstration (cosmetics, food, tech gadgets, fashion)
- The campaign goal is direct conversion, not brand awareness over time

Do NOT invoke this skill for:
- B2B content with long sales cycles (social-first collapse does not apply)
- Search-intent audiences (use AEO or CONTENT-ARCHITECTURE skills instead)
- Products requiring complex explanation before purchase decision

---

## Input

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| product | string | Yes | Product or offer to create content for |
| platform | string | Yes | `tiktok` \| `reels` \| `shorts` \| `pinterest` \| `landing-page` |
| persona | string | No | Target audience description |
| proof | array | No | Available social proof assets (reviews, UGC, stats, creator testimonials) |
| cta_destination | string | No | URL of the purchase/conversion destination |

---

## Output

| Field | Type | Description |
|-------|------|-------------|
| content_structure | object | Collapsed funnel structure with timing and layer breakdown |
| hook | string | Opening hook (first 3 seconds) — problem statement or pattern interrupt |
| value_layer | string | Value demonstration segment (seconds 3–15) |
| proof_layer | string | Social proof and trust signals (seconds 15–25) |
| cta | string | Call to action with destination link strategy (seconds 25–30) |
| landing_page_spec | object | If `platform` is `landing-page`: above-fold requirements and conversion elements |

---

## Behavior

### The collapsed funnel structure

All three funnel layers must be present in every piece of content, in this sequence:

**Layer 1 — Hook (0–3 seconds):** Establish the problem or create a pattern interrupt. The user must stop scrolling. Do not introduce the brand here. Open with a relatable problem, a surprising claim, or a visual statement.

**Layer 2 — Value (3–15 seconds):** Show the solution in action. Do not describe the product — demonstrate it. Show the before/after, the transformation, the use case. The viewer must understand the product's value before they understand the brand. No feature lists; only visible outcomes.

**Layer 3 — Proof + CTA (15–30 seconds):** Collapse trust and conversion into the same moment. Lead with social proof (number of reviews, a customer quote, a usage stat) immediately before the CTA. The CTA must go directly to a purchase-ready destination — not a blog post, not an about page.

### The five rules for social-first content

**1. No nurture sequences.** Social-first audiences convert or leave. Do not create content designed to "educate first, sell later." Every piece must carry conversion intent.

**2. Work without sound.** 60–85% of social video is watched muted. Captions and visual storytelling are not optional.

**3. Mobile-native.** Vertical format, large text, fast cuts. Content designed for desktop viewing fails on mobile social.

**4. The CTA destination must be purchase-ready.** Social traffic arriving at a blog post or long-form landing page abandons immediately. The click must land at a page where the user can complete the purchase with one or two taps.

**5. Social proof near the top.** Do not bury reviews at the bottom. On landing pages for social traffic, reviews, ratings, or usage numbers belong in the first screen, not the third.

### Landing pages for social traffic (sitegrow context)

When generating landing pages for social campaign traffic in sitegrow, the above-the-fold section must include:
- Headline: problem statement or transformation promise (not the brand name)
- Subheadline: key differentiator or primary value prop
- Hero image/video: product in use or transformation visual
- Social proof element: star rating with review count, or a short customer quote
- Primary CTA button: visible without scrolling, linking to checkout or product page

Below the fold: FAQ (short, specific), secondary social proof (UGC gallery or review excerpts), and a repeated CTA. No long-form explanation sections.

### Platform-specific adjustments

| Platform | Video length | Key format note |
|----------|-------------|-----------------|
| TikTok | 15–30s (hook at <3s) | Native captions, text overlays, trending audio |
| Instagram Reels | 15–30s | Same structure; slightly longer hook tolerance |
| YouTube Shorts | 30–60s | Can extend proof layer; slightly more product detail acceptable |
| Pinterest | Static or 6–15s | Focus on visual transformation; text overlay with outcome |
| Landing page | N/A | Above-fold = collapsed funnel; below-fold = FAQ + proof reinforcement |

---

## Instructions

Given `product`, `platform`, and optional parameters:

1. Generate `hook`: a 1–2 sentence opening that names the problem or creates a pattern interrupt. Do not mention the product name. Test: would this make a social-media user stop scrolling?

2. Generate `value_layer`: a 2–3 sentence description of the demonstration or transformation. Focus on visible outcomes, not features. What does the user see, feel, or achieve?

3. Generate `proof_layer`: select the strongest available proof element from `proof` parameter, or suggest what proof to obtain. Format for the platform (text overlay, voiceover, comment screenshot).

4. Generate `cta`: a single direct call-to-action statement with the link/destination. If `cta_destination` is provided, write the CTA to that destination. If not, suggest the destination type (product page, checkout, etc.).

5. If `platform` is `landing-page`, generate `landing_page_spec` with:
   - `above_fold`: elements required in the first screen
   - `social_proof_placement`: where and what proof to show
   - `cta_placement`: how many CTAs, where, and what text
   - `below_fold_sections`: recommended sections in order

Return all fields.

---

## Example

```
Input:
  product: "Anti-humidity hair serum"
  platform: tiktok
  persona: "Women 18–30, deal with frizzy hair in humid weather"
  proof: ["4.8 stars, 2,400 reviews", "Before/after photos from customers"]
  cta_destination: "https://brand.com/serum"

Output:
  hook: "My hair looks like this every summer morning. Until I found this."
  (show: close-up of frizzy hair → 3-second pause for recognition)

  value_layer: "One pump before you leave the house. By the time you get there, your hair looks like this."
  (show: 8-second transformation clip — serum application → before/after in humid environment)

  proof_layer: "2,400 people gave it 4.8 stars. These are their results."
  (show: 4-5 customer photo screenshots as quick cuts)

  cta: "Link in bio → brand.com/serum — ships tomorrow."

  content_structure:
    layer_1_hook: "0–3s: frizzy hair reveal, relatable problem"
    layer_2_value: "3–15s: application + transformation visual"
    layer_3_proof_cta: "15–25s: review count + customer photos; 25–30s: CTA"
    format: "vertical 9:16, captions on all segments, no voiceover required"
```

---

## Dependencies

- Social proof assets (reviews, UGC photos, usage stats) — required for Layer 3
- Purchase-ready destination URL — required for CTA
- For sitegrow landing pages: mobile-optimized page builder with above-fold hero component

---

## Notes

The single most common failure: social-first traffic landing on a page built for search-intent audiences. SEO landing pages front-load brand story; social audiences skip it. If the page requires scrolling to reach social proof or the CTA, conversion rate will be low regardless of how good the social content was.

The second most common failure: treating the hook as an ad headline. The hook is not "Buy the best hair serum." It is a moment of recognition — the user must see themselves in the problem before they will trust the solution.

This skill is complementary to AEO (for SEO-first content) and CRO (for general conversion optimization). The key distinction: AEO optimizes for AI citation in search contexts; this skill optimizes for conversion in social contexts. They address different audience acquisition models and should not be blended without intentional adaptation.

---

*Made with [mdblu](https://github.com/ruco-ai/mdblu) · source: `templates/SKILL.md.template`*
