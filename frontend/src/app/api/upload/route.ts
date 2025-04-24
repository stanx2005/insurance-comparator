import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: Request) {
  const session = await getServerSession()

  if (!session?.user || (session.user as any).role !== 'admin') {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return new NextResponse('No file uploaded', { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create a unique filename
    const filename = `${uuidv4()}-${file.name}`
    const path = join(process.cwd(), 'public', 'images', 'blog', filename)

    // Save the file
    await writeFile(path, buffer)

    // Return the URL
    return NextResponse.json({ url: `/images/blog/${filename}` })
  } catch (error) {
    console.error('Error uploading file:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 