// ── Project ──────────────────────────────────────────────────────────────────
export type ProjectCategory = 'iot' | 'robotics' | 'app' | 'research'
export type ProjectStatus    = 'active' | 'completed' | 'in-progress'

export type Project = {
  slug:        string
  key:         string        // "KEY_01"
  title:       string
  subtitle:    string        // one-line description
  category:    ProjectCategory
  tags:        string[]
  status:      ProjectStatus
  description: string
  image?:      string
  github?:     string
  demo?:       string
  year:        number
}

// ── Research ──────────────────────────────────────────────────────────────────
export type ResearchStatus = 'in-progress' | 'published' | 'submitted'

export type Research = {
  id:       string
  title:    string
  subtitle: string
  status:   ResearchStatus
  venue?:   string           // journal / conference
  year?:    number
  abstract: string
  tags:     string[]
  link?:    string
}

// ── Skill ─────────────────────────────────────────────────────────────────────
export type Skill = {
  name:     string
  level:    number           // 0–100
  category: 'language' | 'framework' | 'hardware' | 'tool'
}

// ── Blog Post ─────────────────────────────────────────────────────────────────
export type PostMeta = {
  slug:        string
  title:       string
  date:        string        // "YYYY-MM-DD"
  readTime:    string        // "8 min"
  tags:        string[]
  summary?:    string
}
