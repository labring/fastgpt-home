import { normalizeLocale, type LocaleCode } from '@/lib/locales';

export const contactPublishedLocaleCodes = ['en', 'zh', 'zh-hant'] as const;
export const faqPublishedLocaleCodes = ['en', 'zh'] as const;
export const comparisonPublishedLocaleCodes = faqPublishedLocaleCodes;
export const techPublishedLocaleCodes = ['zh'] as const;

export type ContactPublishedLocale = (typeof contactPublishedLocaleCodes)[number];

export function isContactPublishedLocale(locale: LocaleCode) {
  return contactPublishedLocaleCodes.includes(locale as ContactPublishedLocale);
}

export function getContactPublishedLocale(locale: string): ContactPublishedLocale {
  const normalized = normalizeLocale(locale);
  return isContactPublishedLocale(normalized) ? (normalized as ContactPublishedLocale) : 'en';
}
