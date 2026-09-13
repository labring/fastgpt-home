import { absoluteUrl } from '@customers/lib/site-url';

export function buildSiteJsonLd() {
  const siteUrl = absoluteUrl('/');

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'FastGPT',
      alternateName: 'FastGPT 客户案例中心',
      url: siteUrl,
      logo: absoluteUrl('/og-image.png')
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'FastGPT 客户案例中心',
      url: siteUrl
    }
  ];
}

export function buildCategoryJsonLd(category: { name: string; slug: string }) {
  const categoryUrl = absoluteUrl(`/categories/${category.slug}`);

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${category.name}解决方案`,
      url: categoryUrl,
      description: `浏览 FastGPT ${category.name} 行业解决方案，了解企业级 AI 落地场景、价值数据、案例详情与免费 POC 验证路径。`
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '首页',
          item: absoluteUrl('/')
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: category.name,
          item: categoryUrl
        }
      ]
    }
  ];
}
