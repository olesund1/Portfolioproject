import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Users, CheckCircle2 } from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { Tag } from '../components/Tag';

interface CaseStudyPageProps {
  caseStudyId: string;
  onNavigate: (page: string) => void;
}

export function CaseStudyPage({ caseStudyId, onNavigate }: CaseStudyPageProps) {
  // Mock data - in a real app, this would be fetched based on caseStudyId
  const caseStudyData = {
    'b2p-redesign': {
      title: 'Partner Platform (B2P) Redesign',
      subtitle: 'Modernizing an outdated system to reduce manual work and improve partner experience',
      tags: ['Enterprise', 'B2B', 'UX Strategy', 'Design System', 'User Research'],
      heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
      overview: {
        role: 'Lead UX Designer',
        timeline: '9-12 months',
        team: '1 PM, 2-3 Engineers, 1-2 Designers',
        year: '2026',
      },
      problem: 'The Partner Platform serving 900,000+ active customers across Sweden\'s largest electricity distributor was technically outdated and required extensive manual work from our B2B partners. High operational costs, poor UX, and low partner satisfaction were affecting business scalability and relationships.',
      challenge: 'How might we redesign the Partner Platform to dramatically reduce manual work, lower operational costs, and create an intuitive experience that supports partner growth?',
      outcome: {
        metrics: [
          { label: 'Manual work reduction', value: '60% decrease' },
          { label: 'Platform efficiency', value: '3.5x improvement' },
          { label: 'Partner satisfaction', value: '4.5/5.0' },
          { label: 'Partner adoption', value: '85% increase' },
        ],
      },
      process: [
        {
          title: 'Research & Discovery',
          description: 'I led user mapping sessions, conducted stakeholder interviews across product, operations, and support teams, and facilitated workshops to understand partner pain points. We analyzed current workflows and identified bottlenecks through contextual inquiry.',
          insights: [
            'Partners spent 3+ hours daily on manual data entry tasks',
            'System lacked real-time visibility into orders and status updates',
            'Critical workflows were buried in unintuitive navigation',
            'Technical barriers prevented partners from scaling their operations',
          ],
        },
        {
          title: 'Strategy & Planning',
          description: 'We conducted comprehensive impact mapping to understand business goals and user needs. I prioritized features based on strategic importance and developed a phased release plan that balanced quick wins with long-term platform improvements.',
          insights: [
            'Automation could eliminate 80% of manual data entry',
            'Self-service capabilities needed careful information architecture',
            'Real-time dashboards would drive decision-making efficiency',
            'Seamless API integration was critical for partner ecosystem',
          ],
        },
        {
          title: 'Design & Testing',
          description: 'I created interaction prototypes and conducted iterative testing with real partners. Close collaboration with developers ensured feasibility of designs while maintaining design integrity. Multiple rounds of user testing refined the experience.',
          insights: [
            'Partners preferred dashboard-first approach over traditional navigation',
            'Automation options needed clear feedback and control mechanisms',
            'Guided workflows reduced decision paralysis by 70%',
            'Early developer collaboration prevented costly redesigns',
          ],
        },
      ],
      solution: 'The redesigned Partner Platform featured an intuitive dashboard providing real-time insights, automated workflows eliminating manual tasks, streamlined information architecture, and seamless API integration. The new design system ensured consistency and scalability across the platform.',
      solutionImages: [
        'https://images.unsplash.com/photo-1460925895917-adf4e565db4d?w=800&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      ],
      reflection: 'This project demonstrated the value of true full-ownership in the design process—from initial research through developer collaboration and testing. I learned how to balance competing stakeholder needs while keeping partners\' goals at the center. Early involvement of developers in design decisions prevented significant rework and created a stronger final product. The experience reinforced that sustainable design requires deep understanding of both user and business contexts.',
    },
    'healthcare-platform': {
      title: 'Healthcare Patient Portal',
      subtitle: 'Creating an accessible patient portal that simplified healthcare access',
      tags: ['Web App', 'Healthcare', 'Accessibility', 'WCAG 2.1'],
      heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
      overview: {
        role: 'UX Designer',
        timeline: '6 months',
        team: '1 PM, 3 Engineers, 2 Designers',
        year: '2024',
      },
      problem: 'Patients struggled to book appointments online, leading to high call volumes and missed appointments. The existing portal was not accessible to users with disabilities and had a dated interface.',
      challenge: 'How might we create an accessible, easy-to-use patient portal that reduces no-shows and call center volume?',
      outcome: {
        metrics: [
          { label: 'No-show rate', value: '30% reduction' },
          { label: 'Online bookings', value: '65% increase' },
          { label: 'WCAG compliance', value: 'AA certified' },
          { label: 'Call center volume', value: '40% decrease' },
        ],
      },
      process: [
        {
          title: 'Research & Discovery',
          description: 'We interviewed 30 patients, including users with various disabilities. We also shadowed front desk staff and analyzed appointment booking patterns.',
          insights: [
            'Complex booking flow confused users',
            'Poor contrast made text hard to read',
            'No keyboard navigation support',
            'Medical jargon created barriers',
          ],
        },
        {
          title: 'Ideation & Design',
          description: 'We created an accessible design system and simplified the booking flow to 3 steps. All designs were reviewed by accessibility experts.',
          insights: [
            'WCAG 2.1 AA compliant color palette',
            'Clear step-by-step booking process',
            'Plain language throughout',
            'Multiple input methods supported',
          ],
        },
        {
          title: 'Testing & Iteration',
          description: 'We conducted extensive accessibility testing with screen readers, keyboard navigation, and users with various disabilities.',
          insights: [
            '100% task completion with assistive tech',
            'Significantly faster booking times',
            'Positive feedback from diverse user groups',
            'Staff reported fewer confused calls',
          ],
        },
      ],
      solution: 'We created a fully accessible patient portal with simplified appointment booking, clear information hierarchy, and support for all assistive technologies.',
      solutionImages: [
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
      ],
      reflection: 'This project taught me the immense value of inclusive design. By designing for accessibility from the start, we created a better experience for everyone, not just users with disabilities.',
    },
    'ecommerce-checkout': {
      title: 'E-commerce Checkout Optimization',
      subtitle: 'Streamlining checkout to boost conversion and reduce cart abandonment',
      tags: ['E-commerce', 'Conversion', 'A/B Testing', 'Mobile'],
      heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
      overview: {
        role: 'UX Designer',
        timeline: '3 months',
        team: '1 PM, 2 Engineers, 1 Designer, 1 Data Analyst',
        year: '2024',
      },
      problem: 'The e-commerce site had a 68% cart abandonment rate, significantly above industry average. Analytics showed users were dropping off at various points in the checkout process.',
      challenge: 'How might we reduce friction in the checkout process to increase conversion rate?',
      outcome: {
        metrics: [
          { label: 'Conversion rate', value: '25% increase' },
          { label: 'Cart abandonment', value: '68% → 52%' },
          { label: 'Average order value', value: '12% higher' },
          { label: 'Customer satisfaction', value: '4.7/5.0' },
        ],
      },
      process: [
        {
          title: 'Research & Discovery',
          description: 'We analyzed funnel data, conducted user testing of the existing checkout, and surveyed customers who abandoned their carts.',
          insights: [
            'Users surprised by shipping costs late in process',
            'Form fields felt overwhelming',
            'Mobile experience particularly poor',
            'No clear progress indication',
          ],
        },
        {
          title: 'Ideation & Design',
          description: 'We tested multiple checkout patterns including one-page, multi-step, and accordion styles. We optimized for mobile-first.',
          insights: [
            'Reduced to 3 clear steps',
            'Show all costs upfront',
            'Smart defaults and autofill',
            'Guest checkout option',
          ],
        },
        {
          title: 'Testing & Iteration',
          description: 'We ran extensive A/B tests on each element of the new checkout flow, measuring impact on conversion rate.',
          insights: [
            'Progress indicator increased completion by 18%',
            'Guest checkout boosted conversion by 22%',
            'Upfront shipping costs reduced abandonment',
            'Mobile conversion rate improved 35%',
          ],
        },
      ],
      solution: 'We implemented a streamlined 3-step checkout with clear progress indication, all costs shown upfront, and optimized mobile experience.',
      solutionImages: [
        'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80',
        'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&q=80',
      ],
      reflection: 'The power of incremental improvements was clear in this project. No single change was a magic bullet, but together they created significant impact. Data-driven decision making was crucial.',
    },
    'customer-centricity': {
      title: 'Enabling Customer-Centricity',
      subtitle: 'Leading organizational transformation toward customer-centric operations',
      tags: ['Strategy', 'CX Leadership', 'Organizational Change', 'Research', 'Team Scaling'],
      heroImage: 'https://images.unsplash.com/photo-1564654712-b60fc8b0b090?w=1200&q=80',
      overview: {
        role: 'Customer Experience Lead / Product Designer',
        timeline: '12 months',
        team: '1 (expanded to 3 permanent designers)',
        year: '2024',
      },
      problem: 'The client, one of Sweden\'s largest electricity distributors with 900,000 customers, faced fragmented customer insights, high support costs, and limited self-service options. Historically focused on operations rather than user needs, rising electricity prices and increasing customer expectations created pressure to transform.',
      challenge: 'How might we transform the organization to become truly customer-centric and embed customer-first thinking across all teams?',
      outcome: {
        metrics: [
          { label: 'Customer Effort Score (CES)', value: '4.2 → 6.35' },
          { label: 'Support cost reduction', value: 'Significant decrease' },
          { label: 'Team scaling', value: '1 → 3+ permanent designers' },
          { label: 'Organizational adoption', value: 'Cross-functional alignment' },
        ],
      },
      process: [
        {
          title: 'Understanding Client Needs',
          description: 'Conducted discovery interviews, workshops, and presentations across teams to understand organizational gaps and build alignment on the need for customer-centric transformation. Stakeholder engagement was critical to establishing support for change.',
          insights: [
            'Organization lacked unified understanding of customer needs',
            'Insights were fragmented across departments',
            'No existing customer journey perspective',
            'Teams needed education on customer-centric methods',
          ],
        },
        {
          title: 'Defining Customer Lifecycle',
          description: 'Mapped out the complete customer lifecycle and prioritized key journeys. Created a holistic view of all critical touchpoints and opportunities for improvement across the customer relationship.',
          image: '/images/Customer life cycle v2.png',
          insights: [
            'Multiple key journeys identified beyond initial priority',
            'Clear prioritization framework emerged',
            'Stakeholders aligned on highest-impact areas',
            'Framework became strategic tool for planning',
          ],
        },
        {
          title: 'Scaling the Team',
          description: 'Demonstrated value quickly, attracting stakeholder interest. Expanded initial solo effort to 3 designers within first months, then supported recruitment of permanent team members to sustain the initiative.',
          insights: [
            'Early wins proved value and built credibility',
            'Momentum attracted additional resources',
            'Team scaling enabled broader organizational impact',
            'Permanent hires ensured sustainability',
          ],
        },
        {
          title: 'Research & Customer Journey Production',
          description: 'Conducted contextual interviews with internal teams and end customers. Continuously drafted and validated customer journey assumptions, mapping needs, expectations, pains, and gains against internal processes.',
          insights: [
            'Direct customer research revealed critical pain points',
            'Internal process mapping enabled practical improvements',
            'Iterative validation prevented misalignments',
            'Customer journey became actionable for teams',
          ],
        },
        {
          title: 'Workshop Facilitation & Education',
          description: 'Facilitated cross-functional workshops on design thinking, prioritization methods, and customer-centric approaches. Built internal capability and scaled customer-first mindset across organization.',
          insights: [
            'Workshops educated teams on new methods',
            'Facilitation built cross-team alignment',
            'Knowledge transfer ensured sustainability',
            'Culture shift complemented structural changes',
          ],
        },
      ],
      solution: 'Created the organization\'s first comprehensive customer journey framework covering B2C and B2B customer lifecycles. Built CX team, embedded design thinking methodologies, and facilitated cross-functional collaboration. Delivered targeted improvements to core customer-facing products with measurable impact.',
      solutionImages: [
        '/images/Kundresa_solceller.png',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
      ],
      reflection: 'This project taught me that true transformation requires far more than creating beautiful designs or customer journey maps. Success depends on organizational alignment, strong stakeholder engagement, and building internal capability. The real win was not the first customer journey, but the team, frameworks, and mindset change that enabled ongoing customer-centric work. Leading without formal authority—through influence, evidence, and continuous communication—became the most valuable skill.',
    },
  };

  const data = caseStudyData[caseStudyId as keyof typeof caseStudyData] || caseStudyData['b2p-redesign'];

  return (
    <div className="pt-16 md:pt-20">
      {/* Back Button */}
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

      {/* Hero Section */}
      <Section className="pt-12 pb-0">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-wrap gap-2 mb-6">
              {data.tags.map((tag) => (
                <Tag key={tag} variant="accent">{tag}</Tag>
              ))}
            </div>

            <h1 className="mb-4">{data.title}</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl">
              {data.subtitle}
            </p>

            {/* Project Overview Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 p-8 bg-secondary/30 rounded-2xl border border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Role</p>
                <p className="font-medium">{data.overview.role}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Timeline</p>
                <p className="font-medium">{data.overview.timeline}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Team</p>
                <p className="font-medium">{data.overview.team}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Year</p>
                <p className="font-medium">{data.overview.year}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-2xl overflow-hidden"
          >
            <img
              src={data.heroImage}
              alt={data.title}
              className="w-full aspect-[21/9] object-cover"
            />
          </motion.div>
        </Container>
      </Section>

      {/* Problem Section */}
      <Section>
        <Container size="narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-accent font-medium mb-4">The Challenge</p>
            <h2 className="mb-8">Problem</h2>
            <p className="text-lg text-muted-foreground mb-6">{data.problem}</p>
            <div className="p-6 bg-accent/5 border-l-4 border-accent rounded-lg">
              <p className="text-lg font-medium">{data.challenge}</p>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Process Section */}
      <Section className="bg-secondary/30">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-accent font-medium mb-4">Approach</p>
            <h2>Design Process</h2>
          </motion.div>

          <div className="space-y-16">
            {data.process.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-1">
                  <div className="sticky top-32">
                    <span className="text-4xl font-bold text-accent/20">0{index + 1}</span>
                    <h3 className="mt-4 mb-4">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-6">
                  {step.image && (
                    <div className="rounded-2xl overflow-hidden">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  )}
                  <div className="bg-card p-8 rounded-2xl border border-border">
                    <h4 className="mb-4">Key Insights</h4>
                    <ul className="space-y-3">
                      {step.insights.map((insight) => (
                        <li key={insight} className="flex items-start gap-3">
                          <CheckCircle2 size={20} className="text-accent flex-shrink-0 mt-1" />
                          <span className="text-muted-foreground">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Solution Section */}
      <Section>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-accent font-medium mb-4">The Solution</p>
            <h2 className="mb-8">Final Design</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">{data.solution}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.solutionImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl overflow-hidden"
              >
                <img
                  src={image}
                  alt={`Solution ${index + 1}`}
                  className="w-full aspect-[4/3] object-cover"
                />
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Outcome Section */}
      <Section className="bg-accent text-accent-foreground">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="font-medium mb-4 opacity-90">Impact</p>
            <h2 className="mb-4">Results & Outcomes</h2>
            <p className="text-lg opacity-90 max-w-3xl">
              The redesigned experience delivered measurable improvements across key metrics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.outcome.metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
              >
                <p className="text-3xl md:text-4xl font-bold mb-2">{metric.value}</p>
                <p className="opacity-90">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Reflection Section */}
      <Section>
        <Container size="narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-accent font-medium mb-4">Learnings</p>
            <h2 className="mb-6">Reflection</h2>
            <p className="text-lg text-muted-foreground">{data.reflection}</p>
          </motion.div>
        </Container>
      </Section>

      {/* Next Project CTA */}
      <Section className="bg-secondary/30">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="mb-6">Interested in more work?</h2>
            <Button variant="primary" size="large" onClick={() => onNavigate('home')}>
              View All Projects
            </Button>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}
