/**
 * Case Study data structure matching the Figma template layout.
 * Each case study JSON file should conform to this interface.
 */

export interface CaseStudyData {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  heroImage: string;
  challenge: string;
  designProcess: {
    intro: string;
    steps: {
      title: string;
      description: string;
    }[];
    insights: string[];
  };
  deliverables: {
    intro: string;
    images: string[];
  };
  results: {
    intro: string;
    kpis: {
      label: string;
      value: string;
    }[];
  };
}
