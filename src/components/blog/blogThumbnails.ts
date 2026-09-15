import type { BlogCategory } from './blogPagination';

export const FEATURED_DEFAULT_THUMBNAIL = '/images/blog/featured-default.svg';

export const CATEGORY_DEFAULT_THUMBNAILS: Partial<Record<BlogCategory, string>> = {
  engineering: '/images/blog/engineering-default.svg',
  product: '/images/blog/product-default.svg'
};

export function getDefaultBlogThumbnail(category: BlogCategory) {
  return CATEGORY_DEFAULT_THUMBNAILS[category] || FEATURED_DEFAULT_THUMBNAIL;
}
