# Personal Portfolio — OS Terminal Style

A personal portfolio website built with an OS-Terminal / Rhine Lab dashboard aesthetic. Features a fixed icon sidebar, frosted glass panels, and a lime-green accent system inspired by industrial HMI interfaces.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS Variables |
| Icons | Lucide React |
| Animation | Framer Motion, GSAP |
| Blog | next-mdx-remote (MDX) |
| Package Manager | pnpm |

## Pages

| Route | Description |
|-------|-------------|
| `/profile` | Identity card, active projects, system metrics |
| `/experience` | Switchable horizontal timeline and list for education, work, research and teaching |
| `/experience/[slug]` | Experience details, contributions, related records and publication links |
| `/research` | PhD research entries with serial numbers, abstracts, author avatars |
| `/projects` | Project archive with category icons and source/demo links |
| `/database` | Skill proficiency bars — Languages, Frameworks, Hardware |
| `/logs` | Development blog with sidebar filter and article cards |
| `/contact` | Secure Uplink form + external node links |

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout: SideNav, TopBar, GridBackground
│   ├── globals.css         # CSS variables, panel-acrylic, animate-breathe
│   ├── profile/page.tsx
│   ├── research/page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── database/page.tsx
│   ├── logs/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── contact/page.tsx
├── components/
│   └── layout/
│       ├── SideNav.tsx     # Fixed left icon navigation (80px wide)
│       ├── TopBar.tsx      # Fixed top bar: breadcrumb + CONNECTED badge + dark mode toggle
│       ├── GridBackground.tsx
│       └── StatusDot.tsx
├── content/
│   ├── profile.ts
│   ├── projects.ts
│   ├── research.ts
│   └── skills.ts
└── lib/
    ├── types.ts            # Project, Research, Skill, PostMeta types
    └── utils.ts
```

## Design System

**Color Variables** (defined in `globals.css`):

```css
--color-bg:         #f2f2f0   /* page background */
--color-surface:    #ffffff   /* card surface */
--color-border:     #e5e5e0   /* borders and dividers */
--color-text:       #1a1a1a   /* primary text */
--color-muted:      #555555   /* secondary text */
--color-accent:     #a3e635   /* lime-400, primary accent */
--sidebar-width:    80px
--topbar-height:    52px
```

**Key CSS Classes:**
- `.panel-acrylic` — frosted glass card (backdrop-blur, semi-transparent background)
- `.animate-breathe` — pulsing dot animation for status indicators
- `.clip-key` — angled clip-path for project key badges

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note (China network):** This project uses `fonts.loli.net` as a Google Fonts proxy. Do **not** use `next/font/google` — it will crash the dev server CSS pipeline when Google is blocked.

## Build

```bash
pnpm build
pnpm start
```

> If the dev server shows unstyled pages after switching between `dev` and `build`, delete the `.next/` directory and restart.

## Customization

- **Personal data** — edit files in `content/` (profile, projects, research, skills)
- **Experience** — edit `content/experience.ts`; dates use `YYYY-MM`, with `endDate: null` for a current appointment. `period` adds a duration band, `parentId` supplies temporal context, and `timelineTitle` / `summary` supply bilingual previews. Both views show newest entries first. On the timeline, same-month records share a date and unfold together as scrolling continues; time stays still during the reveal. Narrow screens show one card at a time. Detail pages are generated from the same data.
- **Colors** — update CSS variables in `app/globals.css`
- **Navigation** — edit `components/layout/SideNav.tsx`
- **Blog posts** — add `.mdx` files to `app/logs/` (MDX pipeline via next-mdx-remote)
