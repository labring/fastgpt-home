import { normalizeLocale, supportedLocaleCodes } from '@/lib/locales';

export const buildDefaultLocale =
  process.env.NEXT_PUBLIC_SITE_VARIANT === 'cn' ||
  (process.env.NEXT_PUBLIC_SITE_VARIANT === undefined &&
    (process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.cn').includes('.cn'))
    ? 'zh'
    : 'en';

function normalizeRouteLocale(locale: string) {
  const normalized = locale.toLowerCase().replace(/_/g, '-');
  if (
    normalized.startsWith('zh-hant') ||
    normalized.startsWith('zh-tw') ||
    normalized.startsWith('zh-hk') ||
    normalized.startsWith('zh-mo')
  ) {
    return 'zh-hant';
  }
  if (normalized.startsWith('zh')) return 'zh';
  return normalized.split('-')[0] || 'en';
}

export function getDefaultLocalePath(locale: string, path = '') {
  const normalizedLocale = normalizeRouteLocale(locale);
  const normalizedPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  const canonicalPath = normalizedPath === '/' ? '' : normalizedPath.replace(/\/$/, '');

  if (normalizedLocale === buildDefaultLocale) {
    return canonicalPath || '/';
  }

  return `/${normalizedLocale}${canonicalPath}`;
}

export function rememberPreferredLanguage(value: string) {
  try {
    localStorage.setItem('preferredLang', value);
  } catch {
    // Navigation remains available when browser storage is blocked.
  }
  try {
    document.cookie = `NEXT_LOCALE=${value};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
  } catch {
    // Cookie persistence is best effort, independently of localStorage.
  }
}

/** Keep navigation URL resolution independent of CSS class-merging dependencies. */
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
