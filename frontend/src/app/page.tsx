'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { FaArrowRight, FaChartLine, FaShieldAlt, FaEuroSign, FaUserFriends, FaSearch } from 'react-icons/fa'

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

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="text-blue-600 mb-4">
                <FaChartLine className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comparaison complète</h3>
              <p className="text-gray-600">
                Comparez les garanties, les prix et les services de plus de 3200 formules santé.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="text-blue-600 mb-4">
                <FaShieldAlt className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Garanties adaptées</h3>
              <p className="text-gray-600">
                Trouvez la couverture qui correspond à votre profil et à vos besoins spécifiques.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="text-blue-600 mb-4">
                <FaEuroSign className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Économies garanties</h3>
              <p className="text-gray-600">
                Réalisez jusqu'à 415€ d'économies en moyenne sur votre mutuelle santé.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-lg p-8 mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Comment ça marche ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-blue-100 rounded-full p-4 mb-4">
                  <FaUserFriends className="text-3xl text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">1. Définissez votre profil</h3>
                <p className="text-gray-600">
                  Indiquez votre situation personnelle et vos besoins en matière de santé.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-blue-100 rounded-full p-4 mb-4">
                  <FaSearch className="text-3xl text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">2. Comparez les offres</h3>
                <p className="text-gray-600">
                  Recevez instantanément les meilleures offres adaptées à votre profil.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-blue-100 rounded-full p-4 mb-4">
                  <FaShieldAlt className="text-3xl text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">3. Souscrivez en ligne</h3>
                <p className="text-gray-600">
                  Choisissez votre mutuelle et souscrivez directement en ligne.
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center text-sm text-gray-500"
          >
            <p>* Date de mise à jour : 02/04/2025. Étude des tarifs moyens proposés par nos partenaires assureurs, tous profils et tous niveaux de garanties confondus, du 1er au 31 Mars 2025.</p>
          </motion.div>
        </div>
      </main>
    </>
  )
} 