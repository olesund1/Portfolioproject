# Project Structure Documentation

Complete technical documentation for the UX Designer Portfolio starter project.

## 📐 Architecture Overview

This portfolio uses a **component-based architecture** with a simple routing system built in React. The structure is designed to be scalable, maintainable, and easy to customize.

### Key Architectural Decisions

1. **Client-Side Routing**: Simple state-based routing instead of React Router (keeps bundle small)
2. **Component Composition**: Small, reusable components with clear responsibilities
3. **Design System First**: CSS variables and tokens drive all styling
4. **Animation Layer**: Motion wrapper for consistent, performant animations
5. **TypeScript**: Type safety for better DX and fewer bugs

---

## 🗂️ Complete File Structure

```
ux-portfolio/
│
├── /src/                           # Source code
│   ├── /app/                       # Application code
│   │   ├── App.tsx                 # Root component with routing logic
│   │   │
│   │   ├── /components/            # Reusable UI components
│   │   │   ├── Button.tsx          # Custom button with variants
│   │   │   ├── CaseStudyCard.tsx   # Project card component
│   │   │   ├── Container.tsx       # Max-width wrapper
│   │   │   ├── Footer.tsx          # Site footer
│   │   │   ├── Navigation.tsx      # Top nav + mobile menu
│   │   │   ├── Section.tsx         # Section spacing
│   │   │   └── Tag.tsx             # Chip/tag component
│   │   │
│   │   └── /pages/                 # Page-level components
│   │       ├── HomePage.tsx        # Landing page
│   │       ├── AboutPage.tsx       # About/bio page
│   │       ├── CaseStudyPage.tsx   # Case study details
│   │       └── ContactPage.tsx     # Contact form
│   │
│   └── /styles/                    # Global styles
│       ├── index.css               # Entry point (imports other files)
│       ├── fonts.css               # Web font imports
│       ├── tailwind.css            # Tailwind directives
│       └── theme.css               # Design system tokens
│
├── /public/                        # Static assets
│   └── /images/                    # Image files
│
├── README.md                       # Project overview & setup
├── COMPONENTS.md                   # Component API reference
├── STRUCTURE.md                    # This file
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite build config
└── postcss.config.mjs             # PostCSS plugins
```

---

## 🎯 Component Hierarchy

### Visual Component Tree

```
App (Root)
│
├── Navigation
│   └── MobileMenu (conditional)
│
├── Pages (one active at a time)│   │
│   ├── HomePage
│   │   ├── Section (Hero)
│   │   │   └── Container
│   │   │       ├── motion.div
│   │   │       └── Button (x2)
│   │   │
│   │   ├── Section (Work)
│   │   │   └── Container
│   │   │       └── CaseStudyCard (x3)
│   │   │           └── Tag (multiple)
│   │   │
│   │   ├── Section (Process)
│   │   │   └── Container
│   │   │       └── ProcessCard (x3)
│   │   │
│   │   └── Section (CTA)
│   │       └── Container
│   │           └── Button
│   │
│   ├── AboutPage
│   │   ├── Section (Bio)
│   │   ├── Section (Experience)
│   │   ├── Section (Skills)
│   │   └── Section (Tools)
│   │
│   ├── CaseStudyPage
│   │   ├── Section (Hero)
│   │   ├── Section (Problem)
│   │   ├── Section (Process)
│   │   ├── Section (Solution)
│   │   ├── Section (Outcomes)
│   │   └── Section (Reflection)
│   │
│   └── ContactPage
│       └── Section
│           ├── ContactInfo
│           └── ContactForm
│
└── Footer
    ├── SocialLinks
    └── Copyright
```

---

## 🔄 Data Flow

### Routing State Management

```typescript
// App.tsx manages global routing state
interface AppState {
  currentPage: 'home' | 'about' | 'case-study' | 'contact';
  caseStudyId?: string;
}

// Flow:
1. User clicks navigation link
2. onNavigate(page, id?) is called
3. App state updates
4. Component re-renders with new page
5. Scroll to top
```

### Props Drilling Pattern

```
App
 ├─ onNavigate → HomePage
 │   └─ onNavigate → CaseStudyCard → onClick
 │
 ├─ onNavigate → Navigation
 │   └─ onNavigate → NavItem → onClick
 │
 └─ caseStudyId → CaseStudyPage
     └─ loads data based on id
```

---

## 🎨 Design System Implementation

### CSS Architecture

```
theme.css                   # Design tokens (variables)
    ↓
Tailwind CSS               # Utility classes
    ↓
Component Classes          # Applied inline
    ↓
Final Rendered Styles
```

### Token Structure

```css
/* /src/styles/theme.css */

:root {
  /* Colors */
  --background: #fafafa;
  --foreground: #1a1a1a;
  --accent: #5a6f5b;
  
  /* Typography */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  
  /* Spacing (implied by Tailwind) */
  /* 8px base: 2, 4, 6, 8, 12, 16, 24, 32 */
  
  /* Radii */
  --radius: 0.375rem;
}

/* Tailwind generates utilities from these */
@theme inline {
  --color-accent: var(--accent);
  /* etc... */
}
```

### Usage in Components

```tsx
// Preferred: Tailwind utilities
<div className="bg-accent text-accent-foreground">

// Alternative: Direct variable access
<div style={{ backgroundColor: 'var(--accent)' }}>
```

---

## 🎭 Animation System

### Motion Setup

```tsx
import { motion } from 'motion/react';

// Standard fade-in pattern
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
```

### Animation Patterns

**1. Page Load Animations**
```tsx
// Hero elements
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
```

**2. Scroll-Triggered Animations**
```tsx
// Sections fade in as they enter viewport
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-100px" }}
```

**3. Staggered Lists**
```tsx
// Each item delays based on index
items.map((item, index) => (
  <motion.div
    transition={{ delay: index * 0.1 }}
  >
))
```

**4. Hover Interactions**
```tsx
// Image zoom
<motion.img
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.6 }}
/>

// Button arrow slide
<motion.div
  className="group-hover:translate-x-1"
/>
```

---

## 📱 Responsive Strategy

### Mobile-First Approach

```tsx
// Base styles = mobile
className="px-6 py-4"

// Add tablet breakpoint
className="px-6 md:px-8 py-4 md:py-6"

// Add desktop breakpoint
className="px-6 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8"
```

### Breakpoint Usage

| Screen | Breakpoint | Example Use Case |
|--------|------------|------------------|
| Mobile | Default | Single column, hamburger menu |
| Tablet | `md:` (768px) | Two columns, expanded nav |
| Desktop | `lg:` (1024px) | Three columns, full layout |

### Grid Patterns

```tsx
// Stack mobile, side-by-side desktop
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

// 1-2-3 responsive columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

---

## 🔌 Extension Points

### Adding a New Page

**1. Create page component:**
```tsx
// /src/app/pages/NewPage.tsx
export function NewPage() {
  return <div>New page content</div>;
}
```

**2. Add to routing:**
```tsx
// /src/app/App.tsx
type PageType = 'home' | 'about' | 'case-study' | 'contact' | 'new';

const renderPage = () => {
  switch (appState.currentPage) {
    case 'new':
      return <NewPage />;
    // ...
  }
};
```

**3. Add to navigation:**
```tsx
// /src/app/components/Navigation.tsx
const navItems = [
  // ...
  { name: 'New', page: 'new' },
];
```

### Adding a New Component

**1. Create component file:**
```tsx
// /src/app/components/NewComponent.tsx
interface NewComponentProps {
  title: string;
  // ...
}

export function NewComponent({ title }: NewComponentProps) {
  return <div>{title}</div>;
}
```

**2. Use in pages:**
```tsx
import { NewComponent } from '../components/NewComponent';

<NewComponent title="Hello" />
```

### Extending the Design System

**1. Add new color:**
```css
/* /src/styles/theme.css */
:root {
  --custom-color: #123456;
}

@theme inline {
  --color-custom: var(--custom-color);
}
```

**2. Use in components:**
```tsx
<div className="bg-custom text-custom-foreground">
```

---

## 🔍 Code Organization Principles

### File Naming

- **Components**: PascalCase (e.g., `CaseStudyCard.tsx`)
- **Pages**: PascalCase with "Page" suffix (e.g., `HomePage.tsx`)
- **Styles**: kebab-case (e.g., `theme.css`)
- **Types**: PascalCase for interfaces (e.g., `ButtonProps`)

### Import Order

```tsx
// 1. External libraries
import React from 'react';
import { motion } from 'motion/react';

// 2. Internal components
import { Container } from '../components/Container';
import { Button } from '../components/Button';

// 3. Types
import type { ComponentProps } from './types';

// 4. Styles (if any)
import './styles.css';
```

### Component Structure

```tsx
// 1. Imports
import React from 'react';

// 2. Type definitions
interface ComponentProps {
  // ...
}

// 3. Component function
export function Component({ prop }: ComponentProps) {
  // 4. State & hooks
  const [state, setState] = useState();
  
  // 5. Event handlers
  const handleClick = () => {};
  
  // 6. Render
  return <div />;
}
```

---

## 🧪 Testing Strategy (Future)

### Recommended Testing Setup

```bash
# Install testing libraries
npm install -D @testing-library/react @testing-library/jest-dom vitest
```

### Test Locations

```
/src/app/components/
  Button.tsx
  Button.test.tsx        # Unit tests
  
/src/app/pages/
  HomePage.tsx
  HomePage.test.tsx      # Integration tests
```

### What to Test

1. **Components**: Props, rendering, interactions
2. **Pages**: Navigation, data display
3. **Forms**: Validation, submission
4. **Accessibility**: ARIA labels, keyboard nav

---

## 🚀 Performance Optimization

### Current Optimizations

1. **Code Splitting**: Components loaded as needed
2. **Motion**: GPU-accelerated animations only
3. **Images**: Lazy loading with native attributes
4. **Fonts**: Preloaded from Google Fonts CDN

### Future Improvements

1. **Image Optimization**: Use Next.js Image or similar
2. **Bundle Analysis**: Identify large dependencies
3. **Tree Shaking**: Remove unused code
4. **Compression**: Enable gzip/brotli

---

## 📚 Learning Path

### For Beginners

1. Start with `App.tsx` to understand routing
2. Study `Container` and `Section` for layout patterns
3. Customize `HomePage` content
4. Modify colors in `theme.css`

### For Intermediate

1. Create new page components
2. Build custom UI components
3. Implement new animation patterns
4. Extend the design system

### For Advanced

1. Add CMS integration (Contentful, Sanity)
2. Implement SSR with Next.js
3. Add authentication for admin panel
4. Build dynamic routing system

---

## 🐛 Common Issues & Solutions

### Issue: Styles not applying

**Solution**: Check import order in `index.css`:
```css
@import './fonts.css';    /* Must be first */
@import './tailwind.css';
@import './theme.css';
```

### Issue: Navigation not working

**Solution**: Ensure `onNavigate` is passed down correctly and page names match `PageType` enum.

### Issue: Images not loading

**Solution**: Use absolute URLs from Unsplash or place in `/public/images/` and reference as `/images/filename.jpg`.

### Issue: Animations not triggering

**Solution**: Check that `motion` import is correct:
```tsx
import { motion } from 'motion/react';  // Correct
import { motion } from 'framer-motion'; // Old, don't use
```

---

## 📝 Maintenance Checklist

### Regular Updates

- [ ] Update dependencies monthly
- [ ] Test on latest browsers
- [ ] Check Lighthouse scores
- [ ] Validate HTML/CSS
- [ ] Test on real devices

### Content Updates

- [ ] Add new case studies
- [ ] Update bio and experience
- [ ] Refresh images
- [ ] Update contact information
- [ ] Review and update metrics

### Code Quality

- [ ] Remove unused components
- [ ] Consolidate duplicate code
- [ ] Update documentation
- [ ] Run accessibility audit
- [ ] Check TypeScript errors

---

## 🎓 Additional Resources

### Official Documentation
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Motion](https://motion.dev/docs/react-quick-start)

### Design Inspiration
- [Dribbble - Portfolio Designs](https://dribbble.com/tags/portfolio)
- [Awwwards - Portfolio Sites](https://www.awwwards.com/websites/portfolio/)
- [Behance - UX Portfolios](https://www.behance.net/search/projects?field=ux)

### UX Resources
- [Laws of UX](https://lawsofux.com/)
- [UX Design Checklist](https://uxchecklist.github.io/)
- [Nielsen Norman Group](https://www.nngroup.com/)

---

**Last Updated**: February 2026  
**Version**: 1.0.0  
**Maintainer**: UX Portfolio Team
