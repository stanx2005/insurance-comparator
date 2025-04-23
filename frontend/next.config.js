/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig; 