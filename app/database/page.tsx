import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Database — Portfolio',
}

const skillCategories = [
  {
    id: 'languages',
    label: 'LANGUAGES',
    skills: [
      { name: 'Python',      level: 90 },
      { name: 'TypeScript',  level: 82 },
      { name: 'C++',         level: 75 },
      { name: 'Dart',        level: 70 },
      { name: 'C#',          level: 65 },
    ],
  },
  {
    id: 'frameworks',
    label: 'FRAMEWORKS & TOOLS',
    skills: [
      { name: 'ROS2',           level: 80 },
      { name: 'Flutter',        level: 78 },
      { name: 'Next.js',        level: 75 },
      { name: 'Unity (VR)',     level: 72 },
      { name: 'TensorFlow',     level: 60 },
    ],
  },
  {
    id: 'hardware',
    label: 'HARDWARE PLATFORMS',
    skills: [
      { name: 'ESP32 / ESP8266', level: 88 },
      { name: 'Raspberry Pi',    level: 85 },
      { name: 'Arduino',         level: 85 },
      { name: 'STM32',           level: 60 },
    ],
  },
]

export default function DatabasePage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page header */}
      <div className="panel-acrylic p-6 border-b-2 border-[var(--color-accent)]">
        <div className="flex items-center gap-3 mb-1">
          <span className="font-mono text-[10px] text-[var(--color-muted)] tracking-widest">MODULE_04</span>
          <div className="flex-1 h-px bg-[var(--color-border)]" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">DATABASE</h1>
        <p className="font-mono text-xs text-[var(--color-muted)] mt-1">Skills · Tools · Hardware platforms</p>
      </div>

      {/* Skill categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {skillCategories.map(({ id, label, skills }) => (
          <div key={id} className="panel-acrylic p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="font-mono text-[9px] font-bold tracking-widest text-[var(--color-muted)]">{label}</span>
              <div className="flex-1 h-px bg-[var(--color-border)]" />
            </div>
            <div className="space-y-4">
              {skills.map(({ name, level }) => (
                <div key={name}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-mono text-xs font-medium">{name}</span>
                    <span className="font-mono text-[10px] text-[var(--color-accent)] font-bold">{level}%</span>
                  </div>
                  <div className="w-full bg-[var(--color-border)] h-px overflow-hidden">
                    <div
                      className="bg-[var(--color-text)] dark:bg-white h-full transition-all"
                      style={{ width: `${level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
