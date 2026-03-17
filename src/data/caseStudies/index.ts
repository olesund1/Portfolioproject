/**
 * Central registry for case study data and metadata
 * This is the single import point for all case study information
 * Exports both metadata (for HomePage, portfolioKnowledge) and JSON data (for CaseStudyPage)
 */

import type { CaseStudyData } from '@/data/caseStudyTypes';
import { getCMSStore } from '@/app/utils/cmsStorage';

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
 * Checks localStorage CMS store first; falls back to static JSON.
 */
export function getAllCaseStudies(): ReturnType<typeof getMetadataStudies> {
  const store = getCMSStore();
  if (store) {
    return store.order
      .filter((id) => store.metadata[id])
      .map((id) => ({
        ...store.metadata[id],
        imageUrl: store.data[id]?.heroImage ?? store.metadata[id].imageUrl,
      }));
  }
  return getMetadataStudies().map((meta) => ({
    ...meta,
    imageUrl: caseStudyMap[meta.id]?.heroImage ?? meta.imageUrl,
  }));
}

// Import case study JSON files
import b2pRedesign from './b2p-redesign.json';
import customerCentricity from './customer-centricity.json';
import nordicChoiceHotels from './nordic-choice-hotels.json';

/**
 * Map of case study IDs to their full data
 */
const caseStudyMap: Record<string, CaseStudyData> = {
  'b2p-redesign': b2pRedesign as CaseStudyData,
  'customer-centricity': customerCentricity as CaseStudyData,
  'nordic-choice-hotels': nordicChoiceHotels as CaseStudyData,
};

/**
 * Load a specific case study's full data by ID.
 * Checks localStorage CMS store first; falls back to static JSON.
 */
export function loadCaseStudy(id: string): CaseStudyData | null {
  const store = getCMSStore();
  if (store?.data[id]) return store.data[id];
  return caseStudyMap[id] ?? null;
}
