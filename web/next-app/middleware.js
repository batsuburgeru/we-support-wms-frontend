import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// 1. Specify protected and public routes
const protectedRoutes = [
    '/dashboard', 
    '/inventory', 
    '/account-settings',
    '/client-list',
    '/purchase-cart',
    '/purchase-list',
    '/search-results'
]
const publicRoutes = ['/login', '/register']

function parseJwt (token) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

export default async function middleware(req) {
  const token = req.cookies.token;
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('session')?.value
  const session = cookie ? parseJwt(cookie) : null

  // 4. Extract userRole from the token
  const userRole = session?.userRole

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !userRole) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    userRole &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  // 7. Authorize user based on userRole
  if (isProtectedRoute && userRole) {
    // Add your authorization logic here
    if (userRole !== 'Admin') 
      { return NextResponse.redirect(new URL('/login', req.nextUrl)) }
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}