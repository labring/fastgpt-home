import { Metadata } from 'next';
import type { CompareLocale } from '@/content/competitor';
import { faqContentLocaleCodes, getFaqRouteKey, resolveFaqLocale } from '@/faq';
import { localeMap, supportedLocaleCodes } from '@/lib/locales';
import { getLocaleHreflang, getOwnedFaqUrl, getOwnedLocaleUrl } from '@/lib/siteRouting';

export { localeMap };

export function getRobotsPolicy(index: boolean, follow = true): Metadata['robots'] {
  return { index, follow };
}

export function getCompareCanonicalUrl(locale: CompareLocale, slug: string) {
  return getOwnedLocaleUrl(locale, `/compare/${slug}`);
}

export function getCompareAlternates(locale: CompareLocale, slug: string): Metadata['alternates'] {
  const canonical = getCompareCanonicalUrl(locale, slug);
  const englishUrl = getOwnedLocaleUrl('en', `/compare/${slug}`);
  const chineseUrl = getOwnedLocaleUrl('zh', `/compare/${slug}`);

  return {
    canonical,
    languages: {
      en: englishUrl,
      'zh-CN': chineseUrl,
      'x-default': englishUrl
    }
  };
}

export function getCompareHubCanonicalUrl(locale: CompareLocale) {
  return getOwnedLocaleUrl(locale, '/compare');
}

export function getCompareHubAlternates(locale: CompareLocale): Metadata['alternates'] {
  const canonical = getCompareHubCanonicalUrl(locale);
  const englishUrl = getOwnedLocaleUrl('en', '/compare');
  const chineseUrl = getOwnedLocaleUrl('zh', '/compare');

  return {
    canonical,
    languages: {
      en: englishUrl,
      'zh-CN': chineseUrl,
      'x-default': englishUrl
    }
  };
}
/**
 * Generate cross-domain canonical and hreflang metadata for a page.
 * @param lang - current language code
 * @param path - page path without a locale prefix
 */
export function getAlternates(
  lang: string,
  path: string = '',
  availableLocales: readonly string[] = supportedLocaleCodes
): Metadata['alternates'] {
  const canonicalUrl = getOwnedLocaleUrl(lang, path);
  const languages = availableLocales.reduce((acc, locale) => {
    acc[getLocaleHreflang(locale)] = getOwnedLocaleUrl(locale, path);
    return acc;
  }, {} as Record<string, string>);

  languages['x-default'] = getOwnedLocaleUrl('en', path);

  return {
    canonical: canonicalUrl,
    languages
  };
}

export function getFaqAlternates(
  lang: string,
  contentId?: string,
  availableLocales: readonly string[] = faqContentLocaleCodes
): Metadata['alternates'] {
  const currentLocale = resolveFaqLocale(lang);
  const publishedLocales = Array.from(
    new Set(
      availableLocales
        .map((locale) => resolveFaqLocale(locale))
        .filter((locale) => faqContentLocaleCodes.includes(locale))
    )
  );
  if (!publishedLocales.includes(currentLocale)) publishedLocales.push(currentLocale);

  const routeKey = contentId ? getFaqRouteKey(contentId, currentLocale) : undefined;
  if (contentId && !routeKey) {
    throw new Error(`FAQ alternate identity is unpublished: ${contentId} (${currentLocale})`);
  }

  const canonical = getOwnedFaqUrl(currentLocale, routeKey);
  const languages = publishedLocales.reduce((acc, locale) => {
    const targetRouteKey = contentId ? getFaqRouteKey(contentId, locale) : undefined;
    if (contentId && !targetRouteKey) return acc;
    acc[getLocaleHreflang(locale)] = getOwnedFaqUrl(locale, targetRouteKey);
    return acc;
  }, {} as Record<string, string>);

  const englishRouteKey = contentId ? getFaqRouteKey(contentId, 'en') : publishedLocales.includes('en') ? undefined : null;
  if (contentId ? englishRouteKey : publishedLocales.includes('en')) {
    languages['x-default'] = getOwnedFaqUrl('en', englishRouteKey || undefined);
  }

  return {
    canonical,
    languages
  };
}
