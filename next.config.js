/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '54321',
      }
    ]
  }
}
