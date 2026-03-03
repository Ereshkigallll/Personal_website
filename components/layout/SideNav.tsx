'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutGrid,
  Database,
  FolderOpen,
  FlaskConical,
  Terminal,
  Send,
} from 'lucide-react'

const navItems = [
  { href: '/profile',   icon: LayoutGrid,   label: 'PROFILE'      },
  { href: '/research',  icon: FlaskConical,  label: 'RESEARCH'     },
  { href: '/projects',  icon: FolderOpen,    label: 'PROJECTS'     },
  { href: '/database',  icon: Database,      label: 'DATABASE'     },
  { href: '/logs',      icon: Terminal,      label: 'SYSTEM_LOGS'  },
  { href: '/contact',   icon: Send,          label: 'CONTACT'      },
]

export default function SideNav() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 flex flex-col w-[var(--sidebar-width)] h-screen border-r border-[var(--color-border)] bg-[var(--color-surface)]/60 backdrop-blur-sm">
      {/* Logo */}
      <div className="flex flex-col items-center pt-7 pb-4">
        <div className="w-9 h-9 bg-[var(--color-text)] flex items-center justify-center">
          <span className="text-[var(--color-bg)] font-mono font-bold text-sm">Y</span>
        </div>
        <div className="w-px h-8 bg-[var(--color-border)] mt-3" />
      </div>

      {/* Nav items */}
      <nav className="flex-1 flex flex-col items-center gap-6 py-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className="group relative flex flex-col items-center w-full"
              title={label}
            >
              {/* Active indicator */}
              {active && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-[var(--color-accent)] rounded-l-sm" />
              )}

              <div
                className={`
                  w-10 h-10 flex items-center justify-center rounded-lg transition-colors
                  ${active
                    ? 'bg-[var(--color-accent)]/15 text-[var(--color-accent)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-black/5 dark:hover:bg-white/10'}
                `}
              >
                <Icon size={20} strokeWidth={1.5} />
              </div>

              {/* Tooltip */}
              <span className="
                pointer-events-none absolute left-full ml-3 px-2 py-1
                bg-[var(--color-text)] text-[var(--color-bg)]
                font-mono text-[9px] font-bold tracking-widest whitespace-nowrap rounded
                opacity-0 group-hover:opacity-100 transition-opacity
              ">
                {label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Version */}
      <div className="flex flex-col items-center pb-6 gap-3">
        <div className="w-px h-10 bg-[var(--color-border)]" />
        <span
          className="font-mono text-[8px] text-[var(--color-muted)] select-none"
          style={{ writingMode: 'vertical-rl' }}
        >
          V.0.1.0
        </span>
      </div>
    </aside>
  )
}
