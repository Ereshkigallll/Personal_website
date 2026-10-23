'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useLanguage } from '@/lib/language'
import PageEntrance from '@/components/layout/PageEntrance'
import PageLayout from '@/components/layout/PageLayout'
import styles from '@/components/layout/page-layout.module.css'

const skillCategories = [
  {
    id: 'languages',
    label: { en: 'Languages', zh: '编程语言' },
    skills: [
      { name: 'Python',     level: 90 },
      { name: 'TypeScript', level: 82 },
      { name: 'C++',        level: 75 },
      { name: 'Dart',       level: 70 },
      { name: 'C#',         level: 65 },
    ],
  },
  {
    id: 'frameworks',
    label: { en: 'Frameworks & Tools', zh: '框架与工具' },
    skills: [
      { name: 'ROS2',       level: 80 },
      { name: 'Flutter',    level: 78 },
      { name: 'Next.js',    level: 75 },
      { name: 'Unity (VR)', level: 72 },
      { name: 'TensorFlow', level: 60 },
    ],
  },
  {
    id: 'hardware',
    label: { en: 'Hardware Platforms', zh: '硬件平台' },
    skills: [
      { name: 'ESP32 / ESP8266', level: 88 },
      { name: 'Raspberry Pi',    level: 85 },
      { name: 'Arduino',         level: 85 },
      { name: 'STM32',           level: 60 },
    ],
  },
]

/* ── Animated skill row (count-up + bar) ───────────────────────────── */
function SkillRow({ name, level, delay }: { name: string; level: number; delay: number }) {
  const count = useMotionValue(0)
  const displayCount = useTransform(count, v => `${Math.round(v)}%`)

  useEffect(() => {
    const anim = animate(count, level, { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] })
    return () => anim.stop()
  }, [count, level, delay])

  return (
    <div>
      <div className={styles.skillLabel}>
        <span className="font-mono font-bold text-[1em]">{name}</span>
        <motion.span className="font-mono text-[0.875em] font-bold text-[var(--color-accent)]">
          {displayCount}
        </motion.span>
      </div>
      <div className="h-[3px] w-full bg-[var(--color-border)] relative overflow-hidden">
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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const colVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

export default function DatabaseContent() {
  const { t } = useLanguage()

  return (
    <PageEntrance page="database" records={skillCategories.map(category => ({ id: category.id, label: t(category.label.en, category.label.zh), meta: String(category.skills.length).padStart(2, '0') }))}>
      <PageLayout>

        {/* ── Header ── */}
        <div className={`panel-acrylic ${styles.panelPadding}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
            <span className="font-mono text-[0.75em] text-[var(--color-muted)] uppercase tracking-widest">
              {t('Skills · Tools · Hardware', '技能 · 工具 · 硬件')}
            </span>
          </div>
          <h1 className={`${styles.title} font-bold tracking-tighter uppercase`}>
            {t('Skill Matrix', '技能矩阵')}
          </h1>
        </div>

        {/* ── Skill columns ── */}
        <motion.div
          className={styles.skillGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {skillCategories.map(({ id, label, skills }, colIdx) => (
            <motion.div key={id} variants={colVariants} className={`panel-acrylic flex flex-col ${styles.skillPanel}`}>
              <div className="flex items-center gap-4 mb-8">
                <h3 className={`${styles.skillHeading} font-mono font-bold uppercase text-[var(--color-muted)]`}>
                  {t(label.en, label.zh)}
                </h3>
                <div className="flex-1 h-px bg-[var(--color-border)]" />
              </div>

              <div className={styles.skillRows}>
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

      </PageLayout>
    </PageEntrance>
  )
}
