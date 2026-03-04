'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

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
      { name: 'ROS2',       level: 80 },
      { name: 'Flutter',    level: 78 },
      { name: 'Next.js',    level: 75 },
      { name: 'Unity (VR)', level: 72 },
      { name: 'TensorFlow', level: 60 },
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

/* ── Animated skill row ─────────────────────────────────────────────── */
function SkillRow({ name, level, delay }: { name: string; level: number; delay: number }) {
  const count = useMotionValue(0)
  const displayCount = useTransform(count, v => `${Math.round(v)}%`)

  useEffect(() => {
    const anim = animate(count, level, { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] })
    return () => anim.stop()
  }, [count, level, delay])

  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <span className="font-mono font-bold text-sm">{name}</span>
        <motion.span className="font-mono text-[10px] font-bold text-[var(--color-accent)]">
          {displayCount}
        </motion.span>
      </div>
      <div className="h-[2px] w-full bg-[var(--color-border)] relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-[var(--color-text)] dark:bg-[var(--color-accent)]"
          initial={{ width: '0%' }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

/* ── Variants ───────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const colVariants = {
  hidden:   { opacity: 0, y: 20 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

/* ── Page ───────────────────────────────────────────────────────────── */
export default function DatabaseContent() {
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
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skillCategories.map(({ id, label, skills }, colIdx) => (
          <motion.div key={id} variants={colVariants} className="panel-acrylic p-8 flex flex-col">

            {/* Section heading */}
            <div className="flex items-center gap-4 mb-8">
              <h3 className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-muted)] whitespace-nowrap">
                {label}
              </h3>
              <div className="flex-1 h-px bg-[var(--color-border)]" />
            </div>

            {/* Skill rows */}
            <div className="space-y-8">
              {skills.map(({ name, level }, skillIdx) => (
                <SkillRow
                  key={name}
                  name={name}
                  level={level}
                  delay={colIdx * 0.15 + skillIdx * 0.07 + 0.2}
                />
              ))}
            </div>

          </motion.div>
        ))}
      </motion.div>

    </div>
  )
}
