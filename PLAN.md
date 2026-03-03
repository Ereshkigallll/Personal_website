# Personal Portfolio — Project Plan
> OS-Terminal 风格个人主页 · Next.js · Framer Motion · MDX Blog

---

## Tech Stack

| 层级 | 选型 | 用途 |
|---|---|---|
| Framework | Next.js 14 (App Router) | 路由、SSG/SSR、API Routes |
| Language | TypeScript | 类型安全 |
| Styling | Tailwind CSS + CSS Variables | 主题色、网格、间距 |
| Animation | Framer Motion + GSAP | 页面切换、打字机、数字滚动 |
| Blog | MDX + next-mdx-remote | 博客文章支持 JSX 组件 |
| Icons | Lucide React | 轻量统一图标 |
| Deployment | Vercel | CI/CD + 域名绑定 |
| Package Manager | pnpm | 速度快，依赖干净 |

---

## File Structure

```
portfolio/
│
├── app/                          # Next.js App Router 核心
│   ├── layout.tsx                # 根布局：全局字体、主题、侧边导航
│   ├── page.tsx                  # 首页 → 重定向到 /profile 或直接渲染 Profile
│   ├── globals.css               # CSS Variables 主题色、网格背景、字体
│   │
│   ├── profile/
│   │   └── page.tsx              # PROFILE — 身份卡片、Bio、状态徽章
│   │
│   ├── research/
│   │   └── page.tsx              # RESEARCH — 博士研究、VR项目、论文列表
│   │
│   ├── projects/
│   │   ├── page.tsx              # PROJECTS — 作品集网格（IoT/机器人/App）
│   │   └── [slug]/
│   │       └── page.tsx          # 单个项目详情页
│   │
│   ├── database/
│   │   └── page.tsx              # DATABASE — 技能栈、工具链、硬件平台
│   │
│   ├── logs/
│   │   ├── page.tsx              # SYSTEM_LOGS — 博客文章列表
│   │   └── [slug]/
│   │       └── page.tsx          # 单篇博客文章（MDX渲染）
│   │
│   └── contact/
│       └── page.tsx              # CONTACT — 邮件、GitHub、社交、简历下载
│
├── components/
│   ├── layout/
│   │   ├── SideNav.tsx           # 左侧竖排导航（PROFILE/DATABASE等）
│   │   ├── TopBar.tsx            # 顶部状态栏（PORTFOLIO // DEPT · CONNECTED）
│   │   ├── StatusDot.tsx         # 呼吸灯组件（绿点闪烁）
│   │   └── GridBackground.tsx    # 全局网格背景
│   │
│   ├── profile/
│   │   ├── IdentityCard.tsx      # 主身份卡片（姓名、DEV-001-A标签、Bio）
│   │   ├── ClearanceBadge.tsx    # Lvl.X GRANTED 徽章
│   │   └── AvailabilityStatus.tsx # OPEN FOR WORK / 状态标签
│   │
│   ├── projects/
│   │   ├── ProjectCard.tsx       # 单个项目卡片（KEY_01样式）
│   │   ├── ProjectGrid.tsx       # 项目网格布局
│   │   └── ActiveProjectsPanel.tsx # 右侧 ACTIVE PROJECTS 面板
│   │
│   ├── research/
│   │   ├── ResearchCard.tsx      # 研究项目卡片
│   │   └── PublicationItem.tsx   # 论文/成果列表项
│   │
│   ├── database/
│   │   ├── SkillBar.tsx          # 技能进度条（类似 ENERGY 98%）
│   │   └── SkillCategory.tsx     # 技能分类块
│   │
│   ├── blog/
│   │   ├── PostCard.tsx          # 博客文章卡片
│   │   └── MDXComponents.tsx     # 自定义 MDX 渲染组件（代码块、图片等）
│   │
│   ├── ui/
│   │   ├── Tag.tsx               # 通用标签（GRANTED / STABLE 等）
│   │   ├── SectionHeader.tsx     # 区块标题（KEY_01 + 标题 + 箭头）
│   │   ├── MetricPanel.tsx       # 系统指标面板（NETWORK 120ms 等）
│   │   ├── TerminalText.tsx      # 打字机效果文字
│   │   ├── CountUp.tsx           # 数字滚动组件
│   │   └── ArrowLink.tsx         # → 箭头跳转链接
│   │
│   └── animations/
│       ├── PageTransition.tsx    # 页面切换动画（OS窗口感）
│       ├── FadeInSection.tsx     # 滚动进入淡入
│       └── GlitchText.tsx        # 故障字体特效（可选）
│
├── content/                      # 纯数据层，与UI解耦
│   ├── profile.ts                # 个人信息：姓名、Bio、状态、社交链接
│   ├── research.ts               # 研究项目数据
│   ├── projects.ts               # 作品集项目数据
│   ├── skills.ts                 # 技能栈数据
│   └── posts/                    # MDX 博客文章
│       ├── 2025-01-first-post.mdx
│       └── ...
│
├── lib/
│   ├── mdx.ts                    # MDX 文章读取、解析工具函数
│   ├── utils.ts                  # 通用工具（className合并等）
│   └── types.ts                  # 全局 TypeScript 类型定义
│
├── public/
│   ├── avatar/                   # 头像或视觉符号
│   ├── projects/                 # 项目图片/截图
│   ├── resume.pdf                # 简历 PDF（供下载）
│   └── favicon.ico
│
├── styles/
│   └── theme.css                 # 主题变量（颜色、字体、网格参数）
│
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local                    # 环境变量（如有 API 需要）
```

---

## CSS Variables（主题色系）

```css
/* globals.css */
:root {
  --color-bg: #f5f5f0;           /* 米白背景 */
  --color-surface: #ffffff;      /* 卡片白 */
  --color-border: #e0e0d8;       /* 边框灰 */
  --color-text: #1a1a1a;         /* 主文字 */
  --color-muted: #888880;        /* 辅助文字 */
  --color-accent: #7fff00;       /* 荧光绿 accent */
  --color-accent-dim: #4daa00;   /* 深绿（hover） */
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --font-sans: 'Inter', sans-serif;
  --grid-size: 32px;             /* 背景网格尺寸 */
}
```

---

## 动效清单

| 组件 | 效果 | 库 |
|---|---|---|
| 姓名标题 | 打字机逐字出现 | GSAP / Framer Motion |
| Active Projects 数字 | 数字从0滚动到目标值 | GSAP CountTo |
| CONNECTED 绿点 | CSS 呼吸闪烁动画 | CSS animation |
| 页面切换 | 滑入/淡入，OS窗口感 | Framer Motion AnimatePresence |
| 卡片 hover | 上浮 4px + 边框亮起 | Framer Motion whileHover |
| 侧边导航激活 | 绿色下划线滑动 | Framer Motion layoutId |
| Section 进入 | 滚动触发淡入上移 | Framer Motion viewport |
| 技能进度条 | 从0%加载到目标值 | Framer Motion + useInView |

---

## 数据结构示例

### Project 类型（`lib/types.ts`）
```typescript
export type Project = {
  slug: string
  key: string          // "KEY_01"
  title: string
  subtitle: string     // 一句话描述
  category: 'iot' | 'robotics' | 'app' | 'research'
  tags: string[]       // ["ESP32", "3D Printing", "Flutter"]
  status: 'active' | 'completed' | 'in-progress'
  description: string
  image?: string
  github?: string
  demo?: string
  year: number
}
```

### Research 类型
```typescript
export type Research = {
  title: string
  subtitle: string
  status: 'in-progress' | 'published' | 'submitted'
  venue?: string       // 期刊/会议
  year?: number
  abstract: string
  tags: string[]       // ["VR", "Vibrotactile", "Built Environment"]
  link?: string
}
```

---

## 开发阶段

### Phase 1 — 骨架搭建
- [ ] `pnpm create next-app` 初始化 + TypeScript + Tailwind
- [ ] 安装依赖：framer-motion, gsap, next-mdx-remote, lucide-react
- [ ] 配置 `globals.css` CSS Variables 主题
- [ ] 实现 `SideNav` + `TopBar` + `GridBackground` 布局
- [ ] 实现 `PageTransition` 动画容器

### Phase 2 — Profile 页
- [ ] `IdentityCard` 组件（姓名、标签、Bio）
- [ ] `ClearanceBadge` 徽章
- [ ] `StatusDot` 呼吸灯
- [ ] 打字机效果（姓名/Bio）
- [ ] `ActiveProjectsPanel` 右侧面板

### Phase 3 — Projects 页
- [ ] `content/projects.ts` 填入项目数据
- [ ] `ProjectCard` + `ProjectGrid` 组件
- [ ] 项目详情页 `/projects/[slug]`
- [ ] 卡片 hover 动效

### Phase 4 — Research 页
- [ ] `content/research.ts` 填入研究数据
- [ ] `ResearchCard` + `PublicationItem` 组件
- [ ] 进行中/已发表状态标签

### Phase 5 — Database 页
- [ ] `content/skills.ts` 填入技能数据
- [ ] `SkillBar` 进度条动效（滚动触发）
- [ ] 硬件/软件/语言分类展示

### Phase 6 — Blog（System Logs）
- [ ] 配置 `lib/mdx.ts` 读取 `content/posts/`
- [ ] `PostCard` 列表页
- [ ] 单篇文章页面 + 自定义 MDX 组件（代码高亮等）

### Phase 7 — 收尾
- [ ] Contact 页（邮件、GitHub、简历下载）
- [ ] SEO：`metadata` 配置，OG 图片
- [ ] 响应式移动端适配
- [ ] 性能优化（图片 lazy load、字体优化）
- [ ] Vercel 部署 + 自定义域名绑定

---

## 启动命令

```bash
# 初始化项目
pnpm create next-app portfolio --typescript --tailwind --app --src-dir no --import-alias "@/*"
cd portfolio

# 安装核心依赖
pnpm add framer-motion gsap next-mdx-remote lucide-react
pnpm add -D @types/node
```

---

> 把这个文件放在项目根目录，在 Claude Code Plan Mode 中加载即可开始逐步构建。
