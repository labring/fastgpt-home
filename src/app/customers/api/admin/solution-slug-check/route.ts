import { NextRequest, NextResponse } from 'next/server';
import {
  isSolutionSlugAvailable,
  isValidSolutionSlug,
  normalizeSolutionSlug
} from '@/customers/lib/solution-slug';
import { requireAdminApi } from '@/customers/lib/admin-api';
import { readJsonRecord } from '@/customers/lib/request-json';

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi(request);
  if (!auth.ok) {
    return auth.response;
  }

  try {
    const body = await readJsonRecord(request);
    const rawSlug = typeof body.slug === 'string' ? body.slug.trim() : '';
    const excludeId = typeof body.excludeId === 'string' ? body.excludeId.trim() : undefined;

    const slug = normalizeSolutionSlug(rawSlug);

    if (!slug) {
      return NextResponse.json({ error: 'Slug 不能为空' }, { status: 422 });
    }

    if (!isValidSolutionSlug(slug)) {
      return NextResponse.json(
        { error: 'Slug 只能包含小写字母、数字和连字符', slug },
        { status: 422 }
      );
    }

    if (!(await isSolutionSlugAvailable(slug, { excludeId }))) {
      return NextResponse.json({ error: 'Slug 已存在', slug }, { status: 409 });
    }

    return NextResponse.json({ slug, available: true });
  } catch (error) {
    console.error('Error checking solution slug:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Slug 检查失败' },
      { status: 500 }
    );
  }
}
