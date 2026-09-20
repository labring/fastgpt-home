import 'server-only';

import fs from 'node:fs';
import path from 'node:path';

import {
  currentSiteVariant,
  getDefaultLocaleForSiteVariant,
  getLocaleOwner,
  type SiteVariant
} from '@/lib/siteRouting';

export const INDUSTRY_LOCALES = ['zh', 'en'] as const;
export type IndustryLocale = (typeof INDUSTRY_LOCALES)[number];

const INDUSTRY_ROOT = path.join(process.cwd(), 'src', 'content', 'industry');
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export type IndustryArticle = {
  locale: IndustryLocale;
  slug: string;
  title: string;
  pageType: string;
  body: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  datePublished: string;
  dateModified: string;
  sourcePath: string;
  publishedLocales: IndustryLocale[];
};

function fail(sourcePath: string, message: string): never {
  throw new Error(`Industry ${sourcePath}: ${message}`);
}

function parseFrontMatter(source: string, sourcePath: string) {
  const normalized = source.replace(/\r\n?/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n(?:\n)?/);
  if (!match) fail(sourcePath, 'expected a byte-zero front matter block');

  const metadata: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator <= 0) fail(sourcePath, `invalid front matter line: ${line}`);
    metadata[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }

  const body = normalized.slice(match[0].length).trim();
  if (!body) fail(sourcePath, 'missing body');
  if (/<!--[\s\S]*?-->/.test(body)) {
    fail(sourcePath, 'body contains an internal metadata comment');
  }
  if (
    /^(?:slug|page_type|meta_title|meta_description|date_published|date_modified|(?:source|publication|delivery|review|batch)_[\w-]+|schedule|sign[- ]?off)\s*:/im.test(
      body
    )
  ) {
    fail(sourcePath, 'body contains internal delivery metadata');
  }
  return { metadata, body };
}

function requireField(metadata: Record<string, string>, sourcePath: string, field: string) {
  const value = metadata[field]?.trim();
  if (!value) fail(sourcePath, `missing ${field}`);
  return value;
}

function normalizeSlug(value: string, locale: IndustryLocale, sourcePath: string) {
  const expectedPrefix = `/${locale}/industry/`;
  const ownerPrefix = '/industry/';
  const rawSlug = value.startsWith(expectedPrefix)
    ? value.slice(expectedPrefix.length)
    : value.startsWith(ownerPrefix)
    ? value.slice(ownerPrefix.length)
    : '';
  if (!rawSlug || !SLUG_PATTERN.test(rawSlug)) {
    fail(sourcePath, `invalid slug: ${value}`);
  }
  return rawSlug;
}

function validateDate(value: string, field: string, sourcePath: string) {
  if (!DATE_PATTERN.test(value)) fail(sourcePath, `invalid ${field}: ${value}`);
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    fail(sourcePath, `invalid ${field}: ${value}`);
  }
}

function readLocaleArticles(locale: IndustryLocale): IndustryArticle[] {
  const localeRoot = path.resolve(INDUSTRY_ROOT, locale);
  if (!fs.existsSync(localeRoot)) return [];

  return fs
    .readdirSync(localeRoot, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .sort((left, right) => left.name.localeCompare(right.name))
    .map((entry) => {
      const sourcePath = path.join(localeRoot, entry.name);
      const { metadata, body } = parseFrontMatter(fs.readFileSync(sourcePath, 'utf8'), sourcePath);
      const title = requireField(metadata, sourcePath, 'title');
      const slug = normalizeSlug(requireField(metadata, sourcePath, 'slug'), locale, sourcePath);
      const pageType = requireField(metadata, sourcePath, 'page_type');
      const metaTitle = requireField(metadata, sourcePath, 'meta_title');
      const metaDescription = requireField(metadata, sourcePath, 'meta_description');
      const datePublished = requireField(metadata, sourcePath, 'date_published');
      const dateModified = requireField(metadata, sourcePath, 'date_modified');
      const h1 = body.match(/^#\s+(.+)$/m)?.[1]?.trim();
      if (h1 !== title) fail(sourcePath, 'title must match the first H1');
      validateDate(datePublished, 'date_published', sourcePath);
      validateDate(dateModified, 'date_modified', sourcePath);

      return {
        locale,
        slug,
        title,
        pageType,
        body,
        metaTitle,
        metaDescription,
        keywords: metadata.keywords
          ? metadata.keywords
              .split(',')
              .map((keyword) => keyword.trim())
              .filter(Boolean)
          : [],
        datePublished,
        dateModified,
        sourcePath,
        publishedLocales: []
      };
    });
}

const loadedArticles = INDUSTRY_LOCALES.flatMap(readLocaleArticles);
const identities = new Set<string>();
for (const article of loadedArticles) {
  const identity = `${article.locale}|${article.slug}`;
  if (identities.has(identity)) fail(article.sourcePath, `duplicate slug: ${article.slug}`);
  identities.add(identity);
}

for (const article of loadedArticles) {
  article.publishedLocales = INDUSTRY_LOCALES.filter((locale) =>
    identities.has(`${locale}|${article.slug}`)
  );
}

export const industryArticles = loadedArticles;

export function resolveIndustryLocale(locale: string): IndustryLocale | undefined {
  return INDUSTRY_LOCALES.includes(locale as IndustryLocale)
    ? (locale as IndustryLocale)
    : undefined;
}

export function getIndustryArticle(locale: IndustryLocale, slug: string) {
  return industryArticles.find((article) => article.locale === locale && article.slug === slug);
}

export function getIndustryArticleForRoot(slug: string, variant: SiteVariant = currentSiteVariant) {
  const preferredLocale = getDefaultLocaleForSiteVariant(variant);
  return (
    getIndustryArticle(preferredLocale as IndustryLocale, slug) ||
    industryArticles.find((article) => article.slug === slug)
  );
}

export function getIndustryReviewParams(variant: SiteVariant = currentSiteVariant) {
  if (variant !== 'preview') {
    const ownerArticle = industryArticles.find(
      (article) => getLocaleOwner(article.locale) === variant
    );
    return ownerArticle ? [{ lang: ownerArticle.locale, slug: ownerArticle.slug }] : [];
  }
  return industryArticles.map(({ locale, slug }) => ({ lang: locale, slug }));
}

export function getIndustryOwnerParams(variant: SiteVariant = currentSiteVariant) {
  return [
    ...new Set(
      industryArticles
        .filter((article) => variant === 'preview' || getLocaleOwner(article.locale) === variant)
        .map((article) => article.slug)
    )
  ].map((slug) => ({ slug }));
}

export function getIndustryPath(slug: string) {
  return `/industry/${slug}`;
}

export function getIndustrySitemapEntries(variant: SiteVariant = currentSiteVariant) {
  if (variant === 'preview') return [];
  return industryArticles
    .filter((article) => getLocaleOwner(article.locale) === variant)
    .map((article) => ({
      slug: article.slug,
      locale: article.locale,
      dateModified: article.dateModified
    }));
}
