'use server'

import bcrypt from 'bcryptjs'

import { prisma } from '@/lib/prisma'
import { loginSchema } from '@/lib/validations/login.validation'
import { makeDefaultFormState } from '@/lib/helpers/server-actions.helper'
import { createSession, destroySession } from '@/lib/helpers/session.helper'
import { registerSchema } from '@/lib/validations/register.validation'
import { defaultSaltRounds } from '@/lib/helpers/bcryptjs.helper'

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

export const register = async (
  _prevState: unknown, formData: FormData
) => {
  try {
    const form = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string
    }

    // Validation
    const validationResult = registerSchema.safeParse(form)
    if (!validationResult.success) {
      return makeDefaultFormState({
        errors: validationResult.error.flatten().fieldErrors
      })
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: form.email }
    })
    if (existingUser) {
      return makeDefaultFormState({
        message: 'User already exists'
      })
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(form.password, defaultSaltRounds)

    // Create a new user with the hashed password
    await prisma.user.create({
      data: {
        name: form.name,
        email: form.email,
        password: hashedPassword
      }
    })

    return makeDefaultFormState({
      success: true,
      message: 'Registration successful!'
    })
  } catch (err) {
    return makeDefaultFormState({
      message: err instanceof Error ? err.message : 'An error occurred'
    })
  }
}

export const logout = async () => {
  try {
    await destroySession()

    return makeDefaultFormState({
      success: true,
      message: 'Logout success'
    })
  } catch (err) {
    return makeDefaultFormState({
      message: err instanceof Error ? err.message : 'An error occurred'
    })
  }
}
