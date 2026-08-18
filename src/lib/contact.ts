import { normalizeLocale } from '@/lib/locales';
import { getDefaultLocalePath } from '@/lib/clientNavigation';
import { ATTRIBUTION_QUERY_KEYS } from '@/lib/attribution/primitives/envelope';

export const contactLocaleCodes = ['zh', 'en', 'zh-hant'] as const;

export function getContactLocale(locale: string) {
  const normalized = normalizeLocale(locale);
  return normalized === 'zh' || normalized === 'zh-hant' ? normalized : 'en';
}

export function getContactUrl(locale: string, search = ''): string {
  const path = getDefaultLocalePath(getContactLocale(locale), '/contact');
  const incoming = new URLSearchParams(search);
  const forwarded = new URLSearchParams();

  ATTRIBUTION_QUERY_KEYS.forEach((key) => {
    const value = incoming.get(key);
    if (value) forwarded.set(key, value);
  });

  const query = forwarded.toString();
  return query ? `${path}?${query}` : path;
}
