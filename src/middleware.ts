import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const protectedRoutes = ['/dashboard']
const guestRoutes = ['/login', '/register']

export async function middleware(req: NextRequest) {
  // Check if route is protected
  const currentPath = req.nextUrl.pathname
  const isRouteProtected = protectedRoutes.some(route => currentPath.startsWith(route))

  // Check if user is authenticated
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (isRouteProtected && !session) {
    NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // Check if route is guest
  const isRouteGuest = guestRoutes.some(route => currentPath.startsWith(route))
  if (isRouteGuest && session) {
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
