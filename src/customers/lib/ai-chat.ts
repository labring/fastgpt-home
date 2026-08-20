export interface AIConfig {
  url: string;
  key: string;
  model: string;
}

export interface AIMessage {
  role: string;
  content: string;
}

interface AIChatRequestOptions {
  config: AIConfig;
  messages: AIMessage[];
  stream: boolean;
  temperature: number;
  /** 非流式请求的超时（ms）；流式请求不应设置。 */
  timeoutMs?: number;
}

export function getEnvAIConfig(): AIConfig {
  return {
    url: process.env.AI_API_URL || '',
    key: process.env.AI_API_KEY || '',
    model: process.env.AI_MODEL || ''
  };
}

export function ensureAIConfig(
  config: Partial<AIConfig>,
  message = 'AI configuration is missing environment variables.'
): AIConfig {
  const normalizedConfig: AIConfig = {
    url: config.url || '',
    key: config.key || '',
    model: config.model || ''
  };

  if (!normalizedConfig.url || !normalizedConfig.key || !normalizedConfig.model) {
    throw new Error(message);
  }

  return normalizedConfig;
}

export async function requestAIChat({
  config,
  messages,
  stream,
  temperature,
  timeoutMs
}: AIChatRequestOptions) {
  const normalizedConfig = ensureAIConfig(config);

  return fetch(normalizedConfig.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${normalizedConfig.key}`
    },
    body: JSON.stringify({
      model: normalizedConfig.model,
      messages,
      stream,
      temperature
    }),
    // 非流式请求设置超时，避免上游 AI 卡住时连接长期挂起。
    ...(timeoutMs ? { signal: AbortSignal.timeout(timeoutMs) } : {})
  });
}

export function createEventStreamResponse(body: ReadableStream | null) {
  return new Response(body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    }
  });
}

export function getRequestClientIp(req: Pick<Request, 'headers'>) {
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');

  return (forwardedFor ? forwardedFor.split(',')[0].trim() : realIp) || '127.0.0.1';
}
