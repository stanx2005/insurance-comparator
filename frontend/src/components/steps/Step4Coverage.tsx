interface Step4Props {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const CoverageBars = ({ levels }: { levels: number[] }) => (
  <div className="flex gap-6 justify-between mt-4">
    {['Soins médicaux', 'Hospitalisation', 'Optique', 'Dentaire', 'Auditif'].map((label, index) => (
      <div key={index} className="flex flex-col items-center gap-2">
        <div className="w-3 h-20 bg-gray-100 rounded-full relative overflow-hidden">
          <div
            className="absolute bottom-0 w-full bg-blue-500 transition-all duration-300"
            style={{ height: `${levels[index] * 20}%` }}
          />
        </div>
        <span className="text-xs text-gray-600 text-center whitespace-nowrap">{label}</span>
      </div>
    ))}
  </div>
);

export default function Step4Coverage({ formData, handleInputChange }: Step4Props) {
  const handleLevelChange = (type: string, value: string) => {
    const numericValue = value === 'minimum' ? 1 : value === 'medium' ? 3 : 5;
    const updatedLevels = { ...formData.coverageLevels };
    
    switch(type) {
      case 'soinsMedicaux':
        updatedLevels.soinsCourants = numericValue;
        break;
      case 'hospitalisation':
        updatedLevels.hospitalisation = numericValue;
        break;
      case 'optique':
        updatedLevels.optique = numericValue;
        break;
      case 'dentaire':
        updatedLevels.dentaire = numericValue;
        break;
      case 'auditif':
        updatedLevels.auditif = numericValue;
        break;
    }

    handleInputChange({
      target: {
        name: 'coverageLevels',
        value: updatedLevels
      }
    } as any);
  };

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

        {formData.coverageType && formData.coverageType !== 'personalized' && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Niveau de couverture {formData.coverageType}</h3>
            <CoverageBars 
              levels={
                formData.coverageType === 'minimal' ? [1, 1, 1, 1, 1] :
                formData.coverageType === 'balanced' ? [3, 3, 3, 3, 3] :
                [5, 5, 5, 5, 5]
              }
            />
          </div>
        )}
      </div>

      {formData.coverageType === 'personalized' && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Personnalisez votre couverture</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Soins médicaux
              </label>
              <select
                name="personalizedCoverage.soinsMedicaux"
                value={formData.personalizedCoverage.soinsMedicaux}
                onChange={(e) => {
                  handleInputChange(e);
                  handleLevelChange('soinsMedicaux', e.target.value);
                }}
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
                onChange={(e) => {
                  handleInputChange(e);
                  handleLevelChange('hospitalisation', e.target.value);
                }}
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
                onChange={(e) => {
                  handleInputChange(e);
                  handleLevelChange('optique', e.target.value);
                }}
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
                onChange={(e) => {
                  handleInputChange(e);
                  handleLevelChange('dentaire', e.target.value);
                }}
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
                onChange={(e) => {
                  handleInputChange(e);
                  handleLevelChange('auditif', e.target.value);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="minimum">Minimum</option>
                <option value="medium">Moyen</option>
                <option value="maximum">Maximum</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Aperçu de votre couverture</h3>
            <CoverageBars levels={[
              formData.coverageLevels.soinsCourants,
              formData.coverageLevels.hospitalisation,
              formData.coverageLevels.optique,
              formData.coverageLevels.dentaire,
              formData.coverageLevels.auditif
            ]} />
          </div>
        </div>
      )}
    </div>
  );
} 