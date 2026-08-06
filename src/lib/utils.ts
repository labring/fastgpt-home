import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { normalizeLocale, supportedLocaleCodes } from '@/lib/locales';
import { getDefaultLocalePath } from '@/lib/localizedRoutes';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNavHref(href: string, lang: string): string {
  if (!href) return '/';
  href = href.trim();

  if (/^(https?:)?\/\//.test(href)) {
    return href;
  }

  if (href.startsWith('#')) {
    return `${getDefaultLocalePath(lang)}${href}`;
  }

  if (!href.startsWith('/')) {
    return href;
  }

  const normalizedLang = normalizeLocale(lang);
  const explicitLocale = supportedLocaleCodes.find(
    (locale) => href === `/${locale}` || href.startsWith(`/${locale}/`)
  );

  if (explicitLocale && explicitLocale !== normalizedLang) {
    return href;
  }

  const routePath = explicitLocale ? href.slice(`/${explicitLocale}`.length) || '/' : href;
  return getDefaultLocalePath(lang, routePath);
}
