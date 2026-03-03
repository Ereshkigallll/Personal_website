import type { Metadata } from 'next'
import { ExternalLink, Code2, FlaskConical, Cpu, Wifi, Smartphone, FolderOpen } from 'lucide-react'
import { projects, projectCategories } from '@/content/projects'
import type { Project } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Projects — Portfolio',
}

const statusConfig: Record<Project['status'], { label: string; color: string; dot: string }> = {
  'active':      { label: 'Active Build', color: 'text-[var(--color-accent)]', dot: 'bg-[var(--color-accent)] animate-breathe' },
  'in-progress': { label: 'In Progress',  color: 'text-[var(--color-accent)]', dot: 'bg-[var(--color-accent)] animate-breathe' },
  'completed':   { label: 'Completed',    color: 'text-[var(--color-muted)]',  dot: 'bg-[var(--color-muted)]' },
}

const categoryIcon: Record<string, React.ReactNode> = {
  research: <FlaskConical size={22} />,
  robotics: <Cpu         size={22} />,
  iot:      <Wifi        size={22} />,
  app:      <Smartphone  size={22} />,
}

const dashedBorderStyle = {
  backgroundImage:    'linear-gradient(to right, var(--color-border) 50%, transparent 50%)',
  backgroundPosition: 'top',
  backgroundSize:     '8px 1px',
  backgroundRepeat:   'repeat-x',
}

export default function ProjectsPage() {
  const activeCount    = projects.filter(p => p.status !== 'completed').length
  const completedCount = projects.filter(p => p.status === 'completed').length

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* ── Page header ── */}
      <div className="panel-acrylic p-6 md:p-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
            <span className="font-mono text-[9px] text-[var(--color-muted)] uppercase tracking-widest">
              Project Archive
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase flex items-center gap-3 flex-wrap">
            Projects
            <span className="font-mono text-xs font-normal text-[var(--color-muted)] border border-[var(--color-border)] px-2 py-0.5">
              V.1.0.2
            </span>
          </h1>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 font-mono text-xs text-[var(--color-muted)]">
          <div className="text-center">
            <p className="text-2xl font-bold text-[var(--color-text)] tabular-nums">{projects.length}</p>
            <p className="text-[9px] uppercase tracking-wider">Total</p>
          </div>
          <div className="w-px h-8 bg-[var(--color-border)]" />
          <div className="text-center">
            <p className="text-2xl font-bold text-[var(--color-accent)] tabular-nums">{activeCount}</p>
            <p className="text-[9px] uppercase tracking-wider">Active</p>
          </div>
          <div className="w-px h-8 bg-[var(--color-border)]" />
          <div className="text-center">
            <p className="text-2xl font-bold text-[var(--color-text)] tabular-nums">{completedCount}</p>
            <p className="text-[9px] uppercase tracking-wider">Done</p>
          </div>
        </div>
      </div>

      {/* ── Category filter tabs ── */}
      <div className="flex flex-wrap gap-2">
        {projectCategories.map((cat, i) => (
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

      {/* ── Project list ── */}
      <div className="space-y-4">
        {projects.map((item, idx) => {
          const st   = statusConfig[item.status]
          const icon = categoryIcon[item.category] ?? <FolderOpen size={22} />

          return (
            <article
              key={item.slug}
              className="panel-acrylic group relative overflow-visible transition-all duration-300 hover:shadow-card"
            >
              {/* Slide-in left green bar on hover */}
              <div className="absolute -left-px top-4 bottom-4 w-[3px] bg-[var(--color-accent)] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8">

                {/* ── Left meta column ── */}
                <div className="md:w-44 flex-shrink-0 flex flex-col border-b md:border-b-0 md:border-r border-[var(--color-border)] pb-4 md:pb-0 md:pr-6">
                  {/* Large index number */}
                  <span className="text-5xl font-mono font-bold leading-none mb-4 select-none tabular-nums text-[var(--color-border)] group-hover:text-[var(--color-accent)]/20 transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  {item.serial && (
                    <div className="mb-4">
                      <p className="font-mono text-[9px] text-[var(--color-muted)] uppercase tracking-wider mb-0.5">Serial No.</p>
                      <p className="font-mono text-xs font-bold">{item.serial}</p>
                    </div>
                  )}

                  {item.date && (
                    <div className="mb-4">
                      <p className="font-mono text-[9px] text-[var(--color-muted)] uppercase tracking-wider mb-0.5">Date</p>
                      <p className="font-mono text-xs">{item.date}</p>
                    </div>
                  )}

                  {/* Status badge — pinned to bottom */}
                  <div className="mt-auto flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${st.dot}`} />
                    <span className={`font-mono text-[9px] font-bold uppercase ${st.color}`}>{st.label}</span>
                  </div>
                </div>

                {/* ── Right content ── */}
                <div className="flex-1 min-w-0">

                  {/* Title + icon */}
                  <div className="flex justify-between items-start gap-3 mb-3">
                    <h2 className="text-xl md:text-2xl font-bold uppercase leading-tight tracking-tight">
                      {item.title}
                    </h2>
                    <div className="shrink-0 mt-0.5 text-[var(--color-border)] group-hover:text-[var(--color-accent)] transition-colors">
                      {icon}
                    </div>
                  </div>

                  {/* Tags */}
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

                  {/* Overview */}
                  <div className="mb-5 pl-4 border-l-2 border-[var(--color-border)]">
                    <p className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-wider mb-2">Overview</p>
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed">{item.description}</p>
                  </div>

                  {/* Footer row: key label + action */}
                  <div className="flex items-center justify-between pt-4" style={dashedBorderStyle}>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] text-[var(--color-muted)] uppercase tracking-wider">Module</span>
                      <span className="font-mono text-xs font-bold">{item.key}</span>
                    </div>

                    {/* Action */}
                    {item.demo ? (
                      <a
                        href={item.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="group/btn flex items-center gap-2 px-4 py-2 border border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-[var(--color-text)] hover:text-[var(--color-accent)] hover:border-[var(--color-text)] transition-all"
                      >
                        <span className="font-mono text-[10px] font-bold tracking-wider">VIEW LIVE DEMO</span>
                        <ExternalLink size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    ) : item.github ? (
                      <a
                        href={item.github}
                        target="_blank"
                        rel="noreferrer"
                        className="group/btn flex items-center gap-2 px-4 py-2 border border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-[var(--color-text)] hover:text-[var(--color-accent)] hover:border-[var(--color-text)] transition-all"
                      >
                        <span className="font-mono text-[10px] font-bold tracking-wider">VIEW SOURCE</span>
                        <Code2 size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    ) : (
                      <div className="flex items-center gap-2 px-4 py-2 border border-[var(--color-border)] opacity-40 cursor-not-allowed select-none">
                        <span className="font-mono text-[10px] font-bold tracking-wider text-[var(--color-muted)]">
                          IN DEVELOPMENT
                        </span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </article>
          )
        })}
      </div>

      {/* ── Footer ── */}
      <footer className="pt-6 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[var(--color-accent)]" />
          <span className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-widest">
            Project Archive <span className="text-[var(--color-text)] font-bold">// Public Access</span>
          </span>
        </div>
        <div className="flex gap-6 font-mono text-[10px] text-[var(--color-muted)] uppercase">
          <span>Status: Online</span>
          <span>Projects: {projects.length}</span>
          <span>Updated: {new Date().getFullYear()}</span>
        </div>
      </footer>

    </div>
  )
}
