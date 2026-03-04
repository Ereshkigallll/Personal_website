import type { Metadata } from 'next'
import DatabaseContent from './DatabaseContent'

export const metadata: Metadata = {
  title: 'Database — Portfolio',
}

export default function DatabasePage() {
  return <DatabaseContent />
}
