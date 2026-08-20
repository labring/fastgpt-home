import { NextRequest, NextResponse } from 'next/server';
import { withMongoRetry } from '@/customers/lib/db';
import CtaClick from '@/customers/models/CtaClick';
import { CTA_SOURCES, type CtaSource } from '@/customers/lib/cta-constants';
import { getDateKey } from '@/customers/lib/dashboard-analytics';
import { checkRateLimit } from '@/customers/lib/rate-limiter';

export const dynamic = 'force-dynamic';

const RATE_LIMIT_MAX = 30; // 每个 IP 每分钟最多 30 次
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_FIELD_LENGTH = 500; // 可选字段最大长度

function isValidCtaSource(value: unknown): value is CtaSource {
  return typeof value === 'string' && (CTA_SOURCES as readonly string[]).includes(value);
}

function sanitizeOptionalString(value: unknown): string | undefined {
  if (value == null) return undefined;
  // 数字 ID 转字符串（方案 ID 可能为 number 类型）
  const str = typeof value === 'number' ? String(value) : typeof value === 'string' ? value : '';
  const trimmed = str.trim();
  return trimmed.length > 0 && trimmed.length <= MAX_FIELD_LENGTH ? trimmed : undefined;
}

export async function POST(request: NextRequest) {
  // 频率限制
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
  const { allowed } = checkRateLimit(ip, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);
  if (!allowed) {
    return NextResponse.json({ success: true }); // 静默返回，不暴露限流细节
  }

  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
    }

    const { source, customerId, customerTitle, categoryName } = body as Record<string, unknown>;

    if (!isValidCtaSource(source)) {
      return NextResponse.json(
        { success: false, error: `Invalid source: ${String(source)}` },
        { status: 400 }
      );
    }

    await withMongoRetry(async () => {
      await CtaClick.create({
        source,
        dateKey: getDateKey(new Date()),
        customerId: sanitizeOptionalString(customerId),
        customerTitle: sanitizeOptionalString(customerTitle),
        categoryName: sanitizeOptionalString(categoryName)
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to record CTA click:', error);
    return NextResponse.json({ success: true });
  }
}
