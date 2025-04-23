/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost', 'www.lefigaro.fr', 'static.lefigaro.fr'],
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig; 