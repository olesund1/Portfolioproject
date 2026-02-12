import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Award, BookOpen } from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Tag } from '../components/Tag';

export function AboutPage() {
  const skills = [
    {
      category: 'Research & Strategy',
      items: ['User Research', 'Usability Testing', 'Journey Mapping', 'Competitive Analysis', 'Stakeholder Interviews'],
    },
    {
      category: 'Design',
      items: ['Wireframing', 'Prototyping', 'Design Systems', 'Information Architecture', 'Interaction Design'],
    },
    {
      category: 'Collaboration',
      items: ['Workshop Facilitation', 'Design Critiques', 'Cross-functional Teams', 'Agile/Scrum', 'Design Thinking'],
    },
  ];

  const tools = [
    'Figma',
    'FigJam',
    'Miro',
    'Adobe Creative Suite',
    'Principle',
    'Maze',
    'UserTesting',
    'Hotjar',
    'Google Analytics',
    'Jira',
  ];

  const experience = [
    {
      icon: Briefcase,
      title: 'Senior UX Designer',
      company: 'Tech Company',
      period: '2022 - Present',
      description: 'Leading design initiatives for enterprise SaaS products, managing a team of 3 designers.',
    },
    {
      icon: Award,
      title: 'UX Designer',
      company: 'Digital Agency',
      period: '2019 - 2022',
      description: 'Delivered successful projects for clients in FinTech, Healthcare, and E-commerce sectors.',
    },
    {
      icon: BookOpen,
      title: 'Education',
      company: 'University Name',
      period: '2015 - 2019',
      description: 'B.A. in Interaction Design, Minor in Psychology',
    },
  ];

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero Section - Title Overlap with 2-Column Body/Image */}
      <Section className="relative bg-[#fafafa] overflow-visible flex items-center justify-center">
        <Container size="narrow">
          <div className="relative pt-16 md:pt-0">
            {/* Title - Positioned to Overlap Image */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl sm:text-6xl md:text-[80px] lg:text-[96px] font-bold text-foreground leading-tight mb-4 md:mb-8 relative z-20"
            >
              Johan Olesund
            </motion.h1>

            {/* 2-Column Grid - Body Text (Left) and Image (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
              {/* Left Column - Body Text with Boids Pattern Behind */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* Boids Pattern Background */}
                <img
                  src="/images/boids-flock.png"
                  alt=""
                  className="absolute inset-0 opacity-25 pointer-events-none -z-10"
                />
                <p className="text-base md:text-lg text-foreground leading-[1.6] text-justify max-w-[405px] relative z-10">
                  Johan is a seasoned and business-minded UX Designer. He combines a strong foundation in user research and design with a sharp understanding of business strategy, ensuring that design decisions drive measurable value for both users and organizations. With his versatile experience across UX and product strategy, he can take on diverse design roles and delivering impact across the full design lifecycle. Johan is known for his drive, quick learning, collaborative nature, and positive energy, making him a valued and trusted member of the team.
                </p>
              </motion.div>

              {/* Right Column - Image with Black Gradient Overlay */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative h-[350px] md:h-[400px] lg:h-[433px]"
              >
                <img
                  src="/images/profil.png"
                  alt="Johan Olesund"
                  className="w-full h-full object-cover"
                />

                {/* Gradient Overlay - Black */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
              </motion.div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Experience Timeline */}
      <Section className="bg-secondary/30">
        <Container size="narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-accent font-medium mb-4">Experience</p>
            <h2>Background & Education</h2>
          </motion.div>

          <div className="space-y-8">
            {experience.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 p-6 bg-card rounded-xl border border-border"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <item.icon size={24} className="text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3>{item.title}</h3>
                    <span className="text-sm text-muted-foreground font-medium">{item.period}</span>
                  </div>
                  <p className="text-accent font-medium mb-2">{item.company}</p>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Skills Section */}
      <Section>
        <Container size="narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-accent font-medium mb-4">Capabilities</p>
            <h2>Skills & Expertise</h2>
          </motion.div>

          <div className="space-y-12">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="mb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill) => (
                    <Tag key={skill} variant="default">{skill}</Tag>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Tools Section */}
      <Section className="bg-secondary/30">
        <Container size="narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-accent font-medium mb-4">Toolkit</p>
            <h2 className="mb-4">Tools I Use</h2>
            <p className="text-lg text-muted-foreground">
              I'm comfortable with a wide range of design and research tools, always picking 
              the right one for the job.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            {tools.map((tool) => (
              <Tag key={tool} variant="accent">{tool}</Tag>
            ))}
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}
