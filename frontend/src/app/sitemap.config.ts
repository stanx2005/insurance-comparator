import { MetadataRoute } from 'next'

const blogPosts = [
  {
    slug: 'augmentation-tarifs-mutuelles-2025',
    date: '2024-03-23',
  },
  {
    slug: 'cartes-vitale-compromisees',
    date: '2024-03-22',
  },
  {
    slug: 'lunettes-remboursement-mutuelles',
    date: '2024-03-21',
  },
  {
    slug: 'fin-arrets-maladie-papier',
    date: '2024-03-20',
  },
  {
    slug: 'choisir-meilleure-mutuelle-sante',
    date: '2024-03-19',
  },
  {
    slug: 'fonds-euros-assurance-vie',
    date: '2024-03-18',
  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://optisante.org'
  const currentDate = new Date().toISOString()

  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages]
} 