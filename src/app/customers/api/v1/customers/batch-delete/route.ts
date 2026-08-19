import { NextRequest } from 'next/server';
import { moveSolutionsToTrash } from '@/customers/lib/solution-trash';
import {
  AGENT_ERROR_CODES,
  createAgentRequestContext,
  errorResult,
  isRecord,
  readJsonBody,
  requireAgentAuth,
  resolveAgentDomainError,
  successResult,
  toAgentResponse
} from '@/customers/lib/agent-api';
import { runAgentIdempotentOperation } from '@/customers/lib/agent-idempotency';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const context = createAgentRequestContext(request);
  const authError = await requireAgentAuth(request, context);
  if (authError) {
    return toAgentResponse(authError);
  }

  try {
    const result = await runAgentIdempotentOperation(request, context, async () => {
      const requestBody = await readJsonBody(request, context);
      if (!requestBody.success) {
        return requestBody.result;
      }

      if (!isRecord(requestBody.data)) {
        return errorResult(
          context,
          400,
          AGENT_ERROR_CODES.invalidRequestBody,
          '请求体必须是 JSON 对象'
        );
      }

      const { ids } = requestBody.data as { ids?: unknown };
      if (!Array.isArray(ids) || ids.length === 0) {
        return errorResult(
          context,
          400,
          AGENT_ERROR_CODES.solutionIdsRequired,
          '请提供要删除的解决方案 ID 列表'
        );
      }

      const deleteResult = await moveSolutionsToTrash(ids.filter((id): id is string => typeof id === 'string'), 'agent');
      if (!deleteResult.success) {
        const resolvedError = resolveAgentDomainError(
          deleteResult.error || '批量删除失败',
          { message: '批量删除失败' }
        );

        return errorResult(
          context,
          resolvedError.status,
          resolvedError.code,
          resolvedError.message,
          resolvedError.details
        );
      }

      return successResult(context, {
        deletedCount: deleteResult.deletedCount,
        failedIds: deleteResult.failedIds,
        mode: 'trash' as const
      });
    });

    return toAgentResponse(result);
  } catch (error) {
    console.error('Error batch deleting solutions:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      '批量删除失败'
    ));
  }
}
