import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Optisanté - Comparateur d\'Assurance Santé en France',
  description: 'Comparez les meilleures assurances santé en France. Trouvez la mutuelle adaptée à vos besoins et votre budget. Devis gratuit et personnalisé.',
  keywords: 'assurance santé, mutuelle santé, comparateur mutuelle, devis mutuelle, assurance maladie, complémentaire santé, France',
  openGraph: {
    title: 'Optisanté - Comparateur d\'Assurance Santé en France',
    description: 'Comparez les meilleures assurances santé en France. Trouvez la mutuelle adaptée à vos besoins et votre budget.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Optisanté',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Optisanté - Comparateur d\'Assurance Santé en France',
    description: 'Comparez les meilleures assurances santé en France. Trouvez la mutuelle adaptée à vos besoins et votre budget.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://optisante.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
} 