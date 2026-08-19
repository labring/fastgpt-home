/** @type {import('next').NextConfig} */
const nextConfig = {
  // Customers pages depend on MongoDB, uploads and Route Handlers. The merged
  // application therefore ships as a single standalone Next.js runtime.
  output: 'standalone',
  allowedDevOrigins: ['192.168.12.18', '127.0.0.1'],
  images: { unoptimized: true },
  transpilePackages: ['@heroui/react', '@heroui/theme'],

  // Enable compression
  compress: true,

  // Remove X-Powered-By header
  poweredByHeader: false,

  // Cache-Control headers only in production builds;
  // dev mode must serve fresh assets so HMR/edits take effect immediately.
  // Production static export relies on public/_headers for Cloudflare Pages.
  ...(process.env.NODE_ENV !== 'development' && {
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
          source: '/customers/api/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store'
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
  })
};

module.exports = nextConfig;
