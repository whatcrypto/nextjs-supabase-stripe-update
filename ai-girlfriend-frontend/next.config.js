/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'api.dicebear.com'], // Add your image domains here
  },
  // Proxy API requests to Python backend
  async rewrites() {
    return [
      {
        source: '/api/chat/:path*',
        destination: 'http://localhost:8000/api/chat/:path*', // Python backend URL
      },
      {
        source: '/api/characters/:path*',
        destination: 'http://localhost:8000/api/characters/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
