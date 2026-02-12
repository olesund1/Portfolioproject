# Content Guidelines & Customization Guide

A comprehensive guide to customizing your UX Designer portfolio with your own content, brand, and case studies.

---

## 🎯 Before You Start

### Content Preparation Checklist

- [ ] Write your bio (300-500 words)
- [ ] Gather 2-3 case study projects
- [ ] Collect project images/mockups
- [ ] List your skills and tools
- [ ] Prepare your resume PDF
- [ ] Set up professional email
- [ ] Update LinkedIn profile
- [ ] Choose brand color (optional)

---

## 🎨 Brand Customization

### 1. Update Personal Information

**Navigation & Footer**

```tsx
// /src/app/components/Navigation.tsx
<button>Your Name</button>  // Line 34

// /src/app/components/Footer.tsx
<p>© {currentYear} Your Name</p>  // Line 53
```

**Contact Information**

```tsx
// /src/app/components/Footer.tsx
<a href="mailto:your@email.com">  // Line 24
<a href="https://linkedin.com/in/yourprofile">  // Line 31
<a href="https://github.com/yourusername">  // Line 38

// /src/app/pages/ContactPage.tsx
<a href="mailto:your@email.com">  // Line 45
```

### 2. Customize Colors

**Accent Color (Mossy Green → Your Brand)**

```css
/* /src/styles/theme.css */

:root {
  --accent: #5a6f5b;           /* Change this to your brand color */
  --accent-foreground: #ffffff; /* Text color on accent */
}

/* Example alternatives:
   Blue: #4A90E2
   Purple: #6B46C1
   Teal: #14B8A6
   Orange: #F97316
*/
```

**Preview your color:**
1. Pick a color using a tool like [Coolors](https://coolors.co/)
2. Check contrast ratio with [WebAIM](https://webaim.org/resources/contrastchecker/)
3. Update the CSS variable
4. Refresh your browser

### 3. Update Typography

**Change Font Family**

```css
/* /src/styles/fonts.css */

/* Replace Inter with your preferred font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

/* Then update theme.css */
body {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

**Popular font combinations:**
- **Modern**: Inter + Inter (monochromatic)
- **Classic**: Playfair Display + Inter
- **Friendly**: Poppins + Open Sans
- **Tech**: Space Grotesk + DM Sans

---

## 📝 Content Customization

### Home Page Hero

```tsx
// /src/app/pages/HomePage.tsx

// Lines 55-66: Update hero text
<p className="text-accent font-medium mb-6">
  UX Designer & Product Strategist  {/* Your title */}
</p>

<h1 className="mb-6">
  Crafting digital experiences that solve real problems  {/* Your tagline */}
</h1>

<p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
  I partner with teams to design meaningful products through research, 
  strategy, and user-centered thinking.  {/* Your value proposition */}
</p>
```

**Writing Tips:**

- **Title**: Be specific (e.g., "Senior Product Designer specializing in FinTech")
- **Tagline**: Focus on outcomes, not tools (e.g., "Designing products people love to use")
- **Value Prop**: Mention your unique approach or expertise

### About Page Bio

```tsx
// /src/app/pages/AboutPage.tsx

// Lines 73-93: Update bio paragraphs
```

**Structure:**
1. **Paragraph 1**: Experience + approach (2-3 sentences)
2. **Paragraph 2**: Philosophy + methodology (3-4 sentences)
3. **Paragraph 3**: Personal touch (1-2 sentences)

**Example Structure:**
```
"I'm a [role] with [X years] of experience in [specialty]. 
I focus on [your approach] to deliver [outcome].

I believe [your design philosophy]. Whether I'm [activity 1], 
[activity 2], or [activity 3], my focus is always on [core value].

When I'm not designing, you'll find me [hobby 1], [hobby 2], 
or [hobby 3]."
```

### Experience Timeline

```tsx
// /src/app/pages/AboutPage.tsx

// Lines 16-38: Update experience array
const experience = [
  {
    icon: Briefcase,  // or Award, BookOpen
    title: 'Your Job Title',
    company: 'Company Name',
    period: '2022 - Present',
    description: 'Brief description of your role and impact.',
  },
  // Add more entries...
];
```

### Skills & Tools

```tsx
// /src/app/pages/AboutPage.tsx

// Lines 40-64: Update skills
const skills = [
  {
    category: 'Your Category',
    items: ['Skill 1', 'Skill 2', 'Skill 3'],
  },
];

// Lines 66-77: Update tools
const tools = [
  'Tool 1', 'Tool 2', 'Tool 3',
  // Add your tools...
];
```

**Skill Category Ideas:**
- Research & Strategy
- Design & Prototyping
- Collaboration & Leadership
- Technical Skills
- Specializations

---

## 📂 Adding Case Studies

### Step 1: Add to Home Page

```tsx
// /src/app/pages/HomePage.tsx

// Lines 12-37: Add your project to array
const caseStudies = [
  {
    id: 'unique-project-id',           // Lowercase, hyphenated
    title: 'Project Title',            // Display name
    description: 'Brief 2-3 sentence description highlighting the impact.',
    tags: ['Category', 'Type', 'Tool'], // 3-5 tags max
    imageUrl: 'https://images.unsplash.com/...', // High-quality image
    year: '2025',                      // Project year
  },
  // Add more projects...
];
```

### Step 2: Add Full Case Study

```tsx
// /src/app/pages/CaseStudyPage.tsx

// Lines 16-120: Add to caseStudyData object
const caseStudyData = {
  'your-project-id': {
    title: 'Full Project Title',
    subtitle: 'Compelling one-line summary',
    tags: ['Tag1', 'Tag2', 'Tag3'],
    heroImage: 'https://...',
    
    overview: {
      role: 'Your Role',
      timeline: 'Duration',
      team: 'Team Composition',
      year: '2025',
    },
    
    problem: 'Context and problem statement (3-5 sentences)',
    
    challenge: 'How might we... statement',
    
    outcome: {
      metrics: [
        { label: 'Metric name', value: '% change' },
        // 3-4 metrics recommended
      ],
    },
    
    process: [
      {
        title: 'Phase Name',
        description: 'What you did in this phase',
        insights: [
          'Key finding 1',
          'Key finding 2',
          // 3-5 insights per phase
        ],
      },
      // 3-4 phases recommended
    ],
    
    solution: 'Final design description (2-4 sentences)',
    
    solutionImages: [
      'https://image1.jpg',
      'https://image2.jpg',
    ],
    
    reflection: 'What you learned (2-4 sentences)',
  },
};
```

### Case Study Writing Template

**Problem Statement:**
```
The [product/service] was experiencing [issue] which resulted in 
[negative impact]. [User research/data] showed that users were 
[specific pain point].
```

**Challenge (HMW):**
```
How might we [action] so that [user] can [benefit] while [constraint]?
```

**Process Phases:**
1. **Discover/Research**: User interviews, data analysis, competitive research
2. **Define**: Synthesis, problem framing, user flows
3. **Design**: Ideation, wireframes, visual design
4. **Test & Iterate**: Usability testing, refinement

**Metrics:**
- Use specific numbers (e.g., "32% increase" not "significant increase")
- Include before/after when possible
- Mix quantitative (numbers) and qualitative (satisfaction)

**Reflection:**
- What worked well?
- What would you do differently?
- What did you learn?

---

## 🖼️ Image Guidelines

### Finding Images

**Stock Photo Sources:**
- [Unsplash](https://unsplash.com/) (Free, high-quality)
- [Pexels](https://www.pexels.com/) (Free)
- [Figma Community](https://www.figma.com/community) (Mockups)

**Search Keywords:**
- "ux design workspace"
- "mobile app mockup"
- "dashboard interface"
- "user testing session"
- "digital product design"

### Image Specifications

| Location | Aspect Ratio | Recommended Size |
|----------|--------------|------------------|
| Case Study Card | 16:10 | 1600 × 1000 px |
| Hero Image | 21:9 | 2100 × 900 px |
| Solution Images | 4:3 | 1200 × 900 px |
| About Page | 1:1 or 4:5 | 800 × 800 px |

### Using Unsplash

```tsx
// Format: https://images.unsplash.com/photo-[ID]?w=[width]&q=[quality]

// Example:
imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80'

// Parameters:
// w=1200   (width in pixels)
// q=80     (quality, 60-90 recommended)
```

### Custom Images

Place in `/public/images/` folder:

```tsx
imageUrl: '/images/project-hero.jpg'
```

---

## 📧 Contact Form Setup

The default form shows an alert. To make it functional:

### Option 1: Formspree (Easiest)

```tsx
// /src/app/pages/ContactPage.tsx

<form 
  action="https://formspree.io/f/YOUR_FORM_ID"
  method="POST"
>
  {/* Keep existing fields */}
</form>
```

1. Sign up at [Formspree](https://formspree.io/)
2. Create a form and get your ID
3. Replace `YOUR_FORM_ID` in action URL

### Option 2: Netlify Forms

```tsx
<form 
  name="contact" 
  method="POST" 
  data-netlify="true"
>
  <input type="hidden" name="form-name" value="contact" />
  {/* Keep existing fields */}
</form>
```

Deploy to Netlify and forms will work automatically.

### Option 3: Custom Backend

Create an API endpoint and update the submit handler:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    if (response.ok) {
      alert('Message sent!');
      setFormData({ name: '', email: '', company: '', message: '' });
    }
  } catch (error) {
    alert('Error sending message');
  }
};
```

---

## 🎭 Design Customization

### Changing the Visual Style

**Minimal to Bold:**

```css
/* /src/styles/theme.css */

/* Increase border radius for more playful feel */
--radius: 1rem;  /* was 0.375rem */

/* Use brighter accent color */
--accent: #F97316;  /* Bold orange instead of green */
```

**Add Shadows:**

```tsx
// Update Button.tsx or add globally
className="shadow-lg hover:shadow-xl"
```

**Change Animations:**

```tsx
// More dramatic entrance
initial={{ opacity: 0, y: 50, scale: 0.95 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
transition={{ duration: 1, ease: "easeOut" }}
```

### Layout Variations

**Full-Width Hero:**

```tsx
// Remove Container from hero
<Section>
  <div className="px-6 max-w-7xl mx-auto">
    {/* Hero content */}
  </div>
</Section>
```

**Centered Layout:**

```tsx
// Add text-center to hero
<div className="text-center">
  <h1>Centered Title</h1>
</div>
```

**Different Grid:**

```tsx
// 3 columns on desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

---

## 🚀 Deployment

### Quick Deploy to Vercel

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import repository
4. Deploy (automatic configuration)

### Quick Deploy to Netlify

1. Push code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. New site from Git
4. Deploy

### Custom Domain

**Vercel:**
1. Go to Settings → Domains
2. Add your domain
3. Update DNS records

**Recommended domains:**
- yourname.com
- yourname.design
- yourname.dev

---

## ✅ Pre-Launch Checklist

### Content
- [ ] Personal info updated everywhere
- [ ] All case studies have real content
- [ ] Images are high-quality and optimized
- [ ] Contact form is functional
- [ ] Links open in correct windows
- [ ] No placeholder text remains

### Design
- [ ] Brand colors applied consistently
- [ ] Typography is readable on all devices
- [ ] Spacing feels balanced
- [ ] Animations are smooth, not jarring
- [ ] Dark mode works (if enabled)

### Technical
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Tested on mobile devices
- [ ] No console errors
- [ ] All images load correctly
- [ ] Forms validate properly
- [ ] Navigation works on all pages

### SEO & Accessibility
- [ ] Page titles updated
- [ ] Meta descriptions added
- [ ] Alt text on all images
- [ ] Keyboard navigation works
- [ ] Color contrast passes WCAG AA
- [ ] Focus indicators visible

### Performance
- [ ] Lighthouse score > 90
- [ ] Images are compressed
- [ ] Fonts load quickly
- [ ] Page loads < 3 seconds

---

## 💡 Content Best Practices

### Writing Case Studies

**Do:**
- Focus on your process and thinking
- Use specific metrics and data
- Show the problem before the solution
- Include challenges and learnings
- Credit your team members

**Don't:**
- Just show pretty mockups
- Claim sole ownership of team work
- Skip the research phase
- Ignore negative results
- Use generic stock descriptions

### Choosing Projects

**Include projects that show:**
1. **Problem-solving**: Complex challenges you solved
2. **Impact**: Measurable business or user outcomes
3. **Process**: Your design methodology
4. **Range**: Different types of work (mobile, web, research)
5. **Collaboration**: Working with teams

**Avoid:**
- Personal projects only (unless early career)
- Redesigns without user research
- Projects with no measurable impact
- Only visual design exercises

### Writing About Yourself

**Be authentic:**
- Use natural language, not corporate speak
- Share what makes you unique
- Mention relevant hobbies/interests
- Be confident but not arrogant

**Avoid:**
- Buzzword bingo ("synergize", "rockstar")
- Being too formal or stiff
- Listing every skill you've ever touched
- Making unverifiable claims

---

## 🔄 Keeping It Fresh

### Monthly Updates
- Add new case studies
- Update metrics on existing work
- Refresh images if needed
- Check for broken links

### Quarterly Reviews
- Update bio and experience
- Review and adjust content
- Analyze visitor metrics
- Update skills and tools

### Yearly Refresh
- Consider design updates
- Review entire site structure
- Update all screenshots
- Refresh color palette (if needed)

---

## 📚 Resources

### Portfolio Inspiration
- [Bestfolios](https://www.bestfolios.com/portfolio-by-type/ux)
- [Cofolios](https://www.cofolios.com/)
- [Awwwards](https://www.awwwards.com/websites/portfolio/)

### Writing Help
- [UX Portfolio Formula](https://www.uxportfolioformula.com/)
- [Case Study Club](https://www.casestudy.club/)

### Design Tools
- [Coolors](https://coolors.co/) - Color palettes
- [Google Fonts](https://fonts.google.com/) - Typography
- [Unsplash](https://unsplash.com/) - Stock photos

---

**Need help?** Review the other documentation files:
- `README.md` - Technical setup
- `COMPONENTS.md` - Component API
- `STRUCTURE.md` - Architecture details

Good luck with your portfolio! 🎉
