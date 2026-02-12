# Project File Tree

Visual representation of the complete UX Designer Portfolio structure.

```
ux-portfolio/
│
├── 📄 README.md                          # Project overview & technical setup
├── 📄 QUICKSTART.md                      # 15-minute getting started guide
├── 📄 COMPONENTS.md                      # Component API documentation
├── 📄 STRUCTURE.md                       # Architecture deep-dive
├── 📄 CUSTOMIZATION.md                   # Content & design customization
│
├── 📦 package.json                       # Dependencies & scripts
├── ⚙️ vite.config.ts                     # Vite configuration
├── ⚙️ postcss.config.mjs                 # PostCSS plugins
├── ⚙️ tsconfig.json                      # TypeScript config
│
├── 📁 src/                               # Source code
│   │
│   ├── 📁 app/                           # Application code
│   │   │
│   │   ├── 📄 App.tsx                    # ⭐ Root component with routing
│   │   │
│   │   ├── 📁 components/                # Reusable components
│   │   │   ├── 📄 Navigation.tsx         # Top nav + mobile menu
│   │   │   ├── 📄 Footer.tsx             # Site footer
│   │   │   ├── 📄 Container.tsx          # Max-width wrapper
│   │   │   ├── 📄 Section.tsx            # Vertical spacing
│   │   │   ├── 📄 Button.tsx             # Custom button
│   │   │   ├── 📄 Tag.tsx                # Chip/tag component
│   │   │   ├── 📄 CaseStudyCard.tsx      # Project card
│   │   │   │
│   │   │   ├── 📁 figma/                 # Figma-specific components
│   │   │   │   └── 📄 ImageWithFallback.tsx
│   │   │   │
│   │   │   └── 📁 ui/                    # Pre-built UI library
│   │   │       ├── 📄 accordion.tsx
│   │   │       ├── 📄 alert.tsx
│   │   │       ├── 📄 avatar.tsx
│   │   │       ├── 📄 badge.tsx
│   │   │       ├── 📄 button.tsx
│   │   │       ├── 📄 card.tsx
│   │   │       ├── 📄 dialog.tsx
│   │   │       ├── 📄 input.tsx
│   │   │       ├── 📄 tabs.tsx
│   │   │       └── ... (40+ components)
│   │   │
│   │   └── 📁 pages/                     # Page components
│   │       ├── 📄 HomePage.tsx           # Landing page
│   │       ├── 📄 AboutPage.tsx          # About/bio page
│   │       ├── 📄 CaseStudyPage.tsx      # Case study details
│   │       └── 📄 ContactPage.tsx        # Contact form
│   │
│   └── 📁 styles/                        # Global styles
│       ├── 📄 index.css                  # ⭐ Main entry (imports others)
│       ├── 📄 fonts.css                  # Web fonts (Inter)
│       ├── 📄 tailwind.css               # Tailwind directives
│       └── 📄 theme.css                  # ⭐ Design system tokens
│
└── 📁 public/                            # Static assets
    └── 📁 images/                        # Image files (if needed)
        └── (place custom images here)
```

---

## 🔑 Key Files to Customize

### High Priority (Change First)

| File | What to Update | Time |
|------|----------------|------|
| `/src/app/pages/HomePage.tsx` | Hero text, project list | 5 min |
| `/src/app/pages/AboutPage.tsx` | Bio, experience, skills | 15 min |
| `/src/app/components/Navigation.tsx` | Your name | 1 min |
| `/src/app/components/Footer.tsx` | Name, email, links | 2 min |
| `/src/app/pages/CaseStudyPage.tsx` | Case study content | 30 min |

### Medium Priority (Design & Branding)

| File | What to Update | Time |
|------|----------------|------|
| `/src/styles/theme.css` | Colors, spacing tokens | 10 min |
| `/src/styles/fonts.css` | Typography (if changing fonts) | 5 min |

### Low Priority (Advanced)

| File | What to Update | When |
|------|----------------|------|
| `/src/app/App.tsx` | Routing logic | Only if adding features |
| `/src/app/components/*.tsx` | Component behavior | Only if needed |
| `/package.json` | Dependencies | Only if adding packages |

---

## 📊 File Size Overview

Approximate file sizes and complexity:

| Category | Files | Lines of Code | Complexity |
|----------|-------|---------------|------------|
| Pages | 4 | ~1,200 | Medium |
| Custom Components | 7 | ~600 | Low |
| Styles | 4 | ~250 | Low |
| Documentation | 5 | ~3,000 | N/A |
| UI Library | 40+ | ~5,000 | Low (pre-built) |
| Configuration | 3 | ~100 | Low |

**Total Project**: ~10,000 lines

---

## 🗺️ Navigation Flow

```
App.tsx (Router)
    │
    ├── currentPage: 'home'
    │   └── HomePage
    │       ├── Hero Section
    │       ├── Case Studies → onClick → navigate('case-study', id)
    │       ├── Process Section
    │       └── CTA → onClick → navigate('contact')
    │
    ├── currentPage: 'about'
    │   └── AboutPage
    │       ├── Bio Hero
    │       ├── Experience Timeline
    │       ├── Skills
    │       └── Tools
    │
    ├── currentPage: 'case-study'
    │   └── CaseStudyPage (receives caseStudyId)
    │       ├── Hero
    │       ├── Problem
    │       ├── Process (3 phases)
    │       ├── Solution
    │       ├── Outcomes
    │       └── Reflection
    │
    └── currentPage: 'contact'
        └── ContactPage
            ├── Contact Info
            └── Contact Form
```

---

## 🎨 Style Inheritance Chain

```
fonts.css
    ↓
Inter font loaded
    ↓
tailwind.css
    ↓
Tailwind utilities generated
    ↓
theme.css
    ↓
Design tokens defined (:root variables)
    ↓
Base styles applied (h1, h2, p, etc.)
    ↓
Components use Tailwind classes
    ↓
Final rendered styles
```

---

## 📦 Component Dependencies

```
Pages depend on:
    ├── Layout Components (Container, Section)
    ├── UI Components (Button, Tag, CaseStudyCard)
    ├── Motion (for animations)
    └── Lucide React (for icons)

Layout Components:
    └── Pure React (no external deps)

UI Components:
    ├── Motion (animations)
    └── Lucide React (icons)
```

---

## 🔄 Data Flow Patterns

### 1. Navigation State
```
Navigation.tsx → onNavigate() → App.tsx → setState() → Re-render
```

### 2. Case Study Selection
```
CaseStudyCard → onClick() → onNavigate(page, id) → App.tsx → 
CaseStudyPage receives id → Loads data from caseStudyData object
```

### 3. Form Submission
```
ContactPage form → onSubmit() → handleSubmit() → 
Form validation → Alert (in demo) or API call (in production)
```

---

## 🏗️ Build Process

```
Source Files (TypeScript + CSS)
    ↓
Vite Build Tool
    ├── TypeScript → Transpiled to JavaScript
    ├── Tailwind CSS → Processed and purged
    ├── PostCSS → Autoprefixer applied
    └── Assets → Optimized and hashed
    ↓
/dist/ folder
    ├── index.html
    ├── assets/
    │   ├── index-[hash].js
    │   └── index-[hash].css
    └── (ready for deployment)
```

---

## 📱 Component Render Tree

### Homepage Render
```
App
└── HomePage
    ├── Navigation (fixed)
    │   └── MobileMenu (if open)
    │
    ├── Section (Hero)
    │   └── Container
    │       ├── motion.div (text content)
    │       └── Button (×2)
    │
    ├── Section (Work)
    │   └── Container
    │       ├── Heading
    │       └── CaseStudyCard (×3)
    │           ├── motion.div (card wrapper)
    │           ├── motion.img (project image)
    │           ├── h3 (title)
    │           ├── p (description)
    │           └── Tag (×3-5 per card)
    │
    ├── Section (Process)
    │   └── Container
    │       └── ProcessCard (×3)
    │           ├── Icon
    │           ├── h3 (title)
    │           └── p (description)
    │
    ├── Section (CTA)
    │   └── Container
    │       ├── h2
    │       ├── p
    │       └── Button
    │
    └── Footer
        ├── Contact Info
        ├── Social Links (×3)
        └── Copyright
```

---

## 🎯 File Purpose Quick Reference

| File | Purpose | Edit Frequency |
|------|---------|----------------|
| `App.tsx` | Routing & page management | Rarely |
| `HomePage.tsx` | Landing page content | Often |
| `AboutPage.tsx` | Bio & experience | Sometimes |
| `CaseStudyPage.tsx` | Project details | Often |
| `ContactPage.tsx` | Contact form | Rarely |
| `Navigation.tsx` | Top nav bar | Rarely |
| `Footer.tsx` | Footer content | Sometimes |
| `theme.css` | Design system | Sometimes |
| Other components | UI building blocks | Rarely |

---

## 💡 Development Workflow

```
1. Edit content files
   └── HomePage.tsx, AboutPage.tsx, etc.
   
2. See changes live
   └── Hot module reload (instant)
   
3. Customize design
   └── theme.css for colors/tokens
   └── Components for structure
   
4. Add case studies
   └── Update HomePage.tsx (card)
   └── Update CaseStudyPage.tsx (full content)
   
5. Test locally
   └── npm run dev
   └── Check all pages & mobile
   
6. Build for production
   └── npm run build
   
7. Deploy
   └── Push to GitHub
   └── Auto-deploy via Vercel/Netlify
```

---

## 📖 Documentation Map

```
📚 Documentation Files
    │
    ├── 📄 QUICKSTART.md ─────────► Start here (15 min setup)
    │
    ├── 📄 README.md ─────────────► Technical overview
    │   ├── Tech stack
    │   ├── Design philosophy
    │   ├── Installation
    │   └── Project structure
    │
    ├── 📄 COMPONENTS.md ─────────► Component reference
    │   ├── Props & usage
    │   ├── Examples
    │   └── Best practices
    │
    ├── 📄 STRUCTURE.md ──────────► Architecture details
    │   ├── File organization
    │   ├── Data flow
    │   └── Extension points
    │
    ├── 📄 CUSTOMIZATION.md ──────► Content guide
    │   ├── Branding
    │   ├── Case studies
    │   ├── Images
    │   └── Deployment
    │
    └── 📄 FILETREE.md ───────────► This file
        └── Visual overview
```

---

## 🚀 Getting Started Path

```
New User Journey:
    │
    1. Read QUICKSTART.md (5 min)
    │
    2. Run npm install & npm run dev (2 min)
    │
    3. Update name & email (3 min)
    │
    4. Change hero text (5 min)
    │
    5. Write bio in AboutPage (15 min)
    │
    6. Add first case study (30 min)
    │   ├── Update HomePage.tsx
    │   └── Update CaseStudyPage.tsx
    │
    7. Customize colors in theme.css (10 min)
    │
    8. Test on mobile device (5 min)
    │
    9. Deploy to Vercel/Netlify (10 min)
    │
    10. Share your portfolio! 🎉
```

---

**Total Time to Launch**: ~2 hours for basic customization  
**Full Customization**: 1-2 days with complete content

Happy building! 🚀
