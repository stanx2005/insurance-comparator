'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { FaArrowRight, FaChartLine, FaShieldAlt, FaEuroSign, FaUserFriends, FaSearch, FaStar, FaHospital, FaUserMd, FaClinicMedical } from 'react-icons/fa'
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

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
    <>
      <Head>
        <title>Optisanté - Comparateur d'Assurance Santé en France</title>
        <meta name="description" content="Comparez les meilleures assurances santé en France. Trouvez la mutuelle adaptée à vos besoins et votre budget. Devis gratuit et personnalisé." />
        <meta name="keywords" content="assurance santé, mutuelle santé, comparateur mutuelle, devis mutuelle, assurance maladie, complémentaire santé, France" />
        <meta property="og:title" content="Optisanté - Comparateur d'Assurance Santé en France" />
        <meta property="og:description" content="Comparez les meilleures assurances santé en France. Trouvez la mutuelle adaptée à vos besoins et votre budget." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://optisante.org" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Optisanté"
                  width={180}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Opt'Insurance
                </a>
                <a href="#features" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Comparison
                </a>
                <a href="#features" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Features
                </a>
              </div>
              <div>
                <Link
                  href="/calculator"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Optisanté
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
            >
              Comparez plus de 3200 formules santé et économisez en moyenne 415€ !*
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Trouvez la mutuelle santé qui correspond à vos besoins et à votre budget en quelques clics.
            </motion.p>

            <motion.div variants={itemVariants}>
              <button
                onClick={() => router.push('/calculator')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 flex items-center justify-center mx-auto"
              >
                Comparer les mutuelles
                <FaArrowRight className="ml-2" />
              </button>
            </motion.div>
          </motion.div>

          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quel est le prix d'une mutuelle santé ?</h2>
            
            <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-8 mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Prix de la mutuelle selon l'âge
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {priceData.age.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100"
                  >
                    <p className="font-medium text-gray-800 text-lg mb-2">{item.range}</p>
                    <p className="text-blue-600 font-bold text-2xl">{item.price}</p>
                    <p className="text-gray-500 text-sm mt-2">par mois</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-8 mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Prix des mutuelles selon les zones géographiques
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {priceData.location.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-100"
                  >
                    <p className="font-medium text-gray-800 text-lg mb-2">{item.dept}</p>
                    <p className="text-purple-600 font-bold text-2xl">{item.price}</p>
                    <p className="text-gray-500 text-sm mt-2">par mois</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Prix de la mutuelle selon le niveau de garanties
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {priceData.coverage.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-white to-green-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-green-100"
                  >
                    <p className="font-medium text-gray-800 text-lg mb-2">{item.level}</p>
                    <p className="text-green-600 font-bold text-2xl">{item.price}</p>
                    <p className="text-gray-500 text-sm mt-2">par mois</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.section>

          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Comment comparer et choisir votre mutuelle ?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                variants={itemVariants}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="text-blue-600 mb-4">
                  <FaUserFriends className="text-4xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4">1. Remplissez le formulaire</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Votre situation personnelle</li>
                  <li>• Vos besoins en santé</li>
                  <li>• Votre budget mensuel</li>
                </ul>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="text-blue-600 mb-4">
                  <FaSearch className="text-4xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4">2. Comparez les offres</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Analyse des garanties</li>
                  <li>• Comparaison des prix</li>
                  <li>• Services inclus</li>
                </ul>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="text-blue-600 mb-4">
                  <FaShieldAlt className="text-4xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4">3. Souscrivez en ligne</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Devis personnalisé</li>
                  <li>• Souscription rapide</li>
                  <li>• Assistance dédiée</li>
                </ul>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Nos partenaires assureurs
              </span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[
                { name: 'APRIL', logo: '/logos/april.png' },
                { name: 'MGEN', logo: '/logos/mgen.png' },
                { name: 'SWISS LIFE', logo: '/logos/swiss-life.png' },
                { name: 'AESIO', logo: '/logos/aesio.png' },
                { name: 'MMA', logo: '/logos/mma.png' },
                { name: 'MATMUT', logo: '/logos/matmut.png' }
              ].map((partner, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center group"
                >
                  <div className="relative w-32 h-20 mb-4">
                    <Image
                      src={partner.logo}
                      alt={`Logo ${partner.name}`}
                      fill
                      style={{ objectFit: 'contain' }}
                      className="transition-opacity duration-300 group-hover:opacity-90"
                    />
                  </div>
                  <p className="font-medium text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
                    {partner.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Avis clients
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sophie B.',
                  rating: 5,
                  comment: 'Excellent service, conseillère au top. Agréable et professionnelle.',
                  date: '07/03/2025'
                },
                {
                  name: 'François R.',
                  rating: 5,
                  comment: 'Renseignements clairs, très bonne comparaison des offres.',
                  date: '08/03/2025'
                },
                {
                  name: 'Mathilde L.',
                  rating: 5,
                  comment: "Conseiller à l'écoute et échange très intéressant.",
                  date: '07/03/2025'
                }
              ].map((review, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} className="w-6 h-6" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 text-lg italic">{review.comment}</p>
                  <div className="flex justify-between items-center text-sm">
                    <p className="font-semibold text-blue-600">{review.name}</p>
                    <p className="text-gray-500">{review.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center text-sm text-gray-500"
          >
            <p>* Date de mise à jour : 02/04/2025. Étude des tarifs moyens proposés par nos partenaires assureurs, tous profils et tous niveaux de garanties confondus, du 1er au 31 Mars 2025.</p>
          </motion.div>
        </div>
        <Partners />
      </main>
    </>
  )
} 