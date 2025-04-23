import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Optisanté"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-xl font-bold text-primary">Optisanté</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="nav-link">
              Accueil
            </Link>
            <Link href="/blog" className="nav-link">
              Blog
            </Link>
            <Link href="#features" className="nav-link">
              Fonctionnalités
            </Link>
            <Link href="#partners" className="nav-link">
              Partenaires
            </Link>
            <Link href="#contact" className="nav-link">
              Contact
            </Link>
            <Link href="/calculator" className="btn-primary">
              Comparer maintenant
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
} 