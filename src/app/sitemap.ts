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
import { guideEntries } from '@/content/guides/registry';
import { getGuideCanonicalUrl } from '@/lib/guideSeo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedPaths = ['', '/price'];
  const entries: MetadataRoute.Sitemap = [];
  const seenUrls = new Set<string>();

  const getLatestDate = (dates: Date[]) =>
    dates.length ? new Date(Math.max(...dates.map((date) => date.getTime()))) : undefined;

  const addEntry = (url: string, lastModified?: Date) => {
    if (seenUrls.has(url)) return;
    seenUrls.add(url);
    const entry: MetadataRoute.Sitemap[number] = { url };
    if (lastModified) entry.lastModified = lastModified;
    entries.push(entry);
  };

  const siteLocales = getPublishedLocaleCodes();
  for (const locale of siteLocales) {
    for (const path of localizedPaths) {
      addEntry(getOwnedLocaleUrl(locale, path));
    }
  }

  for (const locale of contactPublishedLocaleCodes.filter((locale) =>
    siteLocales.includes(locale)
  )) {
    addEntry(getOwnedLocaleUrl(locale, '/contact'));
  }

  const publishedFaqLocales = faqContentLocaleCodes.filter((code) => siteLocales.includes(code));

  for (const locale of publishedFaqLocales) {
    addEntry(getOwnedFaqUrl(locale));
  }

  for (const locale of publishedFaqLocales) {
    // getFaqIds returns only final registry/catalog route keys for published FAQ locales.
    for (const routeKey of getFaqIds(locale)) {
      addEntry(getOwnedFaqUrl(locale, routeKey));
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
  const comparisonPages = getComparisonPagesForLocale(compareLocale).filter(
    (page) => page.status === 'published'
  );
  addEntry(
    getCompareHubCanonicalUrl(compareLocale),
    getLatestDate(comparisonPages.map((page) => new Date(`${page.dates.dateModified}T00:00:00Z`)))
  );
  for (const page of comparisonPages) {
    addEntry(getCompareCanonicalUrl(compareLocale, page.slug), new Date(page.dates.dateModified));
  }

  const guideLocale = currentSiteVariant === 'cn' ? 'zh' : 'en';
  const guideLastModified = getLatestDate(
    guideEntries.map((entry) => new Date(`${entry[guideLocale].dateModified}T00:00:00Z`))
  );
  addEntry(getGuideCanonicalUrl(guideLocale), guideLastModified);
  for (const entry of guideEntries) {
    addEntry(
      getGuideCanonicalUrl(guideLocale, entry.slug),
      new Date(entry[guideLocale].dateModified)
    );
  }

  return entries;
}
