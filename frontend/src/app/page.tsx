'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { FaArrowRight, FaChartLine, FaShieldAlt, FaEuroSign, FaUserFriends, FaSearch, FaStar, FaHospital, FaUserMd, FaClinicMedical, FaHeartbeat, FaPlus, FaCircle, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'
import Partners from '@/components/Partners'

type CoverageType = 'personalized' | 'minimal' | 'balanced' | 'maximal'
type CoverageLevels = {
  soinsCourants: number
  hospitalisation: number
  optique: number
  dentaire: number
  auditif: number
}
type CoverageId = keyof CoverageLevels

// Add new types for personalized coverage
type MedicalCareLevel = 'minimum' | 'moyen' | 'fort' | 'maximum'
type PersonalizedCoverage = {
  soinsMedicaux: MedicalCareLevel
  hospitalisation: MedicalCareLevel
  optique: MedicalCareLevel
  dentaire: MedicalCareLevel
  auditif: MedicalCareLevel
}

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
  const [step, setStep] = useState(1)
  const [showExitPrompt, setShowExitPrompt] = useState(false)
  const [formData, setFormData] = useState({
    insuranceType: '',
    gender: '',
    birthDate: '',
    profession: '',
    regime: '',
    // Second person data
    secondPersonGender: '',
    secondPersonFirstName: '',
    secondPersonLastName: '',
    secondPersonBirthDate: '',
    secondPersonProfession: '',
    secondPersonRegime: '',
    // Contract data
    postalCode: '',
    city: '',
    isCurrentlyInsured: '',
    contractEndMonth: '',
    desiredStartDate: '',
    // Coverage data
    coverageType: '' as CoverageType,
    coverageLevels: {
      soinsCourants: 1,
      hospitalisation: 1,
      optique: 1,
      dentaire: 1,
      auditif: 1
    } as CoverageLevels,
    hospitalOnly: false,
    opticalCoverage: 'medium',
    dentalCoverage: 'medium',
    currentProvider: '',
    email: '',
    phone: '',
    personalizedCoverage: {
      soinsMedicaux: 'minimum' as MedicalCareLevel,
      hospitalisation: 'minimum' as MedicalCareLevel,
      optique: 'minimum' as MedicalCareLevel,
      dentaire: 'minimum' as MedicalCareLevel,
      auditif: 'minimum' as MedicalCareLevel
    } as PersonalizedCoverage,
    firstName: '',
    lastName: '',
    acceptTerms: false
  })

  const [isVisible, setIsVisible] = useState(false)
  const [selectedTab, setSelectedTab] = useState('particuliers')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const handleSubmit = async () => {
    try {
      // Send form data to generate PDF and send email
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to generate PDF')
      }

      // Navigate to loading page
      router.push('/loading')
    } catch (error) {
      console.error('Error:', error)
      // You might want to show an error message to the user here
    }
  }

  const StepIndicator = () => (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Etape {step}/5</h2>
          <button 
            onClick={() => setShowExitPrompt(true)}
            className="text-gray-600 hover:text-primary"
          >
            Enregistrer et quitter
          </button>
        </div>
        <div className="flex items-center space-x-2">
          {['Adhérents', 'Régime', 'Contrat', 'Besoins', 'Coordonnées'].map((label, idx) => (
            <div key={label} className="flex-1">
              <button
                onClick={() => setStep(idx + 1)}
                className={`w-full p-2 text-sm rounded-lg transition-colors ${
                  step === idx + 1
                    ? 'bg-primary text-white'
                    : step > idx + 1
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const ExitPrompt = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${showExitPrompt ? '' : 'hidden'}`}>
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold mb-4">
          Vous allez quitter le formulaire. Laissez-nous votre adresse mail pour finir votre comparaison plus tard.
        </h3>
        <div className="mb-4">
          <input
            type="email"
            placeholder="prenom.nom@email.com"
            className="form-input"
          />
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowExitPrompt(false)}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Non, je veux rester
          </button>
          <button
            className="flex-1 py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            J'enregistre et je quitte
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          La société est le responsable des données collectées. Pour plus d'informations sur le traitement de vos données à caractère personnel ainsi que l'exercice de vos droits, veuillez cliquer ici.
        </p>
      </div>
    </div>
  )

  // Helper function to get formatted dates
  const getFormattedDates = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)
    const nextMonth = new Date(today)
    nextMonth.setDate(nextMonth.getDate() + 30)

    const formatDate = (date: Date) => {
      const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
      const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
      
      return {
        dayName: days[date.getDay()],
        day: date.getDate(),
        month: months[date.getMonth()],
        year: date.getFullYear(),
        fullDate: `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
      }
    }

    return {
      today: formatDate(today),
      tomorrow: formatDate(tomorrow),
      nextWeek: formatDate(nextWeek),
      nextMonth: formatDate(nextMonth)
    }
  }

  // Helper function to get next months
  const getNextMonths = () => {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    const currentMonth = new Date().getMonth()
    const nextMonths = []
    
    // Get next 2-3 months
    for (let i = 1; i <= 3; i++) {
      const monthIndex = (currentMonth + i) % 12
      nextMonths.push(months[monthIndex])
    }
    
    return {
      nextMonths,
      allMonths: months
    }
  }

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
      { level: 'Garanties renforcées', price: '135,21 €' },
      { level: 'Garanties hybrides', price: '86,80 €' },
      { level: 'Garanties intermédiaires', price: '67,53 €' },
      { level: 'Garanties économiques', price: '48,04 €' }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Head>
        <title>Comparateur d'Assurance Santé | Trouvez la Meilleure Mutuelle</title>
        <meta name="description" content="Comparez les meilleures mutuelles santé et trouvez l'assurance adaptée à vos besoins. Devis gratuit et personnalisé en quelques minutes." />
      </Head>

      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Image src="/logo.png" alt="Logo" width={40} height={40} className="mr-2" />
              <span className="text-xl font-bold text-primary">AssuranceComparateur</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="#features" className="nav-link">Fonctionnalités</Link>
              <Link href="#partners" className="nav-link">Partenaires</Link>
              <Link href="#contact" className="nav-link">Contact</Link>
              <button className="btn-primary">Comparer maintenant</button>
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
                src="/hero-image.png"
                alt="Insurance Comparison"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
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