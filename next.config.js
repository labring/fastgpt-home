/** @type {import('next').NextConfig} */
const nextConfig = {
  // Customers pages depend on MongoDB, uploads and Route Handlers. The merged
  // application therefore ships as a single standalone Next.js runtime.
  output: 'standalone',
  // 本地同时起 3000/3001 两个 dev 实例时，用独立 distDir 避免共享 .next 缓存互相干扰；
  // 生产构建不设 NEXT_DIST_DIR，仍走默认 .next。
  distDir: process.env.NEXT_DIST_DIR || '.next',
  allowedDevOrigins: ['192.168.12.18', '127.0.0.1'],
  images: { unoptimized: true },
  transpilePackages: ['@heroui/react', '@heroui/theme'],

  // Enable compression
  compress: true,

  // Remove X-Powered-By header
  poweredByHeader: false,

  // Cache-Control headers only in production builds;
  // dev mode must serve fresh assets so HMR/edits take effect immediately.
  // HTML pages rely on Next.js' own ISR/SSG/dynamic cache semantics; only
  // static assets and the no-store customers API get explicit headers here.
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
        }
      ];
    }
  })
};

module.exports = nextConfig;
