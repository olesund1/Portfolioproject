import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { getAllCaseStudies } from '@/data/caseStudies';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { CaseStudyCard } from '../components/CaseStudyCard';

interface HomePageProps {
  onNavigate: (page: string, caseStudyId?: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const caseStudies = getAllCaseStudies();

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero Section */}
      <Section className="min-h-[85vh] flex items-center">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="mb-6">
              Hi, I'm Johan — I design experiences that make sense for the people using them.
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Service & UX designer based in Stockholm. I work at the intersection of research, strategy, and the messy reality of how organisations actually function — and I'm at my best in the ambiguous, where user needs meet complex systems.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                size="large"
                showArrow
                onClick={() => {
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Selected Work
              </Button>
              <Button
                variant="secondary"
                size="large"
                onClick={() => onNavigate('about')}
              >
                About Me
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
          >
            <ArrowDown size={24} className="text-muted-foreground animate-bounce" />
          </motion.div>
        </Container>
      </Section>

      {/* Selected Case Studies */}
      <Section id="work" className="bg-background">
        <Container>
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Case Studies
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {caseStudies.map((study, index) => (
              <CaseStudyCard
                key={study.id}
                {...study}
                index={index}
                onClick={() => onNavigate('case-study', study.id)}
              />
            ))}
            {caseStudies.length % 2 !== 0 && (
              <div className="border-2 border-dashed border-border rounded-2xl flex items-center justify-center min-h-[400px] bg-card/50">
                <p className="text-muted-foreground text-center">Coming Soon</p>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="mb-6">Let's work together.</h2>
            <Button
              variant="primary"
              size="large"
              showArrow
              onClick={() => onNavigate('contact')}
            >
              Get in Touch
            </Button>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}
