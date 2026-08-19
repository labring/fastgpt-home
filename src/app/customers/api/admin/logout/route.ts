import { NextRequest, NextResponse } from 'next/server';
import {
  destroyAdminSession,
  getAdminSecurityHeaders,
  isAllowedAdminMutationOrigin,
  isAdminPortalEnabled
} from '@/customers/lib/admin-auth';

export async function POST(request: NextRequest) {
  if (!isAdminPortalEnabled()) {
    return NextResponse.json(
      { success: false, error: 'Not found' },
      { status: 404, headers: getAdminSecurityHeaders() }
    );
  }

  if (!isAllowedAdminMutationOrigin(request)) {
    return NextResponse.json(
      { success: false, error: '请求来源不被允许' },
      { status: 403, headers: getAdminSecurityHeaders() }
    );
  }

  await destroyAdminSession();
  return NextResponse.json({ success: true }, { headers: getAdminSecurityHeaders() });
}
