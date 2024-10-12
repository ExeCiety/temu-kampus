import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'

import { DEFAULT_LOGIN_REDIRECT, guestRoutes, LOGIN_PAGE, protectedRoutes } from '@/lib/helpers/auth.helper'

export default auth((req) => {
  // Check if route is protected
  const currentPath = req.nextUrl.pathname
  const isRouteProtected = protectedRoutes.some(route => currentPath.startsWith(route))

  // Check if user is authenticated
  const isAuthenticated = !!req.auth

  if (isRouteProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL(LOGIN_PAGE, req.nextUrl))
  }

  // Check if route is guest
  const isRouteGuest = guestRoutes.some(route => currentPath.startsWith(route))
  if (isRouteGuest && isAuthenticated) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl))
  }

  return NextResponse.next()
})

// Routes middleware should *not* run on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}
