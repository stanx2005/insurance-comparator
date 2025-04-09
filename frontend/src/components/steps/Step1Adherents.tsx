interface Step1Props {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function Step1Adherents({ formData, handleInputChange }: Step1Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type de contrat
        </label>
        <select
          name="insuranceType"
          value={formData.insuranceType}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sélectionnez votre situation</option>
          <option value="single">Un adulte</option>
          <option value="single_children">Un adulte + enfant(s)</option>
          <option value="couple">Un couple</option>
          <option value="couple_children">Un couple + enfant(s)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Genre
        </label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sélectionnez votre genre</option>
          <option value="M">Homme</option>
          <option value="F">Femme</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date de naissance
        </label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profession
        </label>
        <input
          type="text"
          name="profession"
          value={formData.profession}
          onChange={handleInputChange}
          placeholder="Votre profession"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {(formData.insuranceType === 'couple' || formData.insuranceType === 'couple_children') && (
        <>
          <div className="pt-6 border-t">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Information du conjoint</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Genre du conjoint
                </label>
                <select
                  name="secondPersonGender"
                  value={formData.secondPersonGender}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionnez le genre</option>
                  <option value="M">Homme</option>
                  <option value="F">Femme</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom du conjoint
                </label>
                <input
                  type="text"
                  name="secondPersonFirstName"
                  value={formData.secondPersonFirstName}
                  onChange={handleInputChange}
                  placeholder="Prénom du conjoint"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du conjoint
                </label>
                <input
                  type="text"
                  name="secondPersonLastName"
                  value={formData.secondPersonLastName}
                  onChange={handleInputChange}
                  placeholder="Nom du conjoint"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de naissance du conjoint
                </label>
                <input
                  type="date"
                  name="secondPersonBirthDate"
                  value={formData.secondPersonBirthDate}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profession du conjoint
                </label>
                <input
                  type="text"
                  name="secondPersonProfession"
                  value={formData.secondPersonProfession}
                  onChange={handleInputChange}
                  placeholder="Profession du conjoint"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
} 