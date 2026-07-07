---
license: CC-BY-SA-4.0
title: "Social Media UTM & Organic Post Builder"
type: skill
description: "Generates fully parameterized UTM tracking links for organic social posts and writes platform-specific copy — a complete workflow from UTM schema to per-platform captions and campaign calendars."
use_when: "Use when creating, planning, or managing organic social media content with UTM tracking — building UTM URLs (utm_source / utm_medium=social_organic), writing platform captions (Instagram/Facebook/LinkedIn/TikTok/Pinterest/YouTube/Twitter/X), or producing a content calendar with trackable links."
output_type: workflow
tags: [social, utm, tracking, organic-social, content-calendar, marketing, sitegrow]
related_skills: [social-funnel, conversion-first-content]
---

# Skill: Social Media UTM & Organic Post Builder

**Author:** Ruco AI

A complete workflow for creating organic social media content with fully parameterized UTM tracking
links. Covers post copy, platform rules, UTM schema, and campaign organization.

---

## UTM Parameter Schema

Use this standardized schema for all organic social links. Every parameter has a fixed vocabulary
to keep analytics clean and consistent.

### Required Parameters

| Parameter         | Purpose                                 | Example values                                      |
|-------------------|-----------------------------------------|-----------------------------------------------------|
| `utm_source`      | The platform where the link appears     | `instagram`, `facebook`, `linkedin`, `tiktok`, `pinterest`, `youtube`, `twitter`, `x` |
| `utm_medium`      | Always `social_organic` for organic     | `social_organic`                                    |
| `utm_campaign`    | Campaign slug (snake_case, descriptive) | `mba_marketing_10_anos`, `lancamento_curso_julho`   |

### Recommended Parameters (add when known)

| Parameter              | Purpose                                      | Example values                                                                |
|------------------------|----------------------------------------------|-------------------------------------------------------------------------------|
| `utm_content`          | The specific creative asset or CTA           | `video_aula_aberta`, `carrossel_beneficios`, `link_na_bio`, `stories_swipe`   |
| `utm_term`             | Topic/keyword the post targets               | `marketing_dados`, `gestao_projetos`, `empreendedorismo`                      |
| `utm_creative_format`  | Format of the creative                       | `video`, `image`, `carrossel`, `reels`, `stories`, `text`                     |
| `utm_source_platform`  | Specific placement within the platform       | `instagram_feed`, `instagram_stories`, `instagram_reels`, `facebook_grupos`, `linkedin_feed` |
| `utm_marketing_tactic` | Strategic goal of the content                | `branding`, `awareness`, `conversao`, `retencao`, `engajamento`               |

### Full URL Example

```
https://seusite.com.br/?utm_source=instagram&utm_medium=social_organic&utm_campaign=mba_marketing_10_anos&utm_content=video_aula_aberta&utm_term=marketing_dados&utm_creative_format=video&utm_source_platform=instagram_stories&utm_marketing_tactic=branding
```

---

## UTM Builder Workflow

When the user provides a base URL and campaign details, follow these steps:

### Step 1 — Collect inputs (ask only what's missing)

Ask for or infer:
- **Base URL** (e.g., `https://seusite.com.br/`)
- **Platform** → sets `utm_source` + guides `utm_source_platform`
- **Campaign name** → becomes `utm_campaign` in snake_case
- **Content type / creative** → `utm_content` + `utm_creative_format`
- **Topic / keyword** → `utm_term`
- **Goal** → `utm_marketing_tactic`

Never ask for `utm_medium` — it is always `social_organic` for this skill.

### Step 2 — Slugify all values

- Lowercase only
- Replace spaces and hyphens with underscores (`_`)
- Remove accents and special characters (ã→a, ç→c, é→e, etc.)
- No slashes, dots, or query characters

```
"MBA Marketing 10 Anos" → mba_marketing_10_anos
"Vídeo Aula Aberta"    → video_aula_aberta
"Gestão de Projetos"   → gestao_de_projetos
```

### Step 3 — Assemble the URL

Build the query string in this order:
1. `utm_source`
2. `utm_medium`
3. `utm_campaign`
4. `utm_content` (if provided)
5. `utm_term` (if provided)
6. `utm_creative_format` (if provided)
7. `utm_source_platform` (if provided)
8. `utm_marketing_tactic` (if provided)

Append to base URL with `?` (or `&` if the URL already has query params).

### Step 4 — Output format

Always present:
1. **Full UTM URL** — ready to copy/paste
2. **Parameter breakdown table** — one row per param so the user can verify
3. **Short explanation** of what each non-obvious param means (one sentence)

---

## Platform Rules & Post Copy

Use the **Platform Reference** section below for per-platform character limits, hashtag norms, emoji
usage, caption structure, and CTA best practices before writing any post copy.

When writing copy:
- Match the platform's voice (see Platform Reference)
- Include a clear CTA pointing to the tracked URL
- Suggest relevant hashtags if the platform uses them
- Respect character/line limits
- Indicate where the link goes (bio, swipe up, caption, etc.)

---

## Batch / Content Calendar Mode

When the user needs multiple posts or a full campaign:

1. Ask for: platforms, campaign duration, posting frequency, content pillars/topics
2. Generate a table with columns: `Date | Platform | Format | utm_content | utm_source_platform | Caption (truncated) | Full UTM URL`
3. Offer to export as CSV (ask the user) — see the **CSV Template** section below for the column schema
4. Use consistent `utm_campaign` across all rows; vary `utm_content`, `utm_source_platform`, and `utm_creative_format` per asset

---

## Common Platforms — Quick Reference

| Platform    | `utm_source` | Common `utm_source_platform` values                        |
|-------------|--------------|-------------------------------------------------------------|
| Instagram   | `instagram`  | `instagram_feed`, `instagram_stories`, `instagram_reels`, `instagram_bio` |
| Facebook    | `facebook`   | `facebook_feed`, `facebook_grupos`, `facebook_stories`, `facebook_reels` |
| LinkedIn    | `linkedin`   | `linkedin_feed`, `linkedin_artigo`, `linkedin_newsletter`  |
| TikTok      | `tiktok`     | `tiktok_feed`, `tiktok_bio`                                |
| Pinterest   | `pinterest`  | `pinterest_pin`, `pinterest_ideia`                         |
| YouTube     | `youtube`    | `youtube_descricao`, `youtube_shorts`, `youtube_comunidade` |
| Twitter / X | `twitter`    | `twitter_feed`, `twitter_bio`                              |

---

## utm_marketing_tactic Values

| Tactic        | When to use                                                     |
|---------------|-----------------------------------------------------------------|
| `branding`    | Building awareness of brand, product, or person                 |
| `awareness`   | Reaching new audiences unfamiliar with the offer                |
| `conversao`   | Direct call to action — buy, sign up, enroll                    |
| `retencao`    | Re-engaging existing leads or customers                         |
| `engajamento` | Posts designed to generate comments, shares, saves              |
| `consideracao`| Mid-funnel content for audiences already aware of the product   |

---

## utm_creative_format Values

`video`, `reels`, `image`, `carrossel`, `stories`, `texto`, `link`, `ao_vivo`, `podcast_clip`

---

## Platform Reference — Organic Social Media Copy

Per-platform rules for writing captions, hashtags, CTAs, and post structure.

### Instagram

**Character limits**
- Caption: 2,200 characters (only first ~125 shown before "more")
- Hashtags: up to 30 (optimal: 5–15 targeted)
- Stories text overlay: keep under 80 characters per line

**Caption structure (feed & reels)**
```
[Hook — first line, stops the scroll]

[Body — value, story, or problem/solution]

[CTA — one clear action]

.
.
.
[Hashtags — at end or first comment]
```

**Link placement**
- **Feed / Reels**: "Link na bio 👆" or "Acesse o link na bio"
- **Stories**: Sticker de link direto ou "Arrasta pra cima" (contas verificadas)
- **Bio**: Only one clickable link — use a link-in-bio tool for multi-link campaigns

**Voice** — Conversational, aspirational, visual-first. Use line breaks aggressively. Emojis OK.
Short punchy hooks outperform long intros.

**Hashtag strategy** — Mix: 3–5 niche (#marketingdigital), 3–5 mid (#empreendedorismo), 1–2 broad (#marketing)

### Facebook

**Character limits**
- Post: 63,206 characters (optimal: under 400 for organic reach)
- Group posts: same limit, longer posts accepted culturally
- Stories: same as Instagram stories

**Caption structure**
```
[Question or bold statement to drive comments]

[Context or value — 2–4 short paragraphs]

[CTA with link directly in post — Facebook supports clickable links in captions]
```

**Link placement**
- **Feed**: Paste URL directly in caption (generates preview card); works better than "link na bio"
- **Groups**: Full URL in body text is standard
- **Stories**: Link sticker

**Voice** — Slightly more formal than Instagram. Longer text performs well in niche groups.
Community-building angle (ask questions, invite discussion) drives reach.

**Hashtag strategy** — 1–3 hashtags max. Facebook hashtags have less impact than Instagram.

### LinkedIn

**Character limits**
- Post: 3,000 characters (first ~210 shown before "ver mais")
- Article: no practical limit
- Newsletter: no practical limit

**Caption structure**
```
[Bold first line — no fluff, immediate value or insight]

[3–7 short paragraphs with line breaks between each]
- Bullet points work well
- White space is critical for readability

[CTA — comment, share, or link]

[2–5 hashtags at the end]
```

**Link placement**
- **Feed**: LinkedIn suppresses reach for posts with external links. Options:
  1. Post without link → add link in first comment → reference in caption ("link nos comentários")
  2. Include link anyway (good for direct-response campaigns)
- **Article / Newsletter**: Links in body work fine

**Voice** — Professional but human. First-person storytelling. Data, lessons learned, contrarian takes.
Avoid overly promotional language. Education > selling.

**Hashtag strategy** — 3–5 professional hashtags. (#Marketing, #GestaoDeProjetos, #Lideranca)

### TikTok

**Character limits**
- Caption: 2,200 characters (first ~100 shown)
- Hashtags: no hard limit, 3–6 recommended

**Caption structure**
```
[Short hook that mirrors the video hook]
[1–2 lines of context]
[CTA]
#hashtag1 #hashtag2 #hashtag3
```

**Link placement**
- **Bio only** (unless TikTok Shop / Business account with link-in-video)
- CTA in video itself: "Link na bio" spoken and as text overlay

**Voice** — Raw, fast, trend-aware. Hooks in the first 2 seconds. Sounds > visuals.
Trending audio dramatically affects reach — consider in content planning.

**Hashtag strategy** — Mix viral (#fyp, #foryou — low signal), niche, and topic tags. 4–8 total.

### Pinterest

**Character limits**
- Pin title: 100 characters
- Pin description: 500 characters (first 50–60 shown in feed)
- Board description: 500 characters

**Caption structure (Pin description)**
```
[Keyword-rich first sentence — Pinterest is a search engine]
[2–3 sentences of value/context]
[CTA with URL]
```

**Link placement**
- **Every pin links directly** — always include the UTM URL in the pin destination link field
- The description CTA supports the visual link

**Voice** — Inspirational, instructional, search-optimized. Think SEO: include exact keywords users search.
No hashtags needed (Pinterest deemphasizes them).

### YouTube

**Character limits**
- Video title: 100 characters (optimal: 60–70)
- Description: 5,000 characters (first 150 shown before "Show more")
- Community post: 5,000 characters

**Description structure**
```
[First 2 lines: hook + primary CTA with UTM link — visible before fold]

--- SOBRE ESTE VÍDEO ---
[Full description of content]

--- LINKS ---
[UTM link with clear label]
[Other resources]

--- CAPÍTULOS ---
00:00 Introdução
01:30 ...

--- HASHTAGS ---
#Hashtag1 #Hashtag2 #Hashtag3
```

**Link placement**
- **Description**: First 2 lines (above fold) + Links section
- **Cards & End screens**: In-video CTAs
- **Community posts**: URL directly in post body (clickable)

**Voice** — Educational, structured, high production value implied. Chapters and timestamps expected.
Subscribers want depth. Longer descriptions signal quality to algorithm.

### Twitter / X

**Character limits**
- Tweet: 280 characters (URL counts as ~23 chars)
- Thread posts: 280 each

**Caption structure**
```
[Single punchy sentence or question — the whole tweet]
[Link if needed — leave room for it]
```
Or for threads:
```
Tweet 1: Hook / bold claim
Tweet 2-N: Supporting points, each self-contained
Final tweet: CTA + link
```

**Link placement**
- **Single tweet**: URL at end (Twitter auto-generates preview card)
- **Threads**: Link in final tweet or as reply to own thread

**Voice** — Opinionated, fast, witty. Strong takes drive retweets. Use threads for nuance.
Hashtags: 1–2 max (or none — less is more on X).

### Cross-Platform Adaptation Checklist

When repurposing one piece of content across platforms:

- [ ] Adjust caption length for each platform
- [ ] Change link placement instruction (bio vs. caption vs. description)
- [ ] Update `utm_source` and `utm_source_platform` in the UTM URL
- [ ] Adapt hashtag count and strategy
- [ ] Match platform voice/tone
- [ ] Check if the creative format label needs updating (`utm_creative_format`)

---

## CSV Template

Blank template for bulk campaign planning. Columns:

```csv
data,plataforma,formato,utm_source,utm_medium,utm_campaign,utm_content,utm_term,utm_creative_format,utm_source_platform,utm_marketing_tactic,caption_preview,url_completa
2025-01-15,Instagram,Reels,instagram,social_organic,nome_da_campanha,reels_tema_principal,palavra_chave,reels,instagram_reels,awareness,"Primeira linha do caption aqui...",https://seusite.com.br/?utm_source=instagram&utm_medium=social_organic&utm_campaign=nome_da_campanha&utm_content=reels_tema_principal&utm_term=palavra_chave&utm_creative_format=reels&utm_source_platform=instagram_reels&utm_marketing_tactic=awareness
2025-01-15,Instagram,Stories,instagram,social_organic,nome_da_campanha,stories_cta_link,palavra_chave,stories,instagram_stories,conversao,"Texto do stories aqui...",https://seusite.com.br/?utm_source=instagram&utm_medium=social_organic&utm_campaign=nome_da_campanha&utm_content=stories_cta_link&utm_term=palavra_chave&utm_creative_format=stories&utm_source_platform=instagram_stories&utm_marketing_tactic=conversao
2025-01-16,LinkedIn,Artigo,linkedin,social_organic,nome_da_campanha,artigo_tema,palavra_chave,link,linkedin_artigo,consideracao,"Título do artigo aqui...",https://seusite.com.br/?utm_source=linkedin&utm_medium=social_organic&utm_campaign=nome_da_campanha&utm_content=artigo_tema&utm_term=palavra_chave&utm_creative_format=link&utm_source_platform=linkedin_artigo&utm_marketing_tactic=consideracao
```

---

> Flattened from a native Claude Code skill bundle (`social-media-utm/` — `SKILL.md` + `references/platforms.md` + `assets/utm-template.csv`) into a single self-contained `.md` for the flat skills library. If the library converges to folder-per-skill storage, restore the reference and asset as separate files.
