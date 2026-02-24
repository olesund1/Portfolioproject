/**
 * Central registry of case study metadata
 * This is the single source of truth for case study information
 * Used by HomePage, portfolioKnowledge, and other components
 */

export interface CaseStudyMetadata {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  year: string;
  keywords: string[];
  shortDescription: string;
}

export const caseStudyMetadata: CaseStudyMetadata[] = [
  {
    id: 'b2p-redesign',
    title: 'Partner Platform (B2P) Redesign',
    description:
      "Modernized the partner platform for Sweden's largest electricity distributor, reducing manual work by 60% and improving partner satisfaction.",
    tags: ['Enterprise', 'B2B', 'UX Strategy'],
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    year: '2026',
    keywords: ['b2p', 'b2p redesign', 'b2p project', 'procurement', 'business to professional', 'enterprise', 'platform'],
    shortDescription: 'B2P procurement platform redesign case study',
  },
  {
    id: 'healthcare-platform',
    title: 'Healthcare Patient Portal',
    description:
      'Creating an accessible patient portal that simplified appointment booking and reduced no-shows by 30%.',
    tags: ['Web App', 'Healthcare', 'Accessibility'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    year: '2024',
    keywords: ['healthcare', 'health platform', 'patient', 'medical', 'clinic', 'appointment', 'health', 'web app'],
    shortDescription: 'Healthcare platform design case study',
  },
  {
    id: 'ecommerce-checkout',
    title: 'E-commerce Checkout Optimization',
    description:
      'Streamlining the checkout flow resulted in a 25% increase in conversion rate and improved customer satisfaction.',
    tags: ['E-commerce', 'Conversion', 'A/B Testing'],
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    year: '2024',
    keywords: ['ecommerce', 'e-commerce', 'shopping', 'checkout', 'cart', 'online store', 'conversion', 'optimization'],
    shortDescription: 'E-Commerce checkout flow optimization case study',
  },
  {
    id: 'customer-centricity',
    title: 'Enabling Customer-Centricity',
    description:
      'Transformed a legacy electricity distributor by creating unified customer journeys, scaling CX team, and embedding customer-first thinking across operations. Achieved 52% improvement in customer satisfaction metrics.',
    tags: ['Strategy', 'CX Leadership', 'Organizational Change'],
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    year: '2024',
    keywords: [
      'customer-centricity',
      'customer experience',
      'cx',
      'journey mapping',
      'organizational change',
      'customer journey',
      'strategy',
      'leadership',
      'team building',
      'electricity',
      'energy',
      'utility',
      'organizational transformation',
      'customer effort score',
      'ces',
      'design thinking',
      'team scaling',
      'stakeholder alignment',
      'customer research',
      'operations',
      'digital transformation',
      'solar',
      'satisfaction improvement',
    ],
    shortDescription: 'Led organizational transformation at Sweden\'s largest electricity distributor to embed customer-first thinking across operations. Created unified customer journey framework and scaled CX team, achieving 52% customer satisfaction improvement.',
  },
  {
    id: 'customer-energy-transformation',
    title: 'Customer-Centric Energy Company Transformation',
    description:
      'Transformed a legacy utility company into a customer-focused organization, improving Customer Effort Score by 52% and scaling organizational capability.',
    tags: ['Strategy', 'CX Leadership', 'Customer Journey'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-adf4e565db4d?w=800&q=80',
    year: '2024',
    keywords: [
      'energy',
      'electricity',
      'utility',
      'customer-centric',
      'customer effort score',
      'ces',
      'organizational transformation',
      'customer journey',
      'energy company',
      'solar',
      'renewable',
    ],
    shortDescription: 'Transforming a utility company into a customer-focused organization with measurable impact',
  },
];

/**
 * Get a specific case study by ID
 */
export function getCaseStudyById(id: string): CaseStudyMetadata | undefined {
  return caseStudyMetadata.find((cs) => cs.id === id);
}

/**
 * Get all case studies
 */
export function getAllCaseStudies(): CaseStudyMetadata[] {
  return caseStudyMetadata;
}

/**
 * Get all case study IDs
 */
export function getAllCaseStudyIds(): string[] {
  return caseStudyMetadata.map((cs) => cs.id);
}
