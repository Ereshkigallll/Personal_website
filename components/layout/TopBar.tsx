'use client'

import StatusDot from './StatusDot'
import { useLanguage } from '@/lib/language'

export default function TopBar() {
  const { lang, setLang } = useLanguage()

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

      {/* Status controls — independently anchored to top-right */}
      <div className="fixed top-0 right-0 z-40 flex items-center gap-3 px-8 h-[var(--topbar-height)] pointer-events-auto">

        {/* CONNECTED badge */}
        <div className="flex items-center gap-2 px-3 py-1 bg-[var(--color-surface)]/60 backdrop-blur border border-[var(--color-border)] rounded-full">
          <StatusDot color="green" label="CONNECTED" />
        </div>

        {/* Language toggle — sharp-cornered badge matching terminal aesthetic */}
        <button
          onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
          aria-label="Toggle language"
          className="h-8 px-2.5 flex items-center font-mono text-[10px] font-bold tracking-wider select-none border border-[var(--color-border)] bg-[var(--color-surface)]/60 backdrop-blur text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-150"
        >
          {lang === 'en' ? 'EN' : '中'}
        </button>

        {/* Dark mode toggle */}
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
