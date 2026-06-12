import type { Metadata } from 'next'
import ProjectsContent from './ProjectsContent'
import { getProjects } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Projects — Portfolio',
}

export default function ProjectsPage() {
  return <ProjectsContent items={getProjects()} />
}
