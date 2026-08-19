import { getSolutionByIdPublic } from '@/customers/lib/data';
import { absoluteUrl } from '@/customers/lib/site-url';
import { getSolutionPublicHref } from '@/customers/lib/solution-url';
import {
  createPlainTextResponse,
  markdownToReadableMarkdown
} from '@/customers/lib/solution-readable-content';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const solution = await getSolutionByIdPublic(id);

  if (!solution) {
    return new Response('Solution not found', { status: 404 });
  }

  const lines = [
    `# ${solution.title}`,
    '',
    `分类：${solution.categoryName}`,
    `详情页：${absoluteUrl(getSolutionPublicHref(solution))}`,
    `发布时间：${solution.createdAt}`,
    `更新时间：${solution.updatedAt}`,
    '',
    `简介：${solution.description}`,
    '',
    '预约方式：如需验证该方案是否适合你的业务，可进入详情页申请免费 POC。商务顾问将在 1 天内联系你，确认需求后最快 3 天交付 POC 验证，助力后续生产级交付。',
    '',
    '---',
    '',
    markdownToReadableMarkdown(solution.content)
  ];

  return createPlainTextResponse(lines.join('\n'));
}
