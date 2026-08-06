import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
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
    return `/${lang}${href}`;
  }

  if (href === '/faq' || href.startsWith('/faq/')) {
    return getDefaultLocalePath(lang, href);
  }

  if (href.startsWith('/') && !href.startsWith(`/${lang}`)) {
    return `/${lang}${href}`;
  }

  return href;
}
