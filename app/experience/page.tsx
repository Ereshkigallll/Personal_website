import type { Metadata } from 'next'
import { experiences } from '@/content/experience'
import ExperienceContent from './ExperienceContent'

export const metadata: Metadata = {
  title: 'Experience — Yutong Zhang',
  description: 'Education, work, research and teaching — an interactive timeline of robotics, sensing and human-computer interaction.',
}

export default function ExperiencePage() {
  const items = [...experiences].sort((a, b) => (
    b.startDate.localeCompare(a.startDate) ||
    (b.endDate ?? '9999-12').localeCompare(a.endDate ?? '9999-12')
  ))

  return <ExperienceContent items={items} asOfDate={new Date().toISOString().slice(0, 7)} />
}
