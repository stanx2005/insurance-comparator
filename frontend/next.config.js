/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.lefigaro.fr',
      },
      {
        protocol: 'https',
        hostname: 'static.lefigaro.fr',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
      }
    ],
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig; 