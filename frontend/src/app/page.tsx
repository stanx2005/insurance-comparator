'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaArrowRight, FaShieldAlt, FaEuroSign, FaUserFriends, FaFacebook, FaTwitter, FaLinkedin, FaStar } from 'react-icons/fa'
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

  const priceData = {
    age: [
      { range: '16-25 ans', price: '50,82 €' },
      { range: '26-35 ans', price: '64,01 €' },
      { range: '36-49 ans', price: '79,52 €' },
      { range: '50-55 ans', price: '97,71 €' },
      { range: '56-65 ans', price: '114,93 €' },
      { range: '66-120 ans', price: '133,23 €' }
    ],
    location: [
      { dept: 'Paris (75)', price: '128,22 €' },
      { dept: 'Bouches-du-Rhône (13)', price: '137,21 €' },
      { dept: 'Nord (59)', price: '137,30 €' },
      { dept: 'Loire-Atlantique (44)', price: '120,87 €' },
      { dept: 'Ille-et-Vilaine (35)', price: '111,76 €' },
      { dept: 'Moselle (57)', price: '114,79 €' }
    ],
    coverage: [
      { level: 'Garanties renforcées', price: '135,21 €', description: 'Protection complète avec remboursements optimaux' },
      { level: 'Garanties hybrides', price: '86,80 €', description: 'Équilibre entre couverture et budget' },
      { level: 'Garanties intermédiaires', price: '67,53 €', description: 'Couverture standard adaptée' },
      { level: 'Garanties économiques', price: '48,04 €', description: 'Protection de base abordable' }
    ]
  }

  const reviews = [
    {
      name: 'Sophie B.',
      rating: 5,
      comment: 'Excellent service, conseillère au top. Agréable et professionnelle.',
      date: '07/03/2024'
    },
    {
      name: 'François R.',
      rating: 5,
      comment: 'Renseignements clairs, très bonne comparaison des offres.',
      date: '08/03/2024'
    },
    {
      name: 'Mathilde L.',
      rating: 5,
      comment: "Conseiller à l'écoute et échange très intéressant.",
      date: '07/03/2024'
    }
  ]

  const faqData = [
    {
      question: "Comment trouver une mutuelle pas chère ?",
      answer: "Pour trouver une mutuelle pas chère et faire le bon choix en matière de garanties, utilisez notre comparateur de mutuelles santé. Vous bénéficiez d'un outil en ligne gratuit vous permettant de souscrire un contrat de mutuelle santé offrant les meilleures garanties au meilleur prix. Si vous avez de faibles revenus, vous pouvez tirer avantage de la complémentaire santé solidaire."
    },
    {
      question: "Comment fonctionne le remboursement par une mutuelle santé ?",
      answer: "Le remboursement des frais de santé en France repose sur un système à deux niveaux : la Sécurité sociale et la mutuelle santé. La Sécurité sociale rembourse généralement 70% de la base de remboursement, laissant 30% (le ticket modérateur) à la charge du patient ou de sa mutuelle. Les mutuelles complètent ce remboursement et peuvent couvrir des dépenses non prises en charge par la Sécurité sociale."
    },
    {
      question: "Comment résilier sa mutuelle santé ?",
      answer: "Depuis le 1er décembre 2020, il est possible de résilier sa mutuelle santé à tout moment après un an de contrat, sans justification, en respectant un préavis d'un mois. La résiliation se fait généralement par courrier adressé à l'assureur."
    }
  ]

  // Add helper component for the help tooltip
  const HelpTooltip = ({ content }: { content: { title: string; descriptions: { label: string; value: string }[] } }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div className="relative inline-block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-2 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 21a9 9 0 100-18 9 9 0 000 18z" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-96 p-4 mt-2 bg-white rounded-lg shadow-xl border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-semibold text-secondary">{content.title}</h4>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              {content.descriptions.map((desc, index) => (
                <div key={index} className="space-y-2">
                  <p className="font-medium text-gray-700">{desc.label}</p>
                  <p className="text-gray-600 text-sm">{desc.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="Optisanté" 
                width={40} 
                height={40} 
                className="mr-2"
              />
              <span className="text-xl font-bold text-primary">Optisanté</span>
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
              <Image
                src="/images/hero-image.jpg"
                alt="Comparateur d'assurance santé"
                width={600}
                height={400}
                className="rounded-lg shadow-xl object-cover"
                priority
              />
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

        {/* Pricing Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-16"
            >
              {/* Prix selon les garanties */}
              <div>
                <h2 className="section-title text-center mb-6">Comparer le prix des mutuelles selon le niveau de garanties</h2>
                <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                  Le prix de votre mutuelle est bien entendu en corrélation avec le niveau de garanties proposé. 
                  Plus votre protection est complète, plus le prix de vos cotisations augmente.
                </p>
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                    {priceData.coverage.map((item, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="bg-gradient-to-br from-white to-primary/5 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10"
                      >
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.level}</h3>
                        <p className="text-3xl font-bold text-primary mb-2">{item.price}</p>
                        <p className="text-sm text-gray-600">par mois</p>
                        <p className="text-sm text-gray-600 mt-4">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-6 text-center italic">
                  * Date de mise à jour : 02/04/2025. Etude des tarifs moyens proposés par nos partenaires assureurs, 
                  tous profils et tous niveaux de garanties, du 1er au 31 Mars 2025.
                </p>
              </div>

              {/* Prix selon l'âge */}
              <div>
                <h2 className="section-title text-center mb-12">Prix de la mutuelle selon l'âge</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {priceData.age.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                    >
                      <p className="text-lg font-medium text-gray-800 mb-2">{item.range}</p>
                      <p className="text-3xl font-bold text-primary">{item.price}</p>
                      <p className="text-sm text-gray-500 mt-1">par mois</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Prix selon le département */}
              <div>
                <h2 className="section-title text-center mb-12">Prix de la mutuelle selon le département</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {priceData.location.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                    >
                      <p className="text-lg font-medium text-gray-800 mb-2">{item.dept}</p>
                      <p className="text-3xl font-bold text-primary">{item.price}</p>
                      <p className="text-sm text-gray-500 mt-1">par mois</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900">Besoin d'aide ?</h3>
                  <HelpTooltip
                    content={{
                      title: "Comment sont calculés nos prix ?",
                      descriptions: [
                        {
                          label: "Données actualisées",
                          value: "Nos prix sont mis à jour quotidiennement en fonction des offres de nos partenaires."
                        },
                        {
                          label: "Facteurs de calcul",
                          value: "Les tarifs varient selon l'âge, la localisation, le régime social et le niveau de couverture souhaité."
                        }
                      ]
                    }}
                  />
                </div>
                <p className="text-gray-600 mb-4">
                  Nos experts sont disponibles pour vous guider dans votre choix de mutuelle santé.
                </p>
                <button className="btn-primary">Contactez-nous</button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <h2 className="section-title">Questions Fréquentes</h2>
                <p className="text-xl text-gray-600">Tout ce que vous devez savoir sur les mutuelles santé</p>
              </div>

              <div className="grid gap-8">
                {faqData.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <h3 className="text-xl font-semibold text-primary mb-4">{item.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center mb-12"
            >
              <h2 className="section-title">Ce que disent nos clients</h2>
              <p className="text-xl text-gray-600">Des milliers de personnes nous font confiance</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} className="w-5 h-5" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">{review.comment}</p>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </motion.div>
              ))}
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
                <li className="text-gray-600">contact@optisante.org</li>
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