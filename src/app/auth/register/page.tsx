import type { Metadata } from 'next'
import { AuthIllustration } from '@/components/auth/illustration/auth-illustration'
import { CardWrapper } from '@/components/auth/form/card-wrapper/card-wrapper'
import { FormRegister } from '@/app/auth/register/form-register'

export const metadata: Metadata = {
  title: 'Sign Up'
}

const RegisterPage = () => {
  return (
    <>
      <AuthIllustration
        title="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
        subtitle="Lorem, ipsum dolor sit amet consectetur."
        imageUrl="/images/page/auth/register/1.png"
        imageAlt="Register Illustration"
        imageWidthInVW={90}
      />
      <CardWrapper
        headerLabel="Create an account"
        headerDescription="Sign up to create an account"
        buttonBackLabel="Already have an account?"
        buttonBackLabelLink="Sign in here"
        buttonBackHref="/auth/login"
      >
        <FormRegister />
      </CardWrapper>
    </>
  )
}

export default RegisterPage
