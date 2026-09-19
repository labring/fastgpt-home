import type { Metadata } from 'next';

import { getIndustryPath, type IndustryArticle, type IndustryLocale } from '@/lib/industryContent';
import { getLocaleHreflang, getOwnedLocaleUrl, isPreviewSite } from '@/lib/siteRouting';

export function getIndustryCanonicalUrl(article: Pick<IndustryArticle, 'locale' | 'slug'>) {
  return getOwnedLocaleUrl(article.locale, getIndustryPath(article.slug));
}

export function getIndustryAlternates(
  article: Pick<IndustryArticle, 'locale' | 'slug' | 'publishedLocales'>
) {
  const languages = Object.fromEntries(
    article.publishedLocales.map((locale) => [
      getLocaleHreflang(locale),
      getOwnedLocaleUrl(locale, getIndustryPath(article.slug))
    ])
  );
  if (article.publishedLocales.includes('en')) {
    languages['x-default'] = getOwnedLocaleUrl('en', getIndustryPath(article.slug));
  }

  return {
    canonical: getIndustryCanonicalUrl(article),
    languages
  } satisfies Metadata['alternates'];
}

export function getIndustryArticleMetadata(
  article: IndustryArticle,
  indexable = !isPreviewSite
): Metadata {
  const canonical = getIndustryCanonicalUrl(article);
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    ...(article.keywords.length ? { keywords: article.keywords } : {}),
    alternates: getIndustryAlternates(article),
    robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: 'article',
      url: canonical,
      title: article.metaTitle,
      description: article.metaDescription,
      ...(article.datePublished ? { publishedTime: article.datePublished } : {}),
      modifiedTime: article.dateModified
    }
  };
}

export function getIndustryLanguage(locale: IndustryLocale) {
  return locale === 'zh' ? 'zh-CN' : 'en-US';
}
