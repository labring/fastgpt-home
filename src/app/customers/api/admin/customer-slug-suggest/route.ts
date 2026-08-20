import { NextRequest, NextResponse } from 'next/server';
import { readSystemSettings } from '@/customers/lib/system-settings';
import {
  isCustomerSlugAvailable,
  isValidCustomerSlug,
  normalizeCustomerSlug
} from '@/customers/lib/customer-slug';
import { requestAIChat } from '@/customers/lib/ai-chat';
import { requireAdminApi } from '@/customers/lib/admin-api';
import { readJsonRecord } from '@/customers/lib/request-json';

function getTextFromAIResponse(data: unknown) {
  if (
    data &&
    typeof data === 'object' &&
    'choices' in data &&
    Array.isArray(data.choices)
  ) {
    const firstChoice = data.choices[0] as { message?: { content?: unknown } } | undefined;
    return typeof firstChoice?.message?.content === 'string' ? firstChoice.message.content : '';
  }

  return '';
}

function extractSlug(rawText: string) {
  const firstLine = rawText.split('\n').find((line) => line.trim()) || '';
  return normalizeCustomerSlug(firstLine.replace(/`/g, '').replace(/^slug\s*:\s*/i, ''));
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi(request);
  if (!auth.ok) {
    return auth.response;
  }

  try {
    const body = await readJsonRecord(request);
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    const excludeId = typeof body.excludeId === 'string' ? body.excludeId.trim() : undefined;

    if (!title) {
      return NextResponse.json({ error: '案例标题不能为空' }, { status: 400 });
    }

    const settings = await readSystemSettings();
    const apiUrl = settings.ai_api_url;
    const apiKey = settings.ai_api_key;
    const model = settings.ai_model;

    if (!apiUrl || !apiKey || !model) {
      return NextResponse.json({ error: 'AI API configuration is missing in settings' }, { status: 500 });
    }

    const response = await requestAIChat({
      config: {
        url: apiUrl,
        key: apiKey,
        model
      },
      messages: [
        {
          role: 'system',
          content:
            'You generate concise English URL slugs for customers or customer case studies. Return exactly one slug. Use lowercase English words, numbers only if necessary, and hyphens between words. Do not return Chinese, pinyin, quotes, markdown, JSON, or explanations.'
        },
        {
          role: 'user',
          content: `Customer or case title: ${title}`
        }
      ],
      stream: false,
      temperature: 0.2
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI customer slug suggestion failed:', errorText);
      return NextResponse.json({ error: 'AI API responded with an error' }, { status: response.status });
    }

    const data = await response.json();
    const slug = extractSlug(getTextFromAIResponse(data));

    if (!slug || !isValidCustomerSlug(slug)) {
      return NextResponse.json({ error: 'AI 未返回合法 Slug，请手动填写' }, { status: 422 });
    }

    if (!(await isCustomerSlugAvailable(slug, { excludeId }))) {
      return NextResponse.json({ error: 'AI 建议的 Slug 已存在，请重试或手动调整', slug }, { status: 409 });
    }

    return NextResponse.json({ slug });
  } catch (error) {
    console.error('Error suggesting customer slug:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Slug 生成失败' },
      { status: 500 }
    );
  }
}
