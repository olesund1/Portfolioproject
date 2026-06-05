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
const CASES = ['nordic-choice-hotels', 'b2p-redesign'] as const
type CaseId = typeof CASES[number]

// ─── Per-case bridge overrides ────────────────────────────────────────────────
// In production these would live in the JSON as optional `transitions` fields.
// Fallback strings are defined inside each section component.
const BRIDGES: Partial<Record<CaseId, Partial<BridgeMap>>> = {
  'nordic-choice-hotels': {
    challenge: "A legacy loyalty programme had stopped earning its name. Here is what we were asked to fix.",
    work: "We ran a deep discovery before touching a single screen.",
    outcome: "The work landed — and the team noticed.",
    deliverables: "These are the artefacts that made it real.",
  },
  'b2p-redesign': {
    challenge: "A business-to-payer flow that was losing customers at every step.",
    work: "We mapped the failure modes before designing any solutions.",
    outcome: "Results are still being collected — but the direction is clear.",
    deliverables: "Here is what went live.",
  },
}

interface BridgeMap {
  challenge: string
  work: string
  outcome: string
  deliverables: string
}

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
    <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
      {children}
    </p>
  )
}

// ─── Transition bridge ────────────────────────────────────────────────────────
// The red-thread connector. Sits between the SectionLabel and the section body.
// A short sentence that answers: "why am I reading this next?"
function TransitionBridge({ text }: { text: string }) {
  return (
    <p className="text-base italic text-muted-foreground mb-8 max-w-2xl leading-relaxed">
      {text}
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
// Large editorial pull-quote with left accent border. Gives the problem statement
// narrative weight — the reader commits to the story here.
function ChallengeSection({ data, bridge }: { data: CaseStudyData; bridge: string }) {
  return (
    <Container>
      <Section>
        <Reveal>
          <SectionLabel>The Challenge</SectionLabel>
          <TransitionBridge text={bridge} />
          <blockquote className="border-l-4 border-accent pl-6">
            <p className="text-3xl md:text-4xl font-medium leading-snug text-foreground max-w-3xl">
              {data.challenge}
            </p>
          </blockquote>
        </Reveal>
      </Section>
    </Container>
  )
}

// ─── 4. The Work — numbered chapters with spine ───────────────────────────────
// A thin vertical spine threads through the chapter number gutter on desktop,
// making all steps read as one connected timeline rather than isolated cards.
function WorkSection({ data, bridge }: { data: CaseStudyData; bridge: string }) {
  const { steps, intro, images, insights } = data.designProcess

  const perStep = images ? Math.floor(images.length / steps.length) : 0
  const remainder = images ? images.length % steps.length : 0

  return (
    <Container>
      <Section>
        <Reveal>
          <SectionLabel>The Work</SectionLabel>
          <TransitionBridge text={bridge} />
          <p className="text-muted-foreground max-w-2xl leading-relaxed mb-16">{intro}</p>
        </Reveal>

        {/* Chapters — relative container anchors the spine */}
        <div className="relative">
          {/* Vertical spine: visible on md+ only, sits in the 80px gutter */}
          <div
            className="hidden md:block absolute left-10 top-4 bottom-4 w-px bg-border"
            aria-hidden="true"
          />

          <div className="space-y-24">
            {steps.map((step, i) => {
              const start = i * perStep + Math.min(i, remainder)
              const count = perStep + (i < remainder ? 1 : 0)
              const stepImages = images ? images.slice(start, start + count) : []

              return (
                <Reveal key={step.title} delay={i * 0.05}>
                  <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6 md:gap-12">
                    {/* Chapter number — sits on the spine */}
                    <div className="relative flex items-start justify-center">
                      {/* Small dot on the spine */}
                      <div
                        className="hidden md:block absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-border ring-2 ring-background z-10"
                        aria-hidden="true"
                      />
                      <span className="text-6xl md:text-8xl font-bold text-border leading-none select-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed max-w-prose mb-8">
                        {step.description}
                      </p>

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
  )
}

// ─── 5. The Outcome ───────────────────────────────────────────────────────────
// Contained card instead of full-bleed accent stop — keeps scroll momentum.
// Quote, KPI grid, and blurred placeholder all live inside the same card shape.
function OutcomeSection({ data, bridge }: { data: CaseStudyData; bridge: string }) {
  const { results, quote } = data

  return (
    <Container>
      <Section>
        <Reveal>
          <SectionLabel>The Outcome</SectionLabel>
          <TransitionBridge text={bridge} />
        </Reveal>

        <Reveal>
          <div className="bg-accent/10 border border-accent/20 rounded-2xl p-8 md:p-12">
            {results.hideResults ? (
              // Blurred placeholder — same state as production, just inside the card
              <div className="relative">
                <div className="blur-sm select-none pointer-events-none">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="bg-foreground/10 rounded-lg p-6">
                        <div className="text-3xl font-bold mb-1 text-foreground">••••</div>
                        <div className="text-sm text-muted-foreground">metric {n}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="bg-foreground text-background text-sm font-medium px-4 py-2 rounded-full">
                    Key metrics are currently being collected
                  </p>
                </div>
              </div>
            ) : quote ? (
              // Quote testimonial
              <blockquote>
                <p className="text-2xl md:text-3xl font-medium leading-snug text-foreground mb-6 max-w-3xl">
                  &ldquo;{quote.text}&rdquo;
                </p>
                <footer className="flex items-center gap-3">
                  <div className="w-8 h-px bg-foreground/30" />
                  <div>
                    <p className="font-semibold text-foreground">{quote.author}</p>
                    <p className="text-sm text-muted-foreground">{quote.title}</p>
                  </div>
                </footer>
              </blockquote>
            ) : (
              // KPI grid
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {results.kpis.map((kpi, i) => (
                  <Reveal key={kpi.label} delay={i * 0.07}>
                    <div>
                      <div className="text-4xl md:text-5xl font-bold tracking-tight mb-1 text-foreground">
                        {kpi.value}
                      </div>
                      <div className="text-sm text-muted-foreground">{kpi.label}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </Section>
    </Container>
  )
}

// ─── 6. What We Shipped (Deliverables) ───────────────────────────────────────
function DeliverablesSection({ data, bridge }: { data: CaseStudyData; bridge: string }) {
  const { deliverables } = data

  return (
    <Container>
      <Section>
        <Reveal>
          <SectionLabel>What We Shipped</SectionLabel>
          <TransitionBridge text={bridge} />
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

  // Merge generic fallbacks with per-case overrides
  const bridges: BridgeMap = {
    challenge: "Here's the problem we were brought in to solve.",
    work: 'This is how we approached it.',
    outcome: "Here's what the work made possible.",
    deliverables: 'These are the artefacts that got us there.',
    ...BRIDGES[caseId],
  }

  return (
    <ProtoShell label="case-study-layout / v2">
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

      {/* ── Section order (same as v1) ─────────────────────────────── */}
      {/* 1. Hero */}
      <HeroSection data={data} />

      {/* 2. At-a-Glance Brief */}
      <Reveal>
        <AtAGlanceBrief data={data} year={meta?.year} />
      </Reveal>

      {/* 3. Challenge — pull-quote with bridge */}
      <ChallengeSection data={data} bridge={bridges.challenge} />

      {/* 4. The Work — spine + bridge */}
      <WorkSection data={data} bridge={bridges.work} />

      {/* 5. The Outcome — contained card + bridge */}
      <OutcomeSection data={data} bridge={bridges.outcome} />

      {/* 6. What We Shipped — bridge */}
      <DeliverablesSection data={data} bridge={bridges.deliverables} />

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
