import { Metadata } from 'next';

const locales = ['en', 'zh', 'ja'];

/**
 * Generate canonical URL and hreflang alternates for a given page.
 * @param lang - current language code
 * @param path - page path without lang prefix, e.g. '' for home, '/enterprise', '/price'
 */
export function getAlternates(lang: string, path: string = ''): Metadata['alternates'] {
  const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io';

  return {
    canonical: `${baseUrl}/${lang}${path}`,
    languages: locales.reduce(
      (acc, locale) => {
        acc[locale] = `${baseUrl}/${locale}${path}`;
        return acc;
      },
      {} as Record<string, string>
    )
  };
}
