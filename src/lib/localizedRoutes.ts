import { normalizeLocale } from '@/lib/locales';
import { getDefaultLocaleForSiteVariant } from '@/lib/siteRouting';
import { getEnglishFaqCanonicalSlug, resolveFaqLocale } from '@/faq';

export const buildDefaultLocale = getDefaultLocaleForSiteVariant();

export function getDefaultLocalePath(locale: string, path = '') {
  const normalizedLocale = normalizeLocale(locale);
  const normalizedPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  const canonicalPath = normalizedPath === '/' ? '' : normalizedPath.replace(/\/$/, '');

  if (normalizedLocale === buildDefaultLocale) {
    return canonicalPath || '/';
  }

  return `/${normalizedLocale}${canonicalPath}`;
}

export function getFaqPath(locale: string, id?: string) {
  const canonicalId =
    id && resolveFaqLocale(locale) === 'en' ? getEnglishFaqCanonicalSlug(id) || id : id;
  const path = canonicalId ? `/faq/${encodeURIComponent(canonicalId)}` : '/faq';
  return getDefaultLocalePath(locale, path);
}
