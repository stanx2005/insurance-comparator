import Image from 'next/image';
import { partners } from '@/config/partners';

export default function Partners() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Nos Partenaires</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center"
            >
              <Image
                src={partner.logo}
                alt={`Logo ${partner.name}`}
                width={150}
                height={80}
                className="object-contain h-20"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 