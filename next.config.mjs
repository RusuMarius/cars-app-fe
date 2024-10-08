/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http', // Specify the protocol if it's not HTTPS
        hostname: '127.0.0.1',
      },
      {
        protocol: 'http', // Specify the protocol if it's not HTTPS
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'cars-app-production.up.railway.app',
      },
      {
        protocol: 'https',
        hostname: 'cars-app-cfm9.onrender.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com', // Add this line for GitHub raw images
      },
    ],
  },
};

export default nextConfig;
