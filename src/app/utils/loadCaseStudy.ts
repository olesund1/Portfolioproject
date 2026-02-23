import type { CaseStudyData } from '@/data/caseStudyTypes';

/**
 * Statically import all case study JSON files.
 * To add a new case study, import the JSON and add it to the map.
 */
import ecommerceCheckout from '@/data/caseStudies/ecommerce-checkout.json';

const caseStudyMap: Record<string, CaseStudyData> = {
  'ecommerce-checkout': ecommerceCheckout as CaseStudyData,
};

export function loadCaseStudy(id: string): CaseStudyData | null {
  return caseStudyMap[id] ?? null;
}

export function getAllCaseStudyIds(): string[] {
  return Object.keys(caseStudyMap);
}
