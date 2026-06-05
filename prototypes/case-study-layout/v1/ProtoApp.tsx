import { useState } from 'react'
import { motion } from 'motion/react'
import { ProtoShell } from '../../_shared/proto-shell'
import { Container } from '@/app/components/Container'
import { Section } from '@/app/components/Section'
import { Tag } from '@/app/components/Tag'
import { Button } from '@/app/components/Button'
import { loadCaseStudy } from '@/data/caseStudies'
import { getCaseStudyById } from '@/data/caseStudies/metadata'
import type { CaseStudyData } from '@/data/caseStudyTypes'

// ─── Case switcher ────────────────────────────────────────────────────────────
// Two case studies to compare:
//   nordic-choice-hotels: has quote, 7 process images, visible results
//   b2p-redesign: has hideResults: true (tests blurred-results state)
const CASES = ['nordic-choice-hotels', 'b2p-redesign'] as const
type CaseId = typeof CASES[number]

// ─── Scroll-reveal wrapper ────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay }}
    >
      {children}
    </motion.div>
  )
}

// ─── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
      {children}
    </p>
  )
}

// ─── 1. Hero ──────────────────────────────────────────────────────────────────
function HeroSection({ data }: { data: CaseStudyData }) {
  return (
    <div className="relative w-full overflow-hidden bg-muted">
      {/* Hero image */}
      <div className="relative w-full" style={{ aspectRatio: '16/7', minHeight: 320 }}>
        <img
          src={data.heroImage}
          alt={data.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay so text reads on any image */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Title block — floats over the bottom of the image */}
      <Container>
        <div className="relative -mt-32 pb-16 z-10">
          <div className="flex flex-wrap gap-2 mb-5">
            {data.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground max-w-3xl">
            {data.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {data.subtitle}
          </p>
        </div>
      </Container>
    </div>
  )
}

// ─── 2. At-a-Glance Brief ─────────────────────────────────────────────────────
// Compact strip: year · tags · one-line outcome
// Shows the payoff (results.intro) immediately — skimmer-friendly.
function AtAGlanceBrief({ data, year }: { data: CaseStudyData; year?: string }) {
  return (
    <div className="border-y border-border bg-muted/40">
      <Container>
        <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {year && (
            <div>
              <SectionLabel>Year</SectionLabel>
              <p className="text-foreground font-medium">{year}</p>
            </div>
          )}
          <div>
            <SectionLabel>Disciplines</SectionLabel>
            <div className="flex flex-wrap gap-1.5">
              {data.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
          <div className={year ? '' : 'md:col-span-2'}>
            <SectionLabel>Outcome</SectionLabel>
            <p className="text-foreground leading-relaxed">{data.results.intro}</p>
          </div>
        </div>
      </Container>
    </div>
  )
}

// ─── 3. Challenge ─────────────────────────────────────────────────────────────
// Full-width narrative prose — no rigid two-column heading treatment.
function ChallengeSection({ data }: { data: CaseStudyData }) {
  return (
    <Container>
      <Section>
        <Reveal>
          <SectionLabel>The Challenge</SectionLabel>
          <p className="text-2xl md:text-3xl font-medium leading-snug text-foreground max-w-3xl">
            {data.challenge}
          </p>
        </Reveal>
      </Section>
    </Container>
  )
}

// ─── 4. The Work — numbered chapter steps ────────────────────────────────────
// Each step is a "chapter": big typographic number, title, description,
// then its slice of the process images inline.
// This eliminates the production pattern of card grid + separate image gallery.
function WorkSection({ data }: { data: CaseStudyData }) {
  const { steps, intro, images, insights } = data.designProcess

  // Distribute images across steps: each step gets as many images as possible,
  // spread roughly evenly. Remainder images go to the last step.
  const perStep = images ? Math.floor(images.length / steps.length) : 0
  const remainder = images ? images.length % steps.length : 0

  return (
    <div className="border-t border-border">
      <Container>
        <Section>
          <Reveal>
            <SectionLabel>The Work</SectionLabel>
            <p className="text-muted-foreground max-w-2xl leading-relaxed mb-16">{intro}</p>
          </Reveal>

          {/* Numbered chapters */}
          <div className="space-y-24">
            {steps.map((step, i) => {
              // Slice the images assigned to this step
              const start = i * perStep + Math.min(i, remainder)
              const count = perStep + (i < remainder ? 1 : 0)
              const stepImages = images ? images.slice(start, start + count) : []

              return (
                <Reveal key={step.title} delay={i * 0.05}>
                  <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6 md:gap-12">
                    {/* Chapter number */}
                    <div className="text-6xl md:text-8xl font-bold text-border leading-none select-none">
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed max-w-prose mb-8">
                        {step.description}
                      </p>

                      {/* Inline images for this step */}
                      {stepImages.length > 0 && (
                        <div
                          className={`grid gap-3 ${
                            stepImages.length === 1
                              ? 'grid-cols-1'
                              : stepImages.length === 2
                              ? 'grid-cols-2'
                              : 'grid-cols-2 md:grid-cols-3'
                          }`}
                        >
                          {stepImages.map((img) => (
                            <div
                              key={img.src}
                              className="overflow-hidden rounded-lg bg-muted aspect-video"
                            >
                              <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          {/* Key Insights — shown after all steps */}
          {insights.length > 0 && (
            <Reveal>
              <div className="mt-20 bg-accent/10 border border-accent/20 rounded-xl p-8">
                <SectionLabel>Key Insights</SectionLabel>
                <ul className="space-y-3">
                  {insights.map((insight, i) => (
                    <li key={i} className="flex gap-3 text-foreground leading-relaxed">
                      <span className="text-accent mt-1 shrink-0">—</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </Section>
      </Container>
    </div>
  )
}

// ─── 5. The Outcome ───────────────────────────────────────────────────────────
// Moved ABOVE deliverables. Shows KPIs prominently, or a quote, or the
// "results being collected" placeholder if hideResults is true.
function OutcomeSection({ data }: { data: CaseStudyData }) {
  const { results, quote } = data

  return (
    <div className="bg-accent text-accent-foreground">
      <Container>
        <Section>
          <Reveal>
            <SectionLabel>The Outcome</SectionLabel>
          </Reveal>

          {results.hideResults ? (
            // Blurred placeholder — matches production behavior
            <Reveal>
              <div className="relative">
                <div className="blur-sm select-none pointer-events-none">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="bg-accent-foreground/10 rounded-lg p-6">
                        <div className="text-3xl font-bold mb-1">••••</div>
                        <div className="text-sm opacity-70">metric {n}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="bg-accent-foreground text-accent text-sm font-medium px-4 py-2 rounded-full">
                    Key metrics are currently being collected
                  </p>
                </div>
              </div>
            </Reveal>
          ) : quote ? (
            // Quote testimonial
            <Reveal>
              <blockquote className="max-w-3xl">
                <p className="text-2xl md:text-3xl font-medium leading-snug mb-6">
                  &ldquo;{quote.text}&rdquo;
                </p>
                <footer className="flex items-center gap-3">
                  <div className="w-8 h-px bg-accent-foreground/40" />
                  <div>
                    <p className="font-semibold">{quote.author}</p>
                    <p className="text-sm opacity-70">{quote.title}</p>
                  </div>
                </footer>
              </blockquote>
            </Reveal>
          ) : (
            // KPI grid
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {results.kpis.map((kpi, i) => (
                <Reveal key={kpi.label} delay={i * 0.07}>
                  <div>
                    <div className="text-4xl md:text-5xl font-bold tracking-tight mb-1">
                      {kpi.value}
                    </div>
                    <div className="text-sm opacity-70">{kpi.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </Section>
      </Container>
    </div>
  )
}

// ─── 6. What We Shipped (Deliverables) ───────────────────────────────────────
// Same content as production, reframed as a clean image gallery with a title change.
function DeliverablesSection({ data }: { data: CaseStudyData }) {
  const { deliverables } = data

  return (
    <Container>
      <Section>
        <Reveal>
          <SectionLabel>What We Shipped</SectionLabel>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mb-10">
            {deliverables.intro}
          </p>
        </Reveal>

        <div
          className={`grid gap-4 ${
            deliverables.images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
          }`}
        >
          {deliverables.images.map((img, i) => (
            <Reveal key={img.src} delay={i * 0.08}>
              <div className="overflow-hidden rounded-xl bg-muted">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </Container>
  )
}

// ─── Root component ───────────────────────────────────────────────────────────
export function ProtoApp() {
  const [caseId, setCaseId] = useState<CaseId>('nordic-choice-hotels')

  const data = loadCaseStudy(caseId) as CaseStudyData
  const meta = getCaseStudyById(caseId)

  return (
    <ProtoShell label="case-study-layout / v1">
      {/* Case switcher — prototype-only control */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-background border border-border rounded-lg shadow-lg px-3 py-2">
        <span className="text-xs text-muted-foreground font-medium">Case:</span>
        <select
          value={caseId}
          onChange={(e) => setCaseId(e.target.value as CaseId)}
          className="text-xs bg-transparent text-foreground border-none outline-none cursor-pointer"
        >
          {CASES.map((id) => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
      </div>

      {/* Back nav */}
      <Container>
        <div className="pt-6 pb-2">
          <Button variant="ghost" className="text-muted-foreground -ml-2">
            ← Back to Work
          </Button>
        </div>
      </Container>

      {/* ── New section order ─────────────────────────────── */}
      {/* 1. Hero */}
      <HeroSection data={data} />

      {/* 2. At-a-Glance Brief (NEW) */}
      <Reveal>
        <AtAGlanceBrief data={data} year={meta?.year} />
      </Reveal>

      {/* 3. Challenge */}
      <ChallengeSection data={data} />

      {/* 4. The Work — numbered chapters */}
      <WorkSection data={data} />

      {/* 5. The Outcome — moved above deliverables */}
      <Reveal>
        <OutcomeSection data={data} />
      </Reveal>

      {/* 6. What We Shipped */}
      <DeliverablesSection data={data} />

      {/* CTA footer */}
      <div className="border-t border-border">
        <Container>
          <Section>
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Interested in more work?</p>
              <Button>View All Projects</Button>
            </div>
          </Section>
        </Container>
      </div>
    </ProtoShell>
  )
}
