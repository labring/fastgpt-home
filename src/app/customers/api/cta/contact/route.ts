import { NextRequest, NextResponse } from 'next/server';
import {
  CTA_SOURCES,
  CONTACT_FORM_OPTIONS,
  SOURCE_UTM_CAMPAIGNS,
  UTM_MEDIUM,
  UTM_SOURCE,
  type CtaSource
} from '@/customers/lib/cta-constants';
import { checkRateLimit } from '@/customers/lib/rate-limiter';

export const dynamic = 'force-dynamic';

/**
 * 主站线索提交 API 基地址。
 * 默认指向 fastgpt.cn 商务咨询表单使用的后端；可通过环境变量覆盖。
 */
const CONTACT_API_BASE_URL =
  (process.env.CONTACT_API_BASE_URL?.trim() || 'https://kusgznyaknkl.sealoshzh.site/api/v1').replace(/\/$/, '');

const RATE_LIMIT_MAX = 5; // 每个 IP 每分钟最多 5 次提交
const RATE_LIMIT_WINDOW_MS = 60_000;
const UPSTREAM_TIMEOUT_MS = 10_000;

/** 文本字段长度上限（与主站表单口径近似） */
const TEXT_LIMITS = {
  name: 50,
  phone: 100,
  company: 200,
  position: 100,
  notes: 1000,
  customerSlug: 200,
  visitorId: 200,
  referrer: 500
} as const;

/** 下拉字段 → 合法选项（与主站 /contact 保持一致） */
const SELECT_OPTIONS: Record<string, readonly string[]> = {
  used_open_source: CONTACT_FORM_OPTIONS.usedOpenSource,
  consultation_topic: CONTACT_FORM_OPTIONS.consultationTopic,
  project_stage: CONTACT_FORM_OPTIONS.projectStage,
  budget: CONTACT_FORM_OPTIONS.budget
};

function isValidCtaSource(value: unknown): value is CtaSource {
  return typeof value === 'string' && (CTA_SOURCES as readonly string[]).includes(value);
}

function sanitizeText(value: unknown, max: number): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= max ? trimmed : undefined;
}

/** 主站口径：手机号（11 位大陆手机）或邮箱 */
function isValidPhoneOrEmail(value: string): boolean {
  return /^1[3-9]\d{9}$/.test(value) || /^[\w.+-]+@[\w-]+(\.[\w-]+)+$/.test(value);
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const { allowed } = checkRateLimit(ip, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: 'rate_limit', message: '提交过于频繁，请稍后再试。' },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'bad_request', message: '请求格式错误。' }, { status: 400 });
  }

  const { source, customerSlug, referrer, visitorId } = body ?? {};

  if (!isValidCtaSource(source)) {
    return NextResponse.json({ success: false, error: 'bad_request', message: '来源标识无效。' }, { status: 400 });
  }

  // 必填文本字段校验
  const name = sanitizeText(body.name, TEXT_LIMITS.name);
  const phone = sanitizeText(body.phone, TEXT_LIMITS.phone);
  const company = sanitizeText(body.company, TEXT_LIMITS.company);
  const position = sanitizeText(body.position, TEXT_LIMITS.position);
  if (!name || !phone || !company || !position) {
    return NextResponse.json(
      { success: false, error: 'validation', message: '请完整填写所有必填项。' },
      { status: 400 }
    );
  }
  if (!isValidPhoneOrEmail(phone)) {
    return NextResponse.json(
      { success: false, error: 'validation', message: '请输入有效的手机号或邮箱。' },
      { status: 400 }
    );
  }

  // 必填下拉字段校验（预算为选填）
  // 注：客户端表单字段为 camelCase（与 FormModal 的 FormState 一致），上游主站接口为 snake_case
  const usedOpenSource = sanitizeText(body.usedOpenSource, 50);
  const consultationTopic = sanitizeText(body.consultationTopic, 50);
  const projectStage = sanitizeText(body.projectStage, 50);
  if (
    !usedOpenSource || !SELECT_OPTIONS.used_open_source.includes(usedOpenSource) ||
    !consultationTopic || !SELECT_OPTIONS.consultation_topic.includes(consultationTopic) ||
    !projectStage || !SELECT_OPTIONS.project_stage.includes(projectStage)
  ) {
    return NextResponse.json(
      { success: false, error: 'validation', message: '请完整填写所有必填项。' },
      { status: 400 }
    );
  }

  const budget = sanitizeText(body.budget, 50);
  if (budget && !SELECT_OPTIONS.budget.includes(budget)) {
    return NextResponse.json(
      { success: false, error: 'validation', message: '预算选项无效。' },
      { status: 400 }
    );
  }

  const notes = sanitizeText(body.notes, TEXT_LIMITS.notes);
  const utmTerm = sanitizeText(customerSlug, TEXT_LIMITS.customerSlug) || '';
  const referrerUrl =
    sanitizeText(referrer, TEXT_LIMITS.referrer) ||
    sanitizeText(request.headers.get('referer') || '', TEXT_LIMITS.referrer) ||
    '';
  const cleanVisitorId =
    sanitizeText(visitorId, TEXT_LIMITS.visitorId) || `customers-${crypto.randomUUID()}`;

  // 与主站 /contact 提交载荷保持一致（snake_case + 归因字段）
  const payload = {
    name,
    phone,
    company,
    position,
    used_open_source: usedOpenSource,
    consultation_topic: consultationTopic,
    project_stage: projectStage,
    budget: budget || null,
    notes: notes || null,
    locale: 'zh',
    utm_source: UTM_SOURCE,
    utm_medium: UTM_MEDIUM,
    utm_campaign: SOURCE_UTM_CAMPAIGNS[source],
    utm_term: utmTerm,
    utm_content: source,
    click_id: '',
    referrer_url: referrerUrl,
    visitor_id: cleanVisitorId
  };

  try {
    const upstream = await fetch(`${CONTACT_API_BASE_URL}/contacts/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS)
    });

    if (!upstream.ok) {
      let detail = '';
      try {
        const data = await upstream.json();
        detail = (typeof data?.detail === 'string' && data.detail) || (typeof data?.message === 'string' && data.message) || '';
      } catch { /* 忽略上游错误体解析失败 */ }
      if (upstream.status === 429) {
        return NextResponse.json(
          { success: false, error: 'rate_limit', message: '提交过于频繁，请稍后再试。' },
          { status: 429 }
        );
      }
      console.error(`[cta/contact] upstream submit failed: ${upstream.status} ${detail}`);
      return NextResponse.json(
        { success: false, error: 'upstream', message: '提交失败，请稍后重试。' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[cta/contact] upstream request error:', error);
    return NextResponse.json(
      { success: false, error: 'upstream', message: '提交失败，请稍后重试。' },
      { status: 502 }
    );
  }
}
