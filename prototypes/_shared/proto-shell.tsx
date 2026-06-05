import React from 'react'

interface ProtoShellProps {
  children: React.ReactNode
  /** e.g. "case-study-filter / v1" — displayed in the prototype label bar */
  label?: string
}

/**
 * Minimal app wrapper for prototypes.
 *
 * Provides:
 * - Access to all design tokens (via the imported @/styles/index.css in main.tsx)
 * - A visible "PROTOTYPE" label bar so you never mistake a proto for production
 * - A clean canvas — no navigation, footer, chatbot, or routing logic
 *
 * Usage in ProtoApp.tsx:
 *   import { ProtoShell } from '../../_shared/proto-shell'
 *   <ProtoShell label="feature-name / v1">...</ProtoShell>
 */
export function ProtoShell({ children, label }: ProtoShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Prototype indicator — uses accent token so it's visually distinct */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-accent/10 border-b border-accent/20 px-4 py-1.5 flex items-center gap-2">
        <span className="text-xs font-mono text-accent font-medium tracking-wider uppercase">
          Prototype
        </span>
        {label && (
          <span className="text-xs text-muted-foreground font-mono">— {label}</span>
        )}
      </div>
      {/* Content offset to clear the fixed label bar */}
      <div className="pt-8">{children}</div>
    </div>
  )
}
