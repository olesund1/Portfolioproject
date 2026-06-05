# Case Study Layout — v1

## Status
`archived`

## Feature
Outcome-first narrative arc for the case study detail page.

## Problem Statement
The current case study page renders sections in a fixed, formulaic order:
Hero → Challenge → Design Process → Deliverables → Results.

This reads like a template, not a story. The payoff (outcomes, impact, quote) is buried
at the bottom after a long scroll, meaning skimmers — such as recruiters spending 30-90s
on the page — may never see it.

## Hypothesis
Restructuring the page so it opens with the outcome early, then digs into the work, will
create a more editorial, higher-impact experience that rewards both skimmers and deep readers.
An explicit "At-a-Glance Brief" strip directly below the hero will let anyone grasp the
project scope in seconds.

## Design Decisions
- Decision: Show `results.intro` in the At-a-Glance Brief strip — this is the one-sentence
  outcome summary already in the data, so no new fields needed
- Decision: Keep process steps as numbered chapters (not accordion) — visible at a glance
  communicates depth without hiding effort
- Decision: Show results/quote BEFORE deliverables — lead with impact, then show evidence
- Decision: Use `nordic-choice-hotels` as the primary test case — has a quote, 7 process
  images, and rich copy; the most demanding case in the data
- Decision: Include a simple case switcher (dropdown) to preview `b2p-redesign` which has
  `hideResults: true` — tests the blurred-results state with the new layout

## Diverges from Production In
- Section order: Outcome moves before Deliverables
- Process: numbered chapters with inline images (vs card grid + separate gallery)
- Challenge: no rigid two-column heading layout — runs full-width as narrative prose
- Hero: larger typographic treatment (bigger title, more breathing room)
- At-a-Glance Brief: new section not present in production
- No image modals/carousels (out of scope for this layout prototype)

## Components Used from Design System
- `@/_shared/proto-shell.tsx` — PROTOTYPE banner wrapper
- `@/app/components/Container` — max-width wrapper
- `@/app/components/Section` — vertical spacing
- `@/app/components/Tag` — tags in hero and brief strip
- `@/app/components/Button` — back nav
- `motion/react` — scroll-triggered fade-ins

## Components Created in This Prototype
- `ProtoApp.tsx` — full prototype layout (monolithic for now; split into named components on promotion)

## Iteration Notes
- Started: 2026-06-05
- Key learnings: [fill in as you iterate]

---

## Promotion Checklist

Complete this before moving any code to `src/`:

### Code quality
- [ ] Layout sections extracted from ProtoApp into properly named component files
- [ ] TypeScript prop interfaces complete on all new components
- [ ] No hardcoded color values (use design tokens only: `text-foreground`, `bg-accent`, etc.)
- [ ] No `console.log` statements
- [ ] All imports use `@/` alias (no `../../` relative paths)

### Theme compatibility
- [ ] Light mode: looks correct (default)
- [ ] Dark mode: add `.dark` class to `<html>` in browser devtools → verify
- [ ] Brutalist mode: add `.brutalist` class to `<html>` → verify
- [ ] Mobile: test at 375px viewport width

### Integration
- [ ] `CaseStudyTemplate.tsx` in `src/app/components/` replaced or updated
- [ ] New section order reflected in `CaseStudyPage.tsx`
- [ ] `npm run build` passes with zero TypeScript errors

### Wrap-up
- [ ] BRIEF.md status updated to `promoted`
- [ ] Commit: `feat: promote case-study-layout prototype (v1) to production`
- [ ] Tag: `git tag proto/case-study-layout/v1-promoted`
