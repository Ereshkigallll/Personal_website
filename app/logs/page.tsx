import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'System Logs — Portfolio',
}

const posts = [
  {
    slug:     'first-post',
    logId:    '#LOG-0001',
    title:    'Setting Up This Portfolio',
    date:     '2025-01-15',
    readTime: '3 min',
    tags:     ['meta', 'next.js'],
    status:   'published' as const,
    summary:  'Built this portfolio using Next.js 14 App Router, Tailwind CSS, and a custom OS-Terminal aesthetic. Notes on the architecture decisions, CSS variable theming approach, and the frosted glass panel system.',
  },
  {
    slug:     'vr-haptic-notes',
    logId:    '#LOG-0002',
    title:    'Notes on Vibrotactile Feedback in VR',
    date:     '2025-02-01',
    readTime: '8 min',
    tags:     ['vr', 'haptics', 'research'],
    status:   'draft' as const,
    summary:  'Preliminary observations from the vibrotactile pilot study. Subjects showed statistically significant improvement in depth perception accuracy when paired with synchronized floor vibration. Methodology and early data collection notes.',
  },
  {
    slug:     'ros2-arm-build',
    logId:    '#LOG-0003',
    title:    'Building a 6-DOF Arm with ROS2',
    date:     '2025-02-20',
    readTime: '12 min',
    tags:     ['robotics', 'ros2', 'hardware'],
    status:   'published' as const,
    summary:  'Build log for the autonomous robot arm project. Covers URDF modeling, MoveIt2 configuration, and real-time object detection pipeline with OpenCV. Includes notes on the 3D-printed chassis design and inverse kinematics tuning.',
  },
]

const statusConfig = {
  published: {
    label:  'Published',
    text:   'text-[var(--color-accent)]',
    border: 'border-[var(--color-accent)]/40',
    bg:     'bg-[var(--color-accent)]/10',
  },
  draft: {
    label:  'Draft',
    text:   'text-yellow-500',
    border: 'border-yellow-500/40',
    bg:     'bg-yellow-500/10',
  },
  archived: {
    label:  'Archived',
    text:   'text-[var(--color-muted)]',
    border: 'border-[var(--color-border)]',
    bg:     'bg-transparent',
  },
}

const filterCategories = [
  { label: 'ALL_ENTRIES', count: posts.length },
  { label: 'RESEARCH',    count: posts.filter(p => p.tags.some(t => ['research','vr','haptics'].includes(t))).length },
  { label: 'BUILD_LOGS',  count: posts.filter(p => p.tags.some(t => ['robotics','hardware','ros2'].includes(t))).length },
  { label: 'META',        count: posts.filter(p => p.tags.includes('meta')).length },
]

export default function LogsPage() {
  const publishedCount = posts.filter(p => p.status === 'published').length

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* ── Page header ── */}
      <div className="panel-acrylic p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-breathe" />
              <span className="font-mono text-[9px] text-[var(--color-muted)] uppercase tracking-widest">
                System Logs Archive
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">
              Development <span className="text-[var(--color-accent)]">Log</span>
            </h1>
          </div>

          {/* User badge */}
          <div className="hidden md:flex flex-col items-end gap-1.5 shrink-0">
            <span className="font-mono text-[10px] font-bold px-2 py-1 bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/30">
              USER: AUTHOR
            </span>
            <span className="font-mono text-[9px] text-[var(--color-muted)]">
              {posts.length} ENTRIES · {publishedCount} PUBLISHED
            </span>
          </div>
        </div>
      </div>

      {/* ── Body: sidebar + articles ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ── Left sidebar ── */}
        <div className="lg:col-span-3 flex flex-col gap-4">

          {/* Filter panel */}
          <div className="panel-acrylic p-4">
            <h3 className="font-mono text-[9px] font-bold text-[var(--color-muted)] uppercase tracking-widest mb-3 pb-2 border-b border-[var(--color-border)]">
              Filter Logs
            </h3>
            <div className="flex flex-col">
              {filterCategories.map(({ label, count }, i) => (
                <button
                  key={label}
                  className="flex items-center justify-between px-2 py-2 transition-colors group"
                >
                  <span className={`font-mono text-[10px] font-bold transition-colors ${i === 0 ? 'text-[var(--color-text)]' : 'text-[var(--color-muted)] group-hover:text-[var(--color-accent)]'}`}>
                    {label}
                  </span>
                  <span className="font-mono text-[9px] text-[var(--color-muted)]">
                    {String(count).padStart(2, '0')}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* System status panel */}
          <div className="panel-acrylic p-4 flex flex-col gap-3">
            <h3 className="font-mono text-[9px] font-bold text-[var(--color-muted)] uppercase tracking-widest pb-2 border-b border-[var(--color-border)]">
              System Status
            </h3>
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] text-[var(--color-muted)]">SERVER_LOAD</span>
              <div className="w-20 h-[2px] bg-[var(--color-border)] overflow-hidden shrink-0">
                <div className="h-full bg-[var(--color-accent)] w-[35%]" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[var(--color-muted)]">DB_INTEGRITY</span>
              <span className="font-mono text-[10px] font-bold text-[var(--color-accent)]">100%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[var(--color-muted)]">NET_LATENCY</span>
              <span className="font-mono text-[10px] font-bold text-[var(--color-text)]">12ms</span>
            </div>
          </div>

        </div>

        {/* ── Article list ── */}
        <div className="lg:col-span-9 flex flex-col gap-5 pb-8">
          {posts.map((post, idx) => {
            const st = statusConfig[post.status]
            return (
              <article
                key={post.slug}
                className="panel-acrylic group relative overflow-hidden transition-all duration-300 hover:shadow-card"
              >
                {/* Corner marks — visible on hover */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="p-6">

                  {/* Card header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-4 border-b border-[var(--color-border)]">
                    <div className="flex items-center gap-3">
                      {/* Index badge */}
                      <div className={`w-8 h-8 shrink-0 flex items-center justify-center font-mono text-xs font-bold ${idx === 0 ? 'bg-[var(--color-text)] text-[var(--color-bg)]' : 'bg-[var(--color-border)] text-[var(--color-muted)]'}`}>
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <h2 className="text-lg font-bold leading-tight tracking-tight">
                          {post.title}
                        </h2>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="font-mono text-[9px] text-[var(--color-muted)]">LOG_ID: {post.logId}</span>
                          <span className="text-[var(--color-border)] text-xs">|</span>
                          <span className="font-mono text-[9px] font-bold text-[var(--color-accent)]">{post.date}</span>
                          <span className="text-[var(--color-border)] text-xs">|</span>
                          <span className="font-mono text-[9px] text-[var(--color-muted)]">{post.readTime} read</span>
                        </div>
                      </div>
                    </div>

                    {/* Status badge */}
                    <span className={`self-start md:self-center font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-1 border shrink-0 ${st.bg} ${st.text} ${st.border}`}>
                      {st.label}
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-5">
                    {post.summary}
                  </p>

                  {/* Tags + read action */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] px-1.5 py-0.5 border border-[var(--color-border)] text-[var(--color-muted)] uppercase bg-[var(--color-bg)]/50"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/logs/${post.slug}`}
                      className="shrink-0 font-mono text-[10px] font-bold text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      READ_FULL_LOG →
                    </Link>
                  </div>

                </div>
              </article>
            )
          })}
        </div>

      </div>

    </div>
  )
}
