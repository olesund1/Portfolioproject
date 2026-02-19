# Case Study Content Creation Guide

## Overview

Your CaseStudyPage component uses a well-structured data format to display detailed case studies. This guide explains every field you need to create a compelling case study for your UX portfolio.

**Location:** `src/app/pages/CaseStudyPage.tsx:16-197`

---

## Complete Data Structure

Every case study follows this TypeScript-like structure:

```typescript
{
  title: string                              // Main case study title (3-6 words)
  subtitle: string                           // Descriptive subtitle (8-15 words)
  tags: string[]                             // 5-6 category tags

  // Visual Assets
  heroImage: string                          // URL for large banner image (1200px wide)
  solutionImages: string[]                   // Array of 2+ images (800px wide)

  // Project Overview (displayed in 2x2 or 1x4 grid)
  overview: {
    role: string                             // Your role in the project
    timeline: string                         // Duration (e.g., "6-9 months")
    team: string                             // Team composition
    year: string                             // Year completed
  }

  // Problem & Challenge
  problem: string                            // Problem description (2-3 sentences)
  challenge: string                          // Key question in "How Might We" format

  // Design Process (exactly 3 steps)
  process: [
    {
      title: string                          // Step name (e.g., "Research & Discovery")
      description: string                    // What you did (2-3 sentences)
      insights: string[]                     // Array of 4 key insights from this step
    },
    // ... repeat 2 more times (total of 3 process steps)
  ]

  // Solution
  solution: string                           // Final design summary (2-3 sentences)

  // Outcomes
  outcome: {
    metrics: [
      {
        label: string                        // Metric name (e.g., "Conversion rate")
        value: string                        // Result (e.g., "25% increase")
      }
      // ... exactly 4 metrics
    ]
  }

  // Reflection
  reflection: string                         // Key learnings (3-4 sentences)
}
```

---

## Field-by-Field Reference

### Title
- **Purpose:** Main heading for your case study
- **Best practices:**
  - Keep it 3-6 words maximum
  - Be specific about what the project is
  - Include the product/platform name
- **Examples:**
  - "Partner Platform (B2P) Redesign"
  - "Healthcare Patient Portal"
  - "E-commerce Checkout Optimization"
- **Character limit:** ~50 characters for mobile display

### Subtitle
- **Purpose:** Additional context explaining what the case study is about
- **Best practices:**
  - 8-15 words
  - Answer "Why this project matters"
  - Include the main outcome or benefit
- **Examples:**
  - "Modernizing an outdated system to reduce manual work and improve partner experience"
  - "Creating an accessible patient portal that simplified healthcare access"
  - "Streamlining checkout to boost conversion and reduce cart abandonment"
- **Character limit:** ~100 characters for optimal display

### Tags
- **Purpose:** Categorize the work for filtering and discovery
- **Best practices:**
  - Use 5-6 tags
  - Mix industry tags with skill tags
  - Be consistent with tag naming across projects
- **Common tag types:**
  - **Industry/Domain:** Enterprise, B2B, B2C, Healthcare, E-commerce, Fintech, SaaS, Mobile
  - **Design Skills:** UX Strategy, UX Research, User Research, Information Architecture, Interaction Design
  - **Deliverables:** Design System, Prototyping, Accessibility, WCAG 2.1, Mobile-First
  - **Methods:** A/B Testing, User Testing, Usability Testing, Stakeholder Interviews
- **Example combinations:**
  - `['Enterprise', 'B2B', 'UX Strategy', 'Design System', 'User Research']`
  - `['Web App', 'Healthcare', 'Accessibility', 'WCAG 2.1']`
  - `['E-commerce', 'Conversion', 'A/B Testing', 'Mobile']`

### Hero Image
- **Purpose:** Large banner image at top of case study
- **Technical requirements:**
  - URL format (can be external or relative path)
  - Unsplash recommended: `?w=1200&q=80` for quality/file size balance
  - Aspect ratio: 21:9 (2.33:1) - very wide rectangular format
  - Alt text: Auto-generated from case study title
- **Best practices:**
  - Choose images that visually represent the project
  - Prefer professional/polished imagery
  - Ensure readability if text overlays are needed
- **Example URLs:**
  - `https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80`
  - Or use local path: `/images/case-study-hero-1.png`

### Solution Images
- **Purpose:** Show the final design or solution visually (2+ images in grid)
- **Technical requirements:**
  - Array of 2 or more image URLs
  - Unsplash format: `?w=800&q=80`
  - Aspect ratio: 4:3 (typical screen captures)
  - Images displayed side-by-side on desktop, stacked on mobile
- **Best practices:**
  - Include 2-3 diverse views of the solution
  - Show different sections of the interface
  - Use high-contrast, clear UI mockups
  - Consider before/after if applicable
- **Example structure:**
  ```javascript
  solutionImages: [
    'https://images.unsplash.com/photo-1460925895917-adf4e565db4d?w=800&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  ]
  ```

### Overview Object

#### Role
- **Purpose:** Your position/responsibility in this project
- **Examples:**
  - "Lead UX Designer" (took point on design decisions)
  - "UX Designer" (collaborated on team)
  - "Senior UX Designer" (mentored others)
  - "Design Lead" (managed design team)
  - "Product Designer" (end-to-end ownership)
- **Best practices:**
  - Be accurate about your level of responsibility
  - If you collaborated, consider "UX Designer" rather than "Lead"
  - Match your actual portfolio experience

#### Timeline
- **Purpose:** Project duration
- **Format:** "X-Y months" or "X months"
- **Examples:**
  - "3 months" (short project)
  - "6 months" (typical project)
  - "9-12 months" (long/complex project)
- **Best practices:**
  - Use realistic timeframes
  - Ranges are acceptable if exact dates vary
  - Calendar months, not working weeks

#### Team
- **Purpose:** Who you worked with
- **Format:** Composition of team (roles and counts)
- **Examples:**
  - "1 PM, 2-3 Engineers, 1-2 Designers"
  - "1 PM, 3 Engineers, 2 Designers"
  - "1 Product Manager, 1 Developer, 1 Designer" (small team)
  - "1 PM, 5 Engineers, 3 Designers, 1 QA" (large team)
- **Best practices:**
  - Include your own role as part of the team
  - List roles and approximate counts
  - Be honest about team size (helps convey scope)

#### Year
- **Purpose:** When the project was completed
- **Format:** Single year (YYYY)
- **Examples:**
  - "2026"
  - "2024"
  - "2023"
- **Best practices:**
  - Use completion year, not start year
  - Keep it simple (just 4-digit year)

### Problem
- **Purpose:** Establish context for why the project was needed
- **Length:** 2-3 sentences (~100-150 words)
- **Structure:**
  1. Quantify the problem (numbers, user impact)
  2. Identify who's affected
  3. State business/user consequences
- **Example:**
  > "The Partner Platform serving 900,000+ active customers across Sweden's largest electricity distributor was technically outdated and required extensive manual work from our B2B partners. High operational costs, poor UX, and low partner satisfaction were affecting business scalability and relationships."
- **Best practices:**
  - Use specific numbers when possible
  - Connect to real user/business pain points
  - Avoid vague statements ("the system wasn't good")
  - Make the problem feel urgent but solvable

### Challenge (How Might We)
- **Purpose:** Reframe the problem as an actionable question
- **Format:** "How might we [action] to [outcome]?"
- **Length:** 1 sentence (15-25 words)
- **Examples:**
  - "How might we redesign the Partner Platform to dramatically reduce manual work, lower operational costs, and create an intuitive experience that supports partner growth?"
  - "How might we create an accessible, easy-to-use patient portal that reduces no-shows and call center volume?"
  - "How might we reduce friction in the checkout process to increase conversion rate?"
- **Best practices:**
  - Start with "How might we"
  - Focus on desired outcome, not solution method
  - Include multiple dimensions (ease of use + business metric)
  - Make it inspiring but grounded

### Process (Design Process Steps)
- **Requirement:** Exactly 3 steps (no more, no less)
- **Each step contains:**

#### Step Title
- **Examples:** "Research & Discovery", "Strategy & Planning", "Design & Testing"
- **Common pattern:**
  1. First step: Discovery/Research
  2. Second step: Strategy/Ideation/Planning
  3. Third step: Design/Testing/Implementation
- **Best practices:**
  - Use parallel structure (verb + noun)
  - Make titles descriptive but concise (2-3 words)
  - Show progression through your process

#### Step Description
- **Length:** 2-3 sentences (~50-80 words)
- **Purpose:** Explain what you did in this phase
- **Structure:**
  1. What activity you performed
  2. Who you involved/collaborated with
  3. Key methodology or approach
- **Examples:**
  > "I led user mapping sessions, conducted stakeholder interviews across product, operations, and support teams, and facilitated workshops to understand partner pain points. We analyzed current workflows and identified bottlenecks through contextual inquiry."

  > "We interviewed 30 patients, including users with various disabilities. We also shadowed front desk staff and analyzed appointment booking patterns."

  > "We analyzed funnel data, conducted user testing of the existing checkout, and surveyed customers who abandoned their carts."
- **Best practices:**
  - Use first person ("I", "We") to show ownership
  - Be specific about methods used
  - Mention stakeholders/collaborators
  - Show depth of research/work

#### Step Insights
- **Structure:** Array of exactly 4 insights
- **Length:** Each insight is 1 sentence (8-15 words)
- **Purpose:** Key learnings/discoveries from this phase
- **Examples from Research phase:**
  ```
  [
    'Partners spent 3+ hours daily on manual data entry tasks',
    'System lacked real-time visibility into orders and status updates',
    'Critical workflows were buried in unintuitive navigation',
    'Technical barriers prevented partners from scaling their operations'
  ]
  ```
- **Best practices:**
  - Lead with data/specifics when possible
  - Include both user insights and business insights
  - Show progression (Problem → Understanding → Solution)
  - Avoid generic statements
  - Use numbers/percentages to add credibility

### Solution
- **Purpose:** Summarize your final design approach
- **Length:** 2-3 sentences (~80-120 words)
- **Structure:**
  1. Key design decisions/approach
  2. Main features or elements
  3. Strategic value or impact
- **Examples:**
  > "The redesigned Partner Platform featured an intuitive dashboard providing real-time insights, automated workflows eliminating manual tasks, streamlined information architecture, and seamless API integration. The new design system ensured consistency and scalability across the platform."

  > "We created a fully accessible patient portal with simplified appointment booking, clear information hierarchy, and support for all assistive technologies."

  > "We implemented a streamlined 3-step checkout with clear progress indication, all costs shown upfront, and optimized mobile experience."
- **Best practices:**
  - Don't just repeat features—emphasize the design thinking
  - Connect back to the challenge/problem
  - Show strategic choices (why these decisions)
  - Use visual language where possible

### Outcome Metrics
- **Requirement:** Exactly 4 metrics
- **Structure of each metric:**
  ```javascript
  {
    label: string,  // Metric name
    value: string   // Result (can include units/direction)
  }
  ```
- **Label examples:**
  - "Manual work reduction"
  - "Platform efficiency"
  - "Partner satisfaction"
  - "Conversion rate"
  - "Cart abandonment"
  - "WCAG compliance"
  - "Call center volume"
  - "No-show rate"
- **Value examples:**
  - "60% decrease"
  - "3.5x improvement"
  - "4.5/5.0" (ratings)
  - "85% increase"
  - "68% → 52%"
  - "AA certified" (qualitative)
  - "30% reduction"
- **Best practices:**
  - Mix quantitative (%) and qualitative (certified) metrics
  - Include both user-facing and business metrics
  - Use directional indicators (increase, decrease, improvement)
  - Be specific about what was measured
  - Prefer percentages over absolute numbers for clarity
  - If data is unavailable, use reasonable estimates

### Reflection
- **Purpose:** Key learnings and how this project shaped you
- **Length:** 3-4 sentences (~100-150 words)
- **Structure:**
  1. What you learned about the process/users/design
  2. How this changed your approach
  3. What you'd do differently (optional)
  4. Broader insight for future work
- **Examples:**
  > "This project demonstrated the value of true full-ownership in the design process—from initial research through developer collaboration and testing. I learned how to balance competing stakeholder needs while keeping partners' goals at the center. Early involvement of developers in design decisions prevented significant rework and created a stronger final product. The experience reinforced that sustainable design requires deep understanding of both user and business contexts."

  > "This project taught me the immense value of inclusive design. By designing for accessibility from the start, we created a better experience for everyone, not just users with disabilities."

  > "The power of incremental improvements was clear in this project. No single change was a magic bullet, but together they created significant impact. Data-driven decision making was crucial."
- **Best practices:**
  - Be authentic and personal
  - Show growth/learning, not just success
  - Connect learnings to broader principles
  - Make it memorable/meaningful
  - Avoid generic statements

---

## Example: Adding a New Case Study

### Step 1: Create the data object

```typescript
'project-slug-name': {
  title: 'Project Name',
  subtitle: 'What the project was about',
  tags: ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5'],
  heroImage: 'https://images.unsplash.com/...',
  overview: {
    role: 'Your Role',
    timeline: 'X months',
    team: 'Team composition',
    year: '2026',
  },
  problem: 'Problem description...',
  challenge: 'How might we...?',
  process: [
    {
      title: 'Phase 1',
      description: 'What you did...',
      insights: [
        'Insight 1',
        'Insight 2',
        'Insight 3',
        'Insight 4',
      ],
    },
    {
      title: 'Phase 2',
      description: 'What you did...',
      insights: [
        'Insight 1',
        'Insight 2',
        'Insight 3',
        'Insight 4',
      ],
    },
    {
      title: 'Phase 3',
      description: 'What you did...',
      insights: [
        'Insight 1',
        'Insight 2',
        'Insight 3',
        'Insight 4',
      ],
    },
  ],
  solution: 'Solution description...',
  solutionImages: [
    'https://images.unsplash.com/...',
    'https://images.unsplash.com/...',
  ],
  outcome: {
    metrics: [
      { label: 'Metric 1', value: 'Result 1' },
      { label: 'Metric 2', value: 'Result 2' },
      { label: 'Metric 3', value: 'Result 3' },
      { label: 'Metric 4', value: 'Result 4' },
    ],
  },
  reflection: 'Learnings and reflection...',
},
```

### Step 2: Update the component to reference it

The component currently references cases by ID (line 199):
```typescript
const data = caseStudyData[caseStudyId as keyof typeof caseStudyData] || caseStudyData['b2p-redesign'];
```

Make sure your new `project-slug-name` matches what's used in your navigation/routing.

### Step 3: Link from HomePage or other pages

Update wherever you create links to case studies to use your new project slug.

---

## Content Writing Tips

### Being Specific
- ❌ "The system had usability issues"
- ✅ "Manual data entry consumed 3+ hours daily"

### Showing Your Process
- ❌ "I designed a new interface"
- ✅ "I conducted 12 user interviews, mapped workflows, created 5 design variations, and iterated based on feedback"

### Connecting Outcomes to Actions
- ❌ "Conversion increased by 25%"
- ✅ "By adding a progress indicator and showing shipping costs upfront, conversion increased by 25%"

### Using Numbers
- ✅ Include percentages, time savings, user counts, etc.
- ✅ Use ranges if exact numbers aren't available ("3-5", "50-60%")
- ✓ Your portfolio will be stronger with quantified results

---

## Current Case Studies Reference

### 1. B2P Redesign (b2p-redesign)
- **Focus:** Enterprise platform redesign with stakeholder management
- **Key metrics:** Automation, efficiency gains, adoption rates
- **Process example:** Research → Strategy → Design testing

### 2. Healthcare Portal (healthcare-platform)
- **Focus:** Accessibility-first design
- **Key metrics:** Accessibility compliance, user behavior changes
- **Process example:** Research with diverse users → Accessible design system → Testing with AT

### 3. E-commerce Checkout (ecommerce-checkout)
- **Focus:** Data-driven optimization
- **Key metrics:** Conversion, abandonment, customer satisfaction
- **Process example:** Analytics analysis → A/B testing → Iterative improvements

---

## Checklist for New Case Study

- [ ] Title: 3-6 words, specific
- [ ] Subtitle: 8-15 words, value-focused
- [ ] Tags: 5-6 tags, mix industry + skills
- [ ] Hero image: 1200px wide, aspect 21:9
- [ ] Role: Accurate to your responsibility level
- [ ] Timeline: Realistic duration
- [ ] Team: Honest composition
- [ ] Year: Completion year
- [ ] Problem: 2-3 sentences with specifics/numbers
- [ ] Challenge: HMW format, 1 sentence
- [ ] Process: Exactly 3 steps
- [ ] Each step: Title + 2-3 sentence description + 4 insights
- [ ] Solution: 2-3 sentences, connects to challenge
- [ ] Solution images: 2+ images, 800px wide, aspect 4:3
- [ ] Metrics: Exactly 4 metrics with labels and values
- [ ] Reflection: 3-4 sentences, shows learning
