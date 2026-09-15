import { BLOG_CATEGORIES } from '@/components/blog/blogPagination';

import { getBlogPage, getBlogPageParams, isBlogCategory } from '../../blogApi';

export const dynamicParams = false;

type BlogPageParams = {
  params: Promise<{ locale: string; path?: string[] }>;
};

export function generateStaticParams() {
  const allPages = getBlogPageParams().map(({ locale, page }) => ({
    locale,
    path: [page]
  }));
  const categoryPages = BLOG_CATEGORIES.flatMap((category) =>
    getBlogPageParams(category).map(({ locale, page }) => ({
      locale,
      path: [category, page]
    }))
  );

  return [...allPages, ...categoryPages];
}

export async function GET(_request: Request, { params }: BlogPageParams) {
  const { locale, path = [] } = await params;
  const category = path.length === 2 ? path[0] : undefined;
  const page = path.length === 1 ? path[0] : path.length === 2 ? path[1] : undefined;
  const result =
    (category === undefined || isBlogCategory(category)) && page
      ? getBlogPage(locale, Number(page), category)
      : null;

  return result
    ? Response.json(result)
    : Response.json({ error: 'Blog page not found' }, { status: 404 });
}
