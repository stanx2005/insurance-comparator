'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import dynamicImport from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamicImport(() => import('react-quill'), { ssr: false })

interface BlogPost {
  id: string
  title: string
  content: string
  date: string
  author: string
  image: string
  category: string
  readingTime: string
}

export default function AdminDashboardClient() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [blogPost, setBlogPost] = useState<BlogPost>({
    id: '',
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    author: 'Optisanté',
    image: '/images/blog/default-blog.jpg',
    category: 'Actualités',
    readingTime: '5 min'
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  const handleEditorChange = (content: string) => {
    setBlogPost(prev => ({ ...prev, content }))
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={blogPost.title}
              onChange={(e) => setBlogPost(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <div className="h-96">
              <ReactQuill
                theme="snow"
                value={blogPost.content}
                onChange={handleEditorChange}
                className="h-80"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={blogPost.category}
              onChange={(e) => setBlogPost(prev => ({ ...prev, category: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Actualités">Actualités</option>
              <option value="Guides">Guides</option>
              <option value="Investissement">Investissement</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reading Time
            </label>
            <input
              type="text"
              value={blogPost.readingTime}
              onChange={(e) => setBlogPost(prev => ({ ...prev, readingTime: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            onClick={() => {
              // Handle save
              console.log('Saving blog post:', blogPost)
            }}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Save Post
          </button>
        </div>
      </div>
    </div>
  )
} 