import { NextRequest } from 'next/server';
import dbConnect from '@/customers/lib/db';
import {
  AGENT_ERROR_CODES,
  createAgentRequestContext,
  errorResult,
  getOptionalTrimmedString,
  isRecord,
  readJsonBody,
  requireAgentAuth,
  successResult,
  toAgentResponse
} from '@/customers/lib/agent-api';
import { runAgentIdempotentOperation } from '@/customers/lib/agent-idempotency';
import { updateCustomerMetrics, type CustomerMetricField } from '@/customers/lib/customer-metrics';

export const dynamic = 'force-dynamic';

const EVENT_TO_METRIC: Record<string, CustomerMetricField> = {
  view: 'views',
  like: 'likes',
};

export function parseEventPayload(body: unknown):
  | { success: true; data: { type: 'view' | 'like'; actorId?: string; source?: string } }
  | { success: false; message: string; details?: Record<string, unknown> } {
  if (!isRecord(body)) {
    return { success: false, message: '请求体必须是 JSON 对象' };
  }

  const type = getOptionalTrimmedString(body.type);
  if (type !== 'view' && type !== 'like') {
    return {
      success: false,
      message: 'type 必须是 view 或 like',
      details: { allowedTypes: ['view', 'like'] },
    };
  }

  return {
    success: true,
    data: {
      type,
      actorId: getOptionalTrimmedString(body.actorId),
      source: getOptionalTrimmedString(body.source),
    },
  };
}

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
      await dbConnect();
      const { id } = await params;
      const requestBody = await readJsonBody(request, context);
      if (!requestBody.success) {
        return requestBody.result;
      }

      const parsedPayload = parseEventPayload(requestBody.data);
      if (!parsedPayload.success) {
        return errorResult(
          context,
          400,
          AGENT_ERROR_CODES.invalidMetricPayload,
          parsedPayload.message,
          parsedPayload.details
        );
      }

      const metric = EVENT_TO_METRIC[parsedPayload.data.type];
      const delta = 1;
      const updateResult = await updateCustomerMetrics(id, { [metric]: delta }, {
        mode: 'increment',
        reason: [
          `event:${parsedPayload.data.type}`,
          parsedPayload.data.source ? `source:${parsedPayload.data.source}` : '',
        ].filter(Boolean).join(' '),
      });

      if (!updateResult) {
        return errorResult(
          context,
          404,
          AGENT_ERROR_CODES.customerNotFound,
          '案例不存在'
        );
      }

      const responseData = updateResult;

      return successResult(context, {
        event: parsedPayload.data,
        ...responseData,
      });
    });

    return toAgentResponse(result);
  } catch (error) {
    console.error('Error recording customer event:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      '记录互动事件失败'
    ));
  }
}
