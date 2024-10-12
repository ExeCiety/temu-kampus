import type { Metadata } from 'next'

import ButtonLogout from '@/components/button/button-logout'
import { auth } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Dashboard'
}

const DashboardPage = async () => {
  const session = await auth()

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>

      {JSON.stringify(session, null, 2)}
      <br />
      <ButtonLogout />
    </div>
  )
}

export default DashboardPage