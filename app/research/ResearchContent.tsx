'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'
import { Download, FlaskConical } from 'lucide-react'
import { researchCategories } from '@/content/research'
import type { Research } from '@/lib/types'
import { useBootDone } from '@/lib/boot-context'
import { useLanguage } from '@/lib/language'

/* ── Types & constants ─────────────────────────────────────────────── */
type Phase = 'verifying' | 'authorized' | 'retrieving' | 'revealed'
const SESSION_KEY = 'research-intro-played'

const VERIFY_CHECKS = [
  { label: 'USER_IDENT', value: 'DEV-001-A', result: 'CONFIRMED' },
  { label: 'SEC_TOKEN',  value: '████████',  result: 'VALID' },
  { label: 'CLEARANCE',  value: 'LEVEL 5',   result: 'GRANTED' },
]

const statusConfig: Record<Research['status'], { label: { en: string; zh: string }; color: string; dot: string }> = {
  'in-progress': { label: { en: 'In Progress',   zh: '进行中' }, color: 'text-[var(--color-accent)]', dot: 'bg-[var(--color-accent)] animate-breathe' },
  'submitted':   { label: { en: 'Under Review',  zh: '评审中' }, color: 'text-yellow-500',            dot: 'bg-yellow-400' },
  'published':   { label: { en: 'Peer Reviewed', zh: '已发表' }, color: 'text-[var(--color-accent)]', dot: 'bg-[var(--color-accent)] animate-breathe' },
}

const dashedBorderStyle = {
  backgroundImage: 'linear-gradient(to right, var(--color-border) 50%, transparent 50%)',
  backgroundPosition: 'top',
  backgroundSize: '8px 1px',
  backgroundRepeat: 'repeat-x',
}

/* ── Count-up stat number ──────────────────────────────────────────── */
function StatNum({ value, active, accent = false }: { value: number; active: boolean; accent?: boolean }) {
  const count   = useMotionValue(0)
  const display = useTransform(count, v => String(Math.round(v)))
  useEffect(() => {
    if (!active) return
    const anim = animate(count, value, { duration: 1.2, ease: [0.22, 1, 0.36, 1] })
    return () => anim.stop()
  }, [active, value, count])
  return (
    <motion.p className={`text-2xl font-bold tabular-nums ${accent ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)]'}`}>
      {display}
    </motion.p>
  )
}

/* ══════════════════════════════════════════════════════════════════════ */
export default function ResearchContent({ items }: { items: Research[] }) {
  const { bootDone } = useBootDone()
  const { t } = useLanguage()
  const activeCount    = items.filter(r => r.status === 'in-progress').length
  const publishedCount = items.filter(r => r.status === 'published').length

  /* Category filter */
  const [activeCategory, setActiveCategory] = useState<string>('ALL')
  const matchesCat = (item: Research, cat: string) =>
    item.tags.some(tag => tag.toLowerCase() === cat.toLowerCase())
  const filteredItems = activeCategory === 'ALL'
    ? items
    : items.filter(item => matchesCat(item, activeCategory))
  const categoryCount = (cat: string) =>
    cat === 'ALL' ? items.length : items.filter(item => matchesCat(item, cat)).length

  /* ── Animation state ── */
  const [phase, setPhase]       = useState<Phase>('verifying')
  const [skipAnim, setSkipAnim] = useState(false)
  const [ready, setReady]       = useState(false)

  const bootScreenWasShown = useRef(!bootDone)

  /* Verify phase: step counter (0 → 3) */
  const [verifyStep, setVerifyStep] = useState(0)

  /* Retrieve phase: loaded entries counter */
  const [loadedEntries, setLoadedEntries] = useState(0)

  /* Retrieve phase: progress bar */
  const pct        = useMotionValue(0)
  const displayPct = useTransform(pct, v => `${Math.round(v)}%`)
  const barWidth   = useTransform(pct, v => `${v}%`)

  /* ── Main phase sequencing ── */
  useEffect(() => {
    if (!bootScreenWasShown.current && sessionStorage.getItem(SESSION_KEY) === '1') {
      setSkipAnim(true)
      setPhase('revealed')
      setReady(true)
      return
    }
    if (!bootDone) return

    setReady(true)
    const t1 = setTimeout(() => setPhase('authorized'),  1300)
    const t2 = setTimeout(() => setPhase('retrieving'),  2100)
    const t3 = setTimeout(() => {
      setPhase('revealed')
      sessionStorage.setItem(SESSION_KEY, '1')
    }, 3800)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [bootDone])

  /* ── Verify steps ── */
  useEffect(() => {
    if (phase !== 'verifying' || !ready) return
    const t1 = setTimeout(() => setVerifyStep(1),  350)
    const t2 = setTimeout(() => setVerifyStep(2),  650)
    const t3 = setTimeout(() => setVerifyStep(3), 1050)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [phase, ready])

  /* ── Retrieve entries ── */
  useEffect(() => {
    if (phase !== 'retrieving') return
    animate(pct, 100, { duration: 1.5, ease: 'linear' })
    const timers = items.map((_, i) =>
      setTimeout(() => setLoadedEntries(i + 1), 200 + i * 350)
    )
    return () => timers.forEach(clearTimeout)
  }, [phase, pct])

  const revealed = phase === 'revealed'

  return (
    <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto relative">

      {/* ══════════════ INTRO ANIMATION OVERLAY ══════════════ */}
      <AnimatePresence>
        {!revealed && ready && (
          <motion.div
            key="research-overlay"
            className="fixed z-20 flex items-center justify-center"
            style={{ top: 0, right: 0, bottom: 0, left: 'var(--sidebar-width)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <AnimatePresence mode="wait">

              {/* ── Phase: Verifying ── */}
              {phase === 'verifying' && (
                <motion.div
                  key="verifying"
                  className="w-full max-w-xs px-6 font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-1.5 h-1.5 bg-[var(--color-accent)] animate-breathe shrink-0" />
                    <span className="text-[9px] uppercase tracking-widest text-[var(--color-accent)]">
                      Clearance Verification
                    </span>
                    <span className="text-[var(--color-accent)] animate-pulse ml-0.5">█</span>
                  </div>

                  {/* Check items */}
                  <div className="border border-[var(--color-border)] divide-y divide-[var(--color-border)]">
                    {VERIFY_CHECKS.map((check, i) => (
                      <div key={check.label} className="flex items-center justify-between px-3 py-2.5">
                        <div className="flex gap-3">
                          <span className="text-[9px] text-[var(--color-muted)] w-20 shrink-0">{check.label}</span>
                          <span className="text-[9px] font-bold text-[var(--color-text)]">
                            {verifyStep > i ? check.value : '·····'}
                          </span>
                        </div>
                        {verifyStep > i ? (
                          <motion.span
                            initial={{ opacity: 0, x: 4 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-[9px] text-[var(--color-accent)] font-bold shrink-0"
                          >
                            ✓ {check.result}
                          </motion.span>
                        ) : (
                          <span className="text-[9px] text-[var(--color-muted)] animate-pulse shrink-0">
                            SCANNING
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── Phase: Authorized ── */}
              {phase === 'authorized' && (
                <motion.div
                  key="authorized"
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
                    ACCESS AUTHORIZED
                  </span>
                  <span className="font-mono text-[9px] text-[var(--color-muted)] tracking-widest uppercase">
                    Research Database — Access Granted
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="h-px w-10 bg-[var(--color-accent)]" />
                    <span className="font-mono text-[10px] text-[var(--color-muted)]">◆</span>
                    <div className="h-px w-10 bg-[var(--color-accent)]" />
                  </div>
                </motion.div>
              )}

              {/* ── Phase: Retrieving ── */}
              {phase === 'retrieving' && (
                <motion.div
                  key="retrieving"
                  className="w-full max-w-sm px-6 font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-1.5 h-1.5 bg-[var(--color-accent)] animate-breathe shrink-0" />
                    <span className="text-[9px] uppercase tracking-widest text-[var(--color-accent)]">
                      Querying Research Archive
                    </span>
                    <span className="text-[var(--color-accent)] animate-pulse ml-0.5">█</span>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-5">
                    <div className="flex justify-between text-[9px] text-[var(--color-muted)] mb-1.5">
                      <span>Retrieving Records</span>
                      <motion.span className="text-[var(--color-accent)]">{displayPct}</motion.span>
                    </div>
                    <div className="w-full h-[2px] bg-[var(--color-border)] overflow-hidden">
                      <motion.div className="h-full bg-[var(--color-accent)]" style={{ width: barWidth }} />
                    </div>
                  </div>

                  {/* Loaded entries */}
                  <div className="border border-[var(--color-border)] divide-y divide-[var(--color-border)]">
                    {items.map((item, i) =>
                      loadedEntries > i ? (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.25 }}
                          className="flex gap-2 px-3 py-2"
                        >
                          <span className="text-[9px] text-[var(--color-accent)] shrink-0">&gt;</span>
                          <span className="text-[9px] text-[var(--color-muted)] shrink-0">{item.serial}</span>
                          <span className="text-[9px] font-bold text-[var(--color-text)] truncate">{item.title}</span>
                        </motion.div>
                      ) : null
                    )}
                  </div>

                  {/* Counter */}
                  <div className="mt-3 text-[9px] text-[var(--color-muted)] text-right tracking-wider">
                    {loadedEntries} / {items.length} records retrieved
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════ PAGE CONTENT ══════════════ */}
      <div className={`space-y-6 transition-opacity duration-500 ${revealed ? 'opacity-100' : 'opacity-0'}`}>

        {/* ── Page header ── */}
        <div className="panel-acrylic p-6 md:p-8 flex flex-col md:flex-row md:items-end justify-between gap-4 relative overflow-hidden">
          <div className="absolute inset-0 hud-scanlines pointer-events-none" />
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
              <span className="font-mono text-[9px] text-[var(--color-muted)] uppercase tracking-widest">
                {t('Scientific Research Archive', '科研档案库')}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase flex items-center gap-3 flex-wrap">
              {t('Research Database', '研究数据库')}
              <span className="font-mono text-xs font-normal text-[var(--color-muted)] border border-[var(--color-border)] px-2 py-0.5">
                V.1.0.0
              </span>
            </h1>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 font-mono text-xs text-[var(--color-muted)]">
            <div className="text-center">
              <StatNum value={items.length} active={revealed} />
              <p className="text-[9px] uppercase tracking-wider">{t('Entries', '条目')}</p>
            </div>
            <div className="w-px h-8 bg-[var(--color-border)]" />
            <div className="text-center">
              <StatNum value={activeCount} active={revealed} accent />
              <p className="text-[9px] uppercase tracking-wider">{t('Active', '进行中')}</p>
            </div>
            <div className="w-px h-8 bg-[var(--color-border)]" />
            <div className="text-center">
              <StatNum value={publishedCount} active={revealed} />
              <p className="text-[9px] uppercase tracking-wider">{t('Published', '已发表')}</p>
            </div>
          </div>
        </div>

        {/* ── Category filter tabs ── */}
        <div className="flex flex-wrap gap-2">
          {researchCategories.map((cat) => {
            const active = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={
                  'px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 ' +
                  (active
                    ? 'bg-[var(--color-text)] text-[var(--color-bg)]'
                    : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-text)]')
                }
              >
                {cat}
                <span className={active ? 'text-[var(--color-bg)]/50' : 'text-[var(--color-muted)]/50'}>
                  {String(categoryCount(cat)).padStart(2, '0')}
                </span>
              </button>
            )
          })}
        </div>

        {/* ── Entry list ── */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="panel-acrylic p-12 text-center">
              <p className="font-mono text-sm text-[var(--color-muted)]">
                {t('No records match this filter.', '该分类下暂无匹配记录。')}
              </p>
            </div>
          ) : filteredItems.map((item, idx) => {
            const st = statusConfig[item.status]
            const initials = (item.authors ?? ['?']).map(a => a[0].toUpperCase())

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: skipAnim ? 0 : 0.35, delay: revealed && !skipAnim ? idx * 0.08 : 0, ease: [0.22, 1, 0.36, 1] }}
                className="panel-acrylic group relative overflow-visible transition-[box-shadow] duration-300 hover:shadow-card"
              >
                {/* Slide-in left green bar on hover */}
                <div className="absolute -left-px top-4 bottom-4 w-[3px] bg-[var(--color-accent)] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8">

                  {/* ── Left meta column ── */}
                  <div className="md:w-44 flex-shrink-0 flex flex-col border-b md:border-b-0 md:border-r border-[var(--color-border)] pb-4 md:pb-0 md:pr-6">
                    <span className="text-5xl font-mono font-bold leading-none mb-4 select-none tabular-nums text-[var(--color-border)] group-hover:text-[var(--color-accent)]/20 transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                    <div className="mb-4">
                      <p className="font-mono text-[9px] text-[var(--color-muted)] uppercase tracking-wider mb-0.5">{t('Serial No.', '编号')}</p>
                      <p className="font-mono text-xs font-bold">{item.serial}</p>
                    </div>

                    {item.date && (
                      <div className="mb-4">
                        <p className="font-mono text-[9px] text-[var(--color-muted)] uppercase tracking-wider mb-0.5">{t('Date', '日期')}</p>
                        <p className="font-mono text-xs">{item.date}</p>
                      </div>
                    )}

                    {item.venue && (
                      <div className="mb-4">
                        <p className="font-mono text-[9px] text-[var(--color-muted)] uppercase tracking-wider mb-0.5">{t('Venue', '发表于')}</p>
                        <p className="font-mono text-[10px] text-[var(--color-muted)] leading-snug">{item.venue}</p>
                      </div>
                    )}

                    <div className="mt-auto flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${st.dot}`} />
                      <span className={`font-mono text-[9px] font-bold uppercase ${st.color}`}>{t(st.label.en, st.label.zh)}</span>
                    </div>
                  </div>

                  {/* ── Right content ── */}
                  <div className="flex-1 min-w-0">

                    <div className="flex justify-between items-start gap-3 mb-3">
                      <h2 className="text-xl md:text-2xl font-bold uppercase leading-tight tracking-tight">
                        {item.title}
                      </h2>
                      <FlaskConical
                        size={22}
                        className="shrink-0 mt-0.5 text-[var(--color-border)] group-hover:text-[var(--color-accent)] transition-colors"
                      />
                    </div>

                    {item.subtitle && (
                      <p className="text-sm text-[var(--color-muted)] -mt-1 mb-4 leading-snug">
                        {item.subtitle}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {item.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 border border-[var(--color-border)] font-mono text-[9px] text-[var(--color-muted)] uppercase bg-[var(--color-bg)]/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mb-5 pl-4 border-l-2 border-[var(--color-border)]">
                      <p className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-wider mb-2">{t('Abstract', '摘要')}</p>
                      <p className="text-sm text-[var(--color-muted)] leading-relaxed">{item.abstract}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4" style={dashedBorderStyle}>
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-1.5">
                          {initials.map((initial, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-full bg-[var(--color-border)] border-2 border-[var(--color-surface)] flex items-center justify-center"
                            >
                              <span className="font-mono text-[8px] font-bold text-[var(--color-text)]">
                                {initial}
                              </span>
                            </div>
                          ))}
                        </div>
                        <span className="font-mono text-[10px] text-[var(--color-muted)]">
                          {item.authors?.join(', ') ?? '—'}
                        </span>
                      </div>

                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="group/btn flex items-center gap-2 px-4 py-2 border border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-[var(--color-text)] hover:text-[var(--color-accent)] hover:border-[var(--color-text)] transition-all"
                        >
                          <span className="font-mono text-[10px] font-bold tracking-wider">{t('DATA TRANSFER', '获取数据')}</span>
                          <Download size={12} className="group-hover/btn:translate-y-0.5 transition-transform" />
                        </a>
                      ) : (
                        <div className="flex items-center gap-2 px-4 py-2 border border-[var(--color-border)] opacity-40 cursor-not-allowed select-none">
                          <span className="font-mono text-[10px] font-bold tracking-wider text-[var(--color-muted)]">
                            {t('PENDING REVIEW', '评审中')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </motion.article>
            )
          })}
        </div>

        {/* ── Footer ── */}
        <footer className="pt-6 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[var(--color-accent)]" />
            <span className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-widest">
              {t('Research Archive', '研究档案')} <span className="text-[var(--color-text)] font-bold">// {t('Ongoing', '持续更新')}</span>
            </span>
          </div>
          <div className="flex gap-6 font-mono text-[10px] text-[var(--color-muted)] uppercase">
            <span>{t('Status: Online', '状态: 在线')}</span>
            <span>{t('Entries', '条目')}: {items.length}</span>
            <span>{t('Updated', '更新')}: {new Date().getFullYear()}</span>
          </div>
        </footer>

      </div>
    </div>
  )
}
