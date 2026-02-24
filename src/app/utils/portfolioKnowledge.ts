import { caseStudyMetadata } from '@/data/caseStudies/metadata';

/**
 * Portfolio knowledge base for the chatbot
 * Case study entries are auto-generated from centralized metadata to prevent sync issues
 */

// Static knowledge entries (non-case-study pages)
const staticKnowledge = {
  home: {
    keywords: [
      'work',
      'projects',
      'case studies',
      'portfolio',
      'b2p',
      'healthcare',
      'ecommerce',
      'checkout',
      'fintech',
      'showcase',
      'see my work',
      'view projects',
    ],
    title: 'My Work',
    description: 'Explore my latest projects and case studies',
  },
  about: {
    keywords: [
      'about',
      'experience',
      'skills',
      'tools',
      'process',
      'methods',
      'background',
      'who are you',
      'tell me about',
      'biography',
      'career',
      'education',
    ],
    title: 'About Me',
    description: 'Learn about my experience, skills, and design process',
  },
  contact: {
    keywords: [
      'contact',
      'email',
      'reach',
      'work together',
      'get in touch',
      'hire',
      'collaborate',
      'message',
      'connect',
      'inquiry',
    ],
    title: 'Get in Touch',
    description: 'Send me a message or get in touch',
  },
};

/**
 * Auto-generate case study knowledge entries from metadata
 * This ensures the chatbot keywords stay synchronized with actual case study data
 */
const caseStudyKnowledge = caseStudyMetadata.reduce(
  (acc, caseStudy) => ({
    ...acc,
    [`case-study-${caseStudy.id}`]: {
      keywords: caseStudy.keywords,
      title: caseStudy.title,
      description: caseStudy.shortDescription,
      caseStudyId: caseStudy.id,
    },
  }),
  {} as Record<string, any>
);

export const portfolioKnowledge = {
  ...staticKnowledge,
  ...caseStudyKnowledge,
};
