# casestudy/claude.md

Case Study Structure Reference for the Portfolio Project

This file documents the structure and fields required to add a new case study to the portfolio. Use this as a template when creating case studies.

## Overview

Case studies exist in three locations in the codebase:
1. **HomePage.tsx** - Brief card data displayed in grid
2. **CaseStudyPage.tsx** - Detailed case study data (switch statement)
3. **portfolioKnowledge.ts** - Chatbot keywords and suggestions

This guide covers all three, providing templates and field descriptions.

## Quick Template

Copy this template and fill in your content:

```tsx
// In HomePage.tsx caseStudies array:
{
  id: 'project-id',
  title: 'Project Title',
  description: 'One sentence summary of the project.',
  tags: ['Tag1', 'Tag2'],
  imageUrl: 'https://images.unsplash.com/...',
  year: '2024',
},

// In CaseStudyPage.tsx caseStudyData:
'project-id': {
  title: 'Full Project Title',
  subtitle: 'Extended subtitle describing the work',
  tags: ['Tag1', 'Tag2', 'Tag3'],
  heroImage: 'https://images.unsplash.com/...',
  overview: {
    role: 'Your Role',
    timeline: '3-12 months',
    team: 'Team composition',
    year: '2024',
  },
  problem: 'Problem statement paragraph.',
  challenge: 'Challenge as a question.',
  outcome: {
    metrics: [
      { label: 'Metric 1', value: 'XX% improvement' },
      { label: 'Metric 2', value: 'YY value' },
    ],
  },
  process: [
    {
      title: 'Phase 1',
      description: 'What was done and why.',
      image: undefined,
    },
  ],
  keyInsights: [
    {
      phase: 'Phase 1',
      insights: ['Key insight 1', 'Key insight 2'],
    },
  ],
  solution: 'Summary of the solution delivered.',
  solutionImages: ['https://...', 'https://...'],
  reflection: 'Personal reflection on learnings.',
},

// In portfolioKnowledge.ts:
'case-study-project-id': {
  keywords: ['project', 'keyword1', 'keyword2'],
  title: 'Project Title',
  description: 'Brief description for chatbot suggestions',
  caseStudyId: 'project-id',
},
```

## Field Details

### HomePage.tsx Case Study Card

**id** (required, string, unique)
- Format: kebab-case (e.g., 'b2p-redesign', 'healthcare-platform')
- Used for routing and lookup in CaseStudyPage
- Must be unique across all case studies

**title** (required, string, 40 chars max)
- Short, compelling project title
- Example: 'Partner Platform (B2P) Redesign'
- Appears in grid card and page header

**description** (required, string, 100-150 chars)
- One sentence summary of what was accomplished
- Highlight the business impact or user benefit
- Example: 'Modernized the partner platform for Sweden's largest electricity distributor, reducing manual work by 60% and improving partner satisfaction.'

**tags** (required, array of 2-3 strings)
- Skills or domains demonstrated
- Examples: ['Enterprise', 'B2B', 'UX Strategy']
- Examples: ['Healthcare', 'Accessibility', 'WCAG 2.1']
- Examples: ['E-commerce', 'Conversion', 'A/B Testing']

**imageUrl** (required, string)
- Card image URL (aspect ratio ~16:10)
- Use Unsplash URLs: https://images.unsplash.com/photo-ID?w=800&q=80
- Displayed in grid cards with hover zoom effect

**year** (required, string, YYYY format)
- Year of completion or current year for ongoing projects
- Example: '2024', '2026'

### CaseStudyPage.tsx Detailed Data

**title** (required, string)
- Full project title, can be longer than card title
- Example: 'Partner Platform (B2P) Redesign'

**subtitle** (required, string)
- Extended description of the work
- 1-2 sentences describing what was achieved
- Example: 'Modernizing an outdated system to reduce manual work and improve partner experience'

**tags** (required, array of 3-5 strings)
- More comprehensive than card tags
- Include tools, methodologies, and domains
- Example: ['Enterprise', 'B2B', 'UX Strategy', 'Design System', 'User Research']

**heroImage** (required, string)
- Large hero image at top of case study page
- Use larger Unsplash URL: https://images.unsplash.com/photo-ID?w=1200&q=80
- Aspect ratio: 16:9 or wider

**overview** (required, object)
- Meta information about the project
```tsx
overview: {
  role: 'Lead UX Designer',           // Your role on project
  timeline: '9-12 months',            // Duration
  team: '1 PM, 2-3 Engineers, 1-2 Designers',  // Team composition
  year: '2026',                       // Year completed
}
```

**problem** (required, string, 200-300 chars)
- The problem that needed solving
- Include context and impact
- Example: 'The Partner Platform serving 900,000+ active customers... was technically outdated and required extensive manual work... High operational costs, poor UX, and low partner satisfaction were affecting business scalability and relationships.'

**challenge** (required, string, phrased as question)
- Challenge reframed as an opportunity/question
- Format: 'How might we...'
- Example: 'How might we redesign the Partner Platform to dramatically reduce manual work, lower operational costs, and create an intuitive experience that supports partner growth?'

**outcome** (required, object with metrics array)
- Results and impact metrics
```tsx
outcome: {
  metrics: [
    { label: 'Manual work reduction', value: '60% decrease' },
    { label: 'Platform efficiency', value: '3.5x improvement' },
    { label: 'Partner satisfaction', value: '4.5/5.0' },
    { label: 'Partner adoption', value: '85% increase' },
  ],
}
```
- Include 3-5 metrics showing impact
- Mix of quantitative (percentages) and qualitative (scores, feedback)
- Focus on user benefit AND business impact

**process** (required, array of process objects)
- 2-5 phases of the design process
- Each object has: title, description, and optional image
```tsx
process: [
  {
    title: 'Research & Discovery',
    description: 'What was done and approach taken.',
    image: undefined,
  },
  // More phases...
]
```
- **title**: Phase name (e.g., 'Research & Discovery', 'Strategy & Planning', 'Design & Testing')
- **description**: 2-3 sentences on what was done, approach, and rationale
- **image**: Optional image to display during this phase (e.g., '/images/phase-diagram.png' or undefined)

**keyInsights** (required, array of phase insight objects)
- Consolidated insights from all process phases
- Grouped by phase for context and clarity
```tsx
keyInsights: [
  {
    phase: 'Research & Discovery',
    insights: [
      'Key finding or insight',
      'Another important discovery',
      'Critical learning from this phase',
    ],
  },
  {
    phase: 'Strategy & Planning',
    insights: [
      'Strategic insight',
      'Planning discovery',
    ],
  },
  // More phases...
]
```
- **phase**: Name of the process phase (must match a process title)
- **insights**: Array of 3-5 key findings or learnings from this phase

**solution** (required, string, 200-300 chars)
- Summary of the solution delivered
- What was built/designed and key features
- Example: 'The redesigned Partner Platform featured an intuitive dashboard providing real-time insights, automated workflows eliminating manual tasks, streamlined information architecture, and seamless API integration.'

**solutionImages** (required, array of 2+ strings)
- Images showing the solution/final design
- Use Unsplash URLs: https://images.unsplash.com/photo-ID?w=800&q=80
- Minimum 2 images, typically 3-4

**reflection** (required, string, 200-400 chars)
- Personal reflection on what was learned
- What would you do differently? What surprised you?
- Example: 'This project demonstrated the value of true full-ownership in the design process—from initial research through developer collaboration and testing. I learned how to balance competing stakeholder needs...'

## Integration: Step-by-Step

### Step 1: Add to HomePage.tsx

Find the `caseStudies` array (around line 14):
```tsx
const caseStudies = [
  { existing case study... },
  // Add your new case study here:
  {
    id: 'my-project',
    title: 'My Project Title',
    description: 'Short description.',
    tags: ['Tag1', 'Tag2'],
    imageUrl: 'https://images.unsplash.com/...',
    year: '2024',
  },
];
```

### Step 2: Add to CaseStudyPage.tsx

Find the `caseStudyData` object (around line 16), add a new case:
```tsx
const caseStudyData = {
  'b2p-redesign': { existing... },
  'my-project': {
    title: 'My Project Title',
    subtitle: 'Extended subtitle',
    tags: ['Tag1', 'Tag2', 'Tag3'],
    heroImage: 'https://images.unsplash.com/photo-ID?w=1200&q=80',
    overview: { role, timeline, team, year },
    problem: 'Problem description',
    challenge: 'How might we...?',
    outcome: { metrics: [...] },
    process: [
      { title: 'Phase 1', description: '...', image: undefined },
      { title: 'Phase 2', description: '...', image: undefined },
    ],
    keyInsights: [
      { phase: 'Phase 1', insights: [...] },
      { phase: 'Phase 2', insights: [...] },
    ],
    solution: 'Solution description',
    solutionImages: [...],
    reflection: 'Reflection on learnings',
  },
};
```

### Step 3: Add to portfolioKnowledge.ts

Add entry for chatbot to suggest the case study:
```tsx
'case-study-myproject': {
  keywords: ['my project', 'project keyword', 'domain area'],
  title: 'My Project',
  description: 'Description of the case study',
  caseStudyId: 'my-project',
},
```

## Image Guidelines

**Sources:**
- Use Unsplash for free, high-quality images
- Search for relevant industry/domain images
- Ensure images are at least 1200px wide

**Formats:**
- Card image: ?w=800&q=80 (aspect ratio 16:10)
- Hero image: ?w=1200&q=80 (aspect ratio 16:9)
- Solution images: ?w=800&q=80

**Fallback:**
- If image fails, ImageWithFallback component displays graceful placeholder
- Images from Figma Make may fail—use Unsplash as reliable source

## Verification Checklist

- [ ] `id` is unique and kebab-case
- [ ] `title` is compelling (3-6 words)
- [ ] `description` highlights impact (1-2 sentences, 100-150 chars)
- [ ] `tags` relevant to skills demonstrated (2-3 for card, 3-5 for detail)
- [ ] All image URLs are valid Unsplash links
- [ ] `year` is in YYYY format
- [ ] `problem` statement is clear and includes context
- [ ] `challenge` is phrased as "How might we..." question
- [ ] `outcome.metrics` has 3-5 entries with quantifiable results
- [ ] `process` has 2-5 phases (title, description, optional image)
- [ ] `keyInsights` has all phases with grouped insights
- [ ] `solution` summarizes the delivered solution
- [ ] `solutionImages` has 2+ valid image URLs
- [ ] `reflection` provides personal learning/insight
- [ ] Case study appears in HomePage grid
- [ ] Clicking card navigates to detail page
- [ ] Chatbot can suggest case study via keywords

## Real Examples

**Example 1: B2P Redesign (Enterprise SaaS)**
- ID: 'b2p-redesign'
- Timeline: 9-12 months (long, complex project)
- Team: PM, 2-3 Engineers, 1-2 Designers (cross-functional)
- Metrics: Focus on efficiency gains and adoption rates
- Process: 3 phases (Research, Strategy, Design)

**Example 2: Healthcare Portal (Healthcare/Accessibility)**
- ID: 'healthcare-platform'
- Timeline: 6 months (medium project)
- Accessibility is key focus
- Metrics: No-shows reduction, WCAG compliance
- Process: 3 phases with accessibility focus

**Example 3: E-commerce Checkout (Performance/Conversion)**
- ID: 'ecommerce-checkout'
- Timeline: 3 months (rapid project)
- Focus on conversion and analytics
- Metrics: Conversion rate, cart abandonment
- Process: 3 phases with testing/iteration

---

For frontend development questions, see frontend/claude.md. For design-to-code implementation, see figma/claude.md.
