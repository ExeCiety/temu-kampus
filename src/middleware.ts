import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { authTokenCookieKey, decrypt } from '@/lib/helpers/session.helper'

const protectedRoutes = ['/dashboard']

export async function middleware(req: NextRequest) {
  // Check if route is protected
  const currentPath = req.nextUrl.pathname
  const isRouteProtected = protectedRoutes.some(route => currentPath.startsWith(route))

  if (isRouteProtected) {
    // Check if user is authenticated
    const authTokenCookieValue = cookies().get(authTokenCookieKey)?.value || ''
    const session = await decrypt(authTokenCookieValue)

    if (!session?.userId) {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
  }

  return NextResponse.next()
}

// Routes middleware should *not* run on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}
