/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Or 'https' if your Firebase Storage uses HTTPS
        hostname: 'firebasestorage.googleapis.com',
        pathname: '**', // This wildcard allows any path under the hostname
      },
    ],
  },
}

module.exports = nextConfig