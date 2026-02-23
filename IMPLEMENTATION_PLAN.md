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

## Phase 2: Template Layout
**Goal:** Build reusable `CaseStudyTemplate` component matching Figma design

### Component Sections:
- [ ] **Header Container** - Back button with border
- [ ] **Hero Section** - Project tags, title, subtitle, hero image
- [ ] **Challenge Section** - Title + body content
- [ ] **Design Process Section** - Body text + design steps (3 step cards) + key insights (bullet list)
- [ ] **Deliverables Section** - Body text + 2-column image grid
- [ ] **Results & Impact Section** - Dark green background, 4 KPI cards
- [ ] **CTA Section** - "Interested in more work?" + "View All Projects" button

### Styling:
- [ ] Use existing Tailwind classes and design tokens from `theme.css`
- [ ] Maintain spacing/padding consistency (48px horizontal, 96px vertical)
- [ ] Follow project's color palette and typography

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

## Phase 3: Data Structure & JSON Files
**Goal:** Create case study JSON files and loading mechanism

### Tasks:
- [ ] Design JSON schema for case studies
- [ ] Create example case study JSON file: `src/data/caseStudies/ecommerce.json`
- [ ] Implement `loadCaseStudy.ts` to:
  - Accept case study ID
  - Import and parse JSON
  - Handle errors/missing files
  - Return typed case study data
- [ ] Test data loading with example case study

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

## Phase 4: Content Integration
**Goal:** Wire everything together and test end-to-end

### Tasks:
- [ ] Connect case study data to template component
- [ ] Test `/casestudy/ecommerce` route displays correct content
- [ ] Verify all sections render correctly with real data
- [ ] Test "Back to Work" button navigation
- [ ] Test "View All Projects" CTA button
- [ ] Create one additional test case study (optional)
- [ ] Handle edge cases (missing case study, invalid ID)

### Expected Outcome:
- Full end-to-end case study page functional
- Navigation works as expected
- Ready for additional case studies

---

## File Structure After Implementation

```
src/
├── app/
│   ├── App.tsx (updated - case study routing)
│   ├── components/
│   │   └── CaseStudyTemplate.tsx (new)
│   ├── pages/
│   │   └── CaseStudyPage.tsx (updated - may be merged with template)
│   └── utils/
│       └── loadCaseStudy.ts (new)
└── data/
    └── caseStudies/
        ├── ecommerce.json
        └── [other-case-study].json
```

---

## Notes
- **No breaking changes** - existing pages remain functional
- **Gradual expansion** - add new case studies by creating JSON files
- **Simple loading** - no complex state management needed
- **Styling** - all within existing Tailwind/design token system

