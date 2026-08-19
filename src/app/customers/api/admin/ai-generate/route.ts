import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/customers/lib/db';
import { SystemConfig } from '@/customers/models/SystemConfig';
import { DEFAULT_AI_PROMPT } from '@/customers/lib/constants';
import { readSystemSettings } from '@/customers/lib/system-settings';
import { createEventStreamResponse, requestAIChat } from '@/customers/lib/ai-chat';
import { requireAdminApi } from '@/customers/lib/admin-api';
import { readJsonRecord } from '@/customers/lib/request-json';

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Internal Server Error';
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminApi(req);
  if (!auth.ok) {
    return auth.response;
  }

  try {
    const body = await readJsonRecord(req);
    const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const settings = await readSystemSettings();
    const apiUrl = settings.ai_api_url;
    const apiKey = settings.ai_api_key;
    const model = settings.ai_model;

    if (!apiUrl || !apiKey || !model) {
      return NextResponse.json({ error: 'AI API configuration is missing in settings' }, { status: 500 });
    }

    // Get system prompt from DB or fallback to default
    await dbConnect();
    const config = await SystemConfig.findOne({ key: 'ai_system_prompt' });
    const systemPrompt = config?.value || DEFAULT_AI_PROMPT;

    const response = await requestAIChat({
      config: {
        url: apiUrl,
        key: apiKey,
        model
      },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      stream: true,
      temperature: 0.7
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('AI API error:', err);
      return NextResponse.json({ error: 'AI API responded with an error' }, { status: response.status });
    }

    return createEventStreamResponse(response.body);

  } catch (error: unknown) {
    console.error('Error generating AI content:', error);
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
