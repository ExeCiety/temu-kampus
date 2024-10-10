import { z, ZodType } from 'zod'
import type { LoginRequest } from '@/types/auth/login.type'

export const LoginSchema: ZodType<LoginRequest> = z.object({
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
    .min(1, {
      message: 'Password is required'
    })
})

export type LoginValues = z.infer<typeof LoginSchema>
