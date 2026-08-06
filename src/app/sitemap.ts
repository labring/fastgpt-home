import { MetadataRoute } from 'next';
import { faqContentLocaleCodes, getFaqIds } from '@/faq';
import { getOwnedFaqUrl, getOwnedLocaleUrl, getPublishedLocaleCodes } from '@/lib/siteRouting';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedPaths = ['', '/price'];
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  const seenUrls = new Set<string>();

  const addEntry = (url: string, lastModified: Date) => {
    if (seenUrls.has(url)) return;
    seenUrls.add(url);
    entries.push({ url, lastModified });
  };

  for (const locale of getPublishedLocaleCodes()) {
    for (const path of localizedPaths) {
      addEntry(getOwnedLocaleUrl(locale, path), now);
    }
  }

  const publishedFaqLocales = faqContentLocaleCodes.filter((code) =>
    getPublishedLocaleCodes().includes(code)
  );

  for (const locale of publishedFaqLocales) {
    addEntry(getOwnedFaqUrl(locale), now);
  }

  for (const locale of publishedFaqLocales) {
    for (const faqId of getFaqIds(locale)) {
      addEntry(getOwnedFaqUrl(locale, faqId), now);
    }
  }

  return entries;
}
