import { normalizeLocale } from '@/lib/locales';
import { getDefaultLocaleForSiteVariant } from '@/lib/siteRouting';
import { getFaqRouteKey, resolveFaqContentId, resolveFaqLocale } from '@/faq';

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
  if (!id) return getDefaultLocalePath(locale, '/faq');

  const faqLocale = resolveFaqLocale(locale);
  const contentId = resolveFaqContentId(id, faqLocale);
  const routeKey = contentId ? getFaqRouteKey(contentId, faqLocale) : undefined;
  if (!contentId || !routeKey) {
    throw new Error(`Unknown FAQ route identity: ${id} (${faqLocale})`);
  }

  const path = `/faq/${encodeURIComponent(routeKey)}`;
  return getDefaultLocalePath(locale, path);
}
