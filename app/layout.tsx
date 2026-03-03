import type { Metadata } from 'next'
import './globals.css'
import SideNav from '@/components/layout/SideNav'
import TopBar from '@/components/layout/TopBar'
import GridBackground from '@/components/layout/GridBackground'

export const metadata: Metadata = {
  title: 'Portfolio — HR Department',
  description: 'Personal portfolio — OS Terminal style',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Fonts via npmmirror-friendly CDN (fonts.loli.net proxies Google Fonts) */}
        <link rel="preconnect" href="https://fonts.loli.net" />
        <link
          href="https://fonts.loli.net/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Inter:wght@300;400;600;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GridBackground />
        <SideNav />
        {/* TopBar 在 body 层级，与 SideNav 并列，确保 fixed 定位始终相对视口 */}
        <TopBar />

        <div
          className="relative z-10 h-screen flex flex-col"
          style={{ marginLeft: 'var(--sidebar-width)' }}
        >
          <main
            className="flex-1 overflow-y-auto px-8 pb-8"
            style={{ paddingTop: 'calc(var(--topbar-height) + 1.5rem)' }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
