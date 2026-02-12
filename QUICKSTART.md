# Quick Start Guide

Get your UX Designer portfolio up and running in 15 minutes.

## 🚀 5-Minute Setup

### 1. Clone or Download
```bash
# If you have the code, navigate to the directory
cd ux-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Your site should now be running at `http://localhost:5173`

---

## ✏️ 10-Minute Customization

### Must-Change Items

#### 1. Your Name (2 minutes)

**File: `/src/app/components/Navigation.tsx`**
```tsx
// Line 34
<button>John Doe</button>  // ← Change this
```

**File: `/src/app/components/Footer.tsx`**
```tsx
// Line 53
<p>© {currentYear} John Doe</p>  // ← Change this
```

#### 2. Contact Email (1 minute)

**File: `/src/app/components/Footer.tsx`**
```tsx
// Line 24
<a href="mailto:hello@johndoe.com">  // ← Change email
```

**File: `/src/app/pages/ContactPage.tsx`**
```tsx
// Line 45
<a href="mailto:hello@johndoe.com">  // ← Change email
```

#### 3. Hero Text (3 minutes)

**File: `/src/app/pages/HomePage.tsx`**
```tsx
// Lines 55-66

// Your job title
<p className="text-accent font-medium mb-6">
  UX Designer & Product Strategist  // ← Change this
</p>

// Your headline
<h1 className="mb-6">
  Crafting digital experiences that solve real problems  // ← Change this
</h1>

// Your description
<p className="text-xl md:text-2xl text-muted-foreground mb-8">
  I partner with teams to design meaningful products...  // ← Change this
</p>
```

#### 4. About Bio (4 minutes)

**File: `/src/app/pages/AboutPage.tsx`**
```tsx
// Lines 73-93 - Replace all three paragraphs with your bio
```

**Save all files and refresh your browser!**

---

## 🎨 Optional: Change Accent Color

**File: `/src/styles/theme.css`**
```css
/* Line 7 */
--accent: #5a6f5b;  /* Mossy green - change to your brand color */
```

**Popular alternatives:**
- Blue: `#4A90E2`
- Purple: `#8B5CF6`
- Teal: `#14B8A6`
- Coral: `#F97316`

---

## 📂 Add Your First Case Study

### Step 1: Add to Homepage (2 minutes)

**File: `/src/app/pages/HomePage.tsx`**
```tsx
// Lines 12-37 - Add your project:
{
  id: 'my-awesome-project',  // Unique ID (lowercase, dashes)
  title: 'My Awesome Project',
  description: 'A brief description of what this project achieved.',
  tags: ['Web App', 'User Research', 'Figma'],
  imageUrl: 'https://images.unsplash.com/photo-YOUR-IMAGE',
  year: '2025',
},
```

### Step 2: Add Full Case Study (5 minutes)

**File: `/src/app/pages/CaseStudyPage.tsx`**
```tsx
// Lines 16-120 - Add after existing case studies:

'my-awesome-project': {
  title: 'My Awesome Project',
  subtitle: 'One-line summary of the project',
  tags: ['Web App', 'User Research'],
  heroImage: 'https://images.unsplash.com/...',
  
  overview: {
    role: 'Lead UX Designer',
    timeline: '3 months',
    team: '1 PM, 2 Engineers, 1 Designer',
    year: '2025',
  },
  
  problem: 'Brief description of the problem...',
  challenge: 'How might we solve this?',
  
  outcome: {
    metrics: [
      { label: 'User satisfaction', value: '4.8/5.0' },
      { label: 'Task completion', value: '35% faster' },
    ],
  },
  
  process: [
    {
      title: 'Research',
      description: 'What we did in research phase...',
      insights: [
        'Key finding 1',
        'Key finding 2',
      ],
    },
  ],
  
  solution: 'Description of final solution...',
  solutionImages: [
    'https://images.unsplash.com/image1',
    'https://images.unsplash.com/image2',
  ],
  reflection: 'What I learned...',
},
```

---

## 🖼️ Find Images

### Free High-Quality Images

1. Go to [Unsplash](https://unsplash.com/)
2. Search for: "ux design", "mobile app", "dashboard"
3. Click an image you like
4. Copy the URL from the browser
5. Add `?w=1200&q=80` to the end

**Example:**
```
https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80
```

---

## 🚢 Deploy Your Portfolio

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

**Done!** You'll get a URL like `yourname.vercel.app`

### Option 2: Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repo
5. Click "Deploy"

**Done!** You'll get a URL like `yourname.netlify.app`

---

## 📱 Test Your Portfolio

### Before Launching

- [ ] Open on your phone (scan QR code from dev server)
- [ ] Click all navigation links
- [ ] Click on case study cards
- [ ] Fill out contact form
- [ ] Check on Chrome, Firefox, and Safari
- [ ] Make sure all images load

### Issues?

**Navigation not working?**
- Make sure page names match in Navigation.tsx and App.tsx

**Images not loading?**
- Check that Unsplash URLs include `?w=1200&q=80`
- Verify there are no typos in image URLs

**Styles look weird?**
- Clear browser cache (Cmd/Ctrl + Shift + R)
- Check that theme.css was updated correctly

---

## 📚 Next Steps

### Content (Priority)
1. ✏️ Write 2-3 complete case studies
2. 📸 Gather high-quality project images
3. 📝 Complete your About page
4. 🎯 Update skills and tools

### Design (Optional)
1. 🎨 Customize colors to match your brand
2. ✨ Adjust animations to your taste
3. 📏 Tweak spacing and layout
4. 🔤 Change fonts if desired

### Technical (When Ready)
1. 🌐 Add custom domain
2. 📧 Connect contact form to email
3. 📊 Add Google Analytics
4. 🔍 Add meta tags for SEO

---

## 🆘 Need Help?

### Documentation Files

- **README.md** - Full project overview and tech stack
- **COMPONENTS.md** - Component API reference
- **STRUCTURE.md** - Architecture and file organization
- **CUSTOMIZATION.md** - Detailed customization guide (you're here!)

### Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install a new package
npm install package-name
```

### Useful Links

- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Motion Docs](https://motion.dev/docs/react-quick-start)
- [Unsplash](https://unsplash.com/) - Free images

---

## ⏱️ Estimated Timeline

| Task | Time | When |
|------|------|------|
| Basic setup | 5 min | Now |
| Name & contact | 3 min | Now |
| Hero text | 3 min | Now |
| About bio | 10 min | Now |
| Write case studies | 2-4 hours | This week |
| Gather images | 1 hour | This week |
| Design tweaks | 1-2 hours | This week |
| Testing | 30 min | Before launch |
| Deploy | 15 min | When ready |

**Total: ~1 day of focused work**

---

## ✅ Launch Checklist

Right before you share your portfolio:

- [ ] All "Your Name" placeholder text replaced
- [ ] All email links point to your email
- [ ] At least 2 complete case studies added
- [ ] About page has your real bio
- [ ] All images load properly
- [ ] Contact form works (or shows correct email)
- [ ] Tested on mobile device
- [ ] No console errors
- [ ] Shared with 2-3 friends for feedback

---

## 🎉 You're Ready!

Once you've completed the checklist above, your portfolio is ready to share:

- Add to LinkedIn
- Include in job applications
- Share on Twitter/X
- Add to email signature
- Include on business cards

**Good luck!** 🚀

---

**Pro Tip:** Set a reminder to update your portfolio every 3 months with new projects and refreshed content.
