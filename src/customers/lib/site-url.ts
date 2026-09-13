import { getOwnedLocaleUrl } from '@/lib/siteRouting';
import { withBasePath } from '@customers/lib/base-path';

export function absoluteUrl(path = '/') {
  return getOwnedLocaleUrl('zh', withBasePath(path.startsWith('/') ? path : `/${path}`));
}
