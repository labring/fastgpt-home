import { normalizeLocale } from '@/lib/locales';

export const buildDefaultLocale = normalizeLocale(process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en');

export function getDefaultLocalePath(locale: string, path = '') {
  const normalizedLocale = normalizeLocale(locale);
  const normalizedPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';

  if (normalizedLocale === buildDefaultLocale) {
    return normalizedPath || '/';
  }

  return `/${normalizedLocale}${normalizedPath}`;
}

export function getFaqPath(locale: string, id?: string) {
  const path = id ? `/faq/${encodeURIComponent(id)}` : '/faq';
  return getDefaultLocalePath(locale, path);
}
