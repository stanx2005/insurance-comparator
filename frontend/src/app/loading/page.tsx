'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoadingPage() {
  const [progress, setProgress] = useState(30)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          // Redirect to results page when progress reaches 100%
          router.push('/results')
          return 100
        }
        return prev + 10
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <h1 className="text-3xl font-bold">
          <span className="text-gray-800">Seulement quelques secondes pour obtenir</span>
          <br />
          <span className="text-gray-800">gratuitement les meilleurs prix du marché !</span>
        </h1>

        <p className="text-gray-600 text-lg">
          Vos données personnelles garanties 100% sécurisées.
        </p>

        {/* Progress Circle */}
        <div className="flex justify-center my-12">
          <div className="relative">
            {/* Background circle */}
            <div className="w-48 h-48 rounded-full border-8 border-gray-200"></div>
            
            {/* Progress circle */}
            <div 
              className="absolute inset-0 rounded-full border-8 border-primary"
              style={{
                clipPath: `polygon(50% 50%, -50% -50%, ${progress}% -50%, ${progress}% ${progress}%, -50% ${progress}%)`
              }}
            ></div>

            {/* Progress number */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-primary">{progress}</span>
            </div>
          </div>
        </div>

        {/* Loading messages */}
        <div className="space-y-4 text-gray-600">
          <p>Recherche des meilleures offres en cours...</p>
          <p>Analyse de vos besoins...</p>
          <p>Comparaison des garanties...</p>
        </div>
      </div>
    </main>
  )
} 