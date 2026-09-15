import 'server-only';

import { getBlogBuildLocales, getPublishedBlogs } from '@/content/blog';
import {
  BLOG_CATEGORIES,
  BLOG_PAGE_SIZE,
  type BlogCategory,
  toBlogListPost
} from '@/components/blog/blogPagination';

const buildLocales = getBlogBuildLocales();

export function isBlogApiLocale(locale: string) {
  return buildLocales.includes(locale as (typeof buildLocales)[number]);
}

export function isBlogCategory(category: string): category is BlogCategory {
  return BLOG_CATEGORIES.includes(category as BlogCategory);
}

function getCategoryPosts(locale: string, category?: BlogCategory) {
  return getPublishedBlogs(locale).filter((post) => !category || post.category === category);
}

export function getBlogPageParams(category?: BlogCategory) {
  return buildLocales.flatMap((locale) => {
    const pageCount = Math.ceil(getCategoryPosts(locale, category).length / BLOG_PAGE_SIZE);
    return Array.from({ length: pageCount }, (_, index) => ({
      locale,
      ...(category ? { category } : {}),
      page: String(index + 1)
    }));
  });
}

export function getBlogPage(locale: string, page: number, category?: BlogCategory) {
  if (!isBlogApiLocale(locale) || !Number.isSafeInteger(page) || page < 1) return null;

  const posts = getCategoryPosts(locale, category);
  const start = (page - 1) * BLOG_PAGE_SIZE;
  if (start >= posts.length) return null;

  return {
    page,
    pageSize: BLOG_PAGE_SIZE,
    hasMore: start + BLOG_PAGE_SIZE < posts.length,
    posts: posts.slice(start, start + BLOG_PAGE_SIZE).map(toBlogListPost)
  };
}
