import Image from 'next/image';
import { motion } from 'framer-motion';
import { partners } from '@/config/partners';

export default function Partners() {
  return (
    <section className="py-12 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Nos Partenaires</h2>
        <div className="relative">
          <motion.div 
            className="flex space-x-8 py-4"
            animate={{
              x: [0, -1920, 0],
            }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <motion.div
                key={`${partner.id}-${index}`}
                className="flex-shrink-0 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center"
                style={{ width: '200px', height: '120px' }}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={partner.logo}
                  alt={`Logo ${partner.name}`}
                  width={150}
                  height={80}
                  className="object-contain h-20"
                />
              </motion.div>
            ))}
          </motion.div>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />
        </div>
      </div>
    </section>
  );
} 