'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface InsuranceOffer {
  id: number
  company: string
  logo: string
  price: number
  coverageLevels: number[]
  rating: number
  isRecommended?: boolean
  label?: string
}

const mockOffers: InsuranceOffer[] = [
  {
    id: 1,
    company: 'MGEN',
    logo: '/logos/mgen.png',
    price: 30.00,
    coverageLevels: [4, 4, 4, 3, 4],
    rating: 4.8,
    isRecommended: true,
    label: 'Meilleur rapport qualité/prix'
  },
  {
    id: 2,
    company: 'Harmonie Mutuelle',
    logo: '/logos/harmonie.png',
    price: 152.40,
    coverageLevels: [4, 4, 3, 4, 3],
    rating: 4.6
  },
  {
    id: 3,
    company: 'Malakoff Humanis',
    logo: '/logos/malakoff.png',
    price: 153.90,
    coverageLevels: [4, 3, 4, 3, 4],
    rating: 4.7,
    label: '2 mois offerts'
  },
  {
    id: 4,
    company: 'AG2R La Mondiale',
    logo: '/logos/ag2r.png',
    price: 155.62,
    coverageLevels: [3, 4, 3, 4, 4],
    rating: 4.5
  },
  {
    id: 5,
    company: 'Axa',
    logo: '/logos/axa.png',
    price: 163.42,
    coverageLevels: [4, 4, 4, 4, 4],
    rating: 4.8,
    label: 'Label d\'excellence'
  },
  {
    id: 6,
    company: 'Swiss Life',
    logo: '/logos/swiss-life.png',
    price: 206.00,
    coverageLevels: [5, 4, 4, 3, 4],
    rating: 4.6,
    label: 'Label d\'excellence'
  },
  {
    id: 7,
    company: 'Allianz',
    logo: '/logos/allianz.png',
    price: 244.97,
    coverageLevels: [5, 4, 4, 4, 4],
    rating: 4.7
  },
  {
    id: 8,
    company: 'MAAF',
    logo: '/logos/maaf.png',
    price: 274.44,
    coverageLevels: [4, 4, 4, 4, 5],
    rating: 4.5,
    label: '1 mois offert'
  },
  {
    id: 9,
    company: 'GMF',
    logo: '/logos/gmf.png',
    price: 329.61,
    coverageLevels: [5, 5, 4, 4, 4],
    rating: 4.6
  },
  {
    id: 10,
    company: 'MACIF',
    logo: '/logos/macif.png',
    price: 189.90,
    coverageLevels: [4, 3, 4, 4, 3],
    rating: 4.4
  },
  {
    id: 11,
    company: 'Generali',
    logo: '/logos/generali.png',
    price: 195.50,
    coverageLevels: [4, 4, 3, 4, 4],
    rating: 4.5,
    label: 'Label d\'excellence'
  },
  {
    id: 12,
    company: 'April',
    logo: '/logos/april.png',
    price: 178.30,
    coverageLevels: [3, 4, 4, 4, 3],
    rating: 4.3,
    label: '2 mois offerts'
  }
].sort((a, b) => a.price - b.price) // Sort by price ascending

export default function ResultsPage() {
  const [offers, setOffers] = useState<InsuranceOffer[]>([])

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setOffers(mockOffers)
    }, 1000)
  }, [])

  const CoverageBars = ({ levels }: { levels: number[] }) => (
    <div className="flex gap-2">
      {levels.map((level, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-3 h-20 bg-gray-100 rounded-full relative overflow-hidden">
            <div
              className="absolute bottom-0 w-full bg-blue-500 transition-all duration-300"
              style={{ height: `${level * 20}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Image src="/lelynx-logo.png" alt="LeLynx.fr" width={120} height={40} />
          <button className="text-sm text-gray-600 hover:text-gray-800">
            Modifier mes besoins
          </button>
        </div>

        {/* Results Header */}
        <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
          <h1 className="text-xl font-semibold mb-2">
            {offers.length} offres trouvées pour vous ! Plus qu'un clic pour être assuré.e
          </h1>
          <p className="text-gray-600 text-sm">
            Voir détaillé, vos résultats triés par prix croissants. • Sans frais supplémentaires. • 5 minutes et paramètres calculés, référencement payant.
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex items-center gap-4">
          <span role="img" aria-label="info" className="text-blue-500">ℹ️</span>
          <p className="text-sm text-gray-700 flex-grow">
            Faites le bon choix avec la note de correspondance 🎯 et les diagrammes de remboursement 📊
          </p>
          <button className="text-blue-600 text-sm whitespace-nowrap hover:text-blue-700">
            En savoir plus
          </button>
        </div>

        {/* Offers List */}
        <div className="space-y-3">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-8">
                {/* Company Logo */}
                <div className="w-20 h-20 relative flex-shrink-0">
                  <Image
                    src={offer.logo}
                    alt={offer.company}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>

                {/* Coverage Levels */}
                <div className="flex-grow">
                  <CoverageBars levels={offer.coverageLevels} />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                  <span className="text-yellow-400">⭐</span>
                  <span className="font-semibold text-sm">{offer.rating}</span>
                </div>

                {/* Price and Action */}
                <div className="text-right flex-shrink-0 min-w-[200px]">
                  <div className="text-2xl font-bold text-blue-600">
                    {offer.price.toFixed(2)}€
                    <span className="text-sm font-normal text-gray-600 ml-1">/mois</span>
                  </div>
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg mt-2 text-sm hover:bg-blue-700 transition-colors">
                    Continuer sur le site de l'assureur
                  </button>
                </div>
              </div>

              {/* Additional Features */}
              <div className="mt-4 flex items-center gap-6 text-sm">
                <button className="text-gray-600 hover:text-gray-800 flex items-center gap-2">
                  <span className="text-lg">👤</span>
                  Étudier le devis en détails
                </button>
                <button className="text-gray-600 hover:text-gray-800 flex items-center gap-2">
                  <span className="text-lg">📝</span>
                  Personnaliser la souscription
                </button>
                {offer.label && (
                  <span className="text-orange-600 flex items-center gap-2">
                    <span className="text-lg">🏷️</span>
                    {offer.label}
                  </span>
                )}
                {offer.isRecommended && (
                  <span className="text-green-600 flex items-center gap-2">
                    <span className="text-lg">✨</span>
                    Recommandé
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
} 