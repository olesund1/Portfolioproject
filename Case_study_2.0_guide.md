# Case Study 2.0 Template Guide

## Overview

The Case Study 2.0 template represents a modernized structure for displaying portfolio projects. Built from the Figma design specification (node 4881:94308), this template offers an enhanced visual hierarchy, improved information architecture, and better storytelling flow compared to version 1.0.

**Design Location:** Figma - Case study template (4881:94308)
**Template Style:** Modernized multi-section layout with visual emphasis
**Status:** Reference guide (design template to implement in React)

---

## What's New in 2.0 vs. 1.0

### Enhanced Visual Structure
| Aspect | 1.0 | 2.0 |
|--------|-----|-----|
| **Hero Section** | Simple title + image | Unified hero with tags, title, subtitle, image |
| **Content Flow** | Linear sections | Organized into 3 major zones (Hero, Mid, End) |
| **Process Display** | Text-only steps | Steps + Key Insights in structured grid |
| **Deliverables** | Single gallery | 2-column image grid with consistent sizing |
| **Results Section** | Simple list | 4-metric card grid on dark background |
| **CTA** | Button in footer | Dedicated light section with prominent button |
| **Visual Hierarchy** | Minimal | Multiple visual zones with distinct backgrounds |

### Improved Information Architecture
- **Hero Zone:** Context setting (tags, title, subtitle, image)
- **Mid Zone:** Detailed work (Challenge, Design Process, Deliverables)
- **End Zone:** Impact & engagement (Results, CTA)

---

## Figma Layer Hierarchy

```
Case study template (ROOT: 4881:94308)
│
├── Container
│   └── Back button + Navigation
│
├── Hero Section
│   ├── Tags (category pills)
│   ├── Title (main heading)
│   ├── Subtitle (descriptive text)
│   └── Hero image (wide format)
│
├── Mid Section
│   ├── Challenge
│   │   ├── Section title "Challenge"
│   │   ├── Problem statement text
│   │   └── Border separator
│   │
│   ├── Design Process
│   │   ├── Section title "Design Process"
│   │   ├── Design Steps (3-column grid)
│   │   │   ├── Step 1 (title + description)
│   │   │   ├── Step 2 (title + description)
│   │   │   └── Step 3 (title + description)
│   │   └── Key Insights (4-item grid below steps)
│   │       ├── Insight 1
│   │       ├── Insight 2
│   │       ├── Insight 3
│   │       └── Insight 4
│   │
│   └── Deliverables
│       ├── Section title "Deliverables"
│       ├── Description text
│       └── 2-column image grid
│           ├── Image 1
│           ├── Image 2
│           ├── Image 3
│           └── Image 4 (or more)
│
└── End Section
    ├── Results & Impact
    │   ├── Section title "Results & Impact"
    │   ├── Background (dark/accent color)
    │   └── 4-metric card grid
    │       ├── Metric card 1
    │       ├── Metric card 2
    │       ├── Metric card 3
    │       └── Metric card 4
    │
    └── CTA Section
        ├── Heading "Interested in more work?"
        ├── Description text
        ├── Background (light color)
        └── CTA button
```

---

## Enhanced Data Structure

The 2.0 template requires an enhanced data structure. Here's the TypeScript interface:

```typescript
interface CaseStudy2_0 {
  // Basic Info (Hero Section)
  title: string                              // Main case study title (3-6 words)
  subtitle: string                           // Descriptive subtitle (8-15 words)
  tags: string[]                             // 5-6 category tags (displayed as pills)
  heroImage: string                          // URL for hero image (1200px × 571px, 21:9 aspect)

  // Project Overview
  overview: {
    role: string                             // Your role in project
    timeline: string                         // Duration (e.g., "9-12 months")
    team: string                             // Team composition
    year: string                             // Completion year
  }

  // Challenge Section
  challenge: string                          // Problem statement (reframes as HMW question)
  challengeDescription?: string              // Optional: Additional context

  // Design Process Section
  process: [
    {
      title: string                          // Step name (e.g., "Research & Discovery")
      description: string                    // What you did (2-3 sentences)
      insights: [string, string, string, string]  // Exactly 4 key insights from this step
    },
    // ... repeat for steps 2 and 3
  ]

  // Key Insights (separate from process steps)
  keyInsights: [string, string, string, string]  // Exactly 4 high-level insights (NEW in 2.0)

  // Deliverables Section
  deliverables: {
    description: string                      // What was delivered (2-3 sentences)
    images: string[]                         // 2-4 images showcasing the solution
  }

  // Results & Impact Section
  results: {
    metrics: [
      {
        label: string                        // Metric name (e.g., "Manual work reduction")
        value: string                        // Result (e.g., "60% decrease")
      },
      // ... exactly 4 metrics
    ]
  }

  // CTA Section
  cta?: {
    heading?: string                         // Default: "Interested in more work?"
    description?: string                     // Optional: Additional text
    buttonText?: string                      // Default: "Let's talk"
  }
}
```

---

## Component Breakdown with React Snippets

### 1. Hero Section Component

```typescript
interface HeroSectionProps {
  tags: string[]
  title: string
  subtitle: string
  heroImage: string
  onBack: () => void
}

export function HeroSection({ tags, title, subtitle, heroImage, onBack }: HeroSectionProps) {
  return (
    <div className="w-full">
      {/* Back Button */}
      <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={onBack}>
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag) => (
          <Tag key={tag} variant="secondary">{tag}</Tag>
        ))}
      </div>

      {/* Title & Subtitle */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-gray-600 max-w-2xl">{subtitle}</p>
      </div>

      {/* Hero Image */}
      <div className="w-full aspect-video rounded-lg overflow-hidden">
        <img
          src={heroImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
```

### 2. Challenge Section Component

```typescript
interface ChallengeSectionProps {
  challenge: string
  challengeDescription?: string
}

export function ChallengeSection({ challenge, challengeDescription }: ChallengeSectionProps) {
  return (
    <Section>
      <Container>
        <div className="border-l-4 border-accent pl-6">
          <h2 className="text-2xl font-bold mb-4">Challenge</h2>
          <p className="text-lg text-gray-700 mb-4">{challenge}</p>
          {challengeDescription && (
            <p className="text-base text-gray-600">{challengeDescription}</p>
          )}
        </div>
      </Container>
    </Section>
  )
}
```

### 3. Design Process Section Component

```typescript
interface ProcessStep {
  title: string
  description: string
  insights: [string, string, string, string]
}

interface ProcessSectionProps {
  steps: [ProcessStep, ProcessStep, ProcessStep]
  keyInsights: [string, string, string, string]
}

export function DesignProcessSection({ steps, keyInsights }: ProcessSectionProps) {
  return (
    <Section>
      <Container>
        <h2 className="text-2xl font-bold mb-8">Design Process</h2>

        {/* Design Steps Grid (3 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="text-sm font-semibold text-accent mb-2">
                  Step {idx + 1}
                </div>
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Insights Grid (4 columns) */}
        <div>
          <h3 className="text-xl font-bold mb-6">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyInsights.map((insight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-700">{insight}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
```

### 4. Deliverables Section Component

```typescript
interface DeliverablesProps {
  description: string
  images: string[]
}

export function DeliverablesSection({ description, images }: DeliverablesProps) {
  return (
    <Section>
      <Container>
        <h2 className="text-2xl font-bold mb-6">Deliverables</h2>
        <p className="text-lg text-gray-700 mb-10 max-w-3xl">{description}</p>

        {/* 2-Column Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((image, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={image}
                  alt={`Deliverable ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
```

### 5. Results & Impact Section Component

```typescript
interface Metric {
  label: string
  value: string
}

interface ResultsProps {
  metrics: [Metric, Metric, Metric, Metric]
}

export function ResultsSection({ metrics }: ResultsProps) {
  return (
    <Section className="bg-slate-900 text-white">
      <Container>
        <h2 className="text-2xl font-bold mb-10">Results & Impact</h2>

        {/* 4-Metric Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-sm font-semibold text-accent mb-2">
                  {metric.label}
                </div>
                <div className="text-3xl font-bold">{metric.value}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
```

### 6. CTA Section Component

```typescript
interface CTASectionProps {
  heading?: string
  description?: string
  buttonText?: string
  onCTA?: () => void
}

export function CTASection({
  heading = "Interested in more work?",
  description = "Let's explore how we can collaborate on your next project.",
  buttonText = "Let's talk",
  onCTA
}: CTASectionProps) {
  return (
    <Section className="bg-gray-50">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{heading}</h2>
          <p className="text-lg text-gray-600 mb-8">{description}</p>
          <Button
            onClick={onCTA}
            className="px-8 py-3 text-lg"
          >
            {buttonText}
          </Button>
        </div>
      </Container>
    </Section>
  )
}
```

---

## Image Specifications

### Hero Image
- **Dimensions:** 1200px wide (responsive height)
- **Aspect Ratio:** 21:9 (2.33:1) - very wide rectangular format
- **Format:** JPG (for file size) or PNG (for graphics)
- **File Size:** ≤ 150 KB (compress with `?w=1200&q=80` on Unsplash)
- **Purpose:** Hero banner representing the project visually
- **Best Practices:**
  - Professional, polished imagery
  - High contrast and clarity
  - Avoid text overlays that reduce readability
  - Test on mobile to ensure important content isn't cut off

### Deliverable Images
- **Dimensions:** 800px wide per image
- **Aspect Ratio:** 16:9 (typical screenshot format)
- **Quantity:** 2-4 images in grid layout
- **Format:** JPG or PNG
- **File Size:** ≤ 100 KB per image
- **Purpose:** Showcase the design solution/interface
- **Best Practices:**
  - Clear, high-quality UI screenshots
  - Consistent visual style
  - Before/after pairs when showing improvements
  - Diverse views of the solution
  - Device mockups optional but helpful

### Image Optimization Tips
```typescript
// Unsplash URL format for optimization
// Basic: https://images.unsplash.com/photo-ID?w=800&q=80
// Parameters:
// - w: width in pixels (responsive sizing)
// - q: quality 1-100 (80 is good balance)
// - fit: crop, scale, max, etc.

// Example:
const heroImage = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80"
const deliverableImage = "https://images.unsplash.com/photo-1460925895917-adf4e565db4d?w=800&q=80"
```

---

## Accessibility & Alt Text Guidelines

### WCAG 2.1 AA Compliance Checklist

#### Images
- ✅ All images have descriptive alt text (70-125 characters)
- ✅ Decorative images use empty alt (`alt=""`)
- ✅ Complex images have linked descriptions nearby
- ✅ Alt text describes purpose, not just content

#### Color & Contrast
- ✅ Text has 4.5:1 contrast ratio (normal text, WCAG AA)
- ✅ Large text (18pt+) has 3:1 contrast ratio
- ✅ No information conveyed by color alone
- ✅ Focus indicators visible (minimum 3px)

#### Text & Readability
- ✅ Headings use semantic HTML (`<h1>`, `<h2>`, etc.)
- ✅ Line length ≤ 80 characters for desktop readability
- ✅ Font size ≥ 16px (especially for body text)
- ✅ Line height ≥ 1.5 for body text

#### Structure & Navigation
- ✅ Proper heading hierarchy (no skipping levels: h1 → h2 → h3)
- ✅ Section landmarks used (`<section>`, `<article>`)
- ✅ Skip links available for navigation
- ✅ Back button keyboard accessible

### Alt Text Examples

```typescript
// Hero Image
alt: "Partner Platform redesign showcasing updated dashboard interface"

// Deliverable Screenshots
alt: "New Partner Platform dashboard with real-time order insights and automation status"
alt: "Mobile-responsive Partner Platform interface showing simplified navigation"

// Process Step Icons/Images
alt: "User research phase showing participant interview setup"

// Metric Cards
// (Usually decorative in cards, so alt="" or left to card label)
```

### Focus Management

```typescript
// Ensure interactive elements are keyboard accessible
const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="
      flex items-center gap-2
      p-2 rounded
      focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
      hover:bg-gray-100
      transition-colors
    "
    aria-label="Go back to portfolio"
  >
    <ArrowLeft className="w-5 h-5" />
    <span>Back</span>
  </button>
)
```

---

## Step-by-Step Creation Process

### Phase 1: Preparation (30 min)
1. **Gather Materials**
   - Hero image (1200px wide, best quality available)
   - 2-4 deliverable images (800px screenshots/mockups)
   - Project timeline and team info
   - Key metrics/outcomes from project

2. **Organize Information**
   - Identify 3 main process phases (Research → Strategy → Design, or similar)
   - Extract 4 key insights from each phase
   - Extract 4 high-level insights from overall project
   - Prepare 4 outcome metrics

3. **Verify Completeness**
   - [ ] 5-6 tags selected
   - [ ] Hero image ready
   - [ ] Deliverable images ready (2-4)
   - [ ] Process steps documented
   - [ ] Metrics quantified

### Phase 2: Content Writing (1-2 hours)

1. **Hero Section**
   - Write title (3-6 words, specific)
   - Write subtitle (8-15 words, value-focused)
   - Select/refine tags

2. **Challenge Section**
   - Frame as "How Might We" question
   - Include problem context

3. **Design Process Section**
   - Write 3 phase titles (parallel structure)
   - Write 2-3 sentence descriptions for each phase
   - Extract 4 insights per phase (lead with data when possible)
   - Identify 4 overarching key insights

4. **Deliverables Section**
   - Write 2-3 sentence description of what was built
   - Organize images in logical order (varies by project)

5. **Results Section**
   - Format exactly 4 metrics with labels and values
   - Mix quantitative and qualitative results

### Phase 3: Implementation (1-2 hours)

1. **Create Data File**
   ```typescript
   // Add to caseStudyData in CaseStudyPage.tsx
   'project-slug': {
     title: '...',
     subtitle: '...',
     // ... complete object
   }
   ```

2. **Implement Components**
   - Create HeroSection component
   - Create ChallengeSection component
   - Create DesignProcessSection component
   - Create DeliverablesSection component
   - Create ResultsSection component
   - Create CTASection component

3. **Wire Components Together**
   ```typescript
   export function CaseStudyPage2_0() {
     return (
       <div className="min-h-screen bg-white">
         <Container>
           <HeroSection {...heroProps} />
         </Container>
         <ChallengeSection {...challengeProps} />
         <DesignProcessSection {...processProps} />
         <DeliverablesSection {...deliverableProps} />
         <ResultsSection {...resultsProps} />
         <CTASection {...ctaProps} />
       </div>
     )
   }
   ```

4. **Test Responsiveness**
   - Desktop (1920px)
   - Tablet (768px)
   - Mobile (375px)
   - Verify all content readable and interactive

5. **Accessibility Check**
   - [ ] All images have alt text
   - [ ] Heading hierarchy correct
   - [ ] Color contrast ≥ 4.5:1
   - [ ] Keyboard navigation works
   - [ ] Focus indicators visible
   - [ ] Form fields labeled (if included)

### Phase 4: Review (30 min)

1. **Content Review**
   - [ ] Title is specific and compelling
   - [ ] Subtitle answers "why this project matters"
   - [ ] Problem includes numbers/specifics
   - [ ] Process shows clear progression
   - [ ] Insights are specific, not generic
   - [ ] Metrics are quantified

2. **Visual Review**
   - [ ] Images are high quality and aligned
   - [ ] Typography hierarchy is clear
   - [ ] Colors used consistently
   - [ ] Spacing and alignment are consistent
   - [ ] Mobile layout is readable

3. **User Testing**
   - Share with a peer designer
   - Collect feedback on clarity of process
   - Verify metrics are impactful
   - Check if story is compelling

---

## Migration from 1.0 to 2.0

If updating existing case studies, use this mapping:

| 1.0 Field | 2.0 Field | Migration Notes |
|-----------|-----------|-----------------|
| `title` | `title` | ✅ Keep as-is |
| `subtitle` | `subtitle` | ✅ Keep as-is |
| `tags` | `tags` | ✅ Keep as-is |
| `heroImage` | `heroImage` | ✅ Keep as-is |
| `overview` | `overview` | ✅ Keep as-is |
| `problem` | `challenge` | ⚠️ Reframe as "How Might We" question |
| `challenge` | `challengeDescription` | ⚠️ Optional: Use as additional context |
| `process` steps | `process` steps + `keyInsights` | ⚠️ Extract 4 overall insights |
| `solution` | `deliverables.description` | ⚠️ Rename field |
| `solutionImages` | `deliverables.images` | ⚠️ Rename field |
| `outcome.metrics` | `results.metrics` | ⚠️ Rename field |
| `reflection` | *(moved to portfolioKnowledge.ts)* | ⚠️ Use for chatbot knowledge instead |

### Migration Checklist
```typescript
// Before (1.0)
{
  problem: "...",
  challenge: "...",
  process: [...],
  solution: "...",
  solutionImages: [...],
  outcome: { metrics: [...] },
  reflection: "..."
}

// After (2.0)
{
  challenge: "How might we...?",  // Reframed problem as HMW
  challengeDescription: "...",     // Optional: Original context
  process: [...],                  // Same, but with keyInsights array
  keyInsights: [...],              // NEW: 4 overarching insights
  deliverables: {
    description: "...",            // Renamed from solution
    images: [...]                  // Renamed from solutionImages
  },
  results: {
    metrics: [...]                 // Renamed from outcome.metrics
  },
  // reflection moved to portfolioKnowledge.ts for chatbot
}
```

---

## Enhanced Features in 2.0

### Visual Hierarchy Improvements
- **Dark background Results section:** Draws attention to metrics
- **Border accent on Challenge:** Creates visual break for problem statement
- **3-column process steps:** Better visual balance than text lists
- **Key Insights cards:** Separate callout for main learnings
- **Dedicated CTA section:** Increases conversion for contact interest

### Content Structure Improvements
- **4 Key Insights:** High-level takeaways separate from process details
- **Clearer sections:** Challenge → Process → Deliverables → Results flow
- **Results grid layout:** Easier to scan 4 metrics at a glance
- **Deliverables showcase:** 2-column grid shows more images

### Storytelling Improvements
- **Problem → Process → Solution → Impact:** Clear narrative arc
- **Visual variety:** Different section backgrounds maintain interest
- **Metric cards:** Make outcomes feel substantial and important
- **CTA section:** Creates engagement opportunity

---

## Example: Full 2.0 Case Study Data

```typescript
const caseStudy2_0Example = {
  'b2p-platform-v2': {
    title: 'Partner Platform (B2P) Redesign',
    subtitle: 'Modernizing an outdated system to reduce manual work and improve partner experience',
    tags: ['Enterprise', 'B2B', 'UX Strategy', 'Design System', 'User Research'],
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',

    overview: {
      role: 'Lead UX Designer',
      timeline: '9-12 months',
      team: '1 PM, 2-3 Engineers, 1-2 Designers',
      year: '2026',
    },

    challenge: 'How might we redesign the Partner Platform to dramatically reduce manual work, lower operational costs, and create an intuitive experience that supports partner growth?',
    challengeDescription: 'The Partner Platform serving 900,000+ active customers was technically outdated and required extensive manual work from our B2B partners.',

    process: [
      {
        title: 'Research & Discovery',
        description: 'I led user mapping sessions, conducted stakeholder interviews across product, operations, and support teams, and facilitated workshops to understand partner pain points. We analyzed current workflows and identified bottlenecks through contextual inquiry.',
        insights: [
          'Partners spent 3+ hours daily on manual data entry tasks',
          'System lacked real-time visibility into orders and status updates',
          'Critical workflows were buried in unintuitive navigation',
          'Technical barriers prevented partners from scaling their operations'
        ]
      },
      {
        title: 'Strategy & Planning',
        description: 'We conducted comprehensive impact mapping to understand business goals and user needs. I prioritized features based on strategic importance and developed a phased release plan that balanced quick wins with long-term improvements.',
        insights: [
          'Automated workflows could eliminate 60% of manual work',
          'Real-time insights would enable proactive partner support',
          'Modern design system could reduce development time by 40%',
          'Phased rollout reduced change management risk'
        ]
      },
      {
        title: 'Design & Testing',
        description: 'I created interaction prototypes and conducted iterative testing with real partners. Close collaboration with developers ensured feasibility of designs while maintaining design integrity. Multiple rounds of user testing refined the experience.',
        insights: [
          'Partner feedback validated automation as top priority',
          'Dashboard prominence improved feature discovery by 75%',
          'Simplified navigation reduced task completion time by 50%',
          'Accessibility first approach benefited all users'
        ]
      }
    ],

    keyInsights: [
      'Deep user research revealed manual work was largest pain point, guiding all design decisions',
      'Cross-functional collaboration between design, engineering, and operations ensured feasibility',
      'Phased approach allowed early wins while building toward long-term platform vision',
      'Focus on accessibility created an even better experience for all partner types'
    ],

    deliverables: {
      description: 'The redesigned Partner Platform featured an intuitive dashboard providing real-time insights, automated workflows eliminating manual tasks, streamlined information architecture, and seamless API integration. The new design system ensured consistency and scalability across the platform.',
      images: [
        'https://images.unsplash.com/photo-1460925895917-adf4e565db4d?w=800&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
      ]
    },

    results: {
      metrics: [
        { label: 'Manual work reduction', value: '60% decrease' },
        { label: 'Platform efficiency', value: '3.5x improvement' },
        { label: 'Partner satisfaction', value: '4.5/5.0' },
        { label: 'Partner adoption', value: '85% increase' }
      ]
    },

    cta: {
      heading: 'Interested in more work?',
      description: 'Let\'s explore how we can collaborate on your next project.',
      buttonText: 'Let\'s talk'
    }
  }
}
```

---

## Checklist for Case Study 2.0

### Content Preparation
- [ ] Title: 3-6 words, specific about what the project is
- [ ] Subtitle: 8-15 words, answers "why this project matters"
- [ ] Tags: 5-6 tags, mix industry + skills
- [ ] Hero image: 1200px wide, high quality, represents project visually
- [ ] Deliverable images: 2-4 images, 800px wide, clear UI/designs

### Challenge Section
- [ ] Challenge: Reframed as "How might we...?" question
- [ ] Challenge description: Optional context about the problem

### Process Section
- [ ] 3 process steps with clear titles (parallel structure)
- [ ] 2-3 sentence description for each step
- [ ] Exactly 4 insights per step (leading with data when possible)
- [ ] 4 overarching key insights (separate from step insights)

### Deliverables Section
- [ ] 2-3 sentence description of what was delivered
- [ ] 2-4 high-quality images in logical order

### Results Section
- [ ] Exactly 4 metrics with descriptive labels
- [ ] Quantified values for each metric
- [ ] Mix of quantitative (%) and qualitative results

### Metadata
- [ ] Role: Accurate to your responsibility level
- [ ] Timeline: Realistic project duration
- [ ] Team: Honest composition including yourself
- [ ] Year: Completion year

### Technical
- [ ] All fields properly typed and validated
- [ ] Images optimized (≤150 KB hero, ≤100 KB deliverables)
- [ ] Alt text descriptive (70-125 characters)
- [ ] Responsive on mobile (375px), tablet (768px), desktop (1920px)
- [ ] Color contrast ≥ 4.5:1
- [ ] Heading hierarchy correct (no skipped levels)
- [ ] Keyboard navigation functional
- [ ] Focus indicators visible

### Quality Review
- [ ] Story is compelling and easy to follow
- [ ] Process shows clear progression and growth
- [ ] Insights are specific and data-driven, not generic
- [ ] Metrics feel significant and support the narrative
- [ ] Visual hierarchy is clear and engaging
- [ ] No spelling/grammar errors
- [ ] Peer review completed with feedback incorporated

---

## Quick Reference: 2.0 vs 1.0 Field Mapping

```
1.0 Structure → 2.0 Structure

title → title ✅
subtitle → subtitle ✅
tags → tags ✅
heroImage → heroImage ✅
overview → overview ✅
problem → challenge (reframe as HMW)
challenge → challengeDescription (optional)
process → process (same structure)
  insights → insights (4 per step, same as 1.0)
(NEW) → keyInsights (4 overall insights)
solution → deliverables.description
solutionImages → deliverables.images
outcome.metrics → results.metrics
reflection → (move to portfolioKnowledge.ts)
```

---

## Resources & References

- **Figma Design:** Node 4881:94308 (Case study template)
- **Existing 1.0 Guide:** `CASE_STUDY_GUIDE.md`
- **Component Library:** `src/app/components/ui/`
- **Current Implementation:** `src/app/pages/CaseStudyPage.tsx`
- **Tailwind v4:** https://tailwindcss.com/docs
- **Motion (Framer Motion):** https://motion.dev/docs
- **WCAG 2.1 AA:** https://www.w3.org/WAI/WCAG21/quickref/

---

## Support & Questions

When creating a 2.0 case study, refer to:
1. This guide (structure and best practices)
2. The existing `CASE_STUDY_GUIDE.md` (content writing tips)
3. The Figma design (visual reference)
4. Current CaseStudyPage.tsx implementation (code patterns)

For component usage, check:
- `src/app/components/Container.tsx`
- `src/app/components/Section.tsx`
- `src/app/components/Button.tsx`
- `src/app/components/Tag.tsx`
- `src/app/components/ui/` (Radix UI components)
