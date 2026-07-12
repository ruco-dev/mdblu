---
license: CC-BY-SA-4.0
title: "Instagram Carousel Architecture"
type: skill
description: "Designs the slide-by-slide structure of a static Instagram carousel — cover hook, progressive-disclosure middle, payoff, and CTA slide — with one-idea-per-slide copy written to fixed char budgets."
use_when: "Use when planning or writing a static multi-slide Instagram (or LinkedIn) carousel — sequencing slides, writing on-image copy under per-slide character limits, or designing a cover that earns the swipe. NOT for video/Reels (use social-funnel) or caption/hashtag/UTM work (use socialmedia-utm)."
output_type: structure
tags: [instagram, carousel, social, content-strategy, static-content, engagement, save-share]
related_skills: [socialmedia-utm, social-funnel, clarity-cta-optimization, conversion-first-content]
---

# Skill: Instagram Carousel Architecture

**Author:** Ruco AI

---

## Overview

> Structures a static, swipeable image carousel as a slide-by-slide narrative — where the story lives on the slides (not the caption) and every slide must earn the next swipe. Produces a slide plan with per-slide roles and on-image copy written to fit fixed character budgets.

---

## Skill Description

A carousel is not a caption with pictures attached. It is a **swipe narrative**: a sequence of image slides where each slide carries one idea and gives the viewer a reason to swipe to the next. Instagram (and LinkedIn) reward carousels with high dwell time, **saves**, and **shares** — signals that only accrue when the slides deliver self-contained value the viewer wants to keep or send on.

This changes how the content is built. The value must be legible **on the image**, because that is what gets saved and shared — not the caption. The caption's job is secondary (hook echo, context, CTA) and is handled by a different skill. This skill owns the part unique to carousels: **what goes on each slide, in what order, and in how few words.**

It applies whether the slides are hand-designed or generated from a fixed HTML/template system that imposes per-slide character limits (a common production model). When such limits exist, copy is written to fit them at authoring time — never trusted to CSS overflow.

---

## Trigger Conditions

Invoke this skill when:

- Planning a static multi-slide Instagram or LinkedIn carousel (cover + slides + CTA)
- Writing on-image copy that must fit per-slide character budgets (e.g. from a template schema)
- Deciding slide count, ordering, or which idea goes on which slide
- Designing a cover slide that has to earn the swipe *and* survive as a feed thumbnail

Do NOT invoke this skill for:

- **Video / Reels / Shorts** — use `social-funnel` (collapsed-funnel video structure with timing)
- **Caption, hashtags, link-in-bio, UTM tracking** — use `socialmedia-utm` (per-platform caption craft)
- **Single-image posts or Stories** — no swipe narrative to architect
- **Generic CTA rewriting** — use `clarity-cta-optimization`

---

## Input

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| topic | string | Yes | Subject/offer the carousel is about |
| goal | string | Yes | `awareness` \| `save` \| `share` \| `lead` — the primary action the carousel optimizes for |
| slide_budget | integer or object | No | Max slide count, OR a template schema giving per-slide fields and `max_chars` |
| aspect | string | No | `4:5` (portrait, max feed height — default) \| `1:1` (square) |
| brand_system | string | No | The visual system that carries recognition across slides (fonts, palette, logo lockup) |
| proof | array | No | Facts, numbers, or specifics that make a middle or payoff slide concrete |

---

## Output

| Field | Type | Description |
|-------|------|-------------|
| slide_plan | array | One entry per slide: `role`, `headline`, optional `support`, and the `open_loop` it leaves for the next slide |
| cover_rationale | string | Why the cover earns the swipe and reads at thumbnail size |
| cta | string | The single action on the final slide |
| caption_handoff | string | One line naming what the caption must carry — delegated to `socialmedia-utm` |

---

## Behavior

### The metric that shapes everything

Carousels win on **completion, saves, and shares**, not likes. Instagram boosts a carousel when viewers swipe to the end, save it for later, or send it to someone. Every structural decision serves one of those three: give a reason to keep swiping (completion), make it reference-worthy (saves), make it useful-to-someone-else (shares).

### Slide roles

Every slide has exactly one job. A slide with two ideas is two slides; a slide with no idea is filler and gets swiped past — killing completion.

**Slide 1 — Cover (the hook).** Does double duty: it must (a) earn the swipe and (b) survive standalone as a feed thumbnail. One promise or one tension — a curiosity gap, a concrete outcome/number, a contrarian claim, or a before→after. Legible at 1:1 thumbnail scale (large type, minimal words, brand mark small). Add a light swipe affordance (`→`, "arrasta", "swipe"). The cover is not a title card — it is the reason the post exists.

**Slides 2…N-1 — Middle (progressive disclosure).** One idea per slide. Each slide **opens a loop the next slide closes**, so momentum carries the viewer forward. Order matters: sequence so that curiosity compounds. No slide should be skippable without losing the thread. Use `proof` here to make claims concrete (a number, a spec, a specific).

**Payoff slide.** Delivers the promise the cover made. If the cover said "3 reasons," the payoff lands the strongest one; if it teased a transformation, this is the after. Do not let the CTA absorb the payoff — resolve the tension first, *then* ask.

**Final slide — CTA.** One action, stated plainly (see `clarity-cta-optimization` for verb/destination craft). This slide is also the most-screenshotted for saves, so it can restate the key takeaway alongside the ask.

### Slide count and pacing

Fewer, denser slides beat padded ones. **3–7 slides** is the working range for a value carousel; go longer only when each added slide still carries a distinct idea. Completion rate falls with every skippable slide — cut ruthlessly. If two slides share an idea, merge them.

### One-idea-per-slide copy discipline

On-image copy is a **headline + at most one short support line**. Write to the character budget at authoring time: if a template schema gives `max_chars` per field, count characters before committing copy — CSS clamping/overflow is a safety net, not the plan. Short, high-contrast, legible-while-muted (carousels are silent by nature; text legibility is the entire game).

### Aspect ratio

Default to **4:5 portrait** — it occupies the most vertical space in the feed, maximizing stop-scroll surface. Use **1:1 square** when the design system or grid demands predictability. (Vertical 9:16 is Reels/Stories territory — out of scope; see `social-funnel`.)

### The caption's (secondary) role

Keep the value **on the slides**, because the image is what gets saved and shared — not the caption. The caption echoes the cover hook, adds context the slides couldn't hold, and carries the CTA + tracked link. That work belongs to `socialmedia-utm`; this skill only emits a one-line `caption_handoff` describing what the caption must cover.

---

## Instructions

Given `topic` and `goal`, plus optional parameters:

1. **Define the single promise.** State, in one sentence, the one thing this carousel delivers. This becomes the cover hook. If you can't say it in one sentence, the carousel is trying to do too much — split it.

2. **Set slide count.** Start from the ideas, not a target number. One idea = one slide. Cut to the essential 3–7. If `slide_budget` is a template schema, respect its slide count and per-slide fields.

3. **Assign roles.** Map: cover → middle slides (progressive disclosure) → payoff → CTA. Sequence the middle slides so each opens a loop the next closes.

4. **Write per-slide copy.** For each slide, write a `headline` and (optionally) one `support` line. If `max_chars` limits exist, count characters and rewrite anything that exceeds them *before* finalizing. Note the `open_loop` each middle slide leaves.

5. **Pressure-test the cover.** Would it stop a scroll and earn a swipe? Does it read at thumbnail size? Does it stand alone if seen with no other slide? If not, rewrite it before anything else — the cover determines whether the rest is ever seen.

6. **Land the CTA.** One action on the final slide. Restate the key takeaway if it aids saves.

7. **Hand off the caption.** Emit `caption_handoff` naming what the caption must carry, and delegate to `socialmedia-utm`. If the format turns out to be video, stop and use `social-funnel` instead.

Return `slide_plan`, `cover_rationale`, `cta`, and `caption_handoff`.

---

## Example

```
Input:
  topic: "Building plot for sale — Miranda do Corvo"
  goal: save
  slide_budget: { slides: 5, headline_max_chars: 28, body_max_chars: 220 }
  aspect: 4:5
  proof: ["Corner lot, two street fronts", "Urban classification", "Water/power/sewage connected"]

Output:
  slide_plan:
    - role: cover
      headline: "Terreno para construir"       # 22 chars ≤ 28
      support: "A partir de € 000.000 · Miranda do Corvo"
      open_loop: "Where exactly — and why this lot?"
    - role: middle
      headline: "A poucos minutos de tudo"      # location payoff to the cover's implicit "where"
      support: "Lote de esquina em zona consolidada, junto a comércio, escolas e transportes."  # ≤ 220
      open_loop: "But is it actually buildable?"
    - role: payoff
      headline: "Pronto a construir"
      support: "Área · Classificação urbana · Moradia · Água, luz e saneamento"
      open_loop: "What makes it worth it over other lots?"
    - role: middle
      headline: "O que o torna especial"
      support: "Esquina (duas frentes) · junto a transportes · vistas desafogadas"
      open_loop: "How do I act on this?"
    - role: cta
      headline: "Vamos construir aqui"
      support: "Contacte-me → Nome do Consultor · +351 000 000 000"

  cover_rationale: "Leads with the concrete outcome (buildable plot + entry price) legible at
    thumbnail scale; 'a partir de' opens a price loop and the → affordance invites the swipe.
    Works as a standalone feed thumbnail."

  cta: "Contacte-me → (single action; agent contact restated for screenshot/save)."

  caption_handoff: "Caption echoes 'terreno para construir + entry price', adds plot size/legal
    detail the slides omit, and carries the tracked contact link — build via socialmedia-utm."
```

---

## Dependencies

- `socialmedia-utm` — for the caption, hashtags, link placement, and UTM tracking that accompany the carousel
- `clarity-cta-optimization` — for sharpening the final-slide CTA
- `proof` inputs (numbers, specifics) — required to make middle/payoff slides concrete rather than generic
- A consistent brand/visual system — carries recognition across slides and in the feed

---

## Notes

The most common failure is treating slide 1 as a title card instead of a hook — a labeled cover ("New Listing!") gets no swipes, so the remaining slides are never seen. The cover is the whole funnel's gate; spend disproportionate effort there.

The second failure is putting the value in the caption and using the slides as decoration. On carousels this inverts what gets distributed: people save and share the *image*. If the slides don't stand alone, the post can't be saved or shared, and the two signals that drive carousel reach never fire.

The third is padding to hit a slide count. A 4-slide carousel where every slide earns its place outperforms a 10-slide one with filler — completion rate is the metric, and filler slides are where viewers drop.

This skill is deliberately narrow: it owns **slide architecture and on-image copy** for static carousels. Caption/hashtag/UTM (`socialmedia-utm`) and video (`social-funnel`) are separate, complementary skills — invoke them alongside, don't fold them in.

---

*Made with [mdblu](https://github.com/ruco-dev/mdblu) · source: `templates/SKILL.md.template`*
