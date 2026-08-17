import type { Metadata } from 'next';

import { getGuideSource } from '@/content/guides/registry';
import {
  getBuildLocaleCodes,
  getDefaultLocaleForSiteVariant,
  getOwnedLocalePath,
  getOwnedLocaleUrl
} from '@/lib/siteRouting';

export const GUIDE_PUBLISHED_LOCALES = ['zh', 'en'] as const;
export type GuidePublishedLocale = (typeof GUIDE_PUBLISHED_LOCALES)[number];
type GuideMetadataOptions = { indexable?: boolean };

const GUIDE_HUB_COPY = {
  en: {
    title: 'FastGPT Guides',
    description: 'Practical enterprise AI implementation and decision guides.'
  },
  zh: {
    title: 'FastGPT 指南',
    description: '企业 AI 落地与选型实践指南。'
  }
} as const;

function getGuideSnapshot(locale: GuidePublishedLocale, slug: string) {
  const snapshot = getGuideSource(slug, locale);
  if (!snapshot) throw new Error(`Guide SEO identity is unpublished: ${slug} (${locale})`);
  return snapshot;
}

export function resolveGuideLocale(locale: string): GuidePublishedLocale | undefined {
  return GUIDE_PUBLISHED_LOCALES.includes(locale as GuidePublishedLocale)
    ? (locale as GuidePublishedLocale)
    : undefined;
}

export function getGuideBuildLocales(): GuidePublishedLocale[] {
  const locales = getBuildLocaleCodes()
    .map(resolveGuideLocale)
    .filter((locale): locale is GuidePublishedLocale => Boolean(locale));
  const defaultLocale = resolveGuideLocale(getDefaultLocaleForSiteVariant());
  return locales.length ? Array.from(new Set(locales)) : defaultLocale ? [defaultLocale] : ['en'];
}

export function getGuidePath(slug?: string): string {
  return slug ? `/guide/${slug}` : '/guide';
}

export function getGuideCanonicalUrl(locale: GuidePublishedLocale, slug?: string): string {
  return getOwnedLocaleUrl(locale, getGuidePath(slug));
}

export function getGuideAlternates(
  locale: GuidePublishedLocale,
  slug?: string
): Metadata['alternates'] {
  const path = getGuidePath(slug);
  const englishUrl = getOwnedLocaleUrl('en', path);
  const chineseUrl = getOwnedLocaleUrl('zh', path);

  return {
    canonical: getOwnedLocaleUrl(locale, path),
    languages: {
      en: englishUrl,
      'zh-CN': chineseUrl,
      'x-default': englishUrl
    }
  };
}

export function getGuideArticleMetadata(
  locale: GuidePublishedLocale,
  slug: string,
  { indexable = true }: GuideMetadataOptions = {}
): Metadata {
  const snapshot = getGuideSnapshot(locale, slug);
  const canonical = getGuideCanonicalUrl(locale, slug);

  return {
    title: snapshot.metaTitle,
    description: snapshot.metaDescription,
    keywords: snapshot.keywords,
    alternates: getGuideAlternates(locale, slug),
    robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      type: 'article',
      url: canonical,
      title: snapshot.metaTitle,
      description: snapshot.metaDescription,
      publishedTime: snapshot.datePublished,
      modifiedTime: snapshot.dateModified,
      ...(snapshot.assetPolicy.status === 'required'
        ? {
            images: [
              {
                url: getOwnedLocaleUrl(locale, snapshot.assetPolicy.path),
                width: snapshot.assetPolicy.width,
                height: snapshot.assetPolicy.height,
                alt: snapshot.assetPolicy.alt
              }
            ]
          }
        : {})
    }
  };
}

export function getGuideHubMetadata(
  locale: GuidePublishedLocale,
  { indexable = true }: GuideMetadataOptions = {}
): Metadata {
  const copy = GUIDE_HUB_COPY[locale];
  return {
    title: copy.title,
    description: copy.description,
    alternates: getGuideAlternates(locale),
    robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      type: 'website',
      url: getGuideCanonicalUrl(locale),
      title: copy.title,
      description: copy.description
    }
  };
}

export function getGuideOwnedPath(locale: GuidePublishedLocale, slug?: string): string {
  return getOwnedLocalePath(locale, getGuidePath(slug));
}
