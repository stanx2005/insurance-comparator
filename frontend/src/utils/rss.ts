import Parser from 'rss-parser'

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'media'],
      ['description', 'description'],
      ['pubDate', 'pubDate'],
      ['link', 'link'],
      ['title', 'title'],
    ],
  },
})

export interface RSSItem {
  title: string
  link: string
  description: string
  pubDate: string
  media?: {
    $: {
      url: string
    }
  }
}

export async function fetchRSSFeed(url: string): Promise<RSSItem[]> {
  try {
    const feed = await parser.parseURL(url)
    return feed.items.map((item) => ({
      title: item.title || '',
      link: item.link || '',
      description: item.description || '',
      pubDate: item.pubDate || '',
      media: item.media as any,
    }))
  } catch (error) {
    console.error('Error fetching RSS feed:', error)
    return []
  }
} 