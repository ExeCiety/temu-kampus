'use server'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { makeReturnData } from '@/lib/helpers/server-actions.helper'
import { prisma } from '@/lib/prisma'
import { LoginResponseData } from '@/responses/login.response'

// Define a server action to get all users
export async function login(email: string, password: string): Promise<LoginResponseData> {
  // Find the user by email
  const user = await prisma.user.findUnique({
    where: { email }
  })
  if (!user) {
    throw new Error('User not found')
  }

  // Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error('Invalid password')
  }

  // Create JWT token
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || '',
    { expiresIn: '1h' }
  )

  return makeReturnData(
    'Login successful',
    {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    }
  )
}
