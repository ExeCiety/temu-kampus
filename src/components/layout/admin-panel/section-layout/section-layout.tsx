import type { ReactNode } from 'react'

type SectionLayoutProps = {
  children: ReactNode
}

export const SectionLayout = ({ children }: SectionLayoutProps) => {
  return (
    <section className="my-5">
      {children}
    </section>
  )
}