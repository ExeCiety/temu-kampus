import type { Metadata } from 'next'
import { NotFoundLayout as NotFoundScreen } from '@/components/layout/not-found/not-found-layout'

export const metadata: Metadata = {
  title: 'Not Found'
}

const NotFound = () => {
  return (
    <NotFoundScreen
      title="Halaman Tidak Ditemukan"
      description="Maaf, halaman yang Anda cari tidak tersedia."
    />
  )
}

export default NotFound
