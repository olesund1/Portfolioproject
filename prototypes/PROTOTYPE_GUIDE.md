# Prototype Guide

## What this directory is

`prototypes/` is an isolated sandbox for building and testing UI ideas before
promoting them to the production portfolio (`src/`). Every prototype:

- Runs on its own Vite dev server (port 5174) — completely separate from production
- Can read from the full design system in `src/` via the `@/` alias
- Never touches `App.tsx`, main routing, or production pages
- Gets promoted to `src/` manually, only when the design is validated

---

## Running a prototype

```bash
# Dev server (hot reload, port 5174)
PROTO=feature-name/v1 npm run proto

# Production build (goes to prototypes/feature-name/v1/dist/)
PROTO=feature-name/v1 npm run proto:build
```

The production dev server (`npm run dev`) runs on port 5173 — both can run simultaneously.

---

## Rules when working in a prototype

1. **NEVER modify any file in `src/`** as part of prototype work
2. Import from the design system via `@/` freely — it resolves to `src/`
3. All prototype-specific components and files live inside the prototype directory
4. Use `ProtoShell` from `../_shared/proto-shell.tsx` as the app wrapper
5. Update `BRIEF.md` with decisions as you work

---

## Design system available in prototypes

Everything in `src/` is importable via `@/`:

| What | Import path |
|------|-------------|
| Layout components | `@/app/components/Container`, `@/app/components/Section` |
| UI components | `@/app/components/Button`, `@/app/components/Tag`, `@/app/components/CaseStudyCard` |
| UI primitives (65+) | `@/app/components/ui/dialog`, `@/app/components/ui/tabs`, etc. |
| Case study data | `@/data/caseStudies` |
| Case study types | `@/data/caseStudyTypes` |
| Design tokens | Loaded automatically by importing `@/styles/index.css` in `main.tsx` |
| Icons | `lucide-react` (already installed) |
| Animations | `motion/react` (already installed) |

---

## Tailwind class scanning note

`src/styles/tailwind.css` explicitly opts out of auto-scanning (`source(none)`) and
only scans `src/**`. This means:

- **Using existing components** (Button, Tag, etc.) → no action needed, their classes are already scanned
- **Writing new Tailwind classes in prototype files** → create a `proto.css` alongside `main.tsx`:
  ```css
  @source './**/*.{tsx,ts}';
  ```
  Then import it in `main.tsx` after `@/styles/index.css`.

---

## Starting a new prototype

```bash
mkdir -p prototypes/feature-name/v1
```

Then create these 4 files (use the templates in BRIEF.md as reference):

| File | Purpose |
|------|---------|
| `index.html` | HTML entry point for Vite |
| `main.tsx` | React root, imports styles |
| `ProtoApp.tsx` | The prototype component |
| `BRIEF.md` | Problem, hypothesis, decisions, promotion checklist |

---

## Iterating

Copy the previous version directory to create a new iteration:

```bash
cp -r prototypes/feature-name/v1 prototypes/feature-name/v2
```

Update `BRIEF.md` status in v1 to `archived`, then work in v2.

---

## Scoping Claude's context for prototype sessions

When asking Claude to work on a prototype, provide:
- The `BRIEF.md` of the version being worked on
- The relevant production components being extended (e.g. `CaseStudyCard.tsx`)
- **Not** the full `App.tsx` unless routing context is specifically needed

This keeps Claude focused on the prototype problem without being distracted by
the full production app's concerns.

---

## Promotion

When a prototype is ready to move to production, follow the checklist in `BRIEF.md`.

Summary:
1. Set `BRIEF.md` status → `promoted`
2. Copy new component files → `src/app/components/[Name].tsx`
3. If it's a new page → `src/app/pages/[Name]Page.tsx` + register in `App.tsx`
4. `npm run build` — must pass with zero TypeScript errors
5. Test dark mode: add `.dark` class to `<html>` in browser devtools
6. Test brutalist mode: add `.brutalist` class to `<html>`
7. Test mobile at 375px
8. Commit: `feat: promote [feature-name] prototype (v[N]) to production`
9. Tag: `git tag proto/[feature-name]/v[N]-promoted`

Prototype directories stay in the repo indefinitely as historical record.
