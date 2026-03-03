import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Projects — Portfolio',
}

const placeholderProjects = [
  { slug: 'vr-haptic',     key: 'KEY_01', title: 'VR Haptic Research',     sub: 'Vibrotactile feedback system',  category: 'research',  status: 'in-progress', tags: ['VR', 'Unity', 'C#', 'Haptics']            },
  { slug: 'robot-arm',     key: 'KEY_02', title: 'Autonomous Robot Arm',   sub: '6-DOF pick-and-place system',   category: 'robotics',  status: 'active',      tags: ['ROS2', 'Python', 'OpenCV', '3D Printing']  },
  { slug: 'iot-env',       key: 'KEY_03', title: 'Smart Environment IoT',  sub: 'Home automation mesh network',  category: 'iot',       status: 'completed',   tags: ['ESP32', 'MQTT', 'Flutter', 'Firebase']     },
  { slug: 'mobile-app',    key: 'KEY_04', title: 'Field Data Collector',   sub: 'Cross-platform research app',   category: 'app',       status: 'completed',   tags: ['Flutter', 'Dart', 'SQLite', 'BLE']         },
]

const statusColor: Record<string, string> = {
  'active':      'text-[var(--color-accent)] border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10',
  'in-progress': 'text-yellow-500 border-yellow-500/30 bg-yellow-500/10',
  'completed':   'text-[var(--color-muted)] border-[var(--color-border)] bg-transparent',
}

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page header */}
      <div className="panel-acrylic p-6 border-b-2 border-[var(--color-accent)]">
        <div className="flex items-center gap-3 mb-1">
          <span className="font-mono text-[10px] text-[var(--color-muted)] tracking-widest">MODULE_03</span>
          <div className="flex-1 h-px bg-[var(--color-border)]" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">PROJECTS</h1>
        <p className="font-mono text-xs text-[var(--color-muted)] mt-1">Works · Builds · Experiments</p>
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {placeholderProjects.map(({ slug, key, title, sub, status, tags }) => (
          <Link key={slug} href={`/projects/${slug}`}>
            <div className="panel-acrylic p-6 h-full group hover:border-[var(--color-accent)]/40 hover:shadow-key-glow transition-all hover:-translate-y-0.5 cursor-pointer relative overflow-hidden">
              {/* Left accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--color-border)] group-hover:bg-[var(--color-accent)] transition-colors" />

              <div className="pl-3">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[9px] text-[var(--color-muted)] group-hover:text-[var(--color-accent)] transition-colors">{key}</span>
                  <span className={`font-mono text-[9px] font-bold px-1.5 py-0.5 border ${statusColor[status]}`}>
                    {status.toUpperCase()}
                  </span>
                </div>

                <h2 className="text-base font-bold tracking-tight mb-0.5">{title}</h2>
                <p className="font-mono text-[10px] text-[var(--color-muted)] mb-4">{sub}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tags.map(tag => (
                    <span key={tag} className="font-mono text-[9px] px-1.5 py-0.5 border border-[var(--color-border)] text-[var(--color-muted)]">{tag}</span>
                  ))}
                </div>

                <div className="flex items-center gap-1 font-mono text-[10px] text-[var(--color-muted)] group-hover:text-[var(--color-accent)] transition-colors">
                  <span>View details</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
