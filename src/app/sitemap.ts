import { MetadataRoute } from 'next';
import { faqContentLocaleCodes, getFaqIds } from '@/faq';
import {
  currentSiteVariant,
  getDefaultLocaleForSiteVariant,
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
import { getPublishedBlogs } from '@/content/blog';
import { getBlogCanonicalUrl } from '@/lib/blogSeo';
import {
  getIndustryPath,
  getIndustrySitemapEntries,
  resolveIndustryLocale
} from '@/lib/industryContent';
import { getIndustryHubCanonicalUrl } from '@/lib/industrySeo';
import { getAllPublishedSolutionDetails, getCategories } from '@customers/lib/data';
import { getSolutionPublicHref } from '@customers/lib/solution-url';
import { absoluteUrl } from '@customers/lib/site-url';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedPaths = ['', '/price', '/blog'];
  const entries: MetadataRoute.Sitemap = [];
  const seenUrls = new Set<string>();
  const staticUrls = new Set<string>();

  const getLatestDate = (dates: Date[]) =>
    dates.length ? new Date(Math.max(...dates.map((date) => date.getTime()))) : undefined;

  const addEntry = (url: string, lastModified?: Date, isStatic = false) => {
    if (seenUrls.has(url)) return;
    seenUrls.add(url);
    if (isStatic) staticUrls.add(url);
    const entry: MetadataRoute.Sitemap[number] = { url };
    if (lastModified) entry.lastModified = lastModified;
    entries.push(entry);
  };

  const siteLocales = getPublishedLocaleCodes();
  for (const locale of siteLocales) {
    for (const path of localizedPaths) {
      // Stable routes (home/price/contact/FAQ) intentionally omit lastmod: no verifiable content
      // date exists for them (enforced by scripts/verify-i18n-seo.js). The blog index uses its
      // newest post date.
      const lastModified =
        path === '/blog'
          ? getLatestDate(getPublishedBlogs(locale).map((post) => post.dateModified || post.date))
          : undefined;
      addEntry(getOwnedLocaleUrl(locale, path), lastModified, true);
    }
  }

  if (currentSiteVariant === 'cn') {
    addEntry(getOwnedLocaleUrl('zh', '/videos'), undefined, true);
    addEntry(getOwnedLocaleUrl('zh', '/wiki'), new Date('2026-09-21'), true);
  }

  for (const locale of contactPublishedLocaleCodes.filter((locale) =>
    siteLocales.includes(locale)
  )) {
    addEntry(getOwnedLocaleUrl(locale, '/contact'), undefined, true);
  }

  const publishedFaqLocales = faqContentLocaleCodes.filter((code) => siteLocales.includes(code));

  for (const locale of publishedFaqLocales) {
    addEntry(getOwnedFaqUrl(locale), undefined, true);
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

  for (const locale of siteLocales) {
    for (const post of getPublishedBlogs(locale)) {
      addEntry(getBlogCanonicalUrl(locale, post.slug), post.dateModified || post.date);
    }
  }

  const industryEntries = getIndustrySitemapEntries(currentSiteVariant);
  const industryLocale = resolveIndustryLocale(getDefaultLocaleForSiteVariant(currentSiteVariant));
  if (industryEntries.length && industryLocale) {
    // The hub has no independent modification date; article dates stay on article URLs.
    addEntry(getIndustryHubCanonicalUrl(industryLocale));
  }
  for (const article of industryEntries) {
    addEntry(
      getOwnedLocaleUrl(article.locale, getIndustryPath(article.slug)),
      new Date(`${article.dateModified}T00:00:00Z`)
    );
  }

  // 客户案例中心：仅中文，归 fastgpt.cn；URL 由 JSON 数据源驱动。
  if (currentSiteVariant === 'cn') {
    const solutions = getAllPublishedSolutionDetails();
    const solutionDate = (solution: (typeof solutions)[number]) =>
      new Date(solution.updatedAt || solution.createdAt);
    addEntry(absoluteUrl('/'), getLatestDate(solutions.map(solutionDate)));
    for (const solution of solutions) {
      addEntry(
        absoluteUrl(getSolutionPublicHref(solution)),
        new Date(solution.updatedAt || solution.createdAt)
      );
    }
    for (const category of getCategories()) {
      addEntry(
        absoluteUrl(`/categories/${category.slug}`),
        getLatestDate(
          solutions.filter((solution) => solution.categorySlug === category.slug).map(solutionDate)
        )
      );
    }
  }

  const staticEntries = entries.filter(({ url }) => staticUrls.has(url));
  const dynamicEntries = entries
    .filter(({ url }) => !staticUrls.has(url))
    .sort((a, b) => (a.url < b.url ? -1 : a.url > b.url ? 1 : 0));

  return [...staticEntries, ...dynamicEntries];
}
