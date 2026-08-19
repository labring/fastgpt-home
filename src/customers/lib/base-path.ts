export const PUBLIC_BASE_PATH = '/customers';

/** Add the public mount prefix where Next.js does not apply basePath automatically. */
export function withBasePath(path: string) {
  if (
    !path.startsWith('/') ||
    path.startsWith('//') ||
    path === PUBLIC_BASE_PATH ||
    path.startsWith(`${PUBLIC_BASE_PATH}/`)
  ) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (normalizedPath.startsWith('/?') || normalizedPath.startsWith('/#')) {
    return `${PUBLIC_BASE_PATH}${normalizedPath.slice(1)}`;
  }
  return `${PUBLIC_BASE_PATH}${normalizedPath === '/' ? '' : normalizedPath}`;
}
