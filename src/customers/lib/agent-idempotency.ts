import { createHash } from 'crypto';
import type { NextRequest } from 'next/server';
import dbConnect from '@/customers/lib/db';
import AgentIdempotencyKey from '@/customers/models/AgentIdempotencyKey';
import {
  AGENT_ERROR_CODES,
  AGENT_IDEMPOTENCY_KEY_HEADER,
  type AgentRequestContext,
  type AgentRouteResult,
  errorResult
} from '@/customers/lib/agent-api';

type CachedResponseBody = AgentRouteResult['body'];

function hashRequestBody(bodyText: string) {
  return createHash('sha256').update(bodyText).digest('hex');
}

function isDuplicateKeyError(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 11000
  );
}

function getRequestIdFromBody(body: CachedResponseBody) {
  return body.success ? body.requestId : body.error.requestId;
}

export async function runAgentIdempotentOperation(
  request: NextRequest,
  context: AgentRequestContext,
  execute: () => Promise<AgentRouteResult>
): Promise<AgentRouteResult> {
  const idempotencyKey = request.headers.get(AGENT_IDEMPOTENCY_KEY_HEADER)?.trim();
  if (!idempotencyKey) {
    return execute();
  }

  await dbConnect();

  const bodyText = await request.clone().text();
  const bodyHash = hashRequestBody(bodyText);
  const method = request.method.toUpperCase();
  const path = request.nextUrl.pathname;

  try {
    await AgentIdempotencyKey.create({
      key: idempotencyKey,
      method,
      path,
      bodyHash,
      state: 'pending',
      requestId: context.requestId
    });
  } catch (error) {
    if (!isDuplicateKeyError(error)) {
      throw error;
    }

    const existingRecord = await AgentIdempotencyKey.findOne({
      key: idempotencyKey,
      method,
      path
    }).lean<{
      bodyHash: string;
      state: 'pending' | 'completed';
      statusCode?: number;
      responseBody?: CachedResponseBody;
    } | null>();

    if (!existingRecord) {
      return errorResult(
        context,
        409,
        AGENT_ERROR_CODES.idempotencyRequestInProgress,
        '相同的幂等请求正在处理中，请稍后重试',
        { idempotencyKey, method, path }
      );
    }

    if (existingRecord.bodyHash !== bodyHash) {
      return errorResult(
        context,
        409,
        AGENT_ERROR_CODES.idempotencyKeyConflict,
        '相同的 Idempotency-Key 不能用于不同请求',
        { idempotencyKey, method, path }
      );
    }

    if (existingRecord.state === 'completed' && existingRecord.statusCode && existingRecord.responseBody) {
      return {
        status: existingRecord.statusCode,
        body: existingRecord.responseBody,
        headers: {
          'x-idempotent-replayed': 'true',
          'x-request-id': getRequestIdFromBody(existingRecord.responseBody)
        }
      };
    }

    return errorResult(
      context,
      409,
      AGENT_ERROR_CODES.idempotencyRequestInProgress,
      '相同的幂等请求正在处理中，请稍后重试',
      { idempotencyKey, method, path }
    );
  }

  const result = await execute();

  if (result.status < 500) {
    await AgentIdempotencyKey.findOneAndUpdate(
      { key: idempotencyKey, method, path },
      {
        $set: {
          state: 'completed',
          statusCode: result.status,
          responseBody: result.body,
          requestId: getRequestIdFromBody(result.body)
        }
      }
    );
  } else {
    // Do not cache 5xx responses so callers can safely retry.
    await AgentIdempotencyKey.deleteOne({ key: idempotencyKey, method, path });
  }

  return result;
}
