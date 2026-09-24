const { withContentCollections } = require("@content-collections/next");

/** @type {import('next').NextConfig} */
const isExport = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Only use static export for production builds
  // Dev mode uses dynamic server rendering for better DX
  ...(isExport && { output: 'export' }),
  allowedDevOrigins: ['192.168.12.18', '127.0.0.1'],
  images: { unoptimized: true },
  transpilePackages: ['@heroui/react', '@heroui/theme'],

  // Avoid child-process static-path workers in development environments with invalid stdio handles.
  ...(!isExport && { experimental: { workerThreads: true } }),
  
  // Enable compression
  compress: true,
  
  // Remove X-Powered-By header
  poweredByHeader: false,

  // Cache-Control headers only in production builds;
  // dev mode must serve fresh assets so HMR/edits take effect immediately.
  // Production static export relies on public/_headers for Cloudflare Pages.
  ...(!isExport && process.env.NODE_ENV !== 'development' && {
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
  })
};

module.exports = withContentCollections(nextConfig);
