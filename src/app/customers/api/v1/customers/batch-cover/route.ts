import { NextRequest } from 'next/server';
import dbConnect from '@/customers/lib/db';
import Solution from '@/customers/models/Solution';
import { generateSolutionCover } from '@/customers/lib/solution-cover';
import { saveSolutionForAgent } from '@/customers/lib/solution-admin-service';
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
import { isValidObjectId } from '@/customers/lib/object-id';

export const dynamic = 'force-dynamic';

const MAX_BATCH_SIZE = 20;

type BatchCoverSolution = {
  _id: unknown;
  title?: string | null;
  description?: string | null;
  content?: string | null;
  imageUrl?: string | null;
  categoryId?: unknown;
  isPublished?: boolean;
  storageFolder?: string | null;
};

function parseIds(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return [...new Set(value.filter((id): id is string => typeof id === 'string' && Boolean(id.trim())).map((id) => id.trim()))];
}

export async function POST(request: NextRequest) {
  const context = createAgentRequestContext(request);
  const authError = await requireAgentAuth(request, context);
  if (authError) {
    return toAgentResponse(authError);
  }

  try {
    const result = await runAgentIdempotentOperation(request, context, async () => {
      await dbConnect();
      const requestBody = await readJsonBody(request, context);
      if (!requestBody.success) {
        return requestBody.result;
      }

      if (!isRecord(requestBody.data)) {
        return errorResult(context, 400, AGENT_ERROR_CODES.invalidRequestBody, '请求体必须是 JSON 对象');
      }

      const ids = parseIds(requestBody.data.ids);
      if (ids.length === 0) {
        return errorResult(context, 400, AGENT_ERROR_CODES.solutionIdsRequired, '请提供要生成封面的案例 ID 列表');
      }

      if (ids.length > MAX_BATCH_SIZE) {
        return errorResult(
          context,
          422,
          AGENT_ERROR_CODES.batchLimitExceeded,
          `单次最多生成 ${MAX_BATCH_SIZE} 个案例封面`,
          { maxBatchSize: MAX_BATCH_SIZE }
        );
      }

      const validIds = ids.filter(isValidObjectId);
      const solutions = validIds.length > 0
        ? await Solution.find({ _id: { $in: validIds }, deletedAt: null })
          .lean<BatchCoverSolution[]>()
        : [];
      const solutionMap = new Map(solutions.map((solution) => [String(solution._id), solution]));
      const items = [];

      for (const id of ids) {
        if (!isValidObjectId(id)) {
          items.push({ id, success: false, error: '案例不存在或已在回收站中' });
          continue;
        }

        const solution = solutionMap.get(id);
        if (!solution) {
          items.push({ id, success: false, error: '案例不存在或已在回收站中' });
          continue;
        }

        try {
          const storageFolder = String(solution.storageFolder || id).trim();
          const coverResult = await generateSolutionCover({
            title: solution.title || '',
            description: solution.description || '',
            content: solution.content || '',
            storageFolder,
          });

          const saveResult = await saveSolutionForAgent({
            id,
            title: String(solution.title || ''),
            description: String(solution.description || ''),
            categoryId: String(solution.categoryId || ''),
            content: String(solution.content || ''),
            imageUrl: coverResult.imageUrl,
            thumbnailUrl: coverResult.thumbnailUrl,
            isPublished: solution.isPublished === true,
          });

          if (!saveResult.success) {
            const resolvedError = resolveAgentDomainError(
              saveResult.error || '封面写回失败',
              { message: '封面写回失败' }
            );
            items.push({ id, success: false, error: resolvedError.message });
            continue;
          }

          items.push({
            id,
            success: true,
            imageUrl: coverResult.imageUrl,
            thumbnailUrl: coverResult.thumbnailUrl,
            query: coverResult.query,
            reason: coverResult.reason,
            source: coverResult.source,
          });
        } catch (error) {
          items.push({
            id,
            success: false,
            error: error instanceof Error ? error.message : 'AI 匹配封面失败',
          });
        }
      }

      const successCount = items.filter((item) => item.success).length;

      return successResult(context, {
        successCount,
        failedCount: items.length - successCount,
        items,
      });
    });

    return toAgentResponse(result);
  } catch (error) {
    console.error('Error batch generating solution covers:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      '批量生成封面失败'
    ));
  }
}
