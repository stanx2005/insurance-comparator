'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

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
      <StepIndicator />
      <ExitPrompt />
      
      <main className="min-h-screen bg-gray-50 pt-32 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Devis mutuelle santé
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Adhérents
            </p>
            <p className="text-lg text-gray-600">
              En seulement 2 minutes, comparez les meilleurs devis mutuelle du marché !
            </p>
          </div>

          {/* Form Cards */}
          <div className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="card">
                  <h2 className="text-2xl font-semibold text-secondary mb-6">Qui souhaitez-vous assurer ?</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 'single', label: 'Un adulte' },
                      { id: 'single_children', label: 'Un adulte + enfant(s)' },
                      { id: 'couple', label: 'Un couple' },
                      { id: 'couple_children', label: 'Un couple + enfant(s)' }
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setFormData(prev => ({ ...prev, insuranceType: option.id }))}
                        className={`p-4 border-2 rounded-lg text-left ${
                          formData.insuranceType === option.id
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {formData.insuranceType && (
                  <div className="card">
                    <h2 className="text-2xl font-semibold text-secondary mb-6">
                      Commençons par votre profil, vous êtes
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { id: 'male', label: 'Un homme', icon: '👨' },
                        { id: 'female', label: 'Une femme', icon: '👩' }
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setFormData(prev => ({ ...prev, gender: option.id }))}
                          className={`p-6 border-2 rounded-lg flex items-center space-x-4 ${
                            formData.gender === option.id
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-gray-200 hover:border-primary/50'
                          }`}
                        >
                          <span className="text-3xl">{option.icon}</span>
                          <span className="text-lg">{option.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Pourquoi cette question ?</h3>
                      <p className="text-gray-600">
                        Les assureurs ont besoin de cette information pour établir votre dossier.
                      </p>
                    </div>
                  </div>
                )}

                {formData.gender && (
                  <div className="card">
                    <h2 className="text-2xl font-semibold text-secondary mb-6">Votre Profil</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-group">
                        <label className="form-label">Date de naissance</label>
                        <input
                          type="date"
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Profession ou activité</label>
                        <select 
                          name="profession" 
                          value={formData.profession}
                          onChange={handleInputChange}
                          className="form-select"
                        >
                          <option value="">Sélectionnez</option>
                          <option value="salarie">Salarié(e) non-cadre</option>
                          <option value="recherche">Recherche d'emploi</option>
                          <option value="retraite">Retraité(e)</option>
                          <option value="sans">Sans profession</option>
                          <option value="autre">Autres professions</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Régime social</label>
                        <select 
                          name="regime" 
                          value={formData.regime}
                          onChange={handleInputChange}
                          className="form-select"
                        >
                          <option value="">Sélectionnez</option>
                          <option value="general">Général</option>
                          <option value="tns">Travailleur Non Salarié (TNS)</option>
                          <option value="agricole">Agricole</option>
                          <option value="alsace-moselle">Alsace-Moselle</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Show second person form if couple is selected */}
                {(formData.insuranceType === 'couple' || formData.insuranceType === 'couple_children') && 
                 formData.birthDate && formData.profession && formData.regime && (
                  <div className="card">
                    <h2 className="text-2xl font-semibold text-secondary mb-6">
                      Passons à votre conjoint(e), {formData.gender === 'male' ? 'il' : 'elle'} est
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { id: 'male', label: 'Un homme', icon: '👨' },
                        { id: 'female', label: 'Une femme', icon: '👩' }
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setFormData(prev => ({ ...prev, secondPersonGender: option.id }))}
                          className={`p-6 border-2 rounded-lg flex items-center space-x-4 ${
                            formData.secondPersonGender === option.id
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-gray-200 hover:border-primary/50'
                          }`}
                        >
                          <span className="text-3xl">{option.icon}</span>
                          <span className="text-lg">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Show second person details form */}
                {(formData.insuranceType === 'couple' || formData.insuranceType === 'couple_children') && 
                 formData.secondPersonGender && (
                  <div className="card">
                    <h2 className="text-2xl font-semibold text-secondary mb-6">
                      Informations de votre conjoint(e)
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-group">
                        <label className="form-label">Nom</label>
                        <input
                          type="text"
                          name="secondPersonLastName"
                          value={formData.secondPersonLastName}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="Nom"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Prénom</label>
                        <input
                          type="text"
                          name="secondPersonFirstName"
                          value={formData.secondPersonFirstName}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="Prénom"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Date de naissance</label>
                        <input
                          type="date"
                          name="secondPersonBirthDate"
                          value={formData.secondPersonBirthDate}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Profession ou activité</label>
                        <select 
                          name="secondPersonProfession" 
                          value={formData.secondPersonProfession}
                          onChange={handleInputChange}
                          className="form-select"
                        >
                          <option value="">Sélectionnez</option>
                          <option value="salarie">Salarié(e) non-cadre</option>
                          <option value="recherche">Recherche d'emploi</option>
                          <option value="retraite">Retraité(e)</option>
                          <option value="sans">Sans profession</option>
                          <option value="autre">Autres professions</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Régime social</label>
                        <select 
                          name="secondPersonRegime" 
                          value={formData.secondPersonRegime}
                          onChange={handleInputChange}
                          className="form-select"
                        >
                          <option value="">Sélectionnez</option>
                          <option value="general">Général</option>
                          <option value="tns">Travailleur Non Salarié (TNS)</option>
                          <option value="agricole">Agricole</option>
                          <option value="alsace-moselle">Alsace-Moselle</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Show summary of both persons' information */}
                {(formData.insuranceType === 'couple' || formData.insuranceType === 'couple_children') && 
                 formData.secondPersonBirthDate && formData.secondPersonProfession && formData.secondPersonRegime && (
                  <div className="card">
                    <h2 className="text-2xl font-semibold text-secondary mb-6">Les adhérents</h2>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Vous</h3>
                        <p>Né(e) le {formData.birthDate}</p>
                        <p>{formData.profession}</p>
                        <p>{formData.regime}</p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Votre conjoint</h3>
                        <p>Né(e) le {formData.secondPersonBirthDate}</p>
                        <p>{formData.secondPersonProfession}</p>
                        <p>{formData.secondPersonRegime}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-secondary mb-3">
                    Qu'est-ce qu'un devis de mutuelle santé ?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Un devis de mutuelle santé estime le prix d'une assurance santé. Il contient les garanties ainsi que les niveaux de remboursement par poste de soins.
                  </p>
                  <p className="text-gray-600">
                    C'est une étape essentielle avant la signature d'un contrat de mutuelle. Il vous donne l'occasion de bien réfléchir sur vos besoins en matière de santé. Par ailleurs, un devis est sans engagement !
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="card">
                  <h2 className="text-2xl font-semibold text-secondary mb-6">Votre régime Social</h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { id: 'general', label: 'Général' },
                      { id: 'tns', label: 'Travailleur Non Salarié (TNS)' },
                      { id: 'agricole', label: 'Agricole' },
                      { id: 'alsace-moselle', label: 'Alsace-Moselle' }
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setFormData(prev => ({ ...prev, regime: option.id }))}
                        className={`p-6 border-2 rounded-lg text-left transition-colors ${
                          formData.regime === option.id
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-semibold text-secondary mb-4">Aide</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Le régime général</h4>
                        <p className="text-gray-600">
                          Il concerne les salariés du secteur privés ainsi que les travailleurs indépendants, les retraités, étudiants et sans profession.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Le régime agricole</h4>
                        <p className="text-gray-600">
                          Il accompagne les exploitants, les salariés agricoles et les entreprises agricoles.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Le régime Alsace-Moselle</h4>
                        <p className="text-gray-600">
                          Il verse à ses bénéficiaires un complément de remboursement, en plus de ce que le régime de base de la Sécurité Sociale prend en charge.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-secondary mb-3">
                      Pourquoi cette information est importante ?
                    </h3>
                    <p className="text-gray-600">
                      Votre régime social détermine vos droits et le niveau de remboursement de base de la Sécurité sociale. Cette information est essentielle pour calculer précisément vos remboursements complémentaires.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="card">
                  <h2 className="text-2xl font-semibold text-secondary mb-6">Contrat</h2>
                  
                  <div className="space-y-6">
                    <div className="form-group">
                      <label className="form-label">Quel est le code postal ou la ville de votre foyer ?</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Code postal ou ville"
                      />
                    </div>

                    <div className="form-group">
                      <h3 className="text-lg font-semibold mb-4">Etes-vous assuré(e) actuellement ?</h3>
                      <p className="text-sm text-gray-600 mb-4">Cette question concerne l'adhérent principal</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { id: 'yes', label: 'Oui' },
                          { id: 'no', label: 'Non' }
                        ].map((option) => (
                          <button
                            key={option.id}
                            onClick={() => setFormData(prev => ({ ...prev, isCurrentlyInsured: option.id }))}
                            className={`p-4 border-2 rounded-lg text-left ${
                              formData.isCurrentlyInsured === option.id
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-gray-200 hover:border-primary/50'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {formData.isCurrentlyInsured === 'yes' && (
                      <div className="form-group">
                        <label className="form-label">Mois d'échéance du contrat</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {getNextMonths().nextMonths.map((month) => (
                            <button
                              key={month}
                              onClick={() => setFormData(prev => ({ ...prev, contractEndMonth: month }))}
                              className={`p-4 border-2 rounded-lg text-left ${
                                formData.contractEndMonth === month
                                  ? 'border-primary bg-primary/5 text-primary'
                                  : 'border-gray-200 hover:border-primary/50'
                              }`}
                            >
                              {month}
                            </button>
                          ))}
                          <div className="relative group">
                            <button
                              onClick={() => {/* Show month selector */}}
                              className="p-4 border-2 border-gray-200 rounded-lg text-left w-full hover:border-primary/50"
                            >
                              Autre mois...
                            </button>
                            <div className="hidden group-hover:block absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                              {getNextMonths().allMonths.map((month) => (
                                <button
                                  key={month}
                                  onClick={() => setFormData(prev => ({ ...prev, contractEndMonth: month }))}
                                  className="block w-full px-4 py-2 text-left hover:bg-gray-50"
                                >
                                  {month}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {formData.isCurrentlyInsured === 'no' && (
                      <div className="form-group">
                        <label className="form-label">A quelle date souhaitez-vous être assuré(e) ?</label>
                        <div className="space-y-4">
                          {[
                            { id: 'today', label: `Aujourd'hui - ${getFormattedDates().today.fullDate}` },
                            { id: 'tomorrow', label: `Demain - ${getFormattedDates().tomorrow.fullDate}` },
                            { id: 'nextWeek', label: `Dans une semaine - ${getFormattedDates().nextWeek.fullDate}` },
                            { id: 'nextMonth', label: `Dans un mois - ${getFormattedDates().nextMonth.fullDate}` },
                            { id: 'other', label: 'Une autre date' }
                          ].map((option) => (
                            <button
                              key={option.id}
                              onClick={() => setFormData(prev => ({ ...prev, desiredStartDate: option.id }))}
                              className={`w-full p-4 border-2 rounded-lg text-left ${
                                formData.desiredStartDate === option.id
                                  ? 'border-primary bg-primary/5 text-primary'
                                  : 'border-gray-200 hover:border-primary/50'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Info Box */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="font-semibold text-secondary mb-4">À savoir</h3>
                      <div className="space-y-4 text-gray-600">
                        <p>
                          Si vous ou votre conjoint bénéficiez d'une mutuelle d'entreprise obligatoire, assurez-vous également de pouvoir vous en dispenser.
                        </p>
                        <p>
                          De même, notez bien que votre nouvel assureur ne se chargera de la résiliation que d'un des deux contrats.
                          Vous devrez résilier par vous-même le contrat de votre conjoint, et ce à la même date afin d'éviter tout doublon de couverture.
                        </p>
                        <p>
                          Enfin, si vous êtes éligible à la Complémentaire Santé Solidaire, sachez qu'elle n'est pas acceptée par tous les assureurs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="card">
                  <h2 className="text-2xl font-semibold text-secondary mb-6">Je souhaite une couverture...</h2>
                  
                  <div className="space-y-6">
                    {/* Personalized Option */}
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, coverageType: 'personalized' }))}
                      className={`w-full p-6 border-2 rounded-lg text-left ${
                        formData.coverageType === 'personalized'
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-lg font-semibold text-primary mb-2">Personnalisée</span>
                        <span className="text-gray-600">pour choisir mes besoins sur chaque poste de soins</span>
                      </div>
                    </button>

                    {formData.coverageType === 'personalized' ? (
                      <div className="mt-6 space-y-8">
                        <div>
                          <div className="flex items-center mb-4">
                            <h3 className="text-lg font-semibold text-secondary">Soins médicaux</h3>
                            <HelpTooltip content={{
                              title: "Comment choisir vos besoins en soins médicaux ?",
                              descriptions: [
                                {
                                  label: "Certains généralistes et spécialistes pratiquent des dépassements d'honoraires, c'est-à-dire que leurs honoraires excèdent les tarifs réglementés fixés par la sécurité sociale. Pour choisir, évaluez la fréquence et l'importance des dépassements des médecins que vous consultez.",
                                  value: ""
                                },
                                {
                                  label: "Pas de dépassement d'honoraires",
                                  value: "jusqu'à 100% de la base de remboursement"
                                },
                                {
                                  label: "Dépassements d'honoraires très légers",
                                  value: "jusqu'à 125% de la base de remboursement"
                                },
                                {
                                  label: "Dépassements d'honoraires modérés",
                                  value: "autour de 150% de la base de remboursement"
                                },
                                {
                                  label: "Dépassements d'honoraires élevés",
                                  value: "200% ou plus de la base de remboursement"
                                }
                              ]
                            }} />
                          </div>

                          <div className="space-y-6">
                            {[
                              {
                                id: 'minimum',
                                title: 'Minimum',
                                description: "Pas de dépassement d'honoraires",
                                value: 1
                              },
                              {
                                id: 'moyen',
                                title: 'Moyen',
                                description: "Dépassements d'honoraires très légers",
                                value: 2
                              },
                              {
                                id: 'fort',
                                title: 'Fort',
                                description: "Dépassements d'honoraires modérés",
                                value: 3
                              },
                              {
                                id: 'maximum',
                                title: 'Maximum',
                                description: "Dépassements d'honoraires élevés",
                                value: 4
                              }
                            ].map((option) => (
                              <div key={option.id} className="relative">
                                <button
                                  onClick={() => setFormData(prev => ({
                                    ...prev,
                                    personalizedCoverage: {
                                      ...prev.personalizedCoverage,
                                      soinsMedicaux: option.id as MedicalCareLevel
                                    }
                                  }))}
                                  className={`w-full p-4 hover:bg-gray-50 rounded-lg transition-colors ${
                                    formData.personalizedCoverage.soinsMedicaux === option.id
                                      ? 'bg-primary/5'
                                      : ''
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className={`font-semibold ${
                                      formData.personalizedCoverage.soinsMedicaux === option.id
                                        ? 'text-primary'
                                        : 'text-secondary'
                                    }`}>
                                      {option.title}
                                    </h4>
                                    <div className="flex space-x-1">
                                      {[...Array(4)].map((_, i) => (
                                        <div
                                          key={i}
                                          className={`w-8 h-2 rounded ${
                                            i < option.value
                                              ? formData.personalizedCoverage.soinsMedicaux === option.id
                                                ? 'bg-primary'
                                                : 'bg-gray-400'
                                              : 'bg-gray-200'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600 text-left">{option.description}</p>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Hospitalisation Section */}
                        <div>
                          <div className="flex items-center mb-4">
                            <h3 className="text-lg font-semibold text-secondary">Hospitalisation</h3>
                            <HelpTooltip content={{
                              title: "Comment choisir vos besoins en hospitalisation ?",
                              descriptions: [
                                {
                                  label: "Les dépassements d'honoraires sont fréquents en hospitalisation, notamment pour la chirurgie. Le choix de votre niveau de couverture dépendra de vos antécédents médicaux et de vos préférences concernant le confort hospitalier.",
                                  value: ""
                                },
                                {
                                  label: "Minimum",
                                  value: "Chambre double, pas de dépassements d'honoraires (100% BR)"
                                },
                                {
                                  label: "Moyen",
                                  value: "Chambre particulière, dépassements modérés (150% BR)"
                                },
                                {
                                  label: "Fort",
                                  value: "Chambre particulière, dépassements importants (200% BR)"
                                },
                                {
                                  label: "Maximum",
                                  value: "Confort optimal, dépassements élevés (300% BR ou plus)"
                                }
                              ]
                            }} />
                          </div>

                          <div className="space-y-6">
                            {[
                              {
                                id: 'minimum',
                                title: 'Minimum',
                                description: "Chambre double, pas de dépassements d'honoraires",
                                value: 1
                              },
                              {
                                id: 'moyen',
                                title: 'Moyen',
                                description: "Chambre particulière, dépassements modérés",
                                value: 2
                              },
                              {
                                id: 'fort',
                                title: 'Fort',
                                description: "Chambre particulière, dépassements importants",
                                value: 3
                              },
                              {
                                id: 'maximum',
                                title: 'Maximum',
                                description: "Confort optimal, dépassements élevés",
                                value: 4
                              }
                            ].map((option) => (
                              <div key={option.id} className="relative">
                                <button
                                  onClick={() => setFormData(prev => ({
                                    ...prev,
                                    personalizedCoverage: {
                                      ...prev.personalizedCoverage,
                                      hospitalisation: option.id as MedicalCareLevel
                                    }
                                  }))}
                                  className={`w-full p-4 hover:bg-gray-50 rounded-lg transition-colors ${
                                    formData.personalizedCoverage.hospitalisation === option.id
                                      ? 'bg-primary/5'
                                      : ''
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className={`font-semibold ${
                                      formData.personalizedCoverage.hospitalisation === option.id
                                        ? 'text-primary'
                                        : 'text-secondary'
                                    }`}>
                                      {option.title}
                                    </h4>
                                    <div className="flex space-x-1">
                                      {[...Array(4)].map((_, i) => (
                                        <div
                                          key={i}
                                          className={`w-8 h-2 rounded ${
                                            i < option.value
                                              ? formData.personalizedCoverage.hospitalisation === option.id
                                                ? 'bg-primary'
                                                : 'bg-gray-400'
                                              : 'bg-gray-200'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600 text-left">{option.description}</p>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Optique Section */}
                        <div>
                          <div className="flex items-center mb-4">
                            <h3 className="text-lg font-semibold text-secondary">Optique</h3>
                            <HelpTooltip content={{
                              title: "Comment choisir vos besoins en optique ?",
                              descriptions: [
                                {
                                  label: "Le niveau de couverture optique dépend de votre correction et de vos besoins en équipement (verres progressifs, traitements spéciaux...).",
                                  value: ""
                                },
                                {
                                  label: "Minimum",
                                  value: "Équipement simple, verres unifocaux (100% BR)"
                                },
                                {
                                  label: "Moyen",
                                  value: "Verres de marque, monture moyenne gamme (150-200% BR)"
                                },
                                {
                                  label: "Fort",
                                  value: "Verres progressifs, traitements spéciaux (250-300% BR)"
                                },
                                {
                                  label: "Maximum",
                                  value: "Équipement haut de gamme, verres sur-mesure (400% BR ou plus)"
                                }
                              ]
                            }} />
                          </div>

                          <div className="space-y-6">
                            {[
                              {
                                id: 'minimum',
                                title: 'Minimum',
                                description: "Équipement simple, verres unifocaux",
                                value: 1
                              },
                              {
                                id: 'moyen',
                                title: 'Moyen',
                                description: "Verres de marque, monture moyenne gamme",
                                value: 2
                              },
                              {
                                id: 'fort',
                                title: 'Fort',
                                description: "Verres progressifs, traitements spéciaux",
                                value: 3
                              },
                              {
                                id: 'maximum',
                                title: 'Maximum',
                                description: "Équipement haut de gamme, verres sur-mesure",
                                value: 4
                              }
                            ].map((option) => (
                              <div key={option.id} className="relative">
                                <button
                                  onClick={() => setFormData(prev => ({
                                    ...prev,
                                    personalizedCoverage: {
                                      ...prev.personalizedCoverage,
                                      optique: option.id as MedicalCareLevel
                                    }
                                  }))}
                                  className={`w-full p-4 hover:bg-gray-50 rounded-lg transition-colors ${
                                    formData.personalizedCoverage.optique === option.id
                                      ? 'bg-primary/5'
                                      : ''
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className={`font-semibold ${
                                      formData.personalizedCoverage.optique === option.id
                                        ? 'text-primary'
                                        : 'text-secondary'
                                    }`}>
                                      {option.title}
                                    </h4>
                                    <div className="flex space-x-1">
                                      {[...Array(4)].map((_, i) => (
                                        <div
                                          key={i}
                                          className={`w-8 h-2 rounded ${
                                            i < option.value
                                              ? formData.personalizedCoverage.optique === option.id
                                                ? 'bg-primary'
                                                : 'bg-gray-400'
                                              : 'bg-gray-200'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600 text-left">{option.description}</p>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Dentaire Section */}
                        <div>
                          <div className="flex items-center mb-4">
                            <h3 className="text-lg font-semibold text-secondary">Dentaire</h3>
                            <HelpTooltip content={{
                              title: "Comment choisir vos besoins en dentaire ?",
                              descriptions: [
                                {
                                  label: "Les soins dentaires peuvent être très coûteux, notamment pour les prothèses et l'implantologie. Votre choix dépendra de l'état de votre dentition et des soins prévus.",
                                  value: ""
                                },
                                {
                                  label: "Minimum",
                                  value: "Soins courants et prothèses simples (100% BR)"
                                },
                                {
                                  label: "Moyen",
                                  value: "Prothèses de qualité moyenne (200% BR)"
                                },
                                {
                                  label: "Fort",
                                  value: "Couronnes et bridges de qualité (300% BR)"
                                },
                                {
                                  label: "Maximum",
                                  value: "Implants et prothèses haut de gamme (400% BR ou plus)"
                                }
                              ]
                            }} />
                          </div>

                          <div className="space-y-6">
                            {[
                              {
                                id: 'minimum',
                                title: 'Minimum',
                                description: "Soins courants et prothèses simples",
                                value: 1
                              },
                              {
                                id: 'moyen',
                                title: 'Moyen',
                                description: "Prothèses de qualité moyenne",
                                value: 2
                              },
                              {
                                id: 'fort',
                                title: 'Fort',
                                description: "Couronnes et bridges de qualité",
                                value: 3
                              },
                              {
                                id: 'maximum',
                                title: 'Maximum',
                                description: "Implants et prothèses haut de gamme",
                                value: 4
                              }
                            ].map((option) => (
                              <div key={option.id} className="relative">
                                <button
                                  onClick={() => setFormData(prev => ({
                                    ...prev,
                                    personalizedCoverage: {
                                      ...prev.personalizedCoverage,
                                      dentaire: option.id as MedicalCareLevel
                                    }
                                  }))}
                                  className={`w-full p-4 hover:bg-gray-50 rounded-lg transition-colors ${
                                    formData.personalizedCoverage.dentaire === option.id
                                      ? 'bg-primary/5'
                                      : ''
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className={`font-semibold ${
                                      formData.personalizedCoverage.dentaire === option.id
                                        ? 'text-primary'
                                        : 'text-secondary'
                                    }`}>
                                      {option.title}
                                    </h4>
                                    <div className="flex space-x-1">
                                      {[...Array(4)].map((_, i) => (
                                        <div
                                          key={i}
                                          className={`w-8 h-2 rounded ${
                                            i < option.value
                                              ? formData.personalizedCoverage.dentaire === option.id
                                                ? 'bg-primary'
                                                : 'bg-gray-400'
                                              : 'bg-gray-200'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600 text-left">{option.description}</p>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Auditif Section */}
                        <div>
                          <div className="flex items-center mb-4">
                            <h3 className="text-lg font-semibold text-secondary">Auditif</h3>
                            <HelpTooltip content={{
                              title: "Comment choisir vos besoins en audioprothèses ?",
                              descriptions: [
                                {
                                  label: "Les appareils auditifs représentent un investissement important. Le niveau de couverture dépendra de votre perte auditive et de vos besoins en équipement.",
                                  value: ""
                                },
                                {
                                  label: "Minimum",
                                  value: "Appareils basiques (100% BR)"
                                },
                                {
                                  label: "Moyen",
                                  value: "Appareils de moyenne gamme (200% BR)"
                                },
                                {
                                  label: "Fort",
                                  value: "Appareils sophistiqués (300% BR)"
                                },
                                {
                                  label: "Maximum",
                                  value: "Appareils haut de gamme (400% BR ou plus)"
                                }
                              ]
                            }} />
                          </div>

                          <div className="space-y-6">
                            {[
                              {
                                id: 'minimum',
                                title: 'Minimum',
                                description: "Appareils basiques",
                                value: 1
                              },
                              {
                                id: 'moyen',
                                title: 'Moyen',
                                description: "Appareils de moyenne gamme",
                                value: 2
                              },
                              {
                                id: 'fort',
                                title: 'Fort',
                                description: "Appareils sophistiqués",
                                value: 3
                              },
                              {
                                id: 'maximum',
                                title: 'Maximum',
                                description: "Appareils haut de gamme",
                                value: 4
                              }
                            ].map((option) => (
                              <div key={option.id} className="relative">
                                <button
                                  onClick={() => setFormData(prev => ({
                                    ...prev,
                                    personalizedCoverage: {
                                      ...prev.personalizedCoverage,
                                      auditif: option.id as MedicalCareLevel
                                    }
                                  }))}
                                  className={`w-full p-4 hover:bg-gray-50 rounded-lg transition-colors ${
                                    formData.personalizedCoverage.auditif === option.id
                                      ? 'bg-primary/5'
                                      : ''
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className={`font-semibold ${
                                      formData.personalizedCoverage.auditif === option.id
                                        ? 'text-primary'
                                        : 'text-secondary'
                                    }`}>
                                      {option.title}
                                    </h4>
                                    <div className="flex space-x-1">
                                      {[...Array(4)].map((_, i) => (
                                        <div
                                          key={i}
                                          className={`w-8 h-2 rounded ${
                                            i < option.value
                                              ? formData.personalizedCoverage.auditif === option.id
                                                ? 'bg-primary'
                                                : 'bg-gray-400'
                                              : 'bg-gray-200'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600 text-left">{option.description}</p>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="text-center text-gray-500 font-medium">Ou</div>

                        {/* Predefined Options */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                            {
                              id: 'minimal' as CoverageType,
                              title: 'Minimale',
                              description: 'pour obtenir les meilleurs prix',
                              levels: {
                                soinsCourants: 1,
                                hospitalisation: 1,
                                optique: 1,
                                dentaire: 1,
                                auditif: 1
                              } as CoverageLevels
                            },
                            {
                              id: 'balanced' as CoverageType,
                              title: 'Equilibrée',
                              description: 'pour maitriser mon budget',
                              levels: {
                                soinsCourants: 2,
                                hospitalisation: 2,
                                optique: 2,
                                dentaire: 2,
                                auditif: 2
                              } as CoverageLevels
                            },
                            {
                              id: 'maximal' as CoverageType,
                              title: 'Maximale',
                              description: 'pour réduire mon reste à charge',
                              levels: {
                                soinsCourants: 4,
                                hospitalisation: 4,
                                optique: 3,
                                dentaire: 3,
                                auditif: 3
                              } as CoverageLevels
                            }
                          ].map((option) => (
                            <button
                              key={option.id}
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                coverageType: option.id,
                                coverageLevels: option.levels
                              }))}
                              className={`flex flex-col h-full p-6 border-2 rounded-lg ${
                                formData.coverageType === option.id
                                  ? 'border-primary bg-primary/5'
                                  : 'border-gray-200 hover:border-primary/50'
                              }`}
                            >
                              <div className="mb-4">
                                <h3 className={`text-lg font-semibold mb-2 ${
                                  formData.coverageType === option.id ? 'text-primary' : 'text-secondary'
                                }`}>
                                  {option.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{option.description}</p>
                              </div>

                              <div className="space-y-3 mt-auto">
                                {[
                                  { id: 'soinsCourants' as CoverageId, label: 'Soins courants' },
                                  { id: 'hospitalisation' as CoverageId, label: 'Hospitalisation' },
                                  { id: 'optique' as CoverageId, label: 'Optique' },
                                  { id: 'dentaire' as CoverageId, label: 'Dentaire' },
                                  { id: 'auditif' as CoverageId, label: 'Auditif' }
                                ].map((coverage) => (
                                  <div key={coverage.id} className="flex items-center">
                                    <span className="text-gray-600 flex-1">{coverage.label}</span>
                                    <div className="flex space-x-1">
                                      {[...Array(4)].map((_, i) => (
                                        <div
                                          key={i}
                                          className={`w-6 h-2 rounded ${
                                            i < option.levels[coverage.id]
                                              ? 'bg-primary'
                                              : 'bg-gray-200'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Info Box */}
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-gray-600">
                      Nous chercherons des offres se rapprochant le plus possible du niveau de couverture que vous indiquez. 
                      Vous pourrez à tout moment ajuster vos besoins sur la page de résultats.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <div className="card">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-semibold">
                      <span className="text-primary">Vous y êtes presque</span>, dernière étape avant vos résultats !
                    </h2>
                    <img 
                      src="/illustration.png" 
                      alt="Person with shield" 
                      className="w-32 h-32"
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="form-group">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Prénom"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Nom"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>

                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Email"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>

                    <div className="form-group">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Téléphone (10 chiffres)"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 mt-8">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label className="text-sm text-gray-600">
                        J'accepte les <a href="#" className="text-primary underline">conditions générales d'utilisation</a> et d'être rappelé par nos partenaires assureurs si je demande à être mis en relation.
                      </label>
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">Pourquoi ces infos ?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-600">
                        Recevez les meilleurs tarifs de votre comparaison par mail.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-600">
                        Retrouvez vos devis dans votre espace personnel.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-600">
                        Si vous le souhaitez, échangez avec un conseiller par téléphone
                        <br />afin de trouver l'offre adaptée à vos besoins.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-primary text-white text-lg font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Accédez à vos devis
                </button>
              </div>
            )}

            {/* Navigation Buttons */}
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
                className="btn-primary ml-auto"
              >
                {step === 5 ? 'Voir les offres' : 'Suivant'}
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        {step === 1 && (
          <div className="mt-12 space-y-8">
            <h2 className="text-2xl font-semibold text-secondary">Foire aux questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Un devis mutuelle santé est-il sans engagement ?</h3>
                <p className="text-gray-600">
                  Comparer des mutuelles santé en ligne est 100 % gratuit et sans aucun engagement. Vous n'avez aucune obligation de souscrire aux contrats que l'on vous propose.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Quelle mutuelle santé est la moins chère ?</h3>
                <p className="text-gray-600">
                  Parmi les trois mutuelles les moins chères, on peut citer MGC (à partir de 12 € par an), Mutuelle Bleue (à partir de 91 € par an) et Ociane (à partir de 103 € par an). Le prix varie selon l'âge, le lieu d'habitation et les garanties souscrites.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Quelles sont les mutuelles qui remboursent le mieux ?</h3>
                <p className="text-gray-600">
                  Les mutuelles qui remboursent le mieux sont celles qui affichent un niveau de remboursement élevé. Pour être bien indemnisé, il est conseillé de se diriger vers une mutuelle avec des taux de remboursement supérieurs à 100 %.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
} 