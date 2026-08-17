import { normalizeLocale } from '@/lib/locales';

export const contactLocaleCodes = ['zh', 'en', 'zh-hant'] as const;

export function getContactLocale(locale: string) {
  const normalized = normalizeLocale(locale);
  return normalized === 'zh' || normalized === 'zh-hant' ? normalized : 'en';
}

export function getContactUrl(locale: string): string {
  return `/${getContactLocale(locale)}/contact`;
}
