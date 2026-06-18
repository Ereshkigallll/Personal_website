import type { Metadata } from 'next'
import LogsContent from './LogsContent'
import { getLogs } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Dev Log — Portfolio',
}

export default function LogsPage() {
  return <LogsContent posts={getLogs()} />
}
