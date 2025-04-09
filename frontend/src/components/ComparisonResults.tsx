import Image from 'next/image';
import { partners } from '@/config/partners';

interface ComparisonResultsProps {
  results: Array<{
    insurerId: string;
    price: number;
    coverage: {
      dental: number;
      optical: number;
      hospitalization: number;
    };
  }>;
}

export default function ComparisonResults({ results }: ComparisonResultsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Résultats de la comparaison</h2>
      <div className="grid gap-6">
        {results.map((result, index) => {
          const partner = partners.find(p => p.id === result.insurerId) || {
            name: 'Assureur',
            logo: '/placeholder-logo.png'
          };
          
          return (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-32 h-16 relative">
                  <Image
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">À partir de</p>
                  <p className="text-2xl font-bold text-primary">{result.price.toFixed(2)}€ /mois</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Dentaire</p>
                  <p className="font-semibold">{result.coverage.dental}%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Optique</p>
                  <p className="font-semibold">{result.coverage.optical}%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Hospitalisation</p>
                  <p className="font-semibold">{result.coverage.hospitalization}%</p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition-colors">
                  Voir l&apos;offre
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 