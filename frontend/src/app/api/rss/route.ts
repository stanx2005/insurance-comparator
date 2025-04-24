import { NextResponse } from 'next/server'

const blogPosts = [
  {
    id: '1',
    title: 'Augmentation des tarifs des mutuelles en 2025 : quels impacts pour les Français ?',
    slug: 'augmentation-tarifs-mutuelles-2025',
    excerpt: 'L\'année 2025 marquera une nouvelle hausse des tarifs des mutuelles santé, avec une augmentation moyenne de 6%. Découvrez les impacts et les solutions.',
    date: '2024-03-23',
    author: 'Optisanté',
    image: '/images/blog/default-blog.jpg',
    category: 'Actualités'
  },
  {
    id: '2',
    title: '20 millions de cartes Vitale compromises : ce qu\'il faut savoir',
    slug: 'cartes-vitale-compromisees',
    excerpt: 'Suite à l\'attaque contre l\'organisme de tiers-payant Viamedis, 20 millions de cartes Vitale ont été compromises. Comment se protéger ?',
    date: '2024-03-22',
    author: 'Optisanté',
    image: '/images/blog/default-blog.jpg',
    category: 'Sécurité'
  },
  // Add more blog posts here
]

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.opticomparateur.fr'

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog Assurance Santé</title>
    <link>${baseUrl}/blog</link>
    <description>Conseils, guides et actualités sur les mutuelles santé</description>
    <language>fr-FR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/api/rss" rel="self" type="application/rss+xml" />
    ${blogPosts.map(post => `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${baseUrl}/blog/${post.slug}</link>
        <guid>${baseUrl}/blog/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description><![CDATA[${post.excerpt}]]></description>
        <content:encoded><![CDATA[${post.excerpt}]]></content:encoded>
        <dc:creator><![CDATA[${post.author}]]></dc:creator>
        <category><![CDATA[${post.category}]]></category>
      </item>
    `).join('')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
} 