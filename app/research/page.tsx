import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research — Portfolio',
}

export default function ResearchPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page header */}
      <div className="panel-acrylic p-6 border-b-2 border-[var(--color-accent)]">
        <div className="flex items-center gap-3 mb-1">
          <span className="font-mono text-[10px] text-[var(--color-muted)] tracking-widest">MODULE_02</span>
          <div className="flex-1 h-px bg-[var(--color-border)]" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">RESEARCH</h1>
        <p className="font-mono text-xs text-[var(--color-muted)] mt-1">PhD work · Publications · Ongoing investigations</p>
      </div>

      {/* Featured / Primary research */}
      <div className="panel-acrylic p-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="font-mono text-[9px] text-[var(--color-accent)] font-bold tracking-widest">PRIMARY</span>
          <div className="flex-1 h-px bg-[var(--color-border)]" />
        </div>
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight mb-1">Vibrotactile Feedback in VR Built Environments</h2>
              <p className="font-mono text-xs text-[var(--color-muted)] uppercase tracking-wider">PhD Research · In Progress</p>
            </div>
            <span className="shrink-0 font-mono text-[10px] bg-[var(--color-accent)]/20 text-[var(--color-accent)] px-2 py-0.5 border border-[var(--color-accent)]/30 font-bold">IN PROGRESS</span>
          </div>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-2xl">
            Investigating how vibrotactile haptic cues influence spatial perception and user experience in virtual reality architectural walkthroughs. Focus on the intersection of built environment simulation and embodied interaction.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {['VR', 'Haptics', 'Vibrotactile', 'Built Environment', 'HCI', 'Unity'].map(tag => (
              <span key={tag} className="font-mono text-[9px] px-2 py-0.5 border border-[var(--color-border)] text-[var(--color-muted)]">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Publications */}
      <div className="panel-acrylic p-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="font-mono text-[9px] text-[var(--color-muted)] font-bold tracking-widest">PUBLICATIONS &amp; SUBMISSIONS</span>
          <div className="flex-1 h-px bg-[var(--color-border)]" />
          <span className="font-mono text-[10px] text-[var(--color-muted)]">00</span>
        </div>
        <div className="flex items-center justify-center py-12 text-center">
          <div>
            <p className="font-mono text-xs text-[var(--color-muted)] tracking-widest uppercase">No publications yet</p>
            <p className="font-mono text-[10px] text-[var(--color-muted)]/50 mt-1">Papers and conference submissions will appear here</p>
          </div>
        </div>
      </div>
    </div>
  )
}
