interface Step4Props {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function Step4Coverage({ formData, handleInputChange }: Step4Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type de couverture souhaitée
        </label>
        <select
          name="coverageType"
          value={formData.coverageType}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sélectionnez le niveau de couverture</option>
          <option value="minimal">Minimale</option>
          <option value="balanced">Équilibrée</option>
          <option value="maximal">Maximale</option>
          <option value="personalized">Personnalisée</option>
        </select>
      </div>

      {formData.coverageType === 'personalized' && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Personnalisez votre couverture</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Soins médicaux
            </label>
            <select
              name="personalizedCoverage.soinsMedicaux"
              value={formData.personalizedCoverage.soinsMedicaux}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="minimum">Minimum</option>
              <option value="medium">Moyen</option>
              <option value="maximum">Maximum</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hospitalisation
            </label>
            <select
              name="personalizedCoverage.hospitalisation"
              value={formData.personalizedCoverage.hospitalisation}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="minimum">Minimum</option>
              <option value="medium">Moyen</option>
              <option value="maximum">Maximum</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Optique
            </label>
            <select
              name="personalizedCoverage.optique"
              value={formData.personalizedCoverage.optique}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="minimum">Minimum</option>
              <option value="medium">Moyen</option>
              <option value="maximum">Maximum</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dentaire
            </label>
            <select
              name="personalizedCoverage.dentaire"
              value={formData.personalizedCoverage.dentaire}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="minimum">Minimum</option>
              <option value="medium">Moyen</option>
              <option value="maximum">Maximum</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Auditif
            </label>
            <select
              name="personalizedCoverage.auditif"
              value={formData.personalizedCoverage.auditif}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="minimum">Minimum</option>
              <option value="medium">Moyen</option>
              <option value="maximum">Maximum</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
} 