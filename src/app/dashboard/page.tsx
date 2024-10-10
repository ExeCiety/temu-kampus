'use client'

import ButtonLogout from '@/components/button/button-logout'
import { useSession } from 'next-auth/react'

export default function DashboardPage() {
  const { data: session } = useSession()

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>

      {session?.user?.role}
      <br />
      <ButtonLogout />
    </div>
  )
}
