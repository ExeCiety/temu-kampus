'use client'

import styles from '@/app/auth/styles.module.css'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema, LoginValues } from '@/schemas/auth/login.schema'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { InputPassword } from '@/components/ui/input-password'
import { Button } from '@/components/ui/button'

const FormLogin = () => {
  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginValues) => {
    try {
      // TODO: Implement user login
      console.log('Logging in: ', data)
    } catch (error) {
      console.error('Error logging in: ', error)
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <div className={styles.formFields}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john_doe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputPassword placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={styles.formForgotPassword}>
            <Link
              className={styles.formForgotPasswordText}
              href="/auth/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Button type="submit" className={styles.formButton}>
            Login
          </Button>
        </form>
      </Form>
    </>
  )
}

export default FormLogin
