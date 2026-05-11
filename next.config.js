/** @type {import('next').NextConfig} */
const isExport = process.env.NODE_ENV === 'production';
const faqRewriteLocales = ['ja', 'ar', 'vi', 'th', 'id', 'ms'];

const nextConfig = {
  // Only use static export for production builds
  // Dev mode uses dynamic server rendering for better DX
  ...(isExport && { output: 'export' }),
  allowedDevOrigins: ['192.168.12.18'],
  images: { unoptimized: true },
  transpilePackages: ['@heroui/react', '@heroui/theme'],
  
  // Enable compression
  compress: true,
  
  // Remove X-Powered-By header
  poweredByHeader: false,

  // Cloudflare Pages uses public/_redirects for these 200 rewrites after export.
  // next dev does not read _redirects, so mirror them here for local testing.
  ...(!isExport && {
    async rewrites() {
      return faqRewriteLocales.flatMap((locale) => [
        {
          source: `/${locale}/faq`,
          destination: '/en/faq'
        },
        {
          source: `/${locale}/faq/:path*`,
          destination: '/en/faq/:path*'
        }
      ]);
    }
  }),

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

module.exports = nextConfig;
