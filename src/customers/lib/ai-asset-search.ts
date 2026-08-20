import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import type { SystemSettings } from '@/customers/lib/system-settings';
import {
  buildS3PublicUrl,
  getMissingS3Config,
  normalizeCustomerFolderName
} from '@/customers/lib/customer-storage';
import {
  shouldGenerateThumbnail,
  generateThumbnail,
  buildThumbnailKey
} from '@/customers/lib/image-thumbnail';
import { requestAIChat } from '@/customers/lib/ai-chat';

const PEXELS_SEARCH_API = 'https://api.pexels.com/v1/search';
const DEFAULT_PER_PAGE = 8;

export interface GeneratedQueryResult {
  query: string;
  reason: string;
}

export interface PexelsPhoto {
  id: number;
  alt?: string;
  width?: number;
  height?: number;
  photographer?: string;
  url?: string;
  src?: Record<string, string>;
}

interface GenerateSearchQueryOptions {
  aiConfig: {
    url: string;
    key: string;
    model: string;
  };
  fallbackQuery: string;
  userPrompt: string;
  systemPrompt: string;
  missingConfigReason: string;
  requestFailedReason: string;
  emptyContentReason: string;
  invalidQueryReason: string;
  parseErrorReason: string;
  successReason: string;
}

interface UploadRemoteImageToStorageOptions {
  settings: SystemSettings;
  sourceUrl: string;
  storageFolder: string;
  fileStem: string;
  downloadErrorMessage: string;
}

interface SearchPexelsAssetWithFallbackOptions {
  pexelsApiKey: string;
  initialQuery: string;
  fallbackQuery: string;
}

interface UploadPexelsAssetOptions {
  settings: SystemSettings;
  storageFolder: string;
  fileStem: string;
  downloadErrorMessage: string;
}

type SearchPexelsAssetResult =
  | {
      success: true;
      usedQuery: string;
      photo: PexelsPhoto;
      photoUrl: string;
    }
  | {
      success: false;
      reason: 'not_found' | 'missing_photo_url';
    };

export function truncateText(value: string, maxLength: number) {
  return value.length > maxLength ? value.slice(0, maxLength) : value;
}

export function normalizeSearchText(value: string) {
  return value.replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
}

export function buildDefaultFallbackQuery(value: string) {
  const normalized = normalizeSearchText(value);
  return normalized ? truncateText(normalized, 60) : 'business technology teamwork';
}

export function extractJsonObject(input: string) {
  const match = input.match(/\{[\s\S]*\}/);
  return match ? match[0] : input;
}

export async function generateAISearchQuery({
  aiConfig,
  fallbackQuery,
  userPrompt,
  systemPrompt,
  missingConfigReason,
  requestFailedReason,
  emptyContentReason,
  invalidQueryReason,
  parseErrorReason,
  successReason
}: GenerateSearchQueryOptions): Promise<GeneratedQueryResult> {
  if (!aiConfig.url || !aiConfig.key || !aiConfig.model) {
    return {
      query: fallbackQuery,
      reason: missingConfigReason
    };
  }

  try {
    const response = await requestAIChat({
      config: aiConfig,
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      stream: false,
      temperature: 0.3
    });

    if (!response.ok) {
      return {
        query: fallbackQuery,
        reason: requestFailedReason
      };
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content || typeof content !== 'string') {
      return {
        query: fallbackQuery,
        reason: emptyContentReason
      };
    }

    const parsed = JSON.parse(extractJsonObject(content));
    const query = String(parsed?.query || '').trim();
    const reason = String(parsed?.reason || '').trim();

    if (!query) {
      return {
        query: fallbackQuery,
        reason: invalidQueryReason
      };
    }

    return {
      query,
      reason: reason || successReason
    };
  } catch {
    return {
      query: fallbackQuery,
      reason: parseErrorReason
    };
  }
}

export async function searchPexels(query: string, apiKey: string) {
  const url = new URL(PEXELS_SEARCH_API);
  url.searchParams.set('query', query);
  url.searchParams.set('orientation', 'landscape');
  url.searchParams.set('size', 'large');
  url.searchParams.set('per_page', String(DEFAULT_PER_PAGE));
  url.searchParams.set('page', '1');
  url.searchParams.set('locale', 'en-US');

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: apiKey,
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Pexels 搜索失败: ${details || response.statusText}`);
  }

  return response.json() as Promise<{ photos?: PexelsPhoto[] }>;
}

export function getPexelsApiKey(settings: Pick<SystemSettings, 'pexels_api_key'>) {
  return settings.pexels_api_key || process.env.PEXELS_API_KEY || '';
}

export function getPreferredPhotoUrl(photo: PexelsPhoto) {
  return (
    photo.src?.landscape ||
    photo.src?.large2x ||
    photo.src?.large ||
    photo.src?.original ||
    ''
  );
}

export function buildPexelsPhotoSource(photo: PexelsPhoto, photoUrl: string) {
  return {
    id: photo.id,
    alt: photo.alt || '',
    photographer: photo.photographer || '',
    pexelsUrl: photo.url || '',
    originalUrl: photoUrl,
    width: photo.width || 0,
    height: photo.height || 0
  };
}

export async function searchPexelsAssetWithFallback({
  pexelsApiKey,
  initialQuery,
  fallbackQuery
}: SearchPexelsAssetWithFallbackOptions): Promise<SearchPexelsAssetResult> {
  let searchResult = await searchPexels(initialQuery, pexelsApiKey);
  let photos = searchResult.photos || [];
  let usedQuery = initialQuery;

  if (photos.length === 0 && fallbackQuery !== initialQuery) {
    searchResult = await searchPexels(fallbackQuery, pexelsApiKey);
    photos = searchResult.photos || [];
    usedQuery = fallbackQuery;
  }

  if (photos.length === 0) {
    return { success: false, reason: 'not_found' };
  }

  const photo = photos[0];
  const photoUrl = getPreferredPhotoUrl(photo);

  if (!photoUrl) {
    return { success: false, reason: 'missing_photo_url' };
  }

  return {
    success: true,
    usedQuery,
    photo,
    photoUrl
  };
}

export function getFileExtension(contentType: string, url: string) {
  if (contentType.includes('png')) return 'png';
  if (contentType.includes('webp')) return 'webp';
  if (contentType.includes('gif')) return 'gif';
  if (contentType.includes('jpeg') || contentType.includes('jpg')) return 'jpg';

  const pathname = new URL(url).pathname;
  const match = pathname.match(/\.([a-zA-Z0-9]+)$/);
  return match?.[1]?.toLowerCase() || 'jpg';
}

export async function uploadRemoteImageToStorage({
  settings,
  sourceUrl,
  storageFolder,
  fileStem,
  downloadErrorMessage
}: UploadRemoteImageToStorageOptions) {
  const missingS3Config = getMissingS3Config(settings, { requirePublicUrl: true });
  if (missingS3Config.length > 0) {
    throw new Error(`S3 配置不完整，请先补充：${missingS3Config.join('、')}`);
  }

  const safeFolder = normalizeCustomerFolderName(storageFolder || 'untitled');
  const s3Client = new S3Client({
    region: settings.s3_region,
    endpoint: settings.s3_endpoint,
    credentials: {
      accessKeyId: settings.s3_access_key_id,
      secretAccessKey: settings.s3_secret_access_key
    },
    forcePathStyle: true
  });

  const imageResponse = await fetch(sourceUrl);
  if (!imageResponse.ok) {
    throw new Error(downloadErrorMessage);
  }

  const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
  const extension = getFileExtension(contentType, sourceUrl);
  const body = Buffer.from(await imageResponse.arrayBuffer());
  const key = `uploads/${safeFolder}/${Date.now()}-${fileStem}.${extension}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: settings.s3_bucket,
      Key: key,
      Body: body,
      ContentType: contentType
    })
  );

  const url = buildS3PublicUrl(settings.s3_public_url, key);
  let thumbnailUrl = url;

  if (shouldGenerateThumbnail(contentType)) {
    try {
      const thumbnailBuffer = await generateThumbnail(body, contentType);
      const thumbnailKey = buildThumbnailKey(key);
      await s3Client.send(new PutObjectCommand({
        Bucket: settings.s3_bucket,
        Key: thumbnailKey,
        Body: thumbnailBuffer,
        ContentType: 'image/webp',
      }));
      thumbnailUrl = buildS3PublicUrl(settings.s3_public_url, thumbnailKey);
      console.log('Thumbnail generated and uploaded:', thumbnailKey);
    } catch (err) {
      console.error('Thumbnail generation failed:', {
        contentType,
        originalKey: key,
        error: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined,
      });
    }
  }

  return { url, thumbnailUrl };
}

export async function uploadPexelsAsset({
  settings,
  sourceUrl,
  storageFolder,
  fileStem,
  downloadErrorMessage
}: UploadPexelsAssetOptions & {
  sourceUrl: string;
}): Promise<{ url: string; thumbnailUrl: string }> {
  return uploadRemoteImageToStorage({
    settings,
    sourceUrl,
    storageFolder,
    fileStem,
    downloadErrorMessage
  });
}
