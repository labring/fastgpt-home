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
import {
  isIntegerMetricValue,
  CUSTOMER_METRIC_FIELDS,
  updateCustomerMetrics,
  type CustomerMetricField
} from '@/customers/lib/customer-metrics';

export const dynamic = 'force-dynamic';

const MAX_ABSOLUTE_DELTA = 1000;

type MetricsPayload = {
  mode: 'increment' | 'set';
  values: Partial<Record<CustomerMetricField, number>>;
  reason?: string;
};

function parseMetricValues(value: unknown, mode: MetricsPayload['mode']):
  | { success: true; data: MetricsPayload['values'] }
  | { success: false; message: string; details?: Record<string, unknown> } {
  if (!isRecord(value)) {
    return { success: false, message: 'values 必须是 JSON 对象' };
  }

  const values: MetricsPayload['values'] = {};
  const invalidFields = Object.keys(value).filter((field) => !CUSTOMER_METRIC_FIELDS.includes(field as CustomerMetricField));
  if (invalidFields.length > 0) {
    return {
      success: false,
      message: 'values 只能包含 views 和 likes',
      details: { invalidFields },
    };
  }

  for (const field of CUSTOMER_METRIC_FIELDS) {
    const metricValue = value[field];
    if (metricValue === undefined) {
      continue;
    }

    if (!isIntegerMetricValue(metricValue)) {
      return {
        success: false,
        message: `${field} 必须是整数`,
        details: { field },
      };
    }

    if (mode === 'set' && metricValue < 0) {
      return {
        success: false,
        message: `${field} 不能小于 0`,
        details: { field, value: metricValue },
      };
    }

    if (mode === 'increment' && Math.abs(metricValue) > MAX_ABSOLUTE_DELTA) {
      return {
        success: false,
        message: `${field} 单次增量不能超过 ${MAX_ABSOLUTE_DELTA}`,
        details: { field, maxAbsoluteDelta: MAX_ABSOLUTE_DELTA },
      };
    }

    values[field] = metricValue;
  }

  if (Object.keys(values).length === 0) {
    return { success: false, message: 'values 至少需要包含 views 或 likes' };
  }

  return { success: true, data: values };
}

function parseMetricsPayload(body: unknown):
  | { success: true; data: MetricsPayload }
  | { success: false; status: number; code: string; message: string; details?: Record<string, unknown> } {
  if (!isRecord(body)) {
    return {
      success: false,
      status: 400,
      code: AGENT_ERROR_CODES.invalidRequestBody,
      message: '请求体必须是 JSON 对象',
    };
  }

  const mode = body.mode === 'set' ? 'set' : body.mode === 'increment' ? 'increment' : null;
  if (!mode) {
    return {
      success: false,
      status: 400,
      code: AGENT_ERROR_CODES.invalidMetricPayload,
      message: 'mode 必须是 increment 或 set',
    };
  }

  const parsedValues = parseMetricValues(body.values, mode);
  if (!parsedValues.success) {
    return {
      success: false,
      status: parsedValues.message.includes('单次增量不能超过') ? 422 : 400,
      code: parsedValues.message.includes('单次增量不能超过')
        ? AGENT_ERROR_CODES.metricDeltaTooLarge
        : AGENT_ERROR_CODES.invalidMetricPayload,
      message: parsedValues.message,
      details: parsedValues.details,
    };
  }

  return {
    success: true,
    data: {
      mode,
      values: parsedValues.data,
      reason: getOptionalTrimmedString(body.reason),
    },
  };
}

export async function PATCH(
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

      const parsedPayload = parseMetricsPayload(requestBody.data);
      if (!parsedPayload.success) {
        return errorResult(
          context,
          parsedPayload.status,
          parsedPayload.code,
          parsedPayload.message,
          parsedPayload.details
        );
      }

      const updateResult = await updateCustomerMetrics(id, parsedPayload.data.values, {
        mode: parsedPayload.data.mode,
        reason: parsedPayload.data.reason,
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

      return successResult(context, responseData);
    });

    return toAgentResponse(result);
  } catch (error) {
    console.error('Error updating customer metrics:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      '更新互动指标失败'
    ));
  }
}
