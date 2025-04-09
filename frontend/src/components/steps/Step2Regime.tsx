interface Step2Props {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function Step2Regime({ formData, handleInputChange }: Step2Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Régime de sécurité sociale
          </label>
          <button
            type="button"
            className="ml-2 bg-gray-100 rounded-full p-1 hover:bg-gray-200"
            title="Plus d'informations sur les régimes"
            onClick={() => {
              const infoDiv = document.getElementById('regime-info');
              if (infoDiv) {
                infoDiv.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
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

      <div id="regime-info" className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations sur les régimes de sécurité sociale</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-800">Régime général</h4>
            <p className="text-gray-600">Le régime général de la Sécurité sociale couvre la majorité des salariés du secteur privé et leurs familles.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Travailleur non salarié (TNS)</h4>
            <p className="text-gray-600">Ce régime concerne les travailleurs indépendants, artisans, commerçants et professions libérales.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Régime agricole</h4>
            <p className="text-gray-600">Géré par la MSA, ce régime couvre les exploitants et salariés agricoles ainsi que leurs familles.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Régime Alsace-Moselle</h4>
            <p className="text-gray-600">Un régime spécifique aux départements du Bas-Rhin, du Haut-Rhin et de la Moselle offrant une meilleure couverture.</p>
          </div>
        </div>
      </div>
    </div>
  )
} 