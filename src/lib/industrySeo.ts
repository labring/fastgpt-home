import type { Metadata } from 'next';

import { getIndustryPath, type IndustryArticle, type IndustryLocale } from '@/lib/industryContent';
import { getAlternates } from '@/lib/seo';
import { getOwnedLocaleUrl, isPreviewSite } from '@/lib/siteRouting';

export function getIndustryCanonicalUrl(article: Pick<IndustryArticle, 'locale' | 'slug'>) {
  return getOwnedLocaleUrl(article.locale, getIndustryPath(article.slug));
}

export function getIndustryAlternates(
  article: Pick<IndustryArticle, 'locale' | 'slug' | 'publishedLocales'>
) {
  return getAlternates(article.locale, getIndustryPath(article.slug), article.publishedLocales);
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
