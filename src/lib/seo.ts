import { Metadata } from 'next';
import { localeMap, supportedLocaleCodes } from '@/lib/locales';
import {
  getLocaleHreflang,
  getLocaleOwner,
  getOwnedFaqUrl,
  getOwnedLocaleUrl,
  getSiteBaseUrl
} from '@/lib/siteRouting';

export { localeMap };

export function getFaqCanonicalBaseUrl(lang: string) {
  return getSiteBaseUrl(getLocaleOwner(lang));
}

export function getFaqCanonicalUrl(lang: string, path: string = '') {
  return getOwnedLocaleUrl(lang, path);
}

export function getCompareCanonicalUrl(slug: string) {
  return getOwnedLocaleUrl('zh', `/compare/${slug}`);
}

export function getCompareAlternates(slug: string): Metadata['alternates'] {
  const canonical = getCompareCanonicalUrl(slug);
  return {
    canonical,
    languages: {
      zh: canonical,
      'zh-CN': canonical,
      'x-default': canonical
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
  faqId?: string,
  availableLocales: readonly string[] = supportedLocaleCodes,
  hasEnglishTranslation = true
): Metadata['alternates'] {
  const canonical = getOwnedFaqUrl(lang, faqId);
  const translatedLocales = availableLocales.filter(
    (locale) => hasEnglishTranslation || locale !== 'en'
  );

  if (translatedLocales.length < 2) {
    return { canonical };
  }

  const languages = translatedLocales.reduce((acc, locale) => {
    acc[getLocaleHreflang(locale)] = getOwnedFaqUrl(locale, faqId);
    return acc;
  }, {} as Record<string, string>);

  if (hasEnglishTranslation) {
    languages['x-default'] = getOwnedFaqUrl('en', faqId);
  }

  return {
    canonical,
    languages
  };
}
