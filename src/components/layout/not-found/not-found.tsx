import styles from '@/components/layout/not-found/not-found.module.css'
import { Button } from '@/components/ui/button'
import H1 from '@/components/ui/h1'
import Link from 'next/link'

type NotFoundProps = {
  title: string
  description: string
  buttonTitle?: string
  buttonHref?: string
}

export const NotFound = ({
  title,
  description,
  buttonTitle = 'Go back home',
  buttonHref = '/'
}: NotFoundProps) => {
  return (
    <main className={styles.fullScreenCenter}>
      <H1>{title}</H1>
      <p>{description}</p>
      <Button type="button" size="lg">
        <Link href={buttonHref}>{buttonTitle}</Link>
      </Button>
    </main>
  )
}
