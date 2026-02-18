# figma/claude.md

Design-to-Code Implementation Rules for the Portfolio Project

This file provides guidance for Claude Code instances converting Figma designs into React/TypeScript code for the portfolio project. It covers the design system, component patterns, and Figma Make integration specifics.

## Overview

The portfolio uses Figma Make as its deployment platform and integrates design tools directly into the development workflow. This document ensures consistency when implementing designs, whether working from Figma screenshots or extracted design context.

**Key Principles:**
- Design system is token-driven (CSS custom properties, not magic numbers)
- Components layer Radix UI primitives with Tailwind styling
- Animations use Framer Motion with consistent patterns
- Images use ImageWithFallback for Figma Make compatibility
- TypeScript ensures type safety across all implementations

## Using Claude Code's Figma Tools

Claude Code has three MCP tools for extracting design information directly from Figma:

### mcp__figma-desktop__get_design_context()

**Purpose:** Extract design properties, layout information, and component structure from a Figma node.

**When to use:**
- Getting exact dimensions, padding, margin values from a design
- Understanding component hierarchy and layer structure
- Extracting text content, font properties, and color values
- Determining responsive breakpoint behavior

**Example usage:**
```typescript
// Call tool with a Figma node ID to get design context
mcp__figma-desktop__get_design_context({
  nodeId: "123:456",
  clientFrameworks: "react",
  clientLanguages: "typescript"
})

// Returns component properties, layout props, animations, responsive behavior
```

**What you get:**
- Component structure (parent/child relationships)
- Design properties (colors, fonts, spacing)
- Animation definitions
- Responsive variants (mobile/tablet/desktop)
- Accessibility properties

### mcp__figma-desktop__get_variable_defs()

**Purpose:** Extract design system variables (colors, typography, spacing) from Figma and map them to CSS custom properties.

**When to use:**
- Understanding how Figma variables map to the design system
- Building consistent color schemes
- Getting typography scale values
- Extracting spacing/sizing systems

**Example usage:**
```typescript
// Call tool to get all variable definitions in the design file
mcp__figma-desktop__get_variable_defs({
  nodeId: "1:1",  // Root page or component set
  clientFrameworks: "react",
  clientLanguages: "typescript"
})

// Returns: { 'icon/default/secondary': '#949494', 'color/primary': '#5a6f5b', ... }
```

### mcp__figma-desktop__get_screenshot()

**Purpose:** Generate a visual screenshot of a Figma component for reference during implementation.

**When to use:**
- Visual validation of component implementation
- Understanding hover/active states
- Checking spacing and alignment
- Reference for animations and transitions

**Example usage:**
```typescript
// Get a screenshot of the component
mcp__figma-desktop__get_screenshot({
  nodeId: "789:101",
  clientFrameworks: "react",
  clientLanguages: "typescript"
})
```

## Design System Reference

### CSS Custom Properties Architecture

All design tokens are defined as CSS custom properties in `src/styles/theme.css`. This enables:
- Light/dark mode switching via `.dark` class
- Runtime theme changes without rebuilding
- Consistent token names across the codebase

**Property Structure:** `--category-element` (e.g., `--accent`, `--card-foreground`)

### Color Tokens

All values shown for light mode; dark mode uses OKLch() color space for perceptual consistency.

| Token | Light Value | Usage |
|-------|-------------|-------|
| `--background` | #fafafa | Page/screen background |
| `--foreground` | #1a1a1a | Primary text |
| `--card` | #ffffff | Card/panel backgrounds |
| `--card-foreground` | #1a1a1a | Text inside cards |
| `--primary` | #1a1a1a | Primary text/borders |
| `--primary-foreground` | #fafafa | Text on primary elements |
| `--secondary` | #f5f5f5 | Secondary backgrounds |
| `--secondary-foreground` | #1a1a1a | Text on secondary |
| `--muted` | #e5e5e5 | Disabled/inactive states |
| `--muted-foreground` | #666666 | Muted text |
| `--accent` | #5a6f5b | Mossy green, primary action |
| `--accent-foreground` | #ffffff | Text on accent |
| `--destructive` | #d4183d | Error/delete actions |
| `--destructive-foreground` | #ffffff | Text on destructive |
| `--border` | #e5e5e5 | Border colors |
| `--input` | transparent | Input field backgrounds |
| `--input-background` | #f5f5f5 | Fallback input background |

**Usage in Tailwind:** Tokens are available as Tailwind utilities:
```html
<!-- Background colors -->
<div class="bg-background">Light background</div>
<div class="bg-card">Card background</div>
<div class="bg-accent">Accent green</div>

<!-- Text colors -->
<p class="text-foreground">Primary text</p>
<p class="text-muted-foreground">Muted text</p>
<p class="text-accent">Accent text</p>

<!-- Border colors -->
<div class="border border-border">Bordered element</div>
<div class="border-2 border-accent">Accent border</div>
```

### Typography Scale

Headings and body text sizes are defined in `@layer base` with responsive scaling:

| Element | Desktop | Mobile (<768px) | Font Weight | Line Height | Usage |
|---------|---------|-----------------|-------------|-------------|-------|
| h1 | 3.5rem | 2.5rem | 600 | 1.1 | Page titles, heroes |
| h2 | 2.5rem | 2rem | 600 | 1.2 | Section headings |
| h3 | 1.75rem | 1.5rem | 600 | 1.3 | Subsection headings |
| h4 | 1.25rem | 1.25rem | 500 | 1.4 | Minor headings, labels |
| p | 1rem | 1rem | 400 | 1.7 | Body text |
| label | 0.875rem | 0.875rem | 500 | 1.5 | Form labels |
| button | 1rem | 1rem | 500 | 1.5 | Button text |
| input | 1rem | 1rem | 400 | 1.5 | Input text |

**Usage in Components:**
```tsx
// Headings automatically get base layer styling
<h1>Page Title</h1>  // 3.5rem on desktop, 2.5rem on mobile
<h2>Section Title</h2>
<h3>Subsection</h3>
<p>Body text automatically gets 1rem size</p>

// Override with Tailwind utilities if needed
<h1 className="text-2xl">Custom sized heading</h1>
```

### Spacing & Sizing

Radius values are calculated from base `--radius: 0.375rem`:

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | -4px from base | Smallest corners |
| `--radius-md` | -2px from base | Medium corners |
| `--radius-lg` | 0.375rem (base) | Standard corners |
| `--radius-xl` | +4px from base | Largest corners |

**Usage in Tailwind:**
```html
<div class="rounded-sm">Smallest radius</div>
<div class="rounded-md">Medium radius</div>
<div class="rounded-lg">Large radius (default)</div>
<div class="rounded-xl">Extra large radius</div>

<!-- Custom tailwind sizes also work -->
<div class="rounded-2xl">Even larger</div>
```

### Font Properties

**Font Family:** Inter (with system font fallback)
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Font Weights:**
- `--font-weight-light: 300` - Light text
- `--font-weight-normal: 400` - Regular/default weight
- `--font-weight-medium: 500` - Medium weight (labels, buttons)

## Component Implementation Rules

### Rule 1: When to Use Radix UI vs Custom Components

**Use Radix UI directly for:**
- Form controls (Select, Checkbox, Radio, Switch, Slider)
- Modal/Dialog elements
- Popover/Tooltip
- Accordion, Tabs
- Complex interactive patterns

**Example - Radix UI Dialog:**
```tsx
import * as Dialog from '@radix-ui/react-dialog';

export function MyDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="bg-accent text-accent-foreground px-4 py-2 rounded-lg">
        Open Dialog
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card rounded-lg p-6">
          {/* Content */}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

**Create custom wrapper components for:**
- Reusable styled components (Button, Tag, Card)
- Domain-specific components (CaseStudyCard, ChatMessage)
- Layout components (Container, Section)

### Rule 2: TypeScript Prop Interfaces

**Good - Clear, typed props:**
```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'large';
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
  href?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'default',
  onClick,
  className = '',
  showArrow = false,
  href,
}: ButtonProps) {
  // Implementation
}
```

**Bad - Avoid:**
```tsx
// Too generic, loses type information
export function Button(props: any) { }

// Missing prop types
interface ButtonProps {
  children,    // ❌ No type
  variant,     // ❌ No type, no defaults
  size
}

// Unnecessary spreading
export function Button({ ...props }: ButtonProps) { }
```

### Rule 3: Tailwind Class Composition

**Good - Compose utilities with semantic meaning:**
```tsx
// Base classes for all variants
const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all';

// Variant-specific styling
const variantClasses = {
  primary: 'bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg',
  secondary: 'bg-secondary text-foreground hover:bg-muted border border-border',
  ghost: 'text-foreground hover:text-accent hover:bg-accent/5',
};

// Size variations
const sizeClasses = {
  default: 'px-6 py-3 text-base',
  large: 'px-8 py-4 text-lg',
};

const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
```

**Bad - Avoid:**
```tsx
// Inline styles instead of Tailwind
style={{ backgroundColor: '#5a6f5b', padding: '12px 24px' }}

// Magic strings instead of design tokens
className="px-[17px]"  // ❌ Should use design token spacing
className="text-[#5a6f5b]"  // ❌ Should use color token

// Overly long className attribute
className="inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all bg-accent text-accent-foreground hover:bg-accent/90"
// ❌ Better to compose in variables
```

### Rule 4: Framer Motion Import Pattern

**Always import from 'motion/react':**
```tsx
import { motion } from 'motion/react';

// Available components: motion.div, motion.span, motion.img, etc.
<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
  Content
</motion.div>
```

**Never use:**
```tsx
import { motion } from 'framer-motion';  // ❌ Wrong import
```

### Rule 5: Animation Skeleton

Most animations follow this pattern: fade in + slight vertical movement on scroll.

**Standard fade-in on scroll:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}           // Start invisible, 20px below
  whileInView={{ opacity: 1, y: 0 }}        // Fade in, slide to position
  viewport={{ once: true, margin: "-100px" }} // Trigger when ~100px from view
  transition={{ duration: 0.5 }}            // 500ms animation
>
  Content
</motion.div>
```

**Staggered animation (for lists/grids):**
```tsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{
      duration: 0.5,
      delay: index * 0.1  // Each item delays 100ms more
    }}
  >
    {item.content}
  </motion.div>
))}
```

**Hover effect (image scaling):**
```tsx
<motion.img
  src={imageUrl}
  whileHover={{ scale: 1.05 }}      // Scale to 105% on hover
  transition={{ duration: 0.6 }}    // Smooth 600ms animation
  className="w-full h-full object-cover"
/>
```

**Interactive element animation:**
```tsx
<motion.button
  whileHover={{ y: -2 }}             // Slight upward movement
  whileTap={{ scale: 0.95 }}         // Compress on click
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
  Click me
</motion.button>
```

### Rule 6: Component Export Pattern

**Standard component structure:**
```tsx
import React from 'react';
import { motion } from 'motion/react';

interface MyComponentProps {
  title: string;
  description?: string;
  variant?: 'primary' | 'secondary';
  onAction?: () => void;
}

export function MyComponent({
  title,
  description,
  variant = 'primary',
  onAction,
}: MyComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="..."
    >
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </motion.div>
  );
}
```

**File naming:** PascalCase for components (`Button.tsx`, `CaseStudyCard.tsx`)
**Export:** Named function export (not default)

## Image Handling in Figma Make

### ImageWithFallback Component

Use `ImageWithFallback` for all images that come from Figma Make or may fail to load:

**Location:** `src/app/components/figma/ImageWithFallback.tsx`

**Props:** Accepts all standard HTML `<img>` attributes
```tsx
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

export function MyComponent() {
  return (
    <ImageWithFallback
      src="https://example.com/image.jpg"
      alt="Description"
      className="w-full h-auto rounded-lg"
      style={{ maxWidth: '600px' }}
    />
  );
}
```

**What it does:**
- Renders normal `<img>` on success
- On error (404, CORS, timeout), shows graceful SVG fallback
- Fallback is a gray placeholder with image icon
- Original URL is stored in `data-original-url` attribute for debugging

**When to use:**
- Images sourced from Figma Make exports
- External URLs that may 404
- When graceful fallback is important for UX

**When standard `<img>` is fine:**
- Images bundled with the app (in `public/` or imported)
- Internal assets you control

### Example: Image Handling in CaseStudyCard

```tsx
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

export function CaseStudyCard({ imageUrl, title }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
      <motion.img
        as={ImageWithFallback}  // ❌ Can't wrap Radix components this way
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

// ✅ Better approach: Use ImageWithFallback directly, apply motion separately
export function CaseStudyCard({ imageUrl, title }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6 }}
      >
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
}
```

## Figma Make Specific Rules

### Vite Configuration Requirements

The `vite.config.ts` includes both React and Tailwind plugins. This is necessary because:

1. **React Plugin**: Handles JSX/TSX transformation
2. **Tailwind CSS Plugin**: Processes Tailwind CSS directives even though v4 is mostly just importing

**Config structure:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
```

### Asset Import Rules

**Import as modules (with path alias):**
```tsx
import { Button } from '@/components/Button';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { generateAIResponse } from '@/utils/mockAI';
```

**Raw SVG imports (for icons):**
```tsx
import lightIcon from '@/assets/light.svg?raw';

<div dangerouslySetInnerHTML={{ __html: lightIcon }} />
```

**Static image files (in `public/`):**
```tsx
<img src="/images/profil.png" alt="Profile" />
```

**What to avoid:**
- Relative imports like `../../components` (use `@/` alias)
- CSS modules (not in this project)
- Importing non-image binary files

### Deployment Output

Build command produces `dist/` directory for Figma Make deployment:

```bash
npm run build
# Creates dist/ with:
# - index.html (entry point)
# - assets/ (bundled JS, CSS, images)
# - All static assets from public/
```

## Code Generation Guidelines

### File Organization

**Components:**
- Location: `src/app/components/`
- Naming: PascalCase (e.g., `Button.tsx`, `CaseStudyCard.tsx`)
- Structure: One component per file

**Pages:**
- Location: `src/app/pages/`
- Naming: PascalCase with "Page" suffix (e.g., `HomePage.tsx`, `AboutPage.tsx`)
- Structure: Full-page components exported as default or named

**Utilities:**
- Location: `src/app/utils/`
- Naming: camelCase (e.g., `mockAI.ts`, `portfolioKnowledge.ts`)
- Purpose: Shared logic, constants, helpers

**Styles:**
- Location: `src/styles/`
- `index.css` - Main entry point
- `tailwind.css` - Tailwind directives
- `fonts.css` - Font imports
- `theme.css` - Design tokens and extensions

### State Management Pattern

**For local component state:**
```tsx
export function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close' : 'Open'}
      </button>
    </>
  );
}
```

**For shared state (used in App.tsx):**
```tsx
// App.tsx
const [appState, setAppState] = useState({
  currentPage: 'home',
  caseStudyId: null,
  chatbotMessages: [],
  showFloatingChat: false,
});

// Pass state and handlers to child components
<HomePage appState={appState} onNavigate={handleNavigate} />
```

**No Context API or Redux needed** - Simple prop drilling is sufficient for this app size.

### Client-Side Routing Pattern

The app uses manual page management (no React Router):

```tsx
// In App.tsx
const [appState, setAppState] = useState<AppState>({
  currentPage: 'home',  // 'home' | 'about' | 'contact' | 'conversation' | 'caseStudy'
  caseStudyId: null,
});

const handleNavigate = (page: string, caseStudyId?: string) => {
  setAppState({ currentPage: page, caseStudyId });
  window.scrollTo(0, 0);
};

// Render based on appState
{appState.currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
{appState.currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
{appState.currentPage === 'caseStudy' && appState.caseStudyId && (
  <CaseStudyPage id={appState.caseStudyId} onNavigate={handleNavigate} />
)}
```

## Common Patterns & Anti-Patterns

### ✅ Good Patterns

**1. Component Composition with Tailwind:**
```tsx
// Clear separation of concerns
const baseClasses = 'inline-flex items-center justify-center gap-2';
const variantClasses = { primary: 'bg-accent text-white' };
const sizeClasses = { sm: 'px-4 py-2', lg: 'px-8 py-4' };

const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
return <button className={classes}>{children}</button>;
```

**2. Conditional Rendering with Motion:**
```tsx
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
  transition={{ duration: 0.3 }}
>
  {isVisible && <Content />}
</motion.div>
```

**3. Proper Type Safety:**
```tsx
interface Props {
  items: Array<{ id: string; label: string }>;
  onSelect: (id: string) => void;
  variant?: 'list' | 'grid';
}

export function ItemSelector({ items, onSelect, variant = 'list' }: Props) {
  // Full type safety
}
```

**4. Image with Fallback:**
```tsx
<ImageWithFallback
  src={imageUrl}
  alt="Descriptive text"
  className="w-full h-auto object-cover rounded-lg"
/>
```

### ❌ Anti-Patterns to Avoid

**1. Inline Styles Instead of Tailwind:**
```tsx
// ❌ BAD
<div style={{ backgroundColor: '#5a6f5b', padding: '12px' }}>
  Content
</div>

// ✅ GOOD
<div className="bg-accent px-3 py-[12px]">
  Content
</div>
```

**2. Missing Error Handling for Images:**
```tsx
// ❌ BAD - No fallback on 404
<img src={mayFailUrl} alt="Image" />

// ✅ GOOD - Graceful fallback
<ImageWithFallback src={mayFailUrl} alt="Image" />
```

**3. Wrong Framer Motion Import:**
```tsx
// ❌ BAD
import { motion } from 'framer-motion';

// ✅ GOOD
import { motion } from 'motion/react';
```

**4. Over-Engineering Animations:**
```tsx
// ❌ BAD - Unnecessary complexity
<motion.div
  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
  animate={{ opacity: 1, scale: 1, rotate: 0 }}
  exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
  transition={{
    type: 'spring',
    stiffness: 200,
    damping: 15,
    mass: 1.2,
  }}
/>

// ✅ GOOD - Simple, purposeful
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
/>
```

**5. Props Without Types:**
```tsx
// ❌ BAD
export function Button(props) {
  return <button onClick={props.onClick}>{props.label}</button>;
}

// ✅ GOOD
interface ButtonProps {
  onClick: () => void;
  label: string;
}

export function Button({ onClick, label }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

**6. Forgetting Dark Mode Support:**
```tsx
// ❌ BAD - Hardcoded color
className="bg-[#5a6f5b]"

// ✅ GOOD - Uses CSS custom property (supports dark mode automatically)
className="bg-accent"
```

### Extracting Components from Figma Designs

**Workflow for implementing a Figma component:**

1. **Get Design Context:**
   ```typescript
   mcp__figma-desktop__get_design_context({
     nodeId: "123:456",
     clientFrameworks: "react",
     clientLanguages: "typescript"
   })
   ```

2. **Extract Design Tokens:**
   ```typescript
   mcp__figma-desktop__get_variable_defs({
     nodeId: "1:1",
     clientFrameworks: "react",
     clientLanguages: "typescript"
   })
   // Map extracted colors/sizes to existing CSS custom properties
   ```

3. **Get Visual Reference:**
   ```typescript
   mcp__figma-desktop__get_screenshot({
     nodeId: "123:456",
     clientFrameworks: "react",
     clientLanguages: "typescript"
   })
   // Use screenshot to validate implementation
   ```

4. **Build Component:**
   - Create TypeScript interface for props
   - Extract design tokens (colors, spacing) to Tailwind classes
   - Use Radix UI primitives for complex interactions
   - Apply motion animations if needed
   - Use ImageWithFallback for images

5. **Add to Project:**
   - Save to appropriate directory (components, pages, or utils)
   - Export with proper naming
   - Add to relevant index files if needed
   - Test responsive behavior

## Design System Color Mapping

When working with Figma designs, map design colors to these tokens:

| Figma Color | CSS Token | Usage |
|-------------|-----------|-------|
| Light green (#5a6f5b) | `--accent` | Primary actions, highlights |
| Black/Dark gray | `--foreground` or `--primary` | Text, primary elements |
| Off-white (#fafafa) | `--background` | Page backgrounds |
| White (#ffffff) | `--card` | Card/panel backgrounds |
| Light gray (#f5f5f5) | `--secondary` | Secondary backgrounds |
| Very light gray (#e5e5e5) | `--muted` or `--border` | Borders, disabled states |
| Red (#d4183d) | `--destructive` | Error/delete actions |

Example: If a Figma button uses the green accent color, implement it as:
```tsx
className="bg-accent text-accent-foreground hover:bg-accent/90"
```

---

## Quick Reference: Common Component Patterns

### Button with Variants
```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
}

export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  const variantClasses = {
    primary: 'bg-accent text-accent-foreground hover:bg-accent/90',
    secondary: 'bg-secondary text-foreground border border-border',
    ghost: 'text-foreground hover:bg-accent/5',
  };

  return (
    <button onClick={onClick} className={`px-6 py-3 rounded-lg ${variantClasses[variant]}`}>
      {children}
    </button>
  );
}
```

### Card with Animation
```tsx
export function Card({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}
```

### Form Input
```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-accent"
      />
      {error && <p className="text-destructive text-sm mt-1">{error}</p>}
    </div>
  );
}
```

---

This document is the source of truth for design-to-code implementation in the portfolio project. Update it when adding new design patterns or design system tokens.
