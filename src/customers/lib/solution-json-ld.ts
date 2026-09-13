import { absoluteUrl } from '@customers/lib/site-url';
import { getSolutionPublicHref } from '@customers/lib/solution-url';

/**
 * 方案/案例详情页 JSON-LD 构建器（TechArticle + BreadcrumbList）。
 *
 * 第一性原理：
 * - canonical 唯一权威地址 = 语义 slug URL（公开为 `/customers/{分类}/{slug}`），
 *   JSON-LD 的 `url` 与 `mainEntityOfPage` 必须与 canonical 一致；
 * - Google Article 富媒体结果要求 headline / image / author / datePublished /
 *   dateModified / publisher，故 TechArticle 必须带 author 与 publisher；
 * - BreadcrumbList 用于表达「首页 → 分类 → 详情」路径层级。
 *
 * 本文件不依赖 Next.js 运行时，便于单测锁定结构与必填字段。
 */

export type SolutionJsonLdSource = {
  id: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  title: string;
  description: string;
  imageUrl?: string;
  publishedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export function buildSolutionJsonLd(solution: SolutionJsonLdSource) {
  const pageUrl = absoluteUrl(getSolutionPublicHref(solution));
  const imageUrl = solution.imageUrl?.startsWith('http')
    ? solution.imageUrl
    : absoluteUrl(solution.imageUrl || '/fastgpt.svg');
  const author = {
    '@type': 'Organization',
    name: 'FastGPT',
    url: absoluteUrl('/')
  } as const;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: solution.title,
      description: solution.description,
      image: imageUrl,
      datePublished: solution.publishedAt || solution.createdAt,
      dateModified: solution.updatedAt,
      articleSection: solution.categoryName,
      inLanguage: 'zh-CN',
      url: pageUrl,
      mainEntityOfPage: pageUrl,
      author,
      publisher: author
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
          name: solution.categoryName,
          item: absoluteUrl(`/categories/${solution.categorySlug}`)
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: solution.title,
          item: pageUrl
        }
      ]
    }
  ];
}
