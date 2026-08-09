import { MetadataRoute } from 'next';
import { faqContentLocaleCodes, getFaqIds } from '@/faq';
import {
  currentSiteVariant,
  getOwnedFaqUrl,
  getOwnedLocaleUrl,
  getPublishedLocaleCodes
} from '@/lib/siteRouting';
import { TECH_ENTRIES } from '@/components/tech-center/data';
import { getTechArticleLastModified, getTechCenterLastModified } from '@/lib/tech-center-content';
import { getCompareCanonicalUrl } from '@/lib/seo';
import { comparisonPages } from '@/content/competitor';

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

  // Simplified Chinese technical content is owned and indexed by fastgpt.cn.
  if (currentSiteVariant === 'cn') {
    addEntry(getOwnedLocaleUrl('zh', '/zh/tech-center'), getTechCenterLastModified());
    for (const article of TECH_ENTRIES) {
      addEntry(getOwnedLocaleUrl('zh', article.slug), getTechArticleLastModified(article));
    }
    for (const page of Object.values(comparisonPages)) {
      if (page.status !== 'published') continue;
      addEntry(getCompareCanonicalUrl(page.slug), new Date(page.dates.dateModified));
    }
  }

  return entries;
}
