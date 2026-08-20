import 'server-only';

import mongoose from 'mongoose';
import {
  CopyObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  S3Client
} from '@aws-sdk/client-s3';
import dbConnect from '@/customers/lib/db';
import Category from '@/customers/models/Category';
import Customer from '@/customers/models/Customer';
import { buildThumbnailKey } from '@/customers/lib/image-thumbnail';
import { revalidateAdminRouteTree } from '@/customers/lib/admin-cache';
import { revalidateCustomerRefs } from '@/customers/lib/public-cache-invalidation';
import {
  collectCurrentMediaUrls,
  diffRemovedMediaUrls,
  getErrorMessage,
  resolveStorageFolder
} from '@/customers/lib/admin-customer-utils';
import { readSystemSettings } from '@/customers/lib/system-settings';
import {
  extractS3KeyFromPublicUrl,
  getMissingS3Config
} from '@/customers/lib/customer-storage';
import { allocateUntitledCustomerFolder } from '@/customers/lib/customer-storage.server';
import { isValidObjectId } from '@/customers/lib/object-id';
import {
  isCustomerSlugAvailable,
  isValidCustomerSlug,
  normalizeCustomerSlug
} from '@/customers/lib/customer-slug';

export interface SaveCustomerInput {
  id?: string;
  title: string;
  storageFolder?: string;
  description: string;
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  publishedAt?: string | Date | null;
  isPublicCase?: boolean;
  caseOrg?: string;
  clearanceLevel?: 'A' | 'B' | 'C' | '';
  caseNo?: number;
  citedNumbers?: string;
  relatedCustomerIds?: string[];
  categoryId: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  freeUseUrl?: string;
  content: string;
  isPublished?: boolean;
  newlyUploadedUrls?: string[];
}

let cachedS3Client: S3Client | null = null;
let cachedS3Settings: string | null = null;

function revalidateCustomerViews(customerId?: string, categorySlug?: string, previousCategorySlug?: string) {
  revalidateAdminRouteTree();
  revalidateCustomerRefs(customerId ? { id: customerId, categorySlug, previousCategorySlug } : []);
}

async function getS3Client() {
  const settings = await readSystemSettings();
  const settingsStr = JSON.stringify({
    region: settings.s3_region,
    endpoint: settings.s3_endpoint,
    accessKeyId: settings.s3_access_key_id,
    secretAccessKey: settings.s3_secret_access_key
  });

  if (!cachedS3Client || cachedS3Settings !== settingsStr) {
    cachedS3Client = new S3Client({
      region: settings.s3_region,
      endpoint: settings.s3_endpoint,
      credentials: {
        accessKeyId: settings.s3_access_key_id,
        secretAccessKey: settings.s3_secret_access_key
      },
      forcePathStyle: true
    });
    cachedS3Settings = settingsStr;
  }

  return { client: cachedS3Client, bucket: settings.s3_bucket };
}

async function deleteKeysFromStorage(
  keys: string[],
  logContext: 'image' | 'media' | 'orphaned media' | 'folder orphaned media'
) {
  if (keys.length === 0) {
    return;
  }

  const { client: s3Client, bucket } = await getS3Client();
  const uniqueKeys = [...new Set(keys)];

  try {
    await Promise.all(
      uniqueKeys.map((key) =>
        s3Client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }))
      )
    );
    console.log(`Deleted S3 objects (${logContext}):`, uniqueKeys);
  } catch (error) {
    console.error(`Failed to delete ${logContext} from S3:`, error);
  }
}

async function deleteUrlsFromStorage(
  urls: string[],
  logContext: 'image' | 'media' | 'orphaned media' | 'folder orphaned media'
) {
  if (urls.length === 0) {
    return;
  }

  const settings = await readSystemSettings();
  const publicUrlBase = settings.s3_public_url;
  const missingS3Config = getMissingS3Config(settings, { requirePublicUrl: true });

  if (missingS3Config.length > 0) {
    console.warn(
      `Skip ${logContext} cleanup because S3 config is incomplete: ${missingS3Config.join(', ')}`
    );
    return;
  }

  const keysToDelete = urls
    .map((url) => extractS3KeyFromPublicUrl(publicUrlBase, url))
    .filter((key): key is string => Boolean(key));

  const thumbnailKeys = keysToDelete
    .map((key) => buildThumbnailKey(key))
    .filter((tKey) => !keysToDelete.includes(tKey));

  const allKeys = [...keysToDelete, ...thumbnailKeys];

  if (allKeys.length === 0) {
    return;
  }

  await deleteKeysFromStorage(allKeys, logContext);
}

async function listStorageFolderKeys(storageFolder: string) {
  if (!storageFolder) {
    return [];
  }

  const settings = await readSystemSettings();
  const missingS3Config = getMissingS3Config(settings);

  if (missingS3Config.length > 0) {
    console.warn(
      `Skip folder scan because S3 config is incomplete: ${missingS3Config.join(', ')}`
    );
    return [];
  }

  const { client: s3Client, bucket } = await getS3Client();
  const prefix = `uploads/${storageFolder}/`;
  const keys: string[] = [];
  let continuationToken: string | undefined;

  do {
    const response = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        ContinuationToken: continuationToken
      })
    );

    keys.push(
      ...(response.Contents || [])
        .map((item) => item.Key)
        .filter((key): key is string => Boolean(key))
    );
    continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined;
  } while (continuationToken);

  return [...new Set(keys)];
}

async function deleteOrphanedFolderObjects({
  storageFolder,
  referencedUrls
}: {
  storageFolder: string;
  referencedUrls: string[];
}) {
  if (!storageFolder) {
    return;
  }

  const settings = await readSystemSettings();
  const publicUrlBase = settings.s3_public_url;
  const missingS3Config = getMissingS3Config(settings, { requirePublicUrl: true });

  if (missingS3Config.length > 0) {
    console.warn(
      `Skip folder orphan cleanup because S3 config is incomplete: ${missingS3Config.join(', ')}`
    );
    return;
  }

  const [folderKeys, referencedKeys] = await Promise.all([
    listStorageFolderKeys(storageFolder),
    Promise.resolve(
      referencedUrls
        .map((url) => extractS3KeyFromPublicUrl(publicUrlBase, url))
        .filter((key): key is string => Boolean(key))
        .filter((key) => key.startsWith(`uploads/${storageFolder}/`))
    )
  ]);

  const referencedKeySet = new Set(referencedKeys);
  const orphanedKeys = folderKeys.filter((key) => !referencedKeySet.has(key));
  await deleteKeysFromStorage(orphanedKeys, 'folder orphaned media');
}

function buildCustomerPersistencePayload({
  data,
  categoryName,
  storageFolder,
  imageUrl,
  thumbnailUrl,
  content,
  mediaUrls
}: {
  data: SaveCustomerInput;
  categoryName: string;
  storageFolder: string;
  imageUrl: string;
  thumbnailUrl: string;
  content: string;
  mediaUrls: string[];
}) {
  const normalizedFreeUseUrl = normalizeOptionalExternalUrl(data.freeUseUrl);

  return {
    title: data.title,
    storageFolder,
    description: data.description,
    slug: data.slug !== undefined ? normalizeCustomerSlug(data.slug) || null : undefined,
    metaTitle: data.metaTitle !== undefined ? data.metaTitle.trim() : undefined,
    metaDescription:
      data.metaDescription !== undefined ? data.metaDescription.trim() : undefined,
    publishedAt:
      data.publishedAt !== undefined
        ? data.publishedAt
          ? new Date(data.publishedAt)
          : null
        : undefined,
    isPublicCase: data.isPublicCase !== undefined ? data.isPublicCase : undefined,
    caseOrg: data.caseOrg !== undefined ? data.caseOrg.trim() : undefined,
    clearanceLevel:
      data.clearanceLevel !== undefined ? data.clearanceLevel : undefined,
    caseNo: data.caseNo !== undefined ? data.caseNo : undefined,
    citedNumbers:
      data.citedNumbers !== undefined ? data.citedNumbers : undefined,
    relatedCustomerIds:
      data.relatedCustomerIds !== undefined ? data.relatedCustomerIds : undefined,
    categoryId: data.categoryId,
    categoryName,
    imageUrl,
    thumbnailUrl,
    freeUseUrl: normalizedFreeUseUrl,
    content,
    mediaUrls,
    isPublished: data.isPublished !== undefined ? data.isPublished : true
  };
}

function normalizeOptionalExternalUrl(value: unknown) {
  if (typeof value !== 'string') {
    return '';
  }

  const trimmedUrl = value.trim();
  if (!trimmedUrl) {
    return '';
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(trimmedUrl);
  } catch {
    throw new Error('案例体验链接必须是有效的 URL');
  }

  if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
    throw new Error('案例体验链接仅支持 http 或 https');
  }

  return parsedUrl.toString();
}

async function migrateCustomerMediaFolder({
  sourceFolder,
  targetFolder,
  content,
  imageUrl,
  thumbnailUrl
}: {
  sourceFolder: string;
  targetFolder: string;
  content: string;
  imageUrl: string;
  thumbnailUrl: string;
}) {
  if (!sourceFolder || !targetFolder || sourceFolder === targetFolder) {
    return { content, imageUrl, thumbnailUrl, movedCount: 0 };
  }

  const settings = await readSystemSettings();
  const missingS3Config = getMissingS3Config(settings, { requirePublicUrl: true });
  if (missingS3Config.length > 0) {
    console.warn(
      `Skip media folder migration because S3 config is incomplete: ${missingS3Config.join(', ')}`
    );
    return { content, imageUrl, thumbnailUrl, movedCount: 0 };
  }

  const { client: s3Client, bucket: bucketName } = await getS3Client();
  const publicUrlBase = settings.s3_public_url;
  const encodedSourceFolder = encodeURIComponent(sourceFolder);
  const encodedTargetFolder = encodeURIComponent(targetFolder);
  const oldPrefixUrl = `${publicUrlBase}/uploads/${encodedSourceFolder}/`;
  const newPrefixUrl = `${publicUrlBase}/uploads/${encodedTargetFolder}/`;

  const urlsToMove = collectCurrentMediaUrls({ content, imageUrl, thumbnailUrl }).filter((url) =>
    url.startsWith(oldPrefixUrl)
  );

  if (urlsToMove.length === 0) {
    return { content, imageUrl, thumbnailUrl, movedCount: 0 };
  }

  let nextContent = content;
  let nextImageUrl = imageUrl;
  let nextThumbnailUrl = thumbnailUrl;
  let movedCount = 0;

  for (const oldUrl of urlsToMove) {
    const oldKey = decodeURIComponent(oldUrl.replace(`${publicUrlBase}/`, ''));
    const newKey = oldKey.replace(
      `uploads/${sourceFolder}/`,
      `uploads/${targetFolder}/`
    );
    const newUrl = oldUrl.replace(oldPrefixUrl, newPrefixUrl);

    try {
      const encodedCopySource = `${bucketName}/${oldKey}`
        .split('/')
        .map((segment) => encodeURIComponent(segment))
        .join('/');

      await s3Client.send(new CopyObjectCommand({
        Bucket: bucketName,
        CopySource: encodedCopySource,
        Key: newKey
      }));
      await s3Client.send(new DeleteObjectCommand({
        Bucket: bucketName,
        Key: oldKey
      }));

      nextContent = nextContent.split(oldUrl).join(newUrl);
      if (nextImageUrl === oldUrl) {
        nextImageUrl = newUrl;
      }
      if (nextThumbnailUrl === oldUrl) {
        nextThumbnailUrl = newUrl;
      }
      movedCount += 1;
    } catch (error) {
      console.error(
        `Failed to move S3 object from ${oldKey} to ${newKey}:`,
        error
      );
    }
  }

  return {
    content: nextContent,
    imageUrl: nextImageUrl,
    thumbnailUrl: nextThumbnailUrl,
    movedCount
  };
}

export async function createSkeletonCustomerForAgent() {
  await dbConnect();
  try {
    const [category, allocation] = await Promise.all([
      Category.findOne({ isActive: true }).sort({ order: 1 }),
      allocateUntitledCustomerFolder()
    ]);

    if (!category) {
      return { success: false, error: '请先创建至少一个分类' };
    }

    const id = new mongoose.Types.ObjectId().toString();
    const payload = {
      _id: id,
      title: allocation.name,
      description: '待补充说明',
      content: '## 待补充内容',
      categoryId: category._id,
      categoryName: category.name,
      storageFolder: id,
      imageUrl: '/fastgpt.svg',
      freeUseUrl: '',
      isPublished: false
    };

    const newSol = await Customer.create(payload);
    revalidateCustomerViews(id, category.slug);

    return { success: true, id: newSol._id.toString(), categorySlug: category.slug };
  } catch (error: unknown) {
    console.error('Failed to create skeleton customer:', error);
    return { success: false, error: getErrorMessage(error, '创建失败') };
  }
}

export async function saveCustomerForAgent(data: SaveCustomerInput) {
  await dbConnect();
  try {
    if (!data.id) {
      return { success: false, error: '缺少案例 ID' };
    }

    if (!isValidObjectId(data.id)) {
      return { success: false, error: '案例不存在' };
    }

    if (!isValidObjectId(data.categoryId)) {
      return { success: false, error: '无效的分类' };
    }

    let content = data.content || '';
    let imageUrl = data.imageUrl || '';
    let thumbnailUrl = data.thumbnailUrl || imageUrl;
    const id = data.id;
    const [category, existingCustomer] = await Promise.all([
      Category.findById(data.categoryId),
      Customer.findById(id).populate('categoryId', 'slug')
    ]);

    if (!category) {
      return { success: false, error: '无效的分类' };
    }

    if (!existingCustomer) {
      return { success: false, error: '案例不存在' };
    }

    const previousCategory =
      typeof existingCustomer.categoryId === 'object' && existingCustomer.categoryId !== null
        ? existingCustomer.categoryId as { slug?: string | null }
        : null;
    const previousCategorySlug = previousCategory?.slug || undefined;

    const slug = data.slug !== undefined ? normalizeCustomerSlug(data.slug) : undefined;
    if (slug !== undefined && slug && !isValidCustomerSlug(slug)) {
      return { success: false, error: 'Slug 只能包含小写字母、数字和连字符' };
    }
    if (slug && !(await isCustomerSlugAvailable(slug, { excludeId: id }))) {
      return { success: false, error: 'Slug 已存在，请更换为唯一值' };
    }

    const targetStorageFolder = existingCustomer.storageFolder || id;
    const sourceStorageFolder = resolveStorageFolder(data.storageFolder) || targetStorageFolder;

    const migrationResult = await migrateCustomerMediaFolder({
      sourceFolder: sourceStorageFolder,
      targetFolder: targetStorageFolder,
      content,
      imageUrl,
      thumbnailUrl
    });
    content = migrationResult.content;
    imageUrl = migrationResult.imageUrl;
    thumbnailUrl = migrationResult.thumbnailUrl;

    if (migrationResult.movedCount > 0) {
      console.log(
        `Migrated ${migrationResult.movedCount} files from ${sourceStorageFolder} to ${targetStorageFolder}`
      );
    }

    const currentUrls = collectCurrentMediaUrls({ content, imageUrl, thumbnailUrl });
    const payload = buildCustomerPersistencePayload({
      data,
      categoryName: category.name,
      storageFolder: targetStorageFolder,
      imageUrl,
      thumbnailUrl,
      content,
      mediaUrls: currentUrls
    });

    const urlsToDelete = diffRemovedMediaUrls({
      currentUrls,
      previousUrls: existingCustomer.mediaUrls || [],
      newlyUploadedUrls: data.newlyUploadedUrls || []
    });
    await deleteUrlsFromStorage(urlsToDelete, 'orphaned media');
    await deleteOrphanedFolderObjects({
      storageFolder: targetStorageFolder,
      referencedUrls: [...currentUrls, ...(data.newlyUploadedUrls || [])]
    });

    const updateResult = await Customer.findOneAndUpdate(
      { _id: id },
      payload,
      { returnDocument: 'after' }
    );

    if (!updateResult) {
      return { success: false, error: '文章不存在或已被删除' };
    }

    revalidateCustomerViews(id, category.slug, previousCategorySlug);

    return { success: true, id };
  } catch (error: unknown) {
    console.error('Failed to save customer:', error);
    return { success: false, error: getErrorMessage(error, '保存失败') };
  }
}
