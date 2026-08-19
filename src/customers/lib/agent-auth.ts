import { NextRequest } from 'next/server';
import { readSystemSettings } from '@/customers/lib/system-settings';

export interface AuthResult {
  authenticated: boolean;
  method?: 'api_key';
}

let cachedApiKey: string | null = null;
let cachedApiKeyAt = 0;

async function getAgentApiKey(): Promise<string> {
  const now = Date.now();
  if (cachedApiKey && now - cachedApiKeyAt < 30_000) {
    return cachedApiKey;
  }
  const settings = await readSystemSettings();
  const key = settings.agent_api_key;
  cachedApiKey = key;
  cachedApiKeyAt = now;
  return key;
}

export async function authenticateAgent(request: NextRequest): Promise<AuthResult> {
  // Agent v1 接口统一使用 apikey 请求头鉴权。
  const requestApiKey = request.headers.get('apikey');
  const validKey = await getAgentApiKey();
  if (validKey && requestApiKey === validKey) {
    return { authenticated: true, method: 'api_key' };
  }

  return { authenticated: false };
}
