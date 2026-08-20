import { NextResponse } from 'next/server';
import { rateLimit } from '@/customers/lib/rate-limit';
import {
  createEventStreamResponse,
  getEnvAIConfig,
  getRequestClientIp,
  requestAIChat
} from '@/customers/lib/ai-chat';
import {
  buildCustomerQaMessages,
  getCustomerContentById
} from '@/customers/lib/customer-ai';
import { readJsonRecord } from '@/customers/lib/request-json';

export async function POST(req: Request) {
  try {
    const ip = getRequestClientIp(req);
    const { success } = rateLimit(ip, 10, 60 * 1000); // 限制每个 IP 每分钟 10 次提问

    if (!success) {
      return NextResponse.json({ error: '提问过于频繁，请稍后再试' }, { status: 429 });
    }

    const body = await readJsonRecord(req);
    const customerId = typeof body.customerId === 'string' ? body.customerId.trim() : '';
    const question = typeof body.question === 'string' ? body.question.trim() : '';
    const history = body.history;

    if (!customerId || !question) {
      return NextResponse.json({ error: 'Missing customerId or question' }, { status: 400 });
    }

    if (question.length > 500) {
      return NextResponse.json({ error: '问题过长，请精简后重试' }, { status: 400 });
    }

    const content = await getCustomerContentById(customerId);
    if (content === null) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    const aiConfig = getEnvAIConfig();
    const messages = buildCustomerQaMessages({
      content,
      question,
      history
    });

    const response = await requestAIChat({
      config: aiConfig,
      messages,
      stream: true,
      temperature: 0.3
    });

    if (!response.ok) {
      throw new Error(`AI API request failed with status ${response.status}`);
    }

    return createEventStreamResponse(response.body);

  } catch (error) {
    console.error('AI QA Stream Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
