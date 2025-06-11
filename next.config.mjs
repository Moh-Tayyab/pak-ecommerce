/** @type {import('next').NextConfig} */
const nextConfig = {
   compiler: {
    // Modern alternatives
    removeConsole: process.env.NODE_ENV === 'production',
    // or other compiler options
  },
  reactStrictMode: true,
  swcMinify: true,
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com', 'placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
