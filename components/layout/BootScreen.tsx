'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

/* ─── Status labels that cycle as progress increases ─── */
const STATUS_STEPS = [
  { at: 0,  label: 'LOADING MODULES...'        },
  { at: 32, label: 'ESTABLISHING CONNECTION...' }, // fires at the stall
  { at: 38, label: 'RENDERING INTERFACE...'     }, // fires when burst begins
  { at: 94, label: 'SYSTEM READY'               },
]

/* ─── Shared panel frosted-glass style ─── */
const PANEL_STYLE: React.CSSProperties = {
  backdropFilter:       'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  backgroundColor:      'rgba(10, 10, 12, 0.82)',
}

/* ─── Grid overlay that echoes the site background ─── */
const GRID_STYLE: React.CSSProperties = {
  position:        'absolute',
  inset:           0,
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),' +
    'linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
  backgroundSize:  '32px 32px',
  pointerEvents:   'none',
}

/* ─── Easing curves ─── */
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]
const EASE_SPLIT:    [number, number, number, number] = [0.76, 0, 0.24, 1]

export default function BootScreen() {
  const [phase, setPhase]             = useState<'loading' | 'authorised' | 'splitting' | 'done'>('loading')
  const [displayProgress, setDisplay] = useState(0)
  const [complete, setComplete]       = useState(false)

  /* MotionValues for smooth bar animation without re-renders */
  const progress  = useMotionValue(0)
  const leftFill  = useTransform(progress, [0, 100], ['0%', '50%'])
  const rightFill = useTransform(progress, [0, 100], ['0%', '50%'])

  useEffect(() => {
    /* Subscribe once; fires on every frame from framer-motion */
    const unsub = progress.on('change', v => {
      const rounded = Math.round(v)
      setDisplay(rounded)
      if (rounded >= 100) setComplete(true)
    })

    /* 7-stage progress — realistic stall around 32%, then burst recovery */
    animate(progress,  10, { duration: 0.15, ease: 'easeOut'                    }) // quick initial tick
      .then(() => animate(progress,  32, { duration: 0.55, ease: 'linear'       })) // steady climb
      .then(() => animate(progress,  37, { duration: 0.90, ease: 'linear'       })) // stall — only 5% in 0.9s
      .then(() => animate(progress,  71, { duration: 0.40, ease: [0.22,1,0.36,1]})) // burst after stall
      .then(() => animate(progress,  88, { duration: 0.40, ease: 'linear'       })) // steady
      .then(() => animate(progress,  94, { duration: 0.40, ease: 'easeInOut'    })) // small hesitation
      .then(() => animate(progress, 100, { duration: 0.20, ease: EASE_OUT_EXPO  })) // done
      .then(() => new Promise<void>(r => setTimeout(r, 180)))   // brief pause at 100%
      .then(() => { setPhase('authorised'); return new Promise<void>(r => setTimeout(r, 850)) })
      .then(() => { setPhase('splitting');  return new Promise<void>(r => setTimeout(r, 1050)) })
      .then(() => setPhase('done'))

    return () => unsub()
  }, [progress])

  if (phase === 'done') return null

  const splitting = phase === 'splitting'

  const statusLabel =
    [...STATUS_STEPS].reverse().find(s => displayProgress >= s.at)?.label ??
    STATUS_STEPS[0].label

  /* Corner bracket helper */
  const brackets = [
    'top-0 left-0 border-t border-l',
    'top-0 right-0 border-t border-r',
    'bottom-0 left-0 border-b border-l',
    'bottom-0 right-0 border-b border-r',
  ]

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">

      {/* ══════════════════════════════════════════
          LEFT PANEL
      ══════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2"
        initial={{ x: 0 }}
        animate={splitting ? { x: '-100%' } : { x: 0 }}
        transition={{ duration: 0.9, ease: EASE_SPLIT }}
        style={PANEL_STYLE}
      >
        <div style={GRID_STYLE} />

        {/* Seam — brightens to accent when 100% reached */}
        <motion.div
          className="absolute inset-y-0 right-0 w-px"
          style={{ background: 'var(--color-accent)' }}
          animate={{ opacity: complete ? 1 : 0.2 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      {/* ══════════════════════════════════════════
          RIGHT PANEL
      ══════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2"
        initial={{ x: 0 }}
        animate={splitting ? { x: '100%' } : { x: 0 }}
        transition={{ duration: 0.9, ease: EASE_SPLIT }}
        style={PANEL_STYLE}
      >
        <div style={GRID_STYLE} />

        <motion.div
          className="absolute inset-y-0 left-0 w-px"
          style={{ background: 'var(--color-accent)' }}
          animate={{ opacity: complete ? 1 : 0.2 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      {/* ══════════════════════════════════════════
          CENTER HUD  (fades out when splitting)
      ══════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
        animate={splitting ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeIn' }}
      >
        {/* ── Logo ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT_EXPO }}
          className="flex flex-col items-center gap-5 mb-12"
        >
          <div
            className="w-14 h-14 flex items-center justify-center"
            style={{ background: 'var(--color-accent)' }}
          >
            <span className="font-mono font-bold text-xl text-black select-none">Y</span>
          </div>
          <p
            className="font-mono text-[11px] tracking-[0.3em] uppercase select-none"
            style={{ color: 'rgba(255,255,255,0.28)' }}
          >
            BOOT SEQUENCE INITIALISED
          </p>
        </motion.div>

        {/* ── Widget container — progress bar & authorised badge share this space ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.35 }}
          className="relative w-80 sm:w-[28rem] select-none"
        >
          {/* Corner brackets — always visible */}
          {brackets.map((cls, i) => (
            <div
              key={i}
              className={`absolute ${cls} w-5 h-5`}
              style={{ borderColor: 'rgba(255,255,255,0.18)' }}
            />
          ))}

          {/* ── Progress bar — fades out when authorised ── */}
          <motion.div
            animate={{ opacity: phase === 'loading' ? 1 : 0, y: phase === 'loading' ? 0 : -6 }}
            transition={{ duration: 0.3 }}
            className="px-8 py-6"
          >
            {/* Track */}
            <div
              className="h-[3px] relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              <motion.div
                className="absolute left-0 top-0 h-full"
                style={{
                  width:      leftFill,
                  background: 'var(--color-accent)',
                  boxShadow:  complete ? '0 0 6px var(--color-accent)' : 'none',
                }}
              />
              <motion.div
                className="absolute right-0 top-0 h-full"
                style={{
                  width:      rightFill,
                  background: 'var(--color-accent)',
                  boxShadow:  complete ? '0 0 6px var(--color-accent)' : 'none',
                }}
              />
            </div>

            {/* Status row */}
            <div className="mt-5 flex items-center justify-between gap-4">
              <span
                className="font-mono text-[11px] tracking-widest truncate"
                style={{ color: 'rgba(255,255,255,0.22)' }}
              >
                {statusLabel}
              </span>
              <span
                className="font-mono text-sm font-bold tabular-nums shrink-0"
                style={{ color: 'var(--color-accent)' }}
              >
                {String(displayProgress).padStart(3, '0')}%
              </span>
            </div>
          </motion.div>

          {/* ── AUTHORISED badge — fades in over the bar ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={
              phase === 'authorised'
                ? { opacity: 1, scale: [0.96, 1.02, 1] }
                : { opacity: 0, scale: 0.96 }
            }
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8"
          >
            {/* Top rule */}
            <div className="flex items-center gap-2.5 w-full">
              <div className="h-px flex-1" style={{ background: 'rgba(163,230,53,0.35)' }} />
              <span className="font-mono text-[9px]" style={{ color: 'rgba(163,230,53,0.5)' }}>◆</span>
              <div className="h-px flex-1" style={{ background: 'rgba(163,230,53,0.35)' }} />
            </div>

            {/* Main word */}
            <p
              className="font-mono font-bold tracking-[0.25em] text-[1.9rem] leading-none"
              style={{
                color:      '#a3e635',
                textShadow: '0 0 18px rgba(163,230,53,0.55), 0 0 40px rgba(163,230,53,0.2)',
              }}
            >
              AUTHORISED
            </p>

            {/* Subtitle */}
            <p
              className="font-mono text-[9px] tracking-[0.18em]"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            >
              CLEARANCE LEVEL 5 — ACCESS GRANTED
            </p>

            {/* Bottom rule */}
            <div className="flex items-center gap-2.5 w-full">
              <div className="h-px flex-1" style={{ background: 'rgba(163,230,53,0.35)' }} />
              <span className="font-mono text-[9px]" style={{ color: 'rgba(163,230,53,0.5)' }}>◆</span>
              <div className="h-px flex-1" style={{ background: 'rgba(163,230,53,0.35)' }} />
            </div>
          </motion.div>

        </motion.div>
      </motion.div>

    </div>
  )
}
