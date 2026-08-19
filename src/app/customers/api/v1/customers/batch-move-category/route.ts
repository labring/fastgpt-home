import { NextRequest } from 'next/server';
import dbConnect from '@/customers/lib/db';
import Solution from '@/customers/models/Solution';
import Category from '@/customers/models/Category';
import { revalidateAdminRouteTree } from '@/customers/lib/admin-cache';
import {
  loadSolutionRevalidationRefs,
  revalidateSolutionRefs
} from '@/customers/lib/public-cache-invalidation';
import {
  AGENT_ERROR_CODES,
  createAgentRequestContext,
  errorResult,
  getTrimmedString,
  isRecord,
  readJsonBody,
  requireAgentAuth,
  successResult,
  toAgentResponse
} from '@/customers/lib/agent-api';
import { runAgentIdempotentOperation } from '@/customers/lib/agent-idempotency';
import { isValidObjectId } from '@/customers/lib/object-id';

export const dynamic = 'force-dynamic';

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
        return errorResult(
          context,
          400,
          AGENT_ERROR_CODES.invalidRequestBody,
          '请求体必须是 JSON 对象'
        );
      }

      const idsValue = requestBody.data.ids;
      const targetCategoryId = getTrimmedString(requestBody.data.targetCategoryId);

      if (!Array.isArray(idsValue) || idsValue.length === 0) {
        return errorResult(
          context,
          400,
          AGENT_ERROR_CODES.solutionIdsRequired,
          '请提供要迁移的解决方案 ID 列表'
        );
      }

      if (!targetCategoryId) {
        return errorResult(
          context,
          400,
          AGENT_ERROR_CODES.targetCategoryRequired,
          '请提供目标分类 ID'
        );
      }

      if (!isValidObjectId(targetCategoryId)) {
        return errorResult(
          context,
          404,
          AGENT_ERROR_CODES.targetCategoryNotFound,
          '目标分类不存在'
        );
      }

      const ids = idsValue.filter((id): id is string => typeof id === 'string' && isValidObjectId(id));
      if (ids.length === 0) {
        return errorResult(
          context,
          400,
          AGENT_ERROR_CODES.solutionIdsRequired,
          '请提供要迁移的解决方案 ID 列表'
        );
      }

      const category = await Category.findById(targetCategoryId);
      if (!category) {
        return errorResult(
          context,
          404,
          AGENT_ERROR_CODES.targetCategoryNotFound,
          '目标分类不存在'
        );
      }

      const previousRefs = await loadSolutionRevalidationRefs(ids);
      const updateResult = await Solution.updateMany(
        { _id: { $in: ids } },
        { $set: { categoryId: targetCategoryId, categoryName: category.name } }
      );
      if (updateResult.modifiedCount > 0) {
        revalidateAdminRouteTree();
        revalidateSolutionRefs(previousRefs.map((ref) => ({
          id: ref.id,
          slug: ref.slug,
          categorySlug: category.slug,
          previousCategorySlug: ref.categorySlug,
        })));
      }

      return successResult(context, {
        movedCount: updateResult.modifiedCount,
        targetCategoryName: category.name,
      });
    });

    return toAgentResponse(result);
  } catch (error) {
    console.error('Error batch moving solutions:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      '批量迁移分类失败'
    ));
  }
}
