import { MetadataRoute } from 'next';
import { faqContentLocaleCodes, getFaqIds } from '@/faq';
import {
  currentSiteVariant,
  getOwnedFaqUrl,
  getOwnedLocaleUrl,
  getPublishedLocaleCodes
} from '@/lib/siteRouting';
import { getTechEntryPath, TECH_ENTRIES } from '@/components/tech-center/data';
import { getTechArticleLastModified, getTechCenterLastModified } from '@/lib/tech-center-content';
import { getCompareCanonicalUrl, getCompareHubCanonicalUrl } from '@/lib/seo';
import { getComparisonPagesForLocale } from '@/content/competitor';
import { contactPublishedLocaleCodes } from '@/lib/publishedLocales';

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

  const siteLocales = getPublishedLocaleCodes();
  for (const locale of siteLocales) {
    for (const path of localizedPaths) {
      addEntry(getOwnedLocaleUrl(locale, path), now);
    }
  }

  for (const locale of contactPublishedLocaleCodes.filter((locale) =>
    siteLocales.includes(locale)
  )) {
    addEntry(getOwnedLocaleUrl(locale, '/contact'), now);
  }

  const publishedFaqLocales = faqContentLocaleCodes.filter((code) =>
    siteLocales.includes(code)
  );

  for (const locale of publishedFaqLocales) {
    addEntry(getOwnedFaqUrl(locale), now);
  }

  for (const locale of publishedFaqLocales) {
    // getFaqIds returns only final registry/catalog route keys for published FAQ locales.
    for (const routeKey of getFaqIds(locale)) {
      addEntry(getOwnedFaqUrl(locale, routeKey), now);
    }
  }

  // Simplified Chinese technical content is owned and indexed by fastgpt.cn.
  if (currentSiteVariant === 'cn') {
    addEntry(getOwnedLocaleUrl('zh', '/tech-center'), getTechCenterLastModified());
    for (const article of TECH_ENTRIES) {
      addEntry(
        getOwnedLocaleUrl('zh', getTechEntryPath(article)),
        getTechArticleLastModified(article)
      );
    }
  }

  const compareLocale = currentSiteVariant === 'cn' ? 'zh' : 'en';
  addEntry(getCompareHubCanonicalUrl(compareLocale), now);
  for (const page of getComparisonPagesForLocale(compareLocale)) {
    if (page.status !== 'published') continue;
    addEntry(getCompareCanonicalUrl(compareLocale, page.slug), new Date(page.dates.dateModified));
  }

  return entries;
}
