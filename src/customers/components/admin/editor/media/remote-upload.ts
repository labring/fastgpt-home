export async function uploadRemoteMediaToS3({
  sourceUrl,
  storageFolder,
  fileStem
}: {
  sourceUrl: string;
  storageFolder: string;
  fileStem: string;
}) {
  const response = await fetch(withBasePath('/api/upload/remote'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sourceUrl,
      folder: storageFolder,
      fileStem
    })
  });

  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.success || !data?.url) {
    throw new Error(data?.error || '飞书媒体转存失败');
  }

  return data.url as string;
}
import { withBasePath } from '@/customers/lib/base-path';
