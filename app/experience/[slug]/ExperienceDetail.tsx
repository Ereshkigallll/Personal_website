'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Experience } from '@/content/experience'
import { formatExperienceDate } from '@/lib/experience-timeline'
import { useLanguage } from '@/lib/language'
import { experienceCategories, type ExperienceView } from '../experience-labels'

export default function ExperienceDetail({ item, related }: { item: Experience; related: Experience[] }) {
  const { lang, t } = useLanguage()
  const [view, setView] = useState<ExperienceView>('timeline')
  const category = experienceCategories[item.category]
  const Icon = category.icon

  useEffect(() => {
    setView(new URLSearchParams(window.location.search).get('view') === 'list' ? 'list' : 'timeline')
    document.querySelector('main')?.scrollTo({ top: 0 })
  }, [item.id])

  const backHref = `/experience?view=${view}&focus=${item.id}`

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href={backHref} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]">
        <ArrowLeft size={14} aria-hidden="true" />{t('Back to experience', '返回经历档案')}
      </Link>

      <article className="panel-acrylic relative overflow-hidden">
        <div className="absolute top-0 left-0 h-[3px] w-16 bg-[var(--color-accent)]" aria-hidden="true" />
        <header className="p-6 md:p-10 border-b border-[var(--color-border)]">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-8 font-mono text-[10px] uppercase tracking-wider text-[var(--color-muted)]">
            <span className="inline-flex items-center gap-2"><Icon size={13} aria-hidden="true" />{t(category.en, category.zh)}<span className="opacity-40 mx-1">/</span>{item.serial}</span>
            <span>{formatExperienceDate(item.startDate, lang)} — {item.endDate ? formatExperienceDate(item.endDate, lang) : t('PRESENT', '至今')}</span>
          </div>
          <p className="font-mono text-[11px] mb-3 text-[var(--color-muted)] uppercase tracking-wider">{t(item.organization.en, item.organization.zh)}</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight max-w-2xl">{t(item.timelineTitle.en, item.timelineTitle.zh)}</h1>
          <p className="text-base font-semibold mt-4">{t(item.role.en, item.role.zh)}</p>
          {item.department && <p className="text-xs leading-relaxed mt-2 text-[var(--color-muted)]">{t(item.department.en, item.department.zh)}</p>}
          <p className="text-sm md:text-base text-[var(--color-muted)] leading-relaxed mt-6 max-w-2xl">{t(item.summary.en, item.summary.zh)}</p>
        </header>

        <div className="p-6 md:p-10">
          <div className="flex items-center gap-3 mb-7">
            <h2 className="font-mono text-[10px] font-bold tracking-widest uppercase shrink-0">{t(item.category === 'education' ? 'Academic record' : 'Work & contributions', item.category === 'education' ? '学习与成果' : '工作与贡献')}</h2>
            <div className="h-px bg-[var(--color-border)] w-full" />
          </div>
          <ol className="space-y-7">
            {item.highlights.map((highlight, index) => (
              <li key={index} className="flex gap-5 md:gap-7">
                <span className="font-mono text-[11px] text-[var(--color-muted)] pt-1 shrink-0">{String(index + 1).padStart(2, '0')}</span>
                <p className="text-sm md:text-base leading-relaxed text-[var(--color-muted)] max-w-2xl">{t(highlight.en, highlight.zh)}</p>
              </li>
            ))}
          </ol>
          <ul className="flex flex-wrap gap-2 mt-9 pt-6 border-t border-dashed border-[var(--color-border)]" aria-label={t('Areas and tools', '方向与工具')}>
            {item.tags.map(tag => <li key={tag} className="font-mono text-[10px] px-2 py-1 border border-[var(--color-border)] text-[var(--color-muted)] uppercase">{tag}</li>)}
          </ul>
          {item.publication && <a href={item.publication.href} target="_blank" rel="noreferrer" className="inline-flex gap-2 items-center mt-6 font-mono text-xs font-bold hover:text-[var(--color-accent-dim)] transition-colors">
            {t('Read paper', '阅读论文')} · {item.publication.title}<ArrowUpRight size={15} aria-hidden="true" />
          </a>}
        </div>
      </article>

      {related.length > 0 && <section className="space-y-3" aria-label={t('Related experiences', '相关经历')}>
        <h2 className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-muted)]">{t(item.category === 'education' ? 'Projects during this period' : 'Education during this period', item.category === 'education' ? '这段时间的项目' : '同期教育经历')}</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {related.map(entry => <Link key={entry.id} href={`/experience/${entry.id}?view=${view}`} className="panel-acrylic p-5 group flex items-center justify-between gap-4 hover:border-[var(--color-accent)] transition-colors">
            <span><span className="font-mono text-[9px] text-[var(--color-muted)] block mb-2">{entry.startDate.replace('-', '.')} — {entry.endDate?.replace('-', '.') ?? t('PRESENT', '至今')}</span><span className="text-sm font-semibold">{t(entry.timelineTitle.en, entry.timelineTitle.zh)}</span></span>
            <ArrowUpRight size={15} className="text-[var(--color-muted)] group-hover:text-[var(--color-text)]" aria-hidden="true" />
          </Link>)}
        </div>
      </section>}

      <div className="flex items-center justify-between pt-3 pb-4 font-mono text-[10px] uppercase tracking-wider text-[var(--color-muted)]">
        <span>// {t('Experience archive', '经历档案')}</span>
        <Link href={backHref} className="inline-flex gap-2 items-center hover:text-[var(--color-text)]">{t('Continue exploring', '继续浏览')}<ArrowRight size={13} aria-hidden="true" /></Link>
      </div>
    </div>
  )
}
