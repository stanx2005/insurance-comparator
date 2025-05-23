'use client'

import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export default function AdminLogin() {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('=== Login Page Debug ===')
    console.log('Session status:', status)
    console.log('Session data:', session)
  }, [status, session])

  useEffect(() => {
    // Check for error in URL
    const error = searchParams.get('error')
    if (error) {
      console.log('Error from URL:', error)
      setError('Invalid credentials')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      console.log('Attempting sign in with credentials:', {
        email,
        timestamp: new Date().toISOString(),
        hasPassword: !!password,
        callbackUrl: '/admin/dashboard'
      })
      
      const result = await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/admin/dashboard'
      })

      console.log('Sign in result:', {
        error: result?.error,
        status: result?.status,
        ok: result?.ok,
        url: result?.url,
        timestamp: new Date().toISOString()
      })
      
      if (result?.error) {
        console.error('Sign in failed:', result.error)
        setError('Authentication failed')
      } else if (!result?.ok) {
        console.error('Sign in not ok:', result)
        setError('Authentication failed')
      }
    } catch (error: any) {
      console.error('Sign in error:', {
        name: error?.name,
        message: error?.message,
        stack: error?.stack,
        timestamp: new Date().toISOString()
      })
      setError('An error occurred during sign in')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Admin Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
} 