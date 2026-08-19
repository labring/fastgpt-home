import { resolveUploadContentType } from '@/customers/lib/upload-content-type';
import { withBasePath } from '@/customers/lib/base-path';
import type { UploadQueueItem } from '../uploadQueueTypes';

async function requestContentUploadTarget(
  fileName: string,
  contentType: string,
  storageFolder: string
) {
  const response = await fetch(withBasePath('/api/upload/presign'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename: fileName,
      contentType,
      folder: storageFolder
    })
  });

  if (!response.ok) {
    throw new Error('获取上传凭证失败');
  }

  return response.json() as Promise<{ uploadUrl: string; fileUrl: string }>;
}

export async function uploadContentFile(item: UploadQueueItem) {
  const contentType = resolveUploadContentType(item.fileName, item.contentType);
  const { uploadUrl, fileUrl } = await requestContentUploadTarget(
    item.fileName,
    contentType,
    item.storageFolder
  );

  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    body: item.file,
    headers: { 'Content-Type': contentType }
  });

  if (!uploadRes.ok) {
    throw new Error('上传到对象存储失败');
  }

  return fileUrl;
}

export async function uploadCoverFile(item: UploadQueueItem) {
  const uploadData = new FormData();
  uploadData.append('file', item.file);
  uploadData.append('folder', item.storageFolder);

  const response = await fetch(withBasePath('/api/upload'), {
    method: 'POST',
    body: uploadData
  });

  if (!response.ok) {
    let errorMsg = '上传失败';
    try {
      const errorData = await response.json();
      errorMsg = errorData.error || errorMsg;
    } catch {
      errorMsg = `服务器错误 (${response.status})`;
    }
    throw new Error(errorMsg);
  }

  const data = await response.json();

  if (!data.success || !data.url) {
    throw new Error(data.error || '上传失败');
  }

  return { url: data.url as string, thumbnailUrl: (data.thumbnailUrl || data.url) as string };
}
