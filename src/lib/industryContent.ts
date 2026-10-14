import 'server-only';

import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { isIndustryArea, type IndustryArea, type IndustrySummary } from '@/lib/industryListing';

import {
  currentSiteVariant,
  getDefaultLocaleForSiteVariant,
  getLocaleOwner,
  getReviewLocalePath,
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
  area: IndustryArea;
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
    const field = line.slice(0, separator).trim();
    if (field === 'application_area' && Object.hasOwn(metadata, field)) {
      fail(sourcePath, 'duplicate application_area; declare exactly one primary area');
    }
    metadata[field] = line.slice(separator + 1).trim();
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

function resolveApplicationArea(
  metadata: Record<string, string>,
  slug: string,
  sourcePath: string
) {
  const historicalArea = /^(?:finance|fin)-/.test(slug)
    ? 'finance'
    : slug.startsWith('biomed-')
    ? 'biomed'
    : undefined;
  const declaredArea = metadata.application_area;
  if (declaredArea !== undefined && !isIndustryArea(declaredArea)) {
    fail(
      sourcePath,
      `unknown application_area: ${declaredArea}; expected finance, biomed, or research`
    );
  }
  if (historicalArea && declaredArea && historicalArea !== declaredArea) {
    fail(
      sourcePath,
      `conflicting application_area: ${declaredArea}; ${slug} belongs to ${historicalArea}`
    );
  }
  const area = declaredArea || historicalArea;
  if (!area) fail(sourcePath, 'missing application_area; expected finance, biomed, or research');
  return area;
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
        area: resolveApplicationArea(metadata, slug, sourcePath),
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
const identities = new Map<string, IndustryArticle>();
for (const article of loadedArticles) {
  const identity = `${article.locale}|${article.slug}`;
  if (identities.has(identity)) fail(article.sourcePath, `duplicate slug: ${article.slug}`);
  identities.set(identity, article);
}

for (const article of loadedArticles) {
  article.publishedLocales = INDUSTRY_LOCALES.filter((locale) =>
    identities.has(`${locale}|${article.slug}`)
  );
}

export const industryArticles = loadedArticles;

const relatedGroups = new Map<
  string,
  { articles: IndustryArticle[]; positions: Map<string, number> }
>();
// Order each pool once for stable recommendations without per-page sorting.
for (const { article } of loadedArticles
  .map((article) => ({
    article,
    rank: createHash('sha256').update(article.slug).digest('hex')
  }))
  .sort(
    (left, right) =>
      left.rank.localeCompare(right.rank) || left.article.slug.localeCompare(right.article.slug)
  )) {
  const key = `${article.locale}|${article.area}`;
  const group = relatedGroups.get(key) || { articles: [], positions: new Map<string, number>() };
  group.positions.set(article.slug, group.articles.length);
  group.articles.push(article);
  relatedGroups.set(key, group);
}

export function getRelatedIndustryArticles(article: IndustryArticle): IndustryArticle[] {
  const group = relatedGroups.get(`${article.locale}|${article.area}`);
  const position = group?.positions.get(article.slug);
  if (!group || position === undefined) return [];
  return Array.from(
    { length: Math.min(3, group.articles.length - 1) },
    (_, index) => group.articles[(position + index + 1) % group.articles.length]
  );
}

export function getIndustrySummaries(locale: IndustryLocale): IndustrySummary[] {
  return industryArticles
    .filter((article) => article.locale === locale)
    .map(({ slug, area, title, metaDescription }) => ({
      slug,
      area,
      title,
      description: metaDescription,
      href: getReviewLocalePath(locale, getIndustryPath(slug))
    }));
}

export function resolveIndustryLocale(locale: string): IndustryLocale | undefined {
  return INDUSTRY_LOCALES.includes(locale as IndustryLocale)
    ? (locale as IndustryLocale)
    : undefined;
}

export function getIndustryArticle(locale: IndustryLocale, slug: string) {
  return identities.get(`${locale}|${slug}`);
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

export function getIndustryHubParams(variant: SiteVariant = currentSiteVariant) {
  if (variant === 'preview') return INDUSTRY_LOCALES.map((lang) => ({ lang }));
  const locale = resolveIndustryLocale(getDefaultLocaleForSiteVariant(variant));
  return locale ? [{ lang: locale }] : [];
}

export function getIndustryOwnerParams(variant: SiteVariant = currentSiteVariant) {
  if (variant === 'preview') {
    const placeholder = industryArticles[0]?.slug;
    return placeholder ? [{ slug: placeholder }] : [];
  }
  return [
    ...new Set(
      industryArticles
        .filter((article) => getLocaleOwner(article.locale) === variant)
        .map((article) => article.slug)
    )
  ].map((slug) => ({ slug }));
}

export function getIndustryPath(slug?: string) {
  return slug ? `/industry/${slug}` : '/industry';
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
