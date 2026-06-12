'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language'

/* ── Category hues (harmonised green→teal→cyan, same cold family as lime) ── */
const CATEGORIES = [
  { id: 'lang',      label: { en: 'Languages',  zh: '语言' }, rgb: '163, 230, 53' }, // lime (accent)
  { id: 'framework', label: { en: 'Frameworks', zh: '框架' }, rgb: '52, 211, 153' }, // emerald
  { id: 'hardware',  label: { en: 'Hardware',   zh: '硬件' }, rgb: '34, 211, 238' }, // cyan
] as const

type CatId = typeof CATEGORIES[number]['id']
const catRgb = (id: CatId) => CATEGORIES.find(c => c.id === id)!.rgb

/* ── Skills — ordered by category, fills the cluster top→bottom ─────── */
const skills: { name: string; level: number; cat: CatId }[] = [
  { name: 'Python',       level: 90, cat: 'lang' },
  { name: 'TypeScript',   level: 82, cat: 'lang' },
  { name: 'C++',          level: 75, cat: 'lang' },
  { name: 'Dart',         level: 70, cat: 'lang' },
  { name: 'C#',           level: 65, cat: 'lang' },
  { name: 'ROS2',         level: 80, cat: 'framework' },
  { name: 'Flutter',      level: 78, cat: 'framework' },
  { name: 'Next.js',      level: 75, cat: 'framework' },
  { name: 'Unity',        level: 72, cat: 'framework' },
  { name: 'TensorFlow',   level: 60, cat: 'framework' },
  { name: 'ESP32',        level: 88, cat: 'hardware' },
  { name: 'Raspberry Pi', level: 85, cat: 'hardware' },
  { name: 'Arduino',      level: 85, cat: 'hardware' },
  { name: 'STM32',        level: 60, cat: 'hardware' },
]

/** Cluster shape: rows of these lengths form a hexagonal blob (sum must = skills.length) */
const ROW_COUNTS = [2, 3, 4, 3, 2]

/** mastery → opacity (deeper = more proficient) */
const alphaOf = (level: number) => 0.2 + Math.max(0, Math.min(1, (level - 55) / 40)) * 0.78

/** pointy-top hexagon */
const HEX_CLIP = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

/* Hex geometry — height = width * 2/√3; rows overlap by 1/4 height to interlock. */
const HEX_W = 130
const HEX_H = 150
const ROW_H = HEX_H * 0.75

function SkillHex({ name, level, cat, x, y, delay }: {
  name: string; level: number; cat: CatId; x: number; y: number; delay: number
}) {
  const alpha = alphaOf(level)
  const dark  = alpha > 0.6
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.1, zIndex: 20 }}
      className="absolute"
      style={{ left: x, top: y, width: HEX_W, height: HEX_H }}
    >
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ clipPath: HEX_CLIP, background: `rgba(${catRgb(cat)}, ${alpha})` }}
      >
        <span
          className="font-mono text-[13px] font-bold leading-tight text-center px-4"
          style={{ color: dark ? '#0d0d0e' : 'var(--color-text)' }}
        >
          {name}
        </span>
        <span
          className="font-mono text-[10px] mt-1 tabular-nums"
          style={{ color: dark ? 'rgba(0,0,0,0.5)' : 'var(--color-muted)' }}
        >
          {level}
        </span>
      </div>
    </motion.div>
  )
}

/* ── Hexagonal cluster — fixed blob shape, scales down on narrow screens ── */
function Honeycomb() {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  const maxCols = Math.max(...ROW_COUNTS)
  const gridW   = maxCols * HEX_W
  const gridH   = (ROW_COUNTS.length - 1) * ROW_H + HEX_H

  useEffect(() => {
    const measure = () => {
      const w = ref.current?.offsetWidth ?? gridW
      setScale(Math.min(1, w / gridW))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [gridW])

  /* place each skill into the blob */
  const placed: { s: typeof skills[number]; x: number; y: number }[] = []
  let idx = 0
  ROW_COUNTS.forEach((count, row) => {
    const startX = (gridW - count * HEX_W) / 2
    for (let c = 0; c < count && idx < skills.length; c++) {
      placed.push({ s: skills[idx++], x: startX + c * HEX_W, y: row * ROW_H })
    }
  })

  return (
    <div ref={ref} className="w-full flex justify-center" style={{ height: gridH * scale }}>
      <div
        className="relative"
        style={{ width: gridW, height: gridH, transform: `scale(${scale})`, transformOrigin: 'top center' }}
      >
        {placed.map(({ s, x, y }, i) => (
          <SkillHex key={s.name} name={s.name} level={s.level} cat={s.cat} x={x} y={y} delay={i * 0.045} />
        ))}
      </div>
    </div>
  )
}

export default function DatabaseContent() {
  const { t } = useLanguage()

  return (
    <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto space-y-6">

      {/* ── Header + legend ── */}
      <div className="panel-acrylic p-6 md:p-8 relative overflow-hidden">
        <div className="absolute inset-0 hud-scanlines pointer-events-none" />
        <div className="relative flex flex-col gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-breathe" />
              <span className="font-mono text-[9px] text-[var(--color-muted)] uppercase tracking-widest">
                {t('Capability Grid', '能力网格')}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">
              {t('Skill Matrix', '技能矩阵')}
            </h1>
          </div>

          {/* Legend: colour = category, depth = mastery */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 border-t border-[var(--color-border)]">
            {CATEGORIES.map(c => (
              <div key={c.id} className="flex items-center gap-2">
                <span className="w-3.5 h-4 shrink-0" style={{ clipPath: HEX_CLIP, background: `rgba(${c.rgb}, 0.9)` }} />
                <span className="font-mono text-[10px] font-bold text-[var(--color-text)] uppercase tracking-wider">
                  {t(c.label.en, c.label.zh)}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-2 ml-auto">
              <span className="font-mono text-[9px] text-[var(--color-muted)] uppercase tracking-wider">{t('Mastery', '熟练度')}</span>
              <div className="flex items-center gap-1">
                {[0.25, 0.45, 0.66, 0.9].map((a, i) => (
                  <span key={i} className="w-3.5 h-4" style={{ clipPath: HEX_CLIP, background: `rgba(120, 210, 140, ${a})` }} />
                ))}
              </div>
              <span className="font-mono text-[8px] text-[var(--color-muted)] uppercase">{t('low / high', '低 / 高')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Hexagonal cluster ── */}
      <div className="panel-acrylic p-8 md:p-12">
        <Honeycomb />
      </div>

    </div>
  )
}
