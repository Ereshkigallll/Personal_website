'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'
import { useBootDone } from '@/lib/boot-context'
import { useExperienceEntry } from '@/components/layout/ExperienceEntry'

export type TimelineIntroMode = 'pending' | 'play' | 'complete'
type Stage = 'waiting' | 'drawing' | 'indexing' | 'locking' | 'complete'

export function useTimelineIntro({ mode, geometryReady, markerRef, count, onComplete }: {
  mode: TimelineIntroMode
  geometryReady: boolean
  markerRef: RefObject<HTMLSpanElement>
  count: number
  onComplete: () => void
}) {
  const { bootDone } = useBootDone()
  const { arriveAt, arrived } = useExperienceEntry()
  const [stage, setStage] = useState<Stage>('waiting')
  const [indexed, setIndexed] = useState(0)
  const reported = useRef(false)

  useEffect(() => {
    if (mode !== 'play' || !bootDone || !geometryReady || reported.current) return
    const frame = requestAnimationFrame(() => {
      const rect = markerRef.current?.getBoundingClientRect()
      if (!rect) return
      reported.current = true
      arriveAt({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
    })
    return () => cancelAnimationFrame(frame)
  }, [mode, bootDone, geometryReady, markerRef, arriveAt])

  useEffect(() => {
    if (mode !== 'play' || !bootDone || !arrived) return
    setStage('drawing')
    const timers = [
      setTimeout(() => setStage('indexing'), 520),
      setTimeout(() => setStage('locking'), 1120),
      setTimeout(onComplete, 1880),
      ...Array.from({ length: count }, (_, index) => setTimeout(() => setIndexed(index + 1), 560 + index * (480 / Math.max(1, count)))),
    ]
    return () => timers.forEach(clearTimeout)
  }, [mode, bootDone, arrived, count, onComplete])

  useEffect(() => {
    if (mode !== 'play') return
    const skip = () => onComplete()
    window.addEventListener('wheel', skip, { passive: true, capture: true })
    window.addEventListener('pointerdown', skip, { passive: true, capture: true })
    window.addEventListener('keydown', skip, { capture: true })
    window.addEventListener('resize', skip)
    return () => {
      window.removeEventListener('wheel', skip, true)
      window.removeEventListener('pointerdown', skip, true)
      window.removeEventListener('keydown', skip, true)
      window.removeEventListener('resize', skip)
    }
  }, [mode, onComplete])

  return {
    stage: mode === 'complete' ? 'complete' : stage,
    active: mode === 'play' && stage !== 'waiting' && stage !== 'complete',
    indexed,
  }
}
