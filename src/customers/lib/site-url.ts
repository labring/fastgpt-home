const DEFAULT_SITE_URL = 'http://localhost:3000/customers';

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}

function normalizeSiteUrl(rawUrl?: string | null) {
  const trimmedUrl = rawUrl?.trim();
  if (!trimmedUrl) {
    return null;
  }

  const urlWithProtocol = /^https?:\/\//i.test(trimmedUrl)
    ? trimmedUrl
    : `https://${trimmedUrl}`;

  try {
    return trimTrailingSlash(new URL(urlWithProtocol).toString());
  } catch {
    return null;
  }
}

/**
 * 站点公开地址的唯一环境变量来源：SITE_URL。
 * 用于 canonical / og:url / JSON-LD / sitemap / robots / llms.txt 等所有绝对 URL。
 * 本地开发为 http://localhost:3000；生产环境必须设置为 https://fastgpt.cn/customers。
 */
export function getSiteUrl() {
  return normalizeSiteUrl(process.env.SITE_URL) || DEFAULT_SITE_URL;
}

export function absoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return normalizedPath === '/' ? getSiteUrl() : `${getSiteUrl()}${normalizedPath}`;
}
