import { MetadataRoute } from 'next'

const blogPosts = [
  {
    slug: 'augmentation-tarifs-mutuelles-2025',
    lastModified: '2024-03-23',
  },
  {
    slug: 'cartes-vitale-compromisees',
    lastModified: '2024-03-22',
  },
  {
    slug: 'lunettes-remboursement-mutuelles',
    lastModified: '2024-03-21',
  },
  {
    slug: 'fin-arrets-maladie-papier',
    lastModified: '2024-03-20',
  },
  {
    slug: 'choisir-meilleure-mutuelle-sante',
    lastModified: '2024-03-19',
  },
  {
    slug: 'fonds-euros-assurance-vie',
    lastModified: '2024-03-18',
  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://assurancecomparateur.vercel.app'
  
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...routes, ...blogRoutes]
} 