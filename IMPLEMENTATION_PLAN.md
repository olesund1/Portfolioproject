# Case Study Template Implementation Plan

## Overview
Implement a reusable case study template layout based on Figma design at `/casestudy/:id` route. Each case study will be stored as a JSON file and dynamically loaded based on the URL parameter.

---

## Phase 1: Route Setup ✅ COMPLETE
**Goal:** Enable `/casestudy/:id` routing and basic data loading

### Tasks:
- [x] Existing `App.tsx` routing already supports `caseStudyId` — no changes needed
- [x] `handleNavigate()` already supports routing to case studies
- [x] Conditional rendering already exists in `App.tsx:129`
- [x] Created `src/data/caseStudies/` directory structure
- [x] Created `src/data/caseStudyTypes.ts` — TypeScript interface for case study data
- [x] Created `src/data/caseStudies/ecommerce-checkout.json` — example data file
- [x] Created `src/app/utils/loadCaseStudy.ts` — loader utility
- [x] Build verified — all new files compile successfully

### Expected Outcome:
- ✅ Data infrastructure ready for template component
- ✅ JSON-based data loading works

---

## Phase 2: Template Layout ✅ COMPLETE
**Goal:** Build reusable `CaseStudyTemplate` component matching Figma design

### Component Sections:
- [x] **Header Container** - Back button with border-bottom separator
- [x] **Hero Section** - Uppercase tags, title, subtitle, hero image (21:9 aspect)
- [x] **Challenge Section** - Two-column layout: heading left (300px) + body right
- [x] **Design Process Section** - Two-column with intro, flex-wrap step cards, key insights bullet list
- [x] **Deliverables Section** - Two-column with intro + 2-column image grid (4:3 aspect)
- [x] **Results & Impact Section** - bg-accent, 4-column KPI cards with glass effect
- [x] **CTA Section** - Centered heading + primary button

### Styling:
- [x] Uses existing Container, Button components and design tokens
- [x] Spacing matches Figma (Container = max-w-6xl ≈ 1143px, lg:px-12 = 48px)
- [x] All colors use theme tokens (text-accent, text-muted-foreground, bg-accent, etc.)

### Integration:
- [x] CaseStudyPage.tsx updated — checks for JSON data first, falls back to legacy layout
- [x] Build verified — compiles cleanly

### Props Interface:
```typescript
interface CaseStudyData {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  heroImage: string;
  challenge: string;
  designProcess: {
    intro: string;
    steps: { title: string; description: string }[];
    insights: string[];
  };
  deliverables: {
    intro: string;
    images: string[];
  };
  results: {
    intro: string;
    kpis: { label: string; value: string }[];
  };
}
```

### Expected Outcome:
- Fully styled `CaseStudyTemplate` component
- Accepts case study data as props
- Responsive layout matching Figma design

---

## Phase 3: Data Structure & JSON Files ✅ COMPLETE
**Goal:** Create case study JSON files and loading mechanism

### Tasks:
- [x] All 5 case studies migrated from hardcoded data to JSON files
- [x] `loadCaseStudy.ts` updated with all 5 imports
- [x] Build verified — all files compile cleanly

### JSON Files Created:
- `src/data/caseStudies/b2p-redesign.json`
- `src/data/caseStudies/healthcare-platform.json`
- `src/data/caseStudies/ecommerce-checkout.json`
- `src/data/caseStudies/customer-centricity.json`
- `src/data/caseStudies/customer-energy-transformation.json`

### JSON File Structure:
```json
{
  "id": "ecommerce",
  "title": "E-commerce Checkout Optimization",
  "subtitle": "Improving conversion rates through simplified checkout flow",
  "tags": ["UX Design", "E-commerce", "Mobile"],
  "heroImage": "url-to-hero-image",
  "challenge": "The original checkout process had 5+ steps...",
  "designProcess": {
    "intro": "We followed a structured design methodology...",
    "steps": [
      { "title": "Research", "description": "..." },
      { "title": "Prototyping", "description": "..." },
      { "title": "Testing", "description": "..." }
    ],
    "insights": ["Insight 1", "Insight 2", "Insight 3", "Insight 4"]
  },
  "deliverables": {
    "intro": "The final deliverables included...",
    "images": ["url1", "url2"]
  },
  "results": {
    "intro": "The redesigned experience delivered measurable improvements...",
    "kpis": [
      { "label": "Conversion rate", "value": "25% increase" },
      { "label": "Cart abandonment", "value": "18% decrease" }
    ]
  }
}
```

### Expected Outcome:
- Example case study JSON file created and tested
- Data loading function works reliably
- Ready to add more case studies by creating new JSON files

---

## Phase 4: Content Integration ✅ COMPLETE
**Goal:** Wire everything together and test end-to-end

### Tasks:
- [x] Removed 620+ lines of dead code from CaseStudyPage.tsx (665 → 45 lines)
- [x] Added graceful "not found" fallback for unknown case study IDs
- [x] Fixed stale fallback ID ('fintech-app' → 'b2p-redesign') in App.tsx
- [x] Verified all 5 HomePage IDs match loadCaseStudy map keys
- [x] Verified all JSON filenames match their internal `id` fields
- [x] Verified full routing chain: HomePage → handleNavigate → pushState → parseUrl → CaseStudyPage → loadCaseStudy → JSON → CaseStudyTemplate
- [x] Build passes cleanly (JS bundle reduced by ~29 kB after dead code removal)

---

## File Structure After Implementation

```
src/
├── app/
│   ├── App.tsx                        ← URL routing (parseUrl/buildUrl/pushState)
│   ├── components/
│   │   └── CaseStudyTemplate.tsx      ← NEW — Figma template component
│   ├── pages/
│   │   └── CaseStudyPage.tsx          ← Simplified (45 lines) — loads JSON + renders template
│   └── utils/
│       └── loadCaseStudy.ts           ← NEW — imports JSON files, returns typed data
└── data/
    ├── caseStudyTypes.ts              ← NEW — TypeScript interface
    └── caseStudies/
        ├── b2p-redesign.json
        ├── healthcare-platform.json
        ├── ecommerce-checkout.json
        ├── customer-centricity.json
        └── customer-energy-transformation.json
```

---

## How to Add a New Case Study

1. Create `src/data/caseStudies/my-new-project.json` (copy any existing JSON as a starting point)
2. Add import + map entry to `src/app/utils/loadCaseStudy.ts`
3. Add a card entry to the `caseStudies` array in `src/app/pages/HomePage.tsx`

No component code changes needed — the template and routing handle everything automatically.

