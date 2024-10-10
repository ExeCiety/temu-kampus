import type { Metadata } from 'next'
import { AuthIllustration } from '@/components/auth/illustration/auth-illustration'
import { CardWrapper } from '@/components/auth/form/card-wrapper/card-wrapper'
import { FormForgotPassword } from '@/app/auth/forgot-password/form-forgot-password'

export const metadata: Metadata = {
  title: 'Forgot Password'
}

const ForgotPasswordPage = () => {
  return (
    <>
      <AuthIllustration
        title="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
        subtitle="Lorem, ipsum dolor sit amet consectetur."
        imageUrl="/images/page/auth/forgot-password/1.png"
        imageAlt="Forgot Password Illustration"
      />
      <CardWrapper
        headerLabel="Forgot Password"
        headerDescription="Enter your email to reset your password"
        buttonBackLabel="Remembered your password?"
        buttonBackLabelLink="Sign in here"
        buttonBackHref="/auth/login"
      >
        <FormForgotPassword />
      </CardWrapper>
    </>
  )
}

export default ForgotPasswordPage
