import Image from 'next/image'
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  date: string
  author: string
  image: string
  category: string
  readingTime: string
}

const blogPosts: Record<string, BlogPost> = {
  'augmentation-tarifs-mutuelles-2025': {
    id: '1',
    title: 'Augmentation des tarifs des mutuelles en 2025 : quels impacts pour les Français ?',
    slug: 'augmentation-tarifs-mutuelles-2025',
    content: `
      <h2>Introduction</h2>
      <p>L'année 2025 marquera une nouvelle hausse des tarifs des mutuelles santé, avec une augmentation moyenne de 6%. Cette tendance, qui s'inscrit dans une dynamique de croissance continue depuis plusieurs années, soulève des préoccupations importantes parmi les assurés.</p>

      <h2>Les raisons derrière l'augmentation des tarifs</h2>
      <h3>La hausse structurelle des dépenses de santé</h3>
      <p>Les complémentaires santé justifient souvent ces augmentations par l'accroissement continu des dépenses de santé. Ces dernières comprennent non seulement les soins médicaux de base mais également les technologies de pointe et les traitements innovants qui font grimper les coûts.</p>

      <h3>Le désengagement progressif de l'État</h3>
      <p>Un autre facteur majeur est le désengagement croissant de l'État dans la prise en charge des dépenses de santé. Lorsque l'Assurance maladie réduit sa couverture ou transfère certaines charges vers les assurances complémentaires, cela entraîne logiquement une augmentation des cotisations pour les assurés.</p>

      <h2>Conséquences pour les assurés</h2>
      <h3>Impact sur les foyers modestes</h3>
      <p>La hausse des tarifs des mutuelles touche particulièrement les foyers modestes et les personnes âgées déjà fragilisées par des ressources limitées. Certains ont dû renoncer à souscrire ou à renouveler leurs complémentaires santé.</p>

      <h2>Solutions pour atténuer l'impact financier</h2>
      <h3>Faire jouer la concurrence</h3>
      <p>Pour minimiser l'impact de cette hausse sur votre budget, il est essentiel de comparer les différentes offres de mutuelles disponibles sur le marché. Utilisez notre comparateur de mutuelles pour trouver les meilleurs tarifs.</p>

      <h3>Adapter votre niveau de couverture</h3>
      <p>Il peut être judicieux de revoir vos besoins réels en matière de santé et d'ajuster en conséquence le niveau de couverture choisi. Une complémentaire santé peut offrir divers degrés de protection – du basique au très complet.</p>

      <h2>Conclusion</h2>
      <p>Comprendre les facteurs responsables de l'augmentation des tarifs des mutuelles et mettre en place des solutions concrètes pour y faire face est essentiel pour préserver son budget tout en garantissant une couverture santé adéquate.</p>
    `,
    date: '2024-03-23',
    author: 'Optisanté',
    image: '/images/blog/augmentation-tarifs.jpg',
    category: 'Actualités',
    readingTime: '5 min'
  },
  'cartes-vitale-compromisees': {
    id: '2',
    title: '20 millions de cartes Vitale compromises : ce qu\'il faut savoir',
    slug: 'cartes-vitale-compromisees',
    content: `
      <h2>Introduction</h2>
      <p>Suite à l'attaque contre l'organisme de tiers-payant Viamedis, 20 millions de cartes Vitale ont été compromises. Cette situation soulève des questions importantes sur la sécurité des données de santé.</p>

      <h2>L'ampleur de l'attaque</h2>
      <p>L'attaque a touché un des principaux organismes de tiers-payant en France, compromettant les données de millions d'assurés. Les informations exposées incluent :</p>
      <ul>
        <li>Numéros de sécurité sociale</li>
        <li>Informations personnelles</li>
        <li>Données de remboursement</li>
      </ul>

      <h2>Comment se protéger ?</h2>
      <p>Face à cette situation, plusieurs mesures peuvent être prises :</p>
      <ul>
        <li>Vérifier régulièrement vos remboursements</li>
        <li>Signaler toute activité suspecte</li>
        <li>Mettre à jour vos mots de passe</li>
        <li>Activer l'authentification à deux facteurs</li>
      </ul>

      <h2>Les actions des autorités</h2>
      <p>Les autorités compétentes ont été alertées et des mesures sont en cours pour :</p>
      <ul>
        <li>Renforcer la sécurité des systèmes</li>
        <li>Identifier les responsables</li>
        <li>Prévenir de futures attaques</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Cette attaque souligne l'importance de la sécurité des données de santé et la nécessité de renforcer les mesures de protection. Restez vigilant et suivez les recommandations des autorités.</p>
    `,
    date: '2024-03-22',
    author: 'Optisanté',
    image: '/images/blog/carte-vitale.jpg',
    category: 'Sécurité',
    readingTime: '4 min'
  },
  // Add more blog posts here
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
          <p className="text-xl text-gray-600 mb-8">L'article que vous recherchez n'existe pas.</p>
          <Link href="/blog" className="text-primary hover:text-primary-dark font-medium">
            Retour au blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-96">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-medium text-primary">{post.category}</span>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">{post.date}</span>
                <span className="text-sm text-gray-500">{post.readingTime} de lecture</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">Par {post.author}</span>
                </div>
                <Link href="/blog" className="text-primary hover:text-primary-dark font-medium">
                  Retour au blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
} 