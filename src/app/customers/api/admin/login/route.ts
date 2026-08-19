import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { readSystemSettings } from '@/customers/lib/system-settings';
import {
  createAdminSession,
  getAdminSecurityHeaders,
  isAllowedAdminMutationOrigin,
  isAdminPortalEnabled,
  isLoginRateLimited
} from '@/customers/lib/admin-auth';
import { readJsonRecord } from '@/customers/lib/request-json';

export const dynamic = 'force-dynamic';

function safeCompare(input: string, expected: string) {
  const inputBuffer = Buffer.from(input);
  const expectedBuffer = Buffer.from(expected);

  if (inputBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(inputBuffer, expectedBuffer);
}

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

  if (await isLoginRateLimited(request)) {
    return NextResponse.json(
      { success: false, error: '尝试次数过多，请 15 分钟后再试' },
      { status: 429, headers: getAdminSecurityHeaders() }
    );
  }

  try {
    const { password } = await readJsonRecord(request);
    const settings = await readSystemSettings();
    const adminPassword = settings.admin_password;

    if (!adminPassword) {
      console.error('未配置管理员密码');
      return NextResponse.json(
        { success: false, error: '服务器未配置管理员密码' },
        { status: 500, headers: getAdminSecurityHeaders() }
      );
    }

    await new Promise(resolve => setTimeout(resolve, 800));

    if (!safeCompare(String(password || ''), adminPassword)) {
      return NextResponse.json(
        { success: false, error: '密码错误' },
        { status: 401, headers: getAdminSecurityHeaders() }
      );
    }

    await createAdminSession(request.headers.get('user-agent') || '');

    return NextResponse.json(
      { success: true },
      { headers: getAdminSecurityHeaders() }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: '服务器错误' },
      { status: 500, headers: getAdminSecurityHeaders() }
    );
  }
}
