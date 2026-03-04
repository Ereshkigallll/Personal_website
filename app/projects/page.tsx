import type { Metadata } from 'next'
import ProjectsContent from './ProjectsContent'

export const metadata: Metadata = {
  title: 'Projects — Portfolio',
}

export default function ProjectsPage() {
  return <ProjectsContent />
}
