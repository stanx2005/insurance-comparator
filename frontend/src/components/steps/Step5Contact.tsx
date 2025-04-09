interface Step5Props {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function Step5Contact({ formData, handleInputChange }: Step5Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Prénom
        </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="Votre prénom"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nom
        </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Votre nom"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="votre.email@exemple.com"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Téléphone
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="06 12 34 56 78"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3">
          <label htmlFor="acceptTerms" className="text-sm text-gray-600">
            J'accepte les conditions générales d'utilisation et la politique de confidentialité
          </label>
        </div>
      </div>
    </div>
  )
} 