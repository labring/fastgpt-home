import { Metadata } from 'next';
import { localeMap, supportedLocaleCodes } from '@/lib/locales';
import { getDefaultLocalePath, getFaqPath } from '@/lib/localizedRoutes';

export { localeMap };

function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io').replace(/\/$/, '');
}

/**
 * Generate canonical URL and hreflang alternates for a given page.
 * Includes x-default pointing to the English version.
 * @param lang - current language code
 * @param path - page path without lang prefix, e.g. '' for home, '/enterprise', '/price'
 */
export function getAlternates(
  lang: string,
  path: string = '',
  availableLocales: readonly string[] = supportedLocaleCodes
): Metadata['alternates'] {
  const baseUrl = getBaseUrl();

  const canonicalUrl = `${baseUrl}${getDefaultLocalePath(lang, path)}`;

  const languages = availableLocales.reduce((acc, locale) => {
    acc[locale] = `${baseUrl}${getDefaultLocalePath(locale, path)}`;
    return acc;
  }, {} as Record<string, string>);

  languages['x-default'] = `${baseUrl}${getDefaultLocalePath('en', path)}`;

  return {
    canonical: canonicalUrl,
    languages
  };
}

export function getFaqAlternates(
  lang: string,
  faqId?: string,
  availableLocales: readonly string[] = supportedLocaleCodes
): Metadata['alternates'] {
  const baseUrl = getBaseUrl();
  const canonical = `${baseUrl}${getFaqPath(lang, faqId)}`;
  const languages = availableLocales.reduce((acc, locale) => {
    acc[locale] = `${baseUrl}${getFaqPath(locale, faqId)}`;
    return acc;
  }, {} as Record<string, string>);

  languages['x-default'] = `${baseUrl}${getFaqPath('en', faqId)}`;

  return {
    canonical,
    languages
  };
}

/**
 * Generate alternates for the unprefixed root page.
 * The root page is the canonical default-locale homepage for each site variant.
 */
export function getRootAlternates(
  lang: string,
  availableLocales: readonly string[] = supportedLocaleCodes
): Metadata['alternates'] {
  const alternates = getAlternates(lang, '', availableLocales);

  return {
    ...alternates,
    canonical: `${getBaseUrl()}/`
  };
}
