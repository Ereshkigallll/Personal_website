import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Profile — Portfolio',
}

export default function ProfilePage() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Main card grid */}
      <div className="panel-acrylic rounded-none grid grid-cols-1 lg:grid-cols-12 min-h-[520px] overflow-hidden">

        {/* ── Left: Identity ── */}
        <div className="lg:col-span-7 p-10 border-b lg:border-b-0 lg:border-r border-[var(--color-border)] flex flex-col justify-between relative">
          {/* Corner accent */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[var(--color-text)] opacity-10" />

          <div>
            {/* ID badge */}
            <div className="inline-flex items-center gap-2 mb-8 border border-[var(--color-border)] px-2 py-1 bg-[var(--color-surface)]/50">
              <span className="font-mono text-[10px] tracking-widest font-bold text-[var(--color-muted)]">▣</span>
              <span className="font-mono text-[10px] tracking-widest font-bold">DEV-001-A</span>
            </div>

            {/* Name */}
            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-2 leading-none">
              YOUR NAME
            </h1>
            <div className="h-1 w-20 bg-[var(--color-accent)] mb-6" />

            {/* Department */}
            <div className="space-y-1 mb-8">
              <p className="font-mono text-xs text-[var(--color-muted)] uppercase tracking-wider">Department</p>
              <p className="text-xl font-medium tracking-tight">HCI RESEARCH &amp; ENGINEERING</p>
            </div>

            {/* Specialization */}
            <div className="space-y-1">
              <p className="font-mono text-xs text-[var(--color-muted)] uppercase tracking-wider">Specialization</p>
              <p className="text-lg font-light">VR / Robotics / IoT Systems</p>
            </div>

            {/* Bio quote */}
            <div className="mt-10 p-4 bg-[var(--color-bg)]/60 border-l-2 border-[var(--color-accent)]">
              <p className="font-mono text-[10px] leading-relaxed text-[var(--color-muted)] w-3/4">
                "Building at the intersection of physical and digital — from haptic feedback systems to autonomous robots."
              </p>
            </div>
          </div>

          {/* Bottom: clearance + availability */}
          <div className="mt-10 flex items-center gap-8">
            <div>
              <p className="font-mono text-[10px] text-[var(--color-muted)] uppercase mb-1">Clearance</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-bold font-mono">Lvl.5</span>
                <span className="text-[10px] bg-[var(--color-accent)] text-black px-1 font-bold tracking-wide">GRANTED</span>
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] text-[var(--color-muted)] uppercase mb-1">Availability</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-breathe" />
                <span className="text-sm font-bold font-mono uppercase">Open for Work</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Active Projects + Metrics ── */}
        <div className="lg:col-span-5 bg-[var(--color-bg)]/30 p-10 flex flex-col gap-6 relative">

          {/* Active Projects */}
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest border-b border-[var(--color-border)] pb-3 mb-5 flex justify-between items-center">
              <span>Active Projects</span>
              <span className="text-[10px] text-[var(--color-muted)]">03</span>
            </h2>

            <ul className="space-y-3">
              {[
                { key: 'KEY_01', title: 'VR Haptic Research',     sub: 'PhD — In Progress'      },
                { key: 'KEY_02', title: 'Autonomous Robot Arm',   sub: 'Robotics — Active'      },
                { key: 'KEY_03', title: 'IoT Smart Environment',  sub: 'ESP32 / Flutter'        },
              ].map(({ key, title, sub }) => (
                <li key={key} className="group cursor-pointer transform transition-all hover:translate-x-1">
                  <Link href="/projects">
                    <div className="clip-key bg-[var(--color-surface)] border border-[var(--color-border)] group-hover:border-[var(--color-accent)]/50 group-hover:shadow-key-glow p-3 flex items-center justify-between relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--color-border)] group-hover:bg-[var(--color-accent)] transition-colors" />
                      <div className="pl-2">
                        <span className="font-mono text-[9px] text-[var(--color-muted)] group-hover:text-[var(--color-accent)] block mb-0.5">{key}</span>
                        <span className="font-bold text-sm block">{title}</span>
                        <span className="font-mono text-[9px] text-[var(--color-muted)] mt-0.5 block">{sub}</span>
                      </div>
                      <span className="text-[var(--color-muted)] group-hover:text-[var(--color-accent)] transition-colors text-lg">→</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <Link href="/database">
                <button className="w-full group relative overflow-hidden bg-black/5 dark:bg-white/5 border border-[var(--color-accent)]/40 hover:border-[var(--color-accent)] transition-all duration-300 py-3 px-4 hover:shadow-btn-glow">
                  <div className="absolute inset-0 bg-[var(--color-accent)]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <div className="relative flex items-center justify-center gap-3">
                    <span className="font-mono text-xs font-bold tracking-widest">⊞ ENTER DATABASE</span>
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
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-mono text-[10px] text-[var(--color-muted)]">NETWORK</span>
                  <span className="font-mono text-xs font-bold text-[var(--color-accent)]">120ms</span>
                </div>
                <div className="flex items-end gap-[2px] h-8">
                  {[3, 5, 4, 7, 3, 2, 5, 6].map((h, i) => (
                    <div
                      key={i}
                      className={`w-1 ${i === 3 || i === 7 ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'}`}
                      style={{ height: `${h * 4}px` }}
                    />
                  ))}
                </div>
              </div>
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-mono text-[10px] text-[var(--color-muted)]">ENERGY</span>
                  <span className="font-mono text-xs font-bold text-[var(--color-accent)]">98%</span>
                </div>
                <div className="w-full bg-[var(--color-border)] h-1.5 mt-4 overflow-hidden">
                  <div className="bg-[var(--color-text)] dark:bg-white h-full" style={{ width: '98%' }} />
                </div>
                <div className="mt-2 font-mono text-[9px] text-[var(--color-muted)] text-right">STABLE</div>
              </div>
            </div>
          </div>

          {/* Corner accent */}
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[var(--color-accent)] opacity-80" />
        </div>
      </div>
    </div>
  )
}
