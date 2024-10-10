import type { ReactNode } from 'react'

type MainLayoutProps = {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return <main className="w-full p-8">{children}</main>
}
