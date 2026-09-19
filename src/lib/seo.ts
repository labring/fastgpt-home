import { Metadata } from 'next';
import type { CompareLocale } from '@/content/competitor';
import { localeMap, supportedLocaleCodes } from '@/lib/locales';
import { getLocaleHreflang, getOwnedLocaleUrl } from '@/lib/siteRouting';

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

  if (availableLocales.includes('en')) {
    languages['x-default'] = getOwnedLocaleUrl('en', path);
  }

  return {
    canonical: canonicalUrl,
    languages
  };
}
