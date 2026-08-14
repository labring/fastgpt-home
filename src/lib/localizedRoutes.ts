import { normalizeLocale } from '@/lib/locales';
import { getDefaultLocaleForLanguageRegion } from '@/lib/siteRouting';

export const buildDefaultLocale = getDefaultLocaleForLanguageRegion();

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
  const path = id ? `/faq/${encodeURIComponent(id)}` : '/faq';
  return getDefaultLocalePath(locale, path);
}
