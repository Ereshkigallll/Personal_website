import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { experiences } from '@/content/experience'
import ExperienceDetail from './ExperienceDetail'

export const dynamicParams = false

export function generateStaticParams() {
  return experiences.map(item => ({ slug: item.id }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = experiences.find(entry => entry.id === params.slug)
  return {
    title: item ? `${item.timelineTitle.en} — Experience · Yutong Zhang` : 'Experience — Yutong Zhang',
    description: item?.summary.en,
  }
}

export default function ExperienceDetailPage({ params }: { params: { slug: string } }) {
  const item = experiences.find(entry => entry.id === params.slug)
  if (!item) notFound()
  const related = experiences.filter(entry => entry.parentId === item.id || (item.parentId && entry.id === item.parentId))
  return <ExperienceDetail item={item} related={related} />
}
