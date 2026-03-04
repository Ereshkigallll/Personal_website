import type { Metadata } from 'next'
import ResearchContent from './ResearchContent'

export const metadata: Metadata = {
  title: 'Research — Portfolio',
}

export default function ResearchPage() {
  return <ResearchContent />
}
