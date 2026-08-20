import { NextRequest } from 'next/server';
import dbConnect from '@/customers/lib/db';
import Customer from '@/customers/models/Customer';
import { generateCustomerCover } from '@/customers/lib/customer-cover';
import { saveCustomerForAgent } from '@/customers/lib/customer-admin-service';
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

type BatchCoverCustomer = {
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
        return errorResult(context, 400, AGENT_ERROR_CODES.customerIdsRequired, '请提供要生成封面的案例 ID 列表');
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
      const customers = validIds.length > 0
        ? await Customer.find({ _id: { $in: validIds }, deletedAt: null })
          .lean<BatchCoverCustomer[]>()
        : [];
      const customerMap = new Map(customers.map((customer) => [String(customer._id), customer]));
      const items = [];

      for (const id of ids) {
        if (!isValidObjectId(id)) {
          items.push({ id, success: false, error: '案例不存在或已在回收站中' });
          continue;
        }

        const customer = customerMap.get(id);
        if (!customer) {
          items.push({ id, success: false, error: '案例不存在或已在回收站中' });
          continue;
        }

        try {
          const storageFolder = String(customer.storageFolder || id).trim();
          const coverResult = await generateCustomerCover({
            title: customer.title || '',
            description: customer.description || '',
            content: customer.content || '',
            storageFolder,
          });

          const saveResult = await saveCustomerForAgent({
            id,
            title: String(customer.title || ''),
            description: String(customer.description || ''),
            categoryId: String(customer.categoryId || ''),
            content: String(customer.content || ''),
            imageUrl: coverResult.imageUrl,
            thumbnailUrl: coverResult.thumbnailUrl,
            isPublished: customer.isPublished === true,
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
    console.error('Error batch generating customer covers:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      '批量生成封面失败'
    ));
  }
}
