import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'

export async function POST(req: Request) {
  const session = await getServerSession()

  if (!session?.user || (session.user as any).role !== 'admin') {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const data = await req.json()
    const { title, slug, content, excerpt, category, image } = data

    // In a real application, you would save this to a database
    // For now, we'll save it to a JSON file
    const post = {
      id: Date.now().toString(),
      title,
      slug,
      content,
      excerpt,
      category,
      image,
      date: new Date().toISOString(),
      author: 'Optisanté'
    }

    // Save to a JSON file (in a real app, use a database)
    const postsPath = join(process.cwd(), 'data', 'posts.json')
    const posts = JSON.parse(await readFile(postsPath, 'utf-8'))
    posts.push(post)
    await writeFile(postsPath, JSON.stringify(posts, null, 2))

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error creating blog post:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 