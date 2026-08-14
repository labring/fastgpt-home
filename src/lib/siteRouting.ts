import { normalizeLocale, supportedLocaleCodes, type LocaleCode } from '@/lib/locales';

export const siteVariants = ['cn', 'io'] as const;
export type SiteVariant = (typeof siteVariants)[number];

export const languageRegions = ['zh', 'international'] as const;
export type LanguageRegion = (typeof languageRegions)[number];

type LocaleRouting = {
  owner: SiteVariant;
  hreflang: string;
};

const localeRouting: Record<LocaleCode, LocaleRouting> = {
  en: { owner: 'io', hreflang: 'en' },
  zh: { owner: 'cn', hreflang: 'zh-CN' },
  'zh-hant': { owner: 'io', hreflang: 'zh-Hant' },
  ja: { owner: 'io', hreflang: 'ja' },
  ar: { owner: 'io', hreflang: 'ar' },
  vi: { owner: 'io', hreflang: 'vi' },
  th: { owner: 'io', hreflang: 'th' },
  id: { owner: 'io', hreflang: 'id' },
  ms: { owner: 'io', hreflang: 'ms' }
};

const siteBaseUrls: Record<SiteVariant, string> = {
  cn: stripTrailingSlash(process.env.NEXT_PUBLIC_CN_HOME_URL || 'https://fastgpt.cn'),
  io: stripTrailingSlash(process.env.NEXT_PUBLIC_IO_HOME_URL || 'https://fastgpt.io')
};

export const currentSiteVariant = parseSiteVariant(process.env.NEXT_PUBLIC_HOME_URL);
export const currentLanguageRegion = parseLanguageRegion(process.env.NEXT_PUBLIC_LANGUAGE_REGION);
export const currentSiteBaseUrl = siteBaseUrls[currentSiteVariant];

export function getSiteBaseUrl(variant: SiteVariant) {
  return siteBaseUrls[variant];
}

export function getLocaleOwner(locale: string): SiteVariant {
  return localeRouting[normalizeLocale(locale)].owner;
}

export function getLocaleHreflang(locale: string) {
  return localeRouting[normalizeLocale(locale)].hreflang;
}

export function getPublishedLocaleCodes(variant: SiteVariant = currentSiteVariant): LocaleCode[] {
  return supportedLocaleCodes.filter((locale) => localeRouting[locale].owner === variant);
}

/**
 * Returns the locales included in this deployment's static build.
 *
 * The language region is deliberately independent from site ownership: `zh`
 * builds only Simplified Chinese, while `international` builds every locale
 * except Simplified Chinese. The site variant still controls canonical hosts
 * and cross-domain ownership.
 */
export function getAvailableLocaleCodes(
  region: LanguageRegion = currentLanguageRegion
): LocaleCode[] {
  if (region === 'zh') return ['zh'];
  return supportedLocaleCodes.filter((locale) => locale !== 'zh');
}

export function getDefaultLocaleForLanguageRegion(
  region: LanguageRegion = currentLanguageRegion
): LocaleCode {
  return region === 'zh' ? 'zh' : 'en';
}

export function getPublishedPrefixedLocaleCodes(
  defaultLocale: string,
  variant: SiteVariant = currentSiteVariant
) {
  const normalizedDefaultLocale = normalizeLocale(defaultLocale);
  return getPublishedLocaleCodes(variant).filter((locale) => locale !== normalizedDefaultLocale);
}

export function getBuildLocaleCodes(region: LanguageRegion = currentLanguageRegion) {
  const normalizedDefaultLocale = getDefaultLocaleForLanguageRegion(region);
  const prefixedLocales = getAvailableLocaleCodes(region).filter(
    (locale) => locale !== normalizedDefaultLocale
  );
  return prefixedLocales.length ? prefixedLocales : [normalizedDefaultLocale];
}

export function getOwnedLocalePath(locale: string, path = '') {
  const normalizedLocale = normalizeLocale(locale);
  const normalizedPath = normalizePath(path);

  if (normalizedLocale === 'en' || normalizedLocale === 'zh') {
    return normalizedPath;
  }

  return `/${normalizedLocale}${normalizedPath === '/' ? '' : normalizedPath}` || '/';
}

export function getOwnedLocaleUrl(locale: string, path = '') {
  const normalizedLocale = normalizeLocale(locale);
  return `${getSiteBaseUrl(getLocaleOwner(normalizedLocale))}${getOwnedLocalePath(
    normalizedLocale,
    path
  )}`;
}

export function getOwnedFaqPath(locale: string, faqId?: string) {
  const path = faqId ? `/faq/${encodeURIComponent(faqId)}` : '/faq';
  return getOwnedLocalePath(locale, path);
}

export function getOwnedFaqUrl(locale: string, faqId?: string) {
  const normalizedLocale = normalizeLocale(locale);
  return `${getSiteBaseUrl(getLocaleOwner(normalizedLocale))}${getOwnedFaqPath(
    normalizedLocale,
    faqId
  )}`;
}

function parseSiteVariant(homeUrl: string | undefined): SiteVariant {
  const configuredHomeUrl = homeUrl || 'https://fastgpt.cn';
  return new URL(configuredHomeUrl).hostname.endsWith('.cn') ? 'cn' : 'io';
}

function parseLanguageRegion(value: string | undefined): LanguageRegion {
  if (value === 'zh' || value === 'international') return value;
  // Keep the safe default on the domestic Simplified Chinese build.
  return 'zh';
}

function stripTrailingSlash(value: string) {
  return value.replace(/\/$/, '');
}

function normalizePath(path: string) {
  if (!path || path === '/') return '/';
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
  return withLeadingSlash.replace(/\/$/, '');
}
