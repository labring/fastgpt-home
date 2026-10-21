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
      'Browse practical AI workflows by application area, from finance and biopharma to scientific research and manufacturing.'
  },
  zh: {
    title: 'FastGPT 行业 AI 场景与问题',
    description: '按金融、生物医药、科研及制造 / 生产加工等应用领域，浏览具体业务场景与作业环节中的 AI 实践内容。'
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
