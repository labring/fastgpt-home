import { NextRequest } from 'next/server';
import { permanentlyDeleteSolutionFromTrash } from '@/customers/lib/solution-trash';
import {
  AGENT_ERROR_CODES,
  createAgentRequestContext,
  errorResult,
  requireAgentAuth,
  resolveAgentDomainError,
  successResult,
  toAgentResponse
} from '@/customers/lib/agent-api';
import { runAgentIdempotentOperation } from '@/customers/lib/agent-idempotency';

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
    const result = await runAgentIdempotentOperation(request, context, async () => {
      const { id } = await params;
      const purgeResult = await permanentlyDeleteSolutionFromTrash(id);

      if (!purgeResult.success) {
        const resolvedError = resolveAgentDomainError(
          purgeResult.error || '永久删除失败',
          { message: '永久删除失败' }
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
        id,
        deleted: true,
        mode: 'purge' as const
      });
    });

    return toAgentResponse(result);
  } catch (error) {
    console.error('Error purging solution:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      '永久删除失败'
    ));
  }
}
