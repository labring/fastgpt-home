import { MetadataRoute } from 'next';

// Helper function to format date
function formatDate(date: Date): string {
  return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io';
  const locales = ['en', 'zh', 'ja'];
  const now = formatDate(new Date());

  const paths: MetadataRoute.Sitemap = [];

  // Generate paths for different locales
  for (const locale of locales) {
    // Homepage with locale
    paths.push({
      url: `${baseUrl}/${locale}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0
    });

    // Enterprise page
    paths.push({
      url: `${baseUrl}/${locale}/enterprise`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8
    });

    // Price page
    paths.push({
      url: `${baseUrl}/${locale}/price`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8
    });

    // FAQ page (only include if FAQ is enabled)
    if (process.env.NEXT_PUBLIC_FAQ === 'true') {
      paths.push({
        url: `${baseUrl}/${locale}/faq`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.9
      });
    }
  }

  // Root homepage
  paths.push({
    url: baseUrl,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 1.0
  });

  return paths;
}
