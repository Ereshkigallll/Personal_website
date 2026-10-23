'use client'

import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { Download, FlaskConical } from 'lucide-react'
import { researchCategories } from '@/content/research'
import type { Research } from '@/lib/types'
import PageEntrance from '@/components/layout/PageEntrance'
import { useLanguage } from '@/lib/language'

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
function StatNum({ value, accent = false }: { value: number; accent?: boolean }) {
  const count   = useMotionValue(0)
  const display = useTransform(count, v => String(Math.round(v)))
  useEffect(() => {
    const anim = animate(count, value, { duration: 1.2, ease: [0.22, 1, 0.36, 1] })
    return () => anim.stop()
  }, [value, count])
  return (
    <motion.p className={`text-2xl font-bold tabular-nums ${accent ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)]'}`}>
      {display}
    </motion.p>
  )
}

/* ══════════════════════════════════════════════════════════════════════ */
export default function ResearchContent({ items }: { items: Research[] }) {
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

  return (
    <PageEntrance page="research" records={items.map(item => ({ id: item.serial, label: item.title }))}>
      <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto relative">

        {/* ══════════════ PAGE CONTENT ══════════════ */}
        <div className="space-y-6">

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
                <StatNum value={items.length} />
                <p className="text-[9px] uppercase tracking-wider">{t('Entries', '条目')}</p>
              </div>
              <div className="w-px h-8 bg-[var(--color-border)]" />
              <div className="text-center">
                <StatNum value={activeCount} accent />
                <p className="text-[9px] uppercase tracking-wider">{t('Active', '进行中')}</p>
              </div>
              <div className="w-px h-8 bg-[var(--color-border)]" />
              <div className="text-center">
                <StatNum value={publishedCount} />
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
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
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
    </PageEntrance>
  )
}
