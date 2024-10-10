import { z, ZodType } from 'zod'
import type { RegisterRequest } from '@/types/auth/register.type'

export const RegisterSchema: ZodType<RegisterRequest> = z.object({
  name: z
    .string({
      required_error: 'Name is required'
    })
    .min(1, {
      message: 'Name is required'
    }),
  email: z
    .string({
      required_error: 'Email is required'
    })
    .min(1, {
      message: 'Email is required'
    })
    .email({
      message: 'Invalid email address'
    }),
  password: z
    .string({
      required_error: 'Password is required'
    })
    .min(8, {
      message: 'Password must be at least 8 characters long'
    }),
  passwordConfirmation: z
    .string({
      required_error: 'Password confirmation is required'
    })
    .min(8, {
      message: 'Password confirmation must be at least 8 characters long'
    })
}).refine(data => data.password === data.passwordConfirmation, {
  message: 'Passwords do not match',
  path: ['passwordConfirmation']
})

export type RegisterValues = z.infer<typeof RegisterSchema>
