import { NextRequest } from 'next/server';
import dbConnect from '@/customers/lib/db';
import Category from '@/customers/models/Category';
import { revalidateAdminRouteTree } from '@/customers/lib/admin-cache';
import { revalidateCategoryRefs } from '@/customers/lib/public-cache-invalidation';
import {
  AGENT_ERROR_CODES,
  createAgentRequestContext,
  errorResult,
  isRecord,
  readJsonBody,
  requireAgentAuth,
  successResult,
  toAgentResponse
} from '@/customers/lib/agent-api';
import { isValidObjectId } from '@/customers/lib/object-id';

export const dynamic = 'force-dynamic';

export async function PATCH(request: NextRequest) {
  const context = createAgentRequestContext(request);
  const authError = await requireAgentAuth(request, context);
  if (authError) {
    return toAgentResponse(authError);
  }

  try {
    await dbConnect();
    const requestBody = await readJsonBody(request, context);
    if (!requestBody.success) {
      return toAgentResponse(requestBody.result);
    }

    if (!isRecord(requestBody.data)) {
      return toAgentResponse(errorResult(
        context,
        400,
        AGENT_ERROR_CODES.invalidRequestBody,
        '请求体必须是 JSON 对象'
      ));
    }

    const { ids, isActive } = requestBody.data as { ids?: string[]; isActive?: boolean };

    if (!Array.isArray(ids) || ids.length === 0) {
      return toAgentResponse(errorResult(
        context,
        400,
        AGENT_ERROR_CODES.categoryIdsRequired,
        '请提供分类 ID 列表'
      ));
    }

    if (typeof isActive !== 'boolean') {
      return toAgentResponse(errorResult(
        context,
        400,
        AGENT_ERROR_CODES.validationError,
        '请提供 isActive 字段'
      ));
    }

    const validIds = [...new Set(ids.filter((id): id is string => typeof id === 'string' && isValidObjectId(id)))];
    if (validIds.length === 0) {
      return toAgentResponse(successResult(context, {
        updatedCount: 0,
        failedIds: ids
      }));
    }

    const categories = await Category.find({ _id: { $in: validIds } })
      .select('_id slug')
      .lean<Array<{ _id: unknown; slug?: string | null }>>();
    const result = await Category.updateMany(
      { _id: { $in: validIds } },
      { $set: { isActive } }
    );
    if (result.modifiedCount > 0) {
      revalidateAdminRouteTree();
      revalidateCategoryRefs(categories.map((category) => ({ slug: category.slug })));
    }

    return toAgentResponse(successResult(context, {
      updatedCount: result.modifiedCount,
      failedIds: ids.filter((id) => typeof id !== 'string' || !isValidObjectId(id))
    }));
  } catch (error) {
    console.error('Error batch toggling categories:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      '批量切换状态失败'
    ));
  }
}
