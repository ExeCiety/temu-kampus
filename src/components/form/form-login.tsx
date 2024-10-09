'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import toast, { Toaster } from 'react-hot-toast'
import { redirect, RedirectType } from 'next/navigation'

import { login } from '@/actions/login.action'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import ButtonSubmit from '@/components/button/button-submit'

import { makeDefaultFormState } from '@/lib/helpers/server-actions.helper'

export default function FormLogin() {
  const [formState, formAction] = useFormState(login, makeDefaultFormState())

  useEffect(() => {
    if (!formState.success && formState?.message) {
      toast.error(formState?.message || '')
    }

    if (formState.success) {
      redirect('/dashboard', RedirectType.push)
    }
  }, [formState])

  return (
    <form action={formAction} method="POST">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
          {formState?.errors?.email && <p className="text-sm text-red-500">{formState.errors.email}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
          {formState?.errors?.password && <p className="text-sm text-red-500">{formState.errors.password}</p>}
        </div>
      </div>

      <ButtonSubmit text="Login" />
    </form>
  )
}
