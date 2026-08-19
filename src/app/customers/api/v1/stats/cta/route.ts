import { NextRequest } from 'next/server';
import { getCtaClickStats } from '@/customers/lib/cta-analytics';
import {
  AGENT_ERROR_CODES,
  createAgentRequestContext,
  errorResult,
  requireAgentAuth,
  successResult,
  toAgentResponse
} from '@/customers/lib/agent-api';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const context = createAgentRequestContext(request);
  const authError = await requireAgentAuth(request, context);
  if (authError) {
    return toAgentResponse(authError);
  }

  try {
    const days = Math.min(90, Math.max(1, parseInt(request.nextUrl.searchParams.get('days') || '30')));
    const data = await getCtaClickStats(days);
    return toAgentResponse(successResult(context, data));
  } catch (error) {
    console.error('Error getting CTA stats:', error);
    return toAgentResponse(
      errorResult(context, 500, AGENT_ERROR_CODES.internalError, '获取 CTA 统计数据失败')
    );
  }
}
