import { Button } from '@/components/ui/button'
import { logout } from '@/actions/auth.action'

export default function ButtonLogout() {
  return (
    <>
      <form action={logout}>
        <Button type="submit">
          Logout
        </Button>
      </form>
    </>
  )
}
