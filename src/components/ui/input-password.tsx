import * as React from 'react'

import { Input } from '@/components/ui/input'
import { HiEye, HiEyeOff } from 'react-icons/hi'

export interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false)

    return (
      <Input
        type={showPassword ? 'text' : 'password'}
        className={className}
        ref={ref}
        suffix={
          showPassword ? (
            <HiEyeOff
              onClick={() => setShowPassword(prev => !prev)}
              className="select-none"
            />
          ) : (
            <HiEye
              onClick={() => setShowPassword(prev => !prev)}
              className="select-none"
            />
          )
        }
        {...props}
      />
    )
  }
)
InputPassword.displayName = 'InputPassword'

export { InputPassword }
