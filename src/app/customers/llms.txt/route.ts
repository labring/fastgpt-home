import { getAllPublishedCustomers, getCategories } from '@/customers/lib/data';
import { absoluteUrl } from '@/customers/lib/site-url';
import { createPlainTextResponse } from '@/customers/lib/customer-readable-content';
import { getCustomerPublicHref } from '@/customers/lib/customer-url';
import { withLlmIndexCache } from '@/customers/lib/llm-index-cache';
import { formatCaseName } from '@/customers/lib/ai-readable-directory';

// 保持动态：依赖 DB，构建期预渲染会在无 DB 环境导致构建失败
export const dynamic = 'force-dynamic';

export async function GET() {
  const content = await withLlmIndexCache('llms.txt', 300000, async () => {
    const [categories, customers] = await Promise.all([
      getCategories(),
      getAllPublishedCustomers()
    ]);

    const customersByCategory = new Map<string, typeof customers>();

    for (const category of categories) {
      customersByCategory.set(category.slug, []);
    }

    for (const customer of customers) {
      const currentCustomers = customersByCategory.get(customer.categorySlug) || [];
      currentCustomers.push(customer);
      customersByCategory.set(customer.categorySlug, currentCustomers);
    }

    const lines = [
      '# FastGPT 客户案例中心',
      '',
      'FastGPT 客户案例中心展示企业如何基于 FastGPT 落地 AI 知识库、工作流、智能客服、报销审批、售前售后、数据查询等场景。这里的内容面向企业决策者、技术负责人、业务负责人和采购评审人员。',
      '',
      '## 如何浏览',
      '',
      `- 首页：${absoluteUrl('/')}`,
      `- 全部客户案例：${absoluteUrl('/#customers')}`,
      `- 行业分类：${absoluteUrl('/categories')}`,
      `- 完整 AI 内容索引：${absoluteUrl('/llms-full.txt')}`,
      `- Sitemap：${absoluteUrl('/sitemap.xml')}`,
      '',
      '## 如何预约联系',
      '',
      '如需验证某个方案是否适合你的业务，可进入方案详情页申请免费 POC。商务顾问将在 1 天内联系你，确认需求后最快 3 天交付 POC 验证。FastGPT 团队会基于真实业务数据评估知识库接入、系统集成、AI 解决率、响应时间和人工分流效果，并助力后续生产级交付。',
      '',
      '## 行业分类',
      ''
    ];

    for (const category of categories) {
      const categoryCustomers = customersByCategory.get(category.slug) || [];
      lines.push(`- ${category.name}：${absoluteUrl(`/categories/${category.slug}`)}（${categoryCustomers.length} 个客户案例）`);
    }

    lines.push('', '## 客户案例目录', '');

    for (const category of categories) {
      const categoryCustomers = customersByCategory.get(category.slug) || [];
      if (categoryCustomers.length === 0) {
        continue;
      }

      lines.push(`### ${category.name}`, '');
      for (const customer of categoryCustomers) {
        lines.push(`- ${formatCaseName(customer)}：${absoluteUrl(getCustomerPublicHref(customer))}`);
        lines.push(`  - 简介：${customer.description}`);
        lines.push(`  - 纯文本版本：${absoluteUrl(`/customer/${customer.id}/markdown`)}`);
      }
      lines.push('');
    }

    lines.push(`更新时间：${new Date().toISOString()}`);

    return lines.join('\n');
  });

  return createPlainTextResponse(content);
}
