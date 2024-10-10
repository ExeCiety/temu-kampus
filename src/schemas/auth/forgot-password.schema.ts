import { z, ZodType } from 'zod'
import type { ForgotPasswordRequest } from '@/types/auth/forgot-password.type'

export const ForgotPasswordSchema: ZodType<ForgotPasswordRequest> = z.object({
  email: z.string({
    required_error: 'Email is required'
  }).min(1, {
    message: 'Email is required'
  }).email({
    message: 'Email is invalid'
  })
})

export type ForgotPasswordValues = z.infer<typeof ForgotPasswordSchema>
