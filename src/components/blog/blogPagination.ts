import type { BlogPost } from '@/content/blog';

export const BLOG_PAGE_SIZE = 9;
export const BLOG_CATEGORIES = ['product', 'engineering', 'industry'] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogListPost = Pick<
  BlogPost,
  'locale' | 'slug' | 'category' | 'title' | 'summary' | 'thumbnail'
> & {
  date: string;
  href?: string;
};

export function toBlogListPost(post: BlogPost): BlogListPost {
  return {
    locale: post.locale,
    slug: post.slug,
    category: post.category,
    date: post.date.toISOString(),
    title: post.title,
    summary: post.summary,
    thumbnail: post.thumbnail
  };
}

export function getBlogPostKey(post: Pick<BlogListPost, 'locale' | 'slug' | 'href'>) {
  return post.href || `${post.locale}/${post.slug}`;
}
