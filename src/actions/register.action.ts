'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

import { defaultSaltRounds } from '@/lib/helpers/bcryptjs.helper'
import { registerSchema } from '@/lib/validations/register.validation'
import { makeDefaultFormState } from '@/lib/helpers/server-actions.helper'

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
