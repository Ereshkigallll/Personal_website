'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Experience } from '@/content/experience'
import { useLanguage } from '@/lib/language'
import { formatExperienceDate } from '@/lib/experience-timeline'
import { experienceCategories } from './experience-labels'

const dashedBorder = {
  backgroundImage: 'linear-gradient(to right, var(--color-border) 50%, transparent 50%)',
  backgroundPosition: 'top',
  backgroundSize: '8px 1px',
  backgroundRepeat: 'repeat-x',
}

export default function ExperienceList({ items }: { items: Experience[] }) {
  const { lang, t } = useLanguage()
  const reduceMotion = useReducedMotion()

  return (
      <ol id="experience-records" aria-label={t('Experience list', '经历列表')} className="relative space-y-5 before:absolute before:left-[5px] before:top-7 before:bottom-7 before:w-px before:bg-[var(--color-border)]">
        {items.map((item, index) => {
          const current = item.endDate === null
          const category = experienceCategories[item.category]
          const Icon = category.icon

          return (
            <li key={item.id} className="relative pl-6 md:pl-9">
              <span className={`absolute left-0 top-7 w-[11px] h-[11px] border-2 ${
                current
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)] shadow-glow'
                  : 'border-[var(--color-border)] bg-[var(--color-bg)]'
              }`} aria-hidden="true" />

              <motion.article
                id={item.id}
                aria-labelledby={`${item.id}-title`}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : Math.min(index * 0.04, 0.16) }}
                className="panel-acrylic group relative scroll-mt-4"
              >
                {current && <div className="absolute -left-px top-0 bottom-0 w-[3px] bg-[var(--color-accent)]" aria-hidden="true" />}
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                <div className="grid md:grid-cols-[152px_minmax(0,1fr)]">
                  <div className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-[var(--color-border)] flex flex-wrap md:flex-col items-start justify-between md:justify-start gap-4">
                    <div>
                      <p className="font-mono text-3xl font-bold leading-none tracking-tight text-[var(--color-border)] mb-3">
                        {item.startDate.slice(0, 4)}
                      </p>
                      <p className="font-mono text-[10px] font-bold leading-relaxed">
                        <time dateTime={item.startDate}>{formatExperienceDate(item.startDate, lang)}</time>
                        <span className="text-[var(--color-muted)] mx-1 md:block md:mx-0" aria-hidden="true">—</span>
                        {item.endDate
                          ? <time dateTime={item.endDate}>{formatExperienceDate(item.endDate, lang)}</time>
                          : <span className="text-[var(--color-accent)]">{t('PRESENT', '至今')}</span>}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 md:mt-auto md:pt-5">
                      <span className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
                        <Icon size={12} aria-hidden="true" />
                        {t(category.en, category.zh)}
                      </span>
                      <span className="font-mono text-[8px] text-[var(--color-muted)] tracking-wider">{item.serial}</span>
                    </div>
                  </div>

                  <div className="min-w-0 p-5 md:p-6 lg:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                      <h2 id={`${item.id}-title`} className="text-xl md:text-2xl font-bold leading-tight tracking-tight">
                        {t(item.role.en, item.role.zh)}
                      </h2>
                      {current && (
                        <span className="flex items-center gap-1.5 shrink-0 px-2 py-1 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 font-mono text-[9px] font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-breathe" aria-hidden="true" />
                          {t('Current appointment', '当前任职')}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold leading-relaxed">{t(item.organization.en, item.organization.zh)}</p>
                    {item.department && <p className="text-xs text-[var(--color-muted)] leading-relaxed mt-0.5">{t(item.department.en, item.department.zh)}</p>}
                    {item.project && (
                      <p className="font-mono text-[10px] text-[var(--color-muted)] leading-relaxed mt-2">
                        <span className="text-[var(--color-accent)] mr-1.5" aria-hidden="true">↳</span>
                        {t(item.project.en, item.project.zh)}
                      </p>
                    )}

                    <ul className="space-y-2.5 my-5">
                      {item.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="flex items-start gap-2.5 text-sm text-[var(--color-muted)] leading-relaxed">
                          <span className="w-1 h-1 shrink-0 bg-[var(--color-border)] mt-2" aria-hidden="true" />
                          <span>{t(highlight.en, highlight.zh)}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4" style={dashedBorder}>
                      <ul aria-label={t('Areas and tools', '方向与工具')} className="flex flex-wrap gap-1.5">
                        {item.tags.map(tag => (
                          <li key={tag} className="font-mono text-[9px] px-1.5 py-0.5 border border-[var(--color-border)] text-[var(--color-muted)] uppercase bg-[var(--color-bg)]/50">
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap items-center gap-4">
                      <Link
                        href={`/experience/${item.id}?view=list`}
                        className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider hover:text-[var(--color-accent)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                      >
                        {t('View record', '查看详情')}
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </Link>
                      {item.publication && (
                        <a
                          href={item.publication.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${t('Read paper', '阅读论文')}: ${item.publication.title}`}
                          className="inline-flex items-center gap-1.5 shrink-0 font-mono text-[10px] font-bold uppercase tracking-wider hover:text-[var(--color-accent)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
                        >
                          {t('Read paper', '阅读论文')}
                          <ArrowUpRight size={13} aria-hidden="true" />
                        </a>
                      )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            </li>
          )
        })}
      </ol>

  )
}
