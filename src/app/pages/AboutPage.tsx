import React from 'react';
import { motion } from 'motion/react';
import { Download, Briefcase, Award, BookOpen } from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
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
      {/* Hero Section */}
      <Section className="min-h-[60vh] flex items-center">
        <Container size="narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-accent font-medium mb-6"
            >
              About Me
            </motion.p>
            
            <h1 className="mb-8">
              Designer, problem solver, and lifelong learner
            </h1>
            
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                I'm a UX Designer with over 6 years of experience creating digital products 
                that balance user needs with business goals. My approach combines strategic 
                thinking with hands-on design work, always guided by research and data.
              </p>
              <p>
                I believe great design emerges from deep empathy with users, close collaboration 
                with cross-functional teams, and a willingness to iterate based on feedback. 
                Whether I'm conducting user interviews, sketching flows, or presenting to 
                stakeholders, my focus is always on creating meaningful impact.
              </p>
              <p>
                When I'm not designing, you'll find me exploring new cities, reading about 
                behavioral psychology, or experimenting with film photography.
              </p>
            </div>

            <div className="mt-8">
              <Button variant="primary" size="large" showArrow>
                <Download size={18} />
                Download Resume
              </Button>
            </div>
          </motion.div>
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
