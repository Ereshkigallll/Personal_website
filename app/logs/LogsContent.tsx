'use client'

import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/lib/language'
import { formatDate } from '@/lib/utils'
import PageEntrance from '@/components/layout/PageEntrance'
import PageLayout from '@/components/layout/PageLayout'
import styles from '@/components/layout/page-layout.module.css'

export type Post = {
  slug:     string
  logId:    string
  title:    string
  date:     string
  readTime: string
  tags:     string[]
  status:   'published' | 'draft' | 'archived'
  summary:  string
}

const statusConfig = {
  published: { label: { en: 'Published', zh: '已发布' }, text: 'text-[var(--color-accent)]', border: 'border-[var(--color-accent)]/40', bg: 'bg-[var(--color-accent)]/10' },
  draft:     { label: { en: 'Draft',     zh: '草稿'   }, text: 'text-yellow-500',            border: 'border-yellow-500/40',           bg: 'bg-yellow-500/10' },
  archived:  { label: { en: 'Archived',  zh: '已归档' }, text: 'text-[var(--color-muted)]',  border: 'border-[var(--color-border)]',    bg: 'bg-transparent' },
}

const FILTERS = [
  { key: 'ALL_ENTRIES', label: { en: 'All Entries', zh: '全部'     }, match: (_: Post) => true },
  { key: 'RESEARCH',    label: { en: 'Research',     zh: '研究'     }, match: (p: Post) => p.tags.some(t => ['research', 'vr', 'haptics'].includes(t)) },
  { key: 'BUILD_LOGS',  label: { en: 'Build Logs',   zh: '构建日志' }, match: (p: Post) => p.tags.some(t => ['robotics', 'hardware', 'ros2'].includes(t)) },
  { key: 'META',        label: { en: 'Meta',         zh: '杂项'     }, match: (p: Post) => p.tags.includes('meta') },
]

/* ── Count-up number ───────────────────────────────────────────────── */
function StatNum({ value }: { value: number }) {
  const count   = useMotionValue(0)
  const display = useTransform(count, v => String(Math.round(v)))
  useEffect(() => {
    const anim = animate(count, value, { duration: 1.1, ease: [0.22, 1, 0.36, 1] })
    return () => anim.stop()
  }, [count, value])
  return <motion.span>{display}</motion.span>
}

/* ── Live system status ────────────────────────────────────────────── */
function SystemStatus() {
  const { t } = useLanguage()
  const load = useMotionValue(35)
  const loadWidth = useTransform(load, v => `${Math.round(v)}%`)
  const latency = useMotionValue(12)
  const displayLatency = useTransform(latency, v => `${Math.round(v)}ms`)

  useEffect(() => {
    const loadId = setInterval(() => {
      animate(load, Math.round(20 + Math.random() * 55), { duration: 1.2, ease: 'easeInOut' })
    }, 2500)
    const latencyId = setInterval(() => {
      const next = Math.max(4, Math.round(5 + Math.random() * 70 + (Math.random() < 0.1 ? 30 : 0)))
      animate(latency, Math.min(next, 95), { duration: 0.4, ease: 'easeOut' })
    }, 1800)
    return () => { clearInterval(loadId); clearInterval(latencyId) }
  }, [load, latency])

  return (
    <div className={`panel-acrylic flex flex-col gap-3 ${styles.logSidePanel}`}>
      <h3 className="font-mono text-[0.75em] font-bold text-[var(--color-muted)] uppercase tracking-widest pb-2 border-b border-[var(--color-border)]">
        {t('System Status', '系统状态')}
      </h3>
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[0.8em] text-[var(--color-muted)]">SERVER_LOAD</span>
        <div className={`${styles.loadBar} h-[3px] bg-[var(--color-border)] overflow-hidden shrink-0`}>
          <motion.div className="h-full bg-[var(--color-accent)]" style={{ width: loadWidth }} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.8em] text-[var(--color-muted)]">DB_INTEGRITY</span>
        <span className="font-mono text-[0.8em] font-bold text-[var(--color-accent)]">100%</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.8em] text-[var(--color-muted)]">NET_LATENCY</span>
        <motion.span className="font-mono text-[0.8em] font-bold text-[var(--color-text)]">
          {displayLatency}
        </motion.span>
      </div>
    </div>
  )
}

/* ── Page ──────────────────────────────────────────────────────────── */
export default function LogsContent({ posts }: { posts: Post[] }) {
  const { t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState('ALL_ENTRIES')

  const publishedCount = posts.filter(p => p.status === 'published').length
  const current  = FILTERS.find(f => f.key === activeFilter) ?? FILTERS[0]
  const filtered = posts.filter(current.match)

  return (
    <PageEntrance page="logs" records={posts.map(post => ({ id: post.logId, label: post.title }))}>
      <PageLayout>

        {/* ── Page header ── */}
        <div className={`panel-acrylic ${styles.header} relative overflow-hidden`}>
          <div className="absolute inset-0 hud-scanlines pointer-events-none" />
          <div className="relative flex w-full min-w-0 items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-breathe" />
                <span className="font-mono text-[0.75em] text-[var(--color-muted)] uppercase tracking-widest">
                  {t('Dev Log Archive', '开发日志归档')}
                </span>
              </div>
              <h1 className={`${styles.title} font-bold tracking-tighter uppercase`}>
                {t('Dev', '开发')} <span className="text-[var(--color-accent)]">{t('Log', '日志')}</span>
              </h1>
            </div>

            <div className="hidden md:flex flex-col items-end gap-1.5 shrink-0">
              <span className="font-mono text-[0.8em] font-bold px-2 py-1 bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/30">
                {t('USER: AUTHOR', '用户: 作者')}
              </span>
              <span className="font-mono text-[0.75em] text-[var(--color-muted)]">
                <StatNum value={posts.length} /> {t('ENTRIES', '篇')} · <StatNum value={publishedCount} /> {t('PUBLISHED', '已发布')}
              </span>
            </div>
          </div>
        </div>

        {/* ── Body: sidebar + articles ── */}
        <div className={styles.logLayout}>

          {/* ── Left sidebar ── */}
          <div className={styles.logSidebar}>
            <div className={`panel-acrylic ${styles.logSidePanel}`}>
              <h3 className="font-mono text-[0.75em] font-bold text-[var(--color-muted)] uppercase tracking-widest mb-3 pb-2 border-b border-[var(--color-border)]">
                {t('Filter Logs', '筛选日志')}
              </h3>
              <div className="flex flex-col">
                {FILTERS.map(f => {
                  const active = activeFilter === f.key
                  const count  = posts.filter(f.match).length
                  return (
                    <button
                      key={f.key}
                      onClick={() => setActiveFilter(f.key)}
                      className="flex items-center justify-between gap-3 min-h-[44px] px-2 py-2 transition-colors group"
                    >
                      <span className={`font-mono text-[0.8em] font-bold transition-colors ${active ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)] group-hover:text-[var(--color-text)]'}`}>
                        {t(f.label.en, f.label.zh)}
                      </span>
                      <span className="font-mono text-[0.75em] text-[var(--color-muted)]">
                        {String(count).padStart(2, '0')}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <SystemStatus />
          </div>

          {/* ── Article list ── */}
          <div className={styles.logArticles}>
            {filtered.length === 0 ? (
              <div className="panel-acrylic p-12 text-center">
                <p className="font-mono text-[1em] text-[var(--color-muted)]">
                  {t('No entries in this category.', '该分类下暂无日志。')}
                </p>
              </div>
            ) : filtered.map((post, idx) => {
              const st = statusConfig[post.status]
              return (
                <article key={post.slug} className="panel-acrylic group relative overflow-hidden transition-shadow duration-300 hover:shadow-card">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className={styles.panelPadding}>
                    <div className={styles.logHeading}>
                      <div className={styles.logIdentity}>
                        <div className={`${styles.logNumber} shrink-0 flex items-center justify-center font-mono text-[0.875em] font-bold ${idx === 0 ? 'bg-[var(--color-text)] text-[var(--color-bg)]' : 'bg-[var(--color-border)] text-[var(--color-muted)]'}`}>
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <div>
                          <h2 className={`${styles.cardTitle} font-bold tracking-tight`}>{post.title}</h2>
                          <div className={styles.logMeta}>
                            <span className="font-mono text-[0.75em] text-[var(--color-muted)]">LOG_ID: {post.logId}</span>
                            <span className="text-[var(--color-border)] text-[0.875em]">|</span>
                            <span className="font-mono text-[0.75em] font-bold text-[var(--color-accent)]">{formatDate(post.date)}</span>
                            <span className="text-[var(--color-border)] text-[0.875em]">|</span>
                            <span className="font-mono text-[0.75em] text-[var(--color-muted)]">{post.readTime} {t('read', '阅读')}</span>
                          </div>
                        </div>
                      </div>

                      <span className={`${styles.logBadge} font-mono font-bold uppercase tracking-wider px-2 py-1 border shrink-0 ${st.bg} ${st.text} ${st.border}`}>
                        {t(st.label.en, st.label.zh)}
                      </span>
                    </div>

                    <p className={`${styles.logSummary} text-[var(--color-muted)] mb-5`}>{post.summary}</p>

                    <div className={styles.logActions}>
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.map(tag => (
                          <span key={tag} className="font-mono text-[0.75em] px-1.5 py-0.5 border border-[var(--color-border)] text-[var(--color-muted)] uppercase bg-[var(--color-bg)]/50">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <Link href={`/logs/${post.slug}`} className={`${styles.readLink} shrink-0 font-mono font-bold text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors`}>
                        {t('READ_FULL_LOG', '阅读全文')} →
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

        </div>
      </PageLayout>
    </PageEntrance>
  )
}
