'use client'

import { motion } from 'framer-motion'
import { Download, FlaskConical } from 'lucide-react'
import { researchItems, researchCategories } from '@/content/research'
import type { Research } from '@/lib/types'

const statusConfig: Record<Research['status'], { label: string; color: string; dot: string }> = {
  'in-progress': { label: 'In Progress',   color: 'text-[var(--color-accent)]', dot: 'bg-[var(--color-accent)] animate-breathe' },
  'submitted':   { label: 'Under Review',  color: 'text-yellow-500',            dot: 'bg-yellow-400' },
  'published':   { label: 'Peer Reviewed', color: 'text-[var(--color-accent)]', dot: 'bg-[var(--color-accent)] animate-breathe' },
}

const dashedBorderStyle = {
  backgroundImage: 'linear-gradient(to right, var(--color-border) 50%, transparent 50%)',
  backgroundPosition: 'top',
  backgroundSize: '8px 1px',
  backgroundRepeat: 'repeat-x',
}

export default function ResearchContent() {
  const activeCount    = researchItems.filter(r => r.status === 'in-progress').length
  const publishedCount = researchItems.filter(r => r.status === 'published').length

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* ── Page header ── */}
      <div className="panel-acrylic p-6 md:p-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
            <span className="font-mono text-[9px] text-[var(--color-muted)] uppercase tracking-widest">
              Scientific Research Archive
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase flex items-center gap-3 flex-wrap">
            Research Database
            <span className="font-mono text-xs font-normal text-[var(--color-muted)] border border-[var(--color-border)] px-2 py-0.5">
              V.1.0.0
            </span>
          </h1>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 font-mono text-xs text-[var(--color-muted)]">
          <div className="text-center">
            <p className="text-2xl font-bold text-[var(--color-text)] tabular-nums">{researchItems.length}</p>
            <p className="text-[9px] uppercase tracking-wider">Entries</p>
          </div>
          <div className="w-px h-8 bg-[var(--color-border)]" />
          <div className="text-center">
            <p className="text-2xl font-bold text-[var(--color-accent)] tabular-nums">{activeCount}</p>
            <p className="text-[9px] uppercase tracking-wider">Active</p>
          </div>
          <div className="w-px h-8 bg-[var(--color-border)]" />
          <div className="text-center">
            <p className="text-2xl font-bold text-[var(--color-text)] tabular-nums">{publishedCount}</p>
            <p className="text-[9px] uppercase tracking-wider">Published</p>
          </div>
        </div>
      </div>

      {/* ── Category filter tabs ── */}
      <div className="flex flex-wrap gap-2">
        {researchCategories.map((cat, i) => (
          <button
            key={cat}
            className={
              'px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors ' +
              (i === 0
                ? 'bg-[var(--color-text)] text-[var(--color-bg)]'
                : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-text)]')
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Entry list ── */}
      <div className="space-y-4">
        {researchItems.map((item, idx) => {
          const st = statusConfig[item.status]
          const initials = (item.authors ?? ['?']).map(a => a[0].toUpperCase())

          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="panel-acrylic group relative overflow-visible transition-[box-shadow] duration-300 hover:shadow-card"
            >
              {/* Slide-in left green bar on hover */}
              <div className="absolute -left-px top-4 bottom-4 w-[3px] bg-[var(--color-accent)] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8">

                {/* ── Left meta column ── */}
                <div className="md:w-44 flex-shrink-0 flex flex-col border-b md:border-b-0 md:border-r border-[var(--color-border)] pb-4 md:pb-0 md:pr-6">
                  <span className="text-5xl font-mono font-bold leading-none mb-4 select-none tabular-nums text-[var(--color-border)] group-hover:text-[var(--color-accent)]/20 transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="mb-4">
                    <p className="font-mono text-[9px] text-[var(--color-muted)] uppercase tracking-wider mb-0.5">Serial No.</p>
                    <p className="font-mono text-xs font-bold">{item.serial}</p>
                  </div>

                  {item.date && (
                    <div className="mb-4">
                      <p className="font-mono text-[9px] text-[var(--color-muted)] uppercase tracking-wider mb-0.5">Date</p>
                      <p className="font-mono text-xs">{item.date}</p>
                    </div>
                  )}

                  {item.venue && (
                    <div className="mb-4">
                      <p className="font-mono text-[9px] text-[var(--color-muted)] uppercase tracking-wider mb-0.5">Venue</p>
                      <p className="font-mono text-[10px] text-[var(--color-muted)] leading-snug">{item.venue}</p>
                    </div>
                  )}

                  <div className="mt-auto flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${st.dot}`} />
                    <span className={`font-mono text-[9px] font-bold uppercase ${st.color}`}>{st.label}</span>
                  </div>
                </div>

                {/* ── Right content ── */}
                <div className="flex-1 min-w-0">

                  <div className="flex justify-between items-start gap-3 mb-3">
                    <h2 className="text-xl md:text-2xl font-bold uppercase leading-tight tracking-tight">
                      {item.title}
                    </h2>
                    <FlaskConical
                      size={22}
                      className="shrink-0 mt-0.5 text-[var(--color-border)] group-hover:text-[var(--color-accent)] transition-colors"
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {item.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 border border-[var(--color-border)] font-mono text-[9px] text-[var(--color-muted)] uppercase bg-[var(--color-bg)]/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mb-5 pl-4 border-l-2 border-[var(--color-border)]">
                    <p className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-wider mb-2">Abstract</p>
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed">{item.abstract}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4" style={dashedBorderStyle}>
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-1.5">
                        {initials.map((initial, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full bg-[var(--color-border)] border-2 border-[var(--color-surface)] flex items-center justify-center"
                          >
                            <span className="font-mono text-[8px] font-bold text-[var(--color-text)]">
                              {initial}
                            </span>
                          </div>
                        ))}
                      </div>
                      <span className="font-mono text-[10px] text-[var(--color-muted)]">
                        {item.authors?.join(', ') ?? '—'}
                      </span>
                    </div>

                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="group/btn flex items-center gap-2 px-4 py-2 border border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-[var(--color-text)] hover:text-[var(--color-accent)] hover:border-[var(--color-text)] transition-all"
                      >
                        <span className="font-mono text-[10px] font-bold tracking-wider">DATA TRANSFER</span>
                        <Download size={12} className="group-hover/btn:translate-y-0.5 transition-transform" />
                      </a>
                    ) : (
                      <div className="flex items-center gap-2 px-4 py-2 border border-[var(--color-border)] opacity-40 cursor-not-allowed select-none">
                        <span className="font-mono text-[10px] font-bold tracking-wider text-[var(--color-muted)]">
                          PENDING REVIEW
                        </span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </motion.article>
          )
        })}
      </div>

      {/* ── Footer ── */}
      <footer className="pt-6 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[var(--color-accent)]" />
          <span className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-widest">
            Research Archive <span className="text-[var(--color-text)] font-bold">// Ongoing</span>
          </span>
        </div>
        <div className="flex gap-6 font-mono text-[10px] text-[var(--color-muted)] uppercase">
          <span>Status: Online</span>
          <span>Entries: {researchItems.length}</span>
          <span>Updated: {new Date().getFullYear()}</span>
        </div>
      </footer>

    </div>
  )
}
