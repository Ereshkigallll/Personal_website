import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Project, Research } from '@/lib/types'

/**
 * Content loader — reads Markdown files with YAML frontmatter from content/<subdir>/
 * and maps them to typed objects. Runs on the server only (uses fs).
 *
 * To add an entry: drop a new .md file into content/projects/ or content/research/.
 * No code changes needed. See content/README.md for the field reference.
 */

const ROOT = path.join(process.cwd(), 'content')

type Raw = Record<string, any> & { slug: string; body: string }

/** Read & parse every .md file in content/<subdir>/, sorted by optional `order`. */
function readMd(subdir: string): Raw[] {
  const dir = path.join(ROOT, subdir)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(file => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf8'))
      return { ...data, slug: file.replace(/\.md$/, ''), body: content.trim() }
    })
    .sort((a, b) => Number(a.order ?? 999) - Number(b.order ?? 999))
}

/** Projects — KEY_xx auto-assigned by order; body becomes the description. */
export function getProjects(): Project[] {
  return readMd('projects').map((it, i) => ({
    slug:        it.slug,
    key:         it.key ?? `KEY_${String(i + 1).padStart(2, '0')}`,
    serial:      it.serial,
    title:       it.title ?? it.slug,
    subtitle:    it.subtitle ?? '',
    category:    (it.category ?? 'app') as Project['category'],
    tags:        Array.isArray(it.tags) ? it.tags : [],
    status:      (it.status ?? 'completed') as Project['status'],
    description: it.body || it.description || '',
    date:        it.date,
    github:      it.github,
    demo:        it.demo,
    year:        Number(it.year) || 0,
  }))
}

/** Research — body becomes the abstract; serial auto-filled if omitted. */
export function getResearch(): Research[] {
  return readMd('research').map((it, i) => ({
    id:       it.slug,
    serial:   it.serial ?? `RS-${String(i + 1).padStart(3, '0')}`,
    title:    it.title ?? it.slug,
    subtitle: it.subtitle ?? '',
    status:   (it.status ?? 'in-progress') as Research['status'],
    venue:    it.venue,
    date:     it.date,
    abstract: it.body || it.abstract || '',
    tags:     Array.isArray(it.tags) ? it.tags : [],
    authors:  it.authors,
    link:     it.link,
  }))
}
