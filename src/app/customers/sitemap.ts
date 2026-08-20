import type { MetadataRoute } from 'next';
import { getAllPublishedCustomers, getCategories } from '@/customers/lib/data';
import { absoluteUrl } from '@/customers/lib/site-url';
import { getCustomerPublicHref } from '@/customers/lib/customer-url';

// sitemap 依赖 DB，必须保持按需渲染：构建期预渲染会在无 DB 环境导致构建失败。
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, customers] = await Promise.all([
    getCategories(),
    getAllPublishedCustomers()
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

  // 只收录最终 canonical URL：缺 slug 的客户会走 308 重定向，不应进 sitemap。
  // lastModified 缺日期时回退 now，避免 Invalid Date。
  const customerRoutes: MetadataRoute.Sitemap = customers
    .filter((customer) => customer.categorySlug && customer.slug)
    .map((customer) => {
      const rawDate = customer.updatedAt || customer.createdAt;
      const parsed = rawDate ? new Date(rawDate) : null;
      return {
        url: absoluteUrl(getCustomerPublicHref(customer)),
        lastModified: parsed && !Number.isNaN(parsed.getTime()) ? parsed : now,
        changeFrequency: 'weekly',
        priority: 0.9
      };
    });

  return [...staticRoutes, ...categoryRoutes, ...customerRoutes];
}
