import { describe, expect, it } from 'vitest';
import {
  markUploadItemCompleted,
  markUploadItemFailed,
  markUploadItemQueuedForRetry,
  markUploadItemUploading,
  restoreInterruptedUploadItems,
  shouldRetryUpload
} from './queue-reducer';
import type { UploadQueueItem } from '../uploadQueueTypes';

function createItem(status: UploadQueueItem['status'], attempts = 0): UploadQueueItem {
  return {
    id: 'upload-1',
    draftKey: 'draft',
    storageFolder: 'folder',
    kind: 'content',
    contentKind: 'image',
    placeholder: '![正在上传图片... a]()',
    file: new File(['x'], 'a.png', { type: 'image/png' }),
    fileName: 'a.png',
    contentType: 'image/png',
    status,
    attempts,
    createdAt: 1,
    updatedAt: 1
  };
}

describe('upload queue reducer helpers', () => {
  it('marks queued items as uploading and increments attempts', () => {
    expect(markUploadItemUploading(createItem('queued'), 10)).toMatchObject({
      status: 'uploading',
      attempts: 1,
      error: undefined,
      updatedAt: 10
    });
  });

  it('marks completed items with result URLs and optional thumbnails', () => {
    expect(markUploadItemCompleted(createItem('uploading', 1), '/file.png', '/thumb.png', 20)).toMatchObject({
      status: 'completed',
      resultUrl: '/file.png',
      resultThumbnailUrl: '/thumb.png',
      updatedAt: 20
    });
  });

  it('decides retry state and failure state deterministically', () => {
    const uploadingItem = createItem('uploading', 2);
    expect(shouldRetryUpload(uploadingItem)).toBe(true);
    expect(shouldRetryUpload({ ...uploadingItem, attempts: 3 })).toBe(false);
    expect(markUploadItemQueuedForRetry(uploadingItem, '网络错误', 30)).toMatchObject({
      status: 'queued',
      error: '网络错误',
      updatedAt: 30
    });
    expect(markUploadItemFailed(uploadingItem, '失败', 40)).toMatchObject({
      status: 'failed',
      error: '失败',
      updatedAt: 40
    });
  });

  it('restores interrupted uploading items back to queued', () => {
    const restored = restoreInterruptedUploadItems([
      createItem('uploading', 1),
      { ...createItem('completed', 1), id: 'done' }
    ], 50);

    expect(restored[0]).toMatchObject({ status: 'queued', updatedAt: 50 });
    expect(restored[1]).toMatchObject({ status: 'completed', updatedAt: 1 });
  });
});
