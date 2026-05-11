import {
  siteConfig,
  siteConfigAr,
  siteConfigId,
  siteConfigJa,
  siteConfigMs,
  siteConfigTh,
  siteConfigVi,
  siteConfigZh
} from '@/config/site';
import { localeNames, normalizeLocale, supportedLocaleCodes } from '@/lib/locales';

export { localeNames, normalizeLocale, supportedLocaleCodes };

export const defaultLocale = normalizeLocale(process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en');

/**
 * Get site config for a given locale
 */
export function getConfigForLocale(locale: string) {
  const normalized = normalizeLocale(locale);
  switch (normalized) {
    case 'zh':
      return siteConfigZh;
    case 'ja':
      return siteConfigJa;
    case 'ar':
      return siteConfigAr;
    case 'vi':
      return siteConfigVi;
    case 'th':
      return siteConfigTh;
    case 'id':
      return siteConfigId;
    case 'ms':
      return siteConfigMs;
    default:
      return siteConfig;
  }
}

const dictionaries: any = {
  en: () => import('@/locales/en.json').then((module) => module.default),
  zh: () => import('@/locales/zh.json').then((module) => module.default),
  ja: () => import('@/locales/ja.json').then((module) => module.default),
  ar: () => import('@/locales/ar.json').then((module) => module.default),
  vi: () => import('@/locales/vi.json').then((module) => module.default),
  th: () => import('@/locales/th.json').then((module) => module.default),
  id: () => import('@/locales/id.json').then((module) => module.default),
  ms: () => import('@/locales/ms.json').then((module) => module.default)
};

export const getDictionary = async (locale: string) => {
  locale = normalizeLocale(locale);

  if (!supportedLocaleCodes.includes(locale as any)) {
    locale = 'en';
  }

  return dictionaries[locale]();
};
