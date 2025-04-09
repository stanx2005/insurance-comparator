'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import StepIndicator from '@/components/StepIndicator'
import ExitPrompt from '@/components/ExitPrompt'
import Step1Adherents from '@/components/steps/Step1Adherents'
import Step2Regime from '@/components/steps/Step2Regime'
import Step3Contract from '@/components/steps/Step3Contract'
import Step4Coverage from '@/components/steps/Step4Coverage'
import Step5Contact from '@/components/steps/Step5Contact'

interface CoverageLevels {
  soinsCourants: number;
  hospitalisation: number;
  optique: number;
  dentaire: number;
  auditif: number;
}

interface PersonalizedCoverage {
  soinsMedicaux: string;
  hospitalisation: string;
  optique: string;
  dentaire: string;
  auditif: string;
}

interface FormData {
  insuranceType: string;
  gender: string;
  birthDate: string;
  profession: string;
  regime: string;
  secondPersonGender: string;
  secondPersonFirstName: string;
  secondPersonLastName: string;
  secondPersonBirthDate: string;
  secondPersonProfession: string;
  secondPersonRegime: string;
  postalCode: string;
  city: string;
  isCurrentlyInsured: string;
  contractEndMonth: string;
  desiredStartDate: string;
  coverageType: string;
  coverageLevels: CoverageLevels;
  personalizedCoverage: PersonalizedCoverage;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  acceptTerms: boolean;
  [key: string]: any; // Add index signature for dynamic access
}

export default function Calculator() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [showExitPrompt, setShowExitPrompt] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    insuranceType: '',
    gender: '',
    birthDate: '',
    profession: '',
    regime: '',
    secondPersonGender: '',
    secondPersonFirstName: '',
    secondPersonLastName: '',
    secondPersonBirthDate: '',
    secondPersonProfession: '',
    secondPersonRegime: '',
    postalCode: '',
    city: '',
    isCurrentlyInsured: '',
    contractEndMonth: '',
    desiredStartDate: '',
    coverageType: '',
    coverageLevels: {
      soinsCourants: 1,
      hospitalisation: 1,
      optique: 1,
      dentaire: 1,
      auditif: 1
    },
    personalizedCoverage: {
      soinsMedicaux: 'minimum',
      hospitalisation: 'minimum',
      optique: 'minimum',
      dentaire: 'minimum',
      auditif: 'minimum'
    },
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    acceptTerms: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (name.includes('.')) {
      // Handle nested object properties (e.g., personalizedCoverage.soinsMedicaux)
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }))
    }
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const handleSubmit = async () => {
    try {
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

      router.push('/loading')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Adherents formData={formData} handleInputChange={handleInputChange} />
      case 2:
        return <Step2Regime formData={formData} handleInputChange={handleInputChange} />
      case 3:
        return <Step3Contract formData={formData} handleInputChange={handleInputChange} />
      case 4:
        return <Step4Coverage formData={formData} handleInputChange={handleInputChange} />
      case 5:
        return <Step5Contact formData={formData} handleInputChange={handleInputChange} />
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-8 px-4 sm:px-6 lg:px-8">
      <StepIndicator currentStep={step} setStep={setStep} />
      <ExitPrompt isOpen={showExitPrompt} onClose={() => setShowExitPrompt(false)} onConfirm={() => router.push('/')} />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Devis mutuelle santé
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            {step === 1 && 'Adhérents'}
            {step === 2 && 'Régime'}
            {step === 3 && 'Contrat'}
            {step === 4 && 'Besoins'}
            {step === 5 && 'Coordonnées'}
          </p>
          <p className="text-lg text-gray-600">
            En seulement 2 minutes, comparez les meilleurs devis mutuelle du marché !
          </p>
        </div>

        {renderStep()}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Précédent
            </button>
          )}
          <button
            onClick={step === 5 ? handleSubmit : nextStep}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto"
          >
            {step === 5 ? 'Voir les offres' : 'Suivant'}
          </button>
        </div>
      </div>
    </main>
  )
} 