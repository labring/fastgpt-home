/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: './out',
  // Enable pretty XML output
  prettyXml: true,

  // Additional paths to include in the sitemap
  additionalPaths: async (config) => {
    const locales = ['en', 'zh', 'ja'];
    const paths = [];

    // Only include FAQ paths if FAQ feature is enabled
    const faqEnabled = process.env.NEXT_PUBLIC_FAQ === 'true';

    // Helper function to format date properly (remove milliseconds)
    const formatDate = (date) => {
      return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
    };

    const now = formatDate(new Date());

    // Generate paths for different locales
    for (const locale of locales) {
      // Homepage with locale
      paths.push({
        loc: `/${locale}`,
        lastMod: now,
        changefreq: 'daily',
        priority: 1.0
      });

      // Enterprise page
      paths.push({
        loc: `/${locale}/enterprise`,
        lastMod: now,
        changefreq: 'weekly',
        priority: 0.8
      });

      // Price page
      paths.push({
        loc: `/${locale}/price`,
        lastMod: now,
        changefreq: 'weekly',
        priority: 0.8
      });

      // FAQ page
      paths.push({
        loc: `/${locale}/faq`,
        lastMod: now,
        changefreq: 'daily',
        priority: 0.9
      });

      // FAQ detail pages (only if FAQ is enabled)
      if (faqEnabled) {
        try {
          // Import FAQ data dynamically - handle both .ts and .js extensions
          const faqModule = await import('./src/faq.ts').catch(() => import('./src/faq.js'));
          const { faq } = faqModule;
          const faqIds = Object.keys(faq);

          // Add each FAQ detail page
          faqIds.forEach((id) => {
            paths.push({
              loc: `/${locale}/faq/${id}`,
              lastMod: now,
              changefreq: 'weekly',
              priority: 0.7
            });
          });
        } catch (error) {
          console.warn('Could not load FAQ data for sitemap generation:', error.message);
          // If FAQ data loading fails, at least add the FAQ list page
        }
      }
    }

    // Root homepage
    paths.push({
      loc: '/',
      lastMod: now,
      changefreq: 'daily',
      priority: 1.0
    });

    return paths;
  },

  // Custom transformation for URLs
  transform: async (config, path) => {
    // Add priority based on path type
    if (path.includes('/faq')) {
      return {
        ...path,
        priority: 0.9,
        changefreq: 'daily'
      };
    }

    if (path.includes('/enterprise') || path.includes('/price')) {
      return {
        ...path,
        priority: 0.8,
        changefreq: 'weekly'
      };
    }

    return {
      ...path,
      priority: 0.7,
      changefreq: 'weekly'
    };
  },

  // Exclude specific paths if needed
  exclude: ['/sitemap.xml', '/robots.txt'],

  // Generate index sitemaps for better organization
  generateIndexSitemap: true,

  // Robots txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/']
      }
    ]
  }
};
