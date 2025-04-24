import AdminProviders from './providers'

export const dynamic = 'force-dynamic'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminProviders>
      <div className="min-h-screen bg-gray-100">
        {children}
      </div>
    </AdminProviders>
  )
} 