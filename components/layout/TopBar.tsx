'use client'

import StatusDot from './StatusDot'

export default function TopBar() {
  return (
    <header
      className="fixed top-0 right-0 z-30 flex items-center justify-between px-8 h-[var(--topbar-height)]"
      style={{ left: 'var(--sidebar-width)' }}
    >
      {/* Left: breadcrumb */}
      <p className="font-mono text-xs font-bold tracking-widest uppercase opacity-40 select-none">
        Portfolio <span className="mx-2">//</span> HR Department
      </p>

      {/* Right: status + theme toggle */}
      <div className="flex items-center gap-3">
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
    </header>
  )
}
