'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

export default function ButtonSubmit({ text = 'Submit' }: { text?: string }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full mt-6" disabled={pending}>
      {pending ? `${text}...` : text}
    </Button>
  )
}
