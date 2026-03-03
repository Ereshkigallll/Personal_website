import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Project Detail — Portfolio',
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-muted)]">
        <Link href="/projects" className="hover:text-[var(--color-accent)] transition-colors">PROJECTS</Link>
        <span>/</span>
        <span className="uppercase">{params.slug}</span>
      </div>

      {/* Detail card */}
      <div className="panel-acrylic p-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="font-mono text-[9px] text-[var(--color-accent)] font-bold tracking-widest">KEY_01</span>
          <div className="flex-1 h-px bg-[var(--color-border)]" />
          <span className="font-mono text-[9px] px-1.5 py-0.5 border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold">ACTIVE</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight mb-2">{params.slug.replace(/-/g, ' ').toUpperCase()}</h1>
        <div className="h-0.5 w-16 bg-[var(--color-accent)] mb-6" />

        <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-8">
          Project description will be populated from content/projects.ts in Phase 3.
          This detail page shows the full project breakdown including architecture, challenges, and outcomes.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8 font-mono text-xs">
          <div>
            <p className="text-[var(--color-muted)] uppercase tracking-wider mb-1">Category</p>
            <p className="font-bold">— TBD —</p>
          </div>
          <div>
            <p className="text-[var(--color-muted)] uppercase tracking-wider mb-1">Year</p>
            <p className="font-bold">2024</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Link href="/projects" className="font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1">
            <span>←</span> Back to Projects
          </Link>
        </div>
      </div>
    </div>
  )
}
