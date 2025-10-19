/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['react-markdown'],
  },
}

module.exports = nextConfig