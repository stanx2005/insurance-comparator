import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  // Log the request details
  console.log('=== Middleware Debug ===')
  console.log('Request URL:', request.url)
  console.log('Request path:', request.nextUrl.pathname)
  console.log('Request headers:', Object.fromEntries(request.headers.entries()))

  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  console.log('Token details:', {
    hasToken: !!token,
    tokenContent: token ? {
      email: token.email,
      role: token.role,
      exp: token.exp,
      iat: token.iat
    } : null,
    timestamp: new Date().toISOString()
  })

  const isAuthPage = request.nextUrl.pathname.startsWith('/admin/login')
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin')

  console.log('Auth State:', {
    path: request.nextUrl.pathname,
    hasToken: !!token,
    isAuthPage,
    isAdminPage,
    token: token ? 'Present' : 'Missing'
  })

  // If trying to access admin pages without being authenticated
  if (isAdminPage && !isAuthPage && !token) {
    console.log('❌ Redirecting to login: Not authenticated')
    const response = NextResponse.redirect(new URL('/admin/login', request.url))
    response.headers.set('x-debug-auth', 'not-authenticated')
    return response
  }

  // If trying to access login page while being authenticated
  if (isAuthPage && token) {
    console.log('✅ Redirecting to dashboard: Already authenticated')
    const response = NextResponse.redirect(new URL('/admin/dashboard', request.url))
    response.headers.set('x-debug-auth', 'already-authenticated')
    return response
  }

  console.log('✅ Proceeding with request')
  const response = NextResponse.next()
  response.headers.set('x-debug-auth', 'proceeding')
  return response
}

export const config = {
  matcher: ['/admin/:path*']
} 