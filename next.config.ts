// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Increase the body size limit to 10MB
    },
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;