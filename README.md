# UX Designer Portfolio

A modern, professional portfolio website for UX Designers built with React, TypeScript, Tailwind CSS, and Motion (Framer Motion).

## 🎨 Design Philosophy

This portfolio follows a **Scandinavian-inspired design** with emphasis on:
- Minimalism and clarity
- Strategic storytelling
- Product-focused case studies
- Accessible, user-centered design
- Professional confidence without decoration

## 🔧 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **Motion** (Framer Motion) - Smooth animations
- **Vite** - Build tool
- **Lucide React** - Icon system

## 📁 Project Structure

```
/src
├── /app
│   ├── App.tsx                 # Main app component with routing
│   ├── /components             # Reusable components
│   │   ├── Navigation.tsx      # Top navigation bar
│   │   ├── Footer.tsx          # Footer with social links
│   │   ├── Container.tsx       # Max-width wrapper
│   │   ├── Section.tsx         # Section spacing component
│   │   ├── Button.tsx          # Custom button variants
│   │   ├── Tag.tsx             # Tag/chip component
│   │   └── CaseStudyCard.tsx   # Project card component
│   └── /pages                  # Page components
│       ├── HomePage.tsx        # Landing page
│       ├── AboutPage.tsx       # About/bio page
│       ├── CaseStudyPage.tsx   # Case study detail
│       └── ContactPage.tsx     # Contact form
├── /styles
│   ├── index.css              # Entry point
│   ├── fonts.css              # Font imports
│   ├── tailwind.css           # Tailwind directives
│   └── theme.css              # Design tokens & system
└── /public
    └── /images                 # Static images
```

## 🎯 Design System

### Colors

```css
/* Primary Colors */
--background: #fafafa;        /* Light background */
--foreground: #1a1a1a;        /* Dark text */
--accent: #5a6f5b;            /* Mossy green accent */

/* Semantic Colors */
--card: #ffffff;              /* Card background */
--secondary: #f5f5f5;         /* Secondary elements */
--muted: #e5e5e5;             /* Muted backgrounds */
--border: #e5e5e5;            /* Border color */
```

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)

**Type Scale:**
- H1: 3.5rem (56px) - Hero headings
- H2: 2.5rem (40px) - Section headings
- H3: 1.75rem (28px) - Subsections
- H4: 1.25rem (20px) - Small headings
- Body: 1rem (16px) - Paragraph text
- Small: 0.875rem (14px) - Captions

### Spacing

8px spacing system: `8, 16, 24, 32, 48, 64, 96, 128`

### Layout

- **Max Widths:**
  - Narrow: 768px (48rem) - For long-form content
  - Default: 1152px (72rem) - Standard pages
  - Wide: 1280px (80rem) - Full layouts

- **Breakpoints:**
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## 🧩 Component Architecture

### Layout Components

**Container**
```tsx
<Container size="default" | "narrow" | "wide">
  {children}
</Container>
```

**Section**
```tsx
<Section id="optional-id" className="custom-classes">
  {children}
</Section>
```

### UI Components

**Button**
```tsx
<Button 
  variant="primary" | "secondary" | "ghost"
  size="default" | "large"
  showArrow={boolean}
  onClick={handler}
>
  Text
</Button>
```

**Tag**
```tsx
<Tag variant="default" | "accent">
  Label
</Tag>
```

**CaseStudyCard**
```tsx
<CaseStudyCard
  title="Project Name"
  description="Brief description"
  tags={['Tag1', 'Tag2']}
  imageUrl="https://..."
  year="2025"
  onClick={handler}
  index={0}
/>
```

## 📄 Pages

### 1. Home Page (`/`)
- **Hero Section**: Name, title, value proposition, CTAs
- **Selected Work**: Featured case studies (3 projects)
- **Process Overview**: Design methodology
- **Contact CTA**: Call to action

### 2. About Page
- **Bio**: Personal story and approach
- **Experience Timeline**: Work history & education
- **Skills**: Categorized capabilities
- **Tools**: Design toolkit

### 3. Case Study Page
- **Overview**: Role, timeline, team, year
- **Problem Statement**: Challenge definition
- **Process**: Research, design, testing phases
- **Solution**: Final design showcase
- **Outcomes**: Metrics and impact
- **Reflection**: Learnings

### 4. Contact Page
- **Contact Form**: Name, email, company, message
- **Contact Info**: Email, LinkedIn
- **Response expectations**: Timeline

## ✨ Interactions & Animations

### Motion Patterns

**Page Transitions**
- Fade in on load: `opacity: 0 → 1`
- Slide up: `y: 20 → 0`

**Scroll Animations**
- Viewport detection with `whileInView`
- Once-only animations with `viewport={{ once: true }}`

**Hover States**
- Card lift on project cards
- Arrow slide on buttons
- Color transitions on links

**Mobile Menu**
- Smooth expand/collapse
- AnimatePresence for exit animations

### Performance

- Animations use GPU-accelerated properties (`opacity`, `transform`)
- Lazy viewport intersection for scroll animations
- Reduced motion respected via browser preferences

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Customization

1. **Update Content**: Edit `/src/app/pages/*` files to customize text and data
2. **Change Colors**: Modify CSS variables in `/src/styles/theme.css`
3. **Add Projects**: Update case study data in `HomePage.tsx` and `CaseStudyPage.tsx`
4. **Replace Images**: Use Unsplash URLs or upload to `/public/images`
5. **Personal Info**: Update name, links, and contact info in components

## 📱 Responsive Design

- **Mobile-first approach**: Base styles for mobile, enhanced for larger screens
- **Flexible Grid**: CSS Grid and Flexbox for layouts
- **Touch-friendly**: Minimum 44px touch targets
- **Readable Line Lengths**: Max 65-75 characters for body text
- **Collapsible Navigation**: Hamburger menu on mobile

## ♿ Accessibility

- **Semantic HTML**: Proper heading hierarchy
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard access
- **Focus Indicators**: Visible focus states
- **Color Contrast**: WCAG AA compliant
- **Alt Text**: Descriptive image alternatives

## 🎭 Best Practices

### Code Quality
- TypeScript for type safety
- Component composition over duplication
- Prop interfaces for all components
- Consistent naming conventions

### Performance
- Image optimization with appropriate formats
- Lazy loading for below-fold content
- Minimal bundle size
- Fast page transitions

### Maintainability
- Clear folder structure
- Reusable components
- Centralized design system
- Well-commented code

## 🔄 Future Enhancements

Potential additions for production:

- [ ] Blog integration
- [ ] CMS for case study management
- [ ] Email form integration (FormSpree, Netlify Forms)
- [ ] Google Analytics
- [ ] SEO optimization (meta tags, sitemap)
- [ ] Dark mode toggle
- [ ] Project filtering/search
- [ ] Testimonials section
- [ ] Resume PDF download
- [ ] Multi-language support

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Motion Documentation](https://motion.dev/docs)
- [React Documentation](https://react.dev)
- [Lucide Icons](https://lucide.dev)

## 📝 License

This is a starter template for personal portfolio use. Feel free to customize and use for your own portfolio.

---

**Built with care for UX Designers** 💚
