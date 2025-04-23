import { NextResponse } from 'next/server'
import { fetchRSSFeed } from '@/utils/rss'

export async function GET() {
  try {
    const figaroSanteFeed = await fetchRSSFeed('https://www.lefigaro.fr/demain/sante/rss')
    
    // Transform the feed items to match our blog post format
    const transformedPosts = figaroSanteFeed.map((item, index) => {
      // Extract image URL from description or use default
      let imageUrl = item.media?.$.url
      if (!imageUrl && item.description) {
        const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/)
        if (imgMatch) {
          imageUrl = imgMatch[1]
        }
      }
      
      // If no image found, use default
      if (!imageUrl) {
        imageUrl = '/images/blog/default-figaro.jpg'
      } else {
        // Use proxy for external images
        imageUrl = `/api/proxy-image?url=${encodeURIComponent(imageUrl)}`
      }

      return {
        id: `figaro-${index + 1}`,
        title: item.title,
        slug: item.link.split('/').pop() || `figaro-${index + 1}`,
        excerpt: item.description.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
        date: new Date(item.pubDate).toISOString().split('T')[0],
        author: 'Le Figaro Santé',
        image: imageUrl,
        category: 'Actualités',
        content: item.description,
        readingTime: '5 min'
      }
    })

    return NextResponse.json(transformedPosts)
  } catch (error) {
    console.error('Error fetching RSS feed:', error)
    return NextResponse.json({ error: 'Failed to fetch RSS feed' }, { status: 500 })
  }
} 