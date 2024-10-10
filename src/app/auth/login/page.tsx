import type { Metadata } from 'next'
import { AuthIllustration } from '@/components/auth/illustration/auth-illustration'
import { CardWrapper } from '@/components/auth/form/card-wrapper/card-wrapper'
import FormLogin from './form-login'

export const metadata: Metadata = {
  title: 'Sign In'
}

const LoginPage = () => {
  return (
    <>
      <AuthIllustration
        title="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
        subtitle="Lorem, ipsum dolor sit amet consectetur."
        imageUrl="/images/page/auth/login/1.png"
        imageAlt="Login Illustration"
      />
      <CardWrapper
        headerLabel="Welcome Back!"
        headerDescription="Sign in to your account to continue"
        buttonBackLabel="Don't have an account?"
        buttonBackLabelLink="Sign up here"
        buttonBackHref="/auth/register"
      >
        <FormLogin />
      </CardWrapper>
    </>
  )
}

export default LoginPage
