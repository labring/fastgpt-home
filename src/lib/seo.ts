import { Metadata } from 'next';

const locales = ['en', 'zh', 'ja'];

/** Map lang code to full BCP-47 / og:locale value */
export const localeMap: Record<string, string> = {
  en: 'en_US',
  zh: 'zh_CN',
  ja: 'ja_JP'
};

/**
 * Generate canonical URL and hreflang alternates for a given page.
 * Includes x-default pointing to the English version.
 * @param lang - current language code
 * @param path - page path without lang prefix, e.g. '' for home, '/enterprise', '/price'
 */
export function getAlternates(lang: string, path: string = ''): Metadata['alternates'] {
  const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io';

  const languages = locales.reduce(
    (acc, locale) => {
      acc[locale] = `${baseUrl}/${locale}${path}`;
      return acc;
    },
    {} as Record<string, string>
  );

  // x-default tells search engines which URL to use for unmatched languages
  languages['x-default'] = `${baseUrl}/en${path}`;

  return {
    canonical: `${baseUrl}/${lang}${path}`,
    languages
  };
}
