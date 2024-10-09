import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { authTokenCookieKey, decrypt, destroySession } from '@/lib/helpers/session.helper'

const protectedRoutes = ['/dashboard']
const guestRoutes = ['/login', '/register']

const destroySessionAndRedirect = async (req: NextRequest, redirectPath: string) => {
  const res = NextResponse.redirect(new URL(redirectPath, req.nextUrl))
  await destroySession(res)
  return res
}

export async function middleware(req: NextRequest) {
  // Check if route is protected
  const currentPath = req.nextUrl.pathname
  const isRouteProtected = protectedRoutes.some(route => currentPath.startsWith(route))

  // Check if user is authenticated
  const authTokenCookieValue = cookies().get(authTokenCookieKey)?.value || ''
  const session = await decrypt(authTokenCookieValue)

  if (isRouteProtected) {
    if (!session || !session?.userId) {
      return await destroySessionAndRedirect(req, '/login')

    }

    // Check session expiration
    const expires = session?.expires ? new Date(String(session.expires)).getTime() : 0
    if (expires < new Date().getTime()) {
      return await destroySessionAndRedirect(req, '/login')
    }
  }

  // Check if route is guest
  const isRouteGuest = guestRoutes.some(route => currentPath.startsWith(route))
  if (isRouteGuest && session && session?.userId) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes middleware should *not* run on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}
