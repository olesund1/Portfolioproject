# Example Feature — v1

## Status
`active`

## Feature
Template prototype demonstrating the prototype scaffold. Replace with your actual feature.

## Problem Statement
[What UX or technical problem is this prototype exploring?
Be specific: "Recruiters can't quickly filter case studies by discipline" is better than "case studies are hard to navigate".]

## Hypothesis
[What do you believe this design approach will achieve?
e.g. "A filterable grid with discipline tags will reduce time-to-relevant-work for recruiters visiting from job applications."]

## Design Decisions
- Decision: [What you chose and why — document as you go, not after]

## Diverges from Production In
- [List intentional differences from the production site, e.g. "Uses a 3-column grid instead of 2-column"]

## Components Used from Design System
- `@/app/components/Button`
- `@/app/components/Tag`
- `@/app/components/Container`
- `@/app/components/Section`

## Components Created in This Prototype
- `ProtoApp.tsx` — top-level prototype component (scaffold placeholder)

## Iteration Notes
- Started: 2026-06-05
- Key learnings: [fill in as you iterate]

---

## Promotion Checklist

Complete this before moving any code to `src/`:

### Code quality
- [ ] New components extracted from ProtoApp into properly named files
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
- [ ] Component copied to `src/app/components/[ComponentName].tsx`
- [ ] If new page: copied to `src/app/pages/[PageName]Page.tsx`
- [ ] If new page: `PageType` union updated in `App.tsx`
- [ ] If new page: registered in `App.tsx` `renderPage()` switch + `handleNavigate` reachable
- [ ] `npm run build` passes with zero TypeScript errors

### Wrap-up
- [ ] BRIEF.md status updated to `promoted`
- [ ] Commit: `feat: promote [feature-name] prototype (v1) to production`
- [ ] Tag: `git tag proto/[feature-name]/v1-promoted`
