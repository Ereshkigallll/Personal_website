import { BookOpen, Briefcase, FlaskConical, GraduationCap } from 'lucide-react'
import type { ExperienceCategory } from '@/content/experience'

export type ExperienceFilter = 'all' | ExperienceCategory
export type ExperienceView = 'timeline' | 'list'

export const experienceCategories = {
  education: { en: 'Education', zh: '教育', icon: GraduationCap },
  work: { en: 'Work', zh: '工作', icon: Briefcase },
  research: { en: 'Research', zh: '研究', icon: FlaskConical },
  teaching: { en: 'Teaching', zh: '教学', icon: BookOpen },
}

export const experienceFilters: { key: ExperienceFilter; en: string; zh: string }[] = [
  { key: 'all', en: 'All records', zh: '全部经历' },
  ...Object.entries(experienceCategories).map(([key, value]) => ({ key: key as ExperienceCategory, en: value.en, zh: value.zh })),
]
