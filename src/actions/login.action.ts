'use server'

import bcrypt from 'bcryptjs'

import { prisma } from '@/lib/prisma'
import { loginSchema } from '@/lib/validations/login.validation'
import { makeDefaultFormState } from '@/lib/helpers/server-actions.helper'
import { createSession } from '@/lib/helpers/session.helper'

export const login = async (
  _prevState: unknown, formData: FormData
) => {
  try {
    const form = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    }

    // Validation
    const validationResult = loginSchema.safeParse(form)
    if (!validationResult.success) {
      return makeDefaultFormState({
        errors: validationResult.error.flatten().fieldErrors
      })
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: form.email }
    })
    if (!user) {
      return makeDefaultFormState({
        message: 'User not found'
      })
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(form.password, user.password)
    if (!isPasswordValid) {
      return makeDefaultFormState({
        message: 'Invalid password'
      })
    }

    // Create Session
    await createSession(user.id.toString())

    return makeDefaultFormState({
      success: true,
      message: 'Login successful'
    })
  } catch (err) {
    return makeDefaultFormState({
      message: err instanceof Error ? err.message : 'An error occurred'
    })
  }
}
