'use client'

import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast'

import { Button } from '@/components/ui/button'

export default function ButtonLogout() {
  const router = useRouter()

  const handleBtnLogoutClicked = async () => {
    try {
      await signOut({ redirect: false })

      router.push('/login')
    } catch (err) {
      toast.error(err instanceof Error ? err?.message || '' : 'An error occurred')
    }
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Button onClick={handleBtnLogoutClicked}>
        Logout
      </Button>
    </>
  )
}
