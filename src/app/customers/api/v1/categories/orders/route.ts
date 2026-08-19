import { NextRequest } from 'next/server';
import dbConnect from '@/customers/lib/db';
import Category from '@/customers/models/Category';
import { revalidateAdminRouteTree } from '@/customers/lib/admin-cache';
import { revalidateCategoryRefs } from '@/customers/lib/public-cache-invalidation';
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
import { isValidObjectId } from '@/customers/lib/object-id';

export const dynamic = 'force-dynamic';

function parseOrders(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!isRecord(item)) {
      return [];
    }

    const id = getTrimmedString(item.id);
    const order = item.order;
    if (!id || typeof order !== 'number') {
      return [];
    }

    return [{ id, order }];
  });
}

export async function PUT(request: NextRequest) {
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

    const rawOrders = requestBody.data.orders;
    const orders = parseOrders(rawOrders);

    if (!Array.isArray(rawOrders) || orders.length === 0) {
      return toAgentResponse(errorResult(
        context,
        400,
        AGENT_ERROR_CODES.invalidSortPayload,
        '请提供排序数据'
      ));
    }

    if (orders.some(({ id, order }) => !isValidObjectId(id) || !Number.isFinite(order))) {
      return toAgentResponse(errorResult(
        context,
        400,
        AGENT_ERROR_CODES.invalidSortPayload,
        '排序数据包含无效分类 ID 或顺序值'
      ));
    }

    const ops = orders.map(({ id, order }) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order } },
      },
    }));
    await Category.bulkWrite(ops);
    revalidateAdminRouteTree();
    revalidateCategoryRefs();

    return toAgentResponse(successResult(context, { updatedCount: orders.length }));
  } catch (error) {
    console.error('Error updating category orders:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      '更新排序失败'
    ));
  }
}
