import { Metadata } from 'next';
import { localeMap, supportedLocaleCodes } from '@/lib/locales';

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

  // Canonical should always include the language prefix to avoid duplicate content
  // This ensures each language version has a unique canonical URL
  const canonicalPath = `/${lang}${path}`;
  const canonicalUrl = `${baseUrl}${canonicalPath}`;

  const languages = availableLocales.reduce(
    (acc, locale) => {
      acc[locale] = `${baseUrl}/${locale}${path}`;
      return acc;
    },
    {} as Record<string, string>
  );

  // x-default tells search engines which URL to use for unmatched languages
  languages['x-default'] = `${baseUrl}/en${path}`;

  return {
    canonical: canonicalUrl,
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
