import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { siteConfig, siteConfigZh, siteConfigJa } from '@/config/site';

export const locales = ['', 'en', 'en-US', 'zh', 'zh-CN', 'zh-TW', 'zh-HK', 'ja', 'ar', 'es'];
export const localeNames: any = {
  en: 'English',
  zh: '中文',
  ja: '日本語'
};

/**
 * Normalize locale to base language code (zh-CN → zh, en-US → en, etc.)
 */
export function normalizeLocale(locale: string): string {
  if (locale.startsWith('zh')) return 'zh';
  if (locale.startsWith('en')) return 'en';
  if (locale.startsWith('ja')) return 'ja';
  return 'en'; // fallback
}

export const defaultLocale = normalizeLocale(process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en');

/**
 * Get site config for a given locale
 */
export function getConfigForLocale(locale: string) {
  const normalized = normalizeLocale(locale);
  switch (normalized) {
    case 'zh': return siteConfigZh;
    case 'ja': return siteConfigJa;
    default: return siteConfig;
  }
}

// If you wish to automatically redirect users to a URL that matches their browser's language setting,
// you can use the `getLocale` to get the browser's language.
export function getLocale(headers: any): string {
  let languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
}

const dictionaries: any = {
  en: () => import('@/locales/en.json').then((module) => module.default),
  zh: () => import('@/locales/zh.json').then((module) => module.default),
  ja: () => import('@/locales/ja.json').then((module) => module.default)
};

export const getDictionary = async (locale: string) => {
  if (['zh-CN', 'zh-TW', 'zh-HK'].includes(locale)) {
    locale = 'zh';
  }

  if (!Object.keys(dictionaries).includes(locale)) {
    locale = 'en';
  }

  return dictionaries[locale]();
};
