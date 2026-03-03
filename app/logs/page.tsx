import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'System Logs — Portfolio',
}

const placeholderPosts = [
  { slug: 'first-post',        title: 'Setting Up This Portfolio',         date: '2025-01-15', readTime: '3 min', tags: ['meta', 'next.js'] },
  { slug: 'vr-haptic-notes',   title: 'Notes on Vibrotactile Feedback',    date: '2025-02-01', readTime: '8 min', tags: ['vr', 'haptics', 'research'] },
  { slug: 'ros2-arm-build',    title: 'Building a 6-DOF Arm with ROS2',    date: '2025-02-20', readTime: '12 min', tags: ['robotics', 'ros2', 'hardware'] },
]

export default function LogsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Page header */}
      <div className="panel-acrylic p-6 border-b-2 border-[var(--color-accent)]">
        <div className="flex items-center gap-3 mb-1">
          <span className="font-mono text-[10px] text-[var(--color-muted)] tracking-widest">MODULE_05</span>
          <div className="flex-1 h-px bg-[var(--color-border)]" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">SYSTEM_LOGS</h1>
        <p className="font-mono text-xs text-[var(--color-muted)] mt-1">Writing · Notes · Build logs</p>
      </div>

      {/* Posts */}
      <div className="space-y-3">
        {placeholderPosts.map(({ slug, title, date, readTime, tags }) => (
          <Link key={slug} href={`/logs/${slug}`}>
            <div className="panel-acrylic p-5 group hover:border-[var(--color-accent)]/30 hover:-translate-x-0 hover:translate-x-0.5 transition-all cursor-pointer relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--color-border)] group-hover:bg-[var(--color-accent)] transition-colors" />
              <div className="pl-3">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[10px] text-[var(--color-muted)]">{date}</span>
                  <span className="font-mono text-[10px] text-[var(--color-muted)]">·</span>
                  <span className="font-mono text-[10px] text-[var(--color-muted)]">{readTime} read</span>
                </div>
                <h2 className="text-base font-bold tracking-tight mb-2 group-hover:text-[var(--color-accent)] transition-colors">{title}</h2>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map(tag => (
                    <span key={tag} className="font-mono text-[9px] px-1.5 py-0.5 border border-[var(--color-border)] text-[var(--color-muted)]">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
