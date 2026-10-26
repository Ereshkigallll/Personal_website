'use client'

import { useEffect, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import styles from './page-layout.module.css'

export default function PageLayout({ children, fitViewport = false }: { children: ReactNode; fitViewport?: boolean }) {
  const pathname = usePathname()

  useEffect(() => {
    // The site's scroll container is main, so route changes need their own reset.
    document.querySelector('main')?.scrollTo({ top: 0 })
  }, [pathname])

  return (
    <div className={styles.shell} data-content-page>
      <div className={`${styles.page} ${fitViewport ? styles.viewportPage : ''}`}>{children}</div>
    </div>
  )
}
