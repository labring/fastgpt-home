import { NextRequest } from 'next/server';
import dbConnect from '@/customers/lib/db';
import Customer from '@/customers/models/Customer';
import { revalidateAdminRouteTree } from '@/customers/lib/admin-cache';
import {
  loadCustomerRevalidationRefs,
  revalidateCustomerRefs
} from '@/customers/lib/public-cache-invalidation';
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
import { runAgentIdempotentOperation } from '@/customers/lib/agent-idempotency';
import { isValidObjectId } from '@/customers/lib/object-id';

export const dynamic = 'force-dynamic';

const MAX_BATCH_SIZE = 100;

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
        return errorResult(context, 400, AGENT_ERROR_CODES.customerIdsRequired, '请提供要发布或下架的案例 ID 列表');
      }

      if (ids.length > MAX_BATCH_SIZE) {
        return errorResult(
          context,
          422,
          AGENT_ERROR_CODES.batchLimitExceeded,
          `单次最多处理 ${MAX_BATCH_SIZE} 个案例`,
          { maxBatchSize: MAX_BATCH_SIZE }
        );
      }

      if (typeof requestBody.data.isPublished !== 'boolean') {
        return errorResult(context, 400, AGENT_ERROR_CODES.validationError, 'isPublished 必须是布尔值');
      }

      const validIds = ids.filter(isValidObjectId);
      const validIdSet = new Set(validIds);

      const matchedCustomers = validIds.length > 0
        ? await Customer.find({
          _id: { $in: validIds },
          deletedAt: null,
        }).select('_id').lean<Array<{ _id: unknown }>>()
        : [];

      const matchedIds = matchedCustomers.map((item) => String(item._id));
      const matchedIdSet = new Set(matchedIds);
      const failedIds = ids.filter((id) => !validIdSet.has(id) || !matchedIdSet.has(id));

      let modifiedCount = 0;
      if (matchedIds.length > 0) {
        const refs = await loadCustomerRevalidationRefs(matchedIds);
        const updateResult = await Customer.updateMany(
          { _id: { $in: matchedIds }, deletedAt: null },
          { $set: { isPublished: requestBody.data.isPublished } }
        );
        modifiedCount = updateResult.modifiedCount;
        revalidateAdminRouteTree();
        revalidateCustomerRefs(refs);
      }

      return successResult(context, {
        matchedCount: matchedIds.length,
        updatedCount: modifiedCount,
        failedIds,
        isPublished: requestBody.data.isPublished,
      });
    });

    return toAgentResponse(result);
  } catch (error) {
    console.error('Error batch publishing customers:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      '批量发布状态更新失败'
    ));
  }
}
