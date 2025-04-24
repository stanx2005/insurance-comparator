import { FaTwitter, FaFacebook, FaLinkedin, FaLink } from 'react-icons/fa'

interface SocialShareProps {
  url: string
  title: string
}

export default function SocialShare({ url, title }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      alert('Lien copié dans le presse-papiers !')
    } catch (err) {
      console.error('Erreur lors de la copie du lien:', err)
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-400 transition-colors"
        aria-label="Partager sur Twitter"
      >
        <FaTwitter className="w-5 h-5" />
      </a>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-600 transition-colors"
        aria-label="Partager sur Facebook"
      >
        <FaFacebook className="w-5 h-5" />
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-700 transition-colors"
        aria-label="Partager sur LinkedIn"
      >
        <FaLinkedin className="w-5 h-5" />
      </a>
      <button
        onClick={copyToClipboard}
        className="text-gray-600 hover:text-gray-900 transition-colors"
        aria-label="Copier le lien"
      >
        <FaLink className="w-5 h-5" />
      </button>
    </div>
  )
} 