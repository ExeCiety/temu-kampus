import type { Metadata } from 'next'
import { NotFound as NotFoundScreen } from '@/components/layout/not-found/not-found'

export const metadata: Metadata = {
  title: 'Not Found'
}

const NotFound = () => {
  return (
    <NotFoundScreen
      title="Not Found"
      description="Sorry, the page you are looking for does not exist."
    />
  )
}

export default NotFound
