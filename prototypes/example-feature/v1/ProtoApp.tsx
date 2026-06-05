import React from 'react'
import { ProtoShell } from '../../_shared/proto-shell'
import { Container } from '@/app/components/Container'
import { Section } from '@/app/components/Section'
import { Button } from '@/app/components/Button'
import { Tag } from '@/app/components/Tag'

/**
 * Replace this with your prototype UI.
 *
 * You can import anything from @/app/components/, @/data/, @/styles/
 * as if you were writing production code — the @ alias resolves to src/.
 */
export function ProtoApp() {
  return (
    <ProtoShell label="example-feature / v1">
      <Container>
        <Section>
          <div className="flex flex-col gap-6 max-w-xl">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Tag>Design System</Tag>
                <Tag variant="accent">Working ✓</Tag>
              </div>
              <h1 className="text-3xl font-medium text-foreground">
                Prototype scaffold
              </h1>
              <p className="text-muted-foreground">
                This confirms the prototype system is set up correctly.
                All design tokens, components, and Tailwind classes are available.
                Replace this file with your prototype UI.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="primary">Primary action</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>

            <div className="rounded-lg border border-border p-4 bg-card text-card-foreground text-sm text-muted-foreground font-mono">
              PROTO=example-feature/v1 npm run proto
            </div>
          </div>
        </Section>
      </Container>
    </ProtoShell>
  )
}
