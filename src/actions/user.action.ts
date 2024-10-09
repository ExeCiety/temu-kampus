import { cache } from 'react'
import { User } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/helpers/session.helper'

const userLoggedInDto = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email
  }
}

export const getUserLoggedIn = cache(async () => {
  // Verify user's session
  const session = await verifySession()

  // Fetch user data from db
  const user = await prisma.user.findUnique({
    where: { id: session.userId }
  })

  return user ? userLoggedInDto(user) : null
})
