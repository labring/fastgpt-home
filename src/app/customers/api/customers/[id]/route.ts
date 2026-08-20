import { NextRequest, NextResponse } from 'next/server';
import { getCustomerById } from '@/customers/lib/data';
import { resolveCustomerObjectId } from '@/customers/lib/customer-id';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = await resolveCustomerObjectId(rawId);
    if (!id) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    // 复用 data.ts 的详情映射（与 SSR 渲染同源，含访客态 isLiked/hasViewed），
    // 避免两套字段口径漂移；getCustomerDetail 内部已有 cache() 去重。
    // 注意：响应含个性化字段，不得加 CDN 缓存，保持 no-store。
    const detail = await getCustomerById(id);
    if (!detail) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json(detail, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customer' },
      { status: 500 }
    );
  }
}
