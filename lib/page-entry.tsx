'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { useBootDone } from './boot-context'

export type PageEntryId = 'profile' | 'experience' | 'research' | 'projects' | 'database' | 'logs' | 'contact'
export type PageEntryMode = 'pending' | 'play' | 'complete'

type EntryRegistry = {
  hasEntered: (page: PageEntryId) => boolean
  claimFirstEntry: (page: PageEntryId) => boolean
}

const Context = createContext<EntryRegistry | null>(null)

export function PageEntryProvider({ children }: { children: ReactNode }) {
  // The root layout survives client navigation. A full reload starts a new visit.
  // No persistent flags: an old research visit must not suppress a new session.
  const visited = useRef(new Set<PageEntryId>())
  const hasEntered = useCallback((page: PageEntryId) => visited.current.has(page), [])
  const claimFirstEntry = useCallback((page: PageEntryId) => {
    if (visited.current.has(page)) return false
    visited.current.add(page)
    return true
  }, [])
  const registry = useMemo(() => ({ hasEntered, claimFirstEntry }), [hasEntered, claimFirstEntry])
  return <Context.Provider value={registry}>{children}</Context.Provider>
}

export function useEntryRegistry() {
  const context = useContext(Context)
  if (!context) throw new Error('Page entries require PageEntryProvider')
  return context
}

export function usePageEntry(page: PageEntryId, duration?: number) {
  const { bootDone } = useBootDone()
  const { claimFirstEntry } = useEntryRegistry()
  const pathname = usePathname()
  const [mode, setMode] = useState<PageEntryMode>('pending')
  const decision = useRef<boolean | null>(null)
  const isCurrentPage = pathname === `/${page}`
  const finish = useCallback(() => setMode('complete'), [])

  useEffect(() => {
    // Claim only after boot and an actual route mount, never during prefetch.
    // Keep the decision across Strict Mode's effect replay.
    if (!bootDone || !isCurrentPage || decision.current !== null) return
    const firstEntry = claimFirstEntry(page)
    decision.current = firstEntry && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setMode(decision.current ? 'play' : 'complete')
  }, [bootDone, isCurrentPage, page, claimFirstEntry])

  useEffect(() => {
    if (mode !== 'play' || !isCurrentPage || duration === undefined) return
    const timer = setTimeout(finish, duration)
    return () => clearTimeout(timer)
  }, [mode, isCurrentPage, duration, finish])

  return { mode, finish, played: decision.current === true }
}
