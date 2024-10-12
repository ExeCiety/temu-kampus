import type { ReactNode } from 'react'
import { AuthLayout as AuthLayoutScreen } from '@/components/layout/auth/auth-layout'

type AuthLayoutProps = {
  children: ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <AuthLayoutScreen>{children}</AuthLayoutScreen>
}

export default AuthLayout
