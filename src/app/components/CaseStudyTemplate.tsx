import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Container } from './Container';
import { Button } from './Button';
import type { CaseStudyData } from '@/data/caseStudyTypes';

interface CaseStudyTemplateProps {
  data: CaseStudyData;
  onNavigate: (page: string, caseStudyId?: string) => void;
}

export function CaseStudyTemplate({ data, onNavigate }: CaseStudyTemplateProps) {
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
      <Container>
        <div className="py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-5"
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {data.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium uppercase tracking-wider text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1>{data.title}</h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              {data.subtitle}
            </p>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 rounded-2xl overflow-hidden"
          >
            <img
              src={data.heroImage}
              alt={data.title}
              className="w-full aspect-[21/9] object-cover"
            />
          </motion.div>
        </div>
      </Container>

      {/* Mid Section — Challenge, Design Process, Deliverables */}
      <div className="py-12">
        {/* Challenge */}
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-b border-border pb-12 pt-6 flex flex-col lg:flex-row gap-8"
          >
            <div className="lg:w-[300px] shrink-0">
              <h2>Challenge</h2>
            </div>
            <div className="flex-1">
              <p className="text-lg text-muted-foreground leading-7">
                {data.challenge}
              </p>
            </div>
          </motion.div>
        </Container>

        {/* Design Process */}
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-b border-border pb-12 pt-12 flex flex-col lg:flex-row gap-8"
          >
            <div className="lg:w-[300px] shrink-0">
              <h2>Design process</h2>
            </div>
            <div className="flex-1 flex flex-col gap-16">
              {/* Intro */}
              <p className="text-lg text-muted-foreground leading-7">
                {data.designProcess.intro}
              </p>

              {/* Design Steps */}
              <div className="flex flex-wrap gap-6">
                {data.designProcess.steps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex-1 min-w-[280px] md:min-w-[350px] flex flex-col gap-6"
                  >
                    <h4 className="text-2xl font-medium text-muted-foreground">
                      {step.title}
                    </h4>
                    <p className="text-lg text-muted-foreground leading-7">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Key Insights */}
              <div className="flex flex-col gap-6">
                <h4 className="text-xl font-bold uppercase text-muted-foreground tracking-wider">
                  Key Insights
                </h4>
                <ul className="list-disc pl-7 space-y-1">
                  {data.designProcess.insights.map((insight, i) => (
                    <li
                      key={i}
                      className="text-lg text-muted-foreground leading-7"
                    >
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </Container>

        {/* Deliverables */}
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pb-12 pt-12 flex flex-col lg:flex-row gap-8"
          >
            <div className="lg:w-[300px] shrink-0">
              <h2>Deliverables</h2>
            </div>
            <div className="flex-1 flex flex-col gap-6">
              <p className="text-lg text-muted-foreground leading-7">
                {data.deliverables.intro}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.deliverables.images.map((image, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-2xl overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={`Deliverable ${i + 1}`}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </div>

      {/* Results & Impact */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-accent text-accent-foreground"
      >
        <Container>
          <div className="py-16">
            <div className="flex flex-col gap-4 mb-12">
              <h2>Results &amp; Impact</h2>
              <p className="text-lg opacity-90">
                {data.results.intro}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.results.kpis.map((kpi, index) => (
                <motion.div
                  key={kpi.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 border border-white/20 rounded-xl p-6 h-[170px] flex flex-col gap-2"
                >
                  <p className="text-base font-bold opacity-90">
                    {kpi.label}
                  </p>
                  <p className="text-3xl md:text-4xl font-bold leading-tight">
                    {kpi.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </motion.div>

      {/* CTA — Interested in more work? */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-secondary/30 py-32 md:py-44 flex flex-col items-center justify-center gap-6"
      >
        <h2 className="text-center">Interested in more work?</h2>
        <Button variant="primary" size="large" onClick={() => onNavigate('home')}>
          View All Projects
        </Button>
      </motion.div>
    </div>
  );
}
