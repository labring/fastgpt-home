import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getGitHubStars(): Promise<number> {
  try {
    const { stargazers_count } = await (
      await fetch('https://api.github.com/repos/labring/FastGPT')
    ).json();

    return stargazers_count || 25000;
  } catch (error) {
    return 25000;
  }
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
