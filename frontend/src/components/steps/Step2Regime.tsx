interface Step2Props {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function Step2Regime({ formData, handleInputChange }: Step2Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Régime de sécurité sociale
        </label>
        <select
          name="regime"
          value={formData.regime}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sélectionnez votre régime</option>
          <option value="general">Régime général</option>
          <option value="tns">Travailleur non salarié (TNS)</option>
          <option value="agricole">Régime agricole</option>
          <option value="alsace-moselle">Régime Alsace-Moselle</option>
        </select>
      </div>

      {(formData.insuranceType === 'couple' || formData.insuranceType === 'couple_children') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Régime de sécurité sociale du conjoint
          </label>
          <select
            name="secondPersonRegime"
            value={formData.secondPersonRegime}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionnez le régime</option>
            <option value="general">Régime général</option>
            <option value="tns">Travailleur non salarié (TNS)</option>
            <option value="agricole">Régime agricole</option>
            <option value="alsace-moselle">Régime Alsace-Moselle</option>
          </select>
        </div>
      )}
    </div>
  )
} 