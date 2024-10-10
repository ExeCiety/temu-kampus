import React from 'react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import { cn } from '@/lib/utils'
import SessionProvider from '@/app/context/session-provider'
import { MainLayout } from '@/components/layout/main-layout'

import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: {
    template: '%s | Temu Kampus',
    absolute: 'Temu Kampus'
  },
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'flex min-h-screen bg-white text-black',
          poppins.className
        )}
      >
        <SessionProvider>
          <MainLayout>{children}</MainLayout>
        </SessionProvider>
      </body>
    </html>
  )
}
