import type { Metadata } from 'next'
import LogsContent from './LogsContent'

export const metadata: Metadata = {
  title: 'System Logs — Portfolio',
}

export default function LogsPage() {
  return <LogsContent />
}
