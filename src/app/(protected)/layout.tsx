import type { ReactNode } from 'react'
import { AppLayout as AppLayoutScreen } from '@/components/layout/app/app-layout'

type AppLayoutProps = {
  children: ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return <AppLayoutScreen >{children}</AppLayoutScreen>
}

export default AppLayout