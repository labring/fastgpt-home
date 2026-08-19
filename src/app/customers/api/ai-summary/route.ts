import { NextResponse } from 'next/server';
import { rateLimit } from '@/customers/lib/rate-limit';
import {
  createEventStreamResponse,
  getEnvAIConfig,
  getRequestClientIp,
  requestAIChat
} from '@/customers/lib/ai-chat';
import {
  getSolutionContentById,
  getSolutionSummaryPrompt
} from '@/customers/lib/solution-ai';
import { readJsonRecord } from '@/customers/lib/request-json';

export async function POST(req: Request) {
  try {
    const ip = getRequestClientIp(req);
    const { success } = rateLimit(ip, 10, 60 * 1000); // 限制每个 IP 每分钟 10 次请求 (因为有 3 个并发请求，所以设置大一点)

    if (!success) {
      return NextResponse.json({ error: '请求过于频繁，请稍后再试' }, { status: 429 });
    }

    const body = await readJsonRecord(req);
    const solutionId = typeof body.solutionId === 'string' ? body.solutionId.trim() : '';
    const type = typeof body.type === 'string' ? body.type.trim() : '';

    if (!solutionId || !type) {
      return NextResponse.json({ error: 'Missing solutionId or type' }, { status: 400 });
    }

    const content = await getSolutionContentById(solutionId);
    if (content === null) {
      return NextResponse.json({ error: 'Solution not found' }, { status: 404 });
    }

    const prompt = getSolutionSummaryPrompt(type);
    if (!prompt) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    const aiConfig = getEnvAIConfig();

    const response = await requestAIChat({
      config: aiConfig,
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: content }
      ],
      stream: true,
      temperature: 0.3
    });

    if (!response.ok) {
      throw new Error(`AI API request failed with status ${response.status}`);
    }

    return createEventStreamResponse(response.body);

  } catch (error) {
    console.error('AI Summary Stream Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
