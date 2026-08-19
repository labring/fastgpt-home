import type { MetadataRoute } from 'next';
import { getAllPublishedSolutions, getCategories } from '@/customers/lib/data';
import { absoluteUrl } from '@/customers/lib/site-url';
import { getSolutionPublicHref } from '@/customers/lib/solution-url';

// 保持动态：sitemap 依赖 DB，构建期预渲染会在无 DB 环境导致构建失败
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, solutions] = await Promise.all([
    getCategories(),
    getAllPublishedSolutions()
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1
    }
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: absoluteUrl(`/categories/${category.slug}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7
  }));

  const solutionRoutes: MetadataRoute.Sitemap = solutions.map((solution) => ({
    url: absoluteUrl(getSolutionPublicHref(solution)),
    lastModified: new Date(solution.updatedAt || solution.createdAt),
    changeFrequency: 'weekly',
    priority: 0.9
  }));

  return [...staticRoutes, ...categoryRoutes, ...solutionRoutes];
}
