import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

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
    image: '/images/blog/augmentation-tarifs.jpg',
    category: 'Actualités'
  },
  {
    id: '2',
    title: '20 millions de cartes Vitale compromises : ce qu\'il faut savoir',
    slug: 'cartes-vitale-compromisees',
    excerpt: 'Suite à l\'attaque contre l\'organisme de tiers-payant Viamedis, 20 millions de cartes Vitale ont été compromises. Comment se protéger ?',
    date: '2024-03-22',
    author: 'Optisanté',
    image: '/images/blog/carte-vitale.jpg',
    category: 'Sécurité'
  },
  {
    id: '3',
    title: 'Lunettes moins bien remboursées par les mutuelles : les nouvelles règles',
    slug: 'lunettes-remboursement-mutuelles',
    excerpt: 'Les mutuelles veulent limiter le remboursement des lunettes et audioprothèses. Quelles sont les nouvelles règles et comment s\'adapter ?',
    date: '2024-03-21',
    author: 'Optisanté',
    image: '/images/blog/mutuelle-sante.jpg',
    category: 'Remboursements'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export default function BlogPreview() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Derniers articles</h2>
          <p className="text-xl text-gray-600">Restez informé des actualités de l'assurance santé</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-primary">{post.category}</span>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                    {post.title}
                  </Link>
                </h3>
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
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
          >
            Voir tous les articles
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 