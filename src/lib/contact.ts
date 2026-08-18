import { normalizeLocale } from '@/lib/locales';
import { getDefaultLocalePath } from '@/lib/clientNavigation';
import { appendForwardedAttributionQuery } from '@/lib/attribution/query.mjs';

export const contactLocaleCodes = ['zh', 'en', 'zh-hant'] as const;

export function getContactLocale(locale: string) {
  const normalized = normalizeLocale(locale);
  return normalized === 'zh' || normalized === 'zh-hant' ? normalized : 'en';
}

export function getContactUrl(locale: string, search = ''): string {
  const path = getDefaultLocalePath(getContactLocale(locale), '/contact');
  return appendForwardedAttributionQuery(path, search);
}
