import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Portfolio',
}

const contactLinks = [
  { id: 'email',   label: 'EMAIL',    value: 'your@email.com',           href: 'mailto:your@email.com',          desc: 'Direct message'        },
  { id: 'github',  label: 'GITHUB',   value: 'github.com/yourhandle',    href: 'https://github.com/yourhandle',  desc: 'Source code & projects' },
  { id: 'scholar', label: 'SCHOLAR',  value: 'Google Scholar',           href: '#',                              desc: 'Academic publications'  },
  { id: 'resume',  label: 'RESUME',   value: 'Download PDF',             href: '/resume.pdf',                    desc: 'Curriculum Vitae'       },
]

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Page header */}
      <div className="panel-acrylic p-6 border-b-2 border-[var(--color-accent)]">
        <div className="flex items-center gap-3 mb-1">
          <span className="font-mono text-[10px] text-[var(--color-muted)] tracking-widest">MODULE_06</span>
          <div className="flex-1 h-px bg-[var(--color-border)]" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">CONTACT</h1>
        <p className="font-mono text-xs text-[var(--color-muted)] mt-1">Uplink · Channels · Communication</p>
      </div>

      {/* Status */}
      <div className="panel-acrylic p-6 flex items-center gap-4">
        <span className="w-3 h-3 rounded-full bg-green-500 animate-breathe shrink-0" />
        <div>
          <p className="font-mono text-xs font-bold tracking-wider uppercase">System Online — Open for Collaboration</p>
          <p className="font-mono text-[10px] text-[var(--color-muted)] mt-0.5">PhD student · Available for research collaboration, internships, and interesting projects</p>
        </div>
      </div>

      {/* Contact links */}
      <div className="space-y-3">
        {contactLinks.map(({ id, label, value, href, desc }) => (
          <a key={id} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
            <div className="panel-acrylic p-5 group hover:border-[var(--color-accent)]/40 transition-all cursor-pointer relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--color-border)] group-hover:bg-[var(--color-accent)] transition-colors" />
              <div className="pl-3 flex items-center justify-between">
                <div>
                  <p className="font-mono text-[9px] text-[var(--color-muted)] tracking-widest mb-0.5">{label}</p>
                  <p className="font-bold text-sm group-hover:text-[var(--color-accent)] transition-colors">{value}</p>
                  <p className="font-mono text-[10px] text-[var(--color-muted)] mt-0.5">{desc}</p>
                </div>
                <span className="text-[var(--color-muted)] group-hover:text-[var(--color-accent)] transition-colors text-lg">→</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
