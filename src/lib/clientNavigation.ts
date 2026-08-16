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
  localStorage.setItem('preferredLang', value);
  document.cookie = `NEXT_LOCALE=${value};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
}

export function navigateTo(path: string) {
  window.location.assign(path);
}
