'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaArrowRight, FaShieldAlt, FaEuroSign, FaUserFriends, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'
import Partners from '@/components/Partners'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Home() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary">AssuranceComparateur</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="#features" className="nav-link">Fonctionnalités</Link>
              <Link href="#partners" className="nav-link">Partenaires</Link>
              <Link href="#contact" className="nav-link">Contact</Link>
              <button onClick={() => router.push('/calculator')} className="btn-primary">Comparer maintenant</button>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="hero-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                Trouvez la <span className="text-primary">mutuelle santé</span> idéale pour vous
              </h1>
              <p className="text-xl text-gray-600">
                Comparez les meilleures offres et économisez jusqu'à 30% sur votre assurance santé.
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => router.push('/calculator')}
                  className="btn-primary flex items-center space-x-2"
                >
                  <span>Comparer maintenant</span>
                  <FaArrowRight />
                </button>
                <button className="btn-secondary">
                  En savoir plus
                </button>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="relative animate-float">
              <div className="w-full h-[400px] bg-primary/10 rounded-lg"></div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center mb-12"
            >
              <h2 className="section-title">Pourquoi nous choisir ?</h2>
              <p className="text-xl text-gray-600">Des solutions adaptées à vos besoins</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="feature-card">
                <div className="text-primary text-4xl mb-4">
                  <FaShieldAlt />
                </div>
                <h3 className="text-xl font-semibold mb-2">Protection Optimale</h3>
                <p className="text-gray-600">Une couverture santé adaptée à votre situation</p>
              </motion.div>

              <motion.div variants={itemVariants} className="feature-card">
                <div className="text-primary text-4xl mb-4">
                  <FaEuroSign />
                </div>
                <h3 className="text-xl font-semibold mb-2">Meilleurs Prix</h3>
                <p className="text-gray-600">Économisez sur votre mutuelle santé</p>
              </motion.div>

              <motion.div variants={itemVariants} className="feature-card">
                <div className="text-primary text-4xl mb-4">
                  <FaUserFriends />
                </div>
                <h3 className="text-xl font-semibold mb-2">Accompagnement</h3>
                <p className="text-gray-600">Des experts à votre écoute</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section id="partners" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center mb-12"
            >
              <h2 className="section-title">Nos Partenaires</h2>
              <p className="text-xl text-gray-600">Les meilleures mutuelles santé vous font confiance</p>
            </motion.div>
            <Partners />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <h2 className="section-title">Prêt à trouver votre mutuelle ?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Obtenez votre devis personnalisé en quelques minutes
              </p>
              <button 
                onClick={() => router.push('/calculator')}
                className="btn-primary text-lg"
              >
                Comparer maintenant
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">À propos</h3>
              <p className="text-gray-600">
                AssuranceComparateur vous aide à trouver la meilleure mutuelle santé adaptée à vos besoins.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-primary">Comment ça marche</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-primary">FAQ</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-primary">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-600">contact@assurancecomparateur.fr</li>
                <li className="text-gray-600">01 23 45 67 89</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-primary"><FaFacebook /></a>
                <a href="#" className="text-gray-600 hover:text-primary"><FaTwitter /></a>
                <a href="#" className="text-gray-600 hover:text-primary"><FaLinkedin /></a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} AssuranceComparateur. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 