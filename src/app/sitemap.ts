import { MetadataRoute } from 'next';
import { faqContentLocaleCodes, getFaqIds } from '@/faq';
import {
  currentSiteVariant,
  getLocaleOwner,
  getOwnedFaqUrl,
  getOwnedLocaleUrl,
  getPublishedLocaleCodes
} from '@/lib/siteRouting';
import {
  getTechCenterPaginationParams,
  getTechEntriesForLocale
} from '@/components/tech-center/data';
import { getTechArticleLastModified, getTechCenterLastModified } from '@/lib/tech-center-content';
import { getTechCenterPagePath, getTechnicalSitemapUrl } from '@/lib/technicalRouting';
import { getCompareCanonicalUrl, getCompareHubCanonicalUrl } from '@/lib/seo';
import { getComparisonPagesForLocale } from '@/content/competitor';
import { contactPublishedLocaleCodes } from '@/lib/publishedLocales';
import { techPublishedLocaleCodes } from '@/lib/publishedLocales';
import { guideEntries } from '@/content/guides/registry';
import { getGuideCanonicalUrl } from '@/lib/guideSeo';
import { getAllPublishedSolutionDetails, getCategories } from '@customers/lib/data';
import { getSolutionPublicHref } from '@customers/lib/solution-url';
import { absoluteUrl } from '@customers/lib/site-url';

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

  for (const locale of techPublishedLocaleCodes) {
    if (currentSiteVariant === 'preview' || getLocaleOwner(locale) !== currentSiteVariant) continue;
    const localeEntries = getTechEntriesForLocale(locale);
    if (!localeEntries.length) continue;
    const lastModified = getTechCenterLastModified(locale);
    addEntry(getOwnedLocaleUrl(locale, '/tech-center'), lastModified);
    for (const { page } of getTechCenterPaginationParams(locale)) {
      addEntry(getOwnedLocaleUrl(locale, getTechCenterPagePath(Number(page))), lastModified);
    }
    for (const article of localeEntries) {
      const url = getTechnicalSitemapUrl(article, currentSiteVariant);
      if (url) addEntry(url, getTechArticleLastModified(article));
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

  // 客户案例中心：仅中文，归 fastgpt.cn；URL 由 JSON 数据源驱动。
  if (currentSiteVariant === 'cn') {
    addEntry(absoluteUrl('/'));
    for (const solution of getAllPublishedSolutionDetails()) {
      addEntry(
        absoluteUrl(getSolutionPublicHref(solution)),
        new Date(solution.updatedAt || solution.createdAt)
      );
    }
    for (const category of getCategories()) {
      addEntry(absoluteUrl(`/categories/${category.slug}`));
    }
  }

  return entries;
}
