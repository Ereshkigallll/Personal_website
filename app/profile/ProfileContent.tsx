'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'
import Link from 'next/link'
import { Database, ArrowRight } from 'lucide-react'
import { profile } from '@/content/profile'
import { projects } from '@/content/projects'
import { useLanguage } from '@/lib/language'
import { useBootDone } from '@/lib/boot-context'

/* ── Types & constants ─────────────────────────────────────────────── */
type Phase = 'expanding' | 'decrypting' | 'complete' | 'revealed'
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%<>[]|#*'
const SESSION_KEY    = 'profile-intro-played'

/* ── useScramble ────────────────────────────────────────────────────── */
function useScramble(target: string, active: boolean, startDelay = 0): string {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    if (!active) {
      setDisplay(target)
      return
    }

    // Immediately show fully-scrambled version (no blank flash)
    setDisplay(
      target.split('').map(c =>
        /[\s/·—.,:()\-]/.test(c) ? c : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      ).join('')
    )

    let frame = 0
    let intervalId: ReturnType<typeof setInterval>

    const timerId = setTimeout(() => {
      intervalId = setInterval(() => {
        const locked = Math.floor(frame / 2)
        if (locked >= target.length) {
          clearInterval(intervalId)
          setDisplay(target)
          return
        }
        setDisplay(
          target.split('').map((c, i) => {
            if (i < locked) return c
            if (/[\s/·—.,:()\-]/.test(c)) return c
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          }).join('')
        )
        frame++
      }, 40)
    }, startDelay)

    return () => { clearTimeout(timerId); clearInterval(intervalId) }
  }, [active, target, startDelay])

  return display
}

/* ── Live Network Metric ───────────────────────────────────────────── */
const INITIAL_BARS = [60, 100, 80, 140, 60, 40, 100, 120]

function NetworkMetric({ label }: { label: string }) {
  const [bars, setBars] = useState(INITIAL_BARS)
  const ms = useMotionValue(INITIAL_BARS[INITIAL_BARS.length - 1])
  const displayMs = useTransform(ms, v => `${Math.round(v)}ms`)

  useEffect(() => {
    const tick = () => {
      const next = Math.min(
        195,
        Math.round(30 + Math.random() * 130 + (Math.random() < 0.12 ? Math.random() * 50 : 0))
      )
      animate(ms, next, { duration: 0.45, ease: 'easeOut' })
      setBars(prev => [...prev.slice(1), next])
    }
    const id = setInterval(tick, 1600)
    return () => clearInterval(id)
  }, [ms])

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
      <div className="flex justify-between items-end mb-2">
        <span className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-wider">
          {label}
        </span>
        <motion.span className="font-mono text-xs font-bold text-[var(--color-accent)]">
          {displayMs}
        </motion.span>
      </div>
      <div className="flex items-end gap-[3px] h-8">
        {bars.map((v, i) => (
          <div
            key={i}
            className="w-1 rounded-sm transition-all duration-500 ease-out"
            style={{
              height: `${Math.max(4, Math.round((v / 200) * 28))}px`,
              backgroundColor: i === bars.length - 1
                ? 'var(--color-accent)'
                : 'var(--color-border)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Profile Page ──────────────────────────────────────────────────── */
export default function ProfileContent() {
  const { t } = useLanguage()
  const { bootDone } = useBootDone()

  /* ── Animation phase state ── */
  const [phase, setPhase]       = useState<Phase>('expanding')
  const [skipAnim, setSkipAnim] = useState(false)
  const [ready, setReady]       = useState(false) // true only after boot screen finishes

  // If bootDone is false at mount → boot screen is playing → we must wait & always animate
  // If bootDone is true  at mount → SPA navigation back → may skip if already seen
  const bootScreenWasShown = useRef(!bootDone)

  useEffect(() => {
    // SPA navigation back to profile (no boot screen) + already seen → skip animation
    if (!bootScreenWasShown.current && sessionStorage.getItem(SESSION_KEY) === '1') {
      setSkipAnim(true)
      setPhase('revealed')
      setReady(true)
      return
    }

    // Wait for boot screen to fully finish before starting card animation
    if (!bootDone) return

    // Boot screen just finished → always play the decrypt animation
    setReady(true)
    const t1 = setTimeout(() => setPhase('decrypting'), 600)
    const t2 = setTimeout(() => setPhase('complete'),   2400)
    const t3 = setTimeout(() => {
      setPhase('revealed')
      sessionStorage.setItem(SESSION_KEY, '1')
    }, 3100)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [bootDone])

  /* ── Scramble hooks (only active during decrypting) ── */
  const isDecrypting    = phase === 'decrypting'
  const scrambledId     = useScramble(profile.id,                    isDecrypting,   0)
  const scrambledName   = useScramble(profile.name,                  isDecrypting, 150)
  const scrambledDept   = useScramble('HCI RESEARCH & ENGINEERING',  isDecrypting, 350)
  const scrambledLevel  = useScramble('LEVEL 5 — CLASSIFIED',        isDecrypting, 600)

  /* ── Decrypt progress bar ── */
  const pct        = useMotionValue(0)
  const displayPct = useTransform(pct, v => `${Math.round(v)}%`)
  const barWidth   = useTransform(pct, v => `${v}%`)

  useEffect(() => {
    if (phase === 'decrypting') {
      animate(pct, 100, { duration: 1.8, ease: 'linear' })
    }
  }, [phase, pct])

  /* ── Active projects ── */
  const activeProjects = profile.activeProjects.map(ap => {
    const project = projects.find(p => p.slug === ap.slug)
    return {
      key:   ap.key,
      title: project?.title ?? ap.slug,
      sub:   t(ap.sub.en, ap.sub.zh),
      slug:  ap.slug,
    }
  })

  const revealed = phase === 'revealed'

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        style={{ transformOrigin: 'center center' }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={ready ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
        transition={{ duration: skipAnim ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="panel-acrylic rounded-none grid grid-cols-1 lg:grid-cols-12 overflow-hidden min-h-[520px] relative">

          {/* ── Decrypt overlay ── */}
          <AnimatePresence>
            {!revealed && (
              <motion.div
                key="overlay"
                className="absolute inset-0 z-20 flex items-center justify-center bg-[var(--color-bg)]/95 backdrop-blur-sm"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <AnimatePresence mode="wait">

                  {/* Phase: expanding — minimal pulse */}
                  {phase === 'expanding' && (
                    <motion.div
                      key="expanding"
                      className="flex flex-col items-center gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] animate-breathe" />
                      <span className="font-mono text-[9px] text-[var(--color-muted)] uppercase tracking-widest">
                        Initialising...
                      </span>
                    </motion.div>
                  )}

                  {/* Phase: decrypting — scramble fields */}
                  {phase === 'decrypting' && (
                    <motion.div
                      key="decrypting"
                      className="w-full max-w-xs px-8 font-mono"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Header */}
                      <div className="flex items-center gap-2 mb-5">
                        <span className="w-1.5 h-1.5 bg-[var(--color-accent)] animate-breathe shrink-0" />
                        <span className="text-[9px] uppercase tracking-widest text-[var(--color-accent)]">
                          Accessing Secure Database
                        </span>
                        <span className="text-[var(--color-accent)] animate-pulse ml-0.5">█</span>
                      </div>

                      {/* Progress */}
                      <div className="mb-5">
                        <div className="flex justify-between text-[9px] text-[var(--color-muted)] mb-1.5">
                          <span>Decrypting Identity Record</span>
                          <motion.span className="text-[var(--color-accent)]">{displayPct}</motion.span>
                        </div>
                        <div className="w-full h-[2px] bg-[var(--color-border)] overflow-hidden">
                          <motion.div className="h-full bg-[var(--color-accent)]" style={{ width: barWidth }} />
                        </div>
                      </div>

                      {/* Scramble fields */}
                      <div className="border border-[var(--color-border)] divide-y divide-[var(--color-border)]">
                        {[
                          { label: 'ENTITY_ID', value: scrambledId    },
                          { label: 'NAME',      value: scrambledName  },
                          { label: 'DEPT',      value: scrambledDept  },
                          { label: 'CLEARANCE', value: scrambledLevel },
                        ].map(({ label, value }) => (
                          <div key={label} className="flex gap-3 px-3 py-2">
                            <span className="text-[9px] text-[var(--color-muted)] w-20 shrink-0">{label}</span>
                            <span className="text-[9px] font-bold text-[var(--color-text)] truncate">{value || '—'}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Phase: complete — IDENTITY VERIFIED badge */}
                  {phase === 'complete' && (
                    <motion.div
                      key="complete"
                      className="flex flex-col items-center gap-3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: [0.95, 1.02, 1] }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-px w-10 bg-[var(--color-accent)]" />
                        <span className="font-mono text-[10px] text-[var(--color-muted)]">◆</span>
                        <div className="h-px w-10 bg-[var(--color-accent)]" />
                      </div>
                      <span
                        className="font-mono text-xl font-bold tracking-[0.2em] text-[var(--color-accent)]"
                        style={{ textShadow: '0 0 18px rgba(127,255,0,0.55), 0 0 40px rgba(127,255,0,0.2)' }}
                      >
                        IDENTITY VERIFIED
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="h-px w-10 bg-[var(--color-accent)]" />
                        <span className="font-mono text-[10px] text-[var(--color-muted)]">◆</span>
                        <div className="h-px w-10 bg-[var(--color-accent)]" />
                      </div>
                      <span className="font-mono text-[9px] text-[var(--color-muted)] tracking-widest uppercase mt-1">
                        Clearance Level 5 — Access Granted
                      </span>
                    </motion.div>
                  )}

                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Left: Identity ── */}
          <div
            className={`lg:col-span-7 p-10 md:p-12 border-b lg:border-b-0 lg:border-r border-[var(--color-border)] flex flex-col justify-between relative transition-opacity duration-500 ${revealed ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Corner bracket */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[var(--color-text)] opacity-10 pointer-events-none" />

            <div>
              {/* ID badge */}
              <div className="inline-flex items-center gap-2 mb-8 border border-[var(--color-border)] px-2 py-1 bg-[var(--color-surface)]/50">
                <svg className="w-3.5 h-3.5 text-[var(--color-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="8" y1="10" x2="8" y2="10"/><line x1="12" y1="10" x2="16" y2="10"/><line x1="12" y1="14" x2="16" y2="14"/>
                </svg>
                <span className="font-mono text-[10px] tracking-widest font-bold">{profile.id}</span>
              </div>

              {/* Name */}
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-2">
                {profile.name}
              </h1>
              {/* Accent underline */}
              <div className="h-1 w-24 bg-[var(--color-accent)] mb-6" />

              {/* Department */}
              <div className="space-y-1 mb-6">
                <p className="font-mono text-xs text-[var(--color-muted)] uppercase tracking-wider">
                  {t('Department', '部门')}
                </p>
                <p className="text-xl font-semibold tracking-tight">
                  {t(profile.department.en, profile.department.zh)}
                </p>
              </div>

              {/* Specialization */}
              <div className="space-y-1">
                <p className="font-mono text-xs text-[var(--color-muted)] uppercase tracking-wider">
                  {t('Specialisation', '专业方向')}
                </p>
                <p className="text-lg font-light text-[var(--color-text)]">
                  {t(profile.specialization.en, profile.specialization.zh)}
                </p>
              </div>

              {/* Bio quote */}
              <div className="mt-10 p-4 bg-[var(--color-bg)]/70 border-l-2 border-[var(--color-accent)]">
                <p className="font-mono text-[10px] leading-relaxed text-[var(--color-muted)] max-w-xs">
                  "{t(profile.bio.en, profile.bio.zh)}"
                </p>
              </div>
            </div>

            {/* Bottom: clearance + availability */}
            <div className="mt-10 flex items-center gap-8">
              <div>
                <p className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-wider mb-1">
                  {t('Clearance', '权限级别')}
                </p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold font-mono tracking-tight">
                    Lvl.{profile.clearanceLevel}
                  </span>
                  <span className="font-mono text-[10px] bg-[var(--color-accent)] text-black px-1.5 py-0.5 font-bold tracking-wider">
                    {t('GRANTED', '已授权')}
                  </span>
                </div>
              </div>
              <div>
                <p className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-wider mb-1">
                  {t('Availability', '状态')}
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-breathe shrink-0" />
                  <span className="text-sm font-bold font-mono uppercase tracking-wide">
                    {t(profile.statusLabel.en, profile.statusLabel.zh)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Active Projects + System Metrics ── */}
          <div
            className={`lg:col-span-5 bg-[var(--color-bg)]/40 p-8 md:p-10 flex flex-col gap-6 relative transition-opacity duration-500 ${revealed ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Active Projects */}
            <div>
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest border-b border-[var(--color-border)] pb-3 mb-5 flex justify-between items-center">
                <span>{t('Active Projects', '活跃项目')}</span>
                <span className="text-[10px] text-[var(--color-muted)] tabular-nums">
                  {String(activeProjects.length).padStart(2, '0')}
                </span>
              </h2>

              <ul className="space-y-2.5">
                {activeProjects.map(({ key, title, sub, slug }) => (
                  <li key={key} className="group transform transition-transform hover:translate-x-1">
                    <Link href={`/projects/${slug}`}>
                      <div className="clip-key bg-[var(--color-surface)] border border-[var(--color-border)] group-hover:border-[var(--color-accent)]/50 group-hover:shadow-key-glow p-3 flex items-center justify-between relative overflow-hidden transition-all">
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
                      <span className="font-mono text-xs font-bold tracking-widest text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                        {t('ENTER DATABASE', '进入数据库')}
                      </span>
                    </div>
                  </button>
                </Link>
              </div>
            </div>

            {/* System Metrics */}
            <div className="mt-auto">
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest border-b border-[var(--color-border)] pb-3 mb-5">
                {t('System Metrics', '系统状态')}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <NetworkMetric label={t('Network', '网络')} />
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-wider">
                      {t('Energy', '能量')}
                    </span>
                    <span className="font-mono text-xs font-bold text-[var(--color-accent)]">98%</span>
                  </div>
                  <div className="w-full bg-[var(--color-border)] h-1.5 mt-4 overflow-hidden">
                    <div className="bg-[var(--color-text)] h-full" style={{ width: '98%' }} />
                  </div>
                  <div className="mt-2 font-mono text-[9px] text-[var(--color-muted)] text-right tracking-widest">
                    {t('STABLE', '稳定')}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom-right corner accent */}
            <div className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-[var(--color-accent)] opacity-80" />
          </div>

        </div>
      </motion.div>
    </div>
  )
}
