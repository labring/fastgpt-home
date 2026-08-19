import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { readSystemSettings } from '@/customers/lib/system-settings';
import { extractS3KeyFromPublicUrl, getMissingS3Config } from '@/customers/lib/solution-storage';
import { buildThumbnailKey } from '@/customers/lib/image-thumbnail';

type DeleteAssetUrlsOptions = {
  includeDerivedThumbnails?: boolean;
};

export async function deleteAssetUrls(urls: string[], options: DeleteAssetUrlsOptions = {}) {
  const uniqueUrls = [...new Set(urls.map((url) => url.trim()).filter(Boolean))];
  if (uniqueUrls.length === 0) {
    return {
      requestedCount: urls.length,
      deletedCount: 0,
      skippedCount: 0,
      deletedKeys: [] as string[],
      skippedUrls: [] as string[],
    };
  }

  const settings = await readSystemSettings();
  const missingS3Config = getMissingS3Config(settings, { requirePublicUrl: true });
  if (missingS3Config.length > 0) {
    throw new Error(`S3 配置不完整，请先补充：${missingS3Config.join('、')}`);
  }

  const keys = uniqueUrls
    .map((url) => ({ url, key: extractS3KeyFromPublicUrl(settings.s3_public_url, url) }))
    .filter((item): item is { url: string; key: string } => Boolean(item.key));

  const skippedUrls = uniqueUrls.filter((url) => !keys.some((item) => item.url === url));
  const baseKeys = [...new Set(keys.map((item) => item.key))];
  const derivedThumbnailKeys = options.includeDerivedThumbnails
    ? baseKeys
        .map((key) => buildThumbnailKey(key))
        .filter((thumbnailKey) => !baseKeys.includes(thumbnailKey))
    : [];
  const keysToDelete = [...baseKeys, ...derivedThumbnailKeys];

  if (keysToDelete.length === 0) {
    return {
      requestedCount: urls.length,
      deletedCount: 0,
      skippedCount: skippedUrls.length,
      deletedKeys: [] as string[],
      skippedUrls,
    };
  }

  const s3Client = new S3Client({
    region: settings.s3_region,
    endpoint: settings.s3_endpoint,
    credentials: {
      accessKeyId: settings.s3_access_key_id,
      secretAccessKey: settings.s3_secret_access_key,
    },
    forcePathStyle: true,
  });

  await Promise.all(
    keysToDelete.map((key) =>
      s3Client.send(new DeleteObjectCommand({ Bucket: settings.s3_bucket, Key: key }))
    )
  );

  return {
    requestedCount: urls.length,
    deletedCount: keysToDelete.length,
    skippedCount: skippedUrls.length,
    deletedKeys: keysToDelete,
    skippedUrls,
  };
}
