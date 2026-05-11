import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

  if (href.startsWith('/') && !href.startsWith(`/${lang}`)) {
    return `/${lang}${href}`;
  }

  return href;
}
