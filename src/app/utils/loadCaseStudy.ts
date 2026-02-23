import type { CaseStudyData } from '@/data/caseStudyTypes';

/**
 * Statically import all case study JSON files.
 * To add a new case study: 1) create a JSON file, 2) import it here, 3) add to the map.
 */
import b2pRedesign from '@/data/caseStudies/b2p-redesign.json';
import healthcarePlatform from '@/data/caseStudies/healthcare-platform.json';
import ecommerceCheckout from '@/data/caseStudies/ecommerce-checkout.json';
import customerCentricity from '@/data/caseStudies/customer-centricity.json';
import customerEnergyTransformation from '@/data/caseStudies/customer-energy-transformation.json';

const caseStudyMap: Record<string, CaseStudyData> = {
  'b2p-redesign': b2pRedesign as CaseStudyData,
  'healthcare-platform': healthcarePlatform as CaseStudyData,
  'ecommerce-checkout': ecommerceCheckout as CaseStudyData,
  'customer-centricity': customerCentricity as CaseStudyData,
  'customer-energy-transformation': customerEnergyTransformation as CaseStudyData,
};

export function loadCaseStudy(id: string): CaseStudyData | null {
  return caseStudyMap[id] ?? null;
}

export function getAllCaseStudyIds(): string[] {
  return Object.keys(caseStudyMap);
}
