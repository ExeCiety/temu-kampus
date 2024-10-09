'use client'

import { useFormState } from 'react-dom'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { register } from '@/actions/auth.action'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import { makeDefaultFormState } from '@/lib/helpers/server-actions.helper'
import ButtonSubmit from '@/components/button/button-submit'

export default function FormRegister() {
  const [formState, formAction] = useFormState(register, makeDefaultFormState())

  useEffect(() => {
    if (!formState.success && formState?.message) {
      toast.error(formState?.message || '')
    }

    if (formState.success) {
      toast.success('Registration successful!')
    }
  }, [formState])

  return (
    <form action={formAction}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            required
          />
          {formState?.errors?.name && <p className="text-sm text-red-500">{formState.errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
          />
          {formState?.errors?.email && <p className="text-sm text-red-500">{formState.errors.email}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
          />
          {formState?.errors?.password && <p className="text-sm text-red-500">{formState.errors.password}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
          />
          {formState?.errors?.confirmPassword &&
              <p className="text-sm text-red-500">{formState.errors.confirmPassword}</p>}
        </div>
      </div>

      <ButtonSubmit text="Register" />
    </form>
  )
}
