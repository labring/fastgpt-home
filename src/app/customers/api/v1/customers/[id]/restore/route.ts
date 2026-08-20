import { NextRequest } from 'next/server';
import { restoreCustomerFromTrash } from '@/customers/lib/customer-trash';
import {
  AGENT_ERROR_CODES,
  createAgentRequestContext,
  errorResult,
  requireAgentAuth,
  resolveAgentDomainError,
  successResult,
  toAgentResponse
} from '@/customers/lib/agent-api';

export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const context = createAgentRequestContext(request);
  const authError = await requireAgentAuth(request, context);
  if (authError) {
    return toAgentResponse(authError);
  }

  try {
    const { id } = await params;
    const result = await restoreCustomerFromTrash(id);

    if (!result.success) {
      const resolvedError = resolveAgentDomainError(
        result.error || '案例不存在或未在回收站中',
        { message: '恢复失败' }
      );

      return toAgentResponse(errorResult(
        context,
        resolvedError.status,
        resolvedError.code,
        resolvedError.message,
        resolvedError.details
      ));
    }

    return toAgentResponse(successResult(context, { id, restored: true }));
  } catch (error) {
    console.error('Error restoring customer:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      '恢复失败'
    ));
  }
}
