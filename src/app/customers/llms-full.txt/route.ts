import { getAllPublishedSolutionDetails, getCategories } from '@/customers/lib/data';
import { absoluteUrl } from '@/customers/lib/site-url';
import {
  createPlainTextResponse,
  markdownToReadableText
} from '@/customers/lib/solution-readable-content';
import { getSolutionPublicHref } from '@/customers/lib/solution-url';
import { withLlmIndexCache } from '@/customers/lib/llm-index-cache';

// 保持动态：依赖 DB，构建期预渲染会在无 DB 环境导致构建失败
export const dynamic = 'force-dynamic';

export async function GET() {
  const content = await withLlmIndexCache('llms-full.txt', 300000, async () => {
    const [categories, solutions] = await Promise.all([
      getCategories(),
      getAllPublishedSolutionDetails()
    ]);

    const lines = [
      '# FastGPT 客户案例中心完整 AI 索引',
      '',
      '本文件为 AI 助手和搜索系统提供 FastGPT 客户案例中心的完整文本摘要。所有条目均来自已发布解决方案。',
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
      const count = solutions.filter((solution) => solution.categorySlug === category.slug).length;
      lines.push(`- ${category.name}：${absoluteUrl(`/categories/${category.slug}`)}（${count} 个解决方案）`);
    }

    lines.push('', '## 解决方案全文摘要', '');

    for (const solution of solutions) {
      lines.push(`### ${solution.title}`);
      lines.push('');
      lines.push(`- 分类：${solution.categoryName}`);
      lines.push(`- 详情页：${absoluteUrl(getSolutionPublicHref(solution))}`);
      lines.push(`- 纯文本版本：${absoluteUrl(`/solution/${solution.slug || solution.id}/markdown`)}`);
      lines.push(`- 更新时间：${solution.updatedAt}`);
      lines.push(`- 简介：${solution.description}`);
      lines.push('');
      lines.push(markdownToReadableText(solution.content, { maxLength: 8000 }));
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
