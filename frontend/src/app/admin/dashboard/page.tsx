'use client'

import { useSession } from 'next-auth/react'

export default function AdminDashboard() {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="mt-6">
              <p className="text-gray-600">Welcome, {session.user?.name || 'Admin'}!</p>
              <p className="text-gray-600">Email: {session.user?.email}</p>
              <p className="text-gray-600">Role: {session.user?.role || 'admin'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 