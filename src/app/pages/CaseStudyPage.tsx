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
      keyInsights: [
        'Partners spent 3+ hours daily on manual data entry, representing massive efficiency opportunity',
        'Real-time visibility and intuitive dashboards transformed partner decision-making capability',
        'Phased approach with quick wins enabled organizational momentum and partnership trust',
        'Developer collaboration from the start prevented costly redesigns and improved feasibility',
      ],
      deliverables: {
        description: 'The redesigned Partner Platform featured an intuitive dashboard providing real-time insights, automated workflows eliminating manual tasks, streamlined information architecture, and seamless API integration. The new design system ensured consistency and scalability across the platform.',
        images: [
          'https://images.unsplash.com/photo-1460925895917-adf4e565db4d?w=800&q=80',
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        ],
      },
      results: {
        metrics: [
          { label: 'Manual work reduction', value: '60% decrease' },
          { label: 'Platform efficiency', value: '3.5x improvement' },
          { label: 'Partner satisfaction', value: '4.5/5.0' },
          { label: 'Partner adoption', value: '85% increase' },
        ],
      },
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
            'WCAG 2.1 AA compliant color palette enabled broader access',
            'Clear step-by-step booking process reduced decision paralysis',
            'Plain language throughout improved comprehension',
            'Multiple input methods supported diverse user needs',
          ],
        },
        {
          title: 'Testing & Iteration',
          description: 'We conducted extensive accessibility testing with screen readers, keyboard navigation, and users with various disabilities.',
          insights: [
            '100% task completion rate with assistive technologies',
            'Booking times significantly faster than previous system',
            'Positive feedback from diverse user groups and staff',
            'Accessibility improvements benefited all users universally',
          ],
        },
      ],
      keyInsights: [
        'Inclusive design from the start created better experiences for everyone, not just users with disabilities',
        'Plain language and clear information architecture reduced decision paralysis and confusion',
        'Proper accessibility testing revealed that universal design principles serve all users better',
        'Early accessibility expert involvement prevented costly redesigns and ensured compliance',
      ],
      deliverables: {
        description: 'We created a fully accessible patient portal with simplified appointment booking, clear information hierarchy, and support for all assistive technologies. WCAG 2.1 AA compliance was embedded from the start, ensuring access for all users.',
        images: [
          'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
          'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
        ],
      },
      results: {
        metrics: [
          { label: 'No-show rate', value: '30% reduction' },
          { label: 'Online bookings', value: '65% increase' },
          { label: 'WCAG compliance', value: 'AA certified' },
          { label: 'Call center volume', value: '40% decrease' },
        ],
      },
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
      process: [
        {
          title: 'Research & Discovery',
          description: 'We analyzed funnel data, conducted user testing of the existing checkout, and surveyed customers who abandoned their carts.',
          insights: [
            'Users surprised by shipping costs revealed late in process',
            'Form fields felt overwhelming and caused decision paralysis',
            'Mobile experience particularly poor with small screen friction',
            'No clear progress indication left users uncertain about steps remaining',
          ],
        },
        {
          title: 'Ideation & Design',
          description: 'We tested multiple checkout patterns including one-page, multi-step, and accordion styles. We optimized for mobile-first.',
          insights: [
            'Three-step flow provided clear, manageable progression',
            'Upfront cost display eliminated surprise abandonment moments',
            'Smart defaults and autofill reduced form friction significantly',
            'Guest checkout option removed registration barrier for new users',
          ],
        },
        {
          title: 'Testing & Iteration',
          description: 'We ran extensive A/B tests on each element of the new checkout flow, measuring impact on conversion rate.',
          insights: [
            'Progress indicator increased completion rate by 18%',
            'Guest checkout option boosted conversion by 22%',
            'Upfront shipping costs reduced abandonment by 16%',
            'Mobile-first optimization improved mobile conversion 35%',
          ],
        },
      ],
      keyInsights: [
        'Incremental improvements compound—no single change was transformative, but together they drove 25% conversion increase',
        'Transparent pricing upfront eliminated one of the largest abandonment reasons late in checkout',
        'Mobile-first design approach revealed that desktop optimizations often ignored mobile friction points',
        'Data-driven testing was essential—our assumptions about what mattered differed from actual user behavior',
      ],
      deliverables: {
        description: 'We implemented a streamlined 3-step checkout with clear progress indication, all costs shown upfront, guest checkout option, and optimized mobile experience. Smart defaults and autofill reduced form friction while maintaining necessary information collection.',
        images: [
          'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80',
          'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&q=80',
        ],
      },
      results: {
        metrics: [
          { label: 'Conversion rate', value: '25% increase' },
          { label: 'Cart abandonment', value: '68% → 52%' },
          { label: 'Average order value', value: '12% higher' },
          { label: 'Customer satisfaction', value: '4.7/5.0' },
        ],
      },
      reflection: 'The power of incremental improvements was clear in this project. No single change was a magic bullet, but together they created significant impact. Data-driven decision making was crucial.',
    },
    'customer-centricity': {
      title: 'Enabling Customer-Centricity',
      subtitle: 'Leading organizational transformation at Sweden\'s largest electricity distributor to embed customer-first thinking across operations',
      tags: ['Strategy', 'CX Leadership', 'Organizational Change', 'Research', 'Team Scaling'],
      heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
      overview: {
        role: 'Customer Experience Lead / Product Designer',
        timeline: '12 months',
        team: '1 (expanded to 3 permanent designers)',
        year: '2024',
      },
      problem: 'The client, one of Sweden\'s largest electricity distributors with 900,000 customers, operated with fragmented customer insights scattered across 7+ departments. High support costs, limited self-service capabilities, and an operations-centric culture created friction in customer interactions. The organization faced immediate pressure from rising electricity prices and growing customer expectations for digital-first experiences. Without coordinated customer-centric approaches, the company risked losing competitive advantage and customer loyalty.',
      challenge: 'How might we transform the organization to become truly customer-centric, unify fragmented customer insights, and embed customer-first thinking across all teams and operations?',
      process: [
        {
          title: 'Understanding Client Needs',
          description: 'Conducted extensive discovery interviews and stakeholder workshops across operations, support, product, and leadership teams. Mapped organizational structures, identified silos, and built consensus around the need for customer-centric transformation. This alignment phase proved critical for overcoming resistance to change.',
          insights: [
            'Seven departments held separate customer views with no unified perspective',
            'Operations teams prioritized process efficiency over customer experience',
            'Support teams understood customer pain points that product missed entirely',
            'Executive alignment required demonstrating business case beyond "good design"',
          ],
        },
        {
          title: 'Defining Customer Lifecycle',
          description: 'Created comprehensive B2C and B2B customer journey maps covering complete lifecycle from awareness through retention. Identified and prioritized key customer segments: regular customers, solar panel owners, businesses. Built a holistic touchpoint framework connecting business processes to customer needs.',
          insights: [
            'Solar panel customer journey distinctly different—separate pain points and needs',
            'Customer moving process revealed multiple internal handoffs creating friction',
            'Billing and support interactions clustered as top pain points across segments',
            'Prioritization framework enabled focus on highest-impact opportunities first',
          ],
        },
        {
          title: 'Scaling the Team',
          description: 'Initial solo work demonstrated clear value through quick wins and evidence. This credibility attracted stakeholder investment, enabling rapid team expansion from 1 to 3 permanent designers within months. Supported recruitment of sustainable team to continue customer-centric work beyond initial engagement.',
          insights: [
            'Early wins with solar segment (CES 4.2→6.35) built executive confidence',
            'Quick momentum attracted budget and organizational commitment',
            'Permanent team structure ensured continuity and prevented knowledge loss',
            'Team scaling multiplied organizational impact and delivery capacity',
          ],
        },
        {
          title: 'Research & Customer Journey Production',
          description: 'Conducted contextual interviews with both internal stakeholders and real customers. Iteratively drafted and validated customer journey assumptions, mapping needs, expectations, pains, and gains. Connected insights to operational processes, creating actionable artifacts that bridged customer perspective with business reality.',
          insights: [
            'Direct customer research revealed pain points invisible to operations teams',
            'Internal process mapping enabled practical improvements, not design-only solutions',
            'Iterative validation with stakeholders built credibility and prevented misalignment',
            'Tangible journey artifacts enabled teams to immediately apply insights',
          ],
        },
        {
          title: 'Workshop Facilitation & Education',
          description: 'Facilitated cross-functional workshops teaching design thinking, customer research methods, and prioritization frameworks. Built organizational capability by shifting mindset from "output-focused" to "outcome-focused" across teams. Regular sessions ensured knowledge transfer and sustained customer-centric thinking beyond initial project.',
          insights: [
            'Education on "Outcome vs Output" thinking fundamentally shifted team prioritization',
            'Cross-team workshops reduced silos and built shared understanding of customer reality',
            'Empathy mapping and prioritization frameworks became embedded in planning processes',
            'Culture shift toward customer-centricity proved as important as structural changes',
          ],
        },
      ],
      keyInsights: [
        'Organizational transformation requires alignment before implementation—discovery and strategy phases created more value than final deliverables alone',
        'Team scaling through evidence and quick wins was essential—one designer couldn\'t deliver organizational scope, but early credibility enabled investment',
        'Customer journey maps only created value when connected to operations—insights-to-action translation was the critical bridge',
        'Leading without formal authority meant influence through evidence, consistent communication, and demonstrated business impact',
      ],
      deliverables: {
        description: 'Created Sweden\'s leading electricity distributor\'s first comprehensive customer journey framework covering B2C and B2B lifecycles. Scaled CX team from 1 to 3+ permanent designers embedded across the organization. Delivered detailed customer journeys integrated with operational process maps, enabling teams to immediately identify improvement opportunities. Implemented design thinking workshops and prioritization frameworks as organizational capability. Achieved 52% improvement in Customer Effort Score for solar segment (4.2 → 6.35) as proof of concept.',
        images: [
          '/images/Kundresa_solceller.png',
          '/images/Customer life cycle v2.png',
        ],
      },
      results: {
        metrics: [
          { label: 'Customer Effort Score (CES)', value: '4.2 → 6.35 (52% improvement)' },
          { label: 'Support cost reduction', value: 'Significant decrease' },
          { label: 'Team scaling', value: '1 → 3+ permanent designers' },
          { label: 'Organizational adoption', value: '7 departments unified' },
        ],
      },
      reflection: 'This engagement transformed my understanding of what effective design leadership really means. True organizational transformation requires far more than creating beautiful designs or comprehensive journey maps. The most valuable deliverable wasn\'t the first customer journey—it was the team, frameworks, and mindset shift that enabled ongoing customer-centric work. I learned that leading without formal authority demands influence through evidence, consistent communication, and quick wins that build organizational confidence. The most impactful moment was seeing a skeptical operations manager change their mind after directly observing customer frustration in a research session—that single perspective shift cascaded through teams. This project revealed that sustainable change comes from building organizational capability, not from individual contributions. The sustainability of the transformation depends on embedding the mindset, not just delivering artifacts.',
    },
    'customer-energy-transformation': {
      title: 'Customer-Centric Energy Company Transformation',
      subtitle: 'Transforming a legacy utility company into a customer-focused organization through research and organizational change',
      tags: ['B2B/B2C', 'Customer Journey', 'CX Strategy', 'Team Leadership', 'Design Systems'],
      heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
      overview: {
        role: 'Design Lead',
        timeline: '12 months',
        team: '2 Designers + 1 PM',
        year: '2024',
      },
      problem: 'The client, one of Sweden\'s largest electricity distributors serving 900,000 customers, faced fragmented customer insights, high support costs, and limited self-service capabilities. Operations-focused processes were creating friction in customer interactions, while rising electricity prices and increasing customer expectations demanded a fundamental shift toward customer-centricity.',
      challenge: 'How might we transform a traditionally operations-focused electricity distributor into a customer-centric organization with unified customer insights and streamlined experiences?',
      process: [
        {
          title: 'Discovery',
          description: 'Led cross-functional research to map the complete customer lifecycle and identify pain points. Conducted contextual interviews with both internal stakeholders and end customers to establish assumed experiences, then validated findings through real customer sessions.',
          insights: [
            'Customer lifecycle fragmented across 7+ internal departments with no unified view',
            'Support costs directly correlated with customer self-service gaps',
            'Solar panel customers had distinct journey requiring separate optimization',
            'Internal alignment on customer needs was critical before any design changes',
          ],
        },
        {
          title: 'Strategy',
          description: 'Developed comprehensive framework for customer journey mapping and built organizational capability. Scaled the design team by recruiting additional designers and established cross-functional workshops to embed design thinking across the company.',
          insights: [
            'Team scaling proved essential—original team couldn\'t deliver scope alone',
            'Workshop facilitation became key lever for organizational alignment',
            'Executive sponsorship was critical for cross-functional buy-in',
            'Phased approach reduced change management risk and built momentum',
          ],
        },
        {
          title: 'Delivery',
          description: 'Produced detailed customer journey maps with integrated business process views. Prioritized improvement opportunities and implemented work packages with measurable KPIs. Early wins in the solar panel segment demonstrated clear ROI for expansion.',
          insights: [
            'Visualizing end-to-end journeys revealed system-level inefficiencies',
            'Connecting customer needs to internal processes drove accountability',
            'Quantified metrics (CES improvement) validated business impact',
            'Early wins in solar segment enabled organizational momentum for expansion',
          ],
        },
      ],
      keyInsights: [
        'Customer transformation requires organizational alignment before implementation—research and strategy phases were as important as final journey maps',
        'Cross-functional workshops proved more valuable than traditional presentations for embedding design thinking',
        'Phased approach with measurable early wins (solar segment) built credibility for larger organizational change',
        'Combining customer research with internal process mapping revealed opportunities inaccessible through either lens alone',
      ],
      deliverables: {
        description: 'Delivered a comprehensive B2C/B2B customer lifecycle framework, detailed customer journeys with integrated business process views, and embedded design methodologies across the organization. The solar panel segment redesign achieved a 52% Customer Effort Score improvement (4.2 to 6.35), validating the approach and enabling expansion to other customer segments.',
        images: [
          'https://images.unsplash.com/photo-1460925895917-adf4e565db4d?w=800&q=80',
          'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
        ],
      },
      results: {
        metrics: [
          { label: 'Customer Effort Score improvement', value: '52% increase (4.2→6.35)' },
          { label: 'Team expansion capacity', value: '3x increase in delivery' },
          { label: 'Organizational alignment', value: '7 departments unified' },
          { label: 'Self-service adoption', value: '65% increase' },
        ],
      },
      reflection: 'This transformation demonstrated that organizational change requires three elements in equal measure: deep user research to ground decisions in reality, strategic frameworks that guide teams toward customer-centric thinking, and continuous evidence that validates the approach. The most valuable insight was recognizing that phased wins—particularly the solar panel segment success—built organizational credibility that enabled broader transformation. This project reinforced that designing experiences is inseparable from designing the organizational systems that deliver them.',
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
                    <p className="text-muted-foreground mb-6">{step.description}</p>
                    {step.insights && (
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-3">Key Points</p>
                        <ul className="space-y-2">
                          {step.insights.map((insight) => (
                            <li key={insight} className="flex items-start gap-2">
                              <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground text-sm">{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="lg:col-span-2">
                  {step.image && (
                    <div className="rounded-2xl overflow-hidden">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Key Insights Section */}
      <Section>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2>Key Insights</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.keyInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-8 rounded-2xl border border-border flex flex-col items-start gap-4"
              >
                <CheckCircle2 size={24} className="text-accent flex-shrink-0" />
                <p className="text-muted-foreground">{insight}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Deliverables Section */}
      <Section>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="mb-8">Deliverables</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">{data.deliverables.description}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.deliverables.images.map((image, index) => (
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
                  alt={`Deliverable ${index + 1}`}
                  className="w-full aspect-[4/3] object-cover"
                />
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Results Section */}
      <Section className="bg-accent text-accent-foreground">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="mb-4">Results & Impact</h2>
            <p className="text-lg opacity-90 max-w-3xl">
              The redesigned experience delivered measurable improvements across key metrics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.results.metrics.map((metric, index) => (
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
      {data.reflection && (
        <Section>
          <Container size="narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6">Reflection</h2>
              <p className="text-lg text-muted-foreground">{data.reflection}</p>
            </motion.div>
          </Container>
        </Section>
      )}

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
