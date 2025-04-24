import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  const isAuthPage = request.nextUrl.pathname.startsWith('/admin/login')
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin')

  console.log('Middleware:', {
    path: request.nextUrl.pathname,
    hasToken: !!token,
    isAuthPage,
    isAdminPage
  })

  // If trying to access admin pages without being authenticated
  if (isAdminPage && !isAuthPage && !token) {
    console.log('Redirecting to login: Not authenticated')
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // If trying to access login page while being authenticated
  if (isAuthPage && token) {
    console.log('Redirecting to dashboard: Already authenticated')
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
} 