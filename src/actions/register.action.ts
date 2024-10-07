'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

import { defaultSaltRounds } from '@/lib/helpers/bcryptjs.helper'
import { makeReturnData } from '@/lib/helpers/server-actions.helper'

export async function register(name: string, email: string, password: string) {
  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    throw new Error('User already exists')
  }

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, defaultSaltRounds)

  // Create a new user with the hashed password
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  return makeReturnData(
    'User registered successfully',
    {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
  )
}
