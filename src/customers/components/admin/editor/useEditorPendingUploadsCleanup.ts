'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { useUploadQueue } from '@/customers/components/providers/UploadQueueProvider';

interface UseEditorPendingUploadsCleanupProps {
  draftKey: string;
}

export function useEditorPendingUploadsCleanup({
  draftKey
}: UseEditorPendingUploadsCleanupProps) {
  const { getDraftPendingUploadCount } = useUploadQueue();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'hidden') {
        return;
      }

      const pendingCount = getDraftPendingUploadCount(draftKey);
      if (pendingCount > 0) {
        toast.info(`仍有 ${pendingCount} 个文件在后台上传，请勿立即关闭浏览器`, {
          duration: 3000
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [draftKey, getDraftPendingUploadCount]);
}
