import siteRoutingManifest from '@/config/site-routing.json';
import { normalizeLocale, supportedLocaleCodes, type LocaleCode } from '@/lib/locales';

export type SiteVariant = keyof typeof siteRoutingManifest.siteVariants;
export type ProductionSiteVariant = Exclude<SiteVariant, 'preview'>;
export const siteVariants = Object.keys(siteRoutingManifest.siteVariants) as SiteVariant[];

const siteBaseUrls: Record<ProductionSiteVariant, string> = {
  cn: stripTrailingSlash(process.env.NEXT_PUBLIC_CN_HOME_URL || 'https://fastgpt.cn'),
  io: stripTrailingSlash(process.env.NEXT_PUBLIC_IO_HOME_URL || 'https://fastgpt.io')
};

export const currentSiteVariant = parseSiteVariant(
  process.env.NEXT_PUBLIC_SITE_VARIANT,
  process.env.NEXT_PUBLIC_HOME_URL
);
export const isPreviewSite = currentSiteVariant === 'preview';
export const currentSiteBaseUrl = siteBaseUrls[currentSiteVariant === 'cn' ? 'cn' : 'io'];

export function getSiteBaseUrl(variant: ProductionSiteVariant) {
  return siteBaseUrls[variant];
}

export function getLocaleOwner(locale: string): ProductionSiteVariant {
  return siteRoutingManifest.locales[normalizeLocale(locale)].owner as ProductionSiteVariant;
}

export function getLocaleHreflang(locale: string) {
  return siteRoutingManifest.locales[normalizeLocale(locale)].hreflang;
}

export function getPublishedLocaleCodes(variant: SiteVariant = currentSiteVariant): LocaleCode[] {
  if (variant === 'preview') return [...supportedLocaleCodes];
  return supportedLocaleCodes.filter(
    (locale) => siteRoutingManifest.locales[locale].owner === variant
  );
}

export function getDefaultLocaleForSiteVariant(
  variant: SiteVariant = currentSiteVariant
): LocaleCode {
  return siteRoutingManifest.siteVariants[variant].defaultLocale as LocaleCode;
}

export function getBuildLocaleCodes(variant: SiteVariant = currentSiteVariant) {
  const normalizedDefaultLocale = getDefaultLocaleForSiteVariant(variant);
  const prefixedLocales = getPublishedLocaleCodes(variant).filter(
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

/** Keep locale-prefixed review routes in Preview and owner-relative routes in production. */
export function getReviewLocalePath(locale: string, path = '') {
  const normalizedLocale = normalizeLocale(locale);
  const normalizedPath = normalizePath(path);
  return currentSiteVariant === 'preview'
    ? `/${normalizedLocale}${normalizedPath === '/' ? '' : normalizedPath}`
    : getOwnedLocalePath(normalizedLocale, normalizedPath);
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

function parseSiteVariant(value: string | undefined, homeUrl: string | undefined): SiteVariant {
  const configured = value?.trim();
  if (configured) {
    if (siteVariants.includes(configured as SiteVariant)) return configured as SiteVariant;
    throw new Error(`Invalid NEXT_PUBLIC_SITE_VARIANT: ${configured}`);
  }
  const configuredHomeUrl = homeUrl || 'https://fastgpt.cn';
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
