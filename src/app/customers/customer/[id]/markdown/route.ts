import { getCustomerByIdPublic } from '@/customers/lib/data';
import { absoluteUrl } from '@/customers/lib/site-url';
import { getCustomerPublicHref } from '@/customers/lib/customer-url';
import {
  createPlainTextResponse,
  markdownToReadableMarkdown
} from '@/customers/lib/customer-readable-content';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const customer = await getCustomerByIdPublic(id);

  if (!customer) {
    return new Response('Customer not found', { status: 404 });
  }

  const lines = [
    `# ${customer.title}`,
    '',
    `分类：${customer.categoryName}`,
    `详情页：${absoluteUrl(getCustomerPublicHref(customer))}`,
    `发布时间：${customer.createdAt}`,
    `更新时间：${customer.updatedAt}`,
    '',
    `简介：${customer.description}`,
    '',
    '预约方式：如需验证该方案是否适合你的业务，可进入详情页申请免费 POC。商务顾问将在 1 天内联系你，确认需求后最快 3 天交付 POC 验证，助力后续生产级交付。',
    '',
    '---',
    '',
    markdownToReadableMarkdown(customer.content)
  ];

  return createPlainTextResponse(lines.join('\n'));
}
