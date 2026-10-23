'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode, type RefObject } from 'react'
import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'

const STORAGE_KEY = 'experience-entry-played-v1'
type Point = { x: number; y: number }
type Bridge = { origin: Point & { width: number; height: number }; contracted: boolean; target?: Point }

type EntryContext = {
  sourceRef: RefObject<HTMLDivElement>
  departing: boolean
  arrived: boolean
  enterFromProfile: (event: MouseEvent<HTMLAnchorElement>) => void
  claimIntro: (allowed: boolean) => boolean
  arriveAt: (point: Point) => void
  finishEntry: () => void
}

const Context = createContext<EntryContext | null>(null)

export function ExperienceEntryProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const sourceRef = useRef<HTMLDivElement>(null)
  const seenRef = useRef(false)
  const pathRef = useRef(pathname)
  const bridgeRef = useRef<Bridge | null>(null)
  const [bridge, setBridge] = useState<Bridge | null>(null)
  const [arrived, setArrived] = useState(false)

  const updateBridge = useCallback((next: Bridge | null) => {
    bridgeRef.current = next
    setBridge(next)
  }, [])

  const hasPlayed = useCallback(() => {
    try { return seenRef.current || sessionStorage.getItem(STORAGE_KEY) === '1' } catch { return seenRef.current }
  }, [])

  const finishEntry = useCallback(() => {
    updateBridge(null)
    setArrived(true)
  }, [updateBridge])

  const claimIntro = useCallback((allowed: boolean) => {
    const play = allowed && !hasPlayed() && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    seenRef.current = true
    try { sessionStorage.setItem(STORAGE_KEY, '1') } catch { /* Keep the once-per-visit rule in memory. */ }
    return play
  }, [hasPlayed])

  const enterFromProfile = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/profile' || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || hasPlayed() || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (sourceRef.current?.dataset.entrySourceReady !== 'true') return
    const rect = sourceRef.current.getBoundingClientRect()
    if (!rect || rect.top < 0 || rect.bottom > window.innerHeight) return
    event.preventDefault()
    if (bridgeRef.current) return
    setArrived(false)
    updateBridge({ origin: { x: rect.left, y: rect.top, width: rect.width, height: rect.height }, contracted: false })
  }, [pathname, hasPlayed, updateBridge])

  const arriveAt = useCallback((point: Point) => {
    const current = bridgeRef.current
    if (current && point.y >= 0 && point.y <= window.innerHeight) {
      updateBridge({ ...current, target: point })
    } else {
      finishEntry()
    }
  }, [updateBridge, finishEntry])

  // Navigation away cancels the handoff, including Back during the short flight.
  useEffect(() => {
    pathRef.current = pathname
    if (pathname !== '/experience') {
      updateBridge(null)
      setArrived(false)
    }
  }, [pathname, updateBridge])

  useEffect(() => {
    if (!bridge) return
    // A cancelled or slow navigation must never leave the profile faded away.
    const timeout = setTimeout(finishEntry, 2200)
    return () => clearTimeout(timeout)
  }, [bridge, finishEntry])

  const value = useMemo(() => ({
    sourceRef, departing: pathname === '/profile' && bridge !== null,
    arrived, enterFromProfile, claimIntro, arriveAt, finishEntry,
  }), [pathname, bridge, arrived, enterFromProfile, claimIntro, arriveAt, finishEntry])

  return (
    <Context.Provider value={value}>
      {children}
      {bridge && <motion.div
        data-experience-bridge="true"
        aria-hidden="true"
        className="fixed z-[60] pointer-events-none bg-[var(--color-accent)]"
        style={{ boxShadow: '0 0 18px color-mix(in srgb, var(--color-accent) 45%, transparent)' }}
        initial={{ left: bridge.origin.x, top: bridge.origin.y, width: bridge.origin.width, height: bridge.origin.height }}
        animate={{
          left: bridge.target ? bridge.target.x - 4 : bridge.origin.x + bridge.origin.width / 2 - 4,
          top: bridge.target ? bridge.target.y - 4 : bridge.origin.y + bridge.origin.height / 2 - 4,
          width: 8, height: 8,
        }}
        transition={{ duration: bridge.target ? .34 : .2, ease: [.22, 1, .36, 1] }}
        onAnimationComplete={() => {
          const current = bridgeRef.current
          if (!current) return
          if (current.target) finishEntry()
          else if (!current.contracted && pathRef.current === '/profile') {
            updateBridge({ ...current, contracted: true })
            router.push('/experience')
          }
        }}
      />}
    </Context.Provider>
  )
}

export function useExperienceEntry() {
  const context = useContext(Context)
  if (!context) throw new Error('Experience entry requires its provider')
  return context
}
