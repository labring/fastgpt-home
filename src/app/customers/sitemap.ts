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

  const customerRoutes: MetadataRoute.Sitemap = customers.map((customer) => ({
    url: absoluteUrl(getCustomerPublicHref(customer)),
    lastModified: new Date(customer.updatedAt || customer.createdAt),
    changeFrequency: 'weekly',
    priority: 0.9
  }));

  return [...staticRoutes, ...categoryRoutes, ...customerRoutes];
}
