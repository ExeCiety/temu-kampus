import type { ReactNode } from 'react'
import styles from '@/components/layout/app/app-layout.module.css'

type AppLayoutProps = {
  children: ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <main className={styles.fullScreen}>
      <div className={styles.container}>{children}</div>
    </main>
  )
}