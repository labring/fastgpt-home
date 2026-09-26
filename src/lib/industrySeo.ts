import type { Metadata } from 'next';

import {
  INDUSTRY_LOCALES,
  getIndustryPath,
  type IndustryArticle,
  type IndustryLocale
} from '@/lib/industryContent';
import { getAlternates } from '@/lib/seo';
import { getOwnedLocaleUrl, isPreviewSite } from '@/lib/siteRouting';

export function getIndustryCanonicalUrl(article: Pick<IndustryArticle, 'locale' | 'slug'>) {
  return getOwnedLocaleUrl(article.locale, getIndustryPath(article.slug));
}

export const industryHubCopy = {
  en: {
    title: 'FastGPT Industry AI Use Cases',
    description:
      'Explore practical AI use cases across industry workflows, business scenarios, and operational steps.'
  },
  zh: {
    title: 'FastGPT 行业 AI 场景与问题',
    description: '按行业问题、业务场景和作业环节浏览 FastGPT 的企业 AI 实践内容。'
  }
} as const;

export function getIndustryHubCanonicalUrl(locale: IndustryLocale) {
  return getOwnedLocaleUrl(locale, getIndustryPath());
}

export function getIndustryHubMetadata(
  locale: IndustryLocale,
  { indexable = !isPreviewSite }: { indexable?: boolean } = {}
): Metadata {
  const copy = industryHubCopy[locale];
  const canonical = getIndustryHubCanonicalUrl(locale);
  return {
    title: copy.title,
    description: copy.description,
    alternates: getAlternates(locale, getIndustryPath(), INDUSTRY_LOCALES),
    robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: 'website',
      url: canonical,
      title: copy.title,
      description: copy.description
    }
  };
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
