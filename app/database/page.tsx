import type { Metadata } from 'next'
import DatabaseContent from './DatabaseContent'

export const metadata: Metadata = {
  title: 'Skill Matrix — Portfolio',
}

export default function DatabasePage() {
  return <DatabaseContent />
}
