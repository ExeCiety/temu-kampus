import type { ReactNode } from 'react'
import { AuthLayout as AuthLayoutScreen } from '@/components/layout/auth/auth-layout'

type AuthLayoutProps = {
  children: ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <AuthLayoutScreen>{children}</AuthLayoutScreen>
      </body>
    </html>
  )
}

export default AuthLayout
