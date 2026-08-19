import type { UploadQueueItem } from '../uploadQueueTypes';

export const MAX_RETRY_ATTEMPTS = 3;

export function markUploadItemUploading(item: UploadQueueItem, now = Date.now()): UploadQueueItem {
  return {
    ...item,
    status: 'uploading',
    attempts: item.attempts + 1,
    error: undefined,
    updatedAt: now
  };
}

export function markUploadItemCompleted(
  item: UploadQueueItem,
  fileUrl: string,
  thumbnailUrl?: string,
  now = Date.now()
): UploadQueueItem {
  return {
    ...item,
    status: 'completed',
    resultUrl: fileUrl,
    ...(thumbnailUrl ? { resultThumbnailUrl: thumbnailUrl } : {}),
    updatedAt: now
  };
}

export function shouldRetryUpload(item: UploadQueueItem, maxAttempts = MAX_RETRY_ATTEMPTS) {
  return item.attempts < maxAttempts;
}

export function markUploadItemQueuedForRetry(
  item: UploadQueueItem,
  error: string,
  now = Date.now()
): UploadQueueItem {
  return {
    ...item,
    status: 'queued',
    error,
    updatedAt: now
  };
}

export function markUploadItemFailed(
  item: UploadQueueItem,
  error: string,
  now = Date.now()
): UploadQueueItem {
  return {
    ...item,
    status: 'failed',
    error,
    updatedAt: now
  };
}

export function restoreInterruptedUploadItems(items: UploadQueueItem[], now = Date.now()) {
  return items.map((item) =>
    item.status === 'uploading'
      ? { ...item, status: 'queued' as const, updatedAt: now }
      : item
  );
}
