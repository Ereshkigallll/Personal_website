'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { AlignLeft, GitCommitHorizontal } from 'lucide-react'
import type { Experience } from '@/content/experience'
import { useLanguage } from '@/lib/language'
import ExperienceList from './ExperienceList'
import ExperienceTimeline from './ExperienceTimeline'
import { experienceFilters, type ExperienceFilter, type ExperienceView } from './experience-labels'
import styles from './experience.module.css'

const STORAGE_KEY = 'experience-archive'

export default function ExperienceContent({ items, asOfDate }: { items: Experience[]; asOfDate: string }) {
  const { t } = useLanguage()
  const reduceMotion = useReducedMotion()
  const [view, setView] = useState<ExperienceView>('timeline')
  const [activeFilter, setActiveFilter] = useState<ExperienceFilter>('all')
  const [focusId, setFocusId] = useState(items[0]?.id ?? '')
  const [restored, setRestored] = useState(false)
  const didRestore = useRef(false)
  const listReturnFocus = useRef<string | null>(null)
  const filtered = useMemo(() => activeFilter === 'all' ? items : items.filter(item => item.category === activeFilter), [items, activeFilter])
  const currentCount = items.filter(item => item.endDate === null).length

  useEffect(() => {
    if (didRestore.current) return
    didRestore.current = true
    document.querySelector('main')?.scrollTo({ top: 0 })
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}')
      const query = new URLSearchParams(window.location.search)
      const nextView = query.get('view') ?? saved.view
      const latest = items.find(item => saved.filter === 'all' || item.category === saved.filter) ?? items[0]
      const nextFocus = query.get('focus') ?? (saved.order === 'newest-first' ? saved.focusId : latest?.id)
      if (nextView === 'list' && query.has('focus')) listReturnFocus.current = nextFocus
      if (nextView === 'list' || nextView === 'timeline') setView(nextView)
      if (experienceFilters.some(filter => filter.key === saved.filter)) {
        const selected = items.find(item => item.id === nextFocus)
        setActiveFilter(selected && saved.filter !== 'all' && selected.category !== saved.filter ? 'all' : saved.filter)
      }
      if (items.some(item => item.id === nextFocus)) setFocusId(nextFocus)
      // Consume a detail-page return link once, then let the saved browsing state take over.
      if (query.has('view') || query.has('focus')) {
        query.delete('view')
        query.delete('focus')
        const remaining = query.toString()
        window.history.replaceState(window.history.state, '', `${window.location.pathname}${remaining ? `?${remaining}` : ''}`)
      }
    } catch { /* Storage may be unavailable in a private browsing context. */ }
    setRestored(true)
  }, [items])

  useEffect(() => {
    if (!restored) return
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ view, focusId, filter: activeFilter, order: 'newest-first' })) } catch { /* Keep browsing without persistence. */ }
  }, [view, focusId, activeFilter, restored])

  return (
    <div className={`${styles.page} ${view === 'timeline' ? styles.timelinePage : 'max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto'}`}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}><span />{t('Professional & Academic Record', '工作与学术履历')}</p>
          <h1>{t('Experience', '经历档案')}<span className={styles.headerSlash}> / </span><span className={styles.headerIndex}>01—{String(items.length).padStart(2, '0')}</span></h1>
          <p className={styles.description}>{t('Learning, building, and the connections in between.', '学习、构建，以及沿途发生的连接。')}</p>
        </div>
        <div className={styles.stats}>
          <div><strong>{String(items.length).padStart(2, '0')}</strong><span>{t('Records', '条经历')}</span></div>
          <div><strong className={styles.currentStat}>{String(currentCount).padStart(2, '0')}</strong><span>{t('Current', '当前任职')}</span></div>
          <div><strong>{new Set(items.map(item => item.category)).size.toString().padStart(2, '0')}</strong><span>{t('Tracks', '个方向')}</span></div>
        </div>
      </header>

      <div className={styles.toolbar}>
        <fieldset className={styles.filters}>
          <legend className="sr-only">{t('Filter experience', '筛选经历')}</legend>
          {experienceFilters.map(filter => {
            const count = filter.key === 'all' ? items.length : items.filter(item => item.category === filter.key).length
            return (
              <button
                key={filter.key}
                type="button"
                aria-pressed={activeFilter === filter.key}
                aria-controls="experience-view"
                onClick={() => {
                  setActiveFilter(filter.key)
                  if (filter.key !== 'all' && !items.some(item => item.id === focusId && item.category === filter.key)) {
                    setFocusId(items.find(item => item.category === filter.key)!.id)
                  }
                }}
              >
                {t(filter.en, filter.zh)}<span>{String(count).padStart(2, '0')}</span>
              </button>
            )
          })}
        </fieldset>
        <div className={styles.viewSwitch} role="group" aria-label={t('Experience view', '经历展示方式')}>
          {([
            { key: 'timeline', en: 'Timeline', zh: '时间轴', icon: GitCommitHorizontal },
            { key: 'list', en: 'List', zh: '列表', icon: AlignLeft },
          ] as const).map(option => {
            const Icon = option.icon
            return (
              <button key={option.key} type="button" onClick={() => setView(option.key)} aria-pressed={view === option.key} aria-controls="experience-view">
                {view === option.key && <motion.span className={styles.switchIndicator} layoutId="experience-view-switch" transition={{ duration: reduceMotion ? 0 : .25, ease: [.22, 1, .36, 1] }} />}
                <Icon size={13} aria-hidden="true" /><span>{t(option.en, option.zh)}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div id="experience-view" className={styles.viewContent}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view}
            className={styles.viewMotion}
            initial={reduceMotion ? false : { opacity: 0, y: 10, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -7, filter: reduceMotion ? 'blur(0px)' : 'blur(3px)' }}
            transition={{ duration: reduceMotion ? 0 : .22, ease: [.22, 1, .36, 1] }}
            onAnimationComplete={() => {
              if (view !== 'list' || !listReturnFocus.current) return
              document.getElementById(listReturnFocus.current)?.scrollIntoView({ block: 'start' })
              listReturnFocus.current = null
            }}
          >
            {view === 'timeline'
              ? <ExperienceTimeline items={items} visibleItems={filtered} asOfDate={asOfDate} focusId={focusId} onFocusChange={setFocusId} ready={restored} />
              : <ExperienceList items={filtered} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className={styles.footer}>
        <p><span />{t('Experience Archive', '经历档案')} <strong>// Yutong Zhang</strong></p>
        <span>{items[items.length - 1]?.startDate.slice(0, 4)} — {t('PRESENT', '至今')}</span>
      </footer>
    </div>
  )
}
