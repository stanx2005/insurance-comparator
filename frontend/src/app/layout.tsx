import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Optisanté - Comparateur d\'Assurance Santé en France',
  description: 'Comparez les meilleures assurances santé en France. Trouvez la mutuelle adaptée à vos besoins et votre budget. Devis gratuit et personnalisé.',
  keywords: 'assurance santé, mutuelle santé, comparateur mutuelle, devis mutuelle, assurance maladie, complémentaire santé, France',
  authors: [{ name: 'Optisanté' }],
  creator: 'Optisanté',
  publisher: 'Optisanté',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://optisante.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Optisanté - Comparateur d\'Assurance Santé en France',
    description: 'Comparez les meilleures assurances santé en France. Trouvez la mutuelle adaptée à vos besoins et votre budget.',
    url: 'https://optisante.org',
    siteName: 'Optisanté',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Optisanté - Comparateur d\'Assurance Santé',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Optisanté - Comparateur d\'Assurance Santé en France',
    description: 'Comparez les meilleures assurances santé en France. Trouvez la mutuelle adaptée à vos besoins et votre budget.',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with your actual verification code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 