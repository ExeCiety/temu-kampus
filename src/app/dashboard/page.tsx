'use client'

import toast, { Toaster } from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { logout } from '@/actions/auth.action'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()

  const handleBtnLogoutClicked = async () => {
    try {
      const { message } = await logout()

      toast.success(message || '')
      router.push('/login')
    } catch (err) {
      toast.error(err instanceof Error ? err?.message || '' : 'An error occurred')
    }
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>

      <Button onClick={handleBtnLogoutClicked}>
        Logout
      </Button>
    </div>
  )
}
