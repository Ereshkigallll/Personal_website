import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Database — Portfolio',
}

const skillCategories = [
  {
    id:     'languages',
    label:  'Languages',
    skills: [
      { name: 'Python',     level: 90 },
      { name: 'TypeScript', level: 82 },
      { name: 'C++',        level: 75 },
      { name: 'Dart',       level: 70 },
      { name: 'C#',         level: 65 },
    ],
  },
  {
    id:     'frameworks',
    label:  'Frameworks & Tools',
    skills: [
      { name: 'ROS2',        level: 80 },
      { name: 'Flutter',     level: 78 },
      { name: 'Next.js',     level: 75 },
      { name: 'Unity (VR)',  level: 72 },
      { name: 'TensorFlow',  level: 60 },
    ],
  },
  {
    id:     'hardware',
    label:  'Hardware Platforms',
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

      {/* ── Page header ── */}
      <div className="panel-acrylic p-6 md:p-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
          <span className="font-mono text-[9px] text-[var(--color-muted)] uppercase tracking-widest">
            Skills · Tools · Hardware platforms
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">
          DATABASE
        </h1>
      </div>

      {/* ── Skill columns ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {skillCategories.map(({ id, label, skills }) => (
          <div key={id} className="panel-acrylic p-8 flex flex-col">

            {/* Section heading */}
            <div className="flex items-center gap-4 mb-8">
              <h3 className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-muted)] whitespace-nowrap">
                {label}
              </h3>
              <div className="flex-1 h-px bg-[var(--color-border)]" />
            </div>

            {/* Skill rows */}
            <div className="space-y-8">
              {skills.map(({ name, level }) => (
                <div key={name}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-mono font-bold text-sm">{name}</span>
                    <span className="font-mono text-[10px] font-bold text-[var(--color-accent)]">{level}%</span>
                  </div>
                  {/* Bar: 2px tall, grey bg, dark fill in light mode / accent fill in dark mode */}
                  <div className="h-[2px] w-full bg-[var(--color-border)] relative overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-[var(--color-text)] dark:bg-[var(--color-accent)]"
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
