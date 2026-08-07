import { normalizeLocale, supportedLocaleCodes, type LocaleCode } from '@/lib/locales';

export const siteVariants = ['cn', 'io'] as const;
export type SiteVariant = (typeof siteVariants)[number];

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

export const currentSiteVariant = parseSiteVariant(process.env.NEXT_PUBLIC_SITE_VARIANT);
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

export function getPublishedPrefixedLocaleCodes(
  defaultLocale: string,
  variant: SiteVariant = currentSiteVariant
) {
  const normalizedDefaultLocale = normalizeLocale(defaultLocale);
  return getPublishedLocaleCodes(variant).filter((locale) => locale !== normalizedDefaultLocale);
}

export function getBuildLocaleCodes(
  defaultLocale: string,
  variant: SiteVariant = currentSiteVariant
) {
  const publishedLocales = getPublishedPrefixedLocaleCodes(defaultLocale, variant);
  return publishedLocales.length ? publishedLocales : [normalizeLocale(defaultLocale)];
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

function parseSiteVariant(value: string | undefined): SiteVariant {
  if (value === 'cn' || value === 'io') return value;

  const configuredHomeUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io';
  return new URL(configuredHomeUrl).hostname.endsWith('.cn') ? 'cn' : 'io';
}

function stripTrailingSlash(value: string) {
  return value.replace(/\/$/, '');
}

function normalizePath(path: string) {
  if (!path || path === '/') return '/';
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
  return withLeadingSlash.replace(/\/$/, '');
}
