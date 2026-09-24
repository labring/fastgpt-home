import 'server-only';

import { allAuthors, allBlogs, type Author, type Blog } from 'content-collections';
import { normalizeLocale, supportedLocaleCodes, type LocaleCode } from '@/lib/locales';
import { getDefaultLocaleForSiteVariant } from '@/lib/siteRouting';

export const blogLocales = ['en', 'zh'] as const;
export type BlogLocale = (typeof blogLocales)[number];
export type BlogAuthor = Omit<Author, 'name' | 'description'> & {
  name: string;
  description: string;
};
export type BlogPost = Blog & { authorRecord?: BlogAuthor };
export type BlogLocaleResolution = {
  requestedLocale: LocaleCode;
  contentLocale: BlogLocale;
  isFallback: boolean;
};

function isBlogLocale(locale: string): locale is BlogLocale {
  return blogLocales.includes(locale as BlogLocale);
}

export function resolveBlogLocale(locale: string): BlogLocaleResolution {
  const requestedLocale = normalizeLocale(locale);
  const contentLocale = requestedLocale === 'zh' || requestedLocale === 'zh-hant' ? 'zh' : 'en';

  return {
    requestedLocale,
    contentLocale,
    isFallback: requestedLocale !== contentLocale
  };
}

function resolveAuthor(slug: string, locale: BlogLocale): BlogAuthor {
  const author = allAuthors.find((candidate) => candidate.slug === slug);
  if (!author) throw new Error(`Blog references unknown author: ${slug}`);
  return {
    ...author,
    name: author.name[locale],
    description: author.description[locale]
  };
}

function toBlogPost(blog: Blog): BlogPost {
  if (!isBlogLocale(blog.locale)) {
    throw new Error(`Blog has unsupported content locale: ${blog.locale}`);
  }
  return {
    ...blog,
    ...(blog.author ? { authorRecord: resolveAuthor(blog.author, blog.locale) } : {})
  };
}

export function getPublishedBlogs(locale: string): BlogPost[] {
  const { contentLocale } = resolveBlogLocale(locale);

  return allBlogs
    .filter((blog) => blog.locale === contentLocale && !blog.draft)
    .sort((left, right) => right.date.getTime() - left.date.getTime())
    .map(toBlogPost);
}

export function getBlog(locale: string, slug: string): BlogPost | undefined {
  return getPublishedBlogs(locale).find((blog) => blog.slug === slug);
}

function stableHash(value: string) {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function getRelatedBlogs(post: BlogPost, count = 2): BlogPost[] {
  const candidates = getPublishedBlogs(post.locale).filter(
    (candidate) => candidate.category === post.category && candidate.slug !== post.slug
  );
  if (candidates.length < count) return [];

  return candidates
    .map((candidate) => ({ candidate, order: stableHash(`${post.slug}:${candidate.slug}`) }))
    .sort(
      (left, right) =>
        left.order - right.order || left.candidate.slug.localeCompare(right.candidate.slug)
    )
    .slice(0, count)
    .map(({ candidate }) => candidate);
}

export function getBlogSlugs(locale: string) {
  return getPublishedBlogs(locale).map((blog) => blog.slug);
}

/** Build blog routes for every supported UI locale; content falls back to English or Chinese. */
export function getBlogBuildLocales(): LocaleCode[] {
  return [...supportedLocaleCodes];
}

export function getBlogBuildParams(localized = true) {
  const locales = localized ? getBlogBuildLocales() : [getBlogDefaultLocale()];
  return locales.flatMap((locale) => getBlogSlugs(locale).map((slug) => ({ lang: locale, slug })));
}

export function getBlogDefaultLocale(): BlogLocale {
  const locale = getDefaultLocaleForSiteVariant();
  return isBlogLocale(locale) ? locale : 'en';
}
