import { NextResponse } from 'next/server'
import { fetchRSSFeed } from '@/utils/rss'

export async function GET() {
  try {
    const figaroSanteFeed = await fetchRSSFeed('https://www.lefigaro.fr/demain/sante/rss')
    
    // Transform the feed items to match our blog post format
    const transformedPosts = figaroSanteFeed.map((item, index) => ({
      id: `figaro-${index + 1}`,
      title: item.title,
      slug: item.link.split('/').pop() || `figaro-${index + 1}`,
      excerpt: item.description,
      date: new Date(item.pubDate).toISOString().split('T')[0],
      author: 'Le Figaro Santé',
      image: item.media?.$.url || '/images/blog/default-figaro.jpg',
      category: 'Actualités',
      content: item.description,
      readingTime: '5 min'
    }))

    return NextResponse.json(transformedPosts)
  } catch (error) {
    console.error('Error fetching RSS feed:', error)
    return NextResponse.json({ error: 'Failed to fetch RSS feed' }, { status: 500 })
  }
} 