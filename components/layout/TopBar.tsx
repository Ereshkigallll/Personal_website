'use client'

import StatusDot from './StatusDot'

export default function TopBar() {
  return (
    <>
      {/* Breadcrumb — spans from sidebar to right edge */}
      <header
        className="fixed top-0 right-0 z-30 flex items-center px-8 h-[var(--topbar-height)] pointer-events-none"
        style={{ left: 'var(--sidebar-width)' }}
      >
        <p className="font-mono text-xs font-bold tracking-widest uppercase opacity-40 select-none">
          Portfolio <span className="mx-2">//</span> HR Department
        </p>
      </header>

      {/* Status controls — independently anchored to top-right, never moves */}
      <div className="fixed top-0 right-0 z-40 flex items-center gap-3 px-8 h-[var(--topbar-height)] pointer-events-auto">
        <div className="flex items-center gap-2 px-3 py-1 bg-[var(--color-surface)]/60 backdrop-blur border border-[var(--color-border)] rounded-full">
          <StatusDot color="green" label="CONNECTED" />
        </div>

        <button
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          onClick={() => document.documentElement.classList.toggle('dark')}
          aria-label="Toggle dark mode"
        >
          <span className="text-[var(--color-muted)] text-sm select-none">◐</span>
        </button>
      </div>
    </>
  )
}
