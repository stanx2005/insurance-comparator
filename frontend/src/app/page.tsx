'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Head from 'next/head'

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

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
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
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Health Insurance</span>{' '}
                <span className="block text-blue-600 xl:inline">Comparison Features</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Health Insurance comparison to your Health comparisons taped for to is your Wellness.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
                <Link
                  href="/calculator"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Trouvez votre assurance optimale
                </Link>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-gradient-to-r from-blue-400 via-green-300 to-blue-500 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-3 gap-4 p-8">
                    <div className="bg-white p-4 rounded-full flex items-center justify-center">
                      <Image src="/images/heart.svg" alt="Health" width={40} height={40} />
                    </div>
                    <div className="bg-white p-4 rounded-full flex items-center justify-center">
                      <Image src="/images/medical.svg" alt="Medical" width={40} height={40} />
                    </div>
                    <div className="bg-white p-4 rounded-full flex items-center justify-center">
                      <Image src="/images/family.svg" alt="Family" width={40} height={40} />
                    </div>
                    <div className="bg-white p-4 rounded-full flex items-center justify-center">
                      <Image src="/images/dental.svg" alt="Dental" width={40} height={40} />
                    </div>
                    <div className="bg-white p-4 rounded-full flex items-center justify-center">
                      <Image src="/images/vision.svg" alt="Vision" width={40} height={40} />
                    </div>
                    <div className="bg-white p-4 rounded-full flex items-center justify-center">
                      <Image src="/images/wellness.svg" alt="Wellness" width={40} height={40} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="features" className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Une comparaison complète
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Découvrez les avantages de notre comparateur d'assurance santé
              </p>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Comparaison rapide</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Obtenez une comparaison instantanée des meilleures offres d'assurance santé.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Prix transparents</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Des tarifs clairs et détaillés pour chaque offre d'assurance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Couverture complète</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Une analyse détaillée des garanties pour chaque contrat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
} 