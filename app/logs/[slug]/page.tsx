import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import styles from '@/components/layout/page-layout.module.css'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getLog, getLogSlugs } from '@/lib/content'
import { formatDate } from '@/lib/utils'

export function generateStaticParams() {
  return getLogSlugs().map(slug => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const log = getLog(params.slug)
  return { title: log ? `${log.title} — Dev Log` : 'Dev Log — Portfolio' }
}

/* Markdown element styles (no typography plugin, so we style explicitly) */
const mdx = {
  h1:     (p: any) => <h1 className="font-bold tracking-tight mt-10 mb-4" {...p} />,
  h2:     (p: any) => <h2 className="font-bold tracking-tight mt-8 mb-3" {...p} />,
  h3:     (p: any) => <h3 className="font-bold mt-6 mb-2" {...p} />,
  p:      (p: any) => <p className="text-[1em] text-[var(--color-muted)] leading-relaxed mb-4" {...p} />,
  ul:     (p: any) => <ul className="list-disc pl-5 mb-4 space-y-1.5 text-[1em] text-[var(--color-muted)]" {...p} />,
  ol:     (p: any) => <ol className="list-decimal pl-5 mb-4 space-y-1.5 text-[1em] text-[var(--color-muted)]" {...p} />,
  li:     (p: any) => <li className="leading-relaxed" {...p} />,
  a:      (p: any) => <a className="text-[var(--color-accent)] hover:underline" {...p} />,
  strong: (p: any) => <strong className="font-bold text-[var(--color-text)]" {...p} />,
  code:   (p: any) => <code className="font-mono text-[0.875em] px-1.5 py-0.5 bg-[var(--color-bg)] border border-[var(--color-border)] rounded" {...p} />,
  pre:    (p: any) => <pre className="font-mono text-[0.875em] p-4 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-md overflow-x-auto mb-4" {...p} />,
  blockquote: (p: any) => <blockquote className="border-l-2 border-[var(--color-accent)] pl-4 my-4 text-[1em] text-[var(--color-muted)] italic" {...p} />,
}

export default function LogDetailPage({ params }: { params: { slug: string } }) {
  const log = getLog(params.slug)
  if (!log) notFound()

  return (
    <PageLayout>
      <div className={`${styles.detail} space-y-6`}>
        {/* Breadcrumb */}
        <div className={`${styles.breadcrumb} font-mono text-[var(--color-muted)]`}>
          <Link href="/logs" className="hover:text-[var(--color-accent)] transition-colors">DEV_LOG</Link>
          <span>/</span>
          <span className="uppercase">{log.slug}</span>
        </div>

        {/* Article */}
        <article className={`panel-acrylic ${styles.detailCard}`}>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="font-mono text-[0.75em] text-[var(--color-muted)] tracking-widest">LOG_ENTRY</span>
            <div className="flex-1 h-px bg-[var(--color-border)]" />
            <span className="font-mono text-[0.8em] text-[var(--color-muted)]">{formatDate(log.date)}</span>
          </div>

          <h1 className={`${styles.detailTitle} font-bold tracking-tight mb-2`}>{log.title}</h1>
          <div className="h-0.5 w-12 bg-[var(--color-accent)] mb-5" />

          <div className="flex flex-wrap gap-1.5 mb-2">
            {log.tags.map(tag => (
              <span key={tag} className="font-mono text-[0.75em] px-1.5 py-0.5 border border-[var(--color-border)] text-[var(--color-muted)] uppercase bg-[var(--color-bg)]/50">
                #{tag}
              </span>
            ))}
          </div>

          <div className={styles.articleBody}>
            <MDXRemote source={log.body} components={mdx} />
          </div>

          <div className="mt-10 pt-6 border-t border-[var(--color-border)]">
            <Link href="/logs" className="font-mono text-[0.875em] text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1">
              <span>←</span> Back to Dev Log
            </Link>
          </div>
        </article>
      </div>
    </PageLayout>
  )
}
