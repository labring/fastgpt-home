import type { BlogCategory } from './blogPagination';

import { normalizeLocale } from '@/lib/locales';
import { getLocaleOwner, getSiteBaseUrl } from '@/lib/siteRouting';

export const FEATURED_DEFAULT_THUMBNAIL = '/images/blog/featured-default.svg';

export const CATEGORY_DEFAULT_THUMBNAILS: Partial<Record<BlogCategory, string>> = {
  engineering: '/images/blog/engineering-default.svg',
  product: '/images/blog/product-default.svg'
};

export const BLOG_OG_THUMBNAIL_SEGMENT = '1200x630@3x.png';
export const BLOG_COVER_THUMBNAIL_SEGMENT = '800x600.notitle.svg';
export const BLOG_FEATURED_COVER_THUMBNAIL_SEGMENT = '800x600.notitle.featured.svg';

export function getDefaultBlogThumbnail(category: BlogCategory) {
  return CATEGORY_DEFAULT_THUMBNAILS[category] || FEATURED_DEFAULT_THUMBNAIL;
}

function getBlogThumbnailRoutePath(locale: string, slug: string, segment: string) {
  return `/api/blog/${normalizeLocale(locale)}/${slug}/thumbnail/${segment}`;
}

export function getBlogThumbnailPath(locale: string, slug: string, segment: string) {
  return getBlogThumbnailRoutePath(locale, slug, segment);
}

export function getBlogThumbnailUrl(locale: string, slug: string, segment: string) {
  return `${getSiteBaseUrl(getLocaleOwner(locale))}${getBlogThumbnailRoutePath(
    locale,
    slug,
    segment
  )}`;
}

export function getBlogCoverPath(locale: string, slug: string) {
  return getBlogThumbnailPath(locale, slug, BLOG_COVER_THUMBNAIL_SEGMENT);
}

export function getBlogFeaturedCoverPath(locale: string, slug: string) {
  return getBlogThumbnailPath(locale, slug, BLOG_FEATURED_COVER_THUMBNAIL_SEGMENT);
}
