import { NextRequest, NextResponse } from 'next/server';
import { generateCustomerCover } from '@/customers/lib/customer-cover';
import { requireAdminApi } from '@/customers/lib/admin-api';
import { readJsonRecord } from '@/customers/lib/request-json';

export async function POST(req: NextRequest) {
  const auth = await requireAdminApi(req);
  if (!auth.ok) {
    return auth.response;
  }

  try {
    const body = await readJsonRecord(req);
    const title = String(body.title || '').trim();
    const description = String(body.description || '').trim();
    const content = String(body.content || '').trim();
    const storageFolder = String(body.storageFolder || title || 'untitled').trim();

    const result = await generateCustomerCover({
      title,
      description,
      storageFolder,
      content
    });

    return NextResponse.json({
      success: true,
      imageUrl: result.imageUrl,
      thumbnailUrl: result.thumbnailUrl,
      query: result.query,
      reason: result.reason,
      source: result.source
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'AI 匹配封面失败';
    const status =
      message === '请先填写标题、描述或正文内容'
        ? 400
        : message === '没有找到合适的横向封面图，请补充更具体的标题或描述'
          ? 404
          : 500;

    console.error('AI cover search error:', error);
    return NextResponse.json(
      {
        success: false,
        error: message
      },
      { status }
    );
  }
}
