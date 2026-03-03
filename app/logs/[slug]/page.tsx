import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Log Entry — Portfolio',
}

export default function LogDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-muted)]">
        <Link href="/logs" className="hover:text-[var(--color-accent)] transition-colors">SYSTEM_LOGS</Link>
        <span>/</span>
        <span className="uppercase">{params.slug}</span>
      </div>

      {/* Article */}
      <article className="panel-acrylic p-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="font-mono text-[9px] text-[var(--color-muted)] tracking-widest">LOG_ENTRY</span>
          <div className="flex-1 h-px bg-[var(--color-border)]" />
          <span className="font-mono text-[10px] text-[var(--color-muted)]">2025-01-15</span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight mb-2">{params.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</h1>
        <div className="h-0.5 w-12 bg-[var(--color-accent)] mb-8" />

        <div className="prose prose-sm max-w-none text-[var(--color-text)]">
          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
            This log entry will be populated from MDX files in content/posts/ during Phase 6.
            Full MDX rendering with syntax highlighting and custom components will be implemented then.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
          <Link href="/logs" className="font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1">
            <span>←</span> Back to Logs
          </Link>
        </div>
      </article>
    </div>
  )
}
