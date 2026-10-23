import type { Experience } from '@/content/experience'

export const TIMELINE_CARD_WIDTH = 304
export const TIMELINE_GROUP_GAP = 20
export const TIMELINE_REVEAL_DISTANCE = 220

/** Use the rail's CSS width so display scaling and browser zoom are respected. */
export function experienceTimelineMetrics(railWidth: number) {
  const scale = Math.round(Math.max(1, Math.min(1.35, railWidth / 1440)) * 100) / 100
  return {
    scale,
    cardWidth: railWidth > 0 ? Math.min(TIMELINE_CARD_WIDTH * scale, Math.max(216, railWidth - 32)) : TIMELINE_CARD_WIDTH,
    cardHeight: 252 * scale,
    collapsedHeight: 172 * scale,
    summaryHeight: 70 * scale,
    summaryGap: 12 * scale,
    focusDistance: 348 * scale,
    monthWidth: 64 * scale,
  }
}

export type ExperienceTimelineMetrics = ReturnType<typeof experienceTimelineMetrics>

export function monthNumber(date: string) {
  const [year, month] = date.split('-').map(Number)
  return year * 12 + month - 1
}

export function monthString(month: number) {
  return `${Math.floor(month / 12)}-${String(month % 12 + 1).padStart(2, '0')}`
}

export function formatExperienceDate(date: string, lang: 'en' | 'zh') {
  const [year, month] = date.split('-')
  const names = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  return lang === 'zh' ? `${year}.${month}` : `${names[Number(month) - 1]} ${year}`
}

/** Share a date anchor within each month; leave room for the opened group. */
export function buildExperienceTimeline(items: Experience[], asOfDate: string, metrics = experienceTimelineMetrics(1440)) {
  const firstMonth = Math.min(...items.map(item => monthNumber(item.startDate)))
  const lastMonth = Math.max(monthNumber(asOfDate), ...items.map(item => monthNumber(item.endDate ?? asOfDate)))
  const events = items.filter(item => item.category !== 'education')
  const dates: { date: string; x: number; major: boolean }[] = []
  const datePositions = new Map<string, number>()
  const eventPositions = new Map<string, { x: number; anchor: number }>()
  const groups: { date: string; x: number; ids: string[] }[] = []
  let cursor = 0
  let previousGroup = -Infinity
  let previousWidth = 0

  for (let month = firstMonth; month <= lastMonth; month++) {
    const date = monthString(month)
    const group = events.filter(item => item.startDate === date)
      .sort((a, b) => (
        (a.endDate ?? '9999-12').localeCompare(b.endDate ?? '9999-12') ||
        b.serial.localeCompare(a.serial)
      ))
    const groupWidth = group.length * metrics.cardWidth + Math.max(0, group.length - 1) * TIMELINE_GROUP_GAP
    if (group.length) cursor = Math.max(cursor, previousGroup + (previousWidth + groupWidth) / 2 + 44 * metrics.scale)
    const anchor = cursor
    datePositions.set(date, anchor)
    dates.push({ date, x: anchor, major: month % 12 === 0 || month === firstMonth })

    if (group.length) {
      groups.push({ date, x: anchor, ids: group.map(item => item.id).reverse() })
      group.forEach(item => eventPositions.set(item.id, { x: anchor, anchor }))
      previousGroup = anchor
      previousWidth = groupWidth
    }
    cursor += metrics.monthWidth
  }

  const laneEnds: number[] = []
  const periods = items.filter(item => item.period)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .map(item => {
      const start = datePositions.get(item.startDate)!
      const end = datePositions.get(item.endDate ?? asOfDate)!
      let lane = laneEnds.findIndex(lastEnd => lastEnd <= start)
      if (lane === -1) lane = laneEnds.length
      laneEnds[lane] = end
      return { item, start, end, lane }
    })

  const stops = items.map(item => {
    const event = eventPositions.get(item.id)
    const period = periods.find(entry => entry.item.id === item.id)
    return { id: item.id, x: event?.x ?? period!.start + Math.min(150, (period!.end - period!.start) / 2) }
  }).sort((a, b) => a.x - b.x)

  return {
    dates: dates.map(tick => ({ ...tick, x: cursor - tick.x })).reverse(),
    groups: groups.map(group => ({ ...group, x: cursor - group.x })).reverse(),
    eventPositions: new Map(Array.from(eventPositions).map(([id, point]) => [id, {
      x: cursor - point.x,
      anchor: cursor - point.anchor,
    }])),
    periods: periods.map(period => ({
      ...period,
      start: cursor - period.end,
      end: cursor - period.start,
    })).reverse(),
    stops: stops.map(stop => ({ ...stop, x: cursor - stop.x })).reverse(),
    width: cursor,
    laneCount: laneEnds.length,
  }
}

export type ExperienceTimelineLayout = ReturnType<typeof buildExperienceTimeline>

/** Extra scroll distance unfolds siblings while the visible date stays still. */
export function buildExperienceJourney(layout: ExperienceTimelineLayout, visibleIds: Set<string>) {
  let extra = 0
  const groups = layout.groups.map(group => ({ ...group, ids: group.ids.filter(id => visibleIds.has(id)) }))
    .filter(group => group.ids.length > 0)
    .map(group => {
      const start = group.x + extra
      const end = start + (group.ids.length - 1) * TIMELINE_REVEAL_DISTANCE
      extra += end - start
      return { ...group, start, end }
    })
  const stops = layout.stops.filter(stop => visibleIds.has(stop.id)).map(stop => {
    const group = groups.find(entry => entry.ids.includes(stop.id))
    const x = group
      ? group.start + group.ids.indexOf(stop.id) * TIMELINE_REVEAL_DISTANCE
      : stop.x + groups.filter(entry => entry.x < stop.x).reduce((total, entry) => total + entry.end - entry.start, 0)
    return { id: stop.id, x }
  }).sort((a, b) => a.x - b.x)

  return { groups, stops, width: layout.width + extra }
}

export type ExperienceJourney = ReturnType<typeof buildExperienceJourney>
export type ExperienceEventGroup = ExperienceJourney['groups'][number]

export function timelineTimeAt(journey: ExperienceJourney, position: number) {
  let extra = 0
  for (const group of journey.groups) {
    if (position < group.start) break
    if (position <= group.end) return group.x
    extra += group.end - group.start
  }
  return position - extra
}

export function timelineGroupReveal(group: ExperienceEventGroup, position: number) {
  return Math.max(0, Math.min(group.ids.length - 1, (position - group.start) / TIMELINE_REVEAL_DISTANCE))
}

export function timelineCardOffset(index: number, revealed: number, compact: boolean, cardWidth = TIMELINE_CARD_WIDTH) {
  const visibility = index === 0 ? 1 : Math.max(0, Math.min(1, revealed - index + 1))
  const step = cardWidth + TIMELINE_GROUP_GAP
  return step * (index - revealed * (compact ? 1 : .5)) + (1 - visibility) * 32
}
