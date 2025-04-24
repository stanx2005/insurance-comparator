import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { Metadata } from 'next'
import Pagination from '@/components/Pagination'
import { notFound } from 'next/navigation'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  date: string
  author: string
  image: string
  category: string
}

const blogPosts: BlogPost[] = [
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
  {
    id: '3',
    title: 'Lunettes moins bien remboursées par les mutuelles : les nouvelles règles',
    slug: 'lunettes-remboursement-mutuelles',
    excerpt: 'Les mutuelles veulent limiter le remboursement des lunettes et audioprothèses. Quelles sont les nouvelles règles et comment s\'adapter ?',
    date: '2024-03-21',
    author: 'Optisanté',
    image: '/images/blog/default-blog.jpg',
    category: 'Remboursements'
  },
  {
    id: '4',
    title: 'Fin des arrêts maladie papier : vers le 100% dématérialisé',
    slug: 'fin-arrets-maladie-papier',
    excerpt: 'Les arrêts maladie papier disparaissent au profit du 100% dématérialisé. Quels changements pour les assurés ?',
    date: '2024-03-20',
    author: 'Optisanté',
    image: '/images/blog/default-blog.jpg',
    category: 'Actualités'
  },
  {
    id: '5',
    title: 'Comment choisir la meilleure mutuelle santé en 2024 ?',
    slug: 'choisir-meilleure-mutuelle-sante',
    excerpt: 'Guide complet pour choisir la mutuelle santé la plus adaptée à vos besoins et votre budget en 2024.',
    date: '2024-03-19',
    author: 'Optisanté',
    image: '/images/blog/default-blog.jpg',
    category: 'Guides'
  },
  {
    id: '6',
    title: 'Assurance vie : pourquoi les fonds en euros redeviennent intéressants',
    slug: 'fonds-euros-assurance-vie',
    excerpt: 'Les fonds en euros de l\'assurance vie retrouvent leur attractivité. Découvrez pourquoi et comment en profiter.',
    date: '2024-03-18',
    author: 'Optisanté',
    image: '/images/blog/default-blog.jpg',
    category: 'Investissement'
  }
]

async function getRSSPosts() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rss`, {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    if (!response.ok) throw new Error('Failed to fetch RSS posts')
    return response.json()
  } catch (error) {
    console.error('Error fetching RSS posts:', error)
    return []
  }
}

export const metadata: Metadata = {
  title: 'Blog Assurance Santé | Conseils et Actualités',
  description: 'Découvrez nos articles sur les mutuelles santé, les remboursements, et les actualités du secteur de l\'assurance santé.',
  openGraph: {
    title: 'Blog Assurance Santé | Conseils et Actualités',
    description: 'Découvrez nos articles sur les mutuelles santé, les remboursements, et les actualités du secteur de l\'assurance santé.',
    type: 'website',
  },
  alternates: {
    types: {
      'application/rss+xml': [
        {
          title: 'RSS Feed',
          url: '/api/rss',
        },
      ],
    },
  },
}

function BlogPostSkeleton() {
  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-full bg-gray-200 rounded mb-4" />
        <div className="flex items-center justify-between">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
      </div>
    </article>
  )
}

function BlogPosts({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-48">
            <Image
              src={post.id.startsWith('figaro') ? '/images/blog/default-figaro.jpg' : post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={post.id.startsWith('figaro')}
              loading={post.id.startsWith('figaro') ? 'eager' : 'lazy'}
            />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-primary">{post.category}</span>
              <span className="text-sm text-gray-500">{post.date}</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Par {post.author}</span>
              <Link
                href={`/blog/${post.slug}`}
                className="text-primary hover:text-primary-dark font-medium"
              >
                Lire la suite →
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const currentPage = Number(searchParams.page) || 1
  const postsPerPage = 9
  const rssPosts = await getRSSPosts()
  const allPosts = [...blogPosts, ...rssPosts]
  const totalPages = Math.ceil(allPosts.length / postsPerPage)
  
  if (currentPage < 1 || currentPage > totalPages) {
    notFound()
  }

  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = allPosts.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Assurance Santé</h1>
          <p className="text-xl text-gray-600">Conseils, guides et actualités sur les mutuelles santé</p>
        </div>

        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <BlogPostSkeleton key={i} />
            ))}
          </div>
        }>
          <BlogPosts posts={currentPosts} />
        </Suspense>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/blog"
          />
        )}
      </div>
    </div>
  )
} 