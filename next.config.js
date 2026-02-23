/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export for production builds
  // Dev mode uses dynamic server rendering for better DX
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  images: { unoptimized: true },
  transpilePackages: ['@heroui/react', '@heroui/theme'],

  // Cache-Control headers (effective in non-export / dev mode;
  // production static export relies on public/_headers for Cloudflare Pages)
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800'
          }
        ]
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
