import { NextRequest } from 'next/server';
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
import { deleteAssetUrls } from '@/customers/lib/customer-asset-gc';

export const dynamic = 'force-dynamic';

const MAX_URLS = 100;

function parseUrls(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return [...new Set(value.filter((url): url is string => typeof url === 'string' && Boolean(url.trim())).map((url) => url.trim()))];
}

export async function POST(request: NextRequest) {
  const context = createAgentRequestContext(request);
  const authError = await requireAgentAuth(request, context);
  if (authError) {
    return toAgentResponse(authError);
  }

  try {
    const result = await runAgentIdempotentOperation(request, context, async () => {
      const requestBody = await readJsonBody(request, context);
      if (!requestBody.success) {
        return requestBody.result;
      }

      if (!isRecord(requestBody.data)) {
        return errorResult(context, 400, AGENT_ERROR_CODES.invalidRequestBody, '请求体必须是 JSON 对象');
      }

      const urls = parseUrls(requestBody.data.urls);
      if (urls.length === 0) {
        return errorResult(context, 400, AGENT_ERROR_CODES.urlsRequired, '请提供要清理的媒体 URL 列表');
      }

      if (urls.length > MAX_URLS) {
        return errorResult(
          context,
          422,
          AGENT_ERROR_CODES.batchLimitExceeded,
          `单次最多清理 ${MAX_URLS} 个 URL`,
          { maxUrls: MAX_URLS }
        );
      }

      const includeDerivedThumbnails = requestBody.data.includeDerivedThumbnails !== false;
      const gcResult = await deleteAssetUrls(urls, { includeDerivedThumbnails });

      return successResult(context, gcResult);
    });

    return toAgentResponse(result);
  } catch (error) {
    console.error('Error deleting uploaded assets:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      error instanceof Error ? error.message : '媒体清理失败'
    ));
  }
}
