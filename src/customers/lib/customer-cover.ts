import { readSystemSettings } from '@/customers/lib/system-settings';
import {
  buildDefaultFallbackQuery,
  buildPexelsPhotoSource,
  generateAISearchQuery,
  getPexelsApiKey,
  searchPexelsAssetWithFallback,
  truncateText,
  uploadPexelsAsset
} from '@/customers/lib/ai-asset-search';

export interface CustomerCoverSearchInput {
  title?: string;
  description?: string;
  content?: string;
  storageFolder: string;
}

export interface CustomerCoverSearchResult {
  imageUrl: string;
  thumbnailUrl: string;
  query: string;
  reason: string;
  source: ReturnType<typeof buildPexelsPhotoSource>;
}

export function toPlainText(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*`~\-_|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function buildCustomerCoverFallbackQuery({
  title,
  description,
  content
}: Required<Pick<CustomerCoverSearchInput, 'title' | 'description' | 'content'>>) {
  const plainContent = toPlainText(content);
  const seeds = [title, description, plainContent]
    .map((item) => item.trim())
    .filter(Boolean)
    .join(' ');

  return buildDefaultFallbackQuery(seeds);
}

async function generateCoverSearchQuery(payload: {
  title: string;
  description: string;
  content: string;
}) {
  const fallbackQuery = buildCustomerCoverFallbackQuery(payload);
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
      '你的任务是把案例信息转换为适合横向封面图搜索的英文短语。',
      '输出必须是 JSON，格式为 {"query":"英文检索词","reason":"中文理由"}。',
      '要求：',
      '1. query 只用英文，2 到 8 个词。',
      '2. 优先输出具体拍摄场景、人物动作、工作场景或设备场景。',
      '3. 不要输出品牌名、营销口号、抽象概念堆砌。',
      '4. 检索图必须适合作为 SaaS/企业案例的横向头图。',
      '',
      `标题：${payload.title || '无'}`,
      `描述：${payload.description || '无'}`,
      `正文摘要：${truncateText(toPlainText(payload.content), 1200) || '无'}`
    ].join('\n'),
    systemPrompt:
      'You turn Chinese customer descriptions into concrete English Pexels photo search phrases for landscape website hero covers.',
    missingConfigReason: 'AI 配置缺失，已退回标题/描述/正文提炼。',
    requestFailedReason: 'AI 生成检索词失败，已退回标题/描述/正文提炼。',
    emptyContentReason: 'AI 返回内容为空，已退回标题/描述/正文提炼。',
    invalidQueryReason: 'AI 未生成有效检索词，已退回标题/描述/正文提炼。',
    parseErrorReason: 'AI 解析异常，已退回标题/描述/正文提炼。',
    successReason: 'AI 已根据案例内容生成检索词。'
  });
}

export async function generateCustomerCover({
  title = '',
  description = '',
  content = '',
  storageFolder
}: CustomerCoverSearchInput): Promise<CustomerCoverSearchResult> {
  const normalizedTitle = title.trim();
  const normalizedDescription = description.trim();
  const normalizedContent = content.trim();
  const normalizedStorageFolder = storageFolder.trim();

  if (!normalizedTitle && !normalizedDescription && !normalizedContent) {
    throw new Error('请先填写标题、描述或正文内容');
  }

  if (!normalizedStorageFolder) {
    throw new Error('缺少可用的存储目录');
  }

  const settings = await readSystemSettings();
  const pexelsApiKey = getPexelsApiKey(settings);
  if (!pexelsApiKey) {
    throw new Error('请先在系统配置中心填写 Pexels API Key');
  }

  const queryResult = await generateCoverSearchQuery({
    title: normalizedTitle,
    description: normalizedDescription,
    content: normalizedContent
  });

  const assetResult = await searchPexelsAssetWithFallback({
    pexelsApiKey,
    initialQuery: queryResult.query,
    fallbackQuery: buildCustomerCoverFallbackQuery({
      title: normalizedTitle,
      description: normalizedDescription,
      content: normalizedContent
    })
  });

  if (!assetResult.success && assetResult.reason === 'not_found') {
    throw new Error('没有找到合适的横向封面图，请补充更具体的标题或描述');
  }

  if (!assetResult.success) {
    throw new Error('命中的图片缺少可用地址');
  }

  const { url: imageUrl, thumbnailUrl } = await uploadPexelsAsset({
    settings,
    sourceUrl: assetResult.photoUrl,
    storageFolder: normalizedStorageFolder,
    fileStem: 'ai-cover',
    downloadErrorMessage: '下载封面图失败'
  });

  return {
    imageUrl,
    thumbnailUrl,
    query: assetResult.usedQuery,
    reason: queryResult.reason,
    source: buildPexelsPhotoSource(assetResult.photo, assetResult.photoUrl)
  };
}
