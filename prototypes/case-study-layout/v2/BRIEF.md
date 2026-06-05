# Case Study Layout — v2

## Status
`active`

## Feature
Red-thread narrative continuity for the case study detail page.

## Problem Statement
v1 fixed the section *order* (outcome-first, At-a-Glance Brief, numbered chapters) but the
sections still feel like isolated template boxes. Each one announces itself with a generic
label ("Design Process", "Deliverables") and is visually hard-stopped from the next with
full-width borders and colour blocks. The reader's eye and brain both reset at every divider.
The result: no red thread, no sense that one beat causes the next.

## Hypothesis
Two simultaneous interventions will create continuous narrative flow:

1. **Transitional bridge sentences** at the top of each section answer "why am I reading
   this next?" explicitly — turning category labels into story beats.
2. **Softer visual separators** (space + a spine line instead of hard borders, and a
   contained outcome card instead of a full-bleed accent stop) keep scroll momentum.

Together they should make the case study feel like a single piece of writing, not a slide deck.

## Design Decisions

- Decision: `TransitionBridge` is a shared component, not inline prose — makes it easy to
  override per-case via a `bridges` map in ProtoApp. For promotion, these would become
  optional `transitions` fields in the case JSON (falling back to generic strings).

- Decision: Spine line only on desktop (`hidden md:block`), placed in the fixed 80px
  gutter column — mirrors the numbered-chapters grid from v1 without adding a new element.

- Decision: Contained outcome card (`bg-accent/10 border border-accent/20 rounded-2xl`)
  replaces the full-bleed `bg-accent` stop. Keeps the accent association, removes the
  visual "page reset". Quote and KPI grid both live inside this card.

- Decision: Challenge rendered as editorial pull-quote (`border-l-4 border-accent pl-6`,
  bumped to `text-3xl md:text-4xl`) — gives the problem statement narrative weight
  before the work begins.

- Decision: Hard `border-t` rules removed between sections except at the very bottom CTA.
  Sections breathe via padding/margin alone.

## Diverges from v1 In
- `TransitionBridge` component added between each section
- `WorkSection`: spine line added in number gutter; `border-t` rule removed
- `OutcomeSection`: full-bleed accent → contained card; hard top border removed
- `ChallengeSection`: larger type, left accent border treatment
- Section separators: space-only (no `border-t` mid-page)

## Inherits from v1 (unchanged)
- Section order: Hero → Brief → Challenge → Work → Outcome → Deliverables
- At-a-Glance Brief strip
- Numbered process chapters with inline images
- `Container` / `Section` / `Tag` / `Button` component usage
- Static image gallery (no modal)
- Case switcher (nordic-choice-hotels / b2p-redesign)

## Components Used from Design System
- `@/_shared/proto-shell.tsx` — PROTOTYPE banner wrapper
- `@/app/components/Container` — max-width wrapper
- `@/app/components/Section` — vertical spacing
- `@/app/components/Tag` — tags in hero and brief strip
- `@/app/components/Button` — back nav
- `motion/react` — scroll-triggered fade-ins

## Components Created in This Prototype
- `ProtoApp.tsx` — full prototype layout (monolithic; split into named components on promotion)
  - `TransitionBridge` — per-section narrative connector sentence
  - Revised `HeroSection`, `ChallengeSection`, `WorkSection`, `OutcomeSection`, `DeliverablesSection`

## Iteration Notes
- Started: 2026-06-05
- Builds on: v1 (archived)
- Key learnings: [fill in as you iterate]

---

## Promotion Checklist

Complete this before moving any code to `src/`:

### Code quality
- [ ] Layout sections extracted from ProtoApp into properly named component files
- [ ] TypeScript prop interfaces complete on all new components
- [ ] No hardcoded color values (use design tokens only)
- [ ] No `console.log` statements
- [ ] All imports use `@/` alias

### Theme compatibility
- [ ] Light mode: looks correct (default)
- [ ] Dark mode: add `.dark` class to `<html>` in browser devtools → verify
- [ ] Brutalist mode: add `.brutalist` class to `<html>` → verify
- [ ] Mobile: test at 375px viewport width

### Integration
- [ ] `CaseStudyTemplate.tsx` in `src/app/components/` replaced or updated
- [ ] Bridge strings moved to JSON `transitions` fields (or a centralized fallback map)
- [ ] `npm run build` passes with zero TypeScript errors

### Wrap-up
- [ ] BRIEF.md status updated to `promoted`
- [ ] Commit: `feat: promote case-study-layout prototype (v2) to production`
- [ ] Tag: `git tag proto/case-study-layout/v2-promoted`
