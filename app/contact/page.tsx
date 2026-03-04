import type { Metadata } from 'next'
import { Github, Linkedin, BookOpen, ArrowUpRight, Send } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact — Portfolio',
}

const externalNodes = [
  {
    id:       'github',
    label:    'GITHUB_REPO',
    sublabel: 'ACCESS_SOURCE',
    href:     'https://github.com/Ereshkigallll',
    icon:     <Github size={16} />,
  },
  {
    id:       'linkedin',
    label:    'LINKEDIN_NET',
    sublabel: 'ESTABLISH_LINK',
    href:     'https://linkedin.com',
    icon:     <Linkedin size={16} />,
  },
  {
    id:       'scholar',
    label:    'SCHOLAR_DB',
    sublabel: 'VIEW_PUBLICATIONS',
    href:     '#',
    icon:     <BookOpen size={16} />,
  },
]

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* ── Page header ── */}
      <div className="panel-acrylic p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-breathe" />
              <span className="font-mono text-[9px] text-[var(--color-muted)] uppercase tracking-widest">
                Communication Terminal // Active
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">
              Secure <span className="text-[var(--color-accent)]">Uplink</span>
            </h1>
          </div>

          {/* Operator monogram */}
          <div className="hidden md:flex flex-col items-end shrink-0">
            <span className="font-mono text-5xl font-bold text-[var(--color-border)] leading-none select-none">YT</span>
            <span className="font-mono text-[9px] text-[var(--color-muted)] mt-1">OPERATOR</span>
          </div>
        </div>
      </div>

      {/* ── Body: form + right panel ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8">

        {/* ── Left: message form ── */}
        <div className="lg:col-span-8">
          <div className="panel-acrylic p-6 md:p-8 relative flex flex-col">

            {/* Corner marks — always visible */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[var(--color-accent)]" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[var(--color-accent)]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[var(--color-accent)]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[var(--color-accent)]" />

            {/* Panel header */}
            <div
              className="flex items-center justify-between mb-6 pb-3"
              style={{
                backgroundImage: 'linear-gradient(to right, var(--color-border) 50%, transparent 50%)',
                backgroundPosition: 'bottom',
                backgroundSize: '8px 1px',
                backgroundRepeat: 'repeat-x',
              }}
            >
              <span className="font-mono text-xs font-bold uppercase tracking-widest">Message Protocol</span>
              <span className="font-mono text-[9px] text-[var(--color-muted)]">STATUS: READY_TO_SEND</span>
            </div>

            <form
              action="mailto:your@email.com"
              method="POST"
              encType="text/plain"
              className="flex flex-col gap-6"
            >
              {/* Email */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="origin"
                  className="font-mono text-[10px] uppercase text-[var(--color-muted)] tracking-wider"
                >
                  Uplink Origin [Email Address]
                </label>
                <input
                  id="origin"
                  name="email"
                  type="email"
                  placeholder="ENTER_ORIGIN_ID..."
                  className="w-full bg-transparent border border-[var(--color-border)] text-[var(--color-text)] font-mono text-sm px-4 py-3 placeholder:text-[var(--color-muted)]/40 placeholder:text-xs focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_15px_rgba(163,230,53,0.08)] transition-all"
                  style={{ borderLeftWidth: '4px' }}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="font-mono text-[10px] uppercase text-[var(--color-muted)] tracking-wider"
                >
                  Message Packet [Content Data]
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={8}
                    placeholder="INITIATE_DATA_STREAM..."
                    className="w-full bg-transparent border border-[var(--color-border)] text-[var(--color-text)] font-mono text-sm px-4 py-3 placeholder:text-[var(--color-muted)]/40 placeholder:text-xs focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_15px_rgba(163,230,53,0.08)] transition-all resize-none"
                    style={{ borderLeftWidth: '4px' }}
                  />
                  {/* Blinking cursor indicator */}
                  <span className="absolute bottom-3 right-3 inline-block w-1.5 h-3 bg-[var(--color-accent)] animate-breathe pointer-events-none" />
                </div>
              </div>

              {/* Footer row */}
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[9px] text-[var(--color-muted)] uppercase tracking-wider hidden sm:block">
                  Encryption: Enabled
                </span>
                <button
                  type="submit"
                  className="group flex items-center gap-3 px-6 py-3 bg-[var(--color-text)] text-[var(--color-bg)] font-bold tracking-widest text-xs uppercase hover:bg-[var(--color-accent)] hover:text-[var(--color-text)] hover:shadow-[0_0_25px_rgba(163,230,53,0.35)] transition-all duration-300"
                >
                  Send Signal
                  <Send size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ── Right: status + links ── */}
        <div className="lg:col-span-4 flex flex-col gap-4">

          {/* System status */}
          <div className="panel-acrylic p-5">
            <h3 className="font-mono text-[10px] font-bold text-[var(--color-accent)] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-breathe shrink-0" />
              System Status
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-[var(--color-border)]">
                <span className="font-mono text-[10px] text-[var(--color-muted)]">UPLINK_STABILITY</span>
                <span className="font-mono text-[10px] font-bold">99.8%</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[var(--color-border)]">
                <span className="font-mono text-[10px] text-[var(--color-muted)]">LATENCY</span>
                <span className="font-mono text-[10px] font-bold text-[var(--color-accent)]">12ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] text-[var(--color-muted)]">NODE_REGION</span>
                <span className="font-mono text-[10px] font-bold">COLUMBIA_HQ</span>
              </div>
            </div>
          </div>

          {/* External nodes */}
          <div className="panel-acrylic p-5">
            <h3 className="font-mono text-[10px] font-bold text-[var(--color-muted)] uppercase tracking-wider mb-4">
              External Nodes
            </h3>
            <div className="flex flex-col gap-3">
              {externalNodes.map(({ id, label, sublabel, href, icon }) => (
                <a
                  key={id}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group relative flex items-center justify-between p-3 border border-[var(--color-border)] bg-[var(--color-bg)]/50 hover:bg-[var(--color-surface)] hover:border-[var(--color-accent)] transition-all duration-300 overflow-hidden"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-[var(--color-border)] text-[var(--color-muted)] group-hover:bg-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors shrink-0">
                      {icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-xs font-bold">{label}</span>
                      <span className="font-mono text-[9px] text-[var(--color-muted)] group-hover:text-[var(--color-accent)] transition-colors">
                        {sublabel}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="text-[var(--color-muted)] group-hover:text-[var(--color-text)] group-hover:rotate-12 transition-all shrink-0"
                  />
                  {/* Bottom slide line on hover */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--color-accent)] group-hover:w-full transition-all duration-500" />
                </a>
              ))}
            </div>
          </div>

          {/* Security notice */}
          <div className="panel-acrylic p-4">
            <p className="font-mono text-[9px] text-[var(--color-muted)] leading-relaxed uppercase tracking-wide">
              All transmissions are monitored by information security protocols. Please refrain from sending classified data over unsecured channels.
            </p>
          </div>

        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="pt-4 border-t border-[var(--color-border)] flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[var(--color-accent)]" />
          <span className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-widest">
            Portfolio // Communications // <span className="text-[var(--color-text)] font-bold">EXT_RELAY</span>
          </span>
        </div>
        <div className="flex gap-4 font-mono text-[10px] text-[var(--color-muted)] uppercase">
          <span>VER: 1.0.0</span>
          <span className="hidden sm:inline">ENCRYPTION: AES-256</span>
        </div>
      </footer>

    </div>
  )
}
