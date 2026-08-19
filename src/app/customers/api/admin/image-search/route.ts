import { NextRequest, NextResponse } from 'next/server';
import { readSystemSettings } from '@/customers/lib/system-settings';
import {
  buildDefaultFallbackQuery,
  buildPexelsPhotoSource,
  generateAISearchQuery,
  getPexelsApiKey,
  searchPexelsAssetWithFallback,
  uploadPexelsAsset
} from '@/customers/lib/ai-asset-search';
import { requireAdminApi } from '@/customers/lib/admin-api';
import { readJsonRecord } from '@/customers/lib/request-json';

function buildFallbackQuery(prompt: string) {
  return buildDefaultFallbackQuery(prompt);
}

async function generateSearchQuery(promptText: string) {
  const fallbackQuery = buildFallbackQuery(promptText);
  const settings = await readSystemSettings();

  return generateAISearchQuery({
    aiConfig: {
      url: settings.ai_api_url,
      key: settings.ai_api_key,
      model: settings.ai_model
    },
    fallbackQuery,
    userPrompt: [
      '你是一个 Pexels 图片检索词生成器。',
      '你的任务是把用户的配图需求转换为适合图片搜索的英文短语。',
      '输出必须是 JSON，格式为 {"query":"英文检索词","reason":"中文理由"}。',
      '要求：',
      '1. query 只用英文，2 到 8 个词。',
      '2. 优先输出具体拍摄场景、人物动作、工作场景或设备场景。',
      '3. 不要输出品牌名、营销口号、抽象概念堆砌。',
      '',
      `用户需求：${promptText}`
    ].join('\n'),
    systemPrompt:
      'You turn Chinese image descriptions into concrete English Pexels photo search phrases.',
    missingConfigReason: 'AI 配置缺失，已退回提炼。',
    requestFailedReason: 'AI 生成检索词失败，已退回提炼。',
    emptyContentReason: 'AI 返回内容为空，已退回提炼。',
    invalidQueryReason: 'AI 未生成有效检索词，已退回提炼。',
    parseErrorReason: 'AI 解析异常，已退回提炼。',
    successReason: 'AI 已根据需求生成检索词。'
  });
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminApi(req);
  if (!auth.ok) {
    return auth.response;
  }

  try {
    const body = await readJsonRecord(req);
    const prompt = String(body.prompt || '').trim();
    const storageFolder = String(body.storageFolder || 'untitled').trim();

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: '请输入配图需求' },
        { status: 400 }
      );
    }

    const settings = await readSystemSettings();
    const pexelsApiKey = getPexelsApiKey(settings);
    if (!pexelsApiKey) {
      return NextResponse.json(
        { success: false, error: '请先在系统配置中心填写 Pexels API Key' },
        { status: 500 }
      );
    }

    const queryResult = await generateSearchQuery(prompt);
    const assetResult = await searchPexelsAssetWithFallback({
      pexelsApiKey,
      initialQuery: queryResult.query,
      fallbackQuery: buildFallbackQuery(prompt)
    });

    if (!assetResult.success && assetResult.reason === 'not_found') {
      return NextResponse.json(
        {
          success: false,
          error: '没有找到合适的配图，请尝试更换描述'
        },
        { status: 404 }
      );
    }

    if (!assetResult.success) {
      return NextResponse.json(
        { success: false, error: '命中的图片缺少可用地址' },
        { status: 500 }
      );
    }

    const { url: imageUrl } = await uploadPexelsAsset({
      settings,
      sourceUrl: assetResult.photoUrl,
      storageFolder,
      fileStem: 'ai-image',
      downloadErrorMessage: '下载图片失败'
    });

    return NextResponse.json({
      success: true,
      imageUrl,
      query: assetResult.usedQuery,
      reason: queryResult.reason,
      source: buildPexelsPhotoSource(assetResult.photo, assetResult.photoUrl)
    });
  } catch (error: unknown) {
    console.error('AI image search error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'AI 配图失败'
      },
      { status: 500 }
    );
  }
}
