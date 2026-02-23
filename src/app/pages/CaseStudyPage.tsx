import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { CaseStudyTemplate } from '../components/CaseStudyTemplate';
import { loadCaseStudy } from '../utils/loadCaseStudy';

interface CaseStudyPageProps {
  caseStudyId: string;
  onNavigate: (page: string) => void;
}

export function CaseStudyPage({ caseStudyId, onNavigate }: CaseStudyPageProps) {
  const data = loadCaseStudy(caseStudyId);

  if (data) {
    return <CaseStudyTemplate data={data} onNavigate={onNavigate} />;
  }

  // Fallback for unknown case study IDs
  return (
    <div className="pt-16 md:pt-20">
      <div className="border-b border-border">
        <Container>
          <div className="py-6">
            <Button variant="ghost" onClick={() => onNavigate('home')}>
              <ArrowLeft size={18} />
              Back to Work
            </Button>
          </div>
        </Container>
      </div>
      <Container>
        <div className="py-24 text-center">
          <h2 className="mb-4">Case study not found</h2>
          <p className="text-lg text-muted-foreground mb-8">
            The case study "{caseStudyId}" doesn't exist yet.
          </p>
          <Button variant="primary" onClick={() => onNavigate('home')}>
            View All Projects
          </Button>
        </div>
      </Container>
    </div>
  );
}
