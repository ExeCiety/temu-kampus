import zod from 'zod'

export const registerSchema = zod.object({
  name: zod.string().min(3),
  email: zod.string().email(),
  password: zod.string().min(6),
  confirmPassword: zod.string()
})
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match'
  })
