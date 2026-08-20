import { getAllPublishedCustomerDetails, getCategories } from '@/customers/lib/data';
import { absoluteUrl } from '@/customers/lib/site-url';
import {
  createPlainTextResponse,
  markdownToReadableText
} from '@/customers/lib/customer-readable-content';
import { getCustomerPublicHref } from '@/customers/lib/customer-url';
import { withLlmIndexCache } from '@/customers/lib/llm-index-cache';

// 保持动态：依赖 DB，构建期预渲染会在无 DB 环境导致构建失败
export const dynamic = 'force-dynamic';

export async function GET() {
  const content = await withLlmIndexCache('llms-full.txt', 300000, async () => {
    const [categories, customers] = await Promise.all([
      getCategories(),
      getAllPublishedCustomerDetails()
    ]);

    const lines = [
      '# FastGPT 客户案例中心完整 AI 索引',
      '',
      '本文件为 AI 助手和搜索系统提供 FastGPT 客户案例中心的完整文本摘要。所有条目均来自已发布客户案例。',
      '',
      `首页：${absoluteUrl('/')}`,
      `行业分类：${absoluteUrl('/categories')}`,
      `Sitemap：${absoluteUrl('/sitemap.xml')}`,
      '',
      '## 站点说明',
      '',
      'FastGPT 客户案例中心按行业与业务场景组织企业级 AI 落地方案。每篇文章通常包含业务挑战、落地架构、价值数据、真实使用场景、企业级选型价值和免费 POC 验证路径。',
      '',
      '## 分类总览',
      ''
    ];

    for (const category of categories) {
      const count = customers.filter((customer) => customer.categorySlug === category.slug).length;
      lines.push(`- ${category.name}：${absoluteUrl(`/categories/${category.slug}`)}（${count} 个客户案例）`);
    }

    lines.push('', '## 客户案例全文摘要', '');

    for (const customer of customers) {
      lines.push(`### ${customer.title}`);
      lines.push('');
      lines.push(`- 分类：${customer.categoryName}`);
      lines.push(`- 详情页：${absoluteUrl(getCustomerPublicHref(customer))}`);
      lines.push(`- 纯文本版本：${absoluteUrl(`/customer/${customer.slug || customer.id}/markdown`)}`);
      lines.push(`- 更新时间：${customer.updatedAt}`);
      lines.push(`- 简介：${customer.description}`);
      lines.push('');
      lines.push(markdownToReadableText(customer.content, { maxLength: 8000 }));
      lines.push('');
    }

    lines.push('## 预约方式', '');
    lines.push('进入任意方案详情页申请免费 POC。商务顾问将在 1 天内联系你，确认需求后最快 3 天交付 POC 验证。FastGPT 团队会基于真实业务数据验证方案效果，并助力后续生产级交付。');
    lines.push('');
    lines.push(`更新时间：${new Date().toISOString()}`);

    return lines.join('\n');
  });

  return createPlainTextResponse(content);
}
