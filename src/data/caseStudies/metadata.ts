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
    tags: ['Enterprise', 'B2P', 'UX Strategy'],
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    year: '2025',
    keywords: ['b2p', 'b2p redesign', 'b2p project', 'procurement', 'business to professional', 'enterprise', 'platform'],
    shortDescription: 'B2P procurement platform redesign case study',
  },
  {
    id: 'customer-centricity',
    title: 'Enabling Customer-Centricity',
    description:
      'Transformed a legacy electricity distributor by creating unified customer journeys, scaling CX team, and embedding customer-first thinking across operations. Achieved 52% improvement in customer satisfaction metrics.',
    tags: ['Strategy', 'CX Leadership', 'Organizational Change'],
    imageUrl: '/images/vattenfall/customer-life-cycle-v2.png',
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
    id: 'nordic-choice-hotels',
    title: 'Revitalising Hotel Customer End-To-End Experience in the Post-pandemic Landscape',
    description:
      'Mapping the baseline customer journey for a leading Nordic hospitality group to align the organization and drive customer-centric development.',
    tags: ['Service Design', 'Customer Journey Mapping', 'UX Research'],
    imageUrl: '/images/nordic-choice/header-image.jpeg',
    year: '2023',
    keywords: [
      'service design',
      'customer journey',
      'hospitality',
      'nordic choice',
      'ux research',
      'stakeholder facilitation',
      'post-pandemic',
      'hotel',
      'hotels',
      'journey mapping',
      'service safari',
    ],
    shortDescription: 'End-to-end customer journey mapping for a 200+ hotel Nordic hospitality group.',
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
