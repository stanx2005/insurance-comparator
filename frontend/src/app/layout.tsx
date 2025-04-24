import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Providers } from './providers'

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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YW0DNYV163"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YW0DNYV163');
          `}
        </Script>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "InsuranceAgency",
              "name": "Optisanté",
              "url": "https://optisante.org",
              "logo": "https://optisante.org/logo.png",
              "description": "Comparez les meilleures assurances santé en France. Trouvez la mutuelle adaptée à vos besoins et votre budget.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "FR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+33123456789",
                "contactType": "customer service",
                "email": "contact@optisante.org",
                "availableLanguage": "French"
              },
              "sameAs": [
                "https://www.facebook.com/optisante",
                "https://twitter.com/optisante",
                "https://www.linkedin.com/company/optisante"
              ],
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "EUR",
                "lowPrice": "48.04",
                "highPrice": "135.21",
                "offerCount": "4",
                "offers": [
                  {
                    "@type": "Offer",
                    "name": "Garanties renforcées",
                    "price": "135.21",
                    "priceCurrency": "EUR",
                    "description": "Protection complète avec remboursements optimaux"
                  },
                  {
                    "@type": "Offer",
                    "name": "Garanties hybrides",
                    "price": "86.80",
                    "priceCurrency": "EUR",
                    "description": "Équilibre entre couverture et budget"
                  },
                  {
                    "@type": "Offer",
                    "name": "Garanties intermédiaires",
                    "price": "67.53",
                    "priceCurrency": "EUR",
                    "description": "Couverture standard adaptée"
                  },
                  {
                    "@type": "Offer",
                    "name": "Garanties économiques",
                    "price": "48.04",
                    "priceCurrency": "EUR",
                    "description": "Protection de base abordable"
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
} 