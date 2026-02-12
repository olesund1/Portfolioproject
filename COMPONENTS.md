# Component API Reference

Complete reference for all reusable components in the UX Designer Portfolio.

---

## Layout Components

### Container

Responsive max-width container with consistent horizontal padding.

```tsx
import { Container } from './components/Container';

<Container size="default" className="custom-class">
  {children}
</Container>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | Required | Content to wrap |
| `size` | `'narrow' \| 'default' \| 'wide'` | `'default'` | Max-width variant |
| `className` | `string` | `''` | Additional CSS classes |

**Size Options:**
- `narrow`: 768px (48rem) - Best for long-form content
- `default`: 1152px (72rem) - Standard page width
- `wide`: 1280px (80rem) - Full-width layouts

---

### Section

Vertical spacing wrapper for page sections.

```tsx
import { Section } from './components/Section';

<Section id="about" className="bg-secondary">
  {children}
</Section>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | Required | Section content |
| `id` | `string` | `undefined` | Optional ID for anchor links |
| `className` | `string` | `''` | Additional CSS classes |

**Default Padding:**
- Mobile: 64px vertical (`py-16`)
- Tablet: 96px vertical (`py-24`)
- Desktop: 128px vertical (`py-32`)

---

## Navigation Components

### Navigation

Fixed top navigation with responsive mobile menu.

```tsx
import { Navigation } from './components/Navigation';

<Navigation 
  currentPage="home" 
  onNavigate={(page) => console.log(page)} 
/>
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `currentPage` | `string` | Active page identifier |
| `onNavigate` | `(page: string) => void` | Navigation handler |

**Features:**
- Fixed position with backdrop blur
- Mobile hamburger menu
- Active page indication
- Smooth animations

**Customization:**
Update `navItems` array in component to modify menu items.

---

### Footer

Site footer with social links and copyright.

```tsx
import { Footer } from './components/Footer';

<Footer />
```

**No Props Required**

**Features:**
- Responsive two-column layout
- Social media icon links
- Dynamic copyright year
- Call-to-action text

**Customization:**
Edit social links and text directly in component.

---

## UI Components

### Button

Versatile button component with multiple variants.

```tsx
import { Button } from './components/Button';

<Button 
  variant="primary"
  size="large"
  showArrow
  onClick={() => console.log('clicked')}
>
  Click Me
</Button>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | Required | Button content |
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Visual style |
| `size` | `'default' \| 'large'` | `'default'` | Button size |
| `onClick` | `() => void` | `undefined` | Click handler |
| `showArrow` | `boolean` | `false` | Show arrow icon |
| `href` | `string` | `undefined` | If provided, renders as link |
| `className` | `string` | `''` | Additional CSS classes |

**Variants:**
- `primary`: Accent background, white text
- `secondary`: Light background with border
- `ghost`: Transparent background

---

### Tag

Pill-shaped tag for categorization.

```tsx
import { Tag } from './components/Tag';

<Tag variant="accent">User Research</Tag>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | Required | Tag content |
| `variant` | `'default' \| 'accent'` | `'default'` | Color scheme |
| `className` | `string` | `''` | Additional CSS classes |

**Variants:**
- `default`: Neutral gray background
- `accent`: Accent color with border

---

### CaseStudyCard

Interactive project card with hover effects.

```tsx
import { CaseStudyCard } from './components/CaseStudyCard';

<CaseStudyCard
  title="Project Name"
  description="Brief project description"
  tags={['Tag1', 'Tag2']}
  imageUrl="https://example.com/image.jpg"
  year="2025"
  onClick={() => console.log('clicked')}
  index={0}
/>
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Project title |
| `description` | `string` | Brief description (2-3 sentences) |
| `tags` | `string[]` | Array of tag labels |
| `imageUrl` | `string` | Featured image URL |
| `year` | `string` | Project year |
| `onClick` | `() => void` | Click handler |
| `index` | `number` | Card index for staggered animation |

**Features:**
- Image zoom on hover
- Card lift effect
- Staggered fade-in animation
- Arrow slide-in on hover

**Image Aspect Ratio:** 16:10

---

## Page Components

### HomePage

Landing page with hero, projects, and process sections.

```tsx
import { HomePage } from './pages/HomePage';

<HomePage onNavigate={(page, caseStudyId) => {/* handle */}} />
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `onNavigate` | `(page: string, caseStudyId?: string) => void` | Navigation handler |

**Sections:**
1. Hero with name, title, CTA
2. Selected case studies grid
3. Design process cards
4. Contact CTA

---

### AboutPage

About page with bio, experience, skills, and tools.

```tsx
import { AboutPage } from './pages/AboutPage';

<AboutPage />
```

**No Props Required**

**Sections:**
1. Bio hero
2. Experience timeline
3. Skills by category
4. Tools list

**Customization:**
Edit arrays in component for skills, experience, and tools.

---

### CaseStudyPage

Detailed case study template.

```tsx
import { CaseStudyPage } from './pages/CaseStudyPage';

<CaseStudyPage 
  caseStudyId="fintech-app"
  onNavigate={(page) => {/* handle */}}
/>
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `caseStudyId` | `string` | Case study identifier |
| `onNavigate` | `(page: string) => void` | Navigation handler |

**Sections:**
1. Hero with project overview
2. Problem statement
3. Design process (3 phases)
4. Solution showcase
5. Outcomes & metrics
6. Reflection

**Case Study Data Structure:**

```tsx
{
  title: string;
  subtitle: string;
  tags: string[];
  heroImage: string;
  overview: {
    role: string;
    timeline: string;
    team: string;
    year: string;
  };
  problem: string;
  challenge: string;
  outcome: {
    metrics: Array<{
      label: string;
      value: string;
    }>;
  };
  process: Array<{
    title: string;
    description: string;
    insights: string[];
  }>;
  solution: string;
  solutionImages: string[];
  reflection: string;
}
```

---

### ContactPage

Contact form with validation.

```tsx
import { ContactPage } from './pages/ContactPage';

<ContactPage />
```

**No Props Required**

**Features:**
- Form validation
- Responsive two-column layout
- Contact information display
- Success message handling

**Form Fields:**
- Name (required)
- Email (required)
- Company (optional)
- Message (required)

---

## Animation Utilities

### Fade In On Scroll

Common pattern for scroll-triggered animations:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Staggered Children

For lists with sequential animation:

```tsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    {item.content}
  </motion.div>
))}
```

### Hover Effects

Image zoom:

```tsx
<motion.img
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.6 }}
/>
```

---

## Styling Utilities

### Common Tailwind Patterns

**Text Styles:**
```tsx
// Hero heading
<h1 className="text-5xl font-semibold tracking-tight">

// Section heading  
<h2 className="text-4xl font-semibold mb-6">

// Muted text
<p className="text-muted-foreground">

// Accent text
<span className="text-accent font-medium">
```

**Spacing:**
```tsx
// Section padding
<section className="py-16 md:py-24 lg:py-32">

// Card padding
<div className="p-6 md:p-8">

// Gap between items
<div className="space-y-6"> // or gap-6 for flex/grid
```

**Responsive Grids:**
```tsx
// 1 column mobile, 2 tablet, 3 desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// 2 column split
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
```

---

## Best Practices

### Component Usage

1. **Always provide keys** for mapped components
2. **Use semantic HTML** (nav, section, article, etc.)
3. **Include alt text** for images
4. **Maintain consistent spacing** using design system values
5. **Prefer composition** over complex props

### Animation Guidelines

1. **Use `once: true`** for scroll animations to prevent re-triggering
2. **Stagger delays** by 0.1s for list items
3. **Keep durations** between 0.3s - 0.8s
4. **Only animate** transform and opacity for performance

### Accessibility

1. **Provide ARIA labels** for icon-only buttons
2. **Maintain focus indicators** on interactive elements
3. **Use sufficient color contrast** (check with tools)
4. **Support keyboard navigation** for all interactions

---

## Examples

### Creating a New Page

```tsx
import React from 'react';
import { motion } from 'motion/react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Button } from '../components/Button';

export function NewPage() {
  return (
    <div className="pt-16 md:pt-20">
      <Section>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Page Title</h1>
            <p>Page content...</p>
            <Button variant="primary">Call to Action</Button>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}
```

### Adding a New Case Study

Update the `caseStudies` array in `HomePage.tsx`:

```tsx
const caseStudies = [
  // ... existing studies
  {
    id: 'new-project',
    title: 'New Project Name',
    description: 'Brief description...',
    tags: ['Tag1', 'Tag2'],
    imageUrl: 'https://images.unsplash.com/...',
    year: '2025',
  },
];
```

Then add data to `caseStudyData` in `CaseStudyPage.tsx`.

---

For questions or issues, refer to the main README.md or component source code.
