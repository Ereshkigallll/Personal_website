import type { Metadata } from 'next'
import ResearchContent from './ResearchContent'
import { getResearch } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Research — Portfolio',
}

export default function ResearchPage() {
  return <ResearchContent items={getResearch()} />
}
