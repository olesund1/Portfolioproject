import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Target, Users, Lightbulb } from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { CaseStudyCard } from '../components/CaseStudyCard';

interface HomePageProps {
  onNavigate: (page: string, caseStudyId?: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const caseStudies = [
    {
      id: 'b2p-redesign',
      title: 'Partner Platform (B2P) Redesign',
      description: 'Modernized the partner platform for Sweden\'s largest electricity distributor, reducing manual work by 60% and improving partner satisfaction.',
      tags: ['Enterprise', 'B2B', 'UX Strategy'],
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
      year: '2026',
    },
    {
      id: 'healthcare-platform',
      title: 'Healthcare Patient Portal',
      description: 'Creating an accessible patient portal that simplified appointment booking and reduced no-shows by 30%.',
      tags: ['Web App', 'Healthcare', 'Accessibility'],
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
      year: '2024',
    },
    {
      id: 'ecommerce-checkout',
      title: 'E-commerce Checkout Optimization',
      description: 'Streamlining the checkout flow resulted in a 25% increase in conversion rate and improved customer satisfaction.',
      tags: ['E-commerce', 'Conversion', 'A/B Testing'],
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
      year: '2024',
    },
    {
      id: 'customer-centricity',
      title: 'Enabling Customer-Centricity',
      description: 'Transformed a legacy electricity distributor by creating unified customer journeys, scaling CX team, and embedding customer-first thinking across operations. Achieved 52% improvement in customer satisfaction metrics.',
      tags: ['Strategy', 'CX Leadership', 'Organizational Change'],
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
      year: '2024',
    },
    {
      id: 'customer-energy-transformation',
      title: 'Customer-Centric Energy Company Transformation',
      description: 'Transformed a legacy utility company into a customer-focused organization, improving Customer Effort Score by 52% and scaling organizational capability.',
      tags: ['Strategy', 'CX Leadership', 'Customer Journey'],
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-adf4e565db4d?w=800&q=80',
      year: '2024',
    },
  ];

  const processSteps = [
    {
      icon: Target,
      title: 'Discover',
      description: 'Deep dive into user needs through research, interviews, and data analysis.',
    },
    {
      icon: Lightbulb,
      title: 'Define',
      description: 'Synthesize insights to identify core problems and opportunities.',
    },
    {
      icon: Users,
      title: 'Design & Test',
      description: 'Iterate rapidly with prototypes and validate with real users.',
    },
  ];

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
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-accent font-medium mb-6"
            >
              UX Designer & Product Strategist
            </motion.p>
            
            <h1 className="mb-6">
              Crafting experiences that solve real problems
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              I partner with teams to design meaningful products through research, 
              strategy, and user-centered thinking.
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

      {/* Process Section */}
      <Section className="bg-secondary/30">
        <Container>
          <div className="mb-16 max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              My Design Process
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Every project is unique, but I follow a flexible framework that keeps 
              users at the center while delivering measurable business results.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-8 bg-card rounded-2xl border border-border"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <step.icon size={28} className="text-accent" />
                </div>
                <h3 className="mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
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
            <h2 className="mb-6">Let's create something meaningful together</h2>
            <p className="text-xl text-muted-foreground mb-8">
              I'm currently available for select freelance projects and full-time opportunities.
            </p>
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
