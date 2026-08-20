import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { authenticateAgent } from '@/customers/lib/agent-auth';

export const AGENT_REQUEST_ID_HEADER = 'x-request-id';
export const AGENT_IDEMPOTENCY_KEY_HEADER = 'idempotency-key';

export const AGENT_ERROR_CODES = {
  unauthorized: 'UNAUTHORIZED',
  invalidJson: 'INVALID_JSON',
  invalidRequestBody: 'INVALID_REQUEST_BODY',
  badRequest: 'BAD_REQUEST',
  validationError: 'VALIDATION_ERROR',
  internalError: 'INTERNAL_ERROR',
  customerNotFound: 'CUSTOMER_NOT_FOUND',
  customerAlreadyInTrash: 'CUSTOMER_ALREADY_IN_TRASH',
  customerNotInTrash: 'CUSTOMER_NOT_IN_TRASH',
  categoryNotFound: 'CATEGORY_NOT_FOUND',
  targetCategoryNotFound: 'TARGET_CATEGORY_NOT_FOUND',
  categoryNameRequired: 'CATEGORY_NAME_REQUIRED',
  categoryReservedName: 'CATEGORY_RESERVED_NAME',
  categoryNameConflict: 'CATEGORY_NAME_CONFLICT',
  categoryNotEmpty: 'CATEGORY_NOT_EMPTY',
  targetCategoryRequired: 'TARGET_CATEGORY_REQUIRED',
  customerIdsRequired: 'CUSTOMER_IDS_REQUIRED',
  categoryIdsRequired: 'CATEGORY_IDS_REQUIRED',
  invalidSortPayload: 'INVALID_SORT_PAYLOAD',
  invalidMetricPayload: 'INVALID_METRIC_PAYLOAD',
  metricDeltaTooLarge: 'METRIC_DELTA_TOO_LARGE',
  batchLimitExceeded: 'BATCH_LIMIT_EXCEEDED',
  urlsRequired: 'URLS_REQUIRED',
  missingActiveCategory: 'MISSING_ACTIVE_CATEGORY',
  idempotencyKeyConflict: 'IDEMPOTENCY_KEY_CONFLICT',
  idempotencyRequestInProgress: 'IDEMPOTENCY_REQUEST_IN_PROGRESS'
} as const;

export type AgentErrorCode = (typeof AGENT_ERROR_CODES)[keyof typeof AGENT_ERROR_CODES];

export type AgentSuccessBody<T> = {
  success: true;
  data: T;
  requestId: string;
};

export type AgentErrorBody = {
  success: false;
  error: {
    code: AgentErrorCode | string;
    message: string;
    details?: Record<string, unknown>;
    requestId: string;
  };
};

export type AgentResponseBody<T = unknown> = AgentSuccessBody<T> | AgentErrorBody;

export type AgentRouteResult<T = unknown> = {
  status: number;
  body: AgentResponseBody<T>;
  headers?: HeadersInit;
};

export type AgentRequestContext = {
  requestId: string;
};

type AgentResolvedError = {
  status: number;
  code: AgentErrorCode;
  message: string;
  details?: Record<string, unknown>;
};

const UNAUTHORIZED_MESSAGE = '认证失败，请提供有效的 API Key';

function resolveRequestId(request: NextRequest) {
  const requestId = request.headers.get(AGENT_REQUEST_ID_HEADER)?.trim();
  return requestId || randomUUID();
}

function buildResponseHeaders(requestId: string, headers?: HeadersInit) {
  const responseHeaders = new Headers(headers);
  responseHeaders.set(AGENT_REQUEST_ID_HEADER, requestId);
  return responseHeaders;
}

function isErrorBody(body: AgentResponseBody): body is AgentErrorBody {
  return body.success === false;
}

export function createAgentRequestContext(request: NextRequest): AgentRequestContext {
  return {
    requestId: resolveRequestId(request)
  };
}

export function successResult<T>(
  context: AgentRequestContext,
  data: T,
  status = 200,
  headers?: HeadersInit
): AgentRouteResult<T> {
  return {
    status,
    headers,
    body: {
      success: true,
      data,
      requestId: context.requestId
    }
  };
}

export function errorResult(
  context: AgentRequestContext,
  status: number,
  code: AgentErrorCode | string,
  message: string,
  details?: Record<string, unknown>,
  headers?: HeadersInit
): AgentRouteResult {
  return {
    status,
    headers,
    body: {
      success: false,
      error: {
        code,
        message,
        ...(details ? { details } : {}),
        requestId: context.requestId
      }
    }
  };
}

export function toAgentResponse<T>(result: AgentRouteResult<T>) {
  const requestId = isErrorBody(result.body)
    ? result.body.error.requestId
    : result.body.requestId;

  return NextResponse.json(result.body, {
    status: result.status,
    headers: buildResponseHeaders(requestId, result.headers)
  });
}

export async function requireAgentAuth(
  request: NextRequest,
  context: AgentRequestContext
): Promise<AgentRouteResult | null> {
  const auth = await authenticateAgent(request);
  if (auth.authenticated) {
    return null;
  }

  return errorResult(
    context,
    401,
    AGENT_ERROR_CODES.unauthorized,
    UNAUTHORIZED_MESSAGE
  );
}

export async function readJsonBody(
  request: NextRequest,
  context: AgentRequestContext
): Promise<{ success: true; data: unknown } | { success: false; result: AgentRouteResult }> {
  try {
    return { success: true, data: await request.json() };
  } catch {
    return {
      success: false,
      result: errorResult(
        context,
        400,
        AGENT_ERROR_CODES.invalidJson,
        '请求体必须是合法的 JSON'
      )
    };
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function getTrimmedString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export function getOptionalTrimmedString(value: unknown) {
  return typeof value === 'string' ? value.trim() : undefined;
}

export function resolveAgentDomainError(message: string, fallback?: Partial<AgentResolvedError>) {
  const normalizedMessage = message.trim();

  const exactMatch = new Map<string, AgentResolvedError>([
    ['请求体必须是 JSON 对象', {
      status: 400,
      code: AGENT_ERROR_CODES.invalidRequestBody,
      message: normalizedMessage
    }],
    ['请求体必须是合法的 JSON', {
      status: 400,
      code: AGENT_ERROR_CODES.invalidJson,
      message: normalizedMessage
    }],
    ['无效的分类', {
      status: 404,
      code: AGENT_ERROR_CODES.categoryNotFound,
      message: normalizedMessage
    }],
    ['分类不存在', {
      status: 404,
      code: AGENT_ERROR_CODES.categoryNotFound,
      message: normalizedMessage
    }],
    ['目标分类不存在', {
      status: 404,
      code: AGENT_ERROR_CODES.targetCategoryNotFound,
      message: normalizedMessage
    }],
    ['请先创建至少一个分类', {
      status: 409,
      code: AGENT_ERROR_CODES.missingActiveCategory,
      message: normalizedMessage
    }],
    ['案例不存在', {
      status: 404,
      code: AGENT_ERROR_CODES.customerNotFound,
      message: normalizedMessage
    }],
    ['案例不存在或已在回收站中', {
      status: 409,
      code: AGENT_ERROR_CODES.customerAlreadyInTrash,
      message: normalizedMessage
    }],
    ['案例不存在或未在回收站中', {
      status: 409,
      code: AGENT_ERROR_CODES.customerNotInTrash,
      message: normalizedMessage
    }],
    ['案例已变化，请刷新回收站后重试', {
      status: 409,
      code: AGENT_ERROR_CODES.customerNotInTrash,
      message: normalizedMessage
    }],
    ['分类名称不能为空', {
      status: 400,
      code: AGENT_ERROR_CODES.categoryNameRequired,
      message: normalizedMessage
    }],
    ['分类名称不能为"全部"，该名称为系统保留字', {
      status: 400,
      code: AGENT_ERROR_CODES.categoryReservedName,
      message: normalizedMessage
    }],
    ['分类名称不能为"全部"', {
      status: 400,
      code: AGENT_ERROR_CODES.categoryReservedName,
      message: normalizedMessage
    }],
    ['该分类名称已存在，请更换', {
      status: 409,
      code: AGENT_ERROR_CODES.categoryNameConflict,
      message: normalizedMessage
    }],
    ['请提供目标分类 ID', {
      status: 400,
      code: AGENT_ERROR_CODES.targetCategoryRequired,
      message: normalizedMessage
    }],
    ['请提供要删除的解决方案 ID 列表', {
      status: 400,
      code: AGENT_ERROR_CODES.customerIdsRequired,
      message: normalizedMessage
    }],
    ['请提供要删除的案例 ID 列表', {
      status: 400,
      code: AGENT_ERROR_CODES.customerIdsRequired,
      message: normalizedMessage
    }],
    ['请提供要迁移的解决方案 ID 列表', {
      status: 400,
      code: AGENT_ERROR_CODES.customerIdsRequired,
      message: normalizedMessage
    }],
    ['请提供分类 ID 列表', {
      status: 400,
      code: AGENT_ERROR_CODES.categoryIdsRequired,
      message: normalizedMessage
    }],
    ['请提供排序数据', {
      status: 400,
      code: AGENT_ERROR_CODES.invalidSortPayload,
      message: normalizedMessage
    }]
  ]);

  if (exactMatch.has(normalizedMessage)) {
    return exactMatch.get(normalizedMessage)!;
  }

  if (normalizedMessage.startsWith('标题长度不能超过') || normalizedMessage.startsWith('描述长度不能超过')) {
    return {
      status: 400,
      code: AGENT_ERROR_CODES.validationError,
      message: normalizedMessage
    };
  }

  if (normalizedMessage.startsWith('缺少必填字段:')) {
    return {
      status: 400,
      code: AGENT_ERROR_CODES.validationError,
      message: normalizedMessage
    };
  }

  if (normalizedMessage.startsWith('案例体验链接')) {
    return {
      status: 400,
      code: AGENT_ERROR_CODES.validationError,
      message: normalizedMessage
    };
  }

  if (normalizedMessage.startsWith('该分类下存在 ')) {
    return {
      status: 409,
      code: AGENT_ERROR_CODES.categoryNotEmpty,
      message: normalizedMessage
    };
  }

  return {
    status: fallback?.status ?? 500,
    code: fallback?.code ?? AGENT_ERROR_CODES.internalError,
    message: normalizedMessage || fallback?.message || '服务器内部错误',
    details: fallback?.details
  };
}
