# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern UX Designer portfolio website built with React, TypeScript, Tailwind CSS v4, and Motion (Framer Motion). The project uses Vite as the build tool and is deployed as a client-side application from Figma Make. It features a chatbot assistant named "Juan Bot" that provides conversational navigation.

## Development Commands

### Build and Serve
- `npm run dev` - Start Vite development server (hot module replacement enabled)
- `npm run build` - Build for production (outputs to `dist/`)

### Project Structure
```
src/
├── main.tsx                    # App entry point, renders App component
├── styles/                     # Global styling
│   ├── index.css              # Main stylesheet entry point
│   ├── tailwind.css           # Tailwind directives (@layer, @apply, etc)
│   ├── fonts.css              # Font imports and face definitions
│   └── theme.css              # Design tokens, CSS custom properties, and Tailwind theme extensions
├── app/
│   ├── App.tsx                # Root component with routing logic and chatbot state
│   ├── components/
│   │   ├── Navigation.tsx      # Header/top navigation bar
│   │   ├── Footer.tsx          # Page footer
│   │   ├── FloatingChatWidget.tsx # Chat widget UI component
│   │   ├── Container.tsx       # Max-width wrapper for page content
│   │   ├── Section.tsx         # Vertical spacing component
│   │   ├── Button.tsx          # Custom button component
│   │   ├── Tag.tsx             # Tag/badge component
│   │   ├── CaseStudyCard.tsx   # Project card component for portfolio items
│   │   ├── ChatMessage.tsx     # Individual chat message component
│   │   ├── PageSuggestionCard.tsx # Suggested page links in chat
│   │   ├── ui/                 # Radix UI component library (50+ components)
│   │   └── figma/ImageWithFallback.tsx # Image component with fallback handling
│   ├── pages/
│   │   ├── HomePage.tsx        # Landing page with featured projects and process steps
│   │   ├── AboutPage.tsx       # Bio/About page with background section using boids animation
│   │   ├── CaseStudyPage.tsx   # Detail page for individual case studies
│   │   ├── ContactPage.tsx     # Contact form page
│   │   └── ConversePage.tsx    # Chat conversation page
│   └── utils/
│       ├── mockAI.ts           # Chatbot response generation logic
│       └── portfolioKnowledge.ts # Knowledge base for chatbot answers
```

## Key Architecture Patterns

### Page Navigation
The app uses client-side routing without React Router - navigation state is managed in `App.tsx` via an `appState` object with `currentPage` and optional `caseStudyId`. The `handleNavigate` function updates this state and scrolls to the top. All pages are rendered conditionally based on `appState.currentPage`.

### Chatbot System
- **FloatingChatWidget**: Toggleable floating chat widget in the bottom-right
- **ConversationPage**: Full-page chat interface
- **AI Logic**: `generateAIResponse()` in `mockAI.ts` generates contextual responses based on conversation history and portfolio knowledge
- **Page Suggestions**: The chatbot can suggest relevant portfolio pages via `PageSuggestionCard` components
- State tracked in App.tsx: `chatbotMessages`, `conversationHistory`, `showFloatingChat`, `isChatbotInitialized`
- Chatbot name: "Juan Bot" (changeable in initialization message in App.tsx)

### Styling System
- **Tailwind CSS v4** with custom theme extensions
- Design tokens (colors, spacing, typography) defined as CSS custom properties in `theme.css`
- Radix UI for accessible, unstyled component primitives
- Motion (Framer Motion) for animations and transitions
- No CSS modules - all styling via Tailwind utility classes

### Component Library
- `src/app/components/ui/` contains 50+ pre-built Radix UI components
- Custom wrapper components (Button, Tag, CaseStudyCard) layer Tailwind styling on top of primitives
- Use Radix UI components directly for complex interactive elements

## Build Configuration

**Vite Config** (`vite.config.ts`):
- React plugin for JSX/TSX support
- Tailwind CSS Vite plugin (required even if not actively used)
- Path alias `@` → `./src` for cleaner imports
- Raw asset imports enabled for `.svg` and `.csv` files

**Dependencies**:
- React 18.3.1 (peer dependency)
- TypeScript support
- Radix UI primitives (@radix-ui/*)
- Motion for animations
- Lucide React for icons
- React Hook Form for form handling
- Sonner for toast notifications
- Embla Carousel for carousel functionality

## Important Notes

### Chatbot Knowledge Base
The chatbot's responses are generated from `src/app/utils/portfolioKnowledge.ts`. This file contains the portfolio's information that the chatbot uses to answer questions. Update this file when adding new case studies or changing portfolio content.

### Case Study Data
Case study metadata (title, description, tags, image URL, year) is currently hardcoded in `HomePage.tsx`. When extending the app, consider extracting this to a data file for easier management.

### Animations and Motion
Framer Motion is imported as `motion` from 'motion/react'. Use this for page transitions and interactive animations. The About page features a boids pattern animation for the hero section.

### TypeScript
The project uses TypeScript throughout. All React components are typed with proper prop interfaces. State management uses TypeScript interfaces for type safety.

### Deployment
Built with Figma Make integration in mind. Output goes to `dist/` directory. The app is a single-page application with no server-side rendering.
