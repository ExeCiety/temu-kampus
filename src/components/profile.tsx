import { User } from '@prisma/client'

export default async function Profile(user: User) {
  return (
    <>
      Signed in as {user?.name}
    </>
  )
}
