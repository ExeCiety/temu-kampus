'use client'

import { useState } from 'react'
import { redirect } from 'next/navigation'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import ButtonSubmit from '@/components/button/button-submit'
import { loginSchema } from '@/lib/validations/login.validation'

export default function FormLogin() {
  const [validationErrors, setValidationErrors] = useState({
    email: [],
    password: []
  })

  const handleLogin = async (formData: FormData) => {
    const form = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    }

    // Validation
    const validationResult = loginSchema.safeParse(form)
    if (!validationResult.success) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setValidationErrors(validationResult.error.flatten().fieldErrors)
    } else {
      const result = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password
      })

      if (result && result.error) {
        toast.error(result.error)
      }

      redirect('/dashboard')
    }
  }

  return (
    <form action={handleLogin}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
          {validationErrors?.email && <p className="text-sm text-red-500">{validationErrors.email}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
          {validationErrors?.password && <p className="text-sm text-red-500">{validationErrors.password}</p>}
        </div>
      </div>

      <ButtonSubmit text="Login" />
    </form>
  )
}
