/**
 * Central registry for case study data and metadata
 * This is the single import point for all case study information
 * Exports both metadata (for HomePage, portfolioKnowledge) and JSON data (for CaseStudyPage)
 */

import type { CaseStudyData } from '@/data/caseStudyTypes';

// Import metadata — getAllCaseStudies is aliased so we can wrap it below
import {
  caseStudyMetadata,
  getCaseStudyById,
  getAllCaseStudies as getMetadataStudies,
  getAllCaseStudyIds,
} from './metadata';
export type { CaseStudyMetadata } from './metadata';
export { caseStudyMetadata, getCaseStudyById, getAllCaseStudyIds };

/**
 * Returns all case studies with imageUrl derived from each JSON's heroImage.
 * The JSON heroImage is the single source of truth — metadata.imageUrl is only
 * used as a fallback if a JSON entry is missing.
 */
export function getAllCaseStudies(): ReturnType<typeof getMetadataStudies> {
  return getMetadataStudies().map((meta) => ({
    ...meta,
    imageUrl: caseStudyMap[meta.id]?.heroImage ?? meta.imageUrl,
  }));
}

// Import case study JSON files
import b2pRedesign from './b2p-redesign.json';
import healthcarePlatform from './healthcare-platform.json';
import ecommerceCheckout from './ecommerce-checkout.json';
import customerCentricity from './customer-centricity.json';
import customerEnergyTransformation from './customer-energy-transformation.json';
import nordicChoiceHotels from './nordic-choice-hotels.json';

/**
 * Map of case study IDs to their full data
 */
const caseStudyMap: Record<string, CaseStudyData> = {
  'b2p-redesign': b2pRedesign as CaseStudyData,
  'healthcare-platform': healthcarePlatform as CaseStudyData,
  'ecommerce-checkout': ecommerceCheckout as CaseStudyData,
  'customer-centricity': customerCentricity as CaseStudyData,
  'customer-energy-transformation': customerEnergyTransformation as CaseStudyData,
  'nordic-choice-hotels': nordicChoiceHotels as CaseStudyData,
};

/**
 * Load a specific case study's full data by ID
 */
export function loadCaseStudy(id: string): CaseStudyData | null {
  return caseStudyMap[id] ?? null;
}
