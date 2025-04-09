import './globals.css'

export const metadata = {
  title: 'Insurance Comparator',
  description: 'Compare insurance offers in France'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 