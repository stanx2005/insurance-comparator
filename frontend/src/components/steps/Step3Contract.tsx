interface Step3Props {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function Step3Contract({ formData, handleInputChange }: Step3Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Code postal
        </label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleInputChange}
          placeholder="Code postal"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ville
        </label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="Ville"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Êtes-vous actuellement assuré ?
        </label>
        <select
          name="isCurrentlyInsured"
          value={formData.isCurrentlyInsured}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sélectionnez une option</option>
          <option value="yes">Oui</option>
          <option value="no">Non</option>
        </select>
      </div>

      {formData.isCurrentlyInsured === 'yes' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mois de fin de contrat
            </label>
            <input
              type="month"
              name="contractEndMonth"
              value={formData.contractEndMonth}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assureur actuel
            </label>
            <input
              type="text"
              name="currentProvider"
              value={formData.currentProvider}
              onChange={handleInputChange}
              placeholder="Nom de votre assureur actuel"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date de début souhaitée
        </label>
        <input
          type="date"
          name="desiredStartDate"
          value={formData.desiredStartDate}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  )
} 