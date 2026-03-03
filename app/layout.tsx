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
      <body>
        <GridBackground />
        <SideNav />

        <div
          className="relative z-10 min-h-screen flex flex-col"
          style={{ marginLeft: 'var(--sidebar-width)' }}
        >
          <TopBar />

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
