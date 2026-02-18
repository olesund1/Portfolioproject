# frontend/claude.md

Frontend Development Guidelines for the Portfolio Project

This file provides practical guidance for building new features and components. Reference this when adding pages, components, or data to the portfolio.

## When to Use This Guide

- **This guide**: Building new pages, features, and components within the existing architecture
- **CLAUDE.md**: Understanding overall project setup, build config, and chatbot architecture
- **figma/claude.md**: Converting Figma designs to React code and using design tools

## Custom Components

Located in `src/app/components/`. Reuse before creating new ones.

### Core Layout Components

**Container** - Max-width wrapper with responsive padding
- Sizes: `narrow` (max-w-3xl), `default` (max-w-6xl), `wide` (max-w-7xl)
- Padding: px-6 md:px-8 lg:px-12 (automatic)

**Section** - Vertical spacing wrapper
- Default: py-16 md:py-24 lg:py-32
- Use with id for anchor links: `<Section id="work">`

### UI Components

**Button** - Primary CTA component
- Variants: `primary` (accent), `secondary` (muted), `ghost` (minimal)
- Sizes: `default` (px-6 py-3), `large` (px-8 py-4)
- Props: `onClick`, `href`, `showArrow` (adds animated arrow icon)

**Tag** - Badge/label component
- Variants: `default` (secondary bg), `accent` (accent bg with border)
- Used for case study tags and filtering

**CaseStudyCard** - Project portfolio card
- Props: `title`, `description`, `tags`, `imageUrl`, `year`, `onClick`, `index`
- Includes image hover scale (1.05x), gradient overlay, staggered animation
- Index prop enables staggered entrance animations

## Page Structure Pattern

All pages follow this consistent structure:

```tsx
interface PageProps {
  onNavigate: (page: string, caseStudyId?: string) => void;
}

export function MyPage({ onNavigate }: PageProps) {
  return (
    <div className="pt-16 md:pt-20">  {/* Space for fixed nav */}
      <Section className="min-h-[85vh] flex items-center">
        <Container>
          {/* Hero content with motion animation */}
        </Container>
      </Section>

      <Section>
        <Container>
          {/* Additional sections */}
        </Container>
      </Section>

      <Section>
        <Container>
          <Button onClick={() => onNavigate('contact')}>
            CTA Button
          </Button>
        </Container>
      </Section>
    </div>
  );
}
```

## State Management & Routing

### App.tsx State (Single Source of Truth)

```tsx
const [appState, setAppState] = useState<AppState>({
  currentPage: 'home' | 'about' | 'case-study' | 'contact' | 'converse',
  caseStudyId?: string,
});

const handleNavigate = (page: string, caseStudyId?: string) => {
  setAppState({ currentPage: page as PageType, caseStudyId });
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
```

### Adding a New Page

1. Create page file: `src/app/pages/NewPage.tsx`
2. Accept `onNavigate` prop for navigation
3. Import in App.tsx and add to routing switch
4. Add page type to `PageType` union
5. Add to Navigation component menu

## Data & Components

### Case Studies

Hardcoded array in HomePage.tsx:
```tsx
const caseStudies = [
  {
    id: 'unique-id',
    title: 'Project Title',
    description: 'Short description',
    tags: ['Tag1', 'Tag2'],
    imageUrl: 'https://...',
    year: '2024',
  },
];
```

Add corresponding data in CaseStudyPage.tsx switch statement.

### Chatbot Knowledge Base

File: `src/app/utils/portfolioKnowledge.ts`

Add keywords for each page so chatbot matches questions:
```tsx
home: {
  keywords: ['work', 'projects', 'case studies', 'portfolio'],
  title: 'My Work',
  description: 'Explore my latest projects',
},
'case-study-example': {
  keywords: ['example', 'my project', 'specific terms'],
  title: 'Project Title',
  description: 'Description',
  caseStudyId: 'example-id',
},
```

## Animation Pattern

Use Framer Motion for consistent entrance animations:

```tsx
import { motion } from 'motion/react';

<motion.h2
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.5, delay: 0.1 }}
>
  Animated Heading
</motion.h2>

// Staggered list animations
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    {item.content}
  </motion.div>
))}
```

## Common Patterns

### Creating a Form

```tsx
const [formData, setFormData] = useState({ field: '' });
const [isSubmitting, setIsSubmitting] = useState(false);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  // Handle submission
  setIsSubmitting(false);
};
```

### Navigation Patterns

```tsx
// Simple page navigation
<Button onClick={() => onNavigate('about')}>About</Button>

// With case study ID
<Button onClick={() => onNavigate('case-study', study.id)}>
  View Project
</Button>

// Scroll to section
<Button onClick={() => {
  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
}}>
  View Work
</Button>
```

### Grid Layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {items.map((item) => (
    <div key={item.id}>{item.content}</div>
  ))}
</div>
```

## Anti-Patterns to Avoid

❌ **Don't use Context API or Redux** - Keep state in App.tsx and pass callbacks

❌ **Don't skip animations** - New components should have fade-in-on-scroll animations

❌ **Don't use arbitrary Tailwind values** - Use design tokens: `bg-accent` not `bg-[#5a6f5b]`

❌ **Don't hardcode navigation** - Always use `onNavigate()` callback from props

❌ **Don't forget to update Navigation.tsx** - New pages must be added to the menu

❌ **Don't create duplicate components** - Check `src/app/components/` first

❌ **Don't add form fields without using controlled inputs** - Use `useState` + `onChange` + `value`

❌ **Don't forget the PageProps interface** - All pages that navigate need `onNavigate` prop

## File Locations

```
src/app/
├── pages/               # Full page components
├── components/          # Reusable components
│   ├── Button.tsx
│   ├── Tag.tsx
│   ├── Container.tsx
│   ├── Section.tsx
│   ├── CaseStudyCard.tsx
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── ui/             # 50+ Radix UI primitives
└── utils/
    ├── mockAI.ts       # Chatbot response generation
    └── portfolioKnowledge.ts  # Chatbot Q&A keywords
```

## Key Files for Reference

- `src/app/App.tsx` - Root routing and state management
- `src/app/pages/HomePage.tsx` - Example: case study grid, Section/Container usage
- `src/app/pages/CaseStudyPage.tsx` - Example: case study data structure, switch on ID
- `src/app/components/Navigation.tsx` - How to add new pages to menu
- `src/app/components/CaseStudyCard.tsx` - Animation and component patterns
- `src/app/utils/portfolioKnowledge.ts` - Chatbot keyword structure
- `src/styles/theme.css` - Design tokens (colors, typography, spacing)

## Quick Checklist: Adding a New Page

- [ ] Create page component with `onNavigate` prop
- [ ] Add page type to `PageType` union in App.tsx
- [ ] Add routing case in `renderPage()` switch statement
- [ ] Add page to Navigation component menu
- [ ] Test navigation from menu and from other pages
- [ ] Verify animations on entrance and scroll
- [ ] Add chatbot keywords if applicable
- [ ] Update CLAUDE.md project structure if major addition

---

For detailed design-to-code patterns, see figma/claude.md. For architecture overview, see CLAUDE.md.
