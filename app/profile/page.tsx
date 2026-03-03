import type { Metadata } from 'next'
import Link from 'next/link'
import { Database, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Profile — Portfolio',
}

const activeProjects = [
  { key: 'KEY_01', title: 'VR Haptic Research',    sub: 'PhD — In Progress'   },
  { key: 'KEY_02', title: 'Autonomous Robot Arm',  sub: 'Robotics — Active'   },
  { key: 'KEY_03', title: 'IoT Smart Environment', sub: 'ESP32 / Flutter'     },
]

export default function ProfilePage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="panel-acrylic rounded-none grid grid-cols-1 lg:grid-cols-12 overflow-hidden min-h-[520px]">

        {/* ── Left: Identity ── */}
        <div className="lg:col-span-7 p-10 md:p-12 border-b lg:border-b-0 lg:border-r border-[var(--color-border)] flex flex-col justify-between relative">
          {/* Corner bracket */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[var(--color-text)] opacity-10 pointer-events-none" />

          <div>
            {/* ID badge */}
            <div className="inline-flex items-center gap-2 mb-8 border border-[var(--color-border)] px-2 py-1 bg-[var(--color-surface)]/50">
              <svg className="w-3.5 h-3.5 text-[var(--color-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="8" y1="10" x2="8" y2="10"/><line x1="12" y1="10" x2="16" y2="10"/><line x1="12" y1="14" x2="16" y2="14"/>
              </svg>
              <span className="font-mono text-[10px] tracking-widest font-bold">DEV-001-A</span>
            </div>

            {/* Name */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-2">
              YOUR NAME
            </h1>
            {/* Accent underline */}
            <div className="h-1 w-24 bg-[var(--color-accent)] mb-6" />

            {/* Department */}
            <div className="space-y-1 mb-6">
              <p className="font-mono text-xs text-[var(--color-muted)] uppercase tracking-wider">Department</p>
              <p className="text-xl font-semibold tracking-tight">HCI RESEARCH &amp; ENGINEERING</p>
            </div>

            {/* Specialization */}
            <div className="space-y-1">
              <p className="font-mono text-xs text-[var(--color-muted)] uppercase tracking-wider">Specialization</p>
              <p className="text-lg font-light text-[var(--color-text)]">VR / Robotics / IoT Systems</p>
            </div>

            {/* Bio quote */}
            <div className="mt-10 p-4 bg-[var(--color-bg)]/70 border-l-2 border-[var(--color-accent)]">
              <p className="font-mono text-[10px] leading-relaxed text-[var(--color-muted)] max-w-xs">
                "Building at the intersection of physical and digital — from haptic feedback systems to autonomous robots."
              </p>
            </div>
          </div>

          {/* Bottom: clearance + availability */}
          <div className="mt-10 flex items-center gap-8">
            <div>
              <p className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-wider mb-1">Clearance</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-bold font-mono tracking-tight">Lvl.5</span>
                <span className="font-mono text-[10px] bg-[var(--color-accent)] text-black px-1.5 py-0.5 font-bold tracking-wider">GRANTED</span>
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-wider mb-1">Availability</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-breathe shrink-0" />
                <span className="text-sm font-bold font-mono uppercase tracking-wide">Open for Work</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Active Projects + System Metrics ── */}
        <div className="lg:col-span-5 bg-[var(--color-bg)]/40 p-8 md:p-10 flex flex-col gap-6 relative">

          {/* Active Projects */}
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest border-b border-[var(--color-border)] pb-3 mb-5 flex justify-between items-center">
              <span>Active Projects</span>
              <span className="text-[10px] text-[var(--color-muted)] tabular-nums">03</span>
            </h2>

            <ul className="space-y-2.5">
              {activeProjects.map(({ key, title, sub }) => (
                <li key={key} className="group transform transition-transform hover:translate-x-1">
                  <Link href="/projects">
                    <div className="clip-key bg-[var(--color-surface)] border border-[var(--color-border)] group-hover:border-[var(--color-accent)]/50 group-hover:shadow-key-glow p-3 flex items-center justify-between relative overflow-hidden transition-all">
                      {/* Left color bar */}
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--color-border)] group-hover:bg-[var(--color-accent)] transition-colors" />
                      <div className="pl-3">
                        <span className="font-mono text-[9px] text-[var(--color-muted)] group-hover:text-[var(--color-accent)] block mb-0.5 transition-colors">{key}</span>
                        <span className="font-bold text-sm block leading-snug">{title}</span>
                        <span className="font-mono text-[9px] text-[var(--color-muted)] mt-0.5 block">{sub}</span>
                      </div>
                      <ArrowRight size={16} className="shrink-0 text-[var(--color-muted)] group-hover:text-[var(--color-accent)] transition-colors" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Enter Database button */}
            <div className="mt-4">
              <Link href="/database">
                <button className="w-full group relative overflow-hidden border border-[var(--color-accent)]/40 hover:border-[var(--color-accent)] bg-black/5 transition-all duration-300 py-3 px-4 hover:shadow-btn-glow">
                  <div className="absolute inset-0 bg-[var(--color-accent)]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <div className="relative flex items-center justify-center gap-2.5">
                    <Database size={16} className="text-[var(--color-muted)] group-hover:text-[var(--color-accent)] transition-colors" />
                    <span className="font-mono text-xs font-bold tracking-widest text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">ENTER DATABASE</span>
                  </div>
                </button>
              </Link>
            </div>
          </div>

          {/* System Metrics */}
          <div className="mt-auto">
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest border-b border-[var(--color-border)] pb-3 mb-5">
              System Metrics
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {/* Network */}
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-wider">Network</span>
                  <span className="font-mono text-xs font-bold text-[var(--color-accent)]">120ms</span>
                </div>
                <div className="flex items-end gap-[3px] h-8">
                  {[12, 20, 16, 28, 12, 8, 20, 24].map((h, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-sm ${i === 3 || i === 7 ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'}`}
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
              </div>
              {/* Energy */}
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-wider">Energy</span>
                  <span className="font-mono text-xs font-bold text-[var(--color-accent)]">98%</span>
                </div>
                <div className="w-full bg-[var(--color-border)] h-1.5 mt-4 overflow-hidden">
                  <div className="bg-[var(--color-text)] h-full" style={{ width: '98%' }} />
                </div>
                <div className="mt-2 font-mono text-[9px] text-[var(--color-muted)] text-right tracking-widest">STABLE</div>
              </div>
            </div>
          </div>

          {/* Bottom-right corner accent */}
          <div className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-[var(--color-accent)] opacity-80" />
        </div>

      </div>
    </div>
  )
}
