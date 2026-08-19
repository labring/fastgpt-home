import { describe, expect, it } from 'vitest';
import { buildSolutionJsonLd, type SolutionJsonLdSource } from './solution-json-ld';
import { absoluteUrl } from './site-url';

function makeSolution(overrides: Partial<SolutionJsonLdSource> = {}): SolutionJsonLdSource {
  return {
    id: 'obj-id',
    slug: 'financial-terminal-ai-search',
    categorySlug: 'finance-insurance-wealth-management',
    categoryName: '金融/保险/理财',
    title: '金融终端AI智能搜索',
    description: '案例描述',
    imageUrl: 'https://cdn.example.com/cover.jpg',
    publishedAt: '2026-08-06T00:00:00.000Z',
    createdAt: '2026-08-01T00:00:00.000Z',
    updatedAt: '2026-08-12T00:00:00.000Z',
    ...overrides
  };
}

describe('buildSolutionJsonLd', () => {
  const pageUrl = absoluteUrl(
    '/finance-insurance-wealth-management/financial-terminal-ai-search'
  );

  it('输出 TechArticle 与 BreadcrumbList 两个节点', () => {
    const jsonLd = buildSolutionJsonLd(makeSolution());
    expect(jsonLd).toHaveLength(2);
    expect(jsonLd.map((node) => node['@type'])).toEqual(['TechArticle', 'BreadcrumbList']);
  });

  it('TechArticle 必填字段齐全，url 与 canonical 一致且带 author', () => {
    const [techArticle] = buildSolutionJsonLd(makeSolution());
    expect(techArticle).toMatchObject({
      headline: '金融终端AI智能搜索',
      description: '案例描述',
      inLanguage: 'zh-CN',
      articleSection: '金融/保险/理财',
      url: pageUrl,
      mainEntityOfPage: pageUrl,
      datePublished: '2026-08-06T00:00:00.000Z',
      dateModified: '2026-08-12T00:00:00.000Z'
    });
    expect(techArticle.image).toBe('https://cdn.example.com/cover.jpg');
    expect(techArticle.author).toMatchObject({
      '@type': 'Organization',
      name: 'FastGPT',
      url: absoluteUrl('/')
    });
    expect(techArticle.publisher).toEqual(techArticle.author);
  });

  it('相对 imageUrl 会补全为绝对地址', () => {
    const [techArticle] = buildSolutionJsonLd(makeSolution({ imageUrl: '/uploads/cover.jpg' }));
    expect(techArticle.image).toBe(absoluteUrl('/uploads/cover.jpg'));
  });

  it('无 imageUrl 时回退 /fastgpt.svg 绝对地址', () => {
    const [techArticle] = buildSolutionJsonLd(makeSolution({ imageUrl: '' }));
    expect(techArticle.image).toBe(absoluteUrl('/fastgpt.svg'));
  });

  it('无 publishedAt 时回退 createdAt', () => {
    const [techArticle] = buildSolutionJsonLd(makeSolution({ publishedAt: null }));
    expect(techArticle.datePublished).toBe('2026-08-01T00:00:00.000Z');
  });

  it('BreadcrumbList 为「首页 → 分类 → 详情」三级且 URL 正确', () => {
    const [, breadcrumb] = buildSolutionJsonLd(makeSolution());
    expect(breadcrumb['@type']).toBe('BreadcrumbList');
    expect(breadcrumb.itemListElement).toHaveLength(3);
    expect(breadcrumb.itemListElement).toEqual([
      expect.objectContaining({ position: 1, name: '首页', item: absoluteUrl('/') }),
      expect.objectContaining({
        position: 2,
        name: '金融/保险/理财',
        item: absoluteUrl('/categories/finance-insurance-wealth-management')
      }),
      expect.objectContaining({ position: 3, name: '金融终端AI智能搜索', item: pageUrl })
    ]);
  });
});
