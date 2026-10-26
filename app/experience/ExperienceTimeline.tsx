'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform, type MotionValue } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, MoveHorizontal } from 'lucide-react'
import type { Experience } from '@/content/experience'
import { useLanguage } from '@/lib/language'
import {
  buildExperienceJourney, buildExperienceTimeline, experienceTimelineMetrics, timelineCardOffset, timelineGroupReveal, timelineTimeAt,
  TIMELINE_GROUP_GAP, type ExperienceEventGroup, type ExperienceTimelineMetrics,
} from '@/lib/experience-timeline'
import { experienceCategories } from './experience-labels'
import styles from './experience.module.css'
import { useTimelineIntro, type TimelineIntroMode } from './useTimelineIntro'

type OngoingSpan = { start: number; end: number }

function EventCard({ item, index, group, travel, timeX, metrics, compact, focused, span, onKeyboardFocus }: {
  item: Experience
  index: number
  group: ExperienceEventGroup
  travel: MotionValue<number>
  timeX: MotionValue<number>
  metrics: ExperienceTimelineMetrics
  compact: boolean
  focused: boolean
  span?: OngoingSpan
  onKeyboardFocus: () => void
}) {
  const { t } = useLanguage()
  const reduceMotion = useReducedMotion()
  const reveal = useTransform(travel, value => timelineGroupReveal(group, value))
  const visibility = useTransform(reveal, value => index === 0 ? 1 : Math.max(0, Math.min(1, value - index + 1)))
  const offset = useTransform(reveal, value => span ? 0 : timelineCardOffset(index, value, compact, metrics.cardWidth))
  const distance = useTransform(timeX, value => {
    const separation = span ? Math.max(span.start - value, value - span.end, 0) : Math.abs(value - group.x)
    return Math.min(1, separation / metrics.focusDistance)
  })
  // A duration's horizontal edges stay attached to their dates while it focuses.
  const scale = useTransform(distance, value => reduceMotion || span ? 1 : 1 - value * .13)
  const opacity = useTransform([distance, visibility], ([nearby, visible]: number[]) => (1 - nearby * .48) * visible)
  const height = useTransform(distance, value => reduceMotion ? metrics.cardHeight : metrics.cardHeight - value * (metrics.cardHeight - metrics.collapsedHeight))
  const summaryOpacity = useTransform(distance, value => Math.max(0, 1 - value * 2.5))
  const summaryHeight = useTransform(distance, value => reduceMotion ? metrics.summaryHeight : Math.max(0, 1 - value * 2) * metrics.summaryHeight)
  const summaryGap = useTransform(distance, value => reduceMotion ? metrics.summaryGap : Math.max(0, 1 - value * 2) * metrics.summaryGap)
  const [interactive, setInteractive] = useState(index === 0 || visibility.get() > .05)
  const interactiveRef = useRef(interactive)
  useMotionValueEvent(visibility, 'change', value => {
    const next = value > .05
    if (next !== interactiveRef.current) {
      interactiveRef.current = next
      setInteractive(next)
    }
  })
  const category = experienceCategories[item.category]
  const Icon = category.icon

  return (
    <motion.div
      className={styles.event}
      style={{ x: offset, width: span ? Math.max(1, span.end - span.start) : metrics.cardWidth, marginLeft: span ? span.start - group.x : -metrics.cardWidth / 2, scale, opacity, height, pointerEvents: interactive ? 'auto' : 'none' }}
      data-focused={focused}
      data-event-id={item.id}
      data-ongoing={Boolean(span)}
      aria-hidden={!interactive}
    >
      <Link
        href={`/experience/${item.id}?view=timeline`}
        className={styles.eventLink}
        aria-label={`${t(item.timelineTitle.en, item.timelineTitle.zh)}${span ? ` · ${item.startDate} — ${t('Present', '至今')}` : ''} · ${t('View record', '查看详情')}`}
        aria-current={focused ? 'true' : undefined}
        tabIndex={interactive ? 0 : -1}
        onFocus={event => { if (event.currentTarget.matches(':focus-visible')) onKeyboardFocus() }}
        draggable={false}
      >
        <div className={`${styles.eventContent} ${span ? styles.ongoingContent : ''}`}>
        <div className={styles.eventType}>
          <span><Icon size={12} aria-hidden="true" />{t(category.en, category.zh)}</span>
          {span ? <span className={styles.ongoingBadge}><i />{t('Ongoing', '进行中')}</span> : <span className={styles.eventSerial}>{group.ids.length > 1 ? `${index + 1} / ${group.ids.length}` : item.serial.slice(-3)}</span>}
        </div>
        <h3>{t(item.timelineTitle.en, item.timelineTitle.zh)}</h3>
        <p className={styles.eventRole}>{span && <>{t(item.organization.en, item.organization.zh)} · </>}{t(item.role.en, item.role.zh)}</p>
        <motion.p className={styles.eventSummary} style={{ opacity: reduceMotion ? 1 : summaryOpacity, height: summaryHeight, marginTop: summaryGap }}>
          {t(item.summary.en, item.summary.zh)}
        </motion.p>
        <span className={styles.eventOpen}>
          {span && <span className={styles.ongoingDates}>{item.startDate.replace('-', '.')} — {t('NOW', '至今')}</span>}
          <span className={styles.recordAction}>{t('Open record', '打开档案')}<ArrowUpRight size={13} aria-hidden="true" /></span>
        </span>
        </div>
      </Link>
    </motion.div>
  )
}

function EventGroup({ group, items, travel, timeX, width, metrics, focusId, ongoingSpans, onKeyboardFocus }: {
  group: ExperienceEventGroup
  items: Experience[]
  travel: MotionValue<number>
  timeX: MotionValue<number>
  width: number
  metrics: ExperienceTimelineMetrics
  focusId: string
  ongoingSpans: Map<string, OngoingSpan>
  onKeyboardFocus: (id: string) => void
}) {
  const { t } = useLanguage()
  const compact = width < group.ids.length * metrics.cardWidth + (group.ids.length - 1) * TIMELINE_GROUP_GAP + 80 * metrics.scale
  const active = group.ids.includes(focusId)
  const labelOpacity = useTransform(timeX, value => Math.max(0, 1 - Math.abs(value - group.x) / 140))

  return (
    <div className={styles.eventGroup} style={{ left: group.x }} data-event-group={group.date} data-group-active={active}>
      <span className={styles.groupStem} aria-hidden="true" />
      {group.ids.length > 1 && <motion.span className={styles.groupCount} style={{ opacity: labelOpacity }} aria-hidden="true">
        {group.ids.length} {t('records · same month', '条经历 · 同月')}
      </motion.span>}
      {group.ids.map((id, index) => <EventCard
        key={id}
        item={items.find(item => item.id === id)!}
        index={index}
        group={group}
        travel={travel}
        timeX={timeX}
        metrics={metrics}
        compact={compact}
        focused={focusId === id}
        span={ongoingSpans.get(id)}
        onKeyboardFocus={() => onKeyboardFocus(id)}
      />)}
    </div>
  )
}

export default function ExperienceTimeline({ items, visibleItems, asOfDate, focusId, onFocusChange, ready, introMode, onIntroComplete }: {
  items: Experience[]
  visibleItems: Experience[]
  asOfDate: string
  focusId: string
  onFocusChange: (id: string) => void
  ready: boolean
  introMode: TimelineIntroMode
  onIntroComplete: () => void
}) {
  const { t } = useLanguage()
  const reduceMotion = useReducedMotion()
  const [{ width, height }, setViewport] = useState({ width: 0, height: 0 })
  const metrics = useMemo(() => experienceTimelineMetrics(width, height), [width, height])
  const layout = useMemo(() => buildExperienceTimeline(items, asOfDate, metrics), [items, asOfDate, metrics])
  const visibleIds = useMemo(() => new Set(visibleItems.map(item => item.id)), [visibleItems])
  const journey = useMemo(() => buildExperienceJourney(layout, visibleIds, width), [layout, visibleIds, width])
  const stops = journey.stops
  const periods = layout.periods.filter(({ item }) => visibleIds.has(item.id) || visibleItems.some(event => event.parentId === item.id))
  const ongoingSpans = useMemo(() => new Map(layout.periods
    .filter(({ item }) => item.category !== 'education' && item.endDate === null)
    .map(({ item, start, end }) => [item.id, { start, end }])), [layout])
  const railRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<HTMLSpanElement>(null)
  const rangeRef = useRef<HTMLInputElement>(null)
  const frameRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const targetRef = useRef(0)
  const lastReported = useRef<string>()
  const lastJourney = useRef(journey)
  const restoredCursor = useRef(false)
  const ignoreScrollFocus = useRef(false)
  const periodStackHeight = (layout.laneCount - 1) * metrics.periodStep + (layout.laneCount > 1 ? metrics.secondaryPeriodHeight : metrics.periodHeight)
  const minAxisY = 58 + metrics.cardHeight + metrics.periodGap + periodStackHeight
  const axisY = Math.max(minAxisY, Math.min(height * .54, height - metrics.bottomSpace))
  const travel = useMotionValue(0)
  const timeX = useTransform(travel, value => timelineTimeAt(journey, value))
  const coordinateShift = useTransform(travel, value => value - timelineTimeAt(journey, value))
  const progress = useTransform(travel, value => value / journey.width)
  const currentIndex = Math.max(0, stops.findIndex(stop => stop.id === focusId))
  const focusedItem = items.find(item => item.id === focusId) ?? visibleItems[0]
  const entryAnchor = timelineTimeAt(journey, stops.find(stop => stop.id === focusId)?.x ?? 0)
  const cursorSignature = stops.map(stop => `${stop.id}:${stop.x}`).join('|')

  const animateTo = useCallback((destination: number) => {
    const rail = railRef.current
    if (!rail) return
    targetRef.current = Math.max(0, Math.min(journey.width, destination))
    if (reduceMotion) {
      rail.scrollLeft = targetRef.current
      return
    }
    if (frameRef.current) return
    let lastTime = performance.now()
    const tick = (time: number) => {
      const elapsed = Math.min(40, time - lastTime)
      lastTime = time
      const remaining = targetRef.current - rail.scrollLeft
      if (Math.abs(remaining) < 2.5) {
        rail.scrollLeft = targetRef.current
        frameRef.current = 0
        return
      }
      rail.scrollLeft += remaining * (1 - Math.exp(-elapsed / 65))
      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
  }, [journey.width, reduceMotion])

  const nearestStop = useCallback((position: number) => stops.reduce((nearest, stop) => (
    Math.abs(stop.x - position) < Math.abs(nearest.x - position) ? stop : nearest
  ), stops[0]), [stops])

  const moveTo = useCallback((id: string) => {
    const stop = stops.find(entry => entry.id === id)
    if (!stop) return
    lastReported.current = id
    onFocusChange(id)
    animateTo(stop.x)
  }, [stops, onFocusChange, animateTo])

  const focusCard = useCallback((id: string) => {
    const group = journey.groups.find(entry => entry.ids.includes(id))
    const position = railRef.current?.scrollLeft ?? 0
    if (group && position >= group.start && position <= group.end + 1 && group.ids.indexOf(id) <= timelineGroupReveal(group, position)) {
      lastReported.current = id
      onFocusChange(id)
      return
    }
    moveTo(id)
  }, [journey, onFocusChange, moveTo])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    const observer = new ResizeObserver(([entry]) => {
      setViewport({ width: entry.contentRect.width, height: rail.parentElement?.clientHeight ?? 0 })
    })
    observer.observe(rail)
    return () => observer.disconnect()
  }, [])

  // Restore the same record after changing view, resizing or returning from a detail page.
  useEffect(() => {
    const rail = railRef.current
    const stop = stops.find(entry => entry.id === focusId)
    if (!ready || !rail || !width || !stop) return
    if (lastReported.current !== focusId || lastJourney.current !== journey) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = 0
      clearTimeout(timerRef.current)
      let position = stop.x
      if (!restoredCursor.current) {
        restoredCursor.current = true
        try {
          const saved = JSON.parse(sessionStorage.getItem('experience-timeline-cursor') ?? '{}')
          const group = journey.groups.find(entry => entry.ids.includes(focusId))
          if (introMode !== 'play' && saved.signature === cursorSignature && (saved.focusId === focusId || group?.ids.includes(saved.focusId)) && Number.isFinite(saved.position)) {
            position = Math.max(0, Math.min(journey.width, saved.position))
          }
        } catch { /* The timeline also works without browser storage. */ }
      }
      ignoreScrollFocus.current = Math.abs(rail.scrollLeft - position) > .5
      rail.scrollLeft = position
      targetRef.current = position
      travel.set(position)
      lastReported.current = focusId
      lastJourney.current = journey
      if (rangeRef.current) rangeRef.current.value = String(position)
    }
  }, [focusId, stops, width, travel, journey, cursorSignature, ready, introMode])

  const intro = useTimelineIntro({
    mode: introMode, geometryReady: ready && width > 0 && axisY >= minAxisY,
    markerRef, count: items.length, onComplete: onIntroComplete,
  })

  useEffect(() => {
    if (!ready) return
    return () => {
      try {
        sessionStorage.setItem('experience-timeline-cursor', JSON.stringify({ signature: cursorSignature, focusId: lastReported.current, position: travel.get() }))
      } catch { /* Keep navigation usable when storage is unavailable. */ }
    }
  }, [cursorSignature, travel, ready])

  useEffect(() => {
    const rail = railRef.current
    if (!ready || !rail || !stops.length) return
    const onScroll = () => {
      const position = rail.scrollLeft
      travel.set(position)
      if (rangeRef.current) rangeRef.current.value = String(position)
      const nearest = nearestStop(position)
      if (!ignoreScrollFocus.current && nearest.id !== lastReported.current) {
        lastReported.current = nearest.id
        onFocusChange(nearest.id)
      }
      ignoreScrollFocus.current = false
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        const stop = nearestStop(rail.scrollLeft)
        const span = ongoingSpans.get(stop.id)
        if (span) {
          const currentTime = timelineTimeAt(journey, rail.scrollLeft)
          const boundedTime = Math.max(span.start, Math.min(span.end, currentTime))
          // Allow free exploration within a current appointment, including NOW.
          if (boundedTime !== currentTime) animateTo(rail.scrollLeft + boundedTime - currentTime)
          return
        }
        if (Math.abs(stop.x - rail.scrollLeft) > 1) animateTo(stop.x)
      }, 180)
    }
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) return
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      const amount = delta * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? rail.clientWidth : 1)
      const position = frameRef.current ? targetRef.current : rail.scrollLeft
      // Let the page continue scrolling once the horizontal journey reaches an end.
      if (!amount || (amount < 0 && position <= 0) || (amount > 0 && position >= journey.width)) return
      event.preventDefault()
      clearTimeout(timerRef.current)
      animateTo(position + amount)
    }
    rail.addEventListener('scroll', onScroll, { passive: true })
    rail.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      rail.removeEventListener('scroll', onScroll)
      rail.removeEventListener('wheel', onWheel)
      clearTimeout(timerRef.current)
    }
  }, [stops, travel, nearestStop, onFocusChange, animateTo, journey, ongoingSpans, ready])

  useEffect(() => () => {
    cancelAnimationFrame(frameRef.current)
    clearTimeout(timerRef.current)
  }, [])

  return (
    <section className={styles.timeline} style={{ '--axis-y': `${axisY}px`, '--half-width': `${width / 2}px`, '--timeline-unit': `${metrics.scale}px`, '--entry-axis-center': `${entryAnchor + width / 2}px` } as CSSProperties} data-compact={metrics.compact} data-dense={metrics.dense} data-intro-stage={intro.stage} data-intro-active={intro.active} aria-busy={intro.stage !== 'complete'} aria-label={t('Interactive experience timeline', '交互式经历时间轴')}>
      <div className={styles.timelineTopline}>
        <span><span className={styles.smallSquare} />{t('Newest to oldest', '由近及远')}</span>
        <span className={styles.timelineInstructions} id="timeline-help"><MoveHorizontal size={13} aria-hidden="true" />{t('SCROLL TO EXPLORE & UNFOLD · CLICK TO OPEN', '滚轮浏览与展开 · 点击查看详情')}</span>
      </div>

      <div
        ref={railRef}
        className={styles.rail}
        role="region"
        tabIndex={0}
        aria-label={t('Scroll through time', '滚动浏览时间')}
        aria-describedby="timeline-help"
        onKeyDown={event => {
          if (event.target !== event.currentTarget) return
          let next: number | undefined
          if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = Math.min(stops.length - 1, currentIndex + 1)
          if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = Math.max(0, currentIndex - 1)
          if (event.key === 'Home') next = 0
          if (event.key === 'End') next = stops.length - 1
          if (next !== undefined) { event.preventDefault(); moveTo(stops[next].id) }
        }}
      >
        <div className={styles.track} style={{ width: width + journey.width }}>
          <motion.div className={styles.coordinates} style={{ left: width / 2, width: layout.width, x: coordinateShift }}>
            <div className={styles.axis} aria-hidden="true" />

            {layout.dates.map(tick => {
              const isEventDate = visibleItems.some(item => item.startDate === tick.date)
              const isBoundaryDate = periods.some(({ item }) => item.startDate === tick.date || (item.endDate ?? asOfDate) === tick.date)
              const selectedDate = focusedItem?.startDate === tick.date
              return (
                <div key={tick.date} className={styles.tick} style={{ left: tick.x, '--entry-delay': `${.42 + Math.min(.32, Math.abs(tick.x - entryAnchor) / Math.max(1, width) * .32)}s` } as CSSProperties} data-major={tick.major} data-event={isEventDate} data-boundary={isBoundaryDate} data-selected={selectedDate}>
                  <span aria-hidden="true" />
                  {tick.date !== asOfDate.slice(0, 7) && (tick.major || isEventDate || isBoundaryDate) && <><i className={styles.datePlaceholder} aria-hidden="true">----.--</i><time dateTime={tick.date}>{tick.date.replace('-', '.')}</time></>}
                </div>
              )
            })}

            <div className={`${styles.tick} ${styles.nowTick}`} style={{ left: layout.now.x, '--entry-delay': '.5s' } as CSSProperties} data-now-date={layout.now.date}>
              <span aria-hidden="true" />
              <time dateTime={layout.now.date}>{t('NOW', '今天')} · {layout.now.date.replaceAll('-', '.')}</time>
            </div>

            {periods.filter(({ item }) => !ongoingSpans.has(item.id)).map(({ item, start, end, lane }) => {
              const active = focusId === item.id || focusedItem?.parentId === item.id
              const category = experienceCategories[item.category]
              const Icon = category.icon
              return (
                <Link
                  key={item.id}
                  href={`/experience/${item.id}?view=timeline`}
                  className={styles.period}
                  style={{ left: start, width: Math.max(1, end - start), height: lane === 0 ? metrics.periodHeight : metrics.secondaryPeriodHeight, top: Math.max(0, axisY - 58 - metrics.cardHeight - metrics.periodGap - periodStackHeight) + lane * metrics.periodStep, '--entry-period-delay': `${.74 + lane * .08}s` } as CSSProperties}
                  data-active={active}
                  data-lane={lane}
                  data-category={item.category}
                  data-current={!item.endDate}
                  data-period-id={item.id}
                  aria-label={`${t(item.organization.en, item.organization.zh)} · ${t(item.role.en, item.role.zh)} · ${item.startDate} — ${item.endDate ?? t('Present', '至今')}`}
                  onFocus={event => { if (event.currentTarget.matches(':focus-visible') && visibleIds.has(item.id)) moveTo(item.id) }}
                >
                  <span className={styles.periodLabel}>
                    <span className={styles.periodTitle}><Icon size={13} aria-hidden="true" />{item.category === 'education' ? t(item.timelineTitle.en, item.timelineTitle.zh) : t(item.organization.en, item.organization.zh)}<ArrowUpRight size={11} aria-hidden="true" /></span>
                    <span className={styles.periodSubtitle}><span>{t(item.role.en, item.role.zh)}</span><span className={styles.periodDates}>{item.startDate.replace('-', '.')} — {item.endDate?.replace('-', '.') ?? t('NOW', '至今')}</span></span>
                  </span>
                  {!item.endDate && <span className={styles.periodPresent}><ArrowLeft size={11} aria-hidden="true" />{t('NOW', '至今')}</span>}
                </Link>
              )
            })}

            {journey.groups.map(group => <EventGroup
              key={group.date}
              group={group}
              items={visibleItems}
              travel={travel}
              timeX={timeX}
              width={width}
              metrics={metrics}
              focusId={focusId}
              ongoingSpans={ongoingSpans}
              onKeyboardFocus={focusCard}
            />)}
          </motion.div>
        </div>
      </div>

      <div className={styles.centerMarker} aria-hidden="true"><span ref={markerRef} /><i /></div>

      {intro.stage !== 'complete' && <>
        <div className={styles.entrySweep} aria-hidden="true"><i /></div>
        <div className={styles.entryHud} role="status" aria-live="polite">
          <span className={styles.entryStatus}><i />{intro.stage === 'indexing' ? t('INDEXING EXPERIENCE', '经历档案归位') : intro.stage === 'locking' ? t('PRESENT POSITION LOCKED', '当前坐标已锁定') : t('CALIBRATING TIME AXIS', '校准时间坐标')}</span>
          <span className={styles.entryCounter} aria-hidden="true">{String(intro.indexed).padStart(2, '0')} / {String(items.length).padStart(2, '0')} {t('RECORDS', '条档案')}<i />{intro.stage === 'locking' ? focusedItem?.startDate.replace('-', '.') : '----.--'}</span>
        </div>
      </>}

      <div className={styles.timelineReadout}>
        <div className={styles.readoutLabel}><span>{String(currentIndex + 1).padStart(2, '0')} / {String(stops.length).padStart(2, '0')}</span><span>{focusedItem?.serial}</span></div>
        <div className={styles.readoutContent} role="status" aria-live="polite" aria-atomic="true">
          <span>{focusedItem && t(focusedItem.summary.en, focusedItem.summary.zh)}</span>
          {focusedItem && <Link href={`/experience/${focusedItem.id}?view=timeline`} aria-label={t('View selected record', '查看当前经历详情')}><ArrowUpRight size={18} aria-hidden="true" /></Link>}
        </div>
      </div>

      <div className={styles.timelineBottom}>
        <div className={styles.navigation}>
          <button type="button" onClick={() => moveTo(stops[currentIndex - 1].id)} disabled={currentIndex === 0} aria-label={t('Newer experience', '更新的经历')}><ArrowLeft size={16} aria-hidden="true" /></button>
          <button type="button" onClick={() => moveTo(stops[currentIndex + 1].id)} disabled={currentIndex === stops.length - 1} aria-label={t('Older experience', '更早的经历')}><ArrowRight size={16} aria-hidden="true" /></button>
        </div>
        <div className={styles.scrubber}>
          <div className={styles.progressTrack}><motion.div style={{ scaleX: progress }} /></div>
          <input ref={rangeRef} type="range" min={0} max={journey.width} defaultValue={0} step={1} aria-label={t('Timeline position', '时间轴位置')} onChange={event => {
            cancelAnimationFrame(frameRef.current)
            frameRef.current = 0
            if (railRef.current) railRef.current.scrollLeft = Number(event.target.value)
          }} />
          <div className={styles.yearLabels} aria-hidden="true"><span>{asOfDate.slice(0, 4)}</span><span>{items[items.length - 1]?.startDate.slice(0, 4)}</span></div>
        </div>
        <span className={styles.keyboardHint}>{t('← → TO NAVIGATE', '← → 切换经历')}</span>
      </div>
    </section>
  )
}
