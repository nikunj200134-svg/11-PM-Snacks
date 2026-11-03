import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/our-story',
        permanent: true,
      },
      {
        source: '/why-11pm',
        destination: '/our-story',
        permanent: true,
      },
      {
        source: '/our-process',
        destination: '/our-story',
        permanent: true,
      },
      {
        source: '/ingredients-nutrition',
        destination: '/nutrition',
        permanent: true,
      },
      {
        source: '/healthy-snacking',
        destination: '/nutrition',
        permanent: true,
      },
      {
        source: '/flavours/cheese',
        destination: '/flavours/cheddar-cheese',
        permanent: true,
      },
      {
        source: '/shop',
        destination: '/where-to-buy',
        permanent: true,
      },
      {
        source: '/buy',
        destination: '/where-to-buy',
        permanent: true,
      },
      {
        source: '/order',
        destination: '/where-to-buy',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
