import 'server-only';

import { allAuthors, allBlogs, type Author, type Blog } from 'content-collections';
import { normalizeLocale, type LocaleCode } from '@/lib/locales';
import { getBuildLocaleCodes, getDefaultLocaleForSiteVariant } from '@/lib/siteRouting';

export const blogLocales = ['en', 'zh'] as const;
export type BlogLocale = (typeof blogLocales)[number];
export type BlogAuthor = Omit<Author, 'name' | 'description'> & {
  name: string;
  description: string;
};
export type BlogPost = Blog & { authorRecord: BlogAuthor };
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
  return { ...blog, authorRecord: resolveAuthor(blog.author, blog.locale) };
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

export function getBlogSlugs(locale: string) {
  return getPublishedBlogs(locale).map((blog) => blog.slug);
}

export function getBlogBuildParams() {
  return getBuildLocaleCodes().flatMap((locale) =>
    getBlogSlugs(locale).map((slug) => ({ lang: locale, slug }))
  );
}

export function getBlogDefaultLocale(): BlogLocale {
  const locale = getDefaultLocaleForSiteVariant();
  return isBlogLocale(locale) ? locale : 'en';
}
