import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Rewrite root paths to English locale paths
      {
        source: '/gallery',
        destination: '/en/gallery',
      },
      {
        source: '/gallery/:path*',
        destination: '/en/gallery/:path*',
      },
      {
        source: '/popular',
        destination: '/en/popular',
      },
      {
        source: '/recent',
        destination: '/en/recent',
      },
      {
        source: '/random',
        destination: '/en/random',
      },
      {
        source: '/signup',
        destination: '/en/signup',
      },
      {
        source: '/login',
        destination: '/en/login',
      },
      {
        source: '/profile',
        destination: '/en/profile',
      },
      {
        source: '/favorites',
        destination: '/en/favorites',
      },
      {
        source: '/collections',
        destination: '/en/collections',
      },
      {
        source: '/search',
        destination: '/en/search',
      },
      {
        source: '/about',
        destination: '/en/about',
      },
    ];
  },
};

export default nextConfig;
