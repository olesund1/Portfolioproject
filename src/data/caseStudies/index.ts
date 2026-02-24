/**
 * Central registry for case study data and metadata
 * This is the single import point for all case study information
 * Exports both metadata (for HomePage, portfolioKnowledge) and JSON data (for CaseStudyPage)
 */

import type { CaseStudyData } from '@/data/caseStudyTypes';

// Import and re-export metadata
export { caseStudyMetadata, getCaseStudyById, getAllCaseStudies, getAllCaseStudyIds } from './metadata';
export type { CaseStudyMetadata } from './metadata';

// Import case study JSON files
import b2pRedesign from './b2p-redesign.json';
import healthcarePlatform from './healthcare-platform.json';
import ecommerceCheckout from './ecommerce-checkout.json';
import customerCentricity from './customer-centricity.json';
import customerEnergyTransformation from './customer-energy-transformation.json';

/**
 * Map of case study IDs to their full data
 */
const caseStudyMap: Record<string, CaseStudyData> = {
  'b2p-redesign': b2pRedesign as CaseStudyData,
  'healthcare-platform': healthcarePlatform as CaseStudyData,
  'ecommerce-checkout': ecommerceCheckout as CaseStudyData,
  'customer-centricity': customerCentricity as CaseStudyData,
  'customer-energy-transformation': customerEnergyTransformation as CaseStudyData,
};

/**
 * Load a specific case study's full data by ID
 */
export function loadCaseStudy(id: string): CaseStudyData | null {
  return caseStudyMap[id] ?? null;
}
