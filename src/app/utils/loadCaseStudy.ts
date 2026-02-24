/**
 * Re-export from centralized case study registry
 * The case study data is now managed in src/data/caseStudies/index.ts
 */

export { loadCaseStudy, getAllCaseStudyIds } from '@/data/caseStudies';
export type { CaseStudyData } from '@/data/caseStudyTypes';
